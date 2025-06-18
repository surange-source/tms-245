package scripting.defaults.event;

import client.MapleBuffStat;
import client.MapleCharacter;
import packet.MaplePacketCreator;
import packet.UIPacket;
import scripting.event.AbstractBossEvent;
import scripting.event.EventInstanceManager;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.maps.MapleFoothold;
import server.maps.MapleMap;
import tools.Randomizer;

import java.awt.*;
import java.util.*;
import java.util.List;

public class BossGiantVellud extends AbstractBossEvent {
    private int phaseTime = 400000;
    private int rewardTime = 270000;
    private Map<Integer, List<Long>> HP;
    private List<Integer> hideMob;

    public static class MapID {
        public static final int 愛心樹守護者所在之處 = 863000100;
        public static final int 往培羅德 = 863010100;
        public static final int 培羅德的右腳下層 = 863010200;
        public static final int 培羅德的右腳上層 = 863010210;
        public static final int 培羅德的左腳下層 = 863010220;
        public static final int 培羅德的左腳上層 = 863010230;
        public static final int 培羅德的腹部 = 863010240;
        public static final int 培羅德西邊懸崖下段 = 863010300;
        public static final int 培羅德西邊懸崖上段 = 863010310;
        public static final int 培羅德的右上臂 = 863010320;
        public static final int 培羅德的右肩 = 863010330;
        public static final int 培羅德東邊懸崖下段 = 863010400;
        public static final int 培羅德東邊懸崖上段 = 863010410;
        public static final int 培羅德的左上臂 = 863010420;
        public static final int 培羅德的左肩 = 863010430;
        public static final int 培羅德的心臟 = 863010500;
        public static final int 培羅德的頭 = 863010600;
        public static final int 培羅德的心臟_獎勵 = 863010700;
    }

    public static class MobID {
        public static final int 培羅德的頭 = 9390600;
        public static final int 培羅德的頭_2階 = 9390601;
        public static final int 培羅德的頭_3階 = 9390602;
        public static final int 死亡伯爵替身 = 9390603;
        public static final int 培羅德的右肩 = 9390610;
        public static final int 培羅德的左肩 = 9390611;
        public static final int 培羅德的腹部 = 9390612;
        public static final int 肩膀魔王廣域攻擊用替身 = 9390613;
        public static final int 肩膀魔王廣域攻擊用替身_1 = 9390614;
        public static final int 區域廣域攻擊用替身 = 9390617;
        public static final int 區域廣域攻擊用替身_1 = 9390618;
        public static final int 區域廣域攻擊用替身_2 = 9390619;
        public static final int 墮落貝伊之石 = 9390620;
        public static final int 墮落貝伊之石_1 = 9390621;
        public static final int 墮落貝伊之石_2 = 9390622;
        public static final int 墮落貝伊之石_3 = 9390623;
    }

    @Override
    public void init() {
        mapIDs = Arrays.asList(
                MapID.往培羅德,
                MapID.培羅德的右腳下層,
                MapID.培羅德的右腳上層,
                MapID.培羅德的左腳下層,
                MapID.培羅德的左腳上層,
                MapID.培羅德的腹部,
                MapID.培羅德西邊懸崖下段,
                MapID.培羅德西邊懸崖上段,
                MapID.培羅德的右上臂,
                MapID.培羅德的右肩,
                MapID.培羅德東邊懸崖下段,
                MapID.培羅德東邊懸崖上段,
                MapID.培羅德的左上臂,
                MapID.培羅德的左肩,
                MapID.培羅德的心臟,
                MapID.培羅德的頭,
                MapID.培羅德的心臟_獎勵
        );
        hideMob = Arrays.asList(
                MobID.死亡伯爵替身,
                MobID.肩膀魔王廣域攻擊用替身,
                MobID.肩膀魔王廣域攻擊用替身_1,
                MobID.區域廣域攻擊用替身,
                MobID.區域廣域攻擊用替身_1,
                MobID.區域廣域攻擊用替身_2,
                MobID.墮落貝伊之石,
                MobID.墮落貝伊之石,
                MobID.墮落貝伊之石_1,
                MobID.墮落貝伊之石_2,
                MobID.墮落貝伊之石_3
        );
        eventTaskTime = (30 * 60 + 30) * 1000;
        returnMapID = MapID.愛心樹守護者所在之處;
        reviveCount = 5;

        HP = new LinkedHashMap<>();
        List<Long> hpList = new LinkedList<>();
        hpList.add(50000000L);
        hpList.add(50000000L);
        hpList.add(10000000L);
        HP.put(0, hpList);
        hpList = new LinkedList<>();
        hpList.add(3000000000L);
        hpList.add(3000000000L);
        hpList.add(600000000L);
        HP.put(1, hpList);
        hpList = new LinkedList<>();
        hpList.add(75000000000L);
        hpList.add(75000000000L);
        hpList.add(15000000000L);
        HP.put(2, hpList);
        hpList = new LinkedList<>();
        hpList.add(350000000000L);
        hpList.add(350000000000L);
        hpList.add(70000000000L);
        HP.put(3, hpList);
    }

