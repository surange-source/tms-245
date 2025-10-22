package constants;

import client.MapleBuffStat;
import client.MapleBuffStatValueHolder;
import client.MapleCharacter;
import client.skills.Skill;
import client.skills.SkillEntry;
import client.skills.SkillFactory;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassFetcher;
import client.stat.PlayerStats;
import client.status.MonsterStatus;
import constants.skills.*;
import server.buffs.MapleStatEffect;
import server.Randomizer;

import java.util.*;

public class SkillConstants {

    /*
     * 內在能力系統
     */
    private static final int[] innerSkills = new int[]{
        70000036, // 攻擊一般怪物時增加傷害
        70000039, // 給予狀態異常的敵人追加傷害
        70000000, // 力量 增加
        70000001, // 敏捷增加
        70000002, // 智力增加
        70000003, // 幸運增加
        70000051, // 增加力量、敏捷
        70000052, // 增加力量、智力
        70000053, // 增加力量、幸運
        70000054, // 增加敏捷、智力
        70000055, // 增加敏捷、幸運
        70000056, // 增加智力、幸運
        70000057, // 增加敏捷、力量
        70000058, // 增加智力、力量
        70000059, // 增加幸運、力量
        70000060, // 增加智力、敏捷
        70000061, // 增加幸運、敏捷
        70000062, // 增加幸運、智力
        70000015, // 所有能力值增加
        70000021, // 力量轉換為敏捷
        70000022, // 敏捷轉換為力量
        70000023, // 智力轉換為幸運
        70000024, // 幸運轉換為敏捷
        70000031, // 最大HP 增加一定比率
        70000032, // 最大MP 增加一定比率
        70000006, // 防禦力增加
        70000005, // 移動速度增加
        70000048, // 增加加持持續時間
        70000049, // 增加道具掉落率
        70000050, // 增加楓幣獲得量
        70000012, // 攻擊力增加
        70000013, // 魔力增加
        70000043, // 爆擊機率增加
        70000035, // 攻擊Boss怪物時，增加傷害
        70000041, // 把防禦力轉換為傷害
        70000025, // 一定等級時攻擊力增加
        70000026, // 一定等級時魔力增加
        70000008, // 最大 HP增加
        70000008, // 最大 MP增加
        70000029, // 防禦力固定比率增加
        70000045, // 以一定機率未套用冷卻時間
        70000016, // 攻擊速度增加
        70000046, // 被動技能等級增加 1
        70000047 // 增加攻擊技能目標
    };

    public static boolean isRecoveryIncSkill(int skillId) {
        switch (skillId) {
            case 英雄.強化恢復:
            case 凱撒.自我恢復:
            case 米哈逸.魔力恢復:
                return true;
        }
        return false;
    }

    public static boolean isLinkedAttackSkill(int skillId) {
        return getLinkedAttackSkill(skillId) != skillId;
    }

    public static int getLinkedAttackSkill(int skillId) {
        AbstractSkillHandler handler = SkillClassFetcher.getHandlerBySkill(skillId);
        if (handler != null) {
            int linkedSkillID = handler.getLinkedSkillID(skillId);
            if (linkedSkillID != -1) {
                return linkedSkillID;
            }
        }
        switch (skillId) {
            case 80002644:
                return 80002632;
            case 80011615: {
                return 80011615;
            }
            case 80011612: {
                return 80011613;
            }
            case 80011611: {
                return 80011610;
            }
            case 80011609: {
                return 80011608;
            }
            case 80011607: {
                return 80011606;
            }
            case 80011605: {
                return 80011604;
            }
            case 80011603: {
                return 80011602;
            }
            case 21110003: {
                return 21111013;
            }
            case 21110006: {
                return 21111014;
            }
            case 21120005: {
                return 21121013;
            }
            case 21121055:
            case 21121056: {
                return 21120052;
            }
            case 21110007:
            case 21110008:
            case 21110015: {
                return 21110002;
            }
            case 21120009:
            case 21120010:
            case 21120015: {
                return 21120002;
            }
            case 35101009:
            case 35101010: {
                return 35100008;
            }
            case 35111009:
            case 35111010: {
                return 35111001;
            }
            case 35121013: {
                return 35111004;
            }
            case 5710012: {
                return 5711002;
            }
            case 80002887: {
                return 80001757;
            }
            case 80012015: {
                return 80011993;
            }
        }
        return skillId;
    }

    public static boolean isForceIncrease(int skillId) {
        switch (skillId) {
            case 惡魔殺手.惡魔狂斬:
            case 惡魔殺手.惡魔狂斬1:
            case 惡魔殺手.惡魔狂斬2:
            case 惡魔殺手.惡魔狂斬3:
            case 惡魔殺手.死亡詛咒:

            case 30010166:
            case 30011167:
            case 30011168:
            case 30011169:
            case 30011170:
                return true;
        }
        return false;
    }

    public static boolean is超越攻擊(int skillId) {
        switch (skillId) {
            case 惡魔復仇者.超越_十文字斬:
            case 惡魔復仇者.超越_十文字斬_1:
            case 惡魔復仇者.超越_十文字斬_2:
            case 惡魔復仇者.超越_十文字斬_3:
            case 惡魔復仇者.超越_十文字斬_4:
            case 惡魔復仇者.超越_惡魔風暴:
            case 惡魔復仇者.超越_惡魔風暴_1:
            case 惡魔復仇者.超越_惡魔風暴_2:
            case 惡魔復仇者.超越_惡魔風暴_3:
            case 惡魔復仇者.超越_惡魔風暴_4:
            case 惡魔復仇者.超越_月光斬:
            case 惡魔復仇者.超越_月光斬_1:
            case 惡魔復仇者.超越_月光斬_2:
            case 惡魔復仇者.超越_月光斬_3:
            case 惡魔復仇者.超越_月光斬_4:
            case 惡魔復仇者.超越_逆十文字斬:
            case 惡魔復仇者.超越_逆十文字斬_1:
            case 惡魔復仇者.超越_逆十文字斬_2:
            case 惡魔復仇者.超越_逆十文字斬_3:
            case 惡魔復仇者.超越_逆十文字斬_4:
                return true;
        }
        return false;
    }

    public static int getMPEaterForJob(int job) {
        switch (job) {
            case 210:
            case 211:
            case 212:
                return 火毒.魔力吸收;
            case 220:
            case 221:
            case 222:
                return 冰雷.魔力吸收;
            case 230:
            case 231:
            case 232:
                return 主教.魔力吸收;
        }
        return 火毒.魔力吸收; //魔力吸收 Default, in case GM
    }

    public static boolean isPyramidSkill(int skill) {
        return JobConstants.is零轉職業(skill / 10000) && skill % 10000 == 1020;
    }

    public static boolean isInflationSkill(int skill) {
        return JobConstants.is零轉職業(skill / 10000) && (skill % 10000 >= 1092 && skill % 10000 <= 1095);
    }

    public static boolean isMulungSkill(int skill) {
        return JobConstants.is零轉職業(skill / 10000) && (skill % 10000 == 1009 || skill % 10000 == 1010 || skill % 10000 == 1011);
    }

    public static boolean isIceKnightSkill(int skill) {
        return JobConstants.is零轉職業(skill / 10000) && (skill % 10000 == 1098 || skill % 10000 == 99 || skill % 10000 == 100 || skill % 10000 == 103 || skill % 10000 == 104 || skill % 10000 == 1105);
    }

    public static boolean is騎乘技能(int skill) {
        return JobConstants.is零轉職業(skill / 10000) && skill % 10000 == 1004;
    }

    public static int getAttackDelay(int skillId, Skill skill) {
        switch (skillId) {
            case 火毒.致命毒霧:
                return 0;
            case 3111009:
            case 33121009:
            case 35111004:
            case 35121005:
            case 35121013:
            case 箭神.箭座:
            case 精靈遊俠.伊修塔爾之環:
            case 惡魔復仇者.蝙蝠群:
            case 黑騎士.拉曼查之槍:
            case 槍神.海盜砲擊艇:
            case 槍神.海盜砲擊艇_1:
            case 槍神.海盜砲擊艇_2:
            case 槍神.砲艇標記:
                return 40;
            case 夜使者.三飛閃:
                return 99;
            case 破風使者.寒冰亂舞:
            case 破風使者.天空之歌:
                return 120;
            case 幻影俠盜.炫目卡牌:
            case 幻影俠盜.死神卡牌:
            case 幻影俠盜.連犽突進:
            case 幻影俠盜.卡牌風暴:
            case 夜光.晨星殞落:
            case 傑諾.追縱火箭:
            case 凱撒.意志之劍:
            case 凱撒.進階意志之劍:
            case 凱撒.意志之劍_變身:
            case 凱撒.進階意志之劍_變身:
            case 夜使者.刺客刻印_飛鏢:
            case 夜使者.夜使者的標記:
                return 30;
            case 32121003:
            case 冰雷.冰鋒刃:
                return 180;
            case 夜光.晨星殞落_爆炸:
            case 凱撒.龍劍風:
            case 凱撒.展翅飛翔:
                return 210;
            case 21110007:
            case 21110008:
            case 21120009:
            case 21120010:
                return 390;
            case 惡魔殺手.惡魔狂斬1:
            case 惡魔殺手.惡魔狂斬2:
            case 惡魔殺手.惡魔狂斬3:
                return 270;
            case 惡魔殺手.變形:
                return 510;
            case 凱撒.劍龍連斬:
            case 凱撒.劍龍連斬_1:
            case 凱撒.劍龍連斬_2:
                return 240;
            case 天使破壞者.繼承人:
            case 天使破壞者.靈魂震動:
                return 180;
            case 傑諾.疾風劍舞:
                return 120;
            case 0: // Normal Attack, TODO delay for each weapon type
                return 330;
        }
        if (skill != null && skill.getSkillType() == 3) {
            return 0; //final attack
        }
        if (skill != null && skill.getDelay() > 0 && skillId != 21101003 && skillId != 33101004 && skillId != 32111010 && skillId != 火毒.瞬間移動精通 && skillId != 冰雷.瞬間移動精通 && skillId != 主教.瞬間移動精通 && skillId != 22161005 && skillId != 烈焰巫師.瞬間移動精通 && skillId != 32121003 && skillId != 機甲戰神.戰鬥機器_巨人錘 && skillId != 22150004 && skillId != 22181004) {
            return skill.getDelay();
        }
        return 330; // Default usually
    }

