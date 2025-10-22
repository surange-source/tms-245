package packet;

import client.status.MonsterEffectHolder;
import client.status.MonsterStatus;
import constants.GameConstants;
import constants.enums.FieldEffectType;
import constants.skills.夜使者;
import handling.Buffstat;
import handling.opcode.SendPacketOpcode;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import server.life.MapleMonster;
import server.life.MobSkill;
import server.maps.MapleMap;
import server.maps.MapleNodes;
import server.maps.MapleSwordNode;
import server.movement.LifeMovementFragment;
import tools.DateUtil;
import tools.types.Pair;
import server.Randomizer;
import tools.data.MaplePacketLittleEndianWriter;

import java.awt.*;
import java.util.List;
import java.util.*;
import java.util.Map.Entry;

/**
 * *
 * 負責生成怪物Buff相關的數據包
 *
 * @author dongjak
 *
 */
public class MobPacket {

    private static final Logger log = LogManager.getLogger(MobPacket.class);

    /**
     * 怪物傷害數字顯示
     */
    public static byte[] damageMonster(int oid, long damage) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_MobCtrlHint.getValue());
        mplew.writeInt(oid);
        mplew.write(0);
        if (damage > Integer.MAX_VALUE) {
            mplew.writeInt(Integer.MAX_VALUE);
        } else {
            mplew.writeInt((int) damage);
        }

        return mplew.getPacket();
    }

    /**
     * 友好的怪物傷害數字顯示
     */
    public static byte[] damageFriendlyMob(MapleMonster mob, long damage, boolean display) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_MobCtrlHint.getValue());
        mplew.writeInt(mob.getObjectId());
        mplew.write(display ? 1 : 2); //false for when shammos changes map!
        if (display) {
            mplew.writeLong(mob.getHp());
            mplew.writeLong(mob.getMobMaxHp());
        }
        return mplew.getPacket();
    }

    /**
     * 殺死怪物
     */
    public static byte[] killMonster(int oid, int animation) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_MobLeaveField.getValue());
        mplew.writeInt(oid);
        mplew.write(animation); // 0 = dissapear, 1 = fade out, 2+ = special
        mplew.write(0);
        switch (animation) {
            case 0:
            case 1:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                mplew.writeInt(0);
                mplew.writeInt(0);
                if (animation == 9) {
                    mplew.writeInt(-1); // cid
                }
                break;
        }

        return mplew.getPacket();
    }

    /**
     * 吞噬怪物?
     */
    public static byte[] suckMonster(int oid, int chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_MobLeaveField.getValue());
        mplew.writeInt(oid);
        mplew.write(9);
        mplew.write(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(chr);

        return mplew.getPacket();
    }

    /**
     * 怪物加血
     */
    public static byte[] healMonster(int oid, int heal) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_MobCtrlHint.getValue());
        mplew.writeInt(oid);
        mplew.write(0);
        mplew.writeInt(-heal);

        return mplew.getPacket();
    }

    /**
     * 顯示怪物血量
     */
    public static byte[] showMonsterHP(int oid, int remhppercentage) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_MobHPIndicator.getValue());
        mplew.writeInt(oid);
        mplew.writeInt(remhppercentage);//V.160 byte=>int
        mplew.write(0);

        return mplew.getPacket();
    }

    /**
     * 顯示BOSS血條
     */
    public static byte[] showBossHP(MapleMonster mob) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_FieldEffect.getValue());
        mplew.write(FieldEffectType.MobHPTag); //V.107修改 以前0x05
        mplew.writeInt(mob.getId() == 9400589 ? 9300184 : mob.getId());
        mplew.writeLong(mob.getHp());
        mplew.writeLong(mob.getMobMaxHp());
        mplew.write(mob.getStats().getTagColor());
        mplew.write(mob.getStats().getTagBgColor());

        return mplew.getPacket();
    }

    /**
     * 顯示BOSS血條 怪物ID 怪物當前血量 怪物的總血量
     */
    public static byte[] showBossHP(int monsterId, long currentHp, long maxHp) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_FieldEffect.getValue());
        mplew.write(FieldEffectType.MobHPTag); //V.107修改 以前0x05
        mplew.writeInt(monsterId); //has no image
        mplew.writeLong(currentHp);
        mplew.writeLong(maxHp);
        mplew.write(6);
        mplew.write(5);

        //colour legend: (applies to both colours)
        //1 = red, 2 = dark blue, 3 = light green, 4 = dark green, 5 = black, 6 = light blue, 7 = purple
        return mplew.getPacket();
    }

    /**
     * Gets a response to a move monster packet.
     *
     * @param objectid The ObjectID of the monster being moved.
     * @param moveid The movement ID.
     * @param currentMp The current MP of the monster.
     * @param controllerHasAggro Can the monster use skills?
     * @param skillId The skill ID for the monster to use.
     * @param skillLevel The level of the skill to use.
     * @return The move response packet.
     */
    public static byte[] moveMonsterResponse(int objectid, short moveid, int currentMp, boolean controllerHasAggro, int skillId, int skillLevel, int attack) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(19);

        mplew.writeShort(SendPacketOpcode.LP_MobCtrlAck.getValue());
        mplew.writeInt(objectid);
        mplew.writeShort(moveid);
        mplew.writeBool(controllerHasAggro);
        mplew.writeInt(currentMp);
        mplew.writeInt(skillId);
        mplew.writeShort(skillLevel);//V.160 byte=>short
        mplew.writeInt(attack);//V.160 new
        mplew.writeInt(0); //Randomizer.rand(0, 5)

        return mplew.getPacket();
    }

    public static byte[] moveMonster(int oid, boolean useskill, int mode, int skillid, int skilllevel, short effectAfter, List<Pair<Short, Short>> list, Map<Integer, Short> map1, Map<Integer, Integer> map2, int gatherDuration, int nVal1, Point mPos, Point oPos, List<LifeMovementFragment> moves) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_MobMove.getValue());
        mplew.writeInt(oid);
        mplew.writeBool(useskill);
        mplew.write(mode);
        mplew.writeShort(skillid);//V.160 byte=>short
        mplew.writeShort(skilllevel);//V.160 byte=>short
        mplew.writeShort(effectAfter);
        mplew.writeShort(0);//V.160 new
        mplew.write(list.size());
        for (Pair<Short, Short> pair : list) {
            mplew.writeShort(pair.getLeft());
            mplew.writeShort(pair.getRight());
        }
        mplew.write(map1.size());
        for (short s : map1.values()) {
            mplew.writeShort(s);
        }
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.write(map2.size());
        for (int s : map2.values()) {
            mplew.writeInt(s);
        }

        PacketHelper.serializeMovementList(mplew, gatherDuration, nVal1, mPos, oPos, moves, null);

        mplew.write(0);
        mplew.write(0);
        return mplew.getPacket();
    }

    /**
     * 刷出怪物
     */
    public static byte[] spawnMonster(MapleMonster monster) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_MobEnterField.getValue());
        mplew.write(0);
        mplew.writeInt(monster.getObjectId());
        mplew.write(1); // 1 = Control normal, 5 = Control none
        mplew.writeInt(monster.getId());
        addForcedMobStat(mplew, monster);
        final EnumMap<MonsterStatus, Integer> statups = new EnumMap<>(MonsterStatus.class);
        for (final MonsterStatus status : MonsterStatus.values()) {
            if (status.isDefault() || monster.getEffectHolder(status) != null) {
                statups.put(status, -1);
            }
        }
        writeMonsterStatusEffectData(mplew, monster, monster.getMonsterHolderMap(statups));
        writeMonsterEndData(mplew, monster);

        return mplew.getPacket();
    }

    /**
     * 怪物召喚控制
     */
    public static byte[] monsterChangeController(MapleMonster monster, int mode, int type) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_MobChangeController.getValue());
        mplew.write(mode);
        mplew.writeInt(monster.getObjectId());
        if (mode > 0) {
            mplew.write(type);
            mplew.writeInt(monster.getId());
            addForcedMobStat(mplew, monster);
            final EnumMap<MonsterStatus, Integer> statups = new EnumMap<>(MonsterStatus.class);
            for (final MonsterStatus status : MonsterStatus.values()) {
                if (status.isDefault() || monster.getEffectHolder(status) != null) {
                    statups.put(status, -1);
                }
            }
            writeMonsterStatusEffectData(mplew, monster, monster.getMonsterHolderMap(statups));
            writeMonsterEndData(mplew, monster);
        }

        return mplew.getPacket();
    }

    public static void writeMonsterEndData(MaplePacketLittleEndianWriter mplew, MapleMonster life) {
        mplew.writePos(life.getPosition());
        mplew.write(life.getStance()); // Bitfield
//        if (life.getStats().isSmartPhase() > 0) {
        if (life.getId() == 8910000 || life.getId() == 8910100 || life.getId() == 9990033) {
            mplew.write(0);
        }
        mplew.writeShort(life.getCurrentFH()); // FH life.getFh()
        mplew.writeShort(life.getHomeFH()); // Origin FH
        short spawnType = life.getAppearType();
        mplew.writeShort(spawnType); //(-2 新刷出的怪物 -1 已刷出的怪物)
        if (spawnType == -3 || spawnType >= 0) {
            mplew.writeInt(life.getLinkOid());
        }
        mplew.write(life.getCarnivalTeam());
        mplew.writeLong(life.getHp());
        mplew.writeInt(0);
        if (life.getStats().isPatrol()) {
            mplew.writeInt(life.getPatrolScopeX1());
            mplew.writeInt(life.getPatrolScopeX2());
            mplew.writeInt(life.getStats().getPatrolDetectX());
            mplew.writeInt(life.getStats().getPatrolSenseX());
        }
        mplew.writeInt(0);//todo life.getSeperateSoulSrcOID()
        mplew.writeInt(life.getZoneDataType());//life.getZoneDataType()
        mplew.writeInt(life.getShowMobId());
        mplew.write(life.getUnk());
        mplew.writeInt(-1);
        mplew.writeInt(0);// V.144 新增
        mplew.writeInt(-1);//todo life.getAfterAttack()
        mplew.write(life.getUnk1()); // isBoss?
        int bUnkSize = 0;
        mplew.writeInt(bUnkSize);
        for (int i = 0; i < bUnkSize; i++) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        mplew.writeInt(life.getScale());
        mplew.writeInt(life.getEliteGrade());// life.get怪物類型()
        if (life.getEliteGrade() >= 0) {
            mplew.writeInt(life.getEliteMobActive().size());
            for (int j : life.getEliteMobActive()) {
                mplew.writeInt(j);
                mplew.writeInt(0);
            }
            mplew.writeInt(life.getEliteType());
        }
        mplew.write(0);
        mplew.write(0);
        mplew.writeInt(0);
        mplew.write(0);// V.155 new
        mplew.writeMapleAsciiString("");// V.155 new
        if (life.getId() == 8880102) {
            mplew.writeInt(life.getFollowChrID());
        }
        if (life.getId() / 10000 == 961) {
            mplew.writeMapleAsciiString(""); // 怪物名稱
        }
        mplew.writeInt(0);

        mplew.write(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0);

        if (life.getStats().isSkeleton()) {
            mplew.write(0);
            mplew.write(0);
            mplew.write(life.getStats().getHitParts().size());
            for (final Entry<String, Integer> entry : life.getStats().getHitParts().entrySet()) {
                mplew.writeMapleAsciiString(entry.getKey());
                mplew.write(0);
                mplew.writeInt(entry.getValue());
            }
        }
    }

    /**
     * 怪物自定義屬性
     *
     * @param mplew
     * @param life
     */
    public static void addForcedMobStat(MaplePacketLittleEndianWriter mplew, MapleMonster life) {
        boolean writeChangedStats = life.getForcedMobStat() != null;
        mplew.writeBool(writeChangedStats);
        if (writeChangedStats) {
            // long + 12組int
            mplew.writeLong(life.getMobMaxHp());//V.153 Int->Long
            mplew.writeInt(life.getMobMaxMp());
            mplew.writeInt(life.getForcedMobStat().getExp());
            mplew.writeInt(life.getForcedMobStat().getWatk());
            mplew.writeInt(life.getForcedMobStat().getMatk());
            mplew.writeInt(life.getForcedMobStat().getPDRate());
            mplew.writeInt(life.getForcedMobStat().getMDRate());
            mplew.writeInt(life.getForcedMobStat().getAcc());
            mplew.writeInt(life.getForcedMobStat().getEva());
            mplew.writeInt(life.getForcedMobStat().getPushed());
            mplew.writeInt(life.getForcedMobStat().getSpeed()); //V.109.1新增 未知
            mplew.writeInt(life.getForcedMobStat().getLevel());
            mplew.writeInt(life.getForcedMobStat().getUserCount());
            mplew.write(false); // TMS.230
        }
    }

    /**
     * 停止怪物召喚控制
     *
     * @param oid 怪物oid
     * @return
     */
    public static byte[] stopControllingMonster(int oid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_MobChangeController.getValue());
        mplew.write(0);
        mplew.writeInt(oid);

        return mplew.getPacket();
    }