    @Override
    public EventInstanceManager setup(int value, int value2) {
        EventInstanceManager eim = super.setup(value, value2);
        Map<String, String> infomap = (Map<String, String>) eim.getValues().computeIfAbsent("InfoMap", v -> new LinkedHashMap<>());
        infomap.put("clearType", "0");
        eim.setProperty("open", "0");
        eim.setProperty("BeidlerHead", "0");
        eim.setProperty("Core", "3");

        MapleMap map = eim.getMapInstance(MapID.培羅德的右肩);
        MapleMonster RArm = em.getMonster(MobID.培羅德的右肩);
        MapleMap RArmMap = eim.getMapInstance(MapID.培羅德西邊懸崖下段);
        eim.registerDeadBoundMob(RArm, () -> {
            List<MapleCharacter> players = RArmMap.getCharacters();
            if (players.size() > 0) {
                List<Point> fhs = new LinkedList<>(RArmMap.getSpawnPoints());
                Collections.shuffle(fhs);
                for (MapleCharacter chr : players) {
                    chr.send(MaplePacketCreator.UserRequestChangeMobZoneState("DropPunchGiantBossR", 0, Collections.singletonList(fhs.get(0))));
                    chr.send(MaplePacketCreator.trembleEffect(1, 2110, 100));
                    ((List<String>) chr.getTempValues().computeIfAbsent("MobZoneState", v -> new LinkedList<>())).add("DropPunchGiantBossR");
                }
            }
        }, 7110);
        map.spawnMonsterOnGroundBelow(RArm, new java.awt.Point(1, 69));

        map = eim.getMapInstance(MapID.培羅德的左肩);
        MapleMonster LArm = em.getMonster(MobID.培羅德的左肩);
        MapleMap LArmMap = eim.getMapInstance(MapID.培羅德東邊懸崖下段);
        eim.registerDeadBoundMob(LArm, () -> {
            List<MapleCharacter> players = LArmMap.getCharacters();
            if (players.size() > 0) {
                List<Point> fhs = new LinkedList<>(LArmMap.getSpawnPoints());
                Collections.shuffle(fhs);
                for (MapleCharacter chr : players) {
                    chr.send(MaplePacketCreator.UserRequestChangeMobZoneState("DropPunchGiantBossL", 0, Collections.singletonList(fhs.get(0))));
                    chr.send(MaplePacketCreator.trembleEffect(1, 2110, 100));
                    ((List<String>) chr.getTempValues().computeIfAbsent("MobZoneState", v -> new LinkedList<>())).add("DropPunchGiantBossL");
                }
            }
        }, 7110);
        map.spawnMonsterOnGroundBelow(LArm, new java.awt.Point(84, 69));

        MapleMap HipMap = eim.getMapInstance(MapID.培羅德的腹部);
        MapleMonster Hip = em.getMonster(MobID.培羅德的腹部);
        List<Point>[] fhs = new List[] {
            new ArrayList<>(),
            new ArrayList<>()
        };
        MapleFoothold fh = HipMap.getFootholds().getAllRelevants().get(0);
        int count = (fh.getX2() - fh.getX1()) / 117;
        for (int i = 0; i < count; i++) {
            fhs[i <= count / 2 ? 0 : 1].add(new Point(fh.getX1() + i * 117, fh.getY1()));
        }
        eim.registerDeadBoundMob(Hip, () -> {
            List<MapleCharacter> players = HipMap.getCharacters();
            if (players.size() > 0) {
                for (int i = 1; i <= 2; i++) {
                    Collections.shuffle(fhs[i - 1]);
                    int nCount = Randomizer.rand(Math.min(fhs[i - 1].size(), 5), fhs[i - 1].size());
                    List<Point> spawnPoints = new LinkedList<>();
                    for (int j = 0; j < nCount; j++) {
                        spawnPoints.add(fhs[i - 1].get(j));
                    }
                    for (MapleCharacter chr : players) {
                        chr.send(MaplePacketCreator.UserRequestChangeMobZoneState("DropPerifactionCurse", i == 1 ? 0 : 1, spawnPoints));
                        chr.send(MaplePacketCreator.trembleEffect(1, 0, 30));
                        List<String> list = ((List<String>) chr.getTempValues().computeIfAbsent("MobZoneState", v -> new LinkedList<>()));
                        for (int j = 0; j < spawnPoints.size(); j++) {
                            list.add("DropPerifactionCurse");
                        }
                    }
                }
                for (int i = 1; i <= 2; i++) {
                    MapleMonster mob = MapleLifeFactory.getMonster(MobID.墮落貝伊之石);
                    if (mob == null) {
                        continue;
                    }
                    mob.setStance(i == 1 ? 2 : 3);
                    mob.setAppearType((short) 46);
                    mob.setUnk(i == 1 ? 1 : -1);
                    mob.setUnk1(i == 1 ? 0 : 1);
                    HipMap.spawnMonsterOnGroundBelow(mob, new Point(i == 1 ? -711 : 809, 87));
                }
            }
        }, 10000);
        HipMap.spawnMonsterOnGroundBelow(Hip, new java.awt.Point(3, 69));

        eim.setProperty("open", "1");
        eim.schedule(() -> {
            eim.setProperty("open", "2");
            eim.getMapInstance(MapID.往培羅德).showPortalEffect("open", 1);
        }, 5000);
        return eim;
    }