    /*
     * 管理員技能
     */
    public static boolean isAdminSkill(int skillId) {
        int jobId = skillId / 10000;
        return jobId == 800 || jobId == 900;
    }

    /*
     * 特殊技能
     */
    public static boolean isSpecialSkill(int skillId) {
        int jobId = skillId / 10000;
        return jobId == 7000 || jobId == 7100 || jobId == 8000 || jobId == 9000 || jobId == 9100 || jobId == 9200 || jobId == 9201 || jobId == 9202 || jobId == 9203 || jobId == 9204;
    }

    public static boolean isApplicableSkill(int skillId) {
        return ((skillId < 80000000 || skillId >= 100000000) && (skillId % 10000 < 8000 || skillId % 10000 > 8006) && !is天使祝福戒指(skillId)) || skillId >= 92000000 || (skillId >= 80000000 && skillId < 80020000); //no additional/decent skills
    }

    public static boolean isApplicableSkill_(int skillId) { //not applicable to saving but is more of temporary
        for (int i : PlayerStats.pvpSkills) {
            if (skillId == i) {
                return true;
            }
        }
        return (skillId >= 90000000 && skillId < 92000000) || (skillId % 10000 >= 8000 && skillId % 10000 <= 8003) || is天使祝福戒指(skillId);
    }

    public static boolean isNoDelaySkill(int skillId) {
        switch (skillId) {
            case 狂狼勇士.強化連擊:
            case 火毒.瞬間移動精通:
            case 冰雷.瞬間移動精通:
            case 主教.瞬間移動精通:
            case 機甲戰神.合金盔甲_人型:
            case 機甲戰神.合金盔甲_戰車:
            case 機甲戰神.戰鬥機器_巨人錘:
            case 龍魔導士.龍之捷:
            case 龍魔導士.龍之火花:
            case 龍魔導士.龍之捷_1:
            case 龍魔導士.龍之捷_2:
            case 龍魔導士.風之捷_攻擊:
            case 龍魔導士.歐尼斯的意志:
            case 影武者.修羅:
            case 狂豹獵人.召喚美洲豹_銀灰:
            case 狂豹獵人.召喚美洲豹_暗黃:
            case 狂豹獵人.召喚美洲豹_血紅:
            case 狂豹獵人.召喚美洲豹_紫光:
            case 狂豹獵人.召喚美洲豹_深藍:
            case 狂豹獵人.召喚美洲豹_傑拉:
            case 狂豹獵人.召喚美洲豹_白雪:
            case 狂豹獵人.召喚美洲豹_歐尼斯:
            case 狂豹獵人.召喚美洲豹_地獄裝甲:
            case 煉獄巫師.死神:
            case 煉獄巫師.死神契約I:
            case 煉獄巫師.死神契約II:
            case 煉獄巫師.死神契約III:
            case 煉獄巫師.黑暗閃電:
            case 隱月.小狐仙:
            case 凱內西斯.永恆壞滅:
            case 幻獸師.旋風飛行:
            case 冰雷.冰鋒刃:
            case 暗影神偷.暗影霧殺:
            case 惡魔殺手.變形:
            case 凱撒.意志之劍:
            case 凱撒.進階意志之劍:
            case 凱內西斯.心靈領域:
            case 凱內西斯.終極技_BPM:
            case 狂豹獵人.連弩陷阱:
            case 狂豹獵人.鑽孔集裝箱:
            case 80011133:// MX-131.支援射擊
                return true;
        }
        return false;
    }

    public static boolean isNoApplyAttack(int skillId) {
        switch (skillId) {
            case 80002890: // 轉移之輪
            case 阿戴爾.復原:
            case 阿戴爾.乙太風暴:
            case 墨玄.神功_無影腳:
            case 菈菈.山之種子:
            case 主教.群體治癒:
                return true;
        }
        return false;
    }

    public static boolean is召喚獸戒指(int skillID) {
        switch (skillID) {
            case 1085:
            case 1087:
            case 80000052:
            case 80000053:
            case 80000054:
            case 80000086:
            case 80000155:
            case 80001154:
            case 80001262:
            case 80001518:
            case 80001519:
            case 80001520:
            case 80001521:
            case 80001522:
            case 80001523:
            case 80001524:
            case 80001525:
            case 80001526:
            case 80001527:
            case 80001528:
            case 80001529:
            case 80001530:
            case 80001531:
            case 80010067:
            case 80010068:
            case 80010069:
            case 80010070:
            case 80010071:
            case 80010072:
            case 80010075:
            case 80010076:
            case 80010077:
            case 80010078:
            case 80010079:
            case 80010080:
            case 80011103:
            case 80011104:
            case 80011105:
            case 80011106:
            case 80011107:
            case 80011108: {
                return true;
            }
            default: {
                return dZ(getSkillRoot(skillID)) && (skillID % 10000 == 1085 || skillID % 10000 == 1087 || skillID % 10000 == 1090 || skillID % 10000 == 1179);
            }
        }
//        return is天使祝福戒指(skillId);
    }

    public static boolean is天使祝福戒指(int skillId) {
        return JobConstants.is零轉職業(skillId / 10000) && (skillId % 10000 == 1085 || skillId % 10000 == 1087 || skillId % 10000 == 1090 || skillId % 10000 == 1179);
    }

    public static boolean is天氣戒指(int skillId) {
        return JobConstants.is零轉職業(skillId / 10000) && (skillId / 10000 == 8001) && (skillId % 10000 >= 67 && skillId % 10000 <= 80);
    }

    /*
     * 角色卡系統
     * 1 = B
     * 2 = A
     * 3 = S
     * 4 = SS
     */
    public static int getCardSkillLevel(int level) {
        if (level >= 60 && level < 100) {
            return 2;
        } else if (level >= 100 && level < 200) {
            return 3;
        } else if (level >= 200) {
            return 4;
        }
        return 1;
    }

    /*
     * 技能的模式
     */
    public static int getLuminousSkillMode(int skillId) {
        switch (skillId) {
            case 夜光.星星閃光:
            case 夜光.光明長槍:
            case 夜光.光柱爆發:
            case 夜光.光箭:
            case 夜光.閃亮救贖:
            case 夜光.極速反射:
                return 夜光.光蝕; //光明技能 20040216 - 太陽火焰 - 使用充滿光明的光之魔法後，造成額外傷害。每次施展魔法時，恢復一定比例的體力，MP使用量減少50%。
            case 夜光.黑暗球體:
            case 夜光.黑暗之眼:
            case 夜光.黑暗之錨:
            case 夜光.晨星殞落:
            case 夜光.暗黑烈焰:
            case 夜光.晨星殞落_爆炸:
                return 夜光.暗蝕; //黑暗技能 20040217 - 月蝕 - 使用充滿黑暗的暗之魔法後，造成額外傷害。每次施展魔法時，恢復一定比例的體力，MP使用量減少50%。
            case 夜光.死神鐮刀:
            case 夜光.絕對擊殺:
                return 夜光.平衡_光明; //平衡技能 20040219 - 平衡 - 使用光明和黑暗完美平衡的穩如泰山，並使所有傷害減至1。使用光明、黑暗，混合魔法時產生額外傷害。無冷卻時間，施展光明攻擊魔法時，恢復一定比例的體力；施展黑暗攻擊魔法時，不消耗MP。
        }
        return -1;
    }

    public static int getSoulMasterAttackMode(int skillid) {
        switch (skillid) {
            case 聖魂劍士.潛行突襲:
            case 聖魂劍士.殘像追擊:
            case 聖魂劍士.月影:
            case 聖魂劍士.月光十字架:
            case 聖魂劍士.月光之舞:
            case 聖魂劍士.月光之舞_空中:
            case 聖魂劍士.新月分裂: {
                return 1;
            }
            case 聖魂劍士.皇家衝擊:
            case 聖魂劍士.焚影:
            case 聖魂劍士.光芒四射:
            case 聖魂劍士.日光十字架:
            case 聖魂劍士.疾速黃昏:
            case 聖魂劍士.疾速黃昏_空中:
            case 聖魂劍士.太陽穿刺: {
                return 2;
            }
        }
        return -1;
    }

