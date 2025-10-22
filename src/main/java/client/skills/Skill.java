package client.skills;

import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassFetcher;
import constants.JobConstants;
import constants.SkillConstants;
import constants.skills.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import provider.MapleData;
import provider.MapleDataTool;
import provider.MapleDataType;
import server.buffs.MapleStatEffect;
import server.buffs.MapleStatEffectFactory;
import server.life.Element;
import tools.types.Pair;
import server.Randomizer;

import java.util.*;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class Skill {

    public static final Logger log = LogManager.getLogger();

    private final List<MapleStatEffect> effects = new ArrayList<>();
    private final List<Pair<String, Byte>> requiredSkill = new ArrayList<>();
    private String name = "";
    private final boolean isSwitch = false;
    private final Map<Integer, Integer> bonusExpInfo = new HashMap<>(); //[技能等級] [升級需要的經驗]
    private int id;
    private String psdDamR = "";
    private String targetPlus = "";
    private String minionAttack = "";
    private String minionAbility = "";
    private Element element = Element.NEUTRAL;
    private List<MapleStatEffect> pvpEffects = null;
    private List<Integer> animation = null;
    private int hyper = 0;
    private int hyperStat = 0;
    private int reqLev = 0;
    private int animationTime = 0;
    private int masterLevel = 0;
    private int maxLevel = 0;
    private int delay = 0;
    private int trueMax = 0;
    private int eventTamingMob = 0;
    private int skillType = 0;
    private int fixLevel;
    private int disableNextLevelInfo;
    private int psd = 0;
    //    private int psdSkills = 0;
    private List<Integer> psdSkills = null;
    private int setItemReason;
    private int setItemPartsCount;
    private int maxDamageOver = 999999;
    private int ppRecovery = 0;
    private boolean invisible = false;
    private boolean chargeSkill = false;
    private boolean timeLimited = false;
    private boolean combatOrders = false;
    private boolean pvpDisabled = false;
    private boolean magic = false;
    private boolean casterMove = false;
    private boolean chargingSkill;
    private boolean passiveSkill;
    private boolean selfDestructMinion;
    private boolean rapidAttack;
    private boolean pushTarget = false;
    private boolean pullTarget = false;
    private boolean buffSkill = false;
    private boolean summon = false;
    private boolean notRemoved = false;
    private boolean disable = false;
    private boolean hasMasterLevelProperty = false;
    private boolean petPassive = false;
    private boolean finalAttack = false;
    private boolean soulSkill = false;
    private boolean notCooltimeReduce = false;
    private boolean notCooltimeReset = false;
    private boolean showSummonedBuffIcon = false;
    public static Map<String, Integer> Info = new HashMap<>();
    //技能類型
    public Map<SkillInfo, String> info = new HashMap<>();
    public List<SkillMesInfo> MesList = new ArrayList<>();
    public static Map<String, List<Integer>> SkillMes = new HashMap<>();
    public static List<Integer> SkillMeList = new ArrayList<>();
    //超級技能是否使用CD
    public boolean notIncBuffDuration = false;
    private boolean mesToBoss = false;
    private boolean mobSkill;
    private int vehicleID;
    private boolean profession;
    private boolean ignoreCounter;
    private int hitTime;
    private boolean recipe;
    private int vSkill;
    private static final Lock delayDataLock = new ReentrantLock();
    public static List<Integer> skillList = new ArrayList<>();

    public Skill() {

    }

    public Skill(int id) {
        super();
        this.id = id;
    }

    public static Skill loadFromData(int id, MapleData data, MapleData delayData) {
        boolean showSkill = false;
        if (showSkill) {
            System.out.println("正在解析技能id: " + id + " 名字: " + SkillFactory.getSkillName(id));
            log.trace("正在解析技能id: " + id + " 名字: " + SkillFactory.getSkillName(id), true);
        }
        Skill ret = new Skill(id);
        ret.name = SkillFactory.getSkillName(id);
        boolean isBuff;
        int skillType = MapleDataTool.getInt("skillType", data, -1);
        String elem = MapleDataTool.getString("elemAttr", data, null);
        ret.element = elem != null ? Element.getFromChar(elem.charAt(0)) : Element.NEUTRAL;
        ret.skillType = skillType;
        ret.invisible = MapleDataTool.getInt("invisible", data, 0) > 0;
        MapleData effect = data.getChildByPath("effect");
        MapleData common = data.getChildByPath("common");
        MapleData info = data.getChildByPath("info");
        MapleData info2 = data.getChildByPath("info2");
        MapleData hit = data.getChildByPath("hit");
        MapleData ball = data.getChildByPath("ball");
        ret.mobSkill = data.getChildByPath("mob") != null;
        ret.summon = data.getChildByPath("summon") != null;
        ret.masterLevel = MapleDataTool.getInt("masterLevel", data, 0);
        if (ret.masterLevel > 0) {
            ret.hasMasterLevelProperty = true;
        }
        ret.psd = MapleDataTool.getInt("psd", data, 0);
        if (ret.psd == 1) {
            final MapleData psdSkill = data.getChildByPath("psdSkill");
            if (psdSkill != null) {
                ret.psdSkills = new ArrayList<>();
                data.getChildByPath("psdSkill").getChildren().forEach(it -> ret.psdSkills.add(Integer.valueOf(it.getName())));
            }
        }
        ret.notRemoved = MapleDataTool.getInt("notRemoved", data, 0) > 0;
        ret.notIncBuffDuration = MapleDataTool.getInt("notIncBuffDuration", data, 0) > 0;
        ret.timeLimited = MapleDataTool.getInt("timeLimited", data, 0) > 0;
        ret.combatOrders = MapleDataTool.getInt("combatOrders", data, 0) > 0;
        ret.fixLevel = MapleDataTool.getInt("fixLevel", data, 0);
        ret.disable = MapleDataTool.getInt("disable", data, 0) > 0;
        ret.disableNextLevelInfo = MapleDataTool.getInt("disableNextLevelInfo", data, 0);
        ret.eventTamingMob = MapleDataTool.getInt("eventTamingMob", data, 0);
        ret.vehicleID = MapleDataTool.getInt("vehicleID", data, 0);
        ret.hyper = MapleDataTool.getInt("hyper", data, 0); //超級技能欄位設置 P A
        ret.hyperStat = MapleDataTool.getInt("hyperStat", data, 0); //超級屬性點
        ret.reqLev = MapleDataTool.getInt("reqLev", data, 0); //超級技能需要的等級
        ret.petPassive = MapleDataTool.getInt("petPassive", data, 0) > 0; //是否寵物被動觸發技能
        ret.setItemReason = MapleDataTool.getInt("setItemReason", data, 0); //觸發技能的套裝ID
        ret.setItemPartsCount = MapleDataTool.getInt("setItemPartsCount", data, 0); //觸發技能需要的數量
        ret.ppRecovery = MapleDataTool.getInt("ppRecovery", data, 0); //超能力者pp恢復量
        ret.notCooltimeReduce = MapleDataTool.getInt("notCooltimeReduce", data, 0) > 0;
        ret.notCooltimeReset = MapleDataTool.getInt("notCooltimeReset", data, 0) > 0;
        ret.showSummonedBuffIcon = MapleDataTool.getInt("showSummonedBuffIcon", data, 0) > 0;//是否顯示召喚獸圖標
        ret.profession = (id / 10000 >= 9200 && id / 10000 <= 9204);
        ret.vSkill = MapleDataTool.getInt("vSkill", data, ret.isVSkill() ? 1 : -1);
        if (info != null) {
            ret.pvpDisabled = MapleDataTool.getInt("pvp", info, 1) <= 0;
            ret.magic = MapleDataTool.getInt("magicDamage", info, 0) > 0;
            ret.casterMove = MapleDataTool.getInt("casterMove", info, 0) > 0;
            ret.pushTarget = MapleDataTool.getInt("pushTarget", info, 0) > 0;
            ret.pullTarget = MapleDataTool.getInt("pullTarget", info, 0) > 0;
            ret.rapidAttack = MapleDataTool.getInt("rapidAttack", info, 0) > 0;
            ret.minionAttack = MapleDataTool.getString("minionAttack", info, "");
            ret.minionAbility = MapleDataTool.getString("minionAbility", info, "");
            ret.selfDestructMinion = MapleDataTool.getInt("selfDestructMinion", info, 0) > 0;
            ret.chargingSkill = MapleDataTool.getInt("chargingSkill", info, 0) > 0 || MapleDataTool.getInt("keydownThrowing", info, 0) > 0 || id == 冰雷.冰龍吐息;
        }
        if (info2 != null) {
            ret.ignoreCounter = MapleDataTool.getInt("ignoreCounter", info2, 0) > 0;
        }
        MapleData action_ = data.getChildByPath("action");
        boolean action = false;
        if (action_ == null && data.getChildByPath("prepare/action") != null) {
            action_ = data.getChildByPath("prepare/action");
            action = true;
        }
        isBuff = effect != null && hit == null && ball == null;
        final boolean isHit = hit != null;
        if (action_ != null) {
            String d;
            if (action) { //prepare
                d = MapleDataTool.getString(action_, null);
            } else {
                d = MapleDataTool.getString("0", action_, null);
            }
            if (d != null) {
                isBuff |= d.equals("alert2");
                delayDataLock.lock();
                try {
                    MapleData dd = delayData.getChildByPath(d);
                    if (dd != null) {
                        for (MapleData del : dd) {
                            ret.delay += Math.abs(MapleDataTool.getInt("delay", del, 0));
                        }
                        if (ret.delay > 30) { //then, faster(2) = (10+2)/16 which is basically 3/4
                            ret.delay = (int) Math.round(ret.delay * 11.0 / 16.0); //fastest(1) lolol
                            ret.delay -= ret.delay % 30; //round to 30ms
                        }
                    }
                } catch (Exception ex) {
                    ex.printStackTrace();
                } finally {
                    delayDataLock.unlock();
                }
                if (SkillFactory.getDelay(d) != null) { //this should return true always
                    ret.animation = new ArrayList<>();
                    ret.animation.add(SkillFactory.getDelay(d));
                    if (!action) {
                        for (MapleData ddc : action_) {
                            try {
                                if (ddc.getType() == MapleDataType.STRING && !MapleDataTool.getString(ddc, d).equals(d) && !ddc.getName().contentEquals("delay")) {
                                    String c = MapleDataTool.getString(ddc);
                                    if (SkillFactory.getDelay(c) != null) {
                                        ret.animation.add(SkillFactory.getDelay(c));
                                    }
                                }
                            } catch (Exception e) {
                                throw new RuntimeException(ret.getId() + "", e);
                            }
                        }
                    }
                }
            }
        }
        ret.chargeSkill = data.getChildByPath("keydown") != null;
        if (info != null) {
            info.getChildren().forEach(mapleData -> {
                if (mapleData.getName().equals("finalAttack") && ((Number) mapleData.getData()).intValue() == 1 && !SkillFactory.getFinalAttackSkills().contains(id)) {
                    ret.finalAttack = true;
                    SkillFactory.getFinalAttackSkills().add(id);
                }
            });
        }
        if (!ret.chargeSkill) {
            switch (id) {
                case 冰雷.冰鋒刃:
                case 幻獸師.旋風飛行:
                case 夜光.晨星殞落:
                    ret.chargeSkill = true;
                    break;
            }
        }
        //有些技能是老的XML模式
        MapleData levelData = data.getChildByPath("level");
        if (common != null) {
            ret.maxLevel = MapleDataTool.getInt("maxLevel", common, 1); //10 just a failsafe, shouldn't actually happens
            ret.trueMax = ret.maxLevel + (ret.combatOrders ? 2 : (ret.vSkill == 2 ? 10 : (ret.vSkill == 1 ? 5 : 0)));
            if (levelData != null) {
                for (MapleData leve : levelData) {
                    ret.effects.add(MapleStatEffectFactory.loadSkillEffectFromData(ret, leve, id, isHit, isBuff, ret.summon, Byte.parseByte(leve.getName()), null, ret.notRemoved, ret.notIncBuffDuration));
                }
            } else {
                ret.soulSkill = common.getChildByPath("soulmpCon") != null;
                ret.psdDamR = MapleDataTool.getString("damR", common, "");
                ret.targetPlus = MapleDataTool.getString("targetPlus", common, "");
                for (int i = 1; i < 3; i++) {
                    if (data.getChildByPath("info" + (i == 1 ? "" : "" + i)) != null) {
                        for (MapleData mapleData : data.getChildByPath("info" + (i == 1 ? "" : "" + i)).getChildren()) {
                            try {
                                SkillInfo Sinfo = SkillInfo.valueOf(mapleData.getName());
                                switch (Sinfo) {
                                    case incDamToStunTarget:
//                                    System.out.println("技能:" + id);
                                        break;
                                    case affectedSkillEffect:
                                    case mes: {
                                        //進行添加..
                                        String key = mapleData.getData().toString();
                                        String[] keys = key.split("&&");
                                        for (String key1 : keys) {
                                            try {
                                                ret.MesList.add(SkillMesInfo.getInfo(key1));
                                            } catch (Exception e) {
                                                System.err.println("加載錯誤技能:" + id);
                                            }
                                        }
//                                    if (ret.MesList.contains(SkillMesInfo.restrict)) {
//                                        System.out.println(ret.toString() + "mes:" + ret.MesList);
//                                    }
                                        break;
                                    }
                                    case mesToBoss:
//                                    System.out.println(ret.toString() + "mestoboss:" + ret.MesList);
                                        ret.mesToBoss = true;
                                        break;
                                }
                                if (Sinfo != null) {
                                    ret.info.put(Sinfo, mapleData.getData().toString());
                                }
                            } catch (Exception e) {
                                System.err.println(id);
                                e.printStackTrace();

                            }
                        }
                    }
                }
                for (int i = 1; i <= ret.trueMax; i++) {
                    ret.effects.add(MapleStatEffectFactory.loadSkillEffectFromData(ret, common, id, isHit, isBuff, ret.summon, i, "x", ret.notRemoved, ret.notIncBuffDuration));
                }
                ret.maxDamageOver = MapleDataTool.getInt("MDamageOver", common, 999999);
            }
        } else {
            if (levelData != null) {
                for (MapleData leve : levelData) {
                    ret.effects.add(MapleStatEffectFactory.loadSkillEffectFromData(ret, leve, id, isHit, isBuff, ret.summon, Byte.parseByte(leve.getName()), null, ret.notRemoved, ret.notIncBuffDuration));
                }
                ret.maxLevel = ret.effects.size();
                ret.trueMax = ret.effects.size();
            }
        }
        boolean loadPvpSkill = false;
        if (loadPvpSkill) {
            MapleData level2 = data.getChildByPath("PVPcommon");
            if (level2 != null) {
                ret.pvpEffects = new ArrayList<>();
                for (int i = 1; i <= ret.trueMax; i++) {
                    ret.pvpEffects.add(MapleStatEffectFactory.loadSkillEffectFromData(ret, level2, id, isHit, isBuff, ret.summon, i, "x", ret.notRemoved, ret.notIncBuffDuration));
                }
            }
        }
        MapleData reqDataRoot = data.getChildByPath("req");
        if (reqDataRoot != null) {
            for (MapleData reqData : reqDataRoot.getChildren()) {
                ret.requiredSkill.add(new Pair<>(reqData.getName(), (byte) MapleDataTool.getInt(reqData, 1)));
            }
        }
        ret.animationTime = 0;
        if (effect != null) {
            for (MapleData effectEntry : effect) {
                ret.animationTime += MapleDataTool.getIntConvert("delay", effectEntry, 0);
            }
        }
        ret.hitTime = 0;
        if (hit != null) {
            for (MapleData hitEntry : hit) {
                ret.hitTime += MapleDataTool.getIntConvert("delay", hitEntry, 0);
            }
        }
        MapleData dat = data.getChildByPath("skillList");
        if (dat != null) {
            for (MapleData da : dat.getChildren()) {
                ret.skillList.add(MapleDataTool.getInt(da, 0));
            }
        }
        ret.buffSkill = isBuff;
        switch (id) {
            case 夜光.星星閃光:
            case 夜光.黑暗球體:
            case 夜光.黑暗魔法強化:
                ret.masterLevel = ret.maxLevel;
                break;
        }

        MapleData growthInfo = data.getChildByPath("growthInfo/level");
        if (growthInfo != null) {
            for (MapleData expData : growthInfo.getChildren()) {
                ret.bonusExpInfo.put(Integer.parseInt(expData.getName()), MapleDataTool.getInt("maxExp", expData, 100000000));
            }
        }
        return ret;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public MapleStatEffect getEffect(int level) {
        return getEffect(false, level);
    }

    public MapleStatEffect getPVPEffect(int level) {
        return getEffect(true, level - 1);
    }

    private MapleStatEffect getEffect(boolean ispvp, int level) {
        List<MapleStatEffect> effects = ispvp ? pvpEffects : this.effects;
        if (effects.size() < level) {
            if (effects.size() > 0) { //incAllskill
                return effects.get(effects.size() - 1);
            }
            return null;
        } else if (level <= 0) {
            return null;
        }
        return effects.get(level - 1);
    }

    public int getSkillType() {
        return skillType;
    }

    public List<Integer> getAllAnimation() {
        return animation;
    }

    public int getAnimation() {
        if (animation == null) {
            return -1;
        }
        return animation.get(Randomizer.nextInt(animation.size()));
    }

    public void setAnimation(List<Integer> animation) {
        this.animation = animation;
    }

    public List<Integer> getPsdSkills() {
        return psdSkills;
    }

    public int getPsd() {
        return psd;
    }

    public String getPsdDamR() {
        return psdDamR;
    }

    public String getTargetPlus() {
        return targetPlus;
    }

    public boolean isPVPDisabled() {
        return pvpDisabled;
    }

    public boolean isChargeSkill() {
        return chargeSkill;
    }

    public boolean isInvisible() {
        return invisible;
    }

    public boolean isNotRemoved() {
        return notRemoved;
    }

    public boolean isRapidAttack() {
        return rapidAttack;
    }

    public boolean isPassiveSkill() {
        return passiveSkill;
    }

    public boolean isChargingSkill() {
        return chargingSkill;
    }

    public boolean hasRequiredSkill() {
        return requiredSkill.size() > 0;
    }

    public List<Pair<String, Byte>> getRequiredSkills() {
        return requiredSkill;
    }

    public int getMaxLevel() {
        return maxLevel;
    }

    public int getTrueMax() {
        return trueMax;
    }

    public boolean combatOrders() {
        return combatOrders;
    }

    public boolean canBeLearnedBy(int job) {
        int skillForJob = id / 10000;
        if (skillForJob == 2001) {
            return JobConstants.is龍魔導士(job);
        } else if (skillForJob == 0) {
            return JobConstants.is冒險家(job);
        } else if (skillForJob == 500) {
            return job == 500 || JobConstants.is拳霸(job) || JobConstants.is槍神(job);
        } else if (skillForJob == 501) {
            return JobConstants.is重砲指揮官(job);
        } else if (skillForJob == 508) {
            return JobConstants.is蒼龍俠客(job);
        } else if (skillForJob == 509) {
            return JobConstants.is拳霸新(job) || JobConstants.is槍神新(job);
        } else if (skillForJob == 1000) {
            return JobConstants.is皇家騎士團(job);
        } else if (skillForJob == 2000) {
            return JobConstants.is狂狼勇士(job);
        } else if (skillForJob == 2002) {
            return JobConstants.is精靈遊俠(job);
        } else if (skillForJob == 2003) {
            return JobConstants.is幻影俠盜(job);
        } else if (skillForJob == 2004) {
            return JobConstants.is夜光(job);
        } else if (skillForJob == 2500) {
            return JobConstants.is隱月(job);
        } else if (skillForJob == 3000) {
            return JobConstants.is末日反抗軍(job);
        } else if (skillForJob == 3001) {
            return JobConstants.is惡魔殺手(job);
        } else if (skillForJob == 3101) {
            return JobConstants.is惡魔復仇者(job);
        } else if (skillForJob == 3002) {
            return JobConstants.is傑諾(job);
        } else if (skillForJob == 5000) {
            return JobConstants.is米哈逸(job);
        } else if (skillForJob == 6000) {
            return JobConstants.is凱撒(job);
        } else if (skillForJob == 6001) {
            return JobConstants.is天使破壞者(job);
        } else if (skillForJob == 10000) {
            return JobConstants.is神之子(job);
        } else if (skillForJob == 11000) {
            return JobConstants.is幻獸師(job);
        } else if (skillForJob == 14000) {
            return JobConstants.is凱內西斯(job);
        } else if (skillForJob == 301) {
            return JobConstants.is開拓者(job);
        }
        if (job / 100 != skillForJob / 100) { // wrong job
            return false;
        } else if (job / 1000 != skillForJob / 1000) { // wrong job
            return false;
        } else if (JobConstants.is幻獸師(skillForJob) && !JobConstants.is幻獸師(job)) {
            return false;
        } else if (JobConstants.is神之子(skillForJob) && !JobConstants.is神之子(job)) {
            return false;
        } else if (JobConstants.is天使破壞者(skillForJob) && !JobConstants.is天使破壞者(job)) {
            return false;
        } else if (JobConstants.is凱撒(skillForJob) && !JobConstants.is凱撒(job)) {
            return false;
        } else if (JobConstants.is米哈逸(skillForJob) && !JobConstants.is米哈逸(job)) {
            return false;
        } else if (JobConstants.is傑諾(skillForJob) && !JobConstants.is傑諾(job)) {
            return false;
        } else if (JobConstants.is夜光(skillForJob) && !JobConstants.is夜光(job)) {
            return false;
        } else if (JobConstants.is隱月(skillForJob) && !JobConstants.is隱月(job)) {
            return false;
        } else if (JobConstants.is幻影俠盜(skillForJob) && !JobConstants.is幻影俠盜(job)) {
            return false;
        } else if (JobConstants.is蒼龍俠客(skillForJob) && !JobConstants.is蒼龍俠客(job)) {
            return false;
        } else if (JobConstants.is重砲指揮官(skillForJob) && !JobConstants.is重砲指揮官(job)) {
            return false;
        } else if (JobConstants.is拳霸(skillForJob) && !JobConstants.is拳霸(job)) {
            return false;
        } else if (JobConstants.is槍神(skillForJob) && !JobConstants.is槍神(job)) {
            return false;
        } else if (JobConstants.is拳霸新(skillForJob) && !JobConstants.is拳霸新(job)) {
            return false;
        } else if (JobConstants.is槍神新(skillForJob) && !JobConstants.is槍神新(job)) {
            return false;
        } else if (JobConstants.is惡魔復仇者(skillForJob) && !JobConstants.is惡魔復仇者(job)) {
            return false;
        } else if (JobConstants.is惡魔殺手(skillForJob) && !JobConstants.is惡魔殺手(job)) {
            return false;
        } else if (JobConstants.is冒險家(skillForJob) && !JobConstants.is冒險家(job)) {
            return false;
        } else if (JobConstants.is皇家騎士團(skillForJob) && !JobConstants.is皇家騎士團(job)) {
            return false;
        } else if (JobConstants.is狂狼勇士(skillForJob) && !JobConstants.is狂狼勇士(job)) {
            return false;
        } else if (JobConstants.is龍魔導士(skillForJob) && !JobConstants.is龍魔導士(job)) {
            return false;
        } else if (JobConstants.is精靈遊俠(skillForJob) && !JobConstants.is精靈遊俠(job)) {
            return false;
        } else if (JobConstants.is末日反抗軍(skillForJob) && !JobConstants.is末日反抗軍(job)) {
            return false;
        } else if (JobConstants.is凱內西斯(skillForJob) && !JobConstants.is凱內西斯(job)) {
            return false;
        } else if (JobConstants.is開拓者(skillForJob) && !JobConstants.is開拓者(job)) {
            return false;
        } else if (JobConstants.is卡蒂娜(skillForJob) && !JobConstants.is卡蒂娜(job)) {
            return false;
        } else if (JobConstants.is伊利恩(skillForJob) && !JobConstants.is伊利恩(job)) {
            return false;
        } else if ((job / 10) % 10 == 0 && (skillForJob / 10) % 10 > (job / 10) % 10) { // wrong 2nd job
            return false;
        } else if ((skillForJob / 10) % 10 != 0 && (skillForJob / 10) % 10 != (job / 10) % 10) { //wrong 2nd job
            return false;
        } else if (skillForJob % 10 > job % 10) { // wrong 3rd/4th job
            return false;
        }
        return true;
    }

    public boolean isTimeLimited() {
        return timeLimited;
    }

    public boolean isFourthJob() {
        if (true) {
            return SkillConstants.isMasterLevelSkill(id);
        }
        if (id / 10000 == 11212) {
            return false;
        }
        if (isHyperSkill()) {
            return true;
        }
        switch (id) {
            case 英雄.戰鬥精通:
            case 黑騎士.闇靈復仇:
            case 拳霸.防禦姿態:
            case 拳霸.雙倍幸運骰子:
            case 槍神.進攻姿態:
            case 槍神.雙倍幸運骰子:
            case 精靈遊俠.旋風月光翻轉:
            case 精靈遊俠.進階光速雙擊:
            case 精靈遊俠.勇士的意志:
            case 影武者.飛毒殺:
            case 影武者.疾速:
            case 影武者.致命的飛毒殺:
            case 箭神.射擊術:
            case 狂豹獵人.狂暴天性:
            case 重砲指揮官.楓葉淨化:
            case 狂狼勇士.快速移動:
            case 狂狼勇士.動力精通II:
            case 狂狼勇士.終極研究II:
            case 狂狼勇士.楓葉淨化:
            case 龍魔導士.楓葉淨化:
            case 龍魔導士.歐尼斯的意志:
            case 米哈逸.戰鬥大師:
                return false;
        }
        switch (id / 10000) {
            case 2312:
            case 2412:
            case 2712:
            case 3122:
            case 6112:
            case 6512:
            case 14212:
                return true;
            case 10100:
                return id == 神之子.進階威力震擊;
            case 10110:
                return id == 神之子.進階武器投擲 || id == 神之子.進階迴旋之刃;
            case 10111:
                return id == 神之子.進階旋風 || id == 神之子.進階旋風急轉彎 || id == 神之子.進階旋風落葉斬;
            case 10112:
                return id == 神之子.進階碎地猛擊 || id == 神之子.進階暴風裂擊;
        }
        if ((getMaxLevel() <= 15 && !invisible && getMasterLevel() <= 0)) {
            return false;
        }
        if (JobConstants.is龍魔導士(id / 10000) && id / 10000 < 3000) { //龍神技能
            return ((id / 10000) % 10) >= 7;
        }
        if (id / 10000 >= 430 && id / 10000 <= 434) { //暗影雙刀技能
            return ((id / 10000) % 10) == 4 || getMasterLevel() > 0;
        }
        return ((id / 10000) % 10) == 2 && id < 90000000 && !isBeginnerSkill();
    }

    public boolean isVSkill() {
        return id >= 400000000 && id < 400060000;
    }

    public Element getElement() {
        return element;
    }

    public int getAnimationTime() {
        return animationTime;
    }

    public boolean getDisable() {
        return disable;
    }

    public int getFixLevel() {
        return this.fixLevel;
    }

    public int getMasterLevel() {
        return masterLevel;
    }

    public int getMaxMasterLevel() {
        return masterLevel <= 0 ? 0 : maxLevel;
    }

    public int getDisableNextLevelInfo() {
        return this.disableNextLevelInfo;
    }

    public int getDelay() {
        return delay;
    }

    public int getTamingMob() {
        return eventTamingMob;
    }

    public int getHyper() {
        return hyper;
    }

    public int getReqLevel() {
        return reqLev;
    }

    public int getMaxDamageOver() {
        return maxDamageOver;
    }

    public int getBonusExpInfo(int level) {
        if (bonusExpInfo.isEmpty()) {
            return -1;
        }
        if (bonusExpInfo.containsKey(level)) {
            return bonusExpInfo.get(level);
        }
        return -1;
    }

    public Map<Integer, Integer> getBonusExpInfo() {
        return bonusExpInfo;
    }

    public boolean isMagic() {
        return magic;
    }

    public boolean isMovement() {
        return casterMove;
    }

    public boolean isPush() {
        return pushTarget;
    }

    public boolean isPull() {
        return pullTarget;
    }

    public boolean isBuffSkill() {
        return buffSkill;
    }

    public boolean isSummonSkill() {
        return summon;
    }

    public boolean isNonAttackSummon() {
        return summon && minionAttack.isEmpty() && (minionAbility.isEmpty() || minionAbility.equals("taunt"));
    }

    public boolean isNonExpireSummon() {
        return selfDestructMinion;
    }

    public boolean isHyperSkill() {
        return hyper > 0 && reqLev > 0;
    }

    public boolean isHyperStat() {
        return hyperStat > 0;
    }

    /**
     * @return 公會技能
     */
    public boolean isGuildSkill() {
        int jobId = id / 10000;
        return jobId == 9100;
    }

    /**
     * 新手技能
     */
    public boolean isBeginnerSkill() {
        int jobId = id / 10000;
        return JobConstants.notNeedSPSkill(jobId);
    }

    /**
     * 管理員技能
     */
    public boolean isAdminSkill() {
        int jobId = id / 10000;
        return jobId == 800 || jobId == 900;
    }

    /**
     * 內在能力技能
     */
    public boolean isInnerSkill() {
        int jobId = id / 10000;
        return jobId == 7000;
    }

    /**
     * 特殊技能
     */
    public boolean isSpecialSkill() {
        int jobId = id / 10000;
        return jobId == 7000 || jobId == 7100 || jobId == 8000 || jobId == 9000 || jobId == 9100 || jobId == 9200 || jobId == 9201 || jobId == 9202 || jobId == 9203 || jobId == 9204;
    }

    public int getSkillByJobBook() {
        return getSkillByJobBook(id);
    }

    public int getSkillByJobBook(int skillid) {
        final int n2;
        if ((n2 = skillid / 10000) / 1000 > 0 || n2 < 100) {
            return -1;
        }
        final int cj;
        if ((cj = SkillConstants.dY(n2)) == 4 && skillid % 10000 == 1054) {
            return 5;
        }
        return cj;
//        switch (skillid / 10000) {
//            case 112:
//            case 122:
//            case 132:
//            case 212:
//            case 222:
//            case 232:
//            case 312:
//            case 322:
//            case 412:
//            case 422:
//            case 512:
//            case 522:
//                return 4;
//            case 111:
//            case 121:
//            case 131:
//            case 211:
//            case 221:
//            case 231:
//            case 311:
//            case 321:
//            case 411:
//            case 421:
//            case 511:
//            case 521:
//                return 3;
//            case 110:
//            case 120:
//            case 130:
//            case 210:
//            case 220:
//            case 230:
//            case 310:
//            case 320:
//            case 410:
//            case 420:
//            case 510:
//            case 520:
//                return 2;
//            case 100:
//            case 200:
//            case 300:
//            case 400:
//            case 500:
//                return 1;
//        }
//        return -1;
    }

    /**
     * 是否寵物被動觸發技能
     */
    public boolean isPetPassive() {
        return petPassive;
    }

    /**
     * 觸發技能的套裝ID
     */
    public int getSetItemReason() {
        return setItemReason;
    }

    /**
     * 觸發技能的套裝需要的件數
     */
    public int geSetItemPartsCount() {
        return setItemPartsCount;
    }

    /**
     * 是否是開關技能
     *
     * @return
     */
    public boolean isSwitch() {
        return isSwitch;
    }

    /*
     * 種族特性本能技能
     */
    public boolean isTeachSkills() {
        return SkillConstants.isTeachSkills(id);
    }

    /*
     * 鏈接技能技能
     */
    public boolean isLinkSkills() {
        return SkillConstants.isLinkSkills(id);
    }

    public boolean is老技能() {
        switch (id) {
            case 聖魂劍士.魔天一擊:
            case 聖魂劍士.劍氣縱橫:
            case 聖魂劍士.靈魂:
            case 聖魂劍士.自身強化:
            case 聖魂劍士.HP增加:
            case 聖魂劍士.守護拳套_防具:
            case 聖魂劍士.精準之劍_舊:
            case 聖魂劍士.快速之劍:
            case 聖魂劍士.終極攻擊:
            case 聖魂劍士.憤怒:
            case 聖魂劍士.靈魂之刃:
            case 聖魂劍士.雙連斬:
            case 聖魂劍士.靈魂迅移:
            case 聖魂劍士.反射之盾:
            case 聖魂劍士.體能訓練:
            case 聖魂劍士.魔力恢復:
            case 聖魂劍士.鬥氣集中:
            case 聖魂劍士.黑暗之劍:
            case 聖魂劍士.昏迷之劍:
            case 聖魂劍士.英勇狂斬:
            case 聖魂劍士.進階鬥氣:
            case 聖魂劍士.靈魂突刺:
            case 聖魂劍士.閃耀激發:
            case 聖魂劍士.魔防消除:
            case 烈焰巫師.魔力爪:
            case 烈焰巫師.火牢術:
            case 烈焰巫師.魔心防禦:
            case 烈焰巫師.魔力之盾:
            case 烈焰巫師.MP增加:
            case 烈焰巫師.自然力變弱:
            case 烈焰巫師.精神強力:
            case 烈焰巫師.緩速術:
            case 烈焰巫師.火焰箭:
            case 烈焰巫師.瞬間移動:
            case 烈焰巫師.極速詠唱:
            case 烈焰巫師.自然力重置:
            case 烈焰巫師.火柱:
            case 烈焰巫師.咒語精通:
            case 烈焰巫師.智慧昇華:
            case 烈焰巫師.魔法爆擊:
            case 烈焰巫師.魔力激發:
            case 烈焰巫師.魔法封印:
            case 烈焰巫師.火流星:
            case 烈焰巫師.召喚火魔:
            case 烈焰巫師.火牢術屏障:
            case 烈焰巫師.火風暴:
            case 烈焰巫師.瞬間移動精通:
            case 破風使者.暴風:
            case 破風使者.精通射手:
            case 破風使者.二連箭:
            case 破風使者.霸王箭:
            case 破風使者.自然吸血術:
            case 破風使者.精準之弓_舊:
            case 破風使者.四連箭:
            case 破風使者.暴風射擊:
            case 破風使者.雙重跳躍:
            case 破風使者.快速之箭:
            case 破風使者.終極攻擊:
            case 破風使者.無形之箭:
            case 破風使者.風影漫步_舊:
            case 破風使者.體能訓練_舊:
            case 破風使者.箭雨:
            case 破風使者.集中:
            case 破風使者.暴風神射:
            case 破風使者.弓術精通_舊:
            case 破風使者.替身術:
            case 破風使者.阿爾法_舊:
            case 破風使者.疾風光速神弩:
            case 破風使者.疾風掃射:
            case 破風使者.躲避:
            case 破風使者.致命箭:
            case 暗夜行者.幻體功:
            case 暗夜行者.隱身術_舊:
            case 暗夜行者.雙飛斬_舊:
            case 暗夜行者.黑暗雷鳥:
            case 暗夜行者.魔心妙手術:
            case 暗夜行者.速度激發:
            case 暗夜行者.靈敏身體:
            case 暗夜行者.精準暗器:
            case 暗夜行者.強力投擲:
            case 暗夜行者.極速暗殺:
            case 暗夜行者.二段跳:
            case 暗夜行者.吸血:
            case 暗夜行者.體能訓練_舊:
            case 暗夜行者.爆破鏢:
            case 暗夜行者.護身神風:
            case 暗夜行者.影分身:
            case 暗夜行者.影網術:
            case 暗夜行者.飛毒殺:
            case 暗夜行者.四飛閃:
            case 暗夜行者.毒炸彈:
            case 暗夜行者.無形鏢_舊:
            case 暗夜行者.陰影分裂:
            case 暗夜行者.激進黑暗:
            case 暗夜行者.絕殺領域:
            case 暗夜行者.藥劑精通:
            case 閃雷悍將.極限迴避:
            case 閃雷悍將.旋風斬:
            case 閃雷悍將.衝鋒:
            case 閃雷悍將.閃電:
            case 閃雷悍將.機遇攻擊:
            case 閃雷悍將.初階爆擊:
            case 閃雷悍將.Null:
            case 閃雷悍將.增加生命:
            case 閃雷悍將.精通指虎_舊:
            case 閃雷悍將.致命快打_舊:
            case 閃雷悍將.狂暴衝擊:
            case 閃雷悍將.蓄能激發:
            case 閃雷悍將.能量爆擊:
            case 閃雷悍將.全神貫注:
            case 閃雷悍將.體能訓練:
            case 閃雷悍將.颶風飛擊:
            case 閃雷悍將.閃_連殺:
            case 閃雷悍將.最終極速_舊:
            case 閃雷悍將.閃光擊:
            case 閃雷悍將.鯨噬:
            case 閃雷悍將.能量爆發:
            case 閃雷悍將.爆擊鬥氣:
            case 閃雷悍將.致命暗襲:
            case 閃雷悍將.幸運骰子:
            case 閃雷悍將.衝擊波:
                return true;
        }
        return false;
    }

    public boolean isAngelSkill() {
        return SkillConstants.is天使祝福戒指(id);
    }

    public boolean isLinkedAttackSkill() {
        return SkillConstants.isLinkedAttackSkill(id);
    }

    public boolean isDefaultSkill() {
        return getFixLevel() > 0;
    }

    public int getPPRecovery() {
        return ppRecovery;
    }

    public boolean isSoulSkill() {
        return soulSkill;
    }

    public void setSoulSkill(boolean soulSkill) {
        this.soulSkill = soulSkill;
    }

    public boolean isNotCooltimeReduce() {
        return notCooltimeReduce;
    }

    public boolean isNotCooltimeReset() {
        return notCooltimeReset;
    }

    public boolean isMesToBoss() {
        return mesToBoss;
    }

    public boolean isMobSkill() {
        return mobSkill;
    }

    public int getVehicleID() {
        return vehicleID;
    }

    public boolean isProfession() {
        return profession;
    }

    public boolean isIgnoreCounter() {
        return ignoreCounter;
    }

    public int getHitTime() {
        return hitTime;
    }

    public AbstractSkillHandler getHandler() {
        return SkillClassFetcher.getHandlerBySkill(id);
    }

    public void setRecipe(boolean recipe) {
        this.recipe = recipe;
    }

    public boolean isRecipe() {
        return recipe;
    }

    private enum SkillType {

        BUFF_ICO(10),
        PASSIVE(30, 31, 50, 51),//不同類型的被動技能
        PASSIVE_TRUE(50),//唯一類型的被動技能
        MONSTER_DEBUFF(32),//怪物異常效果技能
        SPAWN_OBJECT(33),//基本上全是召喚類技能
        MONSTER_DEBUFF_OR_CANCEL(34),//用於取消怪物特定效果的技能
        SINGLE_EFFECT(35),//非攻擊技能 楓葉淨化
        PROTECTIVE_MIST(36),//在地圖中召喚中特定的技能效果 如（煙幕彈）
        RESURRECT(38),//復活玩家技能
        MOVEMENT(40),//移動相關技能
        MOVEMENT_RANDOM(42),//龍之氣息 隨便移動到地圖上某個地方
        KEY_COMBO_ATTACK(52),//連擊技能
        COVER_SKILL(98),//雙重攻擊 終極攻擊 超級體 重裝武器精通 猴子衝擊
        ;//效果分類是特別奇怪的··但基本上都是 >= 10 (不包含上述聲明)
        final int[] vals;

        SkillType(int... vals) {
            this.vals = vals;
        }
    }

    @Override
    public String toString() {
        return SkillFactory.getSkillName(id) + "(" + id + ")";
    }

    /**
     * **
     * 是否顯示召喚獸圖標
     *
     * @return
     */
    public boolean isSummonedBuffIcon() {
        return showSummonedBuffIcon;
    }

    public boolean isInfo(SkillInfo info) {
        if (this.info.containsKey(info)) {
            return true;
        }
        return false;
    }

    public boolean getMesInfo(SkillMesInfo info) {
        for (SkillMesInfo skillMesInfo : MesList) {
            if (skillMesInfo == info) {
                return true;
            }
        }
        return false;
    }

    public List<Integer> getSkillList() {
        return skillList;
    }
}