    @Override
    public void changedMap(EventInstanceManager eim, MapleCharacter player, int mapID) {
        player.dispelEffect(MapleBuffStat.培羅德束縛);
        switch (mapID) {
            case MapID.培羅德的頭:
                MapleMap smap = eim.getMapInstance(mapID);
                if (eim.getProperty("BeidlerHead").equals("0")) {
                    eim.setProperty("BeidlerHead", "1");
                    long hp = 0;
                    switch (parseInt(eim.getProperty("Core"))) {
                        case 0:
                            hp = HP.get(0).get(0);
                            eim.setProperty("rate", "1");
                            eim.setProperty("nlevel", "150");
                            break;
                        case 1:
                            hp = HP.get(1).get(0);
                            eim.setProperty("rate", "10");
                            eim.setProperty("nlevel", "175");
                            break;
                        case 2:
                            hp = HP.get(2).get(0);
                            eim.setProperty("rate", "200");
                            eim.setProperty("nlevel", "195");
                            break;
                        case 3:
                            hp = HP.get(3).get(0);
                            eim.setProperty("rate", "500");
                            eim.setProperty("nlevel", "210");
                            break;
                    }
                    MapleMonster mob = em.getMonster(MobID.培羅德的頭);
                    mob.changeHP(hp);
                    mob.getStats().setChange(true);
                    mob.changeLevelmod(parseInt(eim.getProperty("nlevel")), parseInt(eim.getProperty("rate")));
                    eim.registerMonster(mob);
                    smap.spawnMonsterOnGroundBelow(mob, new java.awt.Point(7, 61));
                }
                break;
            default :
                if (!mapIDs.contains(mapID)) {
                    playerExit(eim, player);
                    return;
                }
                break;
        }
        Map<String, String> infomap = (Map<String, String>) eim.getValues().computeIfAbsent("InfoMap", v -> new LinkedHashMap<>());
        if (!infomap.containsKey(String(mapID))) {
            switch (mapID) {
                case MapID.往培羅德: {
                    if (parseInt(em.getProperties().getProperty("HeadMap", "0")) == 1) {
                        player.changeMap(MapID.培羅德的頭, 0);
                    }
                    break;
                }
                case MapID.培羅德的頭: {
                    MapleMap smap = eim.getMapInstance(mapID);
                    eim.schedule(new Runnable() {
                        @Override
                        public void run() {
                            List<MapleCharacter> players = smap.getCharacters();
                            if (players.size() > 0) {
                                for (int i = 1; i <= 2; i++) {
                                    MapleMonster mob = MapleLifeFactory.getMonster(i == 1 ? MobID.墮落貝伊之石_2 : MobID.墮落貝伊之石_3);
                                    if (mob == null) {
                                        continue;
                                    }
                                    mob.setStance(i == 1 ? 2 : 3);
                                    mob.setAppearType((short) 46);
                                    mob.setUnk(i == 1 ? 1 : -1);
                                    mob.setUnk1(i == 1 ? 0 : 1);
                                    smap.spawnMonsterOnGroundBelow(mob, new Point(i == 1 ? -650 : 650, 62));
                                }
                            }
                            eim.schedule(this, 10000);
                        }
                    }, 100);
                    break;
                }
                case MapID.培羅德的右腳下層:
                case MapID.培羅德的右腳上層:
                case MapID.培羅德的左腳下層:
                case MapID.培羅德的左腳上層:
                case MapID.培羅德的右上臂:
                case MapID.培羅德的左上臂: {
                    MapleMap smap = eim.getMapInstance(mapID);
                    List<Point> sps = new LinkedList<>(smap.getSpawnPoints());
                    if (sps.size() > 0) {
                        for (int i = 1; i <= 3; i++) {
                            int n = i;
                            int delay = i == 1 ? 2110 : i == 2 ? 4500 : 3570;
                            eim.schedule(new Runnable() {
                                @Override
                                public void run() {
                                    List<MapleCharacter> players = smap.getCharacters();
                                    if (players.size() > 0) {
                                        Collections.shuffle(sps);
                                        int nCount = Randomizer.rand(1, Math.min(sps.size(), 4));
                                        List<Point> points = new LinkedList<>();
                                        for (int j = 0; j < nCount; j++) {
                                            points.add(sps.get(j));
                                        }
                                        for (MapleCharacter chr : players) {
                                            chr.send(MaplePacketCreator.UserRequestChangeMobZoneState("DropStoneGiantBoss" + n, 0, points));
                                            chr.send(MaplePacketCreator.trembleEffect(1, delay, 100));
                                            List<String> list = ((List<String>) chr.getTempValues().computeIfAbsent("MobZoneState", v -> new LinkedList<>()));
                                            for (int j = 0; j < points.size(); j++) {
                                                list.add("DropStoneGiantBoss" + n);
                                            }
                                        }
                                    }
                                    eim.schedule(this, delay + 4000);
                                }
                            }, 100);
                        }
                    }
                    break;
                }
            }
        }
        String map = String(player.getMapId());
        if (!infomap.containsKey(map) || parseInt(infomap.get(map)) == 1) {
            if (eim.getPlayers().stream().noneMatch(chr -> chr != player && chr.getMapId() == player.getMapId())) {
                infomap.put(String(player.getMapId()), "0");
            }
        }
    }