//    public static byte[] makeMonsterEffect(MapleMonster life, int effect) {
//        return spawnMonster(life, effect, 0);
//    }
    public static <E extends Buffstat> void writeNewMask(MaplePacketLittleEndianWriter mplew, Collection<E> statups) {
        int[] mask = new int[GameConstants.MAX_MOBSTAT];
        for (E statup : statups) {
            mask[statup.getPosition()] |= statup.getValue();
        }
        for (int aMask : mask) {
            mplew.writeInt(aMask);
        }
    }

    private static void writeMonsterMask(final MaplePacketLittleEndianWriter mplew, final Set<MonsterStatus> set) {
        final int[] mask = new int[GameConstants.MAX_MOBSTAT];
        for (final MonsterStatus status : set) {
            final int position = status.getPosition();
            mask[position] |= status.getValue();
        }
        for (int aMask : mask) {
            mplew.writeInt(aMask);
        }
    }

    public static byte[] cancelMonsterStatus(MapleMonster monster, EnumMap<MonsterStatus, MonsterEffectHolder> statups) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_MobStatReset.getValue());
        mplew.writeInt(monster.getObjectId());
        writeMonsterMask(mplew, statups.keySet());
        for (Map.Entry<MonsterStatus, MonsterEffectHolder> entry : statups.entrySet()) {
            if (entry.getKey() == MonsterStatus.Burned) {
                final List<MonsterEffectHolder> holders = monster.getIndieEffectHolder(MonsterStatus.Burned);
                switch (entry.getValue().sourceID) {
                    case 夜使者.刺客刻印:
                    case 夜使者.夜使者刻印:
                        mplew.writeInt(1);
                        entry.getValue().dotSuperpos = 0;
                        holders.add(entry.getValue());
                        break;
                    default:
                        mplew.writeInt(0);
                        break;
                }
                mplew.writeInt(holders.size());
                for (MonsterEffectHolder holder : holders) {
                    mplew.writeInt(holder.fromChrID);
                    mplew.writeInt(holder.sourceID);
                    mplew.writeInt(holder.dotSuperpos);
                }
            }
        }
        mplew.write(5);
        for (Map.Entry<MonsterStatus, MonsterEffectHolder> entry : statups.entrySet()) {
            if (entry.getKey().ordinal() < MonsterStatus.PAD.ordinal()) {
                encodeIndieMonsterStatus(mplew, monster, entry.getKey());
            }
        }
        mplew.write(0);
        return mplew.getPacket();
    }

    /**
     * 顯示操作結果
     */
    public static byte[] showResults(int mobid, boolean success) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_MobCatchEffect.getValue());
        mplew.writeInt(mobid);
        mplew.writeBool(success);
        mplew.write(1);

        return mplew.getPacket();
    }

    /**
     * 撲捉怪物
     */
    public static byte[] catchMonster(int mobid, int itemid, byte success) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_MobStealEffect.getValue());
        mplew.writeInt(mobid);
        mplew.writeInt(itemid);
        mplew.write(success);

        return mplew.getPacket();
    }

    public static byte[] unknown(int moboid) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(0x3C9);
        mplew.writeLong(moboid);

        return mplew.getPacket();
    }

    public static byte[] showMobSkillDelay(int moboid, MobSkill mobSkill, int effectAfter, List<Rectangle> rectangles) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_MobSkillDelay.getValue());
        mplew.writeInt(moboid);
        mplew.writeInt(effectAfter);
        mplew.writeInt(mobSkill.getSourceId());
        mplew.writeInt(mobSkill.getLevel());
        mplew.writeInt(mobSkill.getAreaSequenceDelay());
        mplew.writeInt(0);//V.160 new
        mplew.writeInt(rectangles.size());
        rectangles.forEach(mplew::writeRect);

        return mplew.getPacket();
    }
