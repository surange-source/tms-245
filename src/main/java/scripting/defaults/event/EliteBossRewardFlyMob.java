package scripting.defaults.event;

import client.MapleCharacter;
import scripting.event.AbstractEventScript;
import scripting.event.EventInstanceManager;
import server.maps.MapleMap;
import tools.Randomizer;

public class EliteBossRewardFlyMob extends AbstractEventScript {

    @Override
    public void init() {
    }

    @Override
    public void startAutoInstance(EventInstanceManager eim, MapleMap map) {
        MapleCharacter mapObject = null;
        for (MapleCharacter chr : map.getCharacters()) {
            if (chr != null) {
                mapObject = chr;
                break;
            }
        }
        if (mapObject == null) {
            eim.dispose();
            return;
        }
        map.setSpawns(false);
        map.killAllMonsters(false);
        map.setDynamicObj();

        eim.schedule("start", 5000, mapObject);
    }

    public void start(EventInstanceManager eim, MapleCharacter player) {
        eim.startEventTimer(6, 0, 22000);

        MapleMap map = eim.getMapFactoryMap(parseInt(eim.getName()));
        for (int i = 0; i < 6; i++) {
            em.spawnMonsterOnGroundBelow(map, em.getMonster(8220028), player.getPosition().x, player.getPosition().y);
        }

        String[] msg = {"究竟你可以接到多少我投擲出去的道具呢?", "禮物就是要給善良的冒險家!好好接著我投出去的道具!"};
        eim.broadcastWeatherEffectNotice(msg[Randomizer.nextInt(msg.length)], 146, 4000);
    }

    @Override
    public void scheduledTimeout(EventInstanceManager eim) {
        MapleMap map = eim.getMapFactoryMap(parseInt(eim.getName()));
        map.setSpawns(true);
        eim.stopEventClock();
        map.killAllMonsters(false);
        map.playFieldSound("eliteMonster/gameOver");
        map.removeDynamicObj();
        eim.dispose();
    }

    @Override
    public void playerEntry(EventInstanceManager eim, MapleCharacter player) {
        player.setStopComboKill(true);
    }

    @Override
    public void playerExit(EventInstanceManager eim, MapleCharacter player) {
        player.setStopComboKill(false);
    }

    @Override
    public void changedMap(EventInstanceManager eim, MapleCharacter player, int mapID) {
        eim.playerDisconnected(player, player.getId());
    }
}
