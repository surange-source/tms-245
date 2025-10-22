package client.skills.handler.其他;

import client.*;
import client.skills.Skill;
import client.skills.SkillEntry;
import client.skills.SkillFactory;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.status.MonsterStatus;
import constants.JobConstants;
import constants.SkillConstants;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.maps.MapleMapObject;
import server.Randomizer;
import tools.data.MaplePacketReader;

import java.awt.*;
import java.lang.reflect.Field;
import java.util.*;
import java.util.List;

import static constants.skills.幻獸師.*;

public class 幻獸師 extends AbstractSkillHandler {

    public 幻獸師() {
        jobs = new MapleJob[] {
                MapleJob.幻獸師,
                MapleJob.幻獸師1轉,
                MapleJob.幻獸師2轉,
                MapleJob.幻獸師3轉,
                MapleJob.幻獸師4轉
        };

        for (Field field : constants.skills.幻獸師.class.getDeclaredFields()) {
            try {
                skills.add(field.getInt(field.getName()));
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public int baseSkills(MapleCharacter chr, SkillClassApplier applier) {
        Skill skil;
        int level = chr.getLevel();
        int[] ss = {守護者的敏捷身姿, 解除模式, 召喚熊熊, 召喚雪豹, 召喚雀鷹, 召喚貓咪, 精靈召喚模式, 回歸樹木村莊};
        for (int i : ss) {
            skil = SkillFactory.getSkill(i);
            if (skil != null && chr.getSkillLevel(skil) <= 0) {
                applier.skillMap.put(i, new SkillEntry(1, (byte) 1, -1));
            }
        }
        int[] skillIds = {解除模式, 召喚熊熊, 召喚雪豹, 守護者的敏捷身姿, 精靈召喚模式, 召喚雀鷹, 召喚貓咪};
        for (int i : skillIds) {
            if (i == 召喚雀鷹 && level < 30) {
                continue;
            }
            if (i == 召喚貓咪 && level < 50) {
                continue;
            }
            skil = SkillFactory.getSkill(i);
            if (skil != null && chr.getSkillLevel(skil) <= 0) {
                applier.skillMap.put(i, new SkillEntry((byte) 1, (byte) 1, -1));
            }
        }
        //武器鍛鍊 30級開始自動學習 技能最大等級10    10級技能增加1級
        skil = SkillFactory.getSkill(武器鍛鍊);
        if (skil != null && level >= 30) {
            int oldskilllevel = chr.getSkillLevel(skil);
            int newskilllevel = level / 10 - 2;
            if (newskilllevel > skil.getMaxLevel()) {
                newskilllevel = skil.getMaxLevel();
            }
            if (newskilllevel > 0 && newskilllevel > oldskilllevel && oldskilllevel < skil.getMaxLevel()) {
                applier.skillMap.put(武器鍛鍊, new SkillEntry((byte) newskilllevel, (byte) skil.getMaxLevel(), -1));
            }
        }
        //幻獸師的意志 150級學習 技能最大等級5
        if (level >= 150) {
            skil = SkillFactory.getSkill(幻獸師的意志);
            if (skil != null && chr.getSkillLevel(skil) <= 0) {
                applier.skillMap.put(幻獸師的意志, new SkillEntry((byte) skil.getMaxLevel(), (byte) skil.getMaxLevel(), -1));
            }
        }
        return -1;
    }

    public int getLinkedSkillID(int skillId) {
        switch (skillId) {
            case 波波揮擊2:
            case 波波揮擊3:
            case 熊3_5重攻擊:
                return 波波揮擊;
            case 萊伊痛擊_1:
                return 萊伊痛擊;
            case 隊伍轟炸_1:
                return 隊伍轟炸;
            case red_card:
            case blue_card:
            case green_card:
                return 阿樂卡牌;
            case 阿樂卡牌_黃金卡牌:
                return 黃金卡牌;
            case 朋友發射2:
            case 朋友發射3:
            case 朋友發射4:
                return 朋友發射;
            case 歡樂派對:
            case 歡樂派對_1:
            case 歡樂派對_2:
            case 歡樂派對_3:
            case 歡樂派對_4:
            case 歡樂派對_5:
            case 歡樂派對_6:
            case 歡樂派對_7:
            case 歡樂派對_8:
            case 歡樂派對_9:
            case 歡樂派對_10:
            case 歡樂派對_11:
            case 歡樂派對_12:
            case 歡樂派對_13:
                return 幻獸師派對時間;
            case 小動物大進擊_1:
            case 小動物大進擊_2:
            case 小動物大進擊_3:
            case 小動物大進擊_4:
                return 小動物大進擊;
            case Aerial_Relief:
            case Aerial_Relief_1:
            case Aerial_Relief_2:
                return 動物朋友大進擊;
            case 好戲上場_1:
            case 好戲上場_波波:
            case 好戲上場_萊伊:
            case 好戲上場_艾卡:
            case 好戲上場_阿樂:
                return 好戲上場;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 召喚熊熊:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.AnimalChange, 1);
                return 1;
            case 召喚雪豹:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.AnimalChange, 2);
                return 1;
            case 召喚雀鷹:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.AnimalChange, 3);
                return 1;
            case 召喚貓咪:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.AnimalChange, 4);
                return 1;
            case 楓葉祝福:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.BasicStatUp, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 小豹呼喚:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                //statups.put(MapleBuffStat.PinkbeanMinibeenMove, effect.getInfo().get(MapleStatInfo.prop));
                return 1;
            case 艾卡眼睛強化:
                statups.put(MapleBuffStat.IndieCr, effect.getInfo().get(MapleStatInfo.indieCr));
                return 1;
            case 阿樂的朋友們:
                effect.getInfo().put(MapleStatInfo.time, 12000);
                statups.put(MapleBuffStat.經驗獲得, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 阿樂的竊取:
                effect.getInfo().put(MapleStatInfo.time, 12000);
                statups.put(MapleBuffStat.IndieDropRIncrease, effect.getInfo().get(MapleStatInfo.v));
                return 1;
            case 阿樂的指甲:
                effect.getInfo().put(MapleStatInfo.time, 12000);
                statups.put(MapleBuffStat.IndieCr, effect.getInfo().get(MapleStatInfo.x));
                statups.put(MapleBuffStat.IndieCD, effect.getInfo().get(MapleStatInfo.y));
                return 1;
            case 強化阿樂的魅力:
                effect.getInfo().put(MapleStatInfo.time, 12000);
                statups.put(MapleBuffStat.IndiePAD, effect.getInfo().get(MapleStatInfo.indiePad));
                statups.put(MapleBuffStat.IndieMAD, effect.getInfo().get(MapleStatInfo.indieMad));
                return 1;
            case 阿樂的弱點探索:
                effect.getInfo().put(MapleStatInfo.time, 12000);
                statups.put(MapleBuffStat.IgnoreTargetDEF, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 阿樂的飽足感:
                effect.getInfo().put(MapleStatInfo.time, 12000);
                statups.put(MapleBuffStat.IndieMHP, effect.getInfo().get(MapleStatInfo.indieMhp));
                statups.put(MapleBuffStat.IndieMMP, effect.getInfo().get(MapleStatInfo.indieMmp));
                return 1;
            case red_card:
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case blue_card:
                statups.put(MapleBuffStat.PDD, effect.getInfo().get(MapleStatInfo.pdd));
                statups.put(MapleBuffStat.IndieMHPR, effect.getInfo().get(MapleStatInfo.indieMhpR));
                statups.put(MapleBuffStat.IndieMMPR, effect.getInfo().get(MapleStatInfo.indieMmpR));
                return 1;
            case green_card:
                statups.put(MapleBuffStat.IndieSpeed, effect.getInfo().get(MapleStatInfo.indieSpeed));
                statups.put(MapleBuffStat.IndieBooster, effect.getInfo().get(MapleStatInfo.indieBooster));
                return 1;
            case 阿樂卡牌_黃金卡牌:
                statups.put(MapleBuffStat.PDD, effect.getInfo().get(MapleStatInfo.pdd));
                statups.put(MapleBuffStat.IndieMHPR, effect.getInfo().get(MapleStatInfo.indieMhpR));
                statups.put(MapleBuffStat.IndieMMPR, effect.getInfo().get(MapleStatInfo.indieMmpR));
                statups.put(MapleBuffStat.IndieSpeed, effect.getInfo().get(MapleStatInfo.indieSpeed));
                statups.put(MapleBuffStat.IndieBooster, effect.getInfo().get(MapleStatInfo.indieBooster));
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 波波的重生:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.ReviveOnce, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 集中打擊:
                statups.put(MapleBuffStat.Enrage, effect.getInfo().get(MapleStatInfo.x));
                statups.put(MapleBuffStat.EnrageCr, effect.getInfo().get(MapleStatInfo.z));
                statups.put(MapleBuffStat.EnrageCrDamMin, effect.getInfo().get(MapleStatInfo.y));
                return 1;
            case 一起恰恰恰:
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                statups.put(MapleBuffStat.TeamRoar, 1);
                return 1;
            case 阿樂療癒:
                effect.setHpR(effect.getInfo().get(MapleStatInfo.hp) / 100.0);
                return 1;
            case 一起丟熊:
                effect.setOverTime(true);
                effect.getInfo().put(MapleStatInfo.time, effect.getInfo().get(MapleStatInfo.y));
                statups.put(MapleBuffStat.NotDamaged, 1);
                return 1;
            case 艾卡飛行:
                effect.getInfo().put(MapleStatInfo.time, effect.getInfo().get(MapleStatInfo.z) * 1000);
                statups.put(MapleBuffStat.NewFlying, 1);
                return 1;
            case 阿樂投擲:
                monsterStatus.put(MonsterStatus.PDR, effect.getInfo().get(MapleStatInfo.x));
                monsterStatus.put(MonsterStatus.MDR, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 艾卡腳趾強化:
            case 阿樂區域:
                monsterStatus.put(MonsterStatus.Burned, 1);
                return 1;
            case 全集中守護:
                statups.put(MapleBuffStat.IndieSummoned, 1);
                statups.put(MapleBuffStat.全集中守護, 1);
                return 1;
            case 好戲上場:
                statups.put(MapleBuffStat.好戲上場, 1);
                return 1;
        }
        return -1;
    }

    public int onSkillUse(MaplePacketReader slea, MapleClient c, MapleCharacter chr, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 阿樂卡牌:
            case 黃金卡牌: {
                MapleStatEffect effect1 = null;
                MapleStatEffect effect2;
                if ((effect2 = chr.getSkillEffect(黃金卡牌)) != null && Randomizer.isSuccess(effect2.getX())) {
                    effect1 = chr.getSkillEffect(阿樂卡牌_黃金卡牌);
                }
                final int[] allCards = {red_card, blue_card, green_card};
                if (effect1 != null || (effect1 = chr.getSkillEffect(allCards[Randomizer.nextInt(3)])) != null) {
                    effect1.applyTo(chr);
                }
                return 1;
            }
            case 小動物大進擊: {
                final int animalQty = Randomizer.rand(4, 8);
                final int[] allAnimalInfos = {小動物大進擊_1, 小動物大進擊_2, 小動物大進擊_3, 小動物大進擊_4};
                for (int animalSkillId : allAnimalInfos) {
                    chr.dispelEffect(animalSkillId);
                }
                for (int i = 0; i < animalQty; ++i) {
                    final MapleStatEffect skillEffect2;
                    if ((skillEffect2 = chr.getSkillEffect(allAnimalInfos[Randomizer.nextInt(4)])) != null) {
                        skillEffect2.applyTo(chr, new Point(chr.getPosition().x + Randomizer.rand(-200, 200), chr.getPosition().y), true);
                    }
                }
                return 1;
            }
            case 好戲上場: {
                applier.pos = slea.readPos();
                chr.getTempValues().remove("好戲上場AreaTime");
                int animalMode = chr.getBuffedIntValue(MapleBuffStat.AnimalChange);
                final int[] allAnimalInfos = {好戲上場_波波, 好戲上場_萊伊, 好戲上場_艾卡, 好戲上場_阿樂};
                int i = 0;
                for (int animalSkillId : allAnimalInfos) {
                    i++;
                    if (animalMode > 0 && animalMode <= allAnimalInfos.length && animalMode == i) {
                        continue;
                    }
                    chr.dispelEffect(animalSkillId);
                    final MapleStatEffect skillEffect2;
                    if ((skillEffect2 = chr.getSkillEffect(animalSkillId)) != null) {
                        skillEffect2.applyTo(chr, applier.pos, true);
                    }
                }
                return 1;
            }
        }
        return -1;
    }

    public static void CheckAnimalMode(MapleCharacter chr, int animalMode) {
        if (chr.getBuffStatValueHolder(全集中守護) == null) {
            if (animalMode == 1) {
                MapleStatEffect eff;
                if ((eff = chr.getSkillEffect(波波的重生)) != null && !chr.isSkillCooling(波波的重生)) {
                    eff.applyTo(chr);
                }
            }
            List<Integer> toRemove = new LinkedList<>();
            for (List<MapleBuffStatValueHolder> holders : chr.getAllEffects().values()) {
                if (holders == null) {
                    continue;
                }
                for (MapleBuffStatValueHolder holder : holders) {
                    Skill skill;
                    if (holder == null || holder.effect == null || !holder.effect.isSkill() || (skill = holder.effect.getSkill()) == null || skill.isVSkill() || skill.isHyperSkill() || SkillConstants.getLinkedAttackSkill(skill.getId()) == 阿樂卡牌 || SkillConstants.getLinkedAttackSkill(skill.getId()) == 黃金卡牌) {
                        continue;
                    }
                    int skillMode = skill.getId() / 10000;
                    if (skillMode == MapleJob.幻獸師.getId() || !JobConstants.is幻獸師(skillMode)) {
                        continue;
                    } else if (skillMode == MapleJob.幻獸師1轉.getId()) {
                        skillMode = 1;
                    } else if (skillMode == MapleJob.幻獸師2轉.getId()) {
                        skillMode = 2;
                    } else if (skillMode == MapleJob.幻獸師3轉.getId()) {
                        skillMode = 3;
                    } else if (skillMode == MapleJob.幻獸師4轉.getId()) {
                        skillMode = 4;
                    } else {
                        skillMode = 0;
                    }
                    if (animalMode != skillMode && !toRemove.contains(skill.getId())) {
                        toRemove.add(skill.getId());
                    }
                }
            }
            for (int skill : toRemove) {
                chr.dispelEffect(skill);
            }
        }
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 回歸樹木村莊: {
                applyto.changeMap(applier.effect.getX(), 0);
                return 1;
            }
            case 解除模式:
            case 召喚熊熊:
            case 召喚雪豹:
            case 召喚雀鷹:
            case 召喚貓咪: {
                int oldAnimalMode = -1;
                if (applyto.getBuffStatValueHolder(MapleBuffStat.好戲上場) != null) {
                    oldAnimalMode = applyto.getBuffedIntValue(MapleBuffStat.AnimalChange);
                }
                applyto.dispelEffect(MapleBuffStat.AnimalChange);
                int animalMode = applier.localstatups.getOrDefault(MapleBuffStat.AnimalChange, 0);
                CheckAnimalMode(applyto, animalMode);
                final int[] allAnimalInfos = {好戲上場_波波, 好戲上場_萊伊, 好戲上場_艾卡, 好戲上場_阿樂};
                if (oldAnimalMode != -1) {
                    if (animalMode > 0 && animalMode <= allAnimalInfos.length) {
                        applyto.dispelEffect(allAnimalInfos[animalMode - 1]);
                    }
                    final MapleStatEffect skillEffect2;
                    if (oldAnimalMode > 0 && oldAnimalMode <= allAnimalInfos.length && (skillEffect2 = applyto.getSkillEffect(allAnimalInfos[oldAnimalMode - 1])) != null) {
                        skillEffect2.applyTo(applyto, applyto.getPosition(), true);
                    }
                }
                return 1;
            }
            case 波波的重生:
                if (applier.passive) {
                    applier.localstatups.clear();
                    applier.duration = 10000;
                    applier.localstatups.put(MapleBuffStat.NotDamaged, 1);
                }
                return 1;
            case 全集中守護: {
                int[] skilllist = {波波的重生, 阿樂的朋友們, 阿樂的竊取, 阿樂的指甲, 強化阿樂的魅力, 阿樂的弱點探索, 阿樂的飽足感};
                MapleStatEffect eff;
                for (int i : skilllist) {
                    if ((eff = applyto.getSkillEffect(i)) != null) {
                        eff.applyTo(applyto, applier.duration);
                    }
                }
                return 1;
            }
            case 一起恰恰恰: {
                if (applyfrom == applyto) {
                    applier.maskedstatups.put(MapleBuffStat.IndieInvincible, 1);
                    applier.maskedDuration = applier.duration;
                }
                return 1;
            }
            case 小動物大進擊_1:
            case 小動物大進擊_2:
            case 小動物大進擊_3:
            case 小動物大進擊_4: {
                applier.cancelEffect = false;
                return 1;
            }
            case 好戲上場_波波:
            case 好戲上場_萊伊:
            case 好戲上場_艾卡:
            case 好戲上場_阿樂:
                MapleBuffStatValueHolder holder = applyto.getBuffStatValueHolder(MapleBuffStat.好戲上場);
                if (holder != null) {
                    applier.duration = holder.getLeftTime();
                }
                return 1;
        }
        return -1;
    }

