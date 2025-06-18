/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package packet;

import client.*;
import constants.GameConstants;
import constants.JobConstants;
import constants.SkillConstants;
import constants.skills.*;
import handling.Buffstat;
import handling.opcode.SendPacketOpcode;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import server.buffs.MapleStatEffect;
import server.life.MobSkill;
import tools.DateUtil;
import tools.Randomizer;
import tools.data.MaplePacketLittleEndianWriter;

import java.util.*;
import java.util.List;

/**
 * @author PlayDK
 */
public class BuffPacket {

    /**
     * Logger for this class.
     */
    private static final Logger log = LogManager.getLogger(BuffPacket.class);

    /*
     * 更新夜光當前界面的光暗點數
     */
    public static byte[] updateLuminousGauge(int points, int type) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ChangeLarknessStack.getValue());
        mplew.writeInt(points);
        mplew.write(type);
        mplew.writeInt(DateUtil.getTime(System.currentTimeMillis()));

        return mplew.getPacket();
    }

    public static byte[] giveBuff(MapleCharacter chr, MapleStatEffect effect, Map<MapleBuffStat, Integer> statups) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_TemporaryStatSet.getValue());
        final EnumMap<MapleBuffStat, MapleBuffStatValueHolder> holderMap = new EnumMap<>(MapleBuffStat.class);
        boolean isWriteIntValue = false;
        for (final Map.Entry<MapleBuffStat, Integer> entry : statups.entrySet()) {
            MapleBuffStatValueHolder mbsvh = chr.getBuffStatValueHolder(entry.getKey(), entry.getValue());
            if (mbsvh == null) {
                switch (entry.getKey()) {
                    case InnerStorm:
                        mbsvh = new MapleBuffStatValueHolder(entry.getValue(), 0);
                        break;
                    case RWCylinder:
                        mbsvh = new MapleBuffStatValueHolder(entry.getValue(), 1);
                        break;
                    case 虎影道力:
                        mbsvh = new MapleBuffStatValueHolder(chr.getSpecialStat().getHoYoungRune(), chr.getJob());
                        break;
                    case 虎影屬性:
                        mbsvh = new MapleBuffStatValueHolder(chr.getSpecialStat().getHoYoungState1(), chr.getJob());
                        break;
                    case AdeleCharge:
                        mbsvh = new MapleBuffStatValueHolder(chr.getSpecialStat().getAdeleCharge(), chr.getJob());
                        break;
                    case MaliceCharge:
                        mbsvh = new MapleBuffStatValueHolder(chr.getSpecialStat().getMaliceCharge(), MapleJob.凱殷.getId());
                        mbsvh.localDuration = 2100000000;
                        break;
                    case KinesisPsychicPoint:
                        mbsvh = new MapleBuffStatValueHolder(chr.getSpecialStat().getPP(), chr.getJob());
                        mbsvh.localDuration = 2100000000;
                        break;
                    case SoulMP:
                        mbsvh = new MapleBuffStatValueHolder(chr.getSoulMP(), entry.getValue());
                        mbsvh.localDuration = 2100000000;
                        break;
                    case FullSoulMP:
                        mbsvh = new MapleBuffStatValueHolder(chr.getSoulOption(), entry.getValue());
                        mbsvh.localDuration = 640000;
                        break;
                    case 幽靈侵蝕:
                        mbsvh = new MapleBuffStatValueHolder(1, chr.getJob());
                        mbsvh.z = chr.getSpecialStat().getErosions();
                        mbsvh.localDuration = 2100000000;
                        break;
                    case 純粹咒術子彈:
                        mbsvh = new MapleBuffStatValueHolder(1, chr.getJob());
                        mbsvh.z = chr.getSpecialStat().getPureBeads() << 1;
                        mbsvh.localDuration = 2100000000;
                        break;
                    case 火焰咒術子彈:
                        mbsvh = new MapleBuffStatValueHolder(1, chr.getJob());
                        mbsvh.z = chr.getSpecialStat().getFlameBeads();
                        mbsvh.localDuration = 2100000000;
                        break;
                    case 疾風咒術子彈:
                        mbsvh = new MapleBuffStatValueHolder(1, chr.getJob());
                        mbsvh.z = chr.getSpecialStat().getGaleBeads();
                        mbsvh.localDuration = 2100000000;
                        break;
                    case 深淵咒術子彈:
                        mbsvh = new MapleBuffStatValueHolder(1, chr.getJob());
                        mbsvh.z = chr.getSpecialStat().getAbyssBeads();
                        mbsvh.localDuration = 2100000000;
                        break;
                    case INFINITE_FLAME_CHARGE:
                        mbsvh = new MapleBuffStatValueHolder(1, chr.getJob());
                        mbsvh.z = entry.getValue();
                        mbsvh.localDuration = 2100000000;
                        break;
                    case MobZoneState:
                        mbsvh = new MapleBuffStatValueHolder(1, 0);
                        mbsvh.z = entry.getValue();
                        mbsvh.localDuration = 2100000000;
                        break;
                }
            }
            if (mbsvh != null) {
                holderMap.put(entry.getKey(), mbsvh);
                if (SkillConstants.isWriteBuffIntValue(entry.getKey())) {
                    isWriteIntValue = true;
                }
            }
        }
        if (holderMap.containsKey(MapleBuffStat.意志關懷)) {
            holderMap.put(MapleBuffStat.黎明神盾_紫血, new MapleBuffStatValueHolder(0, holderMap.get(MapleBuffStat.意志關懷).sourceID));
        }
        writeBuffMask(mplew, holderMap.keySet());
        for (Map.Entry<MapleBuffStat, MapleBuffStatValueHolder> entry : holderMap.entrySet()) {
            switch (entry.getKey()) {
                case 黎明神盾_紫血:
                case 意志關懷:
                case InnerStorm:
                case EXP_CARD:
                    break;
                default: {
                    if (!entry.getKey().canStack() && entry.getValue() != null) {
                        int level = 0;
                        if (entry.getValue().effect instanceof MobSkill) {
                            level = entry.getValue().effect.getLevel();
                        }
                        int nValue = entry.getValue().value;
                        switch (entry.getKey()) {
                            case MobZoneState:
                                nValue = 1;
                                break;
                            case DotHealHPPerSecond:
                                nValue = chr.getStat().getCurrentMaxHP() * nValue / 100;
                                break;
                            case DotHealMPPerSecond:
                                nValue = chr.getStat().getCurrentMaxMP() * nValue / 100;
                                break;
                        }
                        if (isWriteIntValue) {
                            mplew.writeInt(nValue);
                        } else {
                            mplew.writeShort(nValue);
                        }
                        if (level > 0) {
                            mplew.writeShort(entry.getValue().sourceID);
                            mplew.writeShort(level);
                        } else {
                            mplew.writeInt(entry.getValue().sourceID);
                        }
                        mplew.writeInt(冰雷.元素適應_雷冰 == entry.getValue().sourceID || entry.getValue().getLeftTime() == 2100000000 ? 0 : entry.getValue().getLeftTime());
                        if (entry.getKey() == MapleBuffStat.AriaShadowSword) {
                            if (isWriteIntValue) {
                                mplew.writeInt(nValue);
                            } else {
                                mplew.writeShort(nValue);
                            }
                            if (level > 0) {
                                mplew.writeShort(entry.getValue().sourceID);
                                mplew.writeShort(level);
                            } else {
                                mplew.writeInt(entry.getValue().sourceID);
                            }
                            mplew.writeInt(entry.getValue().getLeftTime() == 2100000000 ? 0 : entry.getValue().getLeftTime());
                        }
                    }
                    break;
                }
            }
        }
        writeBuffData(mplew, holderMap, effect, chr);// 正常Buff有長度為9的封包
        encodeForClient(chr, mplew, holderMap);
        for (MapleBuffStat stat : holderMap.keySet()) {
            if (stat.canStack() && !SkillConstants.isSpecialStackBuff(stat)) {
                encodeIndieBuffStat(mplew, chr, stat);
            }
        }
        if (holderMap.containsKey(MapleBuffStat.DarkSight)) {
            // empty if block
        }
        if (holderMap.containsKey(MapleBuffStat.UsingScouter)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK505)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.榮耀之翼)) {
            mplew.writeInt(chr.getBuffedIntZ(MapleBuffStat.榮耀之翼));
            mplew.writeInt(chr.getBuffedIntZ(MapleBuffStat.榮耀之翼));
        }
        if (holderMap.containsKey(MapleBuffStat.祝福標誌)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.致命暗殺_殺數點數)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.致命暗殺_殺數點數).z);
        }
        if (holderMap.containsKey(MapleBuffStat.武器變換)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.超載模式)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.幽靈侵蝕)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.幽靈侵蝕).z);
        }
        if (holderMap.containsKey(MapleBuffStat.純粹咒術子彈)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.純粹咒術子彈).z);
            mplew.writeInt(holderMap.get(MapleBuffStat.純粹咒術子彈).z);
        }
        if (holderMap.containsKey(MapleBuffStat.火焰咒術子彈)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.火焰咒術子彈).z);
            mplew.writeInt(holderMap.get(MapleBuffStat.火焰咒術子彈).z);
        }
        if (holderMap.containsKey(MapleBuffStat.疾風咒術子彈)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.疾風咒術子彈).z);
            mplew.writeInt(holderMap.get(MapleBuffStat.疾風咒術子彈).z);
        }
        if (holderMap.containsKey(MapleBuffStat.深淵咒術子彈)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.深淵咒術子彈).z);
            mplew.writeInt(holderMap.get(MapleBuffStat.深淵咒術子彈).z);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK540)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.INFINITE_FLAME_CHARGE)) {
            mplew.writeInt(chr.getBuffedIntValue(MapleBuffStat.INFINITE_FLAME_CHARGE));
        }
        if (holderMap.containsKey(MapleBuffStat.幻影標記鎖定)) {
            mplew.writeInt(chr.getLinkMobObjectID());
        }
        if (holderMap.containsKey(MapleBuffStat.幻影標記)) {
            mplew.writeInt(chr.getBuffedIntValue(MapleBuffStat.幻影標記));
        }
        if (holderMap.containsKey(MapleBuffStat.UNK_T144_ADD_573)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK_220_ADD_649)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK_220_ADD_654)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK_161_ADD_574)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK_161_ADD_576)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK_161_ADD_577)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.ComboCounter)) {
            mplew.writeInt("1".equals(chr.getOneInfo(1544, String.valueOf(英雄.鬥氣集中))) ? 1 : 0);
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK_222_ADD_648)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.遺跡計量)) {
            MapleBuffStatValueHolder mbsvh = holderMap.get(MapleBuffStat.遺跡計量);
            mplew.writeInt(mbsvh.startTime);
            mplew.writeInt(mbsvh.z);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK_163_ADD_587)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.黑曜石屏障)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.HolySymbol)) {
            MapleBuffStatValueHolder mbsvh = holderMap.get(MapleBuffStat.HolySymbol);
            mplew.writeInt(mbsvh.sourceID == 主教.神聖祈禱 ? mbsvh.fromChrID : 0);
            mplew.writeInt(mbsvh.sourceID == 主教.神聖祈禱 ? 20 : 0);
            mplew.writeInt(mbsvh.sourceID == 主教.神聖祈禱 && mbsvh.DropRate > 0 ? 1 : 0);
            mplew.writeInt(chr.getBuffStatValueHolder(MapleBuffStat.IndieAsrR, 主教.神聖祈禱) != null ? 1 : 0);
            mplew.write(mbsvh.z);
            mplew.write(1);
            mplew.writeInt(mbsvh.DropRate);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK_220_ADD_653)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.虎影屬性)) {
            mplew.writeInt(chr.getSpecialStat().getHoYoungState2());
            mplew.writeInt(chr.getSpecialStat().getHoYoungState3());
        }
        if (holderMap.containsKey(MapleBuffStat.虎影道力)) {
            mplew.writeInt(chr.getSpecialStat().getHoYoungScroll());
        }
        if (holderMap.containsKey(MapleBuffStat.怪力亂神)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.實戰的知識)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.實戰的知識).z);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK_162_ADD_623)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.AdeleNobleSpirit)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.亡靈)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.亡靈).z);
        }
        if (holderMap.containsKey(MapleBuffStat.亡靈_受傷)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.亡靈_受傷).z);
            mplew.writeInt(holderMap.get(MapleBuffStat.亡靈_受傷).x);
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.殘影幻象)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.殘影幻象).z);
        }
        if (holderMap.containsKey(MapleBuffStat.PURIFICATION_RUNE)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.PURIFICATION_RUNE).z);
        }
        if (holderMap.containsKey(MapleBuffStat.BMageAura)) {
            mplew.writeInt(738263040);
            mplew.writeInt(1);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK_229_ADD_678)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK_229_ADD_679)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK_229_ADD_680)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK_229_ADD_681)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK_229_ADD_682)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.IceAura)) {
            mplew.writeInt(chr.getId());
            mplew.writeInt(1);
        }
        if (holderMap.containsKey(MapleBuffStat.KnightsAura)) {
            mplew.writeInt(chr.getId());
            mplew.writeInt(1);
        }
        if (holderMap.containsKey(MapleBuffStat.ZeroAuraStr)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.ZeroAuraSpd)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.化身)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK_232_ADD_695)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.光子射線)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.光子射線).z);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK_232_ADD_697)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.引力法則)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK_232_ADD_703)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.神聖之水)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.武器變換終章)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.武器變換終章).z);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK_232_ADD_708)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.黑暗靈氣)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.黑暗靈氣).z);
        }
        if (holderMap.containsKey(MapleBuffStat.海龍螺旋)) {
            MapleBuffStatValueHolder mbsvh = holderMap.get(MapleBuffStat.海龍螺旋);
            mplew.writeInt(mbsvh.NormalMobKillCount);
            mplew.writeInt(mbsvh.AttackBossCount);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK_229_ADD_699)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.BlessOfDarkness)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.死亡降臨)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.龍炸裂)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.Magnet)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK_238_ADD_735)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK_238_ADD_736)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK_238_ADD_737)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK_238_ADD_272)) {
            mplew.writeInt(0);
            mplew.write(0);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK_238_ADD_273)) {
            mplew.writeInt(0);
            mplew.write(0);
        }
        if (holderMap.containsKey(MapleBuffStat.NewFlying)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.NewFlying).z);
        }
        if (holderMap.containsKey(MapleBuffStat.ReincarnationCount)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.ReincarnationCount).z);
        }
        if (holderMap.containsKey(MapleBuffStat.焰箭齊發)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK_240_ADD_543)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.黎明神盾_紫血)) {
            mplew.writeZigZagVarints(holderMap.get(MapleBuffStat.黎明神盾_紫血).value);
            mplew.writeZigZagVarints(holderMap.get(MapleBuffStat.黎明神盾_紫血).getLeftTime());
        }
        if (holderMap.containsKey(MapleBuffStat.意志關懷)) {
            mplew.write(holderMap.get(MapleBuffStat.意志關懷).value);
            mplew.writeZigZagVarints(holderMap.get(MapleBuffStat.意志關懷).localDuration);
        }
        if (holderMap.containsKey(MapleBuffStat.InnerStorm)) {
            mplew.writeZigZagVarints(holderMap.get(MapleBuffStat.InnerStorm).value);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK153)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.UNK153).value);
            mplew.writeInt(holderMap.get(MapleBuffStat.UNK153).sourceID);
        }
        if (holderMap.containsKey(MapleBuffStat.ReduceMana)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.ReduceMana).value);
            mplew.writeInt(holderMap.get(MapleBuffStat.ReduceMana).getLeftTime());
            mplew.writeInt(holderMap.get(MapleBuffStat.ReduceMana).sourceID);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK_T146_ADD_511)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.突擊之盾)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK562)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.AriaShadowSword)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.EXP_CARD)) {
            mplew.writeInt((int) chr.getEXPMod());
        }
        if (holderMap.containsKey(MapleBuffStat.怨靈解放陣)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.怨靈解放陣).value);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK_229_ADD_700)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.大鬼封魂陣)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.大鬼封魂陣).z);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK_738)) {
            mplew.writeInt(0);
        }

        mplew.writeShort(0); // effectDelay
        mplew.write(0);

        // 是否不刷新BUFF圖標
        mplew.write(0);
        mplew.write(0);
        mplew.write(1);
        mplew.write(1); // bTemporaryOnShow || 英雄.鬥氣集中

        for (MapleBuffStat stat : holderMap.keySet()) {
            if (SkillConstants.isMovementAffectingStat(stat)) {
                mplew.write(0);
                break;
            }
        }

        mplew.writeInt(0);
        mplew.write(1);

        return mplew.getPacket();
    }

    public static void encodeForClient(MapleCharacter chr, MaplePacketLittleEndianWriter mplew, EnumMap<MapleBuffStat, MapleBuffStatValueHolder> holderMap) {
        for (Map.Entry<MapleBuffStat, MapleBuffStatValueHolder> entry : holderMap.entrySet()) {
            if (entry.getKey().canStack() && SkillConstants.isSpecialStackBuff(entry.getKey())) {
                mplew.writeInt(entry.getValue().value);
                mplew.writeInt(entry.getValue().sourceID);
                mplew.write(entry.getKey() == MapleBuffStat.PartyBooster || entry.getKey() == MapleBuffStat.遺跡能量 ? 1 : 0);
                mplew.writeInt(entry.getKey() == MapleBuffStat.遺跡能量 ? 1 : entry.getKey() == MapleBuffStat.PartyBooster ? 2 : 0);
                if (entry.getKey() == MapleBuffStat.PartyBooster) {
                    mplew.write(1);
                    mplew.writeInt(2);
                    mplew.writeShort((entry.getValue().getLeftTime() / 1000));
                } else if (entry.getKey() == MapleBuffStat.AdeleCurse) {
                    mplew.writeInt(chr.getLinkMobObjectID());
                    mplew.writeInt(0);
                } else if (entry.getKey() == MapleBuffStat.RideVehicleExpire) {
                    mplew.writeShort(10);
                } else if (entry.getKey() == MapleBuffStat.GuidedBullet) {
                    mplew.writeInt(chr.getLinkMobObjectID());
                    mplew.writeInt(0);
                } else if (entry.getKey() == MapleBuffStat.DashSpeed) {
                    mplew.writeShort(10);
                } else if (entry.getKey() == MapleBuffStat.DashJump) {
                    mplew.writeShort(10);
                }
            }
        }
    }

    public static void encodeIndieBuffStat(MaplePacketLittleEndianWriter mplew, MapleCharacter chr, MapleBuffStat stat) {
        int sourceID;
        final List<MapleBuffStatValueHolder> holders = chr.getIndieBuffStatValueHolder(stat);
        mplew.writeInt(holders.size());
        for (MapleBuffStatValueHolder holder : holders) {
            mplew.writeInt(holder.sourceID);
            mplew.writeInt(holder.value);
            mplew.writeInt(holder.startTime);
            mplew.writeInt(holder.getStartChargeTime() == 0 ? (System.currentTimeMillis() - holder.startTime) : holder.getStartChargeTime());
            mplew.writeInt(holder.localDuration == 2100000000 ? 0 : holder.localDuration);
            mplew.writeInt(0);
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

    public static void writeBuffData(MaplePacketLittleEndianWriter mplew, Map<MapleBuffStat, MapleBuffStatValueHolder> holderMap, MapleStatEffect effect, MapleCharacter player) {
        int n2;
        if (holderMap.containsKey(MapleBuffStat.SoulMP)) {
            MapleBuffStatValueHolder mbsvh = holderMap.get(MapleBuffStat.SoulMP);
            mplew.writeInt(1000); // maxSoulMP
            mplew.writeInt(mbsvh.sourceID);
        }
        if (holderMap.containsKey(MapleBuffStat.FullSoulMP)) {
            mplew.writeInt(player.getCooldownLeftTime(player.getSoulSkillID()));
        }
        int nBuffForSpecSize = 0;
        mplew.writeShort(nBuffForSpecSize);
        for (int i = 0; i < nBuffForSpecSize; ++i) {
            mplew.writeInt(0); // dwItemID
            mplew.write(0); // bEnable
        }
        if (holderMap.containsKey(MapleBuffStat.HayatoStance)) {
            mplew.writeInt(-劍豪.拔刀姿勢);
        }
        mplew.write(holderMap.getOrDefault(MapleBuffStat.DefenseAtt, new MapleBuffStatValueHolder(0, 0)).value); // DefenseAtt
        mplew.write(holderMap.getOrDefault(MapleBuffStat.DefenseState, new MapleBuffStatValueHolder(0, 0)).value);
        mplew.write(holderMap.containsKey(MapleBuffStat.PoseType) ? 7 : 0);
        mplew.writeInt(effect != null && effect.getSourceId() == 通用V核心.法師通用.虛無型態 ? 0xffe300 : 0);//V.149 new
        if (holderMap.containsKey(MapleBuffStat.Dice)) {
            for (int i = 0; i < 21; ++i) {
                mplew.writeInt(SkillConstants.getDiceValue(i, holderMap.get(MapleBuffStat.Dice).value, effect));
            }
        }
        if (holderMap.containsKey(MapleBuffStat.UNK_T144_ADD_526)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK_T144_ADD_527)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK542)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.KeyDownMoving)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.PinkbeanRollingGrade)) {
            mplew.write(0);
        }
        if (holderMap.containsKey(MapleBuffStat.Judgement)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.Judgement).z);
        }
        if (holderMap.containsKey(MapleBuffStat.Infinity)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.Infinity).localDuration);
        }
        if (holderMap.containsKey(MapleBuffStat.StackBuff)) {
            mplew.write(holderMap.get(MapleBuffStat.StackBuff).z);
        }
        if (holderMap.containsKey(MapleBuffStat.Trinity)) {
            mplew.write(holderMap.get(MapleBuffStat.Trinity).value / 5);
        }
        if (holderMap.containsKey(MapleBuffStat.ElementalCharge)) {
            assert effect != null;
            final int n = holderMap.get(MapleBuffStat.ElementalCharge).value / effect.getX();
            mplew.write(n);
            mplew.writeShort(effect.getY() * n);
            mplew.write(effect.getU() * n);
            mplew.write(effect.getW() * n);
        }
        if (holderMap.containsKey(MapleBuffStat.LifeTidal)) {
            assert effect != null;
            n2 = 0;
            switch (holderMap.get(MapleBuffStat.LifeTidal).value) {
                case 1: {
                    n2 = effect.getX();
                    break;
                }
                case 2: {
                    n2 = effect.getProp();
                    break;
                }
                case 3: {
                    n2 = player.getBuffedIntZ(MapleBuffStat.LifeTidal);
                }
            }
            mplew.writeInt(n2);
        }
        if (holderMap.containsKey(MapleBuffStat.AntiMagicShell)) {
            MapleBuffStatValueHolder mbsvh = holderMap.get(MapleBuffStat.AntiMagicShell);
            int value = mbsvh.value;
            switch (mbsvh.sourceID) {
                case 火毒.元素適應_火毒:
                    value = value < mbsvh.effect.getY() ? 1 : 0;
                    break;
                case 冰雷.元素適應_雷冰:
                    value = mbsvh.z > 0 ? 1 : 0;
                    break;
                case 主教.聖靈守護:
                    value = 1;
                    break;
                default:
                    value = value == 2 ? 1 : 0;
                    break;
            }
            mplew.write(value);
            mplew.writeInt(mbsvh.z);
        }
        if (holderMap.containsKey(MapleBuffStat.Larkness)) {
            MapleBuffStatValueHolder mbsvh = holderMap.get(MapleBuffStat.Larkness);
            assert mbsvh.effect != null;
            int value = mbsvh.value;
            mplew.writeInt(value == 1 ? mbsvh.sourceID : 夜光.暗蝕);
            mplew.writeInt(mbsvh.localDuration);
            mplew.writeInt(value == 1 ? 0 : 夜光.光蝕);
            mplew.writeInt(value == 1 ? 0 : mbsvh.localDuration);
            mplew.writeInt(-1);
            mplew.writeInt(player.getLarkness());
            mplew.writeInt(value == 2 && player.hasTruthGate() ? 1 : 0);
        }
        if (holderMap.containsKey(MapleBuffStat.IgnoreTargetDEF)) {
            mplew.writeInt(player.getBuffedIntZ(MapleBuffStat.IgnoreTargetDEF));
        }
        if (holderMap.containsKey(MapleBuffStat.StopForceAtomInfo)) {
            assert effect != null;
            PacketHelper.write劍刃之壁(mplew, player, effect.getSourceId());
        }
        if (holderMap.containsKey(MapleBuffStat.SmashStack)) {
            int value = holderMap.get(MapleBuffStat.SmashStack).value;
            n2 = 0;
            if (value >= 100) {
                n2 = 1;
            } else if (value >= 300) {
                n2 = 2;
            }
            mplew.writeInt(n2);
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.MobZoneState)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.MobZoneState).z);
            mplew.writeInt(-1);
        }
        if (holderMap.containsKey(MapleBuffStat.JavelinDamage)) {
            int[] skills = {伊利恩.技藝_暗器Ⅱ, 通用V核心.法師通用.超載魔力};
            mplew.writeInt(skills.length);
            for (int skill : skills) {
                mplew.writeInt(skill);
            }
        }
        if (holderMap.containsKey(MapleBuffStat.Slow)) {
            mplew.write(0);
        }
        if (holderMap.containsKey(MapleBuffStat.IgnoreMobpdpR)) {
            mplew.write(0);
        }
        if (holderMap.containsKey(MapleBuffStat.BdR)) {
            mplew.write(1);
        }
        if (holderMap.containsKey(MapleBuffStat.DropRIncrease)) {
            mplew.writeInt(0);
            mplew.write(0);
        }
        if (holderMap.containsKey(MapleBuffStat.PoseType)) {
            mplew.write(player.getBuffedIntValue(MapleBuffStat.GlimmeringTime));
        }
        if (holderMap.containsKey(MapleBuffStat.Beholder)) {
            mplew.writeInt(player.getSkillLevel(黑騎士.追隨者支配) > 0 ? 黑騎士.追隨者支配 : 黑騎士.追隨者);
        }
        if (holderMap.containsKey(MapleBuffStat.CrossOverChain)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.CrossOverChain).z);
        }
        if (holderMap.containsKey(MapleBuffStat.ExtremeArchery)) {
            MapleBuffStatValueHolder mbsvh = holderMap.get(MapleBuffStat.ExtremeArchery);
            mplew.writeInt(mbsvh.sourceID == 神射手.終極射擊_弩 ? mbsvh.x : mbsvh.z);
            mplew.writeInt(mbsvh.sourceID == 神射手.終極射擊_弩 ? mbsvh.z : 0);
        }
        if (holderMap.containsKey(MapleBuffStat.ImmuneBarrier)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.ImmuneBarrier).z);
        }
        if (holderMap.containsKey(MapleBuffStat.ArmorPiercing)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.Stance)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.Stance).z);
        }
        if (holderMap.containsKey(MapleBuffStat.SharpEyes)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.SharpEyes).z);
        }
        if (holderMap.containsKey(MapleBuffStat.AdvancedBless)) {
            MapleBuffStatValueHolder mbsvh = holderMap.get(MapleBuffStat.AdvancedBless);
            mplew.writeInt(mbsvh.BDR);
            mplew.writeInt(mbsvh.z);
        }
        if (holderMap.containsKey(MapleBuffStat.UsefulAdvancedBless)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.Bless)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.DotHealHPPerSecond)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.DotHealHPPerSecond).localDuration);
        }
        if (holderMap.containsKey(MapleBuffStat.DotHealMPPerSecond)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.DotHealMPPerSecond).localDuration);
        }
        if (holderMap.containsKey(MapleBuffStat.SpiritGuard)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.SpiritGuard).value);
        }
        if (holderMap.containsKey(MapleBuffStat.UNK419)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.UNK419).value);
        }
        if (holderMap.containsKey(MapleBuffStat.KnockBack)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.ShieldAttack)) {//靈魂吸取專家？
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.SSFShootingAttack)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.聯盟繩索)) {
            mplew.writeInt(1);
        }
        if (holderMap.containsKey(MapleBuffStat.PinkbeanAttackBuff)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.RoyalGuardState)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.IndiePAD).value);
            mplew.writeInt(holderMap.get(MapleBuffStat.RoyalGuardState).value);
        }
        if (holderMap.containsKey(MapleBuffStat.MichaelSoulLink)) {
            MapleBuffStatValueHolder mbsvh = holderMap.get(MapleBuffStat.MichaelSoulLink);
            mplew.writeInt(mbsvh.fromChrID == player.getId() ? mbsvh.value : 0);
            mplew.writeBool(player.getParty() == null || player.getParty().getMemberSize() == 1);
            mplew.writeInt(mbsvh.fromChrID);
            mplew.writeInt(mbsvh.fromChrID != player.getId() ? mbsvh.effect.getLevel() : 0);
        }
        if (holderMap.containsKey(MapleBuffStat.AdrenalinBoost)) {
            assert effect != null;
            mplew.write(effect.getSourceId() == 狂狼勇士.鬥氣爆發 ? 1 : 0);
        }
        if (holderMap.containsKey(MapleBuffStat.RWCylinder)) {
            mplew.write(player.getBullet());
            mplew.writeShort(player.getCylinder());
            mplew.write(0);//V.160 new
        }
        if (holderMap.containsKey(MapleBuffStat.鋼鐵之軀)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.鋼鐵之軀).z);
        }
        if (holderMap.containsKey(MapleBuffStat.RWMagnumBlow)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.神聖連發重擊)) {
            mplew.writeShort(0);
            mplew.write(0);
        }
        if (holderMap.containsKey(MapleBuffStat.BladeStance)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.DarkSight)) {
            mplew.writeInt(660);
            mplew.writeInt(660);
        }
        if (holderMap.containsKey(MapleBuffStat.Stigma)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.元素精靈)) {
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.CriticalGrowing)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.CriticalGrowing).z);
        }
        if (holderMap.containsKey(MapleBuffStat.Ember)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.Ember).z);
        }
        if (holderMap.containsKey(MapleBuffStat.PickPocket)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.PickPocket).z);
        }
        if (holderMap.containsKey(MapleBuffStat.神聖團結)) {
            mplew.writeShort(holderMap.get(MapleBuffStat.神聖團結).z);
        }
        if (holderMap.containsKey(MapleBuffStat.惡魔狂亂)) {
            mplew.writeShort(holderMap.get(MapleBuffStat.惡魔狂亂).z);
        }
        if (holderMap.containsKey(MapleBuffStat.SpinesOfShadow)) {
            mplew.writeShort(35);
        }
        if (holderMap.containsKey(MapleBuffStat.熾天覆七重圓環)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (holderMap.containsKey(MapleBuffStat.VampDeath)) {
            mplew.writeInt(3);
        }
        if (holderMap.containsKey(MapleBuffStat.HolyMagicShell)) {
            mplew.writeInt(holderMap.get(MapleBuffStat.HolyMagicShell).z);
        }
    }

    /*
     * 其他玩家看到別人取消BUFF狀態
     */
    public static byte[] cancelForeignBuff(MapleCharacter chr, List<MapleBuffStat> statups) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserTemporaryStatReset.getValue());
        mplew.writeInt(chr.getId());
        writeBuffMask(mplew, statups);
        for (MapleBuffStat stat : statups) {
            if (stat.canStack() && !SkillConstants.isSpecialStackBuff(stat)) {
                encodeIndieBuffStat(mplew, chr, stat);
            }
        }
        if (statups.contains(MapleBuffStat.PoseType)) {
            mplew.write(1);
        }
        if (statups.contains(MapleBuffStat.UNK_163_ADD_590)) {
            mplew.write(1);
        }

        for (MapleBuffStat statup : statups) {
            if (SkillConstants.isMovementAffectingStat(statup)) {
                mplew.write(0);
                break;
            }
        }
        mplew.write(1);

        return mplew.getPacket();
    }

    public static byte[] giveForeignBuff(MapleCharacter player, Map<MapleBuffStat, Integer> statups) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserTemporaryStatSet.getValue());
        mplew.writeInt(player.getId());
        writeForeignBuff(mplew, player, statups, false);
        mplew.writeShort(0);
        mplew.write(0);

        return mplew.getPacket();
    }

    public static void writeForeignBuff(MaplePacketLittleEndianWriter mplew, MapleCharacter player, Map<MapleBuffStat, Integer> statups, boolean isChrinfo) {
        int sourceid;
        int n3;
        writeBuffMask(mplew, statups.keySet());
        if (statups.containsKey(MapleBuffStat.Speed)) {
            mplew.write(player.getBuffedIntValue(MapleBuffStat.Speed));
        }
        if (statups.containsKey(MapleBuffStat.ComboCounter)) {
            mplew.write(player.getBuffedIntValue(MapleBuffStat.ComboCounter));
        }
        if (statups.containsKey(MapleBuffStat.祝福之鎚)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.祝福之鎚));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.祝福之鎚));
        }
        if (statups.containsKey(MapleBuffStat.WeaponCharge)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.WeaponCharge));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.WeaponCharge));
        }
        if (statups.containsKey(MapleBuffStat.ElementalCharge)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.ElementalCharge));
        }
        if (statups.containsKey(MapleBuffStat.Stun)) {
            mplew.writeShort(1);
            MapleBuffStatValueHolder mbsvh = player.getBuffStatValueHolder(MapleBuffStat.Stun);
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getSourceId());
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getLevel());
        }
        if (statups.containsKey(MapleBuffStat.Shock)) {
            mplew.write(1);
        }
        if (statups.containsKey(MapleBuffStat.Darkness)) {
            mplew.writeShort(1);
            MapleBuffStatValueHolder mbsvh = player.getBuffStatValueHolder(MapleBuffStat.Darkness);
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getSourceId());
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getLevel());
        }
        if (statups.containsKey(MapleBuffStat.Seal)) {
            mplew.writeShort(1);
            MapleBuffStatValueHolder mbsvh = player.getBuffStatValueHolder(MapleBuffStat.Seal);
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getSourceId());
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getLevel());
        }
        if (statups.containsKey(MapleBuffStat.Weakness)) {
            mplew.writeShort(1);
            MapleBuffStatValueHolder mbsvh = player.getBuffStatValueHolder(MapleBuffStat.Weakness);
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getSourceId());
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getLevel());
        }
        if (statups.containsKey(MapleBuffStat.WeaknessMdamage)) {
            mplew.writeShort(0);
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.Curse)) {
            mplew.writeShort(1);
            MapleBuffStatValueHolder mbsvh = player.getBuffStatValueHolder(MapleBuffStat.Curse);
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getSourceId());
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getLevel());
        }
        if (statups.containsKey(MapleBuffStat.Slow)) {
            mplew.writeShort(1);
            MapleBuffStatValueHolder mbsvh = player.getBuffStatValueHolder(MapleBuffStat.Slow);
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getSourceId());
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getLevel());
        }
        if (statups.containsKey(MapleBuffStat.PvPRaceEffect)) {
            mplew.writeShort(0);
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.DisOrder)) {
            mplew.writeShort(0);
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.Explosion)) {
            mplew.write(0);
        }
        if (statups.containsKey(MapleBuffStat.Thread)) {
            mplew.writeShort(0);
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.Team)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.Team));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.Team));
        }
        if (statups.containsKey(MapleBuffStat.Poison)) {
            mplew.writeShort(1);
        }
        if (statups.containsKey(MapleBuffStat.Poison)) {
            mplew.writeShort(1);
            MapleBuffStatValueHolder mbsvh = player.getBuffStatValueHolder(MapleBuffStat.Poison);
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getSourceId());
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getLevel());
        }
        if (statups.containsKey(MapleBuffStat.ShadowPartner)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.ShadowPartner));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.ShadowPartner));
        }
        if (statups.containsKey(MapleBuffStat.DarkSight)) {
        }
        if (statups.containsKey(MapleBuffStat.SoulArrow)) {
        }
        if (statups.containsKey(MapleBuffStat.Morph)) {
            mplew.writeShort(player.getEffectForBuffStat(MapleBuffStat.Morph).getMorph(player));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.Morph));
        }
        if (statups.containsKey(MapleBuffStat.Ghost)) {
            mplew.writeShort(0);
        }
        if (statups.containsKey(MapleBuffStat.Attract)) {
            mplew.writeShort(1);
            MapleBuffStatValueHolder mbsvh = player.getBuffStatValueHolder(MapleBuffStat.Attract);
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getSourceId());
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getLevel());
        }
        if (statups.containsKey(MapleBuffStat.Magnet)) {
            mplew.writeShort(0);
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.MagnetArea)) {
            mplew.writeShort(0);
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.NoBulletConsume)) {
            mplew.writeInt(player.getBuffedIntValue(MapleBuffStat.NoBulletConsume));
        }
        if (statups.containsKey(MapleBuffStat.BanMap)) {
            mplew.writeShort(1);
            MapleBuffStatValueHolder mbsvh = player.getBuffStatValueHolder(MapleBuffStat.BanMap);
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getSourceId());
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getLevel());
        }
        if (statups.containsKey(MapleBuffStat.Barrier)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.Barrier));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.Barrier));
        }
        if (statups.containsKey(MapleBuffStat.DojangShield)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.DojangShield));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.DojangShield));
        }
        if (statups.containsKey(MapleBuffStat.ReverseInput)) {
            mplew.writeShort(1);
            MapleBuffStatValueHolder mbsvh = player.getBuffStatValueHolder(MapleBuffStat.ReverseInput);
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getSourceId());
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getLevel());
        }
        if (statups.containsKey(MapleBuffStat.RespectPImmune)) {
            mplew.writeInt(player.getBuffedIntValue(MapleBuffStat.RespectPImmune));
        }
        if (statups.containsKey(MapleBuffStat.RespectMImmune)) {
            mplew.writeInt(player.getBuffedIntValue(MapleBuffStat.RespectMImmune));
        }
        if (statups.containsKey(MapleBuffStat.DefenseAtt)) {
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.DefenseState)) {
            mplew.writeInt(player.getBuffedIntValue(MapleBuffStat.DefenseState));
        }
        if (statups.containsKey(MapleBuffStat.DojangBerserk)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.DojangBerserk));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.DojangBerserk));
        }
        if (statups.containsKey(MapleBuffStat.DojangInvincible)) {
            // empty if block
        }
        if (statups.containsKey(MapleBuffStat.RepeatEffect)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.RepeatEffect));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.RepeatEffect));
        }
        if (statups.containsKey(MapleBuffStat.UNK545)) {
            mplew.writeShort(0);
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.StopPortion)) {
            mplew.writeShort(1);
            MapleBuffStatValueHolder mbsvh = player.getBuffStatValueHolder(MapleBuffStat.StopPortion);
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getSourceId());
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getLevel());
        }
        if (statups.containsKey(MapleBuffStat.StopMotion)) {
            mplew.writeShort(1);
            MapleBuffStatValueHolder mbsvh = player.getBuffStatValueHolder(MapleBuffStat.StopMotion);
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getSourceId());
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getLevel());
        }
        if (statups.containsKey(MapleBuffStat.Blind)) {
            mplew.writeShort(1);
            MapleBuffStatValueHolder mbsvh = player.getBuffStatValueHolder(MapleBuffStat.Blind);
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getSourceId());
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getLevel());
        }
        if (statups.containsKey(MapleBuffStat.MagicShield)) {
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.Flying)) {
            // empty if block
        }
        if (statups.containsKey(MapleBuffStat.Frozen)) {
            mplew.writeShort(1);
            MapleBuffStatValueHolder mbsvh = player.getBuffStatValueHolder(MapleBuffStat.Frozen);
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getSourceId());
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getLevel());
        }
        if (statups.containsKey(MapleBuffStat.Frozen2)) {
            mplew.writeShort(0);
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.Web)) {
            mplew.writeShort(1);
            MapleBuffStatValueHolder mbsvh = player.getBuffStatValueHolder(MapleBuffStat.Web);
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getSourceId());
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getLevel());
        }
        if (statups.containsKey(MapleBuffStat.DrawBack)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.DrawBack));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.DrawBack));
        }
        if (statups.containsKey(MapleBuffStat.FinalCut)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.FinalCut));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.FinalCut));
        }
        if (statups.containsKey(MapleBuffStat.OnCapsule)) {
            mplew.write(0);
        }
        if (statups.containsKey(MapleBuffStat.OnCapsule)) {
            // empty if block
        }
        if (statups.containsKey(MapleBuffStat.Sneak)) {
            // empty if block
        }
        if (statups.containsKey(MapleBuffStat.BeastFormDamageUp)) {
            // empty if block
        }
        if (statups.containsKey(MapleBuffStat.Mechanic)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.Mechanic));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.Mechanic));
        }
        if (statups.containsKey(MapleBuffStat.BlessingArmorIncPAD)) {
            // empty if block
        }
        if (statups.containsKey(MapleBuffStat.Inflation)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.Inflation));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.Inflation));
        }
        if (statups.containsKey(MapleBuffStat.TimeBomb)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.TimeBomb));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.TimeBomb));
        }
        if (statups.containsKey(MapleBuffStat.DarkTornado)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.DarkTornado));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.DarkTornado));
        }
        if (statups.containsKey(MapleBuffStat.AmplifyDamage)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.AmplifyDamage));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.AmplifyDamage));
        }
        if (statups.containsKey(MapleBuffStat.HideAttack)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.HideAttack));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.HideAttack));
        }
        if (statups.containsKey(MapleBuffStat.HolyMagicShell)) {
            // empty if block
        }
        if (statups.containsKey(MapleBuffStat.DevilishPower)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.DevilishPower));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.DevilishPower));
        }
        if (statups.containsKey(MapleBuffStat.SpiritLink)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.SpiritLink));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.SpiritLink));
        }
        if (statups.containsKey(MapleBuffStat.Event)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.Event));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.Event));
        }
        if (statups.containsKey(MapleBuffStat.Event2)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.Event2));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.Event2));
        }
        if (statups.containsKey(MapleBuffStat.DeathMark)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.DeathMark));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.DeathMark));
        }
        if (statups.containsKey(MapleBuffStat.PainMark)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.PainMark));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.PainMark));
        }
        if (statups.containsKey(MapleBuffStat.Lapidification)) {
            mplew.writeShort(1);
            MapleBuffStatValueHolder mbsvh = player.getBuffStatValueHolder(MapleBuffStat.Lapidification);
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getSourceId());
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getLevel());
        }
        if (statups.containsKey(MapleBuffStat.VampDeath)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.VampDeath));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.VampDeath));
        }
        if (statups.containsKey(MapleBuffStat.VampDeathSummon)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.VampDeathSummon));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.VampDeathSummon));
        }
        if (statups.containsKey(MapleBuffStat.VenomSnake)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.VenomSnake));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.VenomSnake));
        }
        // SPAWN
        if (statups.containsKey(MapleBuffStat.PyramidEffect)) {
            mplew.writeInt(-1);
        }
        // SPAWN
        if (statups.containsKey(MapleBuffStat.PinkbeanRollingGrade)) {
            mplew.write(0);
        }
        if (statups.containsKey(MapleBuffStat.IgnoreTargetDEF)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.IgnoreTargetDEF));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.IgnoreTargetDEF));
        }
        if (statups.containsKey(MapleBuffStat.Invisible)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.Invisible));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.Invisible));
        }
        if (statups.containsKey(MapleBuffStat.Judgement)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.Judgement));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.Judgement));
        }
        if (statups.containsKey(MapleBuffStat.KeyDownAreaMoving)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.KeyDownAreaMoving));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.KeyDownAreaMoving));
        }
        if (statups.containsKey(MapleBuffStat.StackBuff)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.StackBuff));
        }
        if (statups.containsKey(MapleBuffStat.BlessOfDarkness)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.BlessOfDarkness));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.BlessOfDarkness));
        }
        if (statups.containsKey(MapleBuffStat.Larkness)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.Larkness));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.Larkness));
        }
        if (statups.containsKey(MapleBuffStat.ReshuffleSwitch)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.ReshuffleSwitch));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.ReshuffleSwitch));
        }
        if (statups.containsKey(MapleBuffStat.SpecialAction)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.SpecialAction));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.SpecialAction));
        }
        if (statups.containsKey(MapleBuffStat.StopForceAtomInfo)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.StopForceAtomInfo));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.StopForceAtomInfo));
        }
        if (statups.containsKey(MapleBuffStat.SoulGazeCriDamR)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.SoulGazeCriDamR));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.SoulGazeCriDamR));
        }
        if (statups.containsKey(MapleBuffStat.PowerTransferGauge)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.PowerTransferGauge));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.PowerTransferGauge));
        }
        if (statups.containsKey(MapleBuffStat.UNK_220_567)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK_220_567));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK_220_567));
        }
        if (statups.containsKey(MapleBuffStat.AffinitySlug)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.AffinitySlug));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.AffinitySlug));
        }
        if (statups.containsKey(MapleBuffStat.SoulExalt)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.SoulExalt));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.SoulExalt));
        }
        if (statups.containsKey(MapleBuffStat.HiddenPieceOn)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.HiddenPieceOn));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.HiddenPieceOn));
        }
        if (statups.containsKey(MapleBuffStat.SmashStack)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.SmashStack));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.SmashStack));
        }
        if (statups.containsKey(MapleBuffStat.MobZoneState)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.MobZoneState));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.MobZoneState));
        }
        if (statups.containsKey(MapleBuffStat.GiveMeHeal)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.GiveMeHeal));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.GiveMeHeal));
        }
        if (statups.containsKey(MapleBuffStat.TouchMe)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.TouchMe));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.TouchMe));
        }
        if (statups.containsKey(MapleBuffStat.Contagion)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.Contagion));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.Contagion));
        }
        if (statups.containsKey(MapleBuffStat.Contagion)) {
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.ComboUnlimited)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.ComboUnlimited));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.ComboUnlimited));
        }
        if (statups.containsKey(MapleBuffStat.IgnoreAllCounter)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.IgnoreAllCounter));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.IgnoreAllCounter));
        }
        if (statups.containsKey(MapleBuffStat.IgnorePImmune)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.IgnorePImmune));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.IgnorePImmune));
        }
        if (statups.containsKey(MapleBuffStat.IgnoreAllImmune)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.IgnoreAllImmune));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.IgnoreAllImmune));
        }
        if (statups.containsKey(MapleBuffStat.UNK274)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK274));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK274));
        }
        if (statups.containsKey(MapleBuffStat.UNK_229_ADD_303)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK_229_ADD_303));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK_229_ADD_303));
        }
        if (statups.containsKey(MapleBuffStat.FireAura)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.FireAura));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.FireAura));
        }
        if (statups.containsKey(MapleBuffStat.VengeanceOfAngel)) {
            // empty if block
        }
        if (statups.containsKey(MapleBuffStat.HeavensDoor)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.HeavensDoor));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.HeavensDoor));
        }
        if (statups.containsKey(MapleBuffStat.DamAbsorbShield)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.DamAbsorbShield));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.DamAbsorbShield));
        }
        if (statups.containsKey(MapleBuffStat.AntiMagicShell)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.AntiMagicShell));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.AntiMagicShell));
        }
        if (statups.containsKey(MapleBuffStat.NotDamaged)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.NotDamaged));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.NotDamaged));
        }
        if (statups.containsKey(MapleBuffStat.BleedingToxin)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.BleedingToxin));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.BleedingToxin));
        }
        if (statups.containsKey(MapleBuffStat.WindBreakerFinal)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.WindBreakerFinal));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.WindBreakerFinal));
        }
        if (statups.containsKey(MapleBuffStat.IgnoreMobDamR)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.IgnoreMobDamR));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.IgnoreMobDamR));
        }
        if (statups.containsKey(MapleBuffStat.Asura)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.Asura));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.Asura));
        }
        if (statups.containsKey(MapleBuffStat.滅世雷射光)) {
            mplew.writeInt(player.getBuffedIntValue(MapleBuffStat.滅世雷射光));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.滅世雷射光));
        }
        if (statups.containsKey(MapleBuffStat.滅世雷射光)) {
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.UnityOfPower)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UnityOfPower));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UnityOfPower));
        }
        if (statups.containsKey(MapleBuffStat.Stimulate)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.Stimulate));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.Stimulate));
        }
        if (statups.containsKey(MapleBuffStat.ReturnTeleport)) {
            mplew.write(1);
            MapleBuffStatValueHolder mbsvh = player.getBuffStatValueHolder(MapleBuffStat.ReturnTeleport);
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getSourceId());
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getLevel());
        }
        if (statups.containsKey(MapleBuffStat.CapDebuff)) {
            mplew.writeShort(1);
            MapleBuffStatValueHolder mbsvh = player.getBuffStatValueHolder(MapleBuffStat.CapDebuff);
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getSourceId());
            mplew.writeShort(mbsvh == null ? 0 : mbsvh.effect.getLevel());
        }
        if (statups.containsKey(MapleBuffStat.OverloadCount)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.OverloadCount));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.OverloadCount));
        }
        if (statups.containsKey(MapleBuffStat.FireBomb)) {
            mplew.write(player.getBuffedIntValue(MapleBuffStat.FireBomb));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.FireBomb));
        }
        if (statups.containsKey(MapleBuffStat.SurplusSupply)) {
            mplew.write(player.getBuffedIntValue(MapleBuffStat.SurplusSupply));
        }
        if (statups.containsKey(MapleBuffStat.NewFlying)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.NewFlying));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.NewFlying));
        }
        if (statups.containsKey(MapleBuffStat.NaviFlying)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.NaviFlying));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.NaviFlying));
        }
        if (statups.containsKey(MapleBuffStat.AmaranthGenerator)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.AmaranthGenerator));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.AmaranthGenerator));
        }
        if (statups.containsKey(MapleBuffStat.CygnusElementSkill)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.CygnusElementSkill));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.CygnusElementSkill));
        }
        if (statups.containsKey(MapleBuffStat.StrikerHyperElectric)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.StrikerHyperElectric));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.StrikerHyperElectric));
        }
        if (statups.containsKey(MapleBuffStat.EventPointAbsorb)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.EventPointAbsorb));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.EventPointAbsorb));
        }
        if (statups.containsKey(MapleBuffStat.EventAssemble)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.EventAssemble));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.EventAssemble));
        }
        if (statups.containsKey(MapleBuffStat.Albatross)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.Albatross));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.Albatross));
        }
        if (statups.containsKey(MapleBuffStat.Translucence)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.Translucence));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.Translucence));
        }
        if (statups.containsKey(MapleBuffStat.PoseType)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.PoseType));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.PoseType));
        }
        if (statups.containsKey(MapleBuffStat.LightOfSpirit)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.LightOfSpirit));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.LightOfSpirit));
        }
        if (statups.containsKey(MapleBuffStat.ElementSoul)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.ElementSoul));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.ElementSoul));
        }
        if (statups.containsKey(MapleBuffStat.GlimmeringTime)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.GlimmeringTime));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.GlimmeringTime));
        }
        if (statups.containsKey(MapleBuffStat.Reincarnation)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.Reincarnation));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.Reincarnation));
        }
        if (statups.containsKey(MapleBuffStat.Beholder)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.Beholder));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.Beholder));
        }
        if (statups.containsKey(MapleBuffStat.QuiverCatridge)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.QuiverCatridge));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.QuiverCatridge));
        }
        if (statups.containsKey(MapleBuffStat.ArmorPiercing)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.ArmorPiercing));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.ArmorPiercing));
        }
        if (statups.containsKey(MapleBuffStat.UserControlMob)) {
            // empty if block
        }
        if (statups.containsKey(MapleBuffStat.ImmuneBarrier)) {
            mplew.writeInt(player.getBuffedIntValue(MapleBuffStat.ImmuneBarrier));
        }
        if (statups.containsKey(MapleBuffStat.ImmuneBarrier)) {
            mplew.writeInt(player.getBuffedIntZ(MapleBuffStat.ImmuneBarrier));
        }
        if (statups.containsKey(MapleBuffStat.培羅德束縛)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.培羅德束縛));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.培羅德束縛));
        }
        if (statups.containsKey(MapleBuffStat.AnimalChange)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.AnimalChange));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.AnimalChange));
        }
        if (statups.containsKey(MapleBuffStat.TeamRoar)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.TeamRoar));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.TeamRoar));
        }
        if (statups.containsKey(MapleBuffStat.Fever)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.Fever));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.Fever));
        }
        if (statups.containsKey(MapleBuffStat.UNK430)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK430));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK430));
        }
        if (statups.containsKey(MapleBuffStat.FullSoulMP)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.FullSoulMP)); // 不確定
            mplew.writeInt(player.getSoulSkillID());
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.AntiMagicShell)) {
            mplew.writeBool(player.getBuffSource(MapleBuffStat.AntiMagicShell) == 主教.聖靈守護);
            mplew.writeInt(player.getBuffedIntValue(MapleBuffStat.AntiMagicShell));
        }
        if (statups.containsKey(MapleBuffStat.Dance)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.SpiritGuard)) {
            mplew.writeInt(player.getBuffedIntValue(MapleBuffStat.SpiritGuard));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.SpiritGuard));
        }
        if (statups.containsKey(MapleBuffStat.UNK419)) {
            mplew.writeInt(player.getBuffedIntValue(MapleBuffStat.UNK419));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK419));
        }
        if (statups.containsKey(MapleBuffStat.ComboTempest)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.ComboTempest));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.ComboTempest));
        }
        if (statups.containsKey(MapleBuffStat.HalfstatByDebuff)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.HalfstatByDebuff));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.HalfstatByDebuff));
        }
        if (statups.containsKey(MapleBuffStat.ComplusionSlant)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.ComplusionSlant));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.ComplusionSlant));
        }
        if (statups.containsKey(MapleBuffStat.JaguarSummoned)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.JaguarSummoned));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.JaguarSummoned));
        }
        if (statups.containsKey(MapleBuffStat.BombTime)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.BombTime));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.BombTime));
        }
        if (statups.containsKey(MapleBuffStat.海之霸主)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.海之霸主));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.海之霸主));
        }
        if (statups.containsKey(MapleBuffStat.能量爆炸)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.能量爆炸));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.能量爆炸));
        }
        if (statups.containsKey(MapleBuffStat.神雷合一)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.神雷合一));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.神雷合一));
        }
        if (statups.containsKey(MapleBuffStat.槍彈盛宴)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.槍彈盛宴));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.槍彈盛宴));
        }
        if (statups.containsKey(MapleBuffStat.滿載骰子)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.滿載骰子));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.滿載骰子));
        }
        if (statups.containsKey(MapleBuffStat.聖靈祈禱)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.聖靈祈禱));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.聖靈祈禱));
        }
        if (statups.containsKey(MapleBuffStat.DarkLighting)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.DarkLighting));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.DarkLighting));
        }
        if (statups.containsKey(MapleBuffStat.AttackCountX)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.AttackCountX));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.AttackCountX));
        }
        if (statups.containsKey(MapleBuffStat.FireBarrier)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.FireBarrier));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.FireBarrier));
        }
        if (statups.containsKey(MapleBuffStat.KeyDownMoving)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.KeyDownMoving));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.KeyDownMoving));
        }
        if (statups.containsKey(MapleBuffStat.MichaelSoulLink)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.MichaelSoulLink));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.MichaelSoulLink));
        }
        if (statups.containsKey(MapleBuffStat.KinesisPsychicEnergeShield)) {
            mplew.writeInt(player.getBuffedIntValue(MapleBuffStat.KinesisPsychicEnergeShield));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.KinesisPsychicEnergeShield));
        }
        if (statups.containsKey(MapleBuffStat.BladeStance)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.BladeStance));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.BladeStance));
        }
        if (statups.containsKey(MapleBuffStat.BladeStance)) {
            mplew.writeInt(player.getBuffSource(MapleBuffStat.BladeStance));
        }
        if (statups.containsKey(MapleBuffStat.Fever)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.Fever));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.Fever));
        }
        // SPAWN
        if (statups.containsKey(MapleBuffStat.AdrenalinBoost)) {
            mplew.writeInt(player.getBuffSource(MapleBuffStat.AdrenalinBoost));
        }
        // SPAWN
        if (statups.containsKey(MapleBuffStat.RWBarrier)) {
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.RWMagnumBlow)) {
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.神聖連發重擊)) {
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.追蹤箭頭)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.追蹤箭頭));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.追蹤箭頭));
        }
        if (statups.containsKey(MapleBuffStat.UNK250)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK250));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK250));
        }
        if (statups.containsKey(MapleBuffStat.祝福標誌)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.祝福標誌));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.祝福標誌));
        }
        if (statups.containsKey(MapleBuffStat.元素精靈)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.元素精靈));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.元素精靈));
        }
        if (statups.containsKey(MapleBuffStat.UNK_T146_ADD_256)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK_T146_ADD_256));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK_T146_ADD_256));
        }
        if (statups.containsKey(MapleBuffStat.Stigma)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.Stigma));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.Stigma));
        }
        if (statups.containsKey(MapleBuffStat.神聖團結)) {
            mplew.writeInt(player.getBuffedIntValue(MapleBuffStat.神聖團結));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.神聖團結));
        }
        if (statups.containsKey(MapleBuffStat.熾天覆七重圓環)) {
            mplew.writeInt(player.getBuffedIntValue(MapleBuffStat.熾天覆七重圓環));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.熾天覆七重圓環));
        }
        // SPAWN
        if (statups.containsKey(MapleBuffStat.心靈龍捲風)) {
            mplew.writeInt(player.getBuffedIntValue(MapleBuffStat.心靈龍捲風));
        }
        if (statups.containsKey(MapleBuffStat.瑪哈之疾)) {
            mplew.writeInt(player.getBuffedIntValue(MapleBuffStat.瑪哈之疾));
        }
        if (statups.containsKey(MapleBuffStat.超載魔力)) {
            mplew.writeInt(player.getBuffedIntValue(MapleBuffStat.超載魔力));
        }
        if (statups.containsKey(MapleBuffStat.CursorSniping)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.CursorSniping));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.CursorSniping));
        }
        if (statups.containsKey(MapleBuffStat.UNK505)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK505));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK505));
        }
        if (statups.containsKey(MapleBuffStat.聚光燈)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.聚光燈));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.聚光燈));
        }
        if (statups.containsKey(MapleBuffStat.超載模式)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.超載模式));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.超載模式));
        }
        if (statups.containsKey(MapleBuffStat.普力特的祝福)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.普力特的祝福));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.普力特的祝福));
        }
        if (statups.containsKey(MapleBuffStat.強化祝福之鎚)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.強化祝福之鎚));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.強化祝福之鎚));
        }
        if (statups.containsKey(MapleBuffStat.超速動能)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.超速動能));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.超速動能));
        }
        if (statups.containsKey(MapleBuffStat.虛無型態)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.虛無型態));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.虛無型態));
        }
        if (statups.containsKey(MapleBuffStat.必死決心)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.必死決心));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.必死決心));
        }
        if (statups.containsKey(MapleBuffStat.爆擊強化)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.爆擊強化));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.爆擊強化));
        }
        if (statups.containsKey(MapleBuffStat.UNK_T144_ADD_526)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK_T144_ADD_526));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK_T144_ADD_526));
        }
        if (statups.containsKey(MapleBuffStat.UNK_T144_ADD_527)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK_T144_ADD_527));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK_T144_ADD_527));
        }
        if (statups.containsKey(MapleBuffStat.UNK_T144_ADD_528)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK_T144_ADD_528));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK_T144_ADD_528));
        }
        if (statups.containsKey(MapleBuffStat.鋼鐵之軀)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.鋼鐵之軀));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.鋼鐵之軀));
        }
        if (statups.containsKey(MapleBuffStat.榮耀之翼)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.榮耀之翼));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.榮耀之翼));
        }
        if (statups.containsKey(MapleBuffStat.UNK514)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK514));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK514));
        }
        if (statups.containsKey(MapleBuffStat.UNK514)) {
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.UNK515)) {
            mplew.writeInt(player.getBuffedIntValue(MapleBuffStat.UNK515));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK515));
        }
        if (statups.containsKey(MapleBuffStat.和諧連結)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.和諧連結));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.和諧連結));
        }
        if (statups.containsKey(MapleBuffStat.快速充能)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.快速充能));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.快速充能));
        }
        if (statups.containsKey(MapleBuffStat.侵蝕控制)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.快速充能));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.快速充能));
        }
        if (statups.containsKey(MapleBuffStat.逼近的死亡)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.快速充能));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.快速充能));
        }
        if (statups.containsKey(MapleBuffStat.UNK540)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.快速充能));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.快速充能));
        }
        if (statups.containsKey(MapleBuffStat.UNK515)) {
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.魂光劍擊)) {
        }
        if (statups.containsKey(MapleBuffStat.SKILL_STAGE)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.SKILL_STAGE));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.SKILL_STAGE));
        }
        if (statups.containsKey(MapleBuffStat.DEMONIC_BLAST)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.DEMONIC_BLAST));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.DEMONIC_BLAST));
        }
        if (statups.containsKey(MapleBuffStat.UNK_163_ADD_588)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK_163_ADD_588));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK_163_ADD_588));
        }
        if (statups.containsKey(MapleBuffStat.黑曜石屏障)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.黑曜石屏障));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.黑曜石屏障));
        }
        if (statups.containsKey(MapleBuffStat.UNK_163_ADD_590)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK_163_ADD_590));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK_163_ADD_590));
        }
        if (statups.containsKey(MapleBuffStat.UNK_163_ADD_591)) {
        }
        if (statups.containsKey(MapleBuffStat.UNK_240_ADD_650)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK_240_ADD_650));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK_240_ADD_650));
        }
        if (statups.containsKey(MapleBuffStat.UNK_240_ADD_651)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK_240_ADD_651));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK_240_ADD_651));
        }
        if (statups.containsKey(MapleBuffStat.UNK_240_ADD_652)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK_240_ADD_652));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK_240_ADD_652));
        }
        if (statups.containsKey(MapleBuffStat.UNK_220_ADD_648)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK_220_ADD_648));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK_220_ADD_648));
        }
        if (statups.containsKey(MapleBuffStat.UNK_220_ADD_653)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK_220_ADD_653));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK_220_ADD_653));
        }
        if (statups.containsKey(MapleBuffStat.極大分身亂舞)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.極大分身亂舞));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.極大分身亂舞));
        }
        if (statups.containsKey(MapleBuffStat.UNK_161_ADD_577)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK_161_ADD_577));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK_161_ADD_577));
        }
        if (statups.containsKey(MapleBuffStat.UNK_222_635)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK_222_635));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK_222_635));
        }
        if (statups.containsKey(MapleBuffStat.UNK_222_ADD_665)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK_222_ADD_665));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK_222_ADD_665));
        }
        if (statups.containsKey(MapleBuffStat.UNK_162_ADD_623)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK_162_ADD_623));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK_162_ADD_623));
        }
        if (statups.containsKey(MapleBuffStat.AdeleNobleSpirit)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.AdeleNobleSpirit));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.AdeleNobleSpirit));
        }
        if (statups.containsKey(MapleBuffStat.PURIFICATION_RUNE)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.PURIFICATION_RUNE));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.PURIFICATION_RUNE));
        }
        if (statups.containsKey(MapleBuffStat.TRANSFER_RUNE)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.TRANSFER_RUNE));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.TRANSFER_RUNE));
        }
        if (statups.containsKey(MapleBuffStat.UNK_226_ADD_680)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK_226_ADD_680));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK_226_ADD_680));
        }
        if (statups.containsKey(MapleBuffStat.BMageAura)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.BMageAura));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.BMageAura));
        }
        if (statups.containsKey(MapleBuffStat.UNK_229_ADD_678)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK_229_ADD_678));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK_229_ADD_678));
        }
        if (statups.containsKey(MapleBuffStat.UNK_229_ADD_679)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK_229_ADD_679));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK_229_ADD_679));
        }
        if (statups.containsKey(MapleBuffStat.UNK_229_ADD_680)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK_229_ADD_680));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK_229_ADD_680));
        }
        if (statups.containsKey(MapleBuffStat.UNK_229_ADD_681)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK_229_ADD_681));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK_229_ADD_681));
        }
        if (statups.containsKey(MapleBuffStat.UNK_229_ADD_682)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK_229_ADD_682));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK_229_ADD_682));
        }
        if (statups.containsKey(MapleBuffStat.IceAura)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.IceAura));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.IceAura));
        }
        if (statups.containsKey(MapleBuffStat.KnightsAura)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.KnightsAura));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.KnightsAura));
        }
        if (statups.containsKey(MapleBuffStat.ZeroAuraStr)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.ZeroAuraStr));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.ZeroAuraStr));
        }
        if (statups.containsKey(MapleBuffStat.ZeroAuraSpd)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.ZeroAuraSpd));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.ZeroAuraSpd));
        }
        if (statups.containsKey(MapleBuffStat.化身)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.化身));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.化身));
        }
        if (statups.containsKey(MapleBuffStat.UNK_232_ADD_695)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK_232_ADD_695));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK_232_ADD_695));
        }
        if (statups.containsKey(MapleBuffStat.光子射線)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.光子射線));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.光子射線));
        }
        if (statups.containsKey(MapleBuffStat.黑暗靈氣)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.黑暗靈氣));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.黑暗靈氣));
        }
        if (statups.containsKey(MapleBuffStat.殘影幻象)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.殘影幻象));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.殘影幻象));
        }
        if (statups.containsKey(MapleBuffStat.UNK_229_ADD_699)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK_229_ADD_699));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK_229_ADD_699));
        }
        if (statups.containsKey(MapleBuffStat.死亡降臨)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.死亡降臨));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.死亡降臨));
        }
        if (statups.containsKey(MapleBuffStat.UNK_238_ADD_735)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK_238_ADD_735));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK_238_ADD_735));
        }
        if (statups.containsKey(MapleBuffStat.UNK_238_ADD_737)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK_238_ADD_737));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK_238_ADD_737));
        }
        if (statups.containsKey(MapleBuffStat.吸收_潑江水)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.吸收_潑江水));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.吸收_潑江水));
        }
        if (statups.containsKey(MapleBuffStat.吸收_凜冽的寒風)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.吸收_凜冽的寒風));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.吸收_凜冽的寒風));
        }
        if (statups.containsKey(MapleBuffStat.吸收_陽光之力)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.吸收_陽光之力));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.吸收_陽光之力));
        }
        if (statups.containsKey(MapleBuffStat.撫慰甘露)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.撫慰甘露));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.撫慰甘露));
        }
        if (statups.containsKey(MapleBuffStat.IceVortex)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.IceVortex));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.IceVortex));
        }
        if (statups.containsKey(MapleBuffStat.閃光幻象)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.閃光幻象));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.閃光幻象));
        }
        if (statups.containsKey(MapleBuffStat.神聖之血)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.神聖之血));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.神聖之血));
        }
        if (statups.containsKey(MapleBuffStat.Infinity)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.Infinity));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.Infinity));
        }
        if (statups.containsKey(MapleBuffStat.TeleportMasteryOn)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.TeleportMasteryOn));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.TeleportMasteryOn));
        }
        if (statups.containsKey(MapleBuffStat.ChillingStep)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.ChillingStep));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.ChillingStep));
        }
        // SPAWN
        if (statups.containsKey(MapleBuffStat.BlessingArmor)) {
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.海龍螺旋)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.海龍螺旋));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.海龍螺旋));
        }
        if (statups.containsKey(MapleBuffStat.惡魔狂亂)) {
            mplew.writeInt(player.getBuffedIntValue(MapleBuffStat.惡魔狂亂));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.惡魔狂亂));
        }
        if (statups.containsKey(MapleBuffStat.HayatoStance)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.HayatoStance));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.HayatoStance));
        }
        if (statups.containsKey(MapleBuffStat.HayatoStance)) {
            mplew.writeInt(-劍豪.拔刀姿勢);
        }
        if (statups.containsKey(MapleBuffStat.UNK438)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK438));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK438));
        }
        if (statups.containsKey(MapleBuffStat.HayatoStanceBonus)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.HayatoStanceBonus));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.HayatoStanceBonus));
        }
        if (statups.containsKey(MapleBuffStat.HayatoPAD)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.HayatoPAD));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.HayatoPAD));
        }
        if (statups.containsKey(MapleBuffStat.HayatoHPR)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.HayatoHPR));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.HayatoHPR));
        }
        if (statups.containsKey(MapleBuffStat.HayatoMPR)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.HayatoMPR));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.HayatoMPR));
        }
        if (statups.containsKey(MapleBuffStat.HayatoCr)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.HayatoCr));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.HayatoCr));
        }
        if (statups.containsKey(MapleBuffStat.FireBarrier)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.FireBarrier));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.FireBarrier));
        }
        if (statups.containsKey(MapleBuffStat.KannaBDR)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.KannaBDR));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.KannaBDR));
        }
        if (statups.containsKey(MapleBuffStat.Stance)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.Stance));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.Stance));
        }
        if (statups.containsKey(MapleBuffStat.曉月流基本技)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.曉月流基本技));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.曉月流基本技));
        }
        if (statups.containsKey(MapleBuffStat.UNK446)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK446));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK446));
        }
        if (statups.containsKey(MapleBuffStat.結界破魔)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.結界破魔));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.結界破魔));
        }
        if (statups.containsKey(MapleBuffStat.COUNTE_RATTACK)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.COUNTE_RATTACK));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.COUNTE_RATTACK));
        }
        if (statups.containsKey(MapleBuffStat.UNK153)) {
            mplew.writeInt(player.getBuffedIntValue(MapleBuffStat.UNK153));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK153));
        }
        if (statups.containsKey(MapleBuffStat.UNK570)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK570));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK570));
        }
        if (statups.containsKey(MapleBuffStat.水槍大作戰陣營)) {
            mplew.writeInt(player.getBuffSource(MapleBuffStat.水槍大作戰陣營));
        }
        if (statups.containsKey(MapleBuffStat.水槍大作戰階級)) {
            mplew.writeInt(player.getBuffSource(MapleBuffStat.水槍大作戰階級));
        }
        if (statups.containsKey(MapleBuffStat.水槍大作戰效果)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.水槍大作戰效果));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.水槍大作戰效果));
        }
        if (statups.containsKey(MapleBuffStat.UNK575)) {
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK575));
        }
        if (statups.containsKey(MapleBuffStat.UNK576)) {
            mplew.writeInt(player.getBuffedIntValue(MapleBuffStat.UNK576));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK576));
        }
        if (statups.containsKey(MapleBuffStat.ReduceMana)) {
            mplew.writeInt(player.getBuffSource(MapleBuffStat.ReduceMana));
        }
        if (statups.containsKey(MapleBuffStat.UNK_220_566)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK_220_566));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK_220_566));
        }
        if (statups.containsKey(MapleBuffStat.護身強氣)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.護身強氣));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.護身強氣));
        }
        if (statups.containsKey(MapleBuffStat.UNK_738)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.UNK_738));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.UNK_738));
        }
        mplew.write(0);
        mplew.write(0);
        mplew.write(JobConstants.is聖魂劍士(player.getJob()) ? 5 : 0);
        mplew.writeInt(0);
        if (statups.containsKey(MapleBuffStat.UNK_T144_ADD_526)) {
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.UNK_T144_ADD_527)) {
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.PoseType)) {
            mplew.write(player.getBuffedValue(MapleBuffStat.PoseType) != null ? 1 : 0);
        }
        // SPAWN
        if (statups.containsKey(MapleBuffStat.聯盟繩索)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        // SPAWN
        if (statups.containsKey(MapleBuffStat.BattlePvP_LangE_Protection)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.MichaelSoulLink)) {
            MapleBuffStatValueHolder mbsvh = player.getBuffStatValueHolder(MapleBuffStat.MichaelSoulLink);
            mplew.writeInt(mbsvh.fromChrID == player.getId() ? statups.get(MapleBuffStat.MichaelSoulLink) : 0);
            mplew.writeBool(mbsvh.fromChrID == player.getId() && statups.get(MapleBuffStat.MichaelSoulLink) <= 1);
            mplew.writeInt(mbsvh.fromChrID);
            mplew.writeInt(statups.get(MapleBuffStat.MichaelSoulLink) > 1 ? mbsvh.effect.getLevel() : 0);
        }
        // SPAWN
        if (statups.containsKey(MapleBuffStat.AdrenalinBoost)) {
            mplew.write(player.getBuffSource(MapleBuffStat.AdrenalinBoost) == 狂狼勇士.鬥氣爆發 ? 1 : 0);
        }
        if (statups.containsKey(MapleBuffStat.Stigma)) {
            mplew.writeInt(player.getBuffedIntValue(MapleBuffStat.Stigma));
        }
        if (statups.containsKey(MapleBuffStat.神聖團結)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.神聖團結));
        }
        if (statups.containsKey(MapleBuffStat.惡魔狂亂)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.惡魔狂亂));
        }
        if (statups.containsKey(MapleBuffStat.海龍螺旋)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.海龍螺旋));
        }
        if (statups.containsKey(MapleBuffStat.MesoGuard)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.MesoGuard));
        }
        if (statups.containsKey(MapleBuffStat.SpinesOfShadow)) {
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.SpinesOfShadow));
        }
        if (statups.containsKey(MapleBuffStat.熾天覆七重圓環)) {
            mplew.writeInt(player.getBuffedIntValue(MapleBuffStat.熾天覆七重圓環));
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.VampDeath)) {
            mplew.writeInt(player.getBuffedIntValue(MapleBuffStat.VampDeath));
        }
        if (statups.containsKey(MapleBuffStat.榮耀之翼)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.祝福標誌)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        // SPAWN
        if (statups.containsKey(MapleBuffStat.UNK522)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        // SPAWN
        if (statups.containsKey(MapleBuffStat.UNK_163_ADD_582)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        // SPAWN
        if (statups.containsKey(MapleBuffStat.UNK_163_ADD_587)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.黑曜石屏障)) {
            mplew.writeInt(0);
        }
        PacketHelper.write劍刃之壁(mplew, player, player.getBuffSource(MapleBuffStat.StopForceAtomInfo));
        n3 = isChrinfo ? Randomizer.nextInt() : 1;
        // SPAWN 1
        if (statups.containsKey(MapleBuffStat.DashSpeed)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.write(1);
            mplew.writeInt(n3);
            mplew.writeShort(0);
        }
        // SPAWN 2
        if (statups.containsKey(MapleBuffStat.DashJump)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.write(1);
            mplew.writeInt(n3);
            mplew.writeShort(0);
        }
        // SPAWN 3
        if (statups.containsKey(MapleBuffStat.RideVehicle)) {
            sourceid = player.getBuffSource(MapleBuffStat.RideVehicle);
            if (sourceid > 0) {
                MaplePacketCreator.addMountId(mplew, player, sourceid);
                mplew.writeInt(sourceid);
            } else {
                mplew.writeInt(0);
                mplew.writeInt(0);
            }
            mplew.write(1);
            mplew.writeInt(n3);
        }
        // SPAWN 4
        if (statups.containsKey(MapleBuffStat.PartyBooster)) {
            mplew.writeInt(player.getBuffedIntValue(MapleBuffStat.PartyBooster));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.PartyBooster));
            mplew.write(1);
            mplew.writeInt(n3);
        }
        // SPAWN 5
        if (statups.containsKey(MapleBuffStat.GuidedBullet)) {
            mplew.write(1);
            mplew.writeInt(Randomizer.nextInt());
            mplew.writeZeroBytes(10);
            mplew.write(1);
            mplew.writeInt(n3);
        }
        // SPAWN 6
        if (statups.containsKey(MapleBuffStat.Undead)) {
            mplew.writeZeroBytes(16);
            mplew.write(1);
            mplew.writeInt(n3);
        }
        // SPAWN 7
        if (statups.containsKey(MapleBuffStat.UNK_681)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.write(1);
            mplew.writeInt(n3);
        }
        // SPAWN 8
        if (statups.containsKey(MapleBuffStat.RideVehicleExpire)) {
            mplew.writeInt(player.getBuffedIntValue(MapleBuffStat.RideVehicleExpire));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.RideVehicleExpire));
            mplew.writeShort(player.getBuffedIntValue(MapleBuffStat.RideVehicleExpire) > 0 ? 10 : 0);
            mplew.write(1);
            mplew.writeInt(n3);
        }
        // SPAWN 9
        if (statups.containsKey(MapleBuffStat.遺跡能量)) {
            mplew.writeInt(player.getBuffedIntValue(MapleBuffStat.遺跡能量));
            mplew.writeInt(player.getBuffSource(MapleBuffStat.遺跡能量));
            mplew.writeShort(0);
            mplew.write(1);
            mplew.writeInt(n3);
        }
        // SPAWN 10
        if (statups.containsKey(MapleBuffStat.AdeleCurse)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.write(1);
            mplew.writeInt(n3);
            mplew.writeZeroBytes(8);
        }
        for (int i = 0; i < 11; i++) {
            // 像giveBuff的stack Buff
            int nCount = 0;
            mplew.writeInt(nCount);
            for (int j = nCount; j > 0; j--) {
                mplew.writeInt(0);
                mplew.writeInt(0);
                mplew.writeInt(0);
                mplew.writeInt(0);
                mplew.writeInt(0);
                mplew.writeInt(0);
                int nCount1 = 0;
                mplew.writeInt(nCount1);
                for (int k = nCount; k > 0; k--) {
                    mplew.writeInt(0);
                    mplew.writeInt(0);
                }
                int nCount2 = 0;
                mplew.writeInt(nCount2);
                for (int k = nCount; k > 0; k--) {
                    mplew.writeInt(0);
                    mplew.writeInt(0);
                }
            }
        }
        if (statups.containsKey(MapleBuffStat.UNK505)) {
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.KeyDownMoving)) {
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.UNK540)) {
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.ComboCounter)) {
            mplew.writeInt("1".equals(player.getOneInfo(1544, String.valueOf(英雄.鬥氣集中))) ? 1 : 0);
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.UNK_220_ADD_653)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.UNK_162_ADD_623)) {
            mplew.writeInt(0);
        }
        mplew.write(0);
        if (statups.containsKey(MapleBuffStat.AdeleNobleSpirit)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.BMageAura)) {
            mplew.writeInt(player.getBuffedValue(MapleBuffStat.BMageAura) != null ? 1 : 0);
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.UNK_229_ADD_678)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.UNK_229_ADD_679)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.UNK_229_ADD_680)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.UNK_229_ADD_681)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.UNK_229_ADD_682)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.IceAura)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.KnightsAura)) {
            mplew.writeInt(player.getId());
            mplew.writeInt(1);
        }
        if (statups.containsKey(MapleBuffStat.ZeroAuraStr)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.ZeroAuraSpd)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.化身)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.UNK_232_ADD_695)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.光子射線)) {
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.殘影幻象)) {
            mplew.writeInt(player.getBuffedIntZ(MapleBuffStat.殘影幻象));
        }
        if (statups.containsKey(MapleBuffStat.BlessOfDarkness)) {
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.Infinity)) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.UNK_238_ADD_737)) {
            mplew.writeInt(0);
        }
        if (statups.containsKey(MapleBuffStat.UNK_240_ADD_543)) {
            mplew.writeInt(0);
        }
    }

    /**
     * 取消BUFF狀態
     */
    public static byte[] temporaryStatReset(List<MapleBuffStat> statups, MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_TemporaryStatReset.getValue());
        if (statups.contains(MapleBuffStat.意志關懷)) {
            statups.add(MapleBuffStat.黎明神盾_紫血);
        }
        if (statups.contains(MapleBuffStat.幻靈武具)) {
            statups.remove(MapleBuffStat.IndieSummoned);
        }
        mplew.writeBool(true); // TMS229
        mplew.writeBool(true); // TMS229
        mplew.write(statups.size());
        writeBuffMask(mplew, statups);
        statups.sort(Comparator.naturalOrder());
        boolean disease = false;
        for (final MapleBuffStat stat : statups) {
            if (!disease) {
                disease = MapleDisease.containsStat(stat);
            }
            if (stat.canStack() && !SkillConstants.isSpecialStackBuff(stat)) {
                encodeIndieBuffStat(mplew, chr, stat);
            }
        }
        for (MapleBuffStat statup : statups) {
            if (SkillConstants.isMovementAffectingStat(statup)) {
                mplew.write(0);
                break;
            }
        }
        if (statups.contains(MapleBuffStat.PoseType)) {
            mplew.write(1);
        }
        if (statups.contains(MapleBuffStat.UNK_163_ADD_590)) {
            mplew.write(0);
        }
        if (statups.contains(MapleBuffStat.RideVehicleExpire)) {
            mplew.write(1);
        }
        if (statups.contains(MapleBuffStat.RideVehicle)) {
            mplew.write(3);
        } else if (disease) {
            mplew.write(3);
            mplew.write(0);
            mplew.write(1);
        }
        mplew.write(0);

        return mplew.getPacket();
    }

    public static <E extends Buffstat> void writeSingleMask(MaplePacketLittleEndianWriter mplew, E statup) {
        writeBuffMask(mplew, Collections.singletonList(statup));
    }

    public static <E extends Buffstat> void writeBuffMask(MaplePacketLittleEndianWriter mplew, Map<E, Integer> statups) {
        writeBuffMask(mplew, statups.keySet());
    }

    public static <E extends Buffstat> void writeBuffMask(MaplePacketLittleEndianWriter mplew, Collection<E> statups) {
        int[] mask = new int[GameConstants.MAX_BUFFSTAT];
        for (E statup : statups) {
            mask[statup.getPosition()] |= statup.getValue();
        }
        for (int aMask : mask) {
            mplew.writeInt(aMask);
        }
    }

    public static byte[] giveMobZoneState(MapleCharacter chr, int objectId) {
        return giveBuff(chr, null, Collections.singletonMap(MapleBuffStat.MobZoneState, objectId));
    }

    public static byte[] setHoYoungRune(MapleCharacter chr) {
        return giveBuff(chr, null, Collections.singletonMap(MapleBuffStat.虎影道力, 0));
    }

    public static byte[] setHoYoungState(MapleCharacter chr) {
        return giveBuff(chr, null, Collections.singletonMap(MapleBuffStat.虎影屬性, 0));
    }

    public static byte[] setAdeleCharge(MapleCharacter chr) {
        return giveBuff(chr, null, Collections.singletonMap(MapleBuffStat.AdeleCharge, 0));
    }

    public static byte[] setMaliceCharge(MapleCharacter chr) {
        return giveBuff(chr, null, Collections.singletonMap(MapleBuffStat.MaliceCharge, 0));
    }

    public static byte[] showPP(MapleCharacter chr) {
        return giveBuff(chr, null, Collections.singletonMap(MapleBuffStat.KinesisPsychicPoint, 0));
    }

    public static byte[] setErosions(MapleCharacter chr) {
        return giveBuff(chr, null, Collections.singletonMap(MapleBuffStat.幽靈侵蝕, 0));
    }

    public static byte[] setPureBeads(MapleCharacter chr) {
        return giveBuff(chr, null, Collections.singletonMap(MapleBuffStat.純粹咒術子彈, 0));
    }

    public static byte[] setFlameBeads(MapleCharacter chr) {
        return giveBuff(chr, null, Collections.singletonMap(MapleBuffStat.火焰咒術子彈, 0));
    }

    public static byte[] setGaleBeads(MapleCharacter chr) {
        return giveBuff(chr, null, Collections.singletonMap(MapleBuffStat.疾風咒術子彈, 0));
    }

    public static byte[] setAbyssBeads(MapleCharacter chr) {
        return giveBuff(chr, null, Collections.singletonMap(MapleBuffStat.深淵咒術子彈, 0));
    }

    public static byte[] setInfinitiFlameCharge(MapleCharacter chr, int value) {
        return giveBuff(chr, null, Collections.singletonMap(MapleBuffStat.INFINITE_FLAME_CHARGE, value));
    }
}