    @Override
    public void enterField(EventInstanceManager eim, MapleCharacter player) {
        for (int id : mapIDs) {
            if (id == player.getMapId()) {
                Map<String, String> infomap = (Map<String, String>) eim.getValues().computeIfAbsent("InfoMap", v -> new LinkedHashMap<>());
                if (player.getMapId() != MapID.培羅德的心臟_獎勵) {
                    String map = String(player.getMapId());
                    if (!infomap.containsKey(map) || parseInt(infomap.get(map)) < 1) {
                        infomap.put(String(player.getMapId()), "1");
                    }
                }
                switch (player.getMapId()) {
                    case MapID.往培羅德:
                        if (parseInt(eim.getProperty("open")) > 1) {
                            player.send(MaplePacketCreator.ShowPortal("open", 2));
                        }
                        break;
                    case MapID.培羅德的頭:
                        String state = eim.getProperties().getProperty("BeidlerHead", "1");
                        if (state.length() > 1) {
                            player.send(MaplePacketCreator.ShowPortal("phase2-1", 2));
                            player.send(MaplePacketCreator.ShowPortal("phase2-2", 2));
                        }
                        if (state.length() > 2) {
                            player.send(MaplePacketCreator.ShowPortal("phase3", 2));
                        }
                        long startTime = (long) eim.getValues().getOrDefault("giantVellud3StartTime", 0L);
                        if (startTime > 0) {
                            startTime = System.currentTimeMillis() - startTime;
                            player.send_other(MaplePacketCreator.getClockGiantBoss(phaseTime, (int) (phaseTime - startTime)), true);
                        }
                        break;
                    case MapID.培羅德的心臟_獎勵:
                        player.send(UIPacket.getTopMsg("擊退難度  : " + (parseInt(eim.getProperty("Core")) + 1)));
                        player.openNpc(9390124, "GiantBossReward");
                        player.send(MaplePacketCreator.sendGhostStatus("clearType", "5"));
                        break;
                    default:
                        switch (player.getMapId()) {
                            case MapID.培羅德的右肩: {
                                MapleMonster mob = player.getMap().getMobObjectByID(MobID.培羅德的右肩);
                                if (mob == null || mob.getHPPercent() <= 50) {
                                    player.send(MaplePacketCreator.ShowPortal("phase3", 2));
                                }
                                break;
                            }
                            case MapID.培羅德的左肩: {
                                MapleMonster mob = player.getMap().getMobObjectByID(MobID.培羅德的左肩);
                                if (mob == null || mob.getHPPercent() <= 50) {
                                    player.send(MaplePacketCreator.ShowPortal("phase3", 2));
                                }
                                break;
                            }
                        }
                        if (parseInt(infomap.getOrDefault(String(player.getMapId()), "0")) == 2) {
                            switch (player.getMapId()) {
                                case MapID.培羅德西邊懸崖上段:
                                case MapID.培羅德東邊懸崖上段:
                                    player.send(MaplePacketCreator.ShowPortal("open", 2));
                                    break;
                            }
                            switch (player.getMapId()) {
                                case MapID.培羅德的腹部:
                                    player.send(MaplePacketCreator.ShowPortal("clear2", 2));
                                    player.send(MaplePacketCreator.ShowPortal("clear1", 2));
                                    break;
                                case MapID.培羅德西邊懸崖上段:
                                case MapID.培羅德東邊懸崖上段:
                                case MapID.培羅德的右肩:
                                case MapID.培羅德的左肩:
                                    player.send(MaplePacketCreator.ShowPortal("clear", 2));
                                    break;
                            }
                        }
                        break;
                }
                eim.broadcastPacket(MaplePacketCreator.SendGiantBossMap(infomap));
                break;
            }
        }
    }