    public static boolean isShowForgenBuff(MapleBuffStat buff) {
        switch (buff) {
            case UNK_T146_ADD_256:
            case UNK_T144_ADD_526:
            case UNK_T144_ADD_527:
            case UNK_T144_ADD_528:
            case IndieMDF:
            case DarkSight:
            case SoulArrow:
            case Stun:
            case Poison:
            case Seal:
            case Darkness:
            case ComboCounter:
            case 祝福之鎚:
            case 強化祝福之鎚:
            case WeaponCharge:
            case ShadowPartner:
            case Weakness:
            case Curse:
            case Slow:
            case Morph:
            case Stance:
            case Attract:
            case NoBulletConsume:
            case BanMap:
            case Ghost:
            case Barrier:
            case ReverseInput:
            case RespectPImmune:
            case RespectMImmune:
            case DefenseState:
            case DojangBerserk:
            case DojangInvincible:
            case DojangShield:
            case WindBreakerFinal:
            case HideAttack:
            case RepeatEffect:
            case StopPortion:
            case StopMotion:
            case Blind:
            case HiddenPieceOn:
            case MagicShield:
            case Flying:
            case Frozen:
            case DrawBack:
            case NotDamaged:
            case FinalCut:
            case Dance:
            case Sneak:
            case Mechanic:
            case BlessingArmor:
            case Beholder:
            case Inflation:
            case Web:
            case DisOrder:
            case Thread:
            case Team:
            case Explosion:
            case PvPRaceEffect:
            case WeaknessMdamage:
            case Frozen2:
            case Shock:
            case HolyMagicShell:
            case DamAbsorbShield:
            case DevilishPower:
            case SpiritLink:
            case Event:
            case Lapidification:
            case PyramidEffect:
            case KeyDownMoving:
            case IgnoreTargetDEF:
            case Invisible:
            case Judgement:
            case Magnet:
            case MagnetArea:
            case 追蹤箭頭:
            case UNK250:
            case 祝福標誌:
            case 元素精靈:
            case KeyDownAreaMoving:
            case Larkness:
            case StackBuff:
            case BlessOfDarkness:
            case AntiMagicShell:
            case SmashStack:
            case ReshuffleSwitch:
            case StopForceAtomInfo:
            case SoulGazeCriDamR:
            case PowerTransferGauge:
            case AffinitySlug:
            case MobZoneState:
            case ComboUnlimited:
            case SoulExalt:
            case IgnorePImmune:
            case UNK274:
            case IceAura:
            case FireAura:
            case VengeanceOfAngel:
            case HeavensDoor:
            case BleedingToxin:
            case IgnoreMobDamR:
            case Asura:
            case 滅世雷射光:
            case ReturnTeleport:
            case CapDebuff:
            case OverloadCount:
            case SurplusSupply:
            case NewFlying:
            case AmaranthGenerator:
            case OnCapsule:
            case CygnusElementSkill:
            case StrikerHyperElectric:
            case Albatross:
            case Translucence:
            case PoseType:
            case LightOfSpirit:
            case ElementSoul:
            case GlimmeringTime:
            case FullSoulMP:
            case ElementalCharge:
            case Reincarnation:
            case NaviFlying:
            case QuiverCatridge:
            case UserControlMob:
            case ImmuneBarrier:
            case ArmorPiercing:
            case ZeroAuraStr:
            case ZeroAuraSpd:
            case SpiritGuard:
            case JaguarSummoned:
            case BMageAura:
            case DarkLighting:
            case AttackCountX:
            case FireBarrier:
            case 惡魔狂亂:
            case SpinesOfShadow:
            case UNK419:
            case 聯盟繩索:
            case BattlePvP_LangE_Protection:
            case PinkbeanRollingGrade:
            case MichaelSoulLink:
            case MichaelStanceLink:
            case KinesisPsychicEnergeShield:
            case Fever:
            case AdrenalinBoost:
            case RWMagnumBlow:
            case 神聖連發重擊:
            case RWBarrier:
            case 瑪哈之疾:
            case 海之霸主:
            case 能量爆炸:
            case 神雷合一:
            case 槍彈盛宴:
            case 聖靈祈禱:
            case 心靈龍捲風:
            case 突擊之盾:
            case 普力特的祝福:
            case 超載模式:
            case 聚光燈:
            case UNK505:
            case 榮耀之翼:
            case 超速動能:
            case 虛無型態:
            case 必死決心:
            case 爆擊強化:
            case 鋼鐵之軀:
            case UNK514:
            case UNK515:
            case 和諧連結:
            case 快速充能:
            case UNK522:
            case UNK545:
            case AnimalChange:
            case TeamRoar:
            case 結界破魔:
            case HayatoStance:
            case HayatoStanceBonus:
            case HayatoPAD:
            case HayatoHPR:
            case HayatoMPR:
            case HayatoCr:
            case KannaBDR:
            case COUNTE_RATTACK:
            case 曉月流基本技:
            case 水槍大作戰陣營:
            case 水槍大作戰階級:
            case 水槍大作戰效果:
            case DashSpeed:
            case DashJump:
            case RideVehicle:
            case PartyBooster:
            case GuidedBullet:
            case Undead:
            case UNK_681:
            case RideVehicleExpire:
            case 遺跡能量: {
                return true;
            }
        }
        return false;
    }

    public static boolean isMovementAffectingStat(MapleBuffStat buffStat) {
        switch (buffStat) {
            case Speed:
            case Jump:
            case Stun:
            case Weakness:
            case Slow:
            case Morph:
            case Ghost:
            case BasicStatUp:
            case Attract:
            case DashSpeed:
            case DashJump:
            case Flying:
            case Frozen:
            case Frozen2:
            case Lapidification:
            case IndieSpeed:
            case IndieJump:
            case KeyDownMoving:
            case Mechanic:
            case Magnet:
            case MagnetArea:
            case VampDeath:
            case VampDeathSummon:
            case GiveMeHeal:
            case DarkTornado:
            case NewFlying:
            case NaviFlying:
            case UserControlMob:
            case Dance:
            case SelfWeakness:
            case BattlePvP_Helena_WindSpirit:
            case BattlePvP_LeeMalNyun_ScaleUp:
            case TouchMe:
            case IndieForceSpeed:
            case IndieForceJump:
            case DarkSight:
            case Shock:
            case SmashStack:
            case FireAura:
            case CapDebuff:
            case RideVehicle:
                return true;
        }
        return false;
    }

    public static boolean isWriteBuffIntValue(MapleBuffStat buffStat) {
        switch (buffStat) {
            case 突擊之盾:
            case ShadowPartner:
            case MagnetArea:
            case SpiritLink:
            case SoulGazeCriDamR:
            case PowerTransferGauge:
            case ReturnTeleport:
            case ImmuneBarrier:
            case QuiverCatridge:
            case NaviFlying:
            case Dance:
            case RideVehicle:
            case RideVehicleExpire:
            case RWBarrier:
            case 滅世雷射光:
            case UNK153:
            case CarnivalDefence:
            case DojangLuckyBonus:
            case VampDeath:
            case BossShield:
            case SetBaseDamage:
            case DotHealHPPerSecond:
            case DotHealMPPerSecond:
            case SetBaseDamageByBuff:
            case 神聖團結:
            case AranSmashSwing: {
                return true;
            }
        }
        return false;
    }

    public static boolean isSpecialStackBuff(MapleBuffStat buffStat) {
        switch (buffStat) {
            case DashSpeed:
            case DashJump:
            case GuidedBullet:
            case Undead:
            case RideVehicleExpire:
            case RideVehicle:
            case PartyBooster:
            case 遺跡能量:
            case AdeleCurse: {
                return true;
            }
        }
        return false;
    }

    public static boolean is美洲豹(int skillId) {
        switch (skillId) {
            case 狂豹獵人.召喚美洲豹_銀灰:
            case 狂豹獵人.召喚美洲豹_暗黃:
            case 狂豹獵人.召喚美洲豹_血紅:
            case 狂豹獵人.召喚美洲豹_紫光:
            case 狂豹獵人.召喚美洲豹_深藍:
            case 狂豹獵人.召喚美洲豹_傑拉:
            case 狂豹獵人.召喚美洲豹_白雪:
            case 狂豹獵人.召喚美洲豹_歐尼斯:
            case 狂豹獵人.召喚美洲豹_地獄裝甲:
                return true;
        }
        return false;
    }

    public static boolean isRuneSkill(int skillid) {
        switch (getLinkedAttackSkill(skillid)) {
            case 80001427:
            case 80001428:
            case 80001430:
            case 80001432:
            case 80001752:
            case 80001753:
            case 80001754:
            case 80001755:
            case 80001757:
            case 80001762: {
                return true;
            }
        }
        return false;
    }

    public static boolean isGeneralSkill(int skillid) {
        if (skillid == 龍魔導士.龍神之怒) {
            return false;
        }
        switch (skillid) {
            case 80011133:
            case 80001242:
            case 80001429:
            case 80001431:
            case 80001761:
            case 80001762: {
                return true;
            }
        }
        return skillid % 10000 == 1095 || skillid % 10000 == 1094;
    }

    public static Map<Integer, Integer> TeachSkillMap = new LinkedHashMap<>();