//
//    public static byte[] unknown1(int moboid) {
//        if (ServerConstants.isShowPacket()) {
//            log.trace("調用");
//        }
//        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
//
//        mplew.writeShort(0x1CC);
//        mplew.writeInt(moboid);
//        mplew.writeInt(1);
//        mplew.write(0);
//
//        return mplew.getPacket();
//    }

    public static byte[] showMonsterSpecialSkill(int moboid, int type) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_MobForcedSkillAction.getValue());
        mplew.writeInt(moboid);
        mplew.writeInt(type);
        mplew.write(0);
        return mplew.getPacket();
    }

    public static byte[] MobRequestResultEscortInfo(MapleMonster mob, MapleMap map) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_MobRequestResultEscortInfo.getValue());
        mplew.writeInt(mob.getObjectId());
        mplew.writeInt(map.getNodes().size());
        mplew.writeInt(mob.getPosition().x);
        mplew.writeInt(mob.getPosition().y);
        for (MapleNodes.MapleNodeInfo nodeInfo : map.getNodes()) {
            mplew.writeInt(nodeInfo.x);
            mplew.writeInt(nodeInfo.y);
            mplew.writeInt(nodeInfo.attr);
            if (nodeInfo.attr == 2) {
                mplew.writeInt(500);
            }
        }
        mplew.writeZeroBytes(6);
        return mplew.getPacket();
    }

    public static byte[] mobEscortStopEndPermission(int oid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_MobEscortStopEndPermmision.getValue());
        mplew.writeInt(oid);

        return mplew.getPacket();
    }

    public static byte[] MobEscortStopSay(final int n, final int n2, final int n3, final String s, final int n4) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        (mplew).writeOpcode(SendPacketOpcode.LP_MobEscortStopSay);
        mplew.writeInt(n);
        mplew.writeInt(n3);
        mplew.writeInt(n2);
        mplew.write((int) ((n2 >= 100000) ? 1 : 0));
        mplew.write((int) ((s != null && s.length() > 0) ? 1 : 0));
        if (s != null && s.length() > 0) {
            mplew.writeMapleAsciiString(s);
        }
        mplew.writeInt(n4);
        return mplew.getPacket();
    }

    public static byte[] getBossHatred(final Map<String, Integer> aggroRank) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_AggroRankInfo.getValue());
        final ArrayList<Entry<String, Integer>> list = new ArrayList<>(aggroRank.entrySet());
        list.sort((entry, entry2) -> entry2.getValue() - entry.getValue());
        mplew.writeInt(list.size());
        list.forEach(entry3 -> mplew.writeMapleAsciiString(entry3.getKey()));

        return mplew.getPacket();
    }

    public static byte[] showMonsterNotice(final int chrid, final int type, final String message) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_SmartMobNoticeMsg.getValue());
        mplew.writeInt(Randomizer.nextInt(3));
        mplew.writeInt(chrid);
        mplew.writeInt(type);
        mplew.writeInt(0);
        mplew.writeMapleAsciiString(message);

        return mplew.getPacket();
    }

    public static byte[] controlLaser(final int moboid, final int angle, final int x, final boolean isFirstUse) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_MobLaserControl.getValue());
        mplew.writeInt(moboid);
        mplew.writeInt(angle);
        mplew.writeInt(x);
        mplew.writeBool(isFirstUse);

        return mplew.getPacket();
    }

    public static byte[] showMonsterPhaseChange(final int moid, final int reduceDamageType) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_MobPhaseChange.getValue());
        mplew.writeInt(moid);
        mplew.writeInt(reduceDamageType);
        mplew.write(1);

        return mplew.getPacket();
    }

    public static byte[] changeMonsterZone(final int moid, final int reduceDamageType) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_MobZoneChange.getValue());
        mplew.writeInt(moid);
        mplew.writeInt(reduceDamageType);

        return mplew.getPacket();
    }

    public static byte[] monsterDemianDelayedAttackCreate(final int moboid, final int skilllevel, final Map<Integer, Point> pointMap, final boolean isFacingLeft) {
        return monsterDemianDelayedAttackCreate(moboid, 42, skilllevel, 0, null, pointMap, isFacingLeft);
    }

    public static byte[] monsterDemianDelayedAttackCreate(final int moboid, final int skilllevel, final int n3, final int n4, final Point point, final boolean isFacingLeft) {
        return monsterDemianDelayedAttackCreate(moboid, skilllevel, n3, n4, point, null, isFacingLeft);
    }

    public static byte[] monsterDemianDelayedAttackCreate(final int moboid, final int skilllevel, final int n3, final int n4, final Point point, final Map<Integer, Point> pointMap, final boolean isFacingLeft) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_MobDemianDelayedAttackCreate.getValue());
        mplew.writeInt(moboid);
        mplew.writeInt(170);
        mplew.writeInt(skilllevel);
        if (skilllevel == 42) {
            mplew.writeBool(isFacingLeft);
            mplew.writeInt(n3);
            mplew.writeInt(pointMap.size());
            for (final Entry<Integer, Point> entry : pointMap.entrySet()) {
                a(mplew, entry.getKey(), entry.getValue());
                mplew.writeInt(Randomizer.rand(73, 95));
            }
        } else if (skilllevel > 44 && skilllevel <= 47) {
            mplew.writeBool(isFacingLeft);
            mplew.writeInt(n3);
            a(mplew, n4, point);
        }

        return mplew.getPacket();
    }

    public static void a(MaplePacketLittleEndianWriter mplew, final int n, final Point point) {
        mplew.writeInt(n);
        mplew.writeInt(point.x);
        mplew.writeInt(point.y);
    }

    public static byte[] teleportMonster(final int moboid, final boolean b, final int n2, final Point point, final int n3) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_MobTeleport.getValue());
        mplew.writeInt(moboid);
        mplew.writeBool(b);
        if (!b) {
            mplew.writeInt(n2);
            switch (n2) {
                case 3:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                case 100: {
                    mplew.writeInt(point.x);
                    mplew.writeInt(point.y);
                    break;
                }
                case 4: {
                    mplew.writeInt(n3);
                    break;
                }
            }
        }

        return mplew.getPacket();
    }

    public static byte[] cancelMonsterAction(final MapleMonster monster, final int n) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_MobSuspendReset.getValue());
        mplew.writeInt(monster.getObjectId());
        mplew.write(n);

        return mplew.getPacket();
    }

    public static byte[] CreateDemianFlyingSword(boolean bl2, int monsterOid, int nodeid, Point point) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_DemianFlyingSwordCreate.getValue());
        mplew.writeBool(bl2);
        mplew.writeInt(monsterOid);
        if (bl2) {
            mplew.write(0);
            mplew.write(4);
            mplew.writeInt(nodeid);
            mplew.writeInt(point.x);
            mplew.writeInt(point.y);
        }
        return mplew.getPacket();
    }

    public static byte[] NodeDemianFlyingSword(int n2, boolean bl2, MapleSwordNode node) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_DemianFlyingSwordNode.getValue());
        mplew.writeInt(n2);
        mplew.writeInt(node.getBKM());
        mplew.writeBool(bl2);
        mplew.writeInt(node.getSwordNodeInfos().size());
        for (MapleSwordNode.MapleSwordNodeInfo a2 : node.getSwordNodeInfos()) {
            mplew.write(a2.getNodeType());
            mplew.writeShort(a2.getBKS());
            mplew.writeShort(a2.getNodeIndex());
            mplew.writeShort(a2.getBKU());
            mplew.writeInt(a2.getBKV());
            mplew.writeInt(a2.getBKW());
            mplew.writeInt(a2.getBKX());
            mplew.write(a2.getBKZ());
            mplew.write(a2.getBKY());
            mplew.writeInt(a2.getPos().x);
            mplew.writeInt(a2.getPos().y);
        }

        return mplew.getPacket();
    }

    public static byte[] TargetDemianFlyingSword(int n2, int n3) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_DemianFlyingSwordTarget.getValue());
        mplew.writeInt(n2);
        mplew.writeInt(n3);

        return mplew.getPacket();
    }

    public static byte[] mobMoveControl(int oid, Point position) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_MobFlyTarget.getValue());
        mplew.writeInt(oid);
        mplew.writePosInt(position);

        return mplew.getPacket();
    }

    public static byte[] bounceAttackSkill(int oid, final MobSkill skill, Point position) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_BounceAttackSkill.getValue());
        final int sourceID = skill.getSourceId();
        final int level = skill.getLevel();
        final boolean b = skill.getX() == 100000;
        mplew.writeInt(oid);
        mplew.writeInt(sourceID);
        mplew.writeInt(level);
        mplew.writeBool(b);
        if (b) {
            mplew.writeInt(1);
            mplew.write(0);
            mplew.writeInt(skill.getY());
            mplew.writeInt(skill.getX());
            mplew.writeInt(skill.getZ());
            mplew.writeInt(skill.getW());
            mplew.writeInt(0);
            for (oid = 0; oid <= 0; ++oid) {
                mplew.writeInt(20);
            }
        } else {
            mplew.writeInt(skill.getX());
            mplew.writeInt(skill.getY());
            mplew.writeInt(5);
            for (int i = 0; i <= 5; ++i) {
                mplew.writeInt(i + 1);
                mplew.writeInt(20);
                mplew.writeInt(20);
            }
            mplew.writeInt(skill.getZ());
            mplew.writeInt(skill.getW());
            mplew.writeInt(skill.getDuration());
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.write(1);
            mplew.writeBool(skill.getLt2() != null && skill.getRb2() != null);
            if (sourceID == 217 && (level == 3 || level == 4 | level == 21)) {
                mplew.writeInt(position.x);
                mplew.writeInt(position.y);
            }
            if (skill.getLt2() != null && skill.getRb2() != null) {
                mplew.writeInt(skill.getLt2().x);
                mplew.writeInt(skill.getLt2().y);
                mplew.writeInt(skill.getRb2().x);
                mplew.writeInt(skill.getRb2().y);
            }
        }
        return mplew.getPacket();
    }

    public static byte[] lucidButterflyAttack(final int mode, final List<Integer> list, final Point pos) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LucidButterflyAttack.getValue());
        mplew.writeInt(mode);
        switch (mode) {
            case 0: {
                mplew.writeInt(1);
                mplew.writeInt(Randomizer.nextInt(8));
                mplew.writeInt(pos.x);
                mplew.writeInt(pos.y);
                break;
            }
            case 1: {
                mplew.writeInt(1);
                mplew.writeInt(Randomizer.nextInt(8));
                break;
            }
            case 2: {
                mplew.writeInt(3);
                mplew.writeInt(list.size());
                list.forEach(mplew::writeInt);
                break;
            }
        }
        return mplew.getPacket();
    }

    public static byte[] lucidDragonAttack(final int n, final int n2, final int n3, final int n4, final int n5, final boolean b) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LucidDragonAttack.getValue());
        mplew.writeInt(n);
        mplew.writeInt(n2);
        mplew.writeInt(n3);
        mplew.writeInt(n4);
        mplew.writeInt(n5);
        mplew.writeBool(b);
        return mplew.getPacket();
    }

    public static byte[] lucidFieldAttack(final int skillID, final int mode, final int n3, final List<Integer> list, final Point pos) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LucidFieldAttack.getValue());
        mplew.writeInt(skillID);
        mplew.writeInt(mode);
        switch (mode) {
            case 1:
            case 2:
            case 3: {
                mplew.writeInt(n3);
                mplew.writeInt(pos.x);
                mplew.writeInt(pos.y);
                mplew.write(0);
                break;
            }
            case 5: {
                mplew.writeInt(n3);
                mplew.writeInt(list.size());
                list.forEach(mplew::writeInt);
                break;
            }
            case 4:
            case 10: {
                mplew.writeInt(5);
                for (int i = 0; i < 6; ++i) {
                    mplew.writeInt(Randomizer.nextInt(2));
                    mplew.writeInt(Randomizer.nextInt(2));
                    mplew.writeInt(112);
                    mplew.writeInt(Randomizer.nextInt(60) + i * 60);
                }
                break;
            }
            case 6: {
                mplew.writeInt(Randomizer.nextInt(8));
                break;
            }
            case 8: {
                mplew.writeInt(0);
                break;
            }
        }
        return mplew.getPacket();
    }

    public static byte[] lucidFieldFoothold(final boolean b, List<String> list) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LucidFieldFoothold.getValue());
        mplew.writeBool(b);
        mplew.writeInt(list.size());
        list.forEach(mplew::writeMapleAsciiString);
        return mplew.getPacket();
    }

    public static byte[] lucidSpecialHorn(final boolean b, final int n, final boolean b2) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LucidSpecialHorn.getValue());
        mplew.writeInt(b ? 0 : 1);
        if (b) {
            mplew.writeInt(n);
        }
        mplew.writeBool(b2);
        return mplew.getPacket();
    }

    public static byte[] lucidFieldFly(final boolean end) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LucidFieldFly.getValue());
        mplew.writeBool(end);
        return mplew.getPacket();
    }

    public static byte[] lucidSpecialAttack(final int mode) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LucidSpecialAttack.getValue());
        mplew.writeInt(mode);
        switch (mode) {
            case 0:
                mplew.writeInt(0);
                mplew.writeInt(0);
            case 1:
            case 3:
                mplew.writeInt(Randomizer.rand(30, 45));
                mplew.writeInt(Randomizer.rand(45, 55));
                mplew.writeInt(Randomizer.rand(600, 700));
                mplew.writeInt(Randomizer.rand(10, 30));
                break;
            case 4:
            case 5:
                mplew.writeInt(1);
                mplew.writeInt(1);
                mplew.writeInt(113);
                mplew.writeInt(33);
                mplew.writeInt(1077);
                mplew.writeInt(16);
                mplew.writeInt(15);
                mplew.writeInt(2);
                break;
        }
        return mplew.getPacket();
    }

    public static byte[] lucidFieldFootholdBreak(List<String> list) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LucidFieldFootholdBreak.getValue());
        mplew.writeInt(list.size());
        for (String s1 : list) {
            mplew.writeMapleAsciiString(s1);
        }
        return mplew.getPacket();
    }

    public static byte[] mobStatSet(final MapleMonster monster, final Map<MonsterStatus, Integer> statups) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_MobStatSet.getValue());
        mplew.writeInt(monster.getObjectId());
        Map<MonsterStatus, MonsterEffectHolder> holderMap = monster.getMonsterHolderMap(statups);
        writeMonsterStatusEffectData(mplew, monster, holderMap);
        int count = 1;
        for (MonsterEffectHolder holder : holderMap.values()) {
            if (holder.value > 0) {
                count++;
                break;
            }
        }
        mplew.writeShort(0); // delay 延遲多少毫秒之後顯示頭上debuff
        mplew.write(count - 1);
        mplew.write(count);
        return mplew.getPacket();
    }

    public static void encodeIndieMonsterStatus(MaplePacketLittleEndianWriter mplew, MapleMonster monster, MonsterStatus stat) {
        final List<MonsterEffectHolder> holders = monster.getIndieEffectHolder(stat);
        mplew.writeInt(holders.size());
        for (MonsterEffectHolder holder : holders) {
            mplew.writeInt(holder.sourceID);
            mplew.writeInt(holder.value);
            mplew.writeInt(holder.startTime);
            mplew.writeInt(0);
            mplew.writeInt(holder.getLeftTime());
            int nUnkCount = 0;
            mplew.writeInt(nUnkCount);
            for (int nn = 0; nn < nUnkCount; nn++) {
                mplew.writeInt(1);
                mplew.writeInt(1);
            }
            nUnkCount = 0;
            mplew.writeInt(nUnkCount);
            for (int nn = 0; nn < nUnkCount; nn++) {
                mplew.writeInt(0);
                mplew.writeInt(0);
            }
        }
    }

    public static void writeMonsterStatusEffectData(MaplePacketLittleEndianWriter mplew, MapleMonster monster, Map<MonsterStatus, MonsterEffectHolder> holderMap) {
        writeMonsterMask(mplew, holderMap.keySet());
        for (Entry<MonsterStatus, MonsterEffectHolder> entry : holderMap.entrySet()) {
            if (entry.getKey().ordinal() < MonsterStatus.PAD.ordinal()) {
                encodeIndieMonsterStatus(mplew, monster, entry.getKey());
            } else if (entry.getKey().ordinal() < MonsterStatus.Burned.ordinal()) {
                int level = 0;
                if (entry.getValue().effect instanceof MobSkill) {
                    level = entry.getValue().effect.getLevel();
                }
                int sourceID;
                if (entry.getValue().effect == null || entry.getValue().effect.getSourceId() != entry.getValue().sourceID) {
                    sourceID = entry.getValue().sourceID;
                } else {
                    sourceID = entry.getValue().effect.getSourceId();
                }
                int nValue = entry.getValue().value;
                mplew.writeInt(nValue);
                if (level > 0) {
                    mplew.writeShort(sourceID);
                    mplew.writeShort(level);
                } else {
                    mplew.writeInt(sourceID);
                }
                mplew.writeShort((short) (entry.getValue().getLeftTime() / 500L));
            }
        }
        if (holderMap.containsKey(MonsterStatus.PDR)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MonsterStatus.MDR)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MonsterStatus.Speed)) {
            mplew.write(holderMap.get(MonsterStatus.Speed).z);
        }
        if (holderMap.containsKey(MonsterStatus.Freeze)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MonsterStatus.PCounter)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MonsterStatus.MCounter)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MonsterStatus.PCounter) || holderMap.containsKey(MonsterStatus.MCounter)) {
            mplew.writeInt(500);
            mplew.write(1);
            mplew.writeInt(500);
        }
        if (holderMap.containsKey(MonsterStatus.Unk_163_Add_34)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MonsterStatus.Fatality)) {
            mplew.writeInt(holderMap.get(MonsterStatus.Fatality).fromChrID);
            mplew.writeInt(0);
            mplew.writeInt(2 * (holderMap.get(MonsterStatus.Fatality).value / 3));
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MonsterStatus.NEWUNK47)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MonsterStatus.AncientCurse)) {
            mplew.writeInt(1);
        }
        if (holderMap.containsKey(MonsterStatus.ElementDarkness)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MonsterStatus.DeadlyCharge)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MonsterStatus.Incizing)) {
            mplew.writeInt(holderMap.get(MonsterStatus.Incizing).fromChrID);
            mplew.writeInt(0); // 10 effect U
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MonsterStatus.BMageDebuff)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MonsterStatus.BattlePvP_Helena_Mark)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MonsterStatus.MultiPMDR)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MonsterStatus.ElementResetBySummon)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MonsterStatus.BahamutLightElemAddDam)) {
            mplew.writeInt(0);
            mplew.writeInt(holderMap.get(MonsterStatus.BahamutLightElemAddDam).fromChrID);
        }
        if (holderMap.containsKey(MonsterStatus.MultiDamSkill)) {
            mplew.writeInt(holderMap.get(MonsterStatus.MultiDamSkill).value);
        }
        if (holderMap.containsKey(MonsterStatus.CurseMark)) {
            mplew.writeInt(4);
            mplew.writeInt(0);
            mplew.writeInt(0);
        }

        if (holderMap.containsKey(MonsterStatus.UNK72)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MonsterStatus.UNK74)) {
            mplew.writeInt(0);
        }

        if (holderMap.containsKey(MonsterStatus.Poison)) {
            mplew.writeInt(holderMap.get(MonsterStatus.Poison).fromChrID);
        }
        if (holderMap.containsKey(MonsterStatus.Ambush)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MonsterStatus.UNK_165_Add_80)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MonsterStatus.魔封葫蘆符)) {
            mplew.writeInt(holderMap.get(MonsterStatus.魔封葫蘆符).fromChrID);
        }
        if (holderMap.containsKey(MonsterStatus.UNK_Add_1002)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MonsterStatus.傷痕之劍)) {
            mplew.writeInt(0); //-30
            mplew.writeInt(0); //-20
        }
        if (holderMap.containsKey(MonsterStatus.Explosion)) {
            mplew.writeInt(0); // 14181181 ?
        }
        // default
        if (holderMap.containsKey(MonsterStatus.Burned)) {
            final List<MonsterEffectHolder> holders = monster.getIndieEffectHolder(MonsterStatus.Burned);
            mplew.write(holders.size());
            for (final MonsterEffectHolder holder : holders) {
                mplew.writeInt(holder.fromChrID);
                mplew.writeInt(holder.sourceID);
                mplew.writeLong(holder.dotDamage);
                mplew.writeInt(holder.dotInterval);
                mplew.writeInt(holder.getCancelTime());
                mplew.writeInt(holder.getLeftTime() << 1);
                mplew.writeInt((int) holder.getLeftTime() / holder.dotInterval);
                mplew.writeInt(holder.dotSuperpos);
                mplew.writeInt(0);
                mplew.writeInt(0);
                mplew.writeInt(0);
                mplew.writeInt(0);
                mplew.writeInt(300);
                mplew.writeInt(holder.level);
                mplew.writeInt(holder.dotDamage);
            }
        }
        // default
        if (holderMap.containsKey(MonsterStatus.BalogDisable)) {
            mplew.write(0);
            mplew.write(0);
        }
        // default
        if (holderMap.containsKey(MonsterStatus.ExchangeAttack)) {
            mplew.write(0);
        }
        // default
        if (holderMap.containsKey(MonsterStatus.AddBuffStat)) {
            mplew.write(0);
            if (false) {
                mplew.writeInt(0);
                mplew.writeInt(0);
                mplew.writeInt(0);
                mplew.writeInt(0);
            }
        }
        // default
        if (holderMap.containsKey(MonsterStatus.LinkTeam)) {
            mplew.writeMapleAsciiString("");
        }
        // default
        if (holderMap.containsKey(MonsterStatus.NEWUNK97)) {
            mplew.writeInt(0);
        }
        // default
        if (holderMap.containsKey(MonsterStatus.NEWUNK98)) {
            mplew.writeLong(0L);
        }
        // default
        if (holderMap.containsKey(MonsterStatus.NEWUNK99)) {
            mplew.writeInt(0);
        }
        // default
        if (holderMap.containsKey(MonsterStatus.NEWUNK100)) {
            mplew.writeInt(0);
        }
        // default
        if (holderMap.containsKey(MonsterStatus.NEWUNK101)) {
            mplew.writeInt(0);
        }
        // default
        if (holderMap.containsKey(MonsterStatus.NEWUNK102)) {
            mplew.writeInt(0);
        }
        // default
        if (holderMap.containsKey(MonsterStatus.SoulExplosion)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        // default
        if (holderMap.containsKey(MonsterStatus.SeperateSoulP)) {
            MonsterEffectHolder holder = holderMap.get(MonsterStatus.SeperateSoulP);
            mplew.writeInt(holder != null ? holder.value : 0);
            mplew.writeInt(holder != null ? holder.moboid : 0);
            mplew.writeShort(0);
            mplew.writeInt(holder != null ? holder.value : 0);
            mplew.writeInt(holder != null ? holder.sourceID : 0);
        }
        // default
        if (holderMap.containsKey(MonsterStatus.SeperateSoulC)) {
            MonsterEffectHolder holder = holderMap.get(MonsterStatus.SeperateSoulC);
            mplew.writeInt(holder != null ? holder.value : 0);
            mplew.writeInt(holder != null ? holder.moboid : 0);
            mplew.writeShort(0);
            mplew.writeInt(holder != null ? holder.value : 0);
        }
        // default
        if (holderMap.containsKey(MonsterStatus.Ember)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        // default
        if (holderMap.containsKey(MonsterStatus.TrueSight)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(holderMap.get(MonsterStatus.TrueSight).value);
            mplew.writeInt(holderMap.get(MonsterStatus.TrueSight).sourceID);
            mplew.writeInt(holderMap.get(MonsterStatus.TrueSight).sourceID > 0 ? (int) System.currentTimeMillis() : 0);
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        // default
        if (holderMap.containsKey(MonsterStatus.Laser)) {
            final boolean b = holderMap.get(MonsterStatus.Laser).value != 0;
            final int n4 = (int) ((System.currentTimeMillis() - holderMap.get(MonsterStatus.Laser).startTime) / 1100.0 * 10.0 % 360.0);
            mplew.writeInt(b ? holderMap.get(MonsterStatus.Laser).value : 0);
            mplew.writeShort(b ? 223 : 0);
            mplew.writeShort(b ? holderMap.get(MonsterStatus.Laser).effect.getLevel() : 0);
            mplew.writeInt(b ? DateUtil.getTime() : 0);
            mplew.writeInt(b ? 1 : 0);
            mplew.writeInt(b ? n4 : 0);
        }
        // default
        if (holderMap.containsKey(MonsterStatus.NEWUNK96)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        // default
        if (holderMap.containsKey(MonsterStatus.Unk_163_Add_107)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        // default
        if (holderMap.containsKey(MonsterStatus.Unk_232_Add_1)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        // default
        if (holderMap.containsKey(MonsterStatus.IndiePMdR)) {
            mplew.writeInt(holderMap.get(MonsterStatus.IndiePMdR).fromChrID);
            mplew.writeInt(holderMap.get(MonsterStatus.IndiePMdR).z);
            mplew.writeInt(30);
        }
        if (holderMap.containsKey(MonsterStatus.UNK_2)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
    }

    public static byte[] MobDamaged(MapleMonster monster, int n, long hpHeal, boolean damage) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeOpcode(SendPacketOpcode.LP_MobDamaged);
        mplew.writeInt(monster.getObjectId());
        mplew.write(n);
        mplew.writeLong(damage ? hpHeal : (-hpHeal));
        if (n != 2 && damage) {
            mplew.writeLong(monster.getHp());
            mplew.writeLong(monster.getMobMaxHp());
        }
        return mplew.getPacket();
    }

    public static byte[] MobAffected(int objectId, int skillId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeOpcode(SendPacketOpcode.LP_MobAffected);
        mplew.writeInt(objectId);
        mplew.writeInt(skillId);
        mplew.writeShort(0);
        mplew.writeBool(false);
        mplew.writeInt(0);
        return mplew.getPacket();
    }

    public static byte[] MobAttackBlock(int objectId, int i) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeOpcode(SendPacketOpcode.LP_MobAttackBlock);
        mplew.writeInt(objectId);
        mplew.writeInt(i);
        while (i > 0) {
            mplew.writeInt(0);
            i--;
        }
        return mplew.getPacket();
    }

    public static byte[] WillSkillAction(final int n, final int n2, final boolean b, final Point point, final Point point2, final Map<Integer, Pair<Integer, Integer>> map) {
        final MaplePacketLittleEndianWriter mplew;
        (mplew = new MaplePacketLittleEndianWriter()).writeOpcode(SendPacketOpcode.WillSkillAction);
        mplew.writeInt(n);
        mplew.writeInt(242);
        mplew.writeInt(n2);
        switch (n2) {
            case 14: {
                mplew.writeInt((b ? 1 : 0));
            }
            case 1:
            case 2:
            case 3: {
                mplew.writeInt(4);
                mplew.writeInt(1200);
                mplew.writeInt(9000);
                mplew.writePosInt(point);
                mplew.writePosInt(point2);
                mplew.writeInt(map.size());
                for (Entry<Integer, Pair<Integer, Integer>> entry : map.entrySet()) {
                    Integer n3 = entry.getKey();
                    Pair<Integer, Integer> ahg = entry.getValue();
                    mplew.writeInt(n3);
                    mplew.writeInt(ahg.getLeft());
                    mplew.writeInt(ahg.getRight());
                    mplew.writeInt(0);
                }
                break;
            }
        }
        return mplew.getPacket();
    }

    public static byte[] WillSkillAction(final int n, final int n2) {
        final MaplePacketLittleEndianWriter mplew;
        (mplew = new MaplePacketLittleEndianWriter()).writeOpcode(SendPacketOpcode.WillSkillAction);
        mplew.writeInt(n);
        mplew.writeInt(242);
        mplew.writeInt(4);
        mplew.writeInt(n2);
        mplew.write(0);
        return mplew.getPacket();
    }

    public static byte[] WillSkillAction(final int n) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        (mplew).writeOpcode(SendPacketOpcode.WillSkillAction);
        mplew.writeInt(n);
        mplew.writeInt(242);
        mplew.writeInt(5);
        final ArrayList<Pair<Boolean, Rectangle>> list = new ArrayList<>();
        list.add(new Pair<>(false, new Rectangle(-690, -455, 1385, 615)));
        list.add(new Pair<>(true, new Rectangle(-690, -2634, 1385, 615)));
        mplew.writeInt(list.size());
        for (final Pair<Boolean, Rectangle> ahg : list) {
            mplew.writeBool(ahg.getLeft());
            mplew.writeRect(ahg.getRight());
        }
        return mplew.getPacket();
    }

    public static byte[] WillBeholder(final int n, final Point point) {
        final MaplePacketLittleEndianWriter mplew;
        (mplew = new MaplePacketLittleEndianWriter()).writeOpcode(SendPacketOpcode.WillBeholder);
        mplew.writeInt(0);
        mplew.writeInt(n);
        mplew.writePosInt(point);
        return mplew.getPacket();
    }

    public static byte[] WillBeholder(final int n, final boolean b, final Rectangle rectangle) {
        final MaplePacketLittleEndianWriter mplew;
        (mplew = new MaplePacketLittleEndianWriter()).writeOpcode(SendPacketOpcode.WillBeholder);
        mplew.writeInt(1);
        mplew.writeInt(n);
        mplew.writeInt(300);
        mplew.writeInt(100);
        mplew.writeInt(1000);
        mplew.writeInt(6);
        mplew.writeBool(true);
        mplew.writeRect(rectangle);
        return mplew.getPacket();
    }

    public static byte[] enableSoulBomb(int unk, Point pos) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeOpcode(SendPacketOpcode.SOUL_BOMB);
        mplew.writeShort(unk);
        mplew.write(1);
        mplew.writePos(pos);
        return mplew.getPacket();
    }

}
