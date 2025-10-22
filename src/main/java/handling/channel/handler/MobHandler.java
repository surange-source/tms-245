package handling.channel.handler;

import client.MapleCharacter;
import client.MapleClient;
import client.status.MonsterStatus;
import constants.enums.MonsterSkillType;
import constants.skills.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import packet.EffectPacket;
import scripting.event.EventInstanceManager;
import scripting.map.NodeScriptManager;
import server.Timer;
import server.life.MapleMonster;
import server.life.MobSkill;
import server.life.MobSkillFactory;
import server.maps.MapleMap;
import server.maps.MapleMapObjectType;
import server.maps.MapleNodes;
import server.maps.MapleReactor;
import server.movement.LifeMovementFragment;
import tools.types.Pair;
import server.Randomizer;
import tools.types.Triple;
import tools.data.MaplePacketReader;
import packet.MobPacket;

import java.awt.*;
import java.util.*;
import java.util.List;

public class MobHandler {

    private static final Logger log = LogManager.getLogger(MobHandler.class);
    /*
     * 怪物移動
     */

    public static void MoveMonster(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        int objectid = slea.readInt();
        MapleMonster monster = chr.getMap().getMonsterByOid(objectid);
        if (monster == null || monster.getType() != MapleMapObjectType.MONSTER) {
            return;
        }
        if (monster.getLinkCID() > 0) {
            return;
        }
        List<LifeMovementFragment> res;
        int randAttack = 0;
        short moveid = slea.readShort();
        boolean useSkill = (slea.readByte() & 0xFF) > 0;
        byte mode = slea.readByte();
        int skillId = slea.readShort(); //是否使用技能 V.160 byte=>short
        int skillLevel = slea.readShort(); //技能ID V.160 byte=>short
        short effectAfter = slea.readShort(); //使用技能的延遲時間
        slea.readShort(); //V.160 new
        slea.readByte();//V.181 new
        slea.readByte();//V.181 new

        int realskill = 0;
        int level = 0;

        List<Pair<Short, Short>> list = new ArrayList<>();
        byte un1 = slea.readByte();
        if (un1 > 0) {
            for (int i = 0; i < un1; i++) {
                list.add(new Pair<>(slea.readShort(), slea.readShort()));
            }
        }
        Map<Integer, Short> hashMap = new HashMap<>();
        byte un2 = slea.readByte();
        if (un2 > 0) {
            for (int i = 0; i < un2; i++) {
                hashMap.put(i, slea.readShort());
            }
        }
        if (slea.readInt() != 0) {
            slea.readInt();
            slea.readInt();
            slea.readInt();
            slea.readInt();
            slea.readInt();
            slea.readInt();
            slea.readInt();
            slea.readInt();
            slea.readInt();
            slea.readInt();
            slea.readInt();
        }
        Map<Integer, Integer> hashMap2 = new HashMap<>();
        byte un3 = slea.readByte();
        if (un3 > 0) {
            for (int i = 0; i < un3; i++) {
                hashMap2.put(i, slea.readInt());
            }
        }
        if (slea.readByte() != 0) {
            //slea.readShort();
        }
        if (slea.readInt() == 18) {
            slea.readMapleAsciiString();
        }
        slea.readInt();
        slea.readInt();
        slea.readInt();
        slea.readInt();
        slea.readByte();
        monster.setMobCtrlSN(moveid);
        if (useSkill) {
            Pair<Integer, Integer> pair = null;
            int skillSize = monster.getSkillSize();
            if (skillSize > 0) {
                switch (monster.getId()) {
                    case 8880341:
                    case 8880343:
                    case 8880344: {
                        if (monster.getHPPercent() <= Math.ceil(monster.getHpLimitPercent() * 100.0) && !monster.isBuffed(MonsterStatus.Invincible)) {
                            for (Triple<Integer, Integer, Integer> triple : monster.getSkills()) {
                                if ((triple).getLeft() == MonsterSkillType.INVINCIBLE.getId()) {
                                    pair = new Pair<>(triple.getLeft(), triple.getMid());
                                    break;
                                }
                            }
                        }
                        break;
                    }
                }
                for (int n = 0; n < 100 && pair == null; ++n) {
                    Triple<Integer, Integer, Integer> triple = monster.getSkills().get(Randomizer.nextInt(skillSize));
                    int mid = triple.getLeft();
                    int mlv = triple.getMid();
                    MobSkill mobSkill = MobSkillFactory.getMobSkill(mid, mlv);
                    if ((mid != 242 || mlv != 8) && mid != MonsterSkillType.INVINCIBLE.getId() && mobSkill != null) {
                        if (!mobSkill.checkCurrentBuff(chr, monster)) {
                            int n2 = 0;
                            int limit = mobSkill.getLimit();
                            for (int summon : mobSkill.getSummons()) {
                                n2 += chr.getMap().getMobSizeByID(summon);
                            }
                            if (limit <= 0 || n2 < limit) {
                                final long currentTimeMillis = System.currentTimeMillis();
                                if (currentTimeMillis - monster.getLastSkillUsed(mid) > (monster.getStats().isBoss() ? (mobSkill.getInterval() / 3) : mobSkill.getInterval()) && !mobSkill.isSummonOnce()) {
                                    final int hpPercent = monster.getHPPercent();
                                    if (mobSkill.getMobMpCon() <= monster.getMp() && hpPercent <= mobSkill.getMobHp()) {
                                        pair = new Pair<>(mid, mlv);
                                        monster.setLastSkillUsed(mid, currentTimeMillis, mobSkill.getCoolTime());
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (pair == null) {
                realskill = 0;
                level = 0;
                if (monster.getStats().getMobAttacks() != null && !monster.getStats().getMobAttacks().isEmpty()) {
                    randAttack = Randomizer.nextInt(monster.getStats().getMobAttacks().size());
                }
            } else {
                realskill = pair.getLeft();
                level = pair.getRight();
                switch (realskill) {
                    case 143: {
                        chr.getMap().showWeatherEffectNotice("注意：請停止攻擊，" + monster.getStats().getName() + "即將開啟反射物攻狀態！", 162, 3000);
                        break;
                    }
                    case 144: {
                        chr.getMap().showWeatherEffectNotice("注意：請停止攻擊，" + monster.getStats().getName() + "即將開啟反射魔攻狀態！", 162, 3000);
                        break;
                    }
                    case 145: {
                        chr.getMap().showWeatherEffectNotice("注意：請停止攻擊，" + monster.getStats().getName() + "即將開啟反射物攻和魔攻狀態！", 162, 3000);
                        break;
                    }
                }
            }
        }
        final int gatherDuration = slea.readInt();
        final int nVal1 = slea.readInt();
        final Point mPos = slea.readPos();
        final Point oPos = slea.readPos();
        res = MovementParse.parseMovement(slea, 2);
//        if (res != null && slea.available() != 29) {　// TODO
//            MovementParse.log.error("parse mob move available != 29.available:" + slea.available() + "packet:" + slea.toString(true));
//        }
//        slea.readByte();
//        slea.readInt();
//        slea.readInt();
//        slea.readInt();
//        slea.readInt();
//        slea.readInt();
//        slea.readByte();
//        slea.readInt();
//        slea.readInt();
        MapleMap map = chr.getMap();
        Pair<Long, List<LifeMovementFragment>> lastRes = monster.getLastRes();
        if (lastRes != null) {
            if (System.currentTimeMillis() - lastRes.left > 3000) {
                lastRes = null;
                monster.setLastRes(null);
            } else {
                res = lastRes.right;
            }
        }
        MovementParse.updatePosition(res, monster, -1);
        map.objectMove(lastRes != null ? 0 : chr.getId(), monster, MobPacket.moveMonster(objectid, useSkill, mode, skillId, skillLevel, effectAfter, list, hashMap, hashMap2, gatherDuration, nVal1, mPos, oPos, res));
        if (skillId > 0 && skillLevel > 0 && monster.getSkillSize() > 0) {
            for (Triple<Integer, Integer, Integer> pair : monster.getSkills()) {
                if (pair.getLeft() == skillId && pair.getMid() == skillLevel) {
                    MobSkill mobSkill = MobSkillFactory.getMobSkill(skillId, skillLevel);
                    if (mobSkill != null) {
                        mobSkill.applyEffect(c.getPlayer(), monster, pair.getRight());
                    }
                    break;
                }
            }
        }
        if (monster.isAlive() && chr.isControlMonster(monster)) {
            c.announce(MobPacket.moveMonsterResponse(objectid, moveid, monster.getMp(), monster.isControllerHasAggro(), realskill, level, randAttack));
        }
//        if (res != null && res.size() > 0) {
//            if (slea.available() != 29) {
//                MovementParse.log.error("slea.available != 29 (movement parsing error)\r\n怪物ID: " + monster.getId() + "\r\n" + packet);
//                return;
//            }
//
//            if (useSkill || (monster.getStats().isSkeleton() && Randomizer.nextInt(10) < 7)) {
//                boolean used = false;
//                int size = monster.getSkillSize();
//                if (size > 0) {
//                    int random = Randomizer.nextInt(size);
//                    Triple<Integer, Integer, Integer> skillToUse = monster.getSkills().get(random);
//                    realskill = skillToUse.getLeft();
//                    level = skillToUse.getMid();
//                    MobSkill toUse = MobSkillFactory.getMobSkill(realskill, level);
//                    if (toUse != null && !toUse.checkCurrentBuff(chr, monster)) {
//                        final long currentTimeMillis = System.currentTimeMillis();
//                        if (currentTimeMillis - monster.getLastSkillUsed(realskill) > toUse.getCoolTime() && !toUse.isSummonOnce()) {
//                            int reqHp = (int) ((float) monster.getHp() / (float) monster.getMobMaxHp() * 100.0F);
//                            if (toUse.getMobMpCon() <= monster.getMp() && reqHp <= toUse.getMobHp()) {
//                                used = true;
//                                monster.setLastSkillUsed(realskill, currentTimeMillis, toUse.getCoolTime());
//                            }
//                        }
//                    }
//                }
//                if (used && monster.getStats().isSkeleton()) {
//                    skillId = realskill;
//                    skillLevel = level;
//                    realskill = 0;
//                    level = 0;
//                }
//                if (!used) {
//                    realskill = 0;
//                    level = 0;
//                }
//
//                if (chr.isShowPacket()) {
//                    if (skillLevel > 0) {
//                        chr.dropDebugMessage(1, "[怪物技能] 怪物:" + MapleLifeFactory.getMonsterName(monster.getId()) + "(" + monster.getId() + ") 技能ID:" + skillLevel + " action:" + skillId + " useSkill:" + useSkill + " after:" + effectAfter);
//                    }
//                }
//            }
//            MovementParse.updatePosition(res, monster, -1);
//            Point endPos = monster.getPosition();
//            map.broadcastMessage(c.getPlayer(), MobPacket.moveMonster(objectid, useSkill, mode, skillId, skillLevel, effectAfter, list, hashMap, hashMap2, startPos, res), endPos);
//            map.moveMonster(monster, monster.getPosition());
//
//            if (skillId > 0 && skillLevel > 0 && monster.getSkillSize() > 0) {
//                for (Triple<Integer, Integer, Integer> pair : monster.getSkills()) {
//                    if (pair.getLeft() == skillId && pair.getMid() == skillLevel) {
//                        MobSkill skillData = MobSkillFactory.getMobSkill(skillId, skillLevel);
//                        if (skillData != null) {
//                            skillData.applyEffect(c.getPlayer(), monster, pair.getRight(), true);
//                            break;
//                        }
//                        break;
//                    }
//                }
//            }
////            if (monster.checkAggro(mode == -1 && !useSkill && startPos.distance(endPos) <= 2.0) || monster.checkTrans(chr) || monster.getController() != chr) {
////                return;
////            }
////            if (!c.getPlayer().isAlive() || (skillId == -1 && monster.isControllerKnowsAboutAggro() && !monster.isFirstAttack())) {
////                monster.setControllerHasAggro(false);
////                monster.setControllerKnowsAboutAggro(false);
////            }
//            if (c.getPlayer().isControlMonster(monster)) {
//                c.announce(MobPacket.moveMonsterResponse(objectid, moveid, monster.getMp(), monster.isControllerHasAggro() | monster.isControllerKnowsAboutAggro(), realskill, level));
//            }
//        }
    }

    /*
     * 怪物自爆
     * 8500003 - 小黑水雷
     * 8500003 - 小黑水雷
     */
    public static void MobSelfDestruct(int oid, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) return;
        MapleMonster monster = chr.getMap().getMonsterByOid(oid);
        if (monster == null) {
            return;
        }
        byte selfd = monster.getStats().getSelfD();
        if (selfd != -1) {
            chr.getMap().monsterSelfDestruct(monster);
        }
    }

    /*
     * 怪物仇恨
     */
    public static void MobApplyCtrl(int monsteroid, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) { //no evidence :)
            return;
        }
        MapleMonster monster = chr.getMap().getMonsterByOid(monsteroid);
        if (monster != null) {
            int distance = (int) monster.getPosition().distance(chr.getPosition());
            if (monster.getController() == chr) {
                monster.setControllerHasAggro(distance < 1680);
                if (distance >= 1000) {
                    monster.removeController(chr);
                }
            }
        }
    }

    public static void MobAreaAttackDisease(MaplePacketReader slea, MapleCharacter chr) {
        if (chr == null) {
            return;
        }

        int moboid = slea.readInt();
        Rectangle rect = slea.readRect();

//        chr.send(MobPacket.showMonsterSpecialSkill(moboid));
    }

    public static void MobHitByMob(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null) return;
        int moboid = slea.readInt();
        slea.readInt();
        int hitteroid = slea.readInt();
        MapleMonster mob = player.getMap().getMonsterByOid(moboid);
        MapleMonster hitter = player.getMap().getMonsterByOid(hitteroid);
        if (mob != null && mob.isAlive() && hitter != null && hitter.isAlive()) {
            mob.damage(player, 0, Randomizer.rand((int)mob.getMobMaxHp() / 100, ((int)mob.getMobMaxHp() << 1) / 100), false);
        }
    }

    public static void MobAttackMob(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null) return;
        final int moboid1 = slea.readInt();
        slea.readInt();
        final int moboid2 = slea.readInt();
        slea.readByte();
        slea.readByte();
        slea.readInt();
        slea.readByte();
        slea.readPos();
        final MapleMonster mobObject = player.getMap().getMobObject(moboid1);
        final MapleMonster mobObject2 = player.getMap().getMobObject(moboid2);
        if (mobObject != null && mobObject2 != null) {
            mobObject2.damage(player, 0, 500L, false);
        }
    }

    public static void MobEscortCollision(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null) return;
        final int moboid = slea.readInt();
        final int nodeId = slea.readInt();
        final MapleMonster mobObject;
        if ((mobObject = player.getMap().getMobObject(moboid)) == null || nodeId <= 0) {
            return;
        }
        MapleNodes.MapleNodeInfo node = player.getMap().getNode(nodeId);
        if (node == null) return;
        if (node.attr == 2) {
            switch (player.getMapId() / 100) {
                case 9211203: {
                    final MapleReactor reactorByID;
                    if (node.key == 4 && (reactorByID = player.getMap().getReactorById(2118003)) != null) {
                        reactorByID.forceStartReactor(c);
                    }
                }
                case 9211200:
                case 9211201:
                case 9211202:
                case 9211204: {
                    if (node.stopInfo != null && node.stopInfo.PH.size() > 0) {
                        a(player.getMap(), node.stopInfo, 5120035, mobObject.getObjectId());
                        break;
                    }
                    break;
                }
                case 9320001:
                case 9320002:
                case 9320003: {
                    if (node.stopInfo != null && node.stopInfo.PH.size() > 0) {
                        a(player.getMap(), node.stopInfo, 拳霸.勾拳爆破_額外攻擊, mobObject.getObjectId());
                        break;
                    }
                    break;
                }
                case 9230402: {
                    if (node.stopInfo != null && node.stopInfo.PH.size() > 0) {
                        a(player.getMap(), node.stopInfo, 5120052, mobObject.getObjectId());
                        break;
                    }
                    break;
                }
                default: {
                    if (node.stopInfo != null && node.stopInfo.PH.size() > 0) {
                        a(player.getMap(), node.stopInfo, 0, mobObject.getObjectId());
                        break;
                    }
                    break;
                }
            }
            if (node.stopInfo != null && !node.stopInfo.PA.isEmpty()) {
                NodeScriptManager.getInstance().act(player.getClient(), node.stopInfo.PA, node.stopInfo.PB, mobObject.getObjectId());
            }
            if (node.stopInfo.PH.size() > 0) {
                Timer.MapTimer.getInstance().schedule(() -> c.announce(MobPacket.mobEscortStopEndPermission(mobObject.getObjectId())), (long)node.stopInfo.PB);
            }
        }
        if (player.getMap().isLastNode(nodeId + 1)) {
            switch (player.getMapId() / 100) {
                case 9211203: {}
                case 9920190: {
                    final EventInstanceManager eventInstance = player.getEventInstance();
                    if (player.checkEvent() && !"clear".equals(eventInstance.getProperty("stage19"))) {
                        eventInstance.setProperty("stage19", "clear");
                        player.getMap().showScreenEffect("quest/party/clear");
                        eventInstance.broadcastWeatherEffectNotice("你現在可以前往下一層了。", 147, 15000);
                        break;
                    }
                    break;
                }
            }
        }
    }

    private static void a(final MapleMap map, final MapleNodes.MapleNodeStopInfo abl, int n, final int n2) {
        if (abl.PE) {
            map.startMapEffect(abl.PH.get(0).getRight(), (n > 0) ? n : abl.PD, false);
        }
        n = 0;
        final String s = abl.PH.get(abl.PG ? Randomizer.nextInt(abl.PH.size()) : 0).getLeft();
        switch (s) {
            case "say": {
                n = 51;
                break;
            }
            case "attack1": {
                n = 15;
                break;
            }
        }
        map.broadcastMessage(MobPacket.MobEscortStopSay(n2, abl.PD, abl.PC * 1000, abl.PH.get(abl.PG ? Randomizer.nextInt(abl.PH.size()) : 0).getRight(), n));
    }

    public static void MobRequestEscortInfo(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null) return;
        final MapleMonster mobObject;
        if ((mobObject = player.getMap().getMobObject(slea.readInt())) == null) {
            return;
        }
        player.getClient().announce(MobPacket.MobRequestResultEscortInfo(mobObject, player.getMap()));
    }

    public static void PopulatusCraneRequest(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null) return;
        final int int1 = slea.readInt();
        final int int2 = slea.readInt();
        MobSkillFactory.getMobSkill(241, 8).applyTo(player);
        c.announce(EffectPacket.PapulatusFieldEffect(int1, int2, player.getId()));
        Timer.MapTimer.getInstance().schedule(() -> {
            if (player.getMap() != null) {
                player.getMap().broadcastMessage(EffectPacket.PapulatusFieldEffect(int1, int2, 0));
            }
        }, 2000L);

    }
}