    static {
        TeachSkillMap.put(英雄.無形的信任_英雄, 英雄.無形的信任_英雄_傳授);
        TeachSkillMap.put(聖騎士.無形的信任_聖騎士, 聖騎士.無形的信任_聖騎士_傳授);
        TeachSkillMap.put(黑騎士.無形的信任_黑騎士, 黑騎士.無形的信任_黑騎士_傳授);
        TeachSkillMap.put(火毒.實戰的知識_火毒大魔導士, 火毒.實戰的知識_火毒大魔導士_傳授);
        TeachSkillMap.put(冰雷.實戰的知識_冰雷大魔導士, 冰雷.實戰的知識_冰雷大魔導士_傳授);
        TeachSkillMap.put(主教.實戰的知識_主教, 主教.實戰的知識_主教_傳授);
        TeachSkillMap.put(箭神.探險家的好奇心_箭神, 箭神.探險家的好奇心_箭神_傳授);
        TeachSkillMap.put(神射手.探險家的好奇心_神射手, 神射手.探險家的好奇心_神射手_傳授);
        TeachSkillMap.put(開拓者.探險家的好奇心_開拓者, 開拓者.探險家的好奇心_開拓者_傳授);
        TeachSkillMap.put(夜使者.小偷的狡詐_夜使者, 夜使者.小偷的狡詐_夜使者_傳授);
        TeachSkillMap.put(暗影神偷.小偷的狡詐_暗影神偷, 暗影神偷.小偷的狡詐_暗影神偷_傳授);
        TeachSkillMap.put(影武者.小偷的狡詐_影武者, 影武者.小偷的狡詐_影武者_傳授);
        TeachSkillMap.put(拳霸.海盜的祝福_拳霸, 拳霸.海盜的祝福_拳霸_傳授);
        TeachSkillMap.put(槍神.海盜的祝福_槍神, 槍神.海盜的祝福_槍神_傳授);
        TeachSkillMap.put(重砲指揮官.海盜的祝福_重砲指揮官, 重砲指揮官.海盜的祝福_重砲指揮官_傳授);
        TeachSkillMap.put(狂狼勇士.連續擊殺優勢, 狂狼勇士.連續擊殺優勢_傳授);
        TeachSkillMap.put(龍魔導士.輪之堅持, 龍魔導士.輪之堅持_傳授);
        TeachSkillMap.put(精靈遊俠.精靈的祝福, 精靈遊俠.精靈的祝福_傳授);
        TeachSkillMap.put(幻影俠盜.致命本能, 幻影俠盜.致命本能_傳授);
        TeachSkillMap.put(夜光.滲透, 夜光.滲透_傳授);
        TeachSkillMap.put(隱月.死裡逃生, 隱月.死裡逃生_傳授);
        TeachSkillMap.put(惡魔殺手.惡魔之怒, 惡魔殺手.後續待發);
        TeachSkillMap.put(惡魔復仇者.狂暴鬥氣, 惡魔復仇者.狂暴鬥氣_傳授);
        TeachSkillMap.put(傑諾.合成邏輯, 傑諾.合成邏輯_傳授);
        TeachSkillMap.put(陰陽師.紫扇傳授, 陰陽師.紫扇傳授_傳授);
        TeachSkillMap.put(劍豪.疾風傳授, 劍豪.疾風傳授_傳授);
        TeachSkillMap.put(米哈逸.光之守護, 米哈逸.光之守護_傳授);
        TeachSkillMap.put(凱撒.鋼鐵意志, 凱撒.鋼鐵意志_傳授);
        TeachSkillMap.put(凱殷.事前準備, 凱殷.事前準備_傳授);
        TeachSkillMap.put(天使破壞者.靈魂契約, 天使破壞者.靈魂契約_傳授);
        TeachSkillMap.put(幻獸師.精靈集中, 幻獸師.精靈集中_傳授);
        TeachSkillMap.put(聖魂劍士.西格諾斯祝福_劍士, 聖魂劍士.西格諾斯祝福_劍士_傳授);
        TeachSkillMap.put(烈焰巫師.西格諾斯祝福_法師, 烈焰巫師.西格諾斯祝福_法師_傳授);
        TeachSkillMap.put(破風使者.西格諾斯祝福_弓箭手, 破風使者.西格諾斯祝福_弓箭手_傳授);
        TeachSkillMap.put(暗夜行者.西格諾斯祝福_盜賊, 暗夜行者.西格諾斯祝福_盜賊_傳授);
        TeachSkillMap.put(閃雷悍將.西格諾斯祝福_海盜, 閃雷悍將.西格諾斯祝福_海盜_傳授);
        TeachSkillMap.put(神之子.時之祝福, 神之子.時之祝福_傳授);
        TeachSkillMap.put(凱內西斯.判斷, 凱內西斯.判斷_傳授);
        TeachSkillMap.put(煉獄巫師.自由精神_煉獄巫師, 煉獄巫師.自由精神_煉獄巫師_傳授);
        TeachSkillMap.put(狂豹獵人.自由精神_狂豹獵人, 狂豹獵人.自由精神_狂豹獵人_傳授);
        TeachSkillMap.put(機甲戰神.自由精神_機甲戰神, 機甲戰神.自由精神_機甲戰神_傳授);
        TeachSkillMap.put(爆拳槍神.自由精神_爆拳槍神, 爆拳槍神.自由精神_爆拳槍神_傳授);
        TeachSkillMap.put(卡蒂娜.集中狂攻, 卡蒂娜.集中狂攻_傳授);
        TeachSkillMap.put(伊利恩.戰鬥的流動, 伊利恩.戰鬥的流動_傳授);
        TeachSkillMap.put(亞克.無我, 亞克.無我_傳授);
        TeachSkillMap.put(阿戴爾.貴族, 阿戴爾.貴族_傳授);
        TeachSkillMap.put(菈菈.大自然夥伴, 菈菈.大自然夥伴_傳授);
        TeachSkillMap.put(虎影.自信心, 虎影.自信心_傳授);
        TeachSkillMap.put(墨玄.氣魄, 墨玄.氣魄_傳授);
    }

    public static boolean isExtraSkill(int skillid) {
        int group = skillid % 10000;
        switch (group) {
            case 8000:
            case 8001:
            case 8002:
            case 8003:
            case 8004:
            case 8005:
            case 8006: {
                return true;
            }
        }
        return false;
    }

    public static int getCooldownLinkSourceId(final int skillId) {
        switch (skillId) {
            case 米哈逸.光輝聖劍_1:
            case 米哈逸.光輝聖劍_2:
            case 米哈逸.光輝聖劍_3:
            case 米哈逸.光輝聖劍_4:
            case 米哈逸.光輝聖劍_5:
                return 米哈逸.光輝聖劍;
            case 暗影神偷.黑影切斷_1:
            case 暗影神偷.黑影切斷_2:
                return 暗影神偷.黑影切斷;
            case 聖騎士.祝福之鎚_強化:
                return 聖騎士.祝福之鎚;
            case 狂狼勇士.揮動瑪哈_1:
                return 狂狼勇士.揮動瑪哈;
            case 劍豪.百人一閃:
                return 劍豪.疾風五月雨刃;
            case 陰陽師.鬼夜叉_大鬼封魂陣_1:
                return 陰陽師.鬼夜叉_大鬼封魂陣;
            case 開拓者.連段襲擊_釋放:
            case 開拓者.連段襲擊_爆破:
            case 開拓者.連段襲擊_轉移:
                return 開拓者.連段襲擊;
            case 開拓者.古代神矢_釋放:
            case 開拓者.古代神矢_爆破:
            case 開拓者.古代神矢_轉移:
                return 開拓者.古代神矢;
            case 開拓者.黑曜石屏障_釋放:
            case 開拓者.黑曜石屏障_爆破:
            case 開拓者.黑曜石屏障_轉移:
                return 開拓者.黑曜石屏障;
            case 開拓者.遺跡解放_釋放:
            case 開拓者.遺跡解放_爆破:
            case 開拓者.遺跡解放_轉移:
                return 開拓者.遺跡解放;
            case 狂豹獵人.狂豹之怒:
                return 狂豹獵人.閃光雨;
            case 幻獸師.歡樂派對_4:
            case 幻獸師.歡樂派對_8:
            case 幻獸師.歡樂派對_11:
            case 幻獸師.歡樂派對_13:
                return 幻獸師.幻獸師派對時間;
            case 幻影俠盜.間隙破壞_1:
                return 幻影俠盜.間隙破壞;
        }
        return skillId;
    }

    public static byte getLinkSkillslevel(Skill skill, int cid, int defchrlevel) {
        if (skill == null) {
            return 0;
        }
        int chrlevel;
        if (cid > 0 && skill.isLinkSkills()) {
            chrlevel = MapleCharacter.getLevelbyid(cid);
        } else if (skill.isTeachSkills()) {
            chrlevel = defchrlevel;
        } else {
            return 0;
        }
        switch (skill.getMaxLevel()) {
            case 5: {
                if (chrlevel < 110) {
                    return 0;
                }
                break;
            }
            default: {
                if (chrlevel < 70) {
                    return 0;
                }
                break;
            }
        }
        switch (skill.getMaxLevel()) {
            case 1: {
                return 1;
            }
            case 5: {
                if (chrlevel >= 200) {
                    return 5;
                }
                if (chrlevel >= 175) {
                    return 4;
                }
                if (chrlevel >= 150) {
                    return 3;
                }
                if (chrlevel >= 125) {
                    return 2;
                }
                return 1;
            }
            default: {
                if (chrlevel >= 120) {
                    return 2;
                }
                return 1;
            }
        }
    }

    /*
     * 種族特性本能技能
     */
    public static boolean isTeachSkills(int id) {
        return TeachSkillMap.containsKey(id);
    }

