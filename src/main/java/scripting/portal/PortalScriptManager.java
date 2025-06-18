package scripting.portal;

import client.MapleClient;
import configs.Config;
import configs.ServerConfig;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import scripting.AbstractScriptManager;
import server.MaplePortal;

import javax.script.*;
import java.util.HashMap;
import java.util.Map;

public class PortalScriptManager extends AbstractScriptManager {

    private static final Logger log = AbstractScriptManager.log;
    private static final PortalScriptManager instance = new PortalScriptManager();
    private final Map<String, PortalScript> scripts = new HashMap<>();
    private static final Map<String, Class<? extends PortalScript>> DEFAULT_SCRIPTS = new HashMap<>();

    public static PortalScriptManager getInstance() {
        return instance;
    }

    public void executePortalScript(MaplePortal portal, MapleClient c) {
        String scriptName = portal.getScriptName();
        if ("StageOut".equals(scriptName)) {
            scriptName = "StageOut_gx";
        }
        PortalScript script = scripts.get(scriptName);
        if (script == null) {
            if ((script = getDefault(scriptName)) == null) {
                Invocable iv = getInvocable("portal/" + scriptName + ".js", c);
                if (iv == null) {
                    c.getPlayer().dropMessage(5, "[傳送點] 找不到腳本: " + scriptName + " 地圖: " + c.getPlayer().getMapId());
                    return;
                }
                try {
                    script = iv.getInterface(PortalScript.class);
                } catch (IllegalArgumentException e) {
                    c.getPlayer().dropMessage(5, "[傳送點] 轉換腳本失敗: " + scriptName + " 傳送點腳本: " + c.getPlayer().getMapId());
                    return;
                }
            }
            scripts.put(scriptName, script);
        }
        if (script != null) {
            try {
                script.enter(new PortalPlayerInteraction(c, portal));
            } catch (Exception e) {
                if (c.getPlayer().isAdmin()) {
                    c.getPlayer().dropMessage(5, "[Portal Script] Exception occurred. script name: " + scriptName);
                }
                log.error("[Portal Script] Exception occurred. script name: " + scriptName, e);
            }
        }
    }

    public void clearScripts() {
        scripts.clear();
    }

    private PortalScript getDefault(String name) {
        if (!Config.isOpenDefaultScript()) {
            return null;
        }
        if (DEFAULT_SCRIPTS.containsKey(name)) {
            try {
                return DEFAULT_SCRIPTS.get(name).getDeclaredConstructor().newInstance();
            } catch (Exception ignored) {
                return null;
            }
        } else {
            StringBuilder path = new StringBuilder("scripting.defaults.portal.").append(name);
            try {
                @SuppressWarnings("unchecked")
                Class<? extends PortalScript> clazz = (Class<? extends PortalScript>) Class.forName(path.toString());
                DEFAULT_SCRIPTS.put(name, clazz);
                return clazz.getDeclaredConstructor().newInstance();
            } catch (Exception e) {
                if (!Config.isDevelop()) {
                    DEFAULT_SCRIPTS.put(name, null);
                }
            }
        }
        return null;
    }
}
