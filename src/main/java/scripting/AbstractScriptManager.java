package scripting;

import auth.Auth;
import client.MapleClient;
import configs.Config;
import configs.ServerConfig;
//import jdk.nashorn.api.scripting.NashornScriptEngine;
import org.openjdk.nashorn.api.scripting.NashornScriptEngine;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.script.CompiledScript;
import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import java.io.File;
import java.io.IOException;
import java.lang.reflect.Method;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Predicate;

/**
 * @author Matze
 */
public abstract class AbstractScriptManager {

    protected static final Logger log = LogManager.getLogger("scripting");
    public static final ScriptEngineManager sem = new ScriptEngineManager();
    private static final Map<String, Map<String, Class<? extends DefaultScript>>> DEFAULT_SCRIPTS = new HashMap<>();
    //    private static final ThreadLocal<String> CURRENT_SCRIPT_NAME = new ThreadLocal<>();
    private static final Map<String, CompiledScript> CACHE = new ConcurrentHashMap<>();

    static {
        loadDefault();
    }

    private static void loadDefault() {
        Map<String, Class<? extends DefaultScript>> npc = new HashMap<>();
        Map<String, Class<? extends DefaultScript>> extend = new HashMap<>();
        Map<String, Class<? extends DefaultScript>> item = new HashMap<>();
        Map<String, Class<? extends DefaultScript>> quest = new HashMap<>();
        Map<String, Class<? extends DefaultScript>> onFirstUserEnter = new HashMap<>();
        Map<String, Class<? extends DefaultScript>> onUserEnter = new HashMap<>();
        Map<String, Class<? extends DefaultScript>> event = new HashMap<>();
        DEFAULT_SCRIPTS.put("npc", npc);
        DEFAULT_SCRIPTS.put("extend", extend);
        DEFAULT_SCRIPTS.put("item", item);
        DEFAULT_SCRIPTS.put("quest", quest);
        DEFAULT_SCRIPTS.put("onFirstUserEnter", onFirstUserEnter);
        DEFAULT_SCRIPTS.put("onUserEnter", onUserEnter);
        DEFAULT_SCRIPTS.put("event", event);
    }

    public Invocable getInvocable(String path, MapleClient c) {
        return getInvocable(path, c, false);
    }

    protected Invocable getInvocable(String path, MapleClient c, boolean npc) {
        try {
            ScriptEngine engine = null;
            CompiledScript compiledScript = null;
            if (ServerConfig.WORLD_CACHE_SCRIPT) {
                compiledScript = CACHE.get(path);
            } else {
                if (CACHE.size() > 0) {
                    CACHE.clear();
                }
            }
            if (compiledScript == null) {
                String scriptString = getScriptString(path);
                if (scriptString == null) {
                    return null;
                }
                engine = getScriptEngine();
                compiledScript = ((NashornScriptEngine) engine).compile(scriptString);
                if (ServerConfig.WORLD_CACHE_SCRIPT) {
                    CACHE.put(path, compiledScript);
                }
            }
            if (compiledScript == null) return null;
            compiledScript.eval();
            compiledScript.getEngine().put("checkPermission", (Predicate<String>) Auth::checkPermission);
            return (Invocable) compiledScript.getEngine();
        } catch (Throwable e) {
            String err = "[Script Manager] Exception occurred. Path: " + path + "\r\nException: " + e + " | " + Arrays.toString(e.getStackTrace());
            System.err.println(err);
            log.error(err);
            return null;
        }
    }

    protected static String getScriptString(String path) throws IOException {
        String script = Auth.getCloudScript(path);
        if (script == null) {
            File file = new File(ServerConfig.WORLD_SCRIPTSPATH2 + File.separator + path);
            if (!file.exists()) {
                file = new File(ServerConfig.WORLD_SCRIPTSPATH + File.separator + path);
            }
            if (!file.exists()) {
                file = new File("scripts_cloud" + File.separator + path);
            }
            if (file.exists()) {
                script = new String(Files.readAllBytes(file.toPath()), StandardCharsets.UTF_8);
            } else {
                System.err.println("script '" + path + "' doesn't exists!");
            }
        }
        return script;
    }

    protected static DefaultScript getDefaultInvocable(String type, String name) {
        if (!Config.isOpenDefaultScript()) {
            switch (type) {
                case "onUserEnter":
                case "onFirstUserEnter":
                    return null;
            }
        }
        if (DEFAULT_SCRIPTS.get(type).containsKey(name)) {
            try {
                Class<? extends DefaultScript> clazz = DEFAULT_SCRIPTS.get(type).get(name);
                return clazz == null ? null : clazz.getDeclaredConstructor().newInstance();
            } catch (Exception ignored) {
                return null;
            }
        } else {
            StringBuilder path = new StringBuilder("scripting.defaults.").append(type).append('.');
            switch (type) {
                case "quest":
                    path.append("Q");
                    break;
                case "item":
                    path.append("I");
                    break;
                case "npc":
                    path.append("N");
                    break;
                default:
                    break;
            }
            path.append(name);
            try {
                @SuppressWarnings("unchecked")
                Class<? extends DefaultScript> clazz = (Class<? extends DefaultScript>) Class.forName(path.toString());
                DEFAULT_SCRIPTS.get(type).put(name, clazz);
                return clazz.getDeclaredConstructor().newInstance();
            } catch (Exception e) {
                if (!Config.isDevelop()) {
                    DEFAULT_SCRIPTS.get(type).put(name, null);
                }
            }
        }
        return null;
    }

    public static ScriptEngine getScriptEngine() {
        return sem.getEngineByName("nashorn");
    }

    public static void clearScriptCache() {
        CACHE.clear();
    }
}