    /*
     * 鏈接技能技能
     */
    public static boolean isLinkSkills(int id) {
        for (int skillId : TeachSkillMap.values()) {
            if (skillId == id) {
                return true;
            }
        }
        return false;
    }

    public static int[] getTeamTeachSkills(int skillid) {
        switch (skillid) {
            case 貴族.西格諾斯祝福: {
                return new int[]{聖魂劍士.西格諾斯祝福_劍士_傳授, 烈焰巫師.西格諾斯祝福_法師_傳授, 破風使者.西格諾斯祝福_弓箭手_傳授, 暗夜行者.西格諾斯祝福_盜賊_傳授, 閃雷悍將.西格諾斯祝福_海盜_傳授};
            }
            case 市民.自由精神: {
                return new int[]{煉獄巫師.自由精神_煉獄巫師_傳授, 狂豹獵人.自由精神_狂豹獵人_傳授, 機甲戰神.自由精神_機甲戰神_傳授, 爆拳槍神.自由精神_爆拳槍神_傳授};
            }
            case 劍士.無形的信任: {
                return new int[]{英雄.無形的信任_英雄_傳授, 聖騎士.無形的信任_聖騎士_傳授, 黑騎士.無形的信任_黑騎士_傳授};
            }
            case 法師.實戰的知識: {
                return new int[]{火毒.實戰的知識_火毒大魔導士_傳授, 冰雷.實戰的知識_冰雷大魔導士_傳授, 主教.實戰的知識_主教_傳授};
            }
            case 弓箭手.探險家的好奇心: {
                return new int[]{箭神.探險家的好奇心_箭神_傳授, 神射手.探險家的好奇心_神射手_傳授, 開拓者.探險家的好奇心_開拓者_傳授};
            }
            case 盜賊.小偷的狡詐: {
                return new int[]{夜使者.小偷的狡詐_夜使者_傳授, 暗影神偷.小偷的狡詐_暗影神偷_傳授, 影武者.小偷的狡詐_影武者_傳授};
            }
            case 海盜.海盜的祝福: {
                return new int[]{重砲指揮官.海盜的祝福_重砲指揮官_傳授, 拳霸.海盜的祝福_拳霸_傳授, 槍神.海盜的祝福_槍神_傳授};
            }
        }
        return null;
    }

    public static int getTeamTeachSkillId(int skillid) {
        switch (skillid) {
            case 聖魂劍士.西格諾斯祝福_劍士_傳授:
            case 烈焰巫師.西格諾斯祝福_法師_傳授:
            case 破風使者.西格諾斯祝福_弓箭手_傳授:
            case 暗夜行者.西格諾斯祝福_盜賊_傳授:
            case 閃雷悍將.西格諾斯祝福_海盜_傳授: {
                return 貴族.西格諾斯祝福;
            }
            case 煉獄巫師.自由精神_煉獄巫師_傳授:
            case 狂豹獵人.自由精神_狂豹獵人_傳授:
            case 機甲戰神.自由精神_機甲戰神_傳授:
            case 爆拳槍神.自由精神_爆拳槍神_傳授: {
                return 市民.自由精神;
            }
            case 英雄.無形的信任_英雄_傳授:
            case 聖騎士.無形的信任_聖騎士_傳授:
            case 黑騎士.無形的信任_黑騎士_傳授: {
                return 劍士.無形的信任;
            }
            case 火毒.實戰的知識_火毒大魔導士_傳授:
            case 冰雷.實戰的知識_冰雷大魔導士_傳授:
            case 主教.實戰的知識_主教_傳授: {
                return 法師.實戰的知識;
            }
            case 箭神.探險家的好奇心_箭神_傳授:
            case 神射手.探險家的好奇心_神射手_傳授:
            case 開拓者.探險家的好奇心_開拓者_傳授: {
                return 弓箭手.探險家的好奇心;
            }
            case 夜使者.小偷的狡詐_夜使者_傳授:
            case 暗影神偷.小偷的狡詐_暗影神偷_傳授:
            case 影武者.小偷的狡詐_影武者_傳授: {
                return 盜賊.小偷的狡詐;
            }
            case 重砲指揮官.海盜的祝福_重砲指揮官_傳授:
            case 拳霸.海盜的祝福_拳霸_傳授:
            case 槍神.海盜的祝福_槍神_傳授: {
                return 海盜.海盜的祝福;
            }
            case 劍士.無形的信任:
            case 法師.實戰的知識:
            case 弓箭手.探險家的好奇心:
            case 盜賊.小偷的狡詐:
            case 海盜.海盜的祝福:
            case 貴族.西格諾斯祝福:
            case 市民.自由精神: {
                return 1;
            }
        }
        return 0;
    }

    public static int getTeachSkillId(int skillid) {
        for (Map.Entry<Integer, Integer> entry : TeachSkillMap.entrySet()) {
            if (entry.getValue() == skillid) {
                return entry.getKey();
            }
        }
        return -1;
    }

    public static int getLinkSkillId(int skillid) {
        if (TeachSkillMap.containsKey(skillid)) {
            return TeachSkillMap.get(skillid);
        }
        return -1;
    }

    public static int getStolenHyperSkillColltime(int skillId) {
        switch (skillId) {
            case 英雄.劍士意念:
                return 300;
            case 聖騎士.神域護佑:
                return 600;
            case 黑騎士.黑暗飢渴:
                return 180;
            case 火毒.火靈結界:
                return 75;
            case 冰雷.冰雪結界:
                return 90;
            case 主教.復仇天使:
                return 300;
            case 箭神.戰鬥準備:
                return 120;
            case 神射手.專注弱點:
                return 150;
            case 夜使者.出血毒素:
                return 120;
            case 暗影神偷.翻轉硬幣:
                return 45;
            case 拳霸.暴能續發:
                return 75;
            case 槍神.撫慰甘露:
                return 60;
            default:
                return 0;
        }
    }

    public static boolean isAngelRebornSkill(int skillID) {
        switch (skillID) {
            case 天使破壞者.泡沫之星:
            case 天使破壞者.刺殺爆破:
            case 天使破壞者.靈魂探求者:
            case 天使破壞者.流星:
            case 天使破壞者.原始咆嘯:
            case 天使破壞者.三位一體: {
                return true;
            }
            default: {
                return false;
            }
        }
    }

    public static List<Integer> getUnstableMemorySkillsByJob(short job) {
        final ArrayList<Integer> list = new ArrayList<>();
        list.add(法師.魔靈彈);
        switch (job) {
            case 212: {
                list.add(火毒.魔火焰彈);
                list.add(火毒.毒霧);
                list.add(火毒.精神強化);
                list.add(火毒.末日烈焰);
                list.add(火毒.致命毒霧);
                list.add(火毒.自然力重置);
                list.add(火毒.火焰之襲);
                list.add(火毒.火流星);
                list.add(火毒.炙焰毒火);
                list.add(火毒.魔力無限);
                list.add(火毒.召喚火魔);
                list.add(火毒.楓葉祝福);
                list.add(火毒.楓葉淨化);
                break;
            }
            case 222: {
                list.add(冰雷.冰錐劍);
                list.add(冰雷.電閃雷鳴);
                list.add(冰雷.精神強化);
                list.add(冰雷.極速詠唱);
                list.add(冰雷.冰風暴);
                list.add(冰雷.閃電球);
                list.add(冰雷.閃電連擊);
                list.add(冰雷.暴風雪);
                list.add(冰雷.冰鋒刃);
                list.add(冰雷.魔力無限);
                list.add(冰雷.召喚冰魔);
                list.add(冰雷.楓葉祝福);
                list.add(冰雷.楓葉淨化);
                break;
            }
            case 232: {
                list.add(主教.群體治癒);
                list.add(主教.天使祝福);
                list.add(主教.神聖之箭);
                list.add(主教.聖光);
                list.add(主教.神聖之泉);
                list.add(主教.淨化);
                list.add(主教.神聖祈禱);
                list.add(主教.天使之箭);
                list.add(主教.核爆術);
                list.add(主教.復甦之光);
                list.add(主教.魔力無限);
                list.add(主教.召喚聖龍);
                list.add(主教.進階祝福);
                list.add(主教.楓葉祝福);
                list.add(主教.楓葉淨化);
                break;
            }
        }
        return list;
    }

    public static boolean isMoveImpactStatus(MonsterStatus monsterStatus) {
        switch (monsterStatus) {
            case Speed:
            case Stun:
            case Freeze:
            case Seal:
            case Web:
            case RiseByToss: {
                return true;
            }
            default: {
                return false;
            }
        }
    }

    /*
     * MonsterStatus是否為鎖怪狀態
     */
    public static boolean isSmiteStatus(MonsterStatus monsterStatus) {
        switch (monsterStatus) {
            case Smite:
            case Freeze:
            case Web:
            case RiseByToss: {
                return true;
            }
            default: {
                return false;
            }
        }
    }

    public static int getDiceValue(int i, int value, MapleStatEffect effect) {
        int result = 0;
        while (value > 0) {
            int dice = value % 10;
            value /= 10;
            switch (i) {
                case 7: {
                    result += dice == 2 ? effect.getPddR() : 0;
                    break;
                }
                case 0: {
                    result += dice == 3 ? effect.getS() : 0;
                    break;
                }
                case 1: {
                    result += dice == 4 ? effect.getCritical() : 0;
                    break;
                }
                case 11: {
                    result += dice == 5 ? effect.getDamR() : 0;
                    break;
                }
                case 16: {
                    result += dice == 6 ? effect.getExpR() : 0;
                    break;
                }
                case 17: {
                    result += dice == 7 ? effect.getIgnoreMobpdpR() : 0;
                    break;
                }
            }
        }
        return result;
    }

