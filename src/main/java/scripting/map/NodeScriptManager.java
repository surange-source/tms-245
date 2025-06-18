package scripting.map;

import client.MapleClient;
import configs.Config;
import scripting.AbstractPlayerInteraction;
import scripting.AbstractScriptManager;
import scripting.DefaultScript;
import scripting.npc.NPCScriptManager;

import javax.script.*;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Ethan
 */
public final class NodeScriptManager extends AbstractScriptManager {

    private static final Map<String, Class<? extends NodeScript>> DEFAULT_SCRIPTS = new HashMap<>();

    private static final NodeScriptManager instance = new NodeScriptManager();

    public static NodeScriptManager getInstance() {
        return instance;
    }

    private final Map<String, NodeScript> CACHE = new HashMap<>();

    public void act(MapleClient c, String scriptName, int time, int mobOid) {
        NodeScript script = this.CACHE.get(scriptName);
        if (script == null) {
            if ((script = getDefault(scriptName)) == null) {
                Invocable iv = getInvocable("map/node/" + scriptName + ".js", c);
                if (iv == null) {
                    c.getPlayer().dropMessage(5, "[節點] 找不到腳本: " + scriptName);
                    return;
                }
                try {
                    script = iv.getInterface(NodeScript.class);
                } catch (IllegalArgumentException e) {
                    c.getPlayer().dropMessage(5, "[節點] 無法轉換腳本: " + scriptName);
                    return;
                }
            }
            CACHE.put(scriptName, script);
        }
        if (script != null) {
            try {
                script.act(new NodePlayerInteraction(c, scriptName), mobOid, time);
            } catch (Exception e) {
                if (c.getPlayer().isAdmin()) {
                    c.getPlayer().dropMessage(5, "[Node Script] Exception occurred. script name: " + scriptName);
                }
                log.error("[Node Script] Exception occurred. script name: " + scriptName, e);
            }
        }
    }

    private NodeScript getDefault(String name) {
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
            StringBuilder path = new StringBuilder("scripting.defaults.map.node.").append(name);
            try {
                @SuppressWarnings("unchecked")
                Class<? extends NodeScript> clazz = (Class<? extends NodeScript>) Class.forName(path.toString());
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
