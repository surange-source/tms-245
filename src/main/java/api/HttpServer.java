package api;

import ai.houyi.dorado.rest.server.DoradoServerBuilder;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class HttpServer {
    private static final Logger log = LogManager.getLogger(HttpServer.class);
    public static void start() {
//        new Thread(() -> {
//            DoradoServerBuilder.forPort(8001).scanPackages("api").build().start();
//        }).start();
    }
}