    public static boolean isRapidAttackSkill(int skillID) {
        final Skill skill = SkillFactory.getSkill(skillID);
        return skill != null && skill.isRapidAttack();
    }

    public static int getSkillRoot(int id) {
        int root = id / 10000;
        if (root == 8000) {
            root = id / 100;
        }
        return root;
    }

    public static int dY(int n) {
        if (dZ(n) || n % 100 == 0 || n == 501 || n == 3101 || n == 508) {
            return 1;
        }
        if (JobConstants.is龍魔導士(n)) {
            switch (n) {
                case 2200:
                case 2210: {
                    return 1;
                }
                case 2211:
                case 2212:
                case 2213: {
                    return 2;
                }
                case 2214:
                case 2215:
                case 2216: {
                    return 3;
                }
                case 2217:
                case 2218: {
                    return 4;
                }
                default: {
                    return 0;
                }
            }
        } else {
            if (JobConstants.is影武者(n)) {
                n = n % 10 / 2;
            } else {
                n %= 10;
            }
            if (n <= 2) {
                return n + 2;
            }
            return 0;
        }
    }

    public static boolean dZ(final int n) {
        boolean b;
        if (n > 6002) {
            if (n == 8001 || n == 13000) {
                return true;
            }
            b = (n == 14000 || n == 15000 || n == 15001);
        } else {
            if (n >= 6000) {
                return true;
            }
            if (n <= 4002) {
                return n >= 4001 || n <= 3002 && (n >= 3001 || n >= 2001 && n <= 2005) || n - 40000 > 5 && n % 1000 == 0;
            }
            b = (n == 5000);
        }
        return b || (n - 40000 > 5 && (n % 1000 == 0 || n / 100 == 8000));
    }

    public static boolean isPassiveAttackSkill(int skillId) {
        switch (skillId) {
            case 火毒.火靈結界:
            case 冰雷.冰鋒刃:
            case 箭神.箭座:
            case 暗影神偷.暗影霧殺:
            case 影武者.隱藏刀:
            case 拳霸.衝擊波:
            case 拳霸.海龍之魂:
            case 槍神.船員指令:
            case 重砲指揮官.火藥桶破壞:
            case 烈焰巫師.極致熾烈_1:
            case 烈焰巫師.極致熾烈:
            case 破風使者.風暴使者:
            case 暗夜行者.星塵:
            case 暗夜行者.星塵_爆炸:
            case 夜光.晨星殞落_爆炸:
            case 夜光.晨星殞落:
            case 惡魔殺手.惡魔追擊:
            case 惡魔殺手.變形:
            case 惡魔復仇者.盾牌追擊_攻擊:
            case 煉獄巫師.黑暗閃電:
            case 爆拳槍神.旋轉加農砲精通:
            case 凱撒.龍劍風:
            case 天使破壞者.靈魂探求者_攻擊:
            case 80002890:
            case 神之子.狂風千刃:
            case 阿戴爾.追蹤:
            case 伊利恩.技藝_暗器:
            case 伊利恩.即刻反應_文明爭戰Ⅱ:
            case 伊利恩.技藝_暗器Ⅱ:
            case 伊利恩.技藝_暗器Ⅱ_1:
            case 伊利恩.榮耀之翼_強化暗器_2:
            case 通用V核心.騎士團通用.西格諾斯槍兵陣:
            case 黑騎士.斷罪之槍:
            case 聖騎士.祝福之鎚:
            case 聖騎士.祝福之鎚_強化:
            case 聖魂劍士.極樂之境:
            case 惡魔復仇者.次元之刃_1:
            case 阿戴爾.無限:
            case 烈焰巫師.炙熱元素火焰:
            case 陰陽師.雪女招喚:
            case 陰陽師.雪女招喚_1:
            case 火毒.劇毒新星:
            case 火毒.劇毒新星_1:
            case 通用V核心.弓箭手通用.追蹤箭頭:
            case 破風使者.狂風呼嘯:
            case 破風使者.狂風呼嘯_1:
            case 箭神.殘影之矢:
            case 箭神.殘影之矢_1:
            case 破風使者.風轉奇想:
            case 暗影神偷.滅殺刃影:
            case 暗影神偷.滅殺刃影_1:
            case 暗影神偷.滅殺刃影_2:
            case 暗影神偷.滅殺刃影_3:
            case 幻影俠盜.命運鬼牌:
            case 幻影俠盜.鬼牌_1:
            case 夜使者.風魔手裏劍:
            case 影武者.炎獄修羅斬:
            case 夜使者.達克魯的秘傳:
            case 暗影神偷.音速狂襲:
            case 閃雷悍將.神雷合一:
            case 重砲指揮官.超級巨型加農砲彈:
            case 拳霸.海龍螺旋:
            case 機甲戰神.微型導彈箱:
            case 機甲戰神.合金盔甲_火力全開:
                return true;

            default:
                return false;

        }
    }

    public static Map<Integer, Integer> hn() {
        final HashMap<Integer, Integer> hashMap = new HashMap<Integer, Integer>();
        switch (Randomizer.nextInt(8)) {
            case 0: {
                hashMap.put(隱月.巨浪打擊, 0);
                hashMap.put(隱月.巨浪打擊_2, 720);
                break;
            }
            case 1: {
                hashMap.put(隱月.剛刃絞殺_下, 0);
                break;
            }
            case 2: {
                hashMap.put(隱月.銷魂屏障, 0);
                break;
            }
            case 3: {
                hashMap.put(隱月.剛刃絞殺_迴, 0);
                break;
            }
            case 4: {
                hashMap.put(隱月.爆流拳, 0);
                hashMap.put(隱月.爆流拳_1, 360);
                hashMap.put(隱月.爆流拳_2, 720);
                hashMap.put(隱月.爆流拳_3, 1080);
                break;
            }
            case 5: {
                hashMap.put(隱月.鬼斬, 0);
                break;
            }
            case 6: {
                hashMap.put(隱月.死魂烙印, 0);
                break;
            }
            case 7: {
                hashMap.put(隱月.精靈的化身_1, 0);
                break;
            }
        }
        return hashMap;
    }

    public static boolean eD(final int n) {
        switch (n) {
            case 龍魔導士.迅捷_回來吧:
            case 龍魔導士.風之捷:
            case 龍魔導士.風之捷_1:
            case 龍魔導士.風之捷_攻擊:
            case 龍魔導士.潛水_回來吧:
            case 龍魔導士.閃雷之捷:
            case 龍魔導士.閃雷之躍:
            case 龍魔導士.閃雷之捷_攻擊:
            case 龍魔導士.閃雷之躍_攻擊:
            case 龍魔導士.氣息_回來吧:
            case 龍魔導士.大地氣息:
            case 龍魔導士.風之氣息:
            case 龍魔導士.塵土之躍:
            case 龍魔導士.迅捷_回來吧_1:
            case 龍魔導士.大地氣息_攻擊: {
                return true;
            }
            default: {
                return false;
            }
        }
    }

    public static boolean eF(final int n) {
        switch (n) {
            case 狂豹獵人.召喚美洲豹_銀灰:
            case 狂豹獵人.召喚美洲豹_暗黃:
            case 狂豹獵人.召喚美洲豹_血紅:
            case 狂豹獵人.召喚美洲豹_紫光:
            case 狂豹獵人.召喚美洲豹_深藍:
            case 狂豹獵人.召喚美洲豹_傑拉:
            case 狂豹獵人.召喚美洲豹_白雪:
            case 狂豹獵人.召喚美洲豹_歐尼斯:
            case 狂豹獵人.召喚美洲豹_地獄裝甲:
            case 狂豹獵人.爪攻擊:
            case 狂豹獵人.歧路:
            case 狂豹獵人.音暴:
            case 狂豹獵人.美洲豹靈魂:
            case 狂豹獵人.閃光雨:
            case 狂豹獵人.狂豹之怒: {
                return true;
            }
            default: {
                return false;
            }
        }
    }

    public static boolean eH(int ee) {
        switch (ee = getLinkedAttackSkill(ee)) {
            case 狂豹獵人.雙重射擊:
            case 狂豹獵人.三重射擊:
            case 狂豹獵人.瘋狂射擊:
            case 狂豹獵人.狂野機關砲: {
                return true;
            }
            default: {
                return false;
            }
        }
    }

    public static int eM(final int n) {
        switch (n) {
            case 80000086: {
                return 2023189;
            }
            case 86:
            case 91: {
                return 2022746;
            }
            case 88: {
                return 2022747;
            }
            case 80000052: {
                return 2023148;
            }
            case 80000053: {
                return 2023149;
            }
            case 80000054: {
                return 2023150;
            }
            case 80000155: {
                return 2022823;
            }
            default: {
                return -1;
            }
        }
    }

    public static boolean ej(int skillId) {
        int n = skillId / 10000;
        if (skillId / 10000 == 8000) {
            n = skillId / 100;
        }
        return n >= 800000 && n <= 800099 || n == 8001;
    }

