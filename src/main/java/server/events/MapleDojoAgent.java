/*
 This file is part of the OdinMS Maple Story Server
 Copyright (C) 2008 ~ 2010 Patrick Huy <patrick.huy@frz.cc> 
 Matthias Butz <matze@odinms.de>
 Jan Christian Meyer <vimes@odinms.de>

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License version 3
 as published by the Free Software Foundation. You may not use, modify
 or distribute this program under any other version of the
 GNU Affero General Public License.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package server.events;

import client.MapleCharacter;
import configs.ServerConfig;
import constants.GameConstants;
import constants.enums.FieldEffectType;
import handling.channel.ChannelServer;
import packet.EffectPacket;
import packet.MaplePacketCreator;
import scripting.event.EventScriptManager;
import scripting.npc.NPCScriptManager;
import server.Timer.MapTimer;
import server.life.ForcedMobStat;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.maps.MapleMap;
import server.maps.MapleMapFactory;
import server.quest.MapleQuest;
import tools.Randomizer;

import java.awt.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

public class MapleDojoAgent {

    public final static int BaseAgentMapId = 925070000;
    public static int ClockSec = 900;
    private final static Point point1 = new Point(140, 7),
            point2 = new Point(-200, 7),
            point3 = new Point(355, 7);
    private static final Map<Integer, DojoInstance> instances = new LinkedHashMap<>();

    private static class DojoInstance {
        public long RemainingTime = -1;
        public boolean Pause = false;
        public Runnable Runable = null;
        public ScheduledFuture<?> ClockTask = null;
        public MapleMap Instance = null;
    }

    public static boolean warpStartAgent(final MapleCharacter c) {
        MapleMapFactory mf;
        if (c == null || c.getClient() == null || c.getClient().getChannelServer() == null || (mf = c.getClient().getChannelServer().getMapFactory()) == null) {
            return false;
        }
        if (instances.containsKey(c.getId())) {
            DojoInstance di = instances.get(c.getId());
            if (di.Instance != null) {
                mf.removeInstanceMap(di.Instance.getInstanceId());
            }
            di.Instance = null;
            if (di.ClockTask != null && !di.ClockTask.isCancelled() && !di.ClockTask.isDone()) {
                di.ClockTask.cancel(true);
                di.ClockTask = null;
            }
        }
        MapleMap map = mf.CreateInstanceMap(BaseAgentMapId, true, true, true, EventScriptManager.getNewInstanceMapId());
        if (map != null) {
            DojoInstance di = new DojoInstance();
            instances.put(c.getId(), di);
            di.Instance = map;
            c.updateOneInfo(3847, "NResult", "start");
            c.updateOneInfo(3847, "Nenter", new SimpleDateFormat("yy/MM/dd/HH/mm").format(new Date()));
            c.updateOneInfo(3847, "NFloor", "0");
            c.updateOneInfo(3847, "NTime", "0");
            MapleQuest.getInstance(7279).forceStart(c, 0, "1");
            c.changeMap(map);
            return true;
        }
        return false;
    }

    public static boolean warpNextMap_Agent(final MapleCharacter c) {
        MapleMapFactory mf;
        if (c == null || !instances.containsKey(c.getId()) || c.getClient() == null || c.getClient().getChannelServer() == null || (mf = c.getClient().getChannelServer().getMapFactory()) == null) {
            return false;
        }

        final int thisStage = (c.getMapId() - BaseAgentMapId) / 100;

        MapleMap map = c.getMap();
        if (thisStage != 0 && map.getMobObjectByID(9300216) == null) {
            return false;
        }

        if (thisStage >= 80) {
            map = mf.getMap(925020003);
        } else {
            map = mf.CreateInstanceMap(BaseAgentMapId + ((thisStage + 1) * 100), true, true, true, EventScriptManager.getNewInstanceMapId());
        }

        if (map != null) {
            DojoInstance di = instances.get(c.getId());
            if (di.Instance != null) {
                mf.removeInstanceMap(di.Instance.getInstanceId());
            }
            if (thisStage > 0) {
                final int points = getDojoPoints(thisStage);
                if (points > 0) {
                    c.send(MaplePacketCreator.showRedNotice(points + "點數已獲得。"));
                    c.gainQuestPoint(3887, points);
                }
                c.updateOneInfo(100464, "Clear", "1");
                c.updateOneInfo(100464, "Floor", String.valueOf(thisStage));
                int time = ClockSec - (int) di.ClockTask.getDelay(TimeUnit.SECONDS);
                if (time < 0) {
                    time = 0;
                }
                if (thisStage >= 80 && di.ClockTask != null) {
                    if (!di.ClockTask.isCancelled() && !di.ClockTask.isDone()) {
                        di.ClockTask.cancel(true);
                    }
                    di.ClockTask = null;
                }
                c.updateOneInfo(100464, "Time", String.valueOf(time));

                int nFloor = c.getOneInfo(3893, "Floor") == null ? 0 : Integer.parseInt(c.getOneInfo(3893, "Floor"));
                if (nFloor < thisStage) {
                    c.send(MaplePacketCreator.showRedNotice("已達成本週最高紀錄。"));
                }
                c.updateOneInfo(3847, "NFloor", String.valueOf(thisStage));
                c.updateOneInfo(3847, "NTime", String.valueOf(time));
                if (nFloor < thisStage) {
                    c.updateOneInfo(3893, "Floor", String.valueOf(thisStage));
                }
                c.send(EffectPacket.playPortalSE());
            }
            if (thisStage < 80) {
                di.Instance = map;
            }
            c.changeMap(map, map.getPortal(0));
            return true;
        }
        return false;
    }

    public static void stopAgent(final int cid) {
        if (!instances.containsKey(cid)) {
            return;
        }
        DojoInstance di = instances.get(cid);
        if (di.ClockTask != null) {
            if (!di.ClockTask.isCancelled() && !di.ClockTask.isDone()) {
                di.ClockTask.cancel(true);
            }
            di.ClockTask = null;
        }
        if (di.Instance != null) {
            ChannelServer ch = ChannelServer.getInstance(di.Instance.getChannel());
            if (ch != null && ch.getMapFactory() != null) {
                ch.getMapFactory().removeInstanceMap(di.Instance.getInstanceId());
            }
            di.Instance = null;
        }
        instances.remove(cid);
    }

    public static void checkAgent(final MapleCharacter c) {
        if (c == null) {
            return;
        }
        stopAgent(c.getId());
        String nResult = c.getOneInfo(3847, "NResult");
        if (nResult != null && !"complete".equalsIgnoreCase(nResult)) {
            c.updateOneInfo(3847, "NResult", "complete");
            String sFloor = c.getOneInfo(3847, "NFloor");
            int nFloor = 0;
            if (sFloor != null && !sFloor.isEmpty()) {
                nFloor = Integer.parseInt(sFloor);
            }
            String sTime = c.getOneInfo(3847, "NTime");
            int nTime = 0;
            if (sTime != null && !sTime.isEmpty()) {
                nTime = Integer.parseInt(sTime);
            }

            sFloor = c.getOneInfo(100466, "Floor");
            int rFloor = 0;
            if (sFloor != null && !sFloor.isEmpty()) {
                rFloor = Integer.parseInt(sFloor);
            }
            sTime = c.getOneInfo(100466, "Time");
            int rTime = 0;
            if (sTime != null && !sTime.isEmpty()) {
                rTime = Integer.parseInt(sTime);
            }
            if (nFloor > rFloor || (nFloor == rFloor && nTime < rTime)) {
                c.updateOneInfo(100466, "Floor", String.valueOf(nFloor));
                c.updateOneInfo(100466, "Time", String.valueOf(nTime));
                c.updateOneInfo(100466, "Scr", "1");
            }
            NPCScriptManager.getInstance().start(c.getClient(), 2091011, "dojang_complete");
        }
    }

    public static void reset(final MapleCharacter c) {
        c.dispel();
        startClock(c);
        pauseClock(c, 30);
        c.send(EffectPacket.showScreenEffect(FieldEffectType.Screen_AutoLetterBox, "Map/Effect2.img/MuruengTime", 0));
        c.getMap().startMapEffect("因為師傅的特別道法，讓所有加持效果都解除了。這樣才公平對吧？我會給你30秒，準備好就上去吧。", 5120024);
    }

    public static void startClock(final MapleCharacter c) {
        final ChannelServer ch;
        final MapleMap to;
        if (c == null || !instances.containsKey(c.getId()) || c.getClient() == null || (ch = c.getClient().getChannelServer()) == null || ch.getMapFactory() == null || (to = ch.getMapFactory().getMap(925020002)) == null) {
            return;
        }
        final int cid = c.getId();
        DojoInstance di = instances.get(cid);
        if (di.ClockTask != null && !di.ClockTask.isCancelled() && !di.ClockTask.isDone()) {
            di.ClockTask.cancel(true);
        }
        di.RemainingTime = ClockSec * 1000;
        di.Runable = () -> {
            if (c != null && to != null) {
                MapTimer.getInstance().schedule(() -> c.changeMap(to, to.getPortal(0)), 3000);
            }
            stopAgent(cid);
        };
        di.ClockTask = MapTimer.getInstance().schedule(di.Runable, di.RemainingTime);
        c.send(MaplePacketCreator.getClock8(0, ClockSec));
    }

    public static void pauseClock(final MapleCharacter c, final int timeSec) {
        if (c == null || !instances.containsKey(c.getId())) {
            return;
        }
        final int cid = c.getId();
        DojoInstance di = instances.get(cid);
        if (di.ClockTask == null || di.ClockTask.isCancelled() || di.ClockTask.isDone()) {
            return;
        }
        di.RemainingTime = di.ClockTask.getDelay(TimeUnit.MILLISECONDS);
        di.ClockTask.cancel(true);
        di.Pause = true;
        di.ClockTask = MapTimer.getInstance().schedule(() -> {
            resumeClock(cid);
            c.send(MaplePacketCreator.setClockPause(false, ClockSec));
        }, timeSec * 1000);
        c.send(MaplePacketCreator.setClockPause(true, ClockSec));
    }

    public static void resumeClock(final int cid) {
        if (!instances.containsKey(cid)) {
            return;
        }
        DojoInstance di = instances.get(cid);
        if (di.Runable == null) {
            return;
        }
        if (di.ClockTask != null && !di.ClockTask.isCancelled() && !di.ClockTask.isDone()) {
            di.ClockTask.cancel(true);
        }
        di.Pause = false;
        di.ClockTask = MapTimer.getInstance().schedule(di.Runable, di.RemainingTime);
    }

    public static void showClock(final MapleCharacter c) {
        if (c == null || !instances.containsKey(c.getId())) {
            return;
        }
        final int cid = c.getId();
        DojoInstance di = instances.get(cid);
        if (di.ClockTask == null) {
            return;
        }
        if (di.Pause) {
            resumeClock(cid);
        }
        c.send(MaplePacketCreator.getClock8(ClockSec - (int) di.ClockTask.getDelay(TimeUnit.SECONDS), ClockSec));
        spawnMonster(c.getMap());
    }

    public static void checkClearStage(final MapleCharacter c) {
        if (GameConstants.isDojo(c.getMapId()) && c.getMap() != null && c.getMap().getAllMonster().size() == 0) {
            c.getMap().spawnMonster(MapleLifeFactory.getMonster(9300216), new Point(0, 7), -1);
            c.getMap().setReactorState();
            if (925078000 == c.getMapId()) {
                c.dropMessage(-1, "恭喜你。武陵道場的所有關卡都清除了。");
                c.send(MaplePacketCreator.setClockPause(true, ClockSec));
                DojoInstance di = instances.get(c.getId());
            } else {
                c.dropMessage(-1, "已擊敗對手，咕咕鐘將暫停計時10秒。");
                pauseClock(c, 10);
            }
            c.send(EffectPacket.playFieldSound("Dojang/clear", 100));
            c.send(EffectPacket.showScreenEffect(FieldEffectType.Screen_AutoLetterBox, "dojang/end/clear", 0));
        }
    }

    private static int getDojoPoints(final int stage) {
        return stage == 0 ? 0 : stage % 10 == 0 ? 110 : 10;
    }

    private static void spawnMonster(final MapleMap map) {
        if (map == null) {
            return;
        }
        final int stage = (map.getId() - BaseAgentMapId) / 100;
        final int mobid;

        final int[] mobs = {
                9305600, // 紅寶王
                9305601, // 蘑菇王
                9305602, // 樹妖王
                9305603, // 藍色蘑菇王
                9305604, // 殭屍蘑菇王
                9305605, // 超級綠水靈
                9305606, // 沼澤巨鱷
                9305607, // 巨居蟹
                9305608, // 殭屍猴王
                9305619, // 凡雷恩
                9305610, // 金屬巨人
                9305617, // 路邊攤
                9305612, // 巴洛古
                9305611, // 艾利傑
                9305628, // 地獄巴洛古
                9305682, // 雪山魔女
                9305683, // 火蚌殼
                9305614, // 仙人長老
                9305614, // 爸爸精靈
                9305609, // 希拉
                9305623, // 迪特和洛依
                9305625, // 奇美拉
                9305624, // 弗蘭肯洛伊德
                9305684, // 碴烏
                9305658, // 艾畢奈亞
                9305687, // 泥人領導者
                9305616, // 咕咕鐘
                9305690, // 魔王幽靈
                9305692, // 妖怪綿羊
                9305629, // 阿卡伊農
                9305630, // 噴火龍
                9305631, // 格瑞芬多
                9305659, // 薛西斯
                9305633, // 拉圖斯
                9305621, // 巨型戰鬥機
                9305632, // 雪毛怪人
                9305694, // 厄運死神
                9305634, // 亞尼
                9305656, // 奧門王
                9305639, // 梅格耐斯
                9305660, // 塔爾加
                9305661, // 斯卡里恩
                9305627, // 喵怪仙人
                9305622, // 金勾海賊王
                9305662, // 六手邪神
                9305635, // 寒霜冰龍
                9305636, // 多多
                9305637, // 利里諾斯
                9305638, // 萊伊卡
                9305695, // 皮卡啾
                9305696, // 搖滾精神
                9305663, // 黑岩寄生獸
                9305664, // 夢幻龍族
                9305665, // 龍騎士
                9305666, // 鷹眼
                9305667, // 伊卡勒特
                9305668, // 伊麗娜
                9305669, // 奧茲
                9305670, // 米哈逸
                9305671, // 西格諾斯
                9305697, // 海怒斯
                9305698, // 雷克斯
                9305699, // 卡翁
                9305700, // 變形樹妖王
                9305701, // 天空守護靈
                9305657, // 格奧爾格
                9305702, // 墮落魔族強化狼旗手
                9305703, // 亞勒瑪
                9305704, // 揪樂樹
                9305705, // 史烏
                9305706, // 淨化者
                9305707, // 惡化的協調精靈
                9305708, // 蒸發的艾爾達斯
                9305672, // 亞藍
                9305673, // 鳳仙
                9305674, // 悟空
                9305675, // 狸大師
                9305676, // 黃龍
                9305677, // 赤虎
                9305640 // 武公
        };

        if (stage > 0 && mobs.length >= stage) {
            mobid = mobs[stage - 1];
        } else {
            mobid = 0;
        }

        if (mobid != 0) {
            final int rand = Randomizer.nextInt(3);
            MapTimer.getInstance().schedule(() -> {
                MapleMonster mob = MapleLifeFactory.getMonster(mobid);
                ForcedMobStat changeStats = mob.getForcedMobStat();
                if (changeStats == null) {
                    mob.setForcedMobStat(mob.getStats());
                    changeStats = mob.getForcedMobStat();
                }
                long hp = mob.getMobMaxHp();
                int watk = changeStats.getWatk();
                int matk = changeStats.getMatk();
                int pdrate = changeStats.getPDRate();
                int mdrate = changeStats.getMDRate();

                hp *= ServerConfig.dojoMobMaxHpR / 100.0;
                watk *= ServerConfig.dojoMobAtkR / 100.0;
                matk *= ServerConfig.dojoMobAtkR / 100.0;
                pdrate *= ServerConfig.dojoMobDefenseRateR / 100.0;
                mdrate *= ServerConfig.dojoMobDefenseRateR / 100.0;

                if (mob.getMobMaxHp() == hp && changeStats.getWatk() == watk && changeStats.getMatk() == matk && changeStats.getPDRate() == pdrate && changeStats.getMDRate() == mdrate) {
                    changeStats = null;
                } else {
                    mob.changeHP(hp < 0 ? Long.MAX_VALUE : hp);
                    changeStats.setWatk(watk < 0 ? Integer.MAX_VALUE : watk);
                    changeStats.setMatk(matk < 0 ? Integer.MAX_VALUE : matk);
                    changeStats.setPDRate(pdrate < 0 ? Integer.MAX_VALUE : pdrate);
                    changeStats.setMDRate(mdrate < 0 ? Integer.MAX_VALUE : mdrate);
                }
                mob.setForcedMobStat(changeStats);

                map.spawnMonsterWithEffect(mob, 15, rand == 0 ? point1 : rand == 1 ? point2 : point3);
            }, 3000);
        }
    }
}
