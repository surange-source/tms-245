package scripting.reactor;

import client.MapleClient;
import configs.Config;
import database.DatabaseConnection;
import database.mapper.ReactorDropEntryMapper;
import database.tools.SqlTool;
import org.apache.logging.log4j.Logger;
import scripting.AbstractScriptManager;
import server.maps.MapleReactor;
import server.maps.ReactorDropEntry;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ReactorScriptManager extends AbstractScriptManager {

    private static final Logger log = AbstractScriptManager.log;
    private static final ReactorScriptManager instance = new ReactorScriptManager();
    private static final Map<Integer, Class<? extends IReactorScript>> DEFAULT_SCRIPTS = new HashMap<>();
    private final Map<Integer, List<ReactorDropEntry>> drops = new HashMap<>();

    public static ReactorScriptManager getInstance() {
        return instance;
    }

    public void act(MapleClient c, MapleReactor reactor) {
        try {
            int id = reactor.getReactorId();
            IReactorScript rs = getDefault(id);
            if (rs != null) {
                ReactorActionManager rm = new ReactorActionManager(c, reactor);
                rs.act(rm);
                return;
            }
            Invocable iv = getInvocable("reactor/" + id + ".js", c);
            if (iv == null) {
                if (c.getPlayer().isAdmin()) {
                    c.getPlayer().dropMessage(5, "未找到 Reactor 文件中的 " + reactor.getReactorId() + ".js 文件.");
                }
                log.info("未找到 Reactor 文件中的 " + reactor.getReactorId() + ".js 文件.");
                return;
            }
            if (c.getPlayer().isAdmin()) {
                c.getPlayer().dropMessage(5, "[Reactor Script] ID:" + id);
            }
            ScriptEngine scriptengine = (ScriptEngine) iv;
            ReactorActionManager rm = new ReactorActionManager(c, reactor);
            scriptengine.put("rm", rm);
            iv.invokeFunction("act");
        } catch (Exception e) {
            log.error("執行Reactor文件出錯 ReactorID: " + reactor.getReactorId() + ", ReactorName: " + reactor.getName(), e);
        }
    }

    public List<ReactorDropEntry> getDrops(int reactorId) {
        return drops.get(reactorId);
    }

    public void clearDrops() {
        drops.clear();
        loadDrops();
    }

    public void loadDrops() {
        DatabaseConnection.domain(con -> {
            List<Integer> droppers = SqlTool.queryAndGetList(con, "SELECT `dropperid` FROM `zdata_reactordrops`", rs -> rs.getInt("dropperid"));
            for (int dropperid : droppers) {
                List<ReactorDropEntry> dropEntries = SqlTool.queryAndGetList(con, "SELECT * FROM `zdata_reactordrops` WHERE `dropperid` = ?", new ReactorDropEntryMapper(), new Object[]{dropperid});
                drops.put(dropperid, dropEntries);
            }
            return null;
        }, "讀取反應堆爆率數據出錯");
    }

    private IReactorScript getDefault(int reactorId) {
        if (!Config.isOpenDefaultScript()) {
            return null;
        }
        if (DEFAULT_SCRIPTS.containsKey(reactorId)) {
            try {
                return DEFAULT_SCRIPTS.get(reactorId).getDeclaredConstructor().newInstance();
            } catch (Exception ignored) {
                return null;
            }
        } else {
            String className = "scripting.defaults.reactor.R" + reactorId;
            try {
                @SuppressWarnings("unchecked")
                Class<? extends IReactorScript> clazz = (Class<? extends IReactorScript>) Class.forName(className);
                DEFAULT_SCRIPTS.put(reactorId, clazz);
                return clazz.getDeclaredConstructor().newInstance();
            } catch (Exception e) {
                if (!Config.isDevelop()) {
                    DEFAULT_SCRIPTS.put(reactorId, null);
                }
            }
        }
        return null;
    }
}
