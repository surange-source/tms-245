package server.buffs;

import client.MapleBuffStat;
import client.MapleCharacter;
import client.MapleTraitType;
import client.inventory.MapleInventoryType;
import client.skills.Skill;
import client.skills.SkillInfo;
import client.skills.SkillMesInfo;
import client.skills.handler.AbstractSkillHandler;
import client.status.MonsterStatus;
import constants.GameConstants;
import constants.ItemConstants;
import constants.JobConstants;
import constants.SkillConstants;
import constants.skills.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import provider.MapleData;
import provider.MapleDataTool;
import provider.MapleDataType;
import server.MapleOverrideData;
import server.MapleStatInfo;
import tools.CaltechEval;
import tools.types.Pair;
import tools.types.Triple;

import java.awt.*;
import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

public class MapleStatEffectFactory {

    static final Logger log = LogManager.getLogger(MapleStatEffectFactory.class);

    /**
     * 加載技能的BUFF狀態
     */
    public static MapleStatEffect loadSkillEffectFromData(Skill skill, MapleData source, int skillid, boolean isHit, boolean overtime, boolean isSummon, int level, String variables, boolean notRemoved, boolean notIncBuffDuration) {
        return loadFromData(skill, source, skillid, isHit, overtime, isSummon, level, variables, notRemoved, notIncBuffDuration);
    }

    /**
     * 加載道具的BUFF狀態
     */
    public static MapleStatEffect loadItemEffectFromData(MapleData source, int itemid) {
        return loadFromData(null, source, -itemid, false, false, false, 1, null, false, false);
    }

    /**
     * 添加一些常用但BUFF的參數不為0的BUFF狀態信息
     */
    private static void addBuffStatPairToListIfNotZero(Map<MapleBuffStat, Integer> list, MapleBuffStat buffstat, Integer val) {
        if (val != 0) {
            list.put(buffstat, val);
        }
    }

    public static int parseEval(String data, int level) {
        String variables = "x";
        String dddd = data.toLowerCase().replace(variables, String.valueOf(level));
        if (dddd.substring(0, 1).equals("-")) { //-30+3*x
            if (dddd.substring(1, 2).equals("u") || dddd.substring(1, 2).equals("d")) { //-u(x/2)
                dddd = "n(" + dddd.substring(1) + ")"; //n(u(x/2))
            } else {
                dddd = "n" + dddd.substring(1); //n30+3*x
            }
        } else if (dddd.substring(0, 1).equals("=")) { //lol nexon and their mistakes
            dddd = dddd.substring(1);
        }
        return (int) (new CaltechEval(dddd).evaluate());
    }

    private static int parseEval(String path, MapleData source, int def, String variables, int level) {
        return parseEval(path, source, def, variables, level, "");
    }

    private static int parseEval(String path, MapleData source, int def, String variables, int level, String d) {
        return (int) parseEvalDouble(path, source, def, variables, level, d);
    }

    private static double parseEvalDouble(String path, MapleData source, int def, String variables, int level) {
        return parseEvalDouble(path, source, def, variables, level, "");
    }

    private static double parseEvalDouble(String path, MapleData source, int def, String variables, int level, String d) {
        if (variables == null) {
            return MapleDataTool.getIntConvert(path, source, def);
        } else {
            String dddd;
            if (d.isEmpty()) {
                MapleData dd = source.getChildByPath(path);
                if (dd == null) {
                    return def;
                }
                if (dd.getType() != MapleDataType.STRING) {
                    return MapleDataTool.getIntConvert(path, source, def);
                }
                dddd = MapleDataTool.getString(dd).toLowerCase().replace("\r\n", "");
            } else {
                dddd = d;
            }
            dddd = dddd.replace(variables, String.valueOf(level));
            if (dddd.isEmpty()) {
                return 0.0;
            } else if (dddd.substring(0, 1).equals("-")) { //-30+3*x
                if (dddd.substring(1, 2).equals("u") || dddd.substring(1, 2).equals("d")) { //-u(x/2)
                    dddd = "n(" + dddd.substring(1) + ")"; //n(u(x/2))
                } else {
                    dddd = "n" + dddd.substring(1); //n30+3*x
                }
            } else if (dddd.substring(0, 1).equals("=")) { //lol nexon and their mistakes
                dddd = dddd.substring(1);
            } else if (dddd.endsWith("y")) {
                dddd = dddd.substring(4).replace("y", String.valueOf(level));
            } else if (dddd.contains("%")) {
                dddd = dddd.replace("%", "/100");
            }
            return new CaltechEval(dddd).evaluate();
        }
    }

