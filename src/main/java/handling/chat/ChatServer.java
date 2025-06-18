/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package handling.chat;

import configs.ServerConfig;
import constants.ServerConstants;
import handling.ServerType;
import handling.netty.ServerConnection;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class ChatServer {

    private static final Logger log = LogManager.getLogger(ChatServer.class);
    private static ServerConnection init;
    private static boolean finishedShutdown = false;
    private static short port;

    public static void run_startup_configurations() {

        port = ServerConfig.CHAT_PORT;
        try {
            init = new ServerConnection(port, -1, -1, ServerType.ChatServer);
            init.run();
            log.info("聊天伺服器綁定連接埠: " + port + ".");
        } catch (final Exception e) {
            throw new RuntimeException("聊天伺服器綁定連接埠 " + port + " 失敗", e);
        }
    }

    public static int getPort() {
        return port;
    }

    public static void shutdown() {
        if (isShutdown()) {
            return;
        }
        log.info("正在關閉聊天伺服器...");
        log.info("聊天伺服器解除連接埠綁定...");
        init.close();
        finishedShutdown = true;
    }

    public static boolean isShutdown() {
        return init == null || finishedShutdown;
    }
}
