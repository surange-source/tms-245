package scripting.defaults.event;

import client.MapleCharacter;
import scripting.event.AbstractEventScript;
import scripting.event.EventInstanceManager;
import scripting.event.EventManager;
import server.life.MapleMonster;
import server.maps.MapleMap;
import tools.Randomizer;

public class EliteBoss extends AbstractEventScript {

    @Override
    public void init() {
    }

    @Override
    public void startAutoInstance(EventInstanceManager eim, MapleMap map) {
        int[] eliteBosses = {8220022, 8220023, 8220024, 8220025, 8220026};
        String[] ebMsg = {"為了偉大的那個人,我要懲罰你.", "瘋子們正在蹦蹦跳跳. 科科科...", "發現目標. 消滅行動開始.", "獵物出現了.", "感覺很有趣. 要不要玩一次看看啊."};
        int[] emItem = {5120125, 5120126, 5120127, 5120128, 5120129};
        MapleMonster mapObject = null;
        for (MapleMonster mob : map.getMonsters()) {
            if (mob.getEliteGrade() <= 0 && !mob.isFake() && !mob.isSoul() && !mob.isSpongeMob()) {
                mapObject = mob;
                break;
            }
        }
        if (mapObject == null) {
            eim.dispose();
            return;
        }
        map.setSpawns(false);
        map.killAllMonsters(false);
        map.setDynamicObj("Bgm36.img/RoyalGuard", "Effect/EliteMobEff.img/eliteMonsterFrame", "Effect/EliteMobEff.img/eliteMonsterEffect");
        eim.startEventTimer(30 * 60 * 1000);

        for (int i = 0; i < 2; i++) {
            MapleMonster elite = em.getEliteMonster(mapObject.getId());
            elite.registerKill(300000);
            em.spawnMonsterOnGroundBelow(map, elite, mapObject.getPosition().x, mapObject.getPosition().y);
        }
        int eliteIndex = Randomizer.nextInt(eliteBosses.length);

        eim.setProperty("eliteMobId", eliteBosses[eliteIndex]);

        MapleMonster elite = em.getEliteMonster(eliteBosses[eliteIndex], mapObject.getStats(), 2, 2);
        elite.registerKill(1800000);
        em.spawnMonsterOnGroundBelow(map, elite, mapObject.getPosition().x, mapObject.getPosition().y);

        map.startMapEffect(elite.getStats().getName() + " : " + ebMsg[eliteIndex], emItem[eliteIndex], 0);
        map.startAreaBroadcastMob(elite.getId());
    }

    @Override
    public void scheduledTimeout(EventInstanceManager eim) {
        disposeEvent(eim, false);
    }

    @Override
    public void monsterKilled(EventInstanceManager eim, MapleCharacter chr, int mobID) {
        if (eim.getProperty("eliteMobId") != null && !eim.getProperty("eliteMobId").isEmpty() && parseInt(eim.getProperty("eliteMobId")) == mobID) {
            eim.stopEventTimer();
            disposeEvent(eim, true);
        }
    }

    public void disposeEvent(EventInstanceManager eim, boolean reward) {
        MapleMap map = eim.getMapFactoryMap(parseInt(eim.getName()));
        map.setSpawns(true);
        eim.stopEventClock();
        map.removeDynamicObj();
        map.stopAreaBroadcastMob();
        map.killAllMonsters(false);
        if (reward) {
            String[] rewardEvent = {EliteBossRewardFlyMob.class.getSimpleName()};
            EventManager event = em.getChannelServer().getEventSM().getEventManager(rewardEvent[Randomizer.nextInt(rewardEvent.length)]);
            if (event != null) {
                eim.dispose();
                if (event.getInstance(String.valueOf(map.getId())) != null) {
                    event.getInstance(String.valueOf(map.getId())).dispose();
                }
                event.newInstance(String.valueOf(map.getId())).setAutoInstanceMap(map.getId());
                return;
            } else {
                eim.broadcastDropMessage(-2, "菁英BOSS獎勵副本不存在。");
            }
        }
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
