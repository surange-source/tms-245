/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package scripting.item;

import client.MapleClient;
import client.inventory.Item;
import configs.ServerConfig;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import scripting.AbstractScriptManager;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import java.util.Map;
import java.util.WeakHashMap;

/**
 * @author PlayDK
 */
public class ItemScriptManager extends AbstractScriptManager {

    private static final Logger log = AbstractScriptManager.log;

    private static final ItemScriptManager instance = new ItemScriptManager();
    private final Map<MapleClient, ItemActionManager> ims = new WeakHashMap<>();

    public static ItemScriptManager getInstance() {
        return instance;
    }

    public ItemActionManager getIM(MapleClient c) {
        return ims.get(c);
    }

    private void notice(MapleClient c, int itemId) {
        c.getPlayer().dropMessage(1, "這個道具腳本是錯誤的，請聯繫管理員修復它.道具ID: " + itemId);
    }
}