    public static boolean i0(final int n) {
        if (n <= 龍魔導士.龍之躍_攻擊) {
            if (n == 龍魔導士.龍之躍_攻擊) {
                return true;
            }
            if (n <= 龍魔導士.龍之捷) {
                return n >= 龍魔導士.風之環 || (n >= 龍魔導士.龍之捷_1 && n <= 龍魔導士.龍之捷_2);
            }
            return n == 龍魔導士.回來吧;
        } else {
            if (n > 龍魔導士.龍之氣息) {
                return n == 龍魔導士.龍之捷_3 || n == 龍魔導士.聖龍突襲;
            }
            return n >= 龍魔導士.地之環 || (n >= 龍魔導士.閃雷之環 && n <= 龍魔導士.龍之躍);
        }
    }

    public static int getSkillByJob(int skillId, int job) {
        return skillId + JobConstants.getBeginner((short) job) * 10000;
    }

    public static boolean isMasterLevelSkill(int skillId) {
        if (JobConstants.is幻獸師(skillId / 10000)) {
            return false;
        }
        int skillRoot; // edi
        int jobLevel; // ebx
        if (is4thNotNeedMasterLevel(skillId) > 0
                || (skillId / 1000000 == 92 && (skillId % 10000 == 0))
                || isMakingSkillRecipe(skillId)
                || isCommonSkill(skillId)
                || isNoviceSkill(skillId)
                || isFieldAttackSKill(skillId)) {
            return false;
        }
        skillRoot = getSkillRootFromSkill(skillId);
        jobLevel = getJobLevel(skillRoot);
        return (skillRoot > 40005 || skillRoot < 40000)
                && skillId != 42120024
                && !JobConstants.is幻獸師(skillRoot)
                && (isAddedSpDualAndZeroSkill(skillId) || jobLevel == 4 && !JobConstants.is神之子(skillRoot));
    }

    private static int is4thNotNeedMasterLevel(int skillID) {
        boolean v1; // zf
        if (skillID > 重砲指揮官.楓葉淨化) {
            if (skillID > 狂豹獵人.狂暴天性) {
                if (skillID <= 伊利恩.技藝_子彈Ⅱ) {
                    if (skillID == 伊利恩.技藝_子彈Ⅱ || skillID == 機甲戰神.雙倍幸運骰子 || skillID == 米哈逸.戰鬥大師) {
                        return 1;
                    }
                    v1 = skillID == 80001913;
                    if (v1) {
                        return 1;
                    }
                    return 0;
                }
                if (skillID > 伊利恩.水晶技能_德烏斯_1) {
                    v1 = skillID == 伊利恩.雷普勇士的意志;
                    if (v1) {
                        return 1;
                    }
                    return 0;
                }
                if (skillID != 伊利恩.水晶技能_德烏斯_1 && (skillID < 伊利恩.完成祝福標誌 || skillID > 伊利恩.完成詛咒之印)) {
                    return 0;
                }
            } else if (skillID != 狂豹獵人.狂暴天性) {
                if (skillID > 龍魔導士.楓葉淨化) {
                    if (skillID == 精靈遊俠.進階光速雙擊 || skillID == 精靈遊俠.勇士的意志) {
                        return 1;
                    }
                    v1 = skillID - 精靈遊俠.勇士的意志 == 3;
                    if (v1) {
                        return 1;
                    }
                    return 0;
                }
                if (skillID != 龍魔導士.楓葉淨化) {
                    if (skillID > 狂狼勇士.終極研究II) {
                        v1 = skillID == 狂狼勇士.楓葉淨化;
                    } else {
                        if (skillID >= 狂狼勇士.動力精通II || skillID == 狂狼勇士.快速移動) {
                            return 1;
                        }
                        v1 = skillID - 狂狼勇士.快速移動 == 3;
                    }
                    if (v1) {
                        return 1;
                    }
                    return 0;
                }
            }
            return 1;
        }
        if (skillID == 重砲指揮官.楓葉淨化) {
            return 1;
        }
        if (skillID > 影武者.疾速) {
            if (skillID > 槍神.雙倍幸運骰子) {
                if (skillID == 槍神.海盜砲擊艇 || skillID == 重砲指揮官.雙倍幸運骰子) {
                    return 1;
                }
                v1 = skillID == 重砲指揮官.雙胞胎猴子;
                if (v1) {
                    return 1;
                }
                return 0;
            }
            if (skillID != 槍神.雙倍幸運骰子) {
                if (skillID > 拳霸.雙倍幸運骰子) {
                    v1 = skillID == 槍神.進攻姿態;
                    if (v1) {
                        return 1;
                    }
                    return 0;
                }
                if (skillID < 拳霸.防禦姿態) {
                    v1 = skillID == 影武者.致命的飛毒殺;
                    if (v1) {
                        return 1;
                    }
                    return 0;
                }
            }
            return 1;
        }
        if (skillID == 影武者.疾速) {
            return 1;
        }
        if (skillID > 2321010) {
            if (skillID == 神射手.射擊術 || skillID == 夜使者.鏢術精通) {
                return 1;
            }
            v1 = skillID == 暗影神偷.貪婪;
            if (v1) {
                return 1;
            }
            return 0;
        }
        if (skillID == 2321010) {
            return 1;
        }
        if (skillID > 2121009) {
            v1 = skillID == 2221009;
        } else {
            if (skillID == 2121009 || skillID == 英雄.戰鬥精通) {
                return 1;
            }
            v1 = skillID == 黑騎士.闇靈復仇;
        }
        if (v1) {
            return 1;
        }
        return 0;
    }

    private static boolean isMakingSkillRecipe(int recipeID) {
        int v1; // esi
        boolean result; // eax
        result = false;
        if (recipeID / 1000000 == 92 || recipeID % 10000 > 0) {
            v1 = 10000 * (recipeID / 10000);
            if (v1 / 1000000 == 92 && ((v1 % 10000) == 0)) {
                result = true;
            }
        }
        return result;
    }

    private static boolean isCommonSkill(int nSkillID) {
        int branch; // eax
        branch = nSkillID / 10000;
        if (nSkillID / 10000 == 8000) {
            branch = nSkillID / 100;
        }
        return branch >= 800000 && branch <= 800099;
    }

    private static boolean isNoviceSkill(int skillID) {
        int branch; // ecx
        boolean result; // eax
        branch = skillID / 10000;
        if (skillID / 10000 == 8000) {
            branch = skillID / 100;
        }
        return JobConstants.is零轉職業(branch);
    }

    private static boolean isFieldAttackSKill(int skillID) {
        int v1;
        if (skillID == 0 || (skillID & 0x80000000) != 0) {
            return false;
        }
        v1 = skillID / 10000;
        if (skillID / 10000 == 8000) {
            v1 = skillID / 100;
        }
        return v1 == 9500;
    }

    private static boolean isAddedSpDualAndZeroSkill(int skillId) {
        if (skillId == 神之子.進階碎地猛擊 || skillId == 神之子.進階暴風裂擊) {
            return true;
        }
        if (skillId == 神之子.進階旋風落葉斬 || skillId == 神之子.進階迴旋之刃 || skillId == 神之子.進階旋風) {
            return true;
        }
        if (skillId == 神之子.進階旋風急轉彎) {
            return true;
        }
        if (skillId == 神之子.進階武器投擲) {
            return true;
        }
        if (skillId == 影武者.荊棘特效 || skillId == 影武者.短刀護佑) {
            return true;
        }
        if (skillId == 影武者.替身術 || skillId == 影武者.狂刃風暴 || skillId == 影武者.翔空落葉斬) {
            return true;
        }
        return skillId == 影武者.暗影迴避;
    }

    private static int getJobLevel(int job) {
        int result; // eax
        int dual_job_level; // esi

        if (JobConstants.is零轉職業(job) || (job % 100) == 0 || job == 501 || job == 3101 || job == 301 || job == 508) {
            return 1;
        }
        if (JobConstants.is龍魔導士(job)) {
            return JobConstants.get龍魔轉數(job);
        }
        if (JobConstants.is影武者(job)) {
            result = 0;
            dual_job_level = (job - 430) / 2;
            if (dual_job_level <= 2) {
                result = dual_job_level + 2;
            }
        } else {
            result = 0;
            if ((job % 10) <= 2) {
                result = job % 10 + 2;
            }
        }
        return result;
    }

    private static int getSkillRootFromSkill(int nSkillID) {
        int result; // eax
        result = nSkillID / 10000;
        if (nSkillID / 10000 == 8000) {
            result = (nSkillID / 100);
        }
        return result;
    }

    public static boolean hD(int n) {
        boolean b = false;
        if ((n / 1000000 != 92 || n % 10000 != 0) && (n = 10000 * (n / 10000)) / 1000000 == 92 && n % 10000 == 0) {
            b = true;
        }
        return b;
    }

    public static int hA(final int n) {
        int n2 = n / 10000;
        if (n / 10000 == 8000) {
            n2 = n / 100;
        }
        return n2;
    }

    public static boolean isKeyDownSkill(int skillID) {
        switch (skillID) {
            case 0:
            case 神之子.進階旋風_吸收:
            case 槍神.死亡板機:
            case 槍神.槍彈盛宴:
            case 影武者.修羅:
                return false;
        }
        Skill skill = SkillFactory.getSkill(skillID);
        return skill != null && skill.isChargeSkill();
    }

