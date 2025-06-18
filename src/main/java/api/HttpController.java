package api;

import ai.houyi.dorado.rest.annotation.Controller;
import ai.houyi.dorado.rest.annotation.GET;
import ai.houyi.dorado.rest.annotation.Path;
import ai.houyi.dorado.rest.annotation.PathVariable;
import client.*;
import database.tools.SqlTool;
import handling.world.World;
import handling.world.World.Client;
import handling.world.WorldFindService;
import tools.Triple;

import java.util.HashMap;
import java.util.Map;

@Controller
@Path("/api")
@SuppressWarnings("unused")
public class HttpController {

    @GET
    @Path("/check/{account}/{password}")
    public Response checkAccount(@PathVariable("account") String account, @PathVariable("password") String password) {
        if (account == null || password == null) {
            return new Response(-1, "invalid argument");
        }
        final Triple<String, String, Integer> triple = SqlTool.queryAndGet("SELECT * FROM accounts WHERE name = ?", rs -> new Triple<>(rs.getString("password"), rs.getString("salt"), rs.getInt("banned")), account);
        if (triple == null) {
            return new Response(-2, "account not exists");
        }
        if (triple.getRight() > 0) {
            return new Response(-3, "account is banned");
        }
        final String passhash = triple.getLeft();
        final String salt = triple.getMid();
        if (LoginCryptoLegacy.isLegacyPassword(passhash) && LoginCryptoLegacy.checkPassword(password, passhash)) {
            return new Response(0, "success");
        } else if (password.equals(passhash)) {
            return new Response(0, "success");
        } else if (salt == null && LoginCrypto.checkSha1Hash(passhash, password)) {
            return new Response(0, "success");
        } else if (LoginCrypto.checkSaltedSha512Hash(passhash, password, salt)) {
            return new Response(0, "success");
        } else {
            return new Response(-4, "wrong password");
        }
    }

    public static class Response {
        private final int code;
        private final String message;
        private final Map<String, Object> data = new HashMap<>();

        public Response(int code, String message) {
            this.code = code;
            this.message = message;
        }

        public Response(int code, String message, Map<String, Object> data) {
            this(code, message);
            this.data.putAll(data);
        }

        public int getCode() {
            return code;
        }


        public String getMessage() {
            return message;
        }

        public Map<String, Object> getData() {
            return data;
        }
    }
}
