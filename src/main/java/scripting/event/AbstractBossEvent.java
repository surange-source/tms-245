package scripting.event;

import client.MapleCharacter;
import server.maps.MapleMap;

import java.util.List;

public abstract class AbstractBossEvent extends AbstractEventScript {


    /**
     * Event包含的地圖數組，在子類的構造方法中初始化
     */
    protected List<Integer> mapIDs;
    /**
     * Event時間限制，在子類的構造方法中初始化
     */
    protected long eventTaskTime;
    /**
     * Event結束後的返回地圖ID，倒計時結束將會被傳送到該地圖，在子類的構造方法中初始化
     */
    protected int returnMapID;
    /**
     * Boss Event 自定義復活次數
     */
    protected int reviveCount = -1;

    @Override
    public EventInstanceManager setup(int value, int value2) {
        EventInstanceManager eim = em.newInstance(em.getName() + value2);
        if (mapIDs != null) {
            for (int id : mapIDs) {
                eim.setInstanceMap(id).resetFully(eim);
            }
        }
        if (eventTaskTime > 0) {
            eim.startEventTimer(eventTaskTime);
        }
        return eim;
    }

    @Override
    public void playerEntry(EventInstanceManager eim, MapleCharacter player) {
        player.setReviveCount(reviveCount);
        player.changeMap(eim.getMapInstance(0));
    }

    @Override
    public void changedMap(EventInstanceManager eim, MapleCharacter player, int mapID) {
        if (mapIDs != null) {
            if (mapIDs.contains(mapID)) {
                return;
            }
            playerExit(eim, player);
        }
    }

    @Override
    public void playerExit(EventInstanceManager eim, MapleCharacter player) {
        eim.unregisterPlayer(player);
        player.restReviveCount();
        if (eim.disposeIfPlayerBelow((byte) 0, 0)) {
            em.getProperties().clear();
        }
    }

    @Override
    public boolean playerRevive(EventInstanceManager eim, MapleCharacter player) {
        if (player.getEventReviveCount() <= 0) {
            MapleMap map = eim.getMapFactoryMap(returnMapID);
            if (map != null) {
                player.changeMap(map, map.getPortal(0));
                return true;
            }
        }
        return false;
    }

    @Override
    protected void end(EventInstanceManager eim) {
        if (returnMapID > 0) {
            eim.disposeIfPlayerBelow((byte) 100, returnMapID);
        }
        em.getProperties().clear();
    }

}