    private static MapleStatEffect loadFromData(Skill skillObj, MapleData source, int sourceid, boolean isHit, boolean overTime, boolean isSummon, int level, String variables, boolean notRemoved, boolean notIncBuffDuration) {
        MapleStatEffect ret = new MapleStatEffect();
        ret.setSourceid(sourceid);
        ret.setLevel((byte) level);
        ret.setHit(isHit);

        if (source == null) {
            return ret;
        }

        EnumMap<MapleStatInfo, Integer> info = new EnumMap<>(MapleStatInfo.class);
        EnumMap<MapleStatInfo, Double> infoDouble = new EnumMap<>(MapleStatInfo.class);
        double val;
        for (MapleStatInfo i : MapleStatInfo.values()) {
            try {
                if (i.isSpecial()) {
                    val = parseEvalDouble(i.name().substring(0, i.name().length() - 1), source, i.getDefault(), variables, level, MapleOverrideData.getOverrideValue(sourceid, i.name()));
                } else {
                    val = parseEvalDouble(i.name(), source, i.getDefault(), variables, level, MapleOverrideData.getOverrideValue(sourceid, i.name()));
                }
                if (val % 1.0 != 0.0) {
                    infoDouble.put(i, val);
                }
                info.put(i, (int) val);
            } catch (Exception e) {
                log.error("加載技能數據出錯，id:" + sourceid + ", msi: " + i, e);
            }
        }
        ret.setInfo(info);
        ret.setInfoD(infoDouble);
        ret.setHpR(parseEval("hpR", source, 0, variables, level, MapleOverrideData.getOverrideValue(sourceid, "hpR")) / 100.0);
        ret.setMpR(parseEval("mpR", source, 0, variables, level, MapleOverrideData.getOverrideValue(sourceid, "mpR")) / 100.0);
        ret.setIgnoreMob((short) parseEval("ignoreMobpdpR", source, 0, variables, level, MapleOverrideData.getOverrideValue(sourceid, "ignoreMobpdpR")));
        ret.setThaw((short) parseEval("thaw", source, 0, variables, level));
        ret.setInterval(parseEval("interval", source, 0, variables, level));
        ret.setExpinc(parseEval("expinc", source, 0, variables, level));
        ret.setExp(parseEval("exp", source, 0, variables, level, MapleOverrideData.getOverrideValue(sourceid, "exp")));
        ret.setMorphId(parseEval("morph", source, 0, variables, level, MapleOverrideData.getOverrideValue(sourceid, "morph")));
        ret.setCosmetic(parseEval("cosmetic", source, 0, variables, level));
        ret.setSlotCount((byte) parseEval("slotCount", source, 0, variables, level)); //礦(藥)背包道具需要
        ret.setSlotPerLine((byte) parseEval("slotPerLine", source, 0, variables, level)); //礦(藥)背包道具需要
        ret.setPreventslip((byte) parseEval("preventslip", source, 0, variables, level));
        ret.setUseLevel((short) parseEval("useLevel", source, 0, variables, level));
        ret.setImmortal((byte) parseEval("immortal", source, 0, variables, level));
        ret.setType((byte) parseEval("type", source, 0, variables, level));
        ret.setBs((byte) parseEval("bs", source, 0, variables, level));
        ret.setIndiePdd((short) parseEval("indiePdd", source, 0, variables, level, MapleOverrideData.getOverrideValue(sourceid, "indiePdd")));
        ret.setIndieMdd((short) parseEval("indieMdd", source, 0, variables, level, MapleOverrideData.getOverrideValue(sourceid, "indieMdd")));
        ret.setExpBuff(parseEval("expBuff", source, 0, variables, level, MapleOverrideData.getOverrideValue(sourceid, "expBuff")));
        ret.setCashup(parseEval("cashBuff", source, 0, variables, level, MapleOverrideData.getOverrideValue(sourceid, "cashBuff")));
        ret.setItemup(parseEval("itemupbyitem", source, 0, variables, level));
        ret.setMesoup(parseEval("mesoupbyitem", source, 0, variables, level));
        ret.setBerserk(parseEval("berserk", source, 0, variables, level, MapleOverrideData.getOverrideValue(sourceid, "berserk")));
        ret.setBerserk2(parseEval("berserk2", source, 0, variables, level, MapleOverrideData.getOverrideValue(sourceid, "berserk2")));
        ret.setBooster(parseEval("booster", source, 0, variables, level, MapleOverrideData.getOverrideValue(sourceid, "booster")));
        ret.setLifeId((short) parseEval("lifeId", source, 0, variables, level));
        ret.setInflation((short) parseEval("inflation", source, 0, variables, level));
        ret.setImhp((short) parseEval("imhp", source, 0, variables, level, MapleOverrideData.getOverrideValue(sourceid, "imhp")));
        ret.setImmp((short) parseEval("immp", source, 0, variables, level, MapleOverrideData.getOverrideValue(sourceid, "immp")));
        ret.setIllusion(parseEval("illusion", source, 0, variables, level));
        ret.setConsumeOnPickup(parseEval("consumeOnPickup", source, 0, variables, level));
        if (ret.getConsumeOnPickup() == 1) {
            if (parseEval("party", source, 0, variables, level) > 0) {
                ret.setConsumeOnPickup(2);
            }
        }
        ret.setRecipe(parseEval("recipe", source, 0, variables, level));
        ret.setRecipeUseCount((byte) parseEval("recipeUseCount", source, 0, variables, level));
        ret.setRecipeValidDay((byte) parseEval("recipeValidDay", source, 0, variables, level));
        ret.setReqSkillLevel((byte) parseEval("reqSkillLevel", source, 0, variables, level));
        ret.setEffectedOnAlly((byte) parseEval("effectedOnAlly", source, 0, variables, level));
        ret.setEffectedOnEnemy((byte) parseEval("effectedOnEnemy", source, 0, variables, level));
//        ret.incPVPdamage = (short) parseEval("incPVPDamage", source, 0, variables, level);
        ret.setMoneyCon(parseEval("moneyCon", source, 0, variables, level));
        int x = ret.getX();
        ret.setMoveTo(parseEval("moveTo", source, x > 100000000 && x <= 999999999 ? x : -1, variables, level));
//        ret.repeatEffect = ret.is戰法靈氣(); //自動重複使用的BUFF

        int charColor = 0;
        String cColor = MapleDataTool.getString("charColor", source, null);
        if (cColor != null) {
            charColor |= Integer.parseInt("0x" + cColor.substring(0, 2));
            charColor |= Integer.parseInt("0x" + cColor.substring(2, 4) + "00");
            charColor |= Integer.parseInt("0x" + cColor.substring(4, 6) + "0000");
            charColor |= Integer.parseInt("0x" + cColor.substring(6, 8) + "000000");
        }
        ret.setCharColor(charColor);
        EnumMap<MapleTraitType, Integer> traits = new EnumMap<>(MapleTraitType.class);
        for (MapleTraitType t : MapleTraitType.values()) {
            int expz = parseEval(t.name() + "EXP", source, 0, variables, level);
            if (expz != 0) {
                traits.put(t, expz);
            }
        }
        ret.setTraits(traits);
        List<MapleBuffStat> cure = new ArrayList<>(5);
        if (parseEval("poison", source, 0, variables, level) > 0) {
            cure.add(MapleBuffStat.Poison);
        }
        if (parseEval("seal", source, 0, variables, level) > 0) {
            cure.add(MapleBuffStat.Seal);
        }
        if (parseEval("darkness", source, 0, variables, level) > 0) {
            cure.add(MapleBuffStat.Darkness);
        }
        if (parseEval("weakness", source, 0, variables, level) > 0) {
            cure.add(MapleBuffStat.Weakness);
        }
        if (parseEval("curse", source, 0, variables, level) > 0) {
            cure.add(MapleBuffStat.Curse);
        }
        if (parseEval("painmark", source, 0, variables, level) > 0) {
            cure.add(MapleBuffStat.PainMark);
        }
        ret.setCureDebuffs(cure);
        List<Integer> petsCanConsume = new ArrayList<>();
        for (int i = 0; true; i++) {
            int dd = parseEval(String.valueOf(i), source, 0, variables, level);
            if (dd > 0) {
                petsCanConsume.add(dd);
            } else {
                break;
            }
        }
        ret.setPetsCanConsume(petsCanConsume);
        MapleData mdd = source.getChildByPath("0");
        if (mdd != null && mdd.getChildren().size() > 0) {
            ret.setMobSkill((short) parseEval("mobSkill", mdd, 0, variables, level));
            ret.setMobSkillLevel((short) parseEval("level", mdd, 0, variables, level));
        } else {
            ret.setMobSkill((short) 0);
            ret.setMobSkillLevel((short) 0);
        }
        MapleData pd = source.getChildByPath("randomPickup");
        if (pd != null) {
            ArrayList<Integer> randomPickup = new ArrayList<>();
            for (MapleData p : pd) {
                randomPickup.add(MapleDataTool.getInt(p));
            }
            ret.setRandomPickup(randomPickup);
        }
        MapleData ltd = source.getChildByPath("lt");
        if (ltd != null) {
            ret.setLt((Point) ltd.getData());
            ret.setRb((Point) source.getChildByPath("rb").getData());
        }
        MapleData lt2d = source.getChildByPath("lt2");
        if (lt2d != null) {
            ret.setLt2((Point) lt2d.getData());
            ret.setRb2((Point) source.getChildByPath("rb2").getData());
        }
        MapleData lt3d = source.getChildByPath("lt3");
        if (lt3d != null) {
            ret.setLt3((Point) lt3d.getData());
            ret.setRb3((Point) source.getChildByPath("rb3").getData());
        }
        MapleData ltc = source.getChildByPath("con");
        if (ltc != null) {
            List<Pair<Integer, Integer>> availableMap = new ArrayList<>();
            for (MapleData ltb : ltc) {
                availableMap.add(new Pair<>(MapleDataTool.getInt("sMap", ltb, 0), MapleDataTool.getInt("eMap", ltb, 999999999)));
            }
            ret.setAvailableMap(availableMap);
        }
        int totalprob = 0;
        MapleData lta = source.getChildByPath("reward");
        if (lta != null) {
            ret.setRewardMeso(parseEval("meso", lta, 0, variables, level));
            MapleData ltz = lta.getChildByPath("case");
            if (ltz != null) {
                ArrayList<Triple<Integer, Integer, Integer>> rewardItem = new ArrayList<>();
                for (MapleData lty : ltz) {
                    rewardItem.add(new Triple<>(MapleDataTool.getInt("id", lty, 0), MapleDataTool.getInt("count", lty, 0), MapleDataTool.getInt("prop", lty, 0)));
                    totalprob += MapleDataTool.getInt("prob", lty, 0);
                }
                ret.setRewardItem(rewardItem);
            }
        } else {
            ret.setRewardMeso(0);
        }
        ret.setTotalprob(totalprob);
        // start of server calculated stuffs
        if (ret.isSkill()) {
            int priceUnit = ret.getInfo().get(MapleStatInfo.priceUnit); // Guild skills
            if (priceUnit > 0) {
                int price = ret.getInfo().get(MapleStatInfo.price);
                int extendPrice = ret.getInfo().get(MapleStatInfo.extendPrice);
                ret.getInfo().put(MapleStatInfo.price, price * priceUnit);
                ret.getInfo().put(MapleStatInfo.extendPrice, extendPrice * priceUnit);
            }
            switch (sourceid) {
                case 英雄.終極攻擊:
                case 聖騎士.終極之劍:
                case 黑騎士.終極之槍:
                case 箭神.終極之弓:
                case 神射手.終極之弩:
                case 火毒.瞬間移動精通:
                case 冰雷.瞬間移動精通:
                case 主教.瞬間移動精通:
                case 煉獄巫師.黑暗閃電:
                case 狂豹獵人.終極攻擊:
                case 狂豹獵人.進階終極攻擊: //V.100新增
                case 龍魔導士.龍之火花:
                case 龍魔導士.歐尼斯的意志:
                case 英雄.進階終極攻擊:
                case 箭神.進階終極攻擊:
                case 精靈遊俠.終極攻擊_雙弩槍:
                case 精靈遊俠.進階終極攻擊:
                case 狂狼勇士.終極攻擊: //V.100新增
                case 狂狼勇士.進階終極攻擊: //V.100新增
                case 狂豹獵人.召喚美洲豹_銀灰:
                case 狂豹獵人.召喚美洲豹_暗黃:
                case 狂豹獵人.召喚美洲豹_血紅:
                case 狂豹獵人.召喚美洲豹_紫光:
                case 狂豹獵人.召喚美洲豹_深藍:
                case 狂豹獵人.召喚美洲豹_傑拉:
                case 狂豹獵人.召喚美洲豹_白雪:
                case 狂豹獵人.召喚美洲豹_歐尼斯:
                case 狂豹獵人.召喚美洲豹_地獄裝甲:
                    ret.getInfo().put(MapleStatInfo.mobCount, 6);
                    break;
                case 惡魔復仇者.強化超越:
                    ret.getInfo().put(MapleStatInfo.attackCount, 2);
                    break;
                case 夜光.光明長槍:
                    ret.getInfo().put(MapleStatInfo.attackCount, 4);
                    break;
                case 傑諾.追縱火箭:
                    ret.getInfo().put(MapleStatInfo.attackCount, 4);
                    break;
                case 凱撒.意志之劍:
                case 凱撒.意志之劍_變身:
                    ret.getInfo().put(MapleStatInfo.attackCount, 3);
                    break;
                case 凱撒.進階意志之劍:
                case 凱撒.進階意志之劍_變身:
                    ret.getInfo().put(MapleStatInfo.attackCount, 5);
                    break;
                case 破風使者.風妖精之箭I:
                case 破風使者.風妖精之箭II:
                case 破風使者.風妖精之箭Ⅲ:
                case 破風使者.風暴使者:
                    ret.getInfo().put(MapleStatInfo.attackCount, 6);
                    break;
            }
        }
        if (!ret.isSkill() && ret.getInfo().get(MapleStatInfo.time) > -1) {
            ret.setOverTime(true);
        } else {
            if (ret.getInfo().get(MapleStatInfo.time) < 1000) {
                ret.getInfo().put(MapleStatInfo.time, (ret.getInfo().get(MapleStatInfo.time) * 1000l) >= Integer.MAX_VALUE ? Integer.MAX_VALUE : ret.getInfo().get(MapleStatInfo.time) * 1000); // items have their times stored in ms, of course
            }
            //ret.getInfo().put(MapleStatInfo.subTime, (ret.getInfo().get(MapleStatInfo.subTime)));
            ret.setOverTime(overTime || ret.isMorph() || ret.is戒指技能() || ret.getSummonMovementType() != null);
            ret.setNotRemoved(notRemoved);
            ret.setNotIncBuffDuration(notIncBuffDuration);
        }

        Map<MonsterStatus, Integer> monsterStatus = new EnumMap<>(MonsterStatus.class);
        EnumMap<MapleBuffStat, Integer> statups = new EnumMap<>(MapleBuffStat.class);

        AbstractSkillHandler handler = ret.getSkillHandler();
        int handleRes = -1;
        if (handler != null) {
            handleRes = handler.onSkillLoad(statups, monsterStatus, ret);
            if (handleRes == 0) {
                return ret;
            }
        }

        if (handleRes == -1 && ret.isOverTime() && ret.getSummonMovementType() == null) {
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.STR, ret.getInfo().get(MapleStatInfo.str));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.INT, ret.getInfo().get(MapleStatInfo.int_));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.DEX, ret.getInfo().get(MapleStatInfo.dex));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.LUK, ret.getInfo().get(MapleStatInfo.luk));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.PAD, ret.getInfo().get(MapleStatInfo.pad));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.PDD, ret.getInfo().get(MapleStatInfo.pdd));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.MAD, ret.getInfo().get(MapleStatInfo.mad));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.ACC, ret.getInfo().get(MapleStatInfo.acc));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.EVA, ret.getInfo().get(MapleStatInfo.eva));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.EVAR, ret.getInfo().get(MapleStatInfo.evaR));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.Craft, 0);
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.Speed, sourceid == 煉獄巫師.黃色光環 ? ret.getInfo().get(MapleStatInfo.x) : ret.getInfo().get(MapleStatInfo.speed));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.Jump, ret.getInfo().get(MapleStatInfo.jump));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.EMHP, ret.getInfo().get(MapleStatInfo.emhp));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.EMMP, ret.getInfo().get(MapleStatInfo.emmp));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.EPAD, ret.getInfo().get(MapleStatInfo.epad));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.EMAD, ret.getInfo().get(MapleStatInfo.emad));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.EPDD, ret.getInfo().get(MapleStatInfo.epdd));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.Booster, ret.getBooster());
            if (sourceid != 狂豹獵人.狂獸附體) { //龍神的這個技能是被動加的HP上限 所以這個地方就不在加了
                addBuffStatPairToListIfNotZero(statups, MapleBuffStat.MaxHP, ret.getInfo().get(MapleStatInfo.mhpR));
            }
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.MaxMP, ret.getInfo().get(MapleStatInfo.mmpR));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.Thaw, (int) ret.getThaw());
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.MesoUpByItem, ItemConstants.getModifier(Math.abs(ret.getSourceId()), ret.getMesoup())); // defaults to 2x
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.DefenseState, ret.getIllusion()); //複製克隆BUFF
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.DojangBerserk, ret.getBerserk2());
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.RepeatEffect, ret.getBerserk());
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.ExpBuffRate, ret.getExpBuff()); // 經驗
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.Inflation, ret.getInflation());
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.DropRate, ItemConstants.getModifier(Math.abs(ret.getSourceId()), ret.getItemup())); // defaults to 2x
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.DropRate, ret.getInfo().get(MapleStatInfo.dropRate));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.PlusExpRate, ret.getInfo().get(MapleStatInfo.plusExpRate));

            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.IndiePAD, ret.getInfo().get(MapleStatInfo.indiePad));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.IndieMAD, ret.getInfo().get(MapleStatInfo.indieMad));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.IndiePDD, ret.getInfo().get(MapleStatInfo.indiePdd));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.IndieMHP, (int) ret.getImhp());
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.IndieMMP, (int) ret.getImmp());
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.IndieMHP, ret.getInfo().get(MapleStatInfo.indieMhp));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.IndieMMP, ret.getInfo().get(MapleStatInfo.indieMmp));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.IndieACC, ret.getInfo().get(MapleStatInfo.indieAcc));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.IndieEVA, ret.getInfo().get(MapleStatInfo.indieEva));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.IndieJump, ret.getInfo().get(MapleStatInfo.indieJump));
            if (sourceid != 機甲戰神.合金盔甲_人型 && sourceid != 機甲戰神.合金盔甲終極) {
                addBuffStatPairToListIfNotZero(statups, MapleBuffStat.IndieSpeed, ret.getInfo().get(MapleStatInfo.indieSpeed));
            }
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.IndieAllStat, ret.getInfo().get(MapleStatInfo.indieAllStat));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.IndieEXP, ret.getInfo().get(MapleStatInfo.indieExp));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.IndieBooster, ret.getInfo().get(MapleStatInfo.indieBooster));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.IndieSTR, ret.getInfo().get(MapleStatInfo.indieSTR));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.IndieDEX, ret.getInfo().get(MapleStatInfo.indieDEX));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.IndieINT, ret.getInfo().get(MapleStatInfo.indieINT));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.IndieLUK, ret.getInfo().get(MapleStatInfo.indieLUK));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.IndieDamR, ret.getInfo().get(MapleStatInfo.indieDamR));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.IndieCr, ret.getInfo().get(MapleStatInfo.indieCr));
        }

        //自動添加持續傷害
        if (skillObj != null) {
            if (skillObj.isInfo(SkillInfo.dotType)) {//持續傷害
                addDebuffStatPairToListIfNotZero(monsterStatus, MonsterStatus.Burned, ret.getInfo().get(MapleStatInfo.dot), ret.getInfo().get(MapleStatInfo.dot));
            }
            if (skillObj.isInfo(SkillInfo.dot)) {//持續傷害
                addDebuffStatPairToListIfNotZero(monsterStatus, MonsterStatus.Burned, ret.getInfo().get(MapleStatInfo.dot), ret.getInfo().get(MapleStatInfo.dot));
            }
            if (skillObj.getMesInfo(SkillMesInfo.stun)) {//暈
                addDebuffStatPairToListIfNotZero(monsterStatus, MonsterStatus.Stun, 1, 1);
            }
            if (skillObj.getMesInfo(SkillMesInfo.darkness)) {//黑暗
                addDebuffStatPairToListIfNotZero(monsterStatus, MonsterStatus.Blind, 1, 1);
            }
            if (skillObj.getMesInfo(SkillMesInfo.seal)) {//封印
                addDebuffStatPairToListIfNotZero(monsterStatus, MonsterStatus.Seal, 1, 1);
            }
            if (skillObj.getMesInfo(SkillMesInfo.cold)) {//寒冷的
                addDebuffStatPairToListIfNotZero(monsterStatus, MonsterStatus.Speed, ret.getInfo().get(MapleStatInfo.s), ret.getInfo().get(MapleStatInfo.s));
            }
            if (skillObj.getMesInfo(SkillMesInfo.freeze)) {//結冰
                addDebuffStatPairToListIfNotZero(monsterStatus, MonsterStatus.Freeze, 1, 1);
            }
            if (skillObj.getMesInfo(SkillMesInfo.slow)) {//緩慢
                addDebuffStatPairToListIfNotZero(monsterStatus, MonsterStatus.Speed, ret.getInfo().get(MapleStatInfo.x), ret.getInfo().get(MapleStatInfo.x));
            }
        }

        //追加經驗值和道具
        addDebuffStatPairToListIfNotZero(monsterStatus, MonsterStatus.Showdown, ret.getInfo().get(MapleStatInfo.expR), ret.getInfo().get(MapleStatInfo.expR));

        if (handleRes != -1) {
        } else if (ret.isSkill()) {
            switch (sourceid) {
                case 80001079:
                    statups.put(MapleBuffStat.CarnivalAttack, ret.info.get(MapleStatInfo.damage));
                    break;
                case 80001080:
                    statups.put(MapleBuffStat.CarnivalDefence, ret.info.get(MapleStatInfo.x) + ret.info.get(MapleStatInfo.x) * 1000);
                    break;
                case 80001081:
                    statups.put(MapleBuffStat.CarnivalExp, ret.info.get(MapleStatInfo.x));
                    break;
                case 80011247:
                    ret.info.put(MapleStatInfo.time, 1000);
                    statups.put(MapleBuffStat.RoyalGuardPrepare, 1);
                    break;
                case 80011248:
                    statups.clear();
                    statups.put(MapleBuffStat.IndiePDD, ret.getInfo().get(MapleStatInfo.indiePdd));
                    statups.put(MapleBuffStat.IndieStance, ret.getInfo().get(MapleStatInfo.indieStance));
                    statups.put(MapleBuffStat.黎明神盾_紫血, 0);
                    break;
                case 80011249:
                    statups.put(MapleBuffStat.意志關懷, ret.getInfo().get(MapleStatInfo.x));
                    break;
                case 80011993:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.info.put(MapleStatInfo.mpCon, 0);
                    statups.put(MapleBuffStat.艾爾達斯的祝福, 1);
                    break;
                case 80012015:
                    statups.put(MapleBuffStat.艾爾達斯還原, 1);
                    monsterStatus.put(MonsterStatus.艾爾達斯還原, 1);
                    break;
                case 80001089:
                case 80001242:
                    statups.put(MapleBuffStat.NewFlying, 1);
                    break;
                case 80011513:
                    statups.put(MapleBuffStat.DamAbsorbShield, ret.info.get(MapleStatInfo.x));
                    statups.put(MapleBuffStat.IndieEXP, ret.info.get(MapleStatInfo.y));
                    break;
                case 80011261:
                    statups.put(MapleBuffStat.IndieSummoned, 1);
                    break;
                case 9101008:
                    statups.put(MapleBuffStat.MaxHP, ret.getInfo().get(MapleStatInfo.x));
                    statups.put(MapleBuffStat.MaxMP, ret.getInfo().get(MapleStatInfo.y));
                    break;
                case 9101002: //沒有這個GM技能
                    statups.put(MapleBuffStat.HolySymbol, ret.getInfo().get(MapleStatInfo.x));
                    break;
                case 80001034: //神聖拯救者的祝福
                case 80001035: //神聖拯救者的祝福
                case 80001036: //神聖拯救者的祝福
                    statups.put(MapleBuffStat.Event, 1);
                    break;
                case 9101003: //沒有這個GM技能
                    statups.clear();
                    statups.put(MapleBuffStat.IndiePAD, ret.getInfo().get(MapleStatInfo.indiePad));
                    statups.put(MapleBuffStat.IndieMAD, ret.getInfo().get(MapleStatInfo.indieMad));
                    statups.put(MapleBuffStat.IndieMHPR, ret.getInfo().get(MapleStatInfo.indieMhpR));
                    statups.put(MapleBuffStat.IndieMMPR, ret.getInfo().get(MapleStatInfo.indieMmpR));
                    statups.put(MapleBuffStat.PDD, ret.getInfo().get(MapleStatInfo.pdd));
                    statups.put(MapleBuffStat.Speed, ret.getInfo().get(MapleStatInfo.speed));
                    break;
                case 9101000: //沒有這個GM技能
                    ret.setHpR(1.0);
                    break;
                case 80001427: // 疾速之輪行蹤
                    statups.clear();
                    statups.put(MapleBuffStat.IndieJump, ret.getInfo().get(MapleStatInfo.indieJump));
                    statups.put(MapleBuffStat.IndieSpeed, ret.getInfo().get(MapleStatInfo.indieSpeed));
                    statups.put(MapleBuffStat.IndieBooster, ret.getInfo().get(MapleStatInfo.indieBooster));
                    break;
                case 80001428: // 重生的輪行蹤
                    statups.clear();
                    statups.put(MapleBuffStat.IndieAsrR, ret.getInfo().get(MapleStatInfo.indieAsrR));
                    statups.put(MapleBuffStat.IndieStance, ret.getInfo().get(MapleStatInfo.indieStance));
                    statups.put(MapleBuffStat.DotHealHPPerSecond, ret.getInfo().get(MapleStatInfo.dotHealHPPerSecondR));
                    statups.put(MapleBuffStat.DotHealMPPerSecond, ret.getInfo().get(MapleStatInfo.dotHealMPPerSecondR));
                    break;
                case 80001430: // 崩壞之輪行蹤
                    statups.clear();
                    statups.put(MapleBuffStat.IndieBooster, ret.getInfo().get(MapleStatInfo.indieBooster));
                    statups.put(MapleBuffStat.IndieDamR, ret.getInfo().get(MapleStatInfo.indieDamR));
                    break;
                case 80001432: // 破滅之輪行蹤
                    statups.clear();
                    statups.put(MapleBuffStat.IndieDamR, ret.getInfo().get(MapleStatInfo.indieDamR));
                    break;
                case 80001756: // 解放雷之輪
                    statups.put(MapleBuffStat.RandAreaAttack, ret.getInfo().get(MapleStatInfo.x));
                    break;
                case 80001757: // 解放地震之輪
                    statups.clear();
                    statups.put(MapleBuffStat.IndieJump, ret.getInfo().get(MapleStatInfo.indieJump));
                    statups.put(MapleBuffStat.IndieSpeed, ret.getInfo().get(MapleStatInfo.indieSpeed));
                    statups.put(MapleBuffStat.IndieInvincible, 1);
                    statups.put(MapleBuffStat.Inflation, ret.getInfo().get(MapleStatInfo.x));
                    break;
                case 80001875: // 輪之力解放-超越
                    statups.put(MapleBuffStat.FixCoolTime, ret.getInfo().get(MapleStatInfo.fixCoolTime));
                    break;
                case 80001876: // 輪之力解放-轟炸
                    statups.put(MapleBuffStat.RideVehicle, 1939006);
                    break;
                case 80002280: // 解放的輪之力
                    statups.put(MapleBuffStat.IndieEXP, ret.getInfo().get(MapleStatInfo.indieExp));
                    break;
                case 80002281: // 解放貪欲之輪
                    statups.put(MapleBuffStat.MesoUp, 100); // mesoAmountUp
                    break;
                case 80002282: // 封印的輪之力
                    statups.put(MapleBuffStat.DisableRune, 1);
                    break;
                case 80002888: // 淨化之輪解放
                    statups.put(MapleBuffStat.PURIFICATION_RUNE, 1);
                    break;
                case 80002889: // 光束之輪解放
                    statups.put(MapleBuffStat.IndieSummoned, 1);
                    break;
                case 80002890: // 轉移之輪解放
                    statups.put(MapleBuffStat.TRANSFER_RUNE, 1);
                    break;
                case 80001371: // 妖精密語
                    statups.put(MapleBuffStat.IndieMHPR, ret.getInfo().get(MapleStatInfo.indieMhpR));
                    statups.put(MapleBuffStat.IndieMMPR, ret.getInfo().get(MapleStatInfo.indieMmpR));
                    statups.put(MapleBuffStat.IndieBDR, ret.getInfo().get(MapleStatInfo.x));
                    break;
                case 80001312:
                case 80001313:
                case 80001314:
                case 80001315:
                    statups.put(MapleBuffStat.RideVehicle, 1932187 + (sourceid - 80001312));
                    break;
                case 80001155:
                    statups.put(MapleBuffStat.IndieDamR, ret.getInfo().get(MapleStatInfo.indieDamR));
                    break;
                case 80011158:
                    statups.clear();
                    statups.put(MapleBuffStat.IndiePADR, ret.getInfo().get(MapleStatInfo.x));
                    break;
                case 80001218: // 無雙之力
                    statups.put(MapleBuffStat.SoulSkillDamageUp, ret.getX());
                    break;
                case 90001006:
                    monsterStatus.put(MonsterStatus.Freeze, 1);
                    ret.getInfo().put(MapleStatInfo.time, (Integer) ret.getInfo().get(MapleStatInfo.time) * 2);
                    break;
                case 9101004:
                    ret.getInfo().put(MapleStatInfo.time, 0);
                    statups.put(MapleBuffStat.DarkSight, ret.getInfo().get(MapleStatInfo.x));
                    break;
                case 23111004:
                    statups.put(MapleBuffStat.AddAttackCount, ret.getInfo().get(MapleStatInfo.x));
                    break;
                case 36101002:
                    statups.put(MapleBuffStat.CriticalBuff, ret.getInfo().get(MapleStatInfo.x));
                    break;
                case 36121004:
                    statups.put(MapleBuffStat.Stance, ret.getInfo().get(MapleStatInfo.x));
                    statups.put(MapleBuffStat.IgnoreTargetDEF, ret.getInfo().get(MapleStatInfo.y));
                    break;
                case 9001020: //沒有這個GM技能
                case 9101020: //沒有這個GM技能
                    monsterStatus.put(MonsterStatus.Seal, 1);
                    break;
                case 90001002: //沒有這個GM技能
                    monsterStatus.put(MonsterStatus.Speed, ret.getInfo().get(MapleStatInfo.x));
                    break;
                case 80011540:
                    monsterStatus.put(MonsterStatus.Smite, 1);
                    break;
                case 90001003:
                    monsterStatus.put(MonsterStatus.Poison, 1);
                    break;
                case 90001005:
                    monsterStatus.put(MonsterStatus.Seal, 1);
                    break;
            }
            if (JobConstants.is零轉職業(sourceid / 10000)) { //新手技能BUFF處理
                switch (sourceid % 10000) {
                    //angelic blessing: HACK, we're actually supposed to use the passives for atk/matk buff
                    case 99:  //破冰巨劍
                    case 104: //蝸居詛咒
                        monsterStatus.put(MonsterStatus.Speed, 1);
                        ret.getInfo().put(MapleStatInfo.time, ret.getInfo().get(MapleStatInfo.time) * 2); // freezing skills are a little strange
                        break;
                    case 103: //霸天斧
                        monsterStatus.put(MonsterStatus.Stun, 1);
                        break;
                    case 1001: //團隊治療
                        if (ret.is潛入()) { //潛入BUFF
                            statups.put(MapleBuffStat.Sneak, ret.getInfo().get(MapleStatInfo.x));
                        } else {
                            statups.put(MapleBuffStat.Regen, ret.getInfo().get(MapleStatInfo.x));
                        }
                        break;
                    case 1010: //金剛霸體
                        ret.getInfo().put(MapleStatInfo.time, 2100000000);
                        statups.put(MapleBuffStat.DojangInvincible, 1);
                        statups.put(MapleBuffStat.NotDamaged, 1);
                        break;
                    case 1011: //狂暴戰魂
                        statups.put(MapleBuffStat.DojangBerserk, ret.getInfo().get(MapleStatInfo.x));
                        break;
                    case 1026: //飛翔
                    case 1142: //飛翔
                        ret.getInfo().put(MapleStatInfo.time, 2100000000);
                        statups.put(MapleBuffStat.Flying, 1);
                        break;
                    case 8001: //好用的時空門
                        statups.put(MapleBuffStat.SoulArrow, ret.getInfo().get(MapleStatInfo.x));
                        break;
                    case 8002: //好用的火眼晶晶
                        statups.put(MapleBuffStat.SharpEyes, (ret.getInfo().get(MapleStatInfo.x) << 8) + ret.getInfo().get(MapleStatInfo.y) + ret.getInfo().get(MapleStatInfo.criticaldamageMax));
                        break;
                    case 8003: //好用的神聖之火
                        statups.put(MapleBuffStat.MaxHP, ret.getInfo().get(MapleStatInfo.x));
                        statups.put(MapleBuffStat.MaxMP, ret.getInfo().get(MapleStatInfo.x));
                        break;
                    case 8004: //強化戰鬥命令
                        statups.put(MapleBuffStat.CombatOrders, ret.getInfo().get(MapleStatInfo.x));
                        break;
                    case 8005: //強化進階祝福
                        statups.clear();
                        statups.put(MapleBuffStat.AdvancedBless, ret.getInfo().get(MapleStatInfo.x));
                        statups.put(MapleBuffStat.IndieMHP, ret.getInfo().get(MapleStatInfo.indieMhp));
                        statups.put(MapleBuffStat.IndieMMP, ret.getInfo().get(MapleStatInfo.indieMmp));
                        break;
                    case 8006: //強化極速領域
                        statups.put(MapleBuffStat.PartyBooster, ret.getInfo().get(MapleStatInfo.x));
                        break;
                    case 169://九死一生
                        statups.put(MapleBuffStat.PreReviveOnce, 1);
                        ret.getInfo().put(MapleStatInfo.time, 2100000000);
                        ret.setOverTime(true);
                        break;
                }
            }
        } else {
            switch (sourceid) {
                case 2022746: //天使的祝福
                case 2022747: //黑天使的祝福
                case 2022823: //白天使的祝福
                    statups.clear(); //no atk/matk
                    statups.put(MapleBuffStat.RepeatEffect, 1);
                    int value = sourceid == 2022746 ? 5 : sourceid == 2022747 ? 10 : 12;
                    statups.put(MapleBuffStat.IndiePAD, value);
                    statups.put(MapleBuffStat.IndieMAD, value);
                    break;
                case 2003596: // 高級BOSS殺手的秘藥 
                    statups.put(MapleBuffStat.IndieBDR, ret.getInfo().get(MapleStatInfo.indieBDR));
                    break;
                case 2023632: // 深海釣魚場料理 
                    statups.put(MapleBuffStat.IndieBDR, ret.getInfo().get(MapleStatInfo.indieBDR));
                    break;
            }
        }
        if (ret.getSummonMovementType() != null || isSummon) {
            statups.put(MapleBuffStat.IndieSummoned, 1);
        }
        if (SkillConstants.is召喚獸戒指(sourceid)) {
            ret.getInfo().put(MapleStatInfo.time, 2100000000);
        }
        if (ret.isMorph()) {
            statups.put(MapleBuffStat.Morph, ret.getMorph());
            if (ret.is凱撒終極型態() || ret.is凱撒超終極型態()) {
                statups.put(MapleBuffStat.Stance, ret.getInfo().get(MapleStatInfo.prop));
                statups.put(MapleBuffStat.CriticalBuff, ret.getInfo().get(MapleStatInfo.cr));
                statups.put(MapleBuffStat.IndieDamR, ret.getInfo().get(MapleStatInfo.indieDamR));
                statups.put(MapleBuffStat.IndieBooster, ret.getInfo().get(MapleStatInfo.indieBooster));
            }
        }
        if (ret.is超越攻擊狀態()) {
            statups.clear();
            ret.getInfo().put(MapleStatInfo.time, 15000);
            statups.put(MapleBuffStat.Exceed, 1);
        }
        ret.setStatups(statups);
        ret.setMonsterStatus(monsterStatus);
        return ret;
    }

    /**
     * 獲取騎寵的 MountId
     */
    public static int parseMountInfo(MapleCharacter player, int skillid) {
        if (skillid == 80001000 || SkillConstants.is騎乘技能(skillid)) {
            if (player.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -123) != null && player.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -124) != null) {
                return player.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -123).getItemId();
            }
            return parseMountInfo_Pure(player, skillid);
        } else {
            return GameConstants.getMountItem(skillid, player);
        }
    }

    static int parseMountInfo_Pure(MapleCharacter player, int skillid) {
        if (skillid == 80001000 || SkillConstants.is騎乘技能(skillid)) {
            if (player.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -18) != null && player.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -19) != null) {
                return player.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -18).getItemId();
            }
            return 0;
        } else {
            return GameConstants.getMountItem(skillid, player);
        }
    }

    public static int makeHealHP(double rate, double stat, double lowerfactor, double upperfactor) {
        return (int) ((Math.random() * ((int) (stat * upperfactor * rate) - (int) (stat * lowerfactor * rate) + 1)) + (int) (stat * lowerfactor * rate));
    }

    public static Rectangle calculateBoundingBox(Point posFrom, boolean facingLeft, Point lt, Point rb, int range) {
        Rectangle rect;
        if (lt == null || rb == null) {
            rect = new Rectangle((facingLeft ? (-200 - range) : 0) + posFrom.x, (-100 - range) + posFrom.y, 200 + range, 100 + range);
        } else {
            Point mylt;
            Point myrb;
            if (facingLeft) {
                mylt = new Point(lt.x + posFrom.x - range, lt.y + posFrom.y);
                myrb = new Point(rb.x + posFrom.x, rb.y + posFrom.y);
            } else {
                myrb = new Point(lt.x * -1 + posFrom.x + range, rb.y + posFrom.y);
                mylt = new Point(rb.x * -1 + posFrom.x, lt.y + posFrom.y);
            }
            rect = new Rectangle(mylt.x, mylt.y, myrb.x - mylt.x, myrb.y - mylt.y);
        }
        if (rect.width < 0) {
            int x = rect.x;
            rect.x += rect.width;
            rect.width = x - rect.x;
        }
        if (rect.height < 0) {
            int y = rect.y;
            rect.y += rect.height;
            rect.height = y - rect.y;
        }
        return rect;
    }

    /**
     * 添加一些固定的DeBuff
     */
    private static void addDebuffStatPairToListIfNotZero(Map<MonsterStatus, Integer> list, MonsterStatus buffstat, Integer val, Integer x) {
        if (val != 0 && (!list.containsKey(buffstat) || list.get(buffstat) == 0)) {
            list.put(buffstat, x);
        }
    }
}