    @Override
    public void monsterKilled(EventInstanceManager eim, MapleCharacter chr, int mobID) { //殺死怪物
        switch (chr.getMapId()) {
            case MapID.往培羅德:
            case MapID.培羅德的心臟:
            case MapID.培羅德的心臟_獎勵:
                break;
            default:
                int nCount = (int) chr.getMap().getAllMonster().stream().filter(monster -> !hideMob.contains(monster.getId())).count();
                switch (chr.getMapId()) {
                    case MapID.培羅德的腹部:
                    case MapID.培羅德的右肩:
                    case MapID.培羅德的左肩:
                        break;
                    case MapID.培羅德的頭:
                        if (mobID != MobID.培羅德的頭_3階) {
                            nCount = 1;
                        }
                        break;
                    default:
                        chr.send_other(UIPacket.getTopMsg("目前這個地方還剩下 " + nCount + "個邪惡氣息。"), true);
                        break;
                }
                if (nCount == 0) {
                    Map<String, String> infomap = (Map<String, String>) eim.getValues().computeIfAbsent("InfoMap", v -> new LinkedHashMap<>());
                    infomap.put(String(chr.getMapId()), "2");
                    switch (chr.getMapId()) {
                        case MapID.培羅德西邊懸崖上段:
                        case MapID.培羅德東邊懸崖上段:
                            chr.getMap().showPortalEffect("open", 1);
                            break;
                        case MapID.培羅德的右肩:
                        case MapID.培羅德的左肩:
                            chr.getMap().showPortalEffect("phase3", 1);
                            break;
                    }
                    switch (chr.getMapId()) {
                        case MapID.培羅德的腹部:
                            chr.getMap().showPortalEffect("clear2", 1);
                            chr.getMap().showPortalEffect("clear1", 1);
                            break;
                        case MapID.培羅德西邊懸崖上段:
                        case MapID.培羅德東邊懸崖上段:
                        case MapID.培羅德的右肩:
                        case MapID.培羅德的左肩:
                            chr.getMap().showPortalEffect("clear", 1);
                            break;
                    }
                    chr.getMap().killAllMonsters(false);
                    chr.send_other(MaplePacketCreator.sendGhostStatus(String(chr.getMapId()), "2"), true);
                    if (chr.getMapId() == MapID.培羅德的頭) {
                        infomap.put("clearType", "4");
                        chr.send_other(MaplePacketCreator.sendGhostStatus("clearType", "4"), true);
                    }
                    chr.send_other(MaplePacketCreator.showEffect("aswan/clearF"), true);
                    chr.send_other(MaplePacketCreator.playSound("Party1/Clear"), true);
                }
                break;
        }
        MapleMonster mob = null;
        switch (mobID) {
            case MobID.培羅德的右肩:
            case MobID.培羅德的左肩:
                chr.send_other(UIPacket.getTopMsg("擊敗了" + (mobID == MobID.培羅德的右肩 ? "右" : "左") + "肩。請透過通道移動。"), true);
            case MobID.培羅德的腹部:
                eim.setProperty("Core", Math.max(parseInt(eim.getProperty("Core")) - 1, 0));
                break;
            case MobID.培羅德的頭:
                eim.setProperty("BeidlerHead", "11");
                chr.getMap().showPortalEffect("phase2-1", 1);
                chr.getMap().showPortalEffect("phase2-2", 1);
                mob = em.getMonster(MobID.培羅德的頭_2階);
                mob.changeHP(HP.get(parseInt(eim.getProperty("Core"))).get(1));
                chr.send_other(UIPacket.getTopMsg("培羅德的嘴已經無力化了。請繼續攻擊眼睛。"), true);
                break;
            case MobID.培羅德的頭_2階:
                eim.setProperty("BeidlerHead", "111");
                chr.getMap().showPortalEffect("phase3", 1);
                mob = em.getMonster(MobID.培羅德的頭_3階);
                mob.changeHP(HP.get(parseInt(eim.getProperty("Core"))).get(2));
                eim.getValues().put("giantVellud3StartTime", System.currentTimeMillis());
                eim.schedule(() -> end(eim), phaseTime);
                chr.send_other(UIPacket.getTopMsg("眼睛也無力化了。擊碎額頭的核心部位就可以擊退培羅德。"), true);
                chr.send_other(MaplePacketCreator.getClockGiantBoss(phaseTime, phaseTime), true);
                break;
            case MobID.培羅德的頭_3階:
                eim.getMapInstance(MapID.培羅德的心臟_獎勵).forceTrigger(8630000 + parseInt(eim.getProperty("Core")), (byte) 1);
                ((Map<String, String>) eim.getValues().computeIfAbsent("InfoMap", v -> new LinkedHashMap<>())).put("clearType", "5");
                eim.changedMap(MapID.培羅德的心臟_獎勵);
                eim.restartEventTimer(rewardTime);
                break;
        }
        if (mob != null) {
            mob.getStats().setChange(true);
            mob.changeLevelmod(parseInt(eim.getProperty("nlevel")), parseInt(eim.getProperty("rate")));
            eim.registerMonster(mob);
            eim.getMapInstance(MapID.培羅德的頭).spawnMonsterOnGroundBelow(mob, new java.awt.Point(7, 61));
        }
    }