    public static boolean isEvanForceSkill(int skillID) { // is_evan_force_skill
        switch (skillID) {
            case 龍魔導士.回來吧:
            case 龍魔導士.風之環:
            case 龍魔導士.龍之捷:
            case 龍魔導士.龍之捷_1:
            case 龍魔導士.龍之捷_2:
            case 龍魔導士.龍之捷_3:
            case 龍魔導士.閃雷之環:
            case 龍魔導士.龍之躍:
            case 龍魔導士.龍之躍_攻擊:
            case 龍魔導士.地之環:
            case 龍魔導士.龍之氣息:
            case 龍魔導士.元素滅殺破:
            case 龍魔導士.聖龍突襲:
                return true;
        }
        return false;
    }

    public static boolean isSuperNovaSkill(int skillID) {
        return skillID == 暗影神偷.暗影霧殺 || skillID == 天使破壞者.超級超新星;
    }

    public static boolean isRushBombSkill(int skillID) {
        switch (skillID) {
            case 龍魔導士.閃雷之躍:
            case 凱撒.展翅飛翔:
            case 80011564:
            case 開拓者.渡鴉風暴:
            case 重砲指揮官.火藥桶破壞_爆炸:
            case 暗夜行者.星塵_爆炸:
            case 夜光.晨星殞落_爆炸:
            case 卡蒂娜.召喚_炸裂迴旋_1:
            case 陰陽師.引渡亡靈:
            case 凱撒.龍劍風:
            case 陰陽師.亡靈召喚:
            case 龍魔導士.閃雷之躍_攻擊:
            case 惡魔復仇者.蝙蝠群:
            case 重砲指揮官.火藥桶破壞:
            case 烈焰巫師.極致熾烈:
            case 暗夜行者.星塵:
            case 80011380:
            case 80011386:
            case 80002300:
            case 凱撒.展翅飛翔_變身:
            case 卡蒂娜.召喚_炸裂迴旋:
            case 80002247:
            case 通用V核心.騎士團通用.西格諾斯槍兵陣:
            case 破風使者.狂風呼嘯:
            case 破風使者.狂風呼嘯_1:
            case 神之子.進階暴風裂擊_漩渦:
            case 神之子.狂風千刃_漩渦:
            case 神之子.暴風裂擊_漩渦:
            case 菈菈.蜿蜒的山脊_1:
                return true;

        }
        return false;
    }

    public static boolean isZeroSkill(int skillID) {
        int prefix = skillID / 10000;
        if (prefix == 8000) {
            prefix = skillID / 100;
        }
        return prefix == 10000 || prefix == 10100 || prefix == 10110 || prefix == 10111 || prefix == 10112;
    }

    public static boolean isUsercloneSummonedAbleSkill(int skillID) {
        switch (skillID) {
            case 聖魂劍士.潛行突襲:
            case 聖魂劍士.殘像追擊:
            case 聖魂劍士.皇家衝擊:
            case 聖魂劍士.焚影:
            case 聖魂劍士.月影:
            case 聖魂劍士.月光十字架:
            case 聖魂劍士.光芒四射:
            case 聖魂劍士.日光十字架:
            case 聖魂劍士.月光之舞:
            case 聖魂劍士.月光之舞_空中:
            case 聖魂劍士.新月分裂:
            case 聖魂劍士.疾速黃昏:
            case 聖魂劍士.疾速黃昏_空中:
            case 聖魂劍士.太陽穿刺:
            case 暗夜行者.雙飛斬:
            case 暗夜行者.三連投擲:
            case 暗夜行者.三倍緩慢:
            case 暗夜行者.四連投擲:
            case 暗夜行者.五倍緩慢:
            case 暗夜行者.星塵:
            case 暗夜行者.星塵_爆炸:
            case 暗夜行者.五連投擲:
            case 暗夜行者.四倍緩慢:
            case 暗夜行者.五連投擲_爆擊機率:
            case 暗夜行者.暗影投擲:
            case 暗夜行者.暗影投擲_1:
            case 精靈遊俠.急速雙擊:
            case 精靈遊俠.最終一擊:
            case 精靈遊俠.精準光速神弩:
            case 精靈遊俠.昇龍刺擊:
            case 精靈遊俠.旋風月光翻轉_2轉:
            case 精靈遊俠.騰空踢擊:
            case 精靈遊俠.光速雙擊:
            case 精靈遊俠.落葉旋風射擊:
            case 精靈遊俠.獨角獸射擊:
            case 精靈遊俠.旋風突進:
            case 精靈遊俠.伊修塔爾之環:
            case 精靈遊俠.傳說之槍:
            case 精靈遊俠.閃電之鋒:
            case 精靈遊俠.進階光速雙擊:
            case 精靈遊俠.憤怒天使:
            case 精靈遊俠.伊里加爾的氣息:
            case 精靈遊俠.旋風月光翻轉:
            case 皮卡啾.皮卡啾攻擊:
            case 皮卡啾.皮卡啾攻擊_1:
            case 皮卡啾.皮卡啾攻擊_2:
            case 皮卡啾.皮卡啾攻擊_3:
            case 皮卡啾.咕嚕咕嚕:
            case 皮卡啾.雨傘:
            case 皮卡啾.天空豆豆:
            case 皮卡啾.超烈焰溜溜球:
            case 皮卡啾.超烈焰溜溜球_1:
            case 皮卡啾.粉紅天怒:
            case 皮卡啾.音波攻擊:
            case 皮卡啾.皮卡啾攻擊_4:
            case 皮卡啾.皮卡啾攻擊_5:
            case 皮卡啾.皮卡啾攻擊_6:
            case 皮卡啾.咕嚕咕嚕_1:
            case 皮卡啾.天空豆豆空中:
            case 皮卡啾.電吉他:
            case 皮卡啾.天空豆豆地上:
            case 皮卡啾.哨子:
            case 皮卡啾.紅喇叭:
            case 皮卡啾.超烈焰溜溜球_2:
            case 131001201:
            case 131001202:
            case 131001203:
                return true;
        }
        return false;
    }

    public static boolean isScreenCenterAttackSkill(int skillID) {
        switch (skillID) {
            case 80001431:
            case 80011562:
            case 神之子.暗影之雨:
            case 狂狼勇士.瑪哈的領域:
            case 破風使者.季風:
            case 暗夜行者.道米尼奧:
            case 閃雷悍將.海神降臨:
            case 幻影俠盜.玫瑰四重曲:
                return true;
        }
        return false;
    }

    public static boolean isAranFallingStopSkill(int skillID) {
        switch (skillID) {
            case 狂狼勇士.終極之矛_3:
            case 狂狼勇士.終極之矛_4:
            case 狂狼勇士.空中震撼:
            case 狂狼勇士.粉碎震撼:
            case 狂狼勇士.粉碎震撼_1:
            case 狂狼勇士.粉碎震撼_2:
            case 狂狼勇士.空中震撼_1:
            case 狂狼勇士.空中震撼_2:
            case 80001925:
            case 80001926:
            case 80001927:
            case 80001936:
            case 80001937:
            case 80001938:
                return true;
            default:
                return false;
        }
    }

    public static int getHyperAPByLevel(int level) {
        return level >= 140 ? level / 10 - 11 : 0;
    }

    public static int getHyperStatAPNeedByLevel(int level) {
        switch (level) {
            case 11:
                return 50;
            case 12:
                return 65;
            case 13:
                return 80;
            case 14:
                return 95;
            case 15:
                return 110;
            default:
                return level < 5 ? (int) Math.pow(2.0, level - 1) : (level - 3) * 5;
        }
    }

    public static int getHyperAP(MapleCharacter chr) {
        int ap = 0;
        if (chr.getLevel() >= 140) {
            for (int i = 140; i <= chr.getLevel(); i++) {
                ap += getHyperAPByLevel(i);
            }
        }
        for (Map.Entry<Integer, SkillEntry> entry : chr.getSkills().entrySet()) {
            Skill skill;
            if (entry.getValue().skillevel > 0 && (skill = SkillFactory.getSkill(entry.getKey())) != null && skill.isHyperStat()) {
                for (int i = 1; i <= entry.getValue().skillevel; i++) {
                    ap -= getHyperStatAPNeedByLevel(i);
                }
            }
        }
        return ap;
    }

    public static boolean isKeydownSkillRectMoveXY(int skillID) {
        return skillID == 破風使者.寒冰亂舞 || skillID == 幻獸師.旋風飛行;
    }

    public static boolean isFieldAttackObjSkill(int skillId) {
        if (skillId <= 0) {
            return false;
        }
        int prefix = skillId / 10000;
        if (skillId / 10000 == 8000) {
            prefix = skillId / 100;
        }
        return prefix == 9500;
    }

    public static int getRandomInnerSkill(){
        return innerSkills[Randomizer.nextInt(innerSkills.length)];
    }

    public static boolean isKeydownSkillCancelGiveCD(int skillId) {
        switch (skillId) {
            case 陰陽師.破邪連擊符:
            case 陰陽師.妖繪釋放:
                return true;
            default:
                return false;
        }
    }

    public static int getKeydownSkillCancelReduceTime(MapleBuffStatValueHolder mbsvh) {
        if (mbsvh == null || mbsvh.effect == null) {
            return 0;
        }
        return getKeydownSkillCancelReduceTime(mbsvh.effect.getSourceId(), mbsvh.getLeftTime());
    }

    public static int getKeydownSkillCancelReduceTime(int skillID, int leftTime) {
        switch (skillID) {
            case 阿戴爾.護堤:
            case 菈菈.山環抱:
                return 3500 * (leftTime / 1000);
            case 虎影.仙技_夢遊桃源:
                return 9700 * (leftTime / 1000);
            default:
                return 0;
        }
    }
}