    @Override
    public int onAfterAttack(MapleCharacter player, SkillClassApplier applier) {
        if (applier.effect != null && applier.effect.getSourceId() == 煙霧放屁 && applier.ai.isMagicAttack) {
            applier.effect.applyAffectedArea(player, player.getPosition());
        }
        if (applier.effect != null && applier.effect.getSourceId() == 阿樂區域) {
            applier.effect.applyAffectedArea(player, player.getPosition());
        }
        if (applier.effect != null && applier.effect.getSourceId() == 進擊_翻花繩) {
            applier.effect.applyAffectedArea(player, player.getPosition());
        }

        if (applier.effect != null && applier.effect.getSourceId() == 隊伍攻擊) {
            player.reduceSkillCooldown(艾卡飛行, 500);
        }
        if (player.getBuffStatValueHolder(MapleBuffStat.好戲上場) != null) {
            final MapleStatEffect skillEffect2;
            if ((skillEffect2 = player.getSkillEffect(好戲上場_1)) != null) {
                long currentTimeMillis = System.currentTimeMillis();
                if ((long) player.getTempValues().getOrDefault("好戲上場AreaTime", currentTimeMillis) <= currentTimeMillis) {
                    List<MapleMapObject> mobs = player.getMap().getMonstersInRange(player.getPosition(), 500);
                    if (mobs.size() > 0) {
                        player.getTempValues().put("好戲上場AreaTime", currentTimeMillis + skillEffect2.getX());
                    }
                    Collections.shuffle(mobs);
                    int i = 0;
                    for (MapleMapObject mo : mobs) {
                        if (skillEffect2.getY() <= i) {
                            break;
                        }
                        skillEffect2.applyAffectedArea(player, new Point(mo.getPosition().x, mo.getPosition().y - 335));
                        i++;
                    }
                }
            }
        }
        return 1;
    }
}