    @Override
    public void monsterDamaged(EventInstanceManager eim, MapleCharacter player, int mobID, long damage) {
        switch (mobID) {
            case MobID.培羅德的右肩:
            case MobID.培羅德的左肩:
                if (player.getMap().getMobObjectByID(mobID).getHPPercent() <= 50) {
                    MapleMap map = player.getMap();
                    if (map.getMobObjectByID(MobID.肩膀魔王廣域攻擊用替身) == null) {
                        MapleMonster mob = em.getMonster(MobID.肩膀魔王廣域攻擊用替身);
                        List<Point> fhs = new ArrayList<>();
                        for (MapleFoothold fh : map.getFootholds().getAllRelevants()) {
                            int count = Math.max(1, (fh.getX2() - fh.getX1()) / 100);
                            for (int i = 0; i < count; i++) {
                                fhs.add(new Point(fh.getX1() + i * 100, fh.getY1()));
                            }
                        }
                        eim.registerDeadBoundMob(mob, () -> {
                            List<MapleCharacter> players = map.getCharacters();
                            if (players.size() > 0) {
                                Collections.shuffle(fhs);
                                for (MapleCharacter chr : players) {
                                    chr.send(MaplePacketCreator.UserRequestChangeMobZoneState("palmAttackGiantBoss" + (mobID == MobID.培羅德的右肩 ? "L" : "R"), 0, Collections.singletonList(fhs.get(0))));
                                    chr.send(MaplePacketCreator.trembleEffect(1, 0, 30));
                                    ((List<String>) chr.getTempValues().computeIfAbsent("MobZoneState", v -> new LinkedList<>())).add("palmAttackGiantBoss" + (mobID == MobID.培羅德的右肩 ? "L" : "R"));
                                }
                            }
                        }, 9000);
                        map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(151, 69));
                        player.getMap().showPortalEffect("phase3", 1);
                    }
                }
                break;
        }
    }
}
