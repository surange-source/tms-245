package client.skills.handler.冒險家;

import client.*;
import client.skills.ExtraSkill;
import client.skills.Skill;
import client.skills.SkillFactory;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.status.MonsterStatus;
import constants.enums.UserChatMessageType;
import constants.skills.通用V核心;
import handling.channel.handler.AttackMobInfo;
import handling.opcode.SendPacketOpcode;
import packet.AdelePacket;
import packet.EffectPacket;
import packet.MaplePacketCreator;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.maps.ForceAtomObject;
import tools.types.Pair;
import server.Randomizer;
import tools.data.MaplePacketLittleEndianWriter;

import java.awt.*;
import java.lang.reflect.Field;
import java.util.*;
import java.util.List;

import static constants.skills.拳霸.*;

public class 拳霸 extends AbstractSkillHandler {

    public 拳霸() {
        jobs = new MapleJob[] {
                MapleJob.打手,
                MapleJob.格鬥家,
                MapleJob.拳霸
        };

        for (Field field : constants.skills.拳霸.class.getDeclaredFields()) {
            try {
                skills.add(field.getInt(field.getName()));
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public int getLinkedSkillID(int skillId) {
        switch (skillId) {
            case 漩渦之躍_null:
                return 漩渦之躍;
            case 海龍_null:
            case 海龍爆裂_1:
            case 海龍爆裂:
                return 海龍;
            case 強化海龍I_1:
                return 強化海龍I;
            case 海龍石_1:
            case 海龍突襲:
            case 海龍突襲_1:
                return 海龍石;
            case 海龍爆裂II:
            case 海龍爆裂II_1:
            case 海龍之怒:
            case 海龍之怒_1:
                return 強化海龍II;
            case 海龍突擊之怒_1:
                return 海龍突擊之怒;
            case 戰艦鯨魚號_1:
                return 戰艦鯨魚號;
            case 海龍之魂_1:
                return 海龍之魂;
            case 海之霸主_1:
            case 海之霸主_2:
            case 海之霸主_3:
                return 海之霸主;
            case 海龍正拳_1:
                return 海龍正拳;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 海龍:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.海龍, 1);
                return 1;
            case 海龍石:
                statups.put(MapleBuffStat.海龍石, 1);
                return 1;
            case 海龍石_1:
                statups.put(MapleBuffStat.IndieSummoned, 1);
                return 1;
            case 昏迷精通:
                effect.getInfo().put(MapleStatInfo.time, 3000);

                monsterStatus.put(MonsterStatus.Stun, 1);
                return 1;
            case 攻擊姿態:
                effect.getInfo().put(MapleStatInfo.cooltimeMS, 500);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 最終極速:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.PartyBooster, -2);
                return 1;
            case 時間置換:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.ViperTimeLeap, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 暴能續發:
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 轉身踢擊:
                monsterStatus.put(MonsterStatus.Stun, 1);
                return 1;
            case 幸運骰子:
            case 雙倍幸運骰子:
                statups.put(MapleBuffStat.Dice, 0);
                return 1;
            case 拳霸大師:
                statups.put(MapleBuffStat.IndiePADR, effect.getInfo().get(MapleStatInfo.indiePadR));
                return 1;
            case 戰艦鯨魚號:
                statups.put(MapleBuffStat.NautilusFinalAttack, 1);
                return 1;
            case 楓葉祝福:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.BasicStatUp, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 傳說冒險:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 海龍之魂:
                effect.setOverTime(true);
                statups.put(MapleBuffStat.IndieSummoned, 1);
                return 1;
            case 海龍之魂_1:
                statups.put(MapleBuffStat.UnityOfPower, 0);
                return 1;
            case 海之霸主:
                statups.put(MapleBuffStat.海之霸主, effect.getInfo().get(MapleStatInfo.w));
                statups.put(MapleBuffStat.IndiePMdR, effect.getInfo().get(MapleStatInfo.indiePMdR));
                return 1;
            case 海龍螺旋:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.海龍螺旋, effect.getV());
                return 1;
            case 海龍衝鋒:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.Bullet_Count, 0);
                return 1;
        }
        return -1;
    }

    @Override
    public int onApplyTo(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 海龍螺旋: {
                if (applier.primary) {
                    MapleBuffStatValueHolder mbsvh = applyto.getBuffStatValueHolder(暴能續發);
                    if (mbsvh != null) {
                        applier.cooldown = applier.cooldown * (100 - (mbsvh.effect == null ? 50 : mbsvh.effect.getY())) / 100;
                    }
                } else {
                    applier.cooldown = 0;
                }
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 海龍石: {
                MapleStatEffect effect = SkillFactory.getSkill(海龍石_1).getEffect(applier.effect.getLevel());
                if (applier.primary) {
                    if (applyto.getBuffedIntValue(MapleBuffStat.海龍石) < applier.effect.getU() || effect == null) {
                        return 0;
                    }
                    applyto.dispelEffect(MapleBuffStat.海龍石);
                    effect.applyBuffEffect(applyfrom, applyto, applier.effect.getBuffDuration(applyfrom), false, false, true, null);
                    return 0;
                } else {
                    applier.localstatups.put(MapleBuffStat.海龍石, Math.min(applier.effect.getU(), applyto.getBuffedIntValue(MapleBuffStat.海龍石) + 1));
                    if (effect != null && applier.localstatups.get(MapleBuffStat.海龍石) >= applier.effect.getU()) {
                        if ("1".equals(applyto.getOneInfo(1544, String.valueOf(海龍石)))) {
                            applyto.dispelEffect(MapleBuffStat.海龍石);
                            effect.applyBuffEffect(applyfrom, applyto, applier.effect.getBuffDuration(applyfrom), false, false, true, null);
                        }
                        return 0;
                    }
                    return 1;
                }
            }
            case 時間置換: {
                if (applyto.getBuffedValue(MapleBuffStat.ViperTimeLeap) != null) {
                    return 0;
                }
                applyto.clearCooldown(true);
                return 1;
            }
            case 海龍之魂_1: {
                applier.localstatups.put(MapleBuffStat.UnityOfPower, Math.min(applier.effect.getU(), applyto.getBuffedIntValue(MapleBuffStat.UnityOfPower) + 1));
                return 1;
            }
            case 幸運骰子: {
                int dice = Randomizer.nextInt(6) + 1;
                if (applyto.getSpecialStat().getRemoteDice() > 0) {
                    dice = applyto.getSpecialStat().getRemoteDice();
                    applyto.getSpecialStat().setRemoteDice(-1);
                }
                if (dice == 1) {
                    applyto.reduceSkillCooldown(幸運骰子, 90000);
                }
                applyto.send(MaplePacketCreator.spouseMessage(UserChatMessageType.系統, "幸運骰子 技能發動[" + dice + "]號效果。"));
                applier.localstatups.put(MapleBuffStat.Dice, dice);
                applyto.getClient().announce(EffectPacket.showDiceEffect(-1, applier.effect.getSourceId(), applier.effect.getLevel(), dice, -1, false));
                applyto.getMap().broadcastMessage(applyto, EffectPacket.showDiceEffect(applyto.getId(), applier.effect.getSourceId(), applier.effect.getLevel(), dice, -1, false), false);
                return 1;
            }
            case 雙倍幸運骰子: {
                int remote = 0;
                int trueSource = applier.effect.getSourceId();
                int trueLevel = applier.effect.getLevel();
                MapleStatEffect effect = applyfrom.getSkillEffect(通用V核心.海盜通用.滿載骰子);
                if (effect != null) {
                    remote = applyfrom.getBuffedIntValue(MapleBuffStat.滿載骰子);
                    trueSource = effect.getSourceId();
                    trueLevel = effect.getLevel();
                }
                boolean seven = applyfrom.getSkillEffect(雙倍幸運骰子_替代數字) != null;
                int prop = 0;
                Object chance = applyfrom.getTempValues().remove("雙倍幸運骰子_再一次機會");
                if (chance instanceof Boolean && (boolean) chance) {
                    prop = 100;
                } else {
                    effect = applyfrom.getSkillEffect(雙倍幸運骰子_效果強化);
                    if (effect != null) {
                        prop = effect.getProp();
                    }
                }
                int[] array = new int[1 + (trueSource == 通用V核心.海盜通用.滿載骰子 ? 1 : 0) + (applier.effect.makeChanceResult(applyto) ? 1 : 0)];
                for (int i = 0; i < array.length; i++) {
                    if (i == 0 && remote > 0) {
                        array[i] = remote;
                    } else {
                        array[i] = Randomizer.rand(Randomizer.isSuccess(prop) ? 4 : 1, seven ? 7 : 6);
                        if (array.length == 3 && array[0] == array[1] && array[1] == array[2] && Randomizer.isSuccess(50)) {
                            array[i] = Randomizer.rand(Randomizer.isSuccess(prop) ? 4 : 1, seven ? 7 : 6);
                        }
                    }
                }
                int buffId = 0;
                for (int i = 0; i < array.length; i++) {
                    if (array[i] == 1) {
                        applyto.reduceSkillCooldown(雙倍幸運骰子, 90000);
                    }
                    buffId += array[i] * (int) Math.pow(10, i);
                    if (array[i] > 0) {
                        applyto.send(MaplePacketCreator.spouseMessage(UserChatMessageType.系統, "雙倍幸運骰子 技能發動[" + array[i] + "]號效果。"));
                    }
                }
                if (array.length < 2 || (array.length < 3 && trueSource == 通用V核心.海盜通用.滿載骰子)) {
                    effect = applyfrom.getSkillEffect(雙倍幸運骰子_再一次機會);
                    if (effect != null && effect.makeChanceResult(applyfrom)) {
                        applyto.cancelSkillCooldown(雙倍幸運骰子);
                        applyfrom.getTempValues().put("雙倍幸運骰子_再一次機會", true);
                    }
                }
                if (trueSource == 通用V核心.海盜通用.滿載骰子) {
                    applyto.getClient().announce(EffectPacket.showDiceEffect(-1, trueSource, trueLevel, -1, 1, false));
                    applyto.getMap().broadcastMessage(applyto, EffectPacket.showDiceEffect(applyto.getId(), trueSource, trueLevel, -1, 1, false), false);
                    for (int i = 0; i < array.length; i++) {
                        if (array[i] > 0) {
                            applyto.getClient().announce(EffectPacket.showDiceEffect(-1, trueSource, trueLevel, array[i], i == array.length - 1 ? 0 : -1, i != 0));
                            applyto.getMap().broadcastMessage(applyto, EffectPacket.showDiceEffect(applyto.getId(), trueSource, trueLevel, array[i], i == array.length - 1 ? 0 : -1, i != 0), false);
                        }
                    }
                    applyto.getClient().announce(EffectPacket.showDiceEffect(-1, trueSource, trueLevel, -1, 2, false));
                    applyto.getMap().broadcastMessage(applyto, EffectPacket.showDiceEffect(applyto.getId(), trueSource, trueLevel, -1, 2, false), false);
                } else {
                    applyto.getClient().announce(EffectPacket.showDiceEffect(-1, trueSource, trueLevel, buffId, -1, false));
                    applyto.getMap().broadcastMessage(applyto, EffectPacket.showDiceEffect(applyto.getId(), trueSource, trueLevel, buffId, -1, false), false);
                }
                applier.localstatups.put(MapleBuffStat.Dice, buffId);
                return 1;
            }
            case 海龍突擊之怒_1: {
                if (applier.primary) {
                    ForceAtomObject obj = new ForceAtomObject(applyto.getSpecialStat().gainForceCounter(), 36, 0, applyto.getId(), 0, applier.effect.getSourceId());
                    obj.EnableDelay = 1080;
                    obj.Idk1 = 30;
                    obj.Expire = 5000;
                    obj.Position = new Point(0, 15);
                    obj.ObjPosition = new Point(applier.pos != null ? applier.pos : applyto.getPosition());
                    applyto.getMap().broadcastMessage(AdelePacket.ForceAtomObject(applyto.getId(), Collections.singletonList(obj), 0), applyto.getPosition());
                }
                return 1;
            }
            case 傳說冒險: {
                if (applyfrom.getJob() / 1000 != applyto.getJob() / 1000) {
                    return 0;
                }
                applyto.dispelEffect(constants.skills.英雄.傳說冒險);
                applyto.dispelEffect(constants.skills.聖騎士.傳說冒險);
                applyto.dispelEffect(constants.skills.黑騎士.傳說冒險);
                applyto.dispelEffect(constants.skills.火毒.傳說冒險);
                applyto.dispelEffect(constants.skills.冰雷.傳說冒險);
                applyto.dispelEffect(constants.skills.主教.傳說冒險);
                applyto.dispelEffect(constants.skills.箭神.傳說冒險);
                applyto.dispelEffect(constants.skills.神射手.傳說冒險);
                applyto.dispelEffect(constants.skills.開拓者.傳說冒險);
                applyto.dispelEffect(constants.skills.暗影神偷.傳說冒險);
                applyto.dispelEffect(constants.skills.夜使者.傳說冒險);
                applyto.dispelEffect(constants.skills.影武者.傳說冒險);
                applyto.dispelEffect(constants.skills.拳霸.傳說冒險);
                applyto.dispelEffect(constants.skills.槍神.傳說冒險);
                applyto.dispelEffect(constants.skills.重砲指揮官.傳說冒險);
                return 1;
            }
            case 海之霸主: {
                int value = applyto.getBuffedIntValue(MapleBuffStat.海之霸主);
                if (applyto.getBuffedValue(MapleBuffStat.海之霸主) == null) {
                    return 1;
                }
                applier.localstatups.put(MapleBuffStat.海之霸主, --value);
                if (value <= 0) {
                    applier.overwrite = false;
                    applier.localstatups.clear();
                }
                return 1;
            }
            case 海之霸主_1: {
                if (applier.primary) {
                    applyto.getSkillEffect(海之霸主).applyTo(applyto);
                }
                return 0;
            }
            case 海龍螺旋: {
                if (!applier.primary) {
                    return 0;
                }
                return 1;
            }
            case 海龍衝鋒: {
                final int nCount = applyto.getBuffedIntValue(MapleBuffStat.Bullet_Count) + (!applier.att ? 1 : -1);
                if (nCount < 0 || nCount > applier.effect.getY()) {
                    return 0;
                }
                applier.duration = 2100000000;
                applier.localstatups.put(MapleBuffStat.Bullet_Count, nCount);
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onAfterRegisterEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 海龍螺旋: {
                MapleBuffStatValueHolder mbsvh = applyto.getBuffStatValueHolder(MapleBuffStat.海龍螺旋, applier.effect.getSourceId());
                if (mbsvh != null) {
                    mbsvh.AttackBossCount = applier.effect.getQ();
                    mbsvh.NormalMobKillCount = applier.effect.getW2();
                }
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyAttackEffect(MapleCharacter applyfrom, MapleMonster applyto, SkillClassApplier applier) {
        final MapleStatEffect effect;
        if ((effect = applyfrom.getSkillEffect(昏迷精通)) != null) {
            effect.applyMonsterEffect(applyfrom, applyto, effect.getMobDebuffDuration(applyfrom));
        }
        MapleBuffStatValueHolder mbsvh;
        if (applier.effect != null && !applyto.isBoss() && !applyto.isAlive() && applier.effect.getSourceId() == 海龍螺旋 && (mbsvh = applyfrom.getBuffStatValueHolder(MapleBuffStat.海龍螺旋)) != null) {
            mbsvh.NormalMobKillCount -= 1;
            if (mbsvh.NormalMobKillCount <= 0) {
                mbsvh.NormalMobKillCount = applier.effect.getW2();
                applyfrom.reduceSkillCooldown(海龍螺旋, applier.effect.getW());
            }
        }
        return 1;
    }

    @Override
    public int onAfterAttack(MapleCharacter player, SkillClassApplier applier) {
        if (!applier.ai.mobAttackInfo.isEmpty()) {
            MapleStatEffect effect;
            if (!player.isSkillCooling(攻擊姿態) && (effect = player.getSkillEffect(攻擊姿態)) != null) {
                player.registerSkillCooldown(effect, true);
                effect.applyBuffEffect(player, player, effect.getBuffDuration(player), false, false, true, null);
            }
            MapleBuffStatValueHolder mbsvh;
            if (applier.effect != null) {
                List<Pair<Long, Integer>> debuffInfos = null;
                if ((mbsvh = player.getBuffStatValueHolder(MapleBuffStat.IndieSummoned, 海龍之魂)) != null && mbsvh.effect != null) {
                    effect = null;
                    Skill skill = SkillFactory.getSkill(海龍之魂_1);
                    if (skill != null) {
                        effect = skill.getEffect(mbsvh.effect.getLevel());
                    }
                    if (effect != null) {
                        debuffInfos = (List<Pair<Long, Integer>>) player.getTempValues().getOrDefault("海龍標記Debuff", new LinkedList<>());
                        long now = System.currentTimeMillis();
                        for (AttackMobInfo ami : applier.ai.mobAttackInfo) {
                            for (Pair<Long, Integer> pair : debuffInfos) {
                                if (pair.left > now && pair.right == ami.mobId) {
                                    effect.applyBuffEffect(player, player, effect.getBuffDuration(player), false, false, true, null);
                                    break;
                                }
                            }
                        }
                    }
                }
                if (applier.effect.getSourceId() == 海龍之怒_1) {
                    if (debuffInfos == null) {
                        debuffInfos = (List<Pair<Long, Integer>>) player.getTempValues().getOrDefault("海龍標記Debuff", new LinkedList<>());
                    }
                    long endTime = System.currentTimeMillis() + applier.effect.getDuration();
                    for (AttackMobInfo ami : applier.ai.mobAttackInfo) {
                        boolean found = false;
                        for (Pair<Long, Integer> pair : debuffInfos) {
                            if (pair.right == ami.mobId) {
                                pair.left = endTime;
                                found = true;
                            }
                        }
                        if (!found) {
                            debuffInfos.add(new Pair(endTime, ami.mobId));
                        }
                    }
                    sendViperMark(player);
                    player.getTempValues().put("海龍標記Debuff", debuffInfos);
                }
            }
            if (applier.effect != null && applier.effect.getSourceId() == 海龍螺旋 && (mbsvh = player.getBuffStatValueHolder(MapleBuffStat.海龍螺旋)) != null) {
                boolean normal = false;
                for (AttackMobInfo ami : applier.ai.mobAttackInfo) {
                    if (MapleLifeFactory.getMonsterStats(ami.templateID).isBoss()) {
                        mbsvh.AttackBossCount -= 1;
                        if (mbsvh.AttackBossCount <= 0) {
                            mbsvh.AttackBossCount = applier.effect.getQ();
                            normal = true;
                        }
                    } else {
                        normal = true;
                    }
                }
                if (normal) {
                    mbsvh.value -= 1;
                }
                if (mbsvh.value <= 0) {
                    player.dispelEffect(applier.effect.getSourceId());
                }
            }
        }
        if (applier.effect != null) {
            switch (applier.effect.getSourceId()) {
                case 衝擊波:
                case 轉身踢擊:
                case 閃_連殺:
                case 勾拳爆破:
                    if (player.getBuffStatValueHolder(海龍石_1) != null) {
                        int skillID = 0;
                        if (applier.effect.getSourceId() == 閃_連殺) {
                            if (player.getSkillEffect(海龍突擊之怒_1) != null) {
                                skillID = 海龍突擊之怒_1;
                            }
                        } else {
                            skillID = 海龍突襲_1;
                        }
                        if (skillID > 0) {
                            player.dispelEffect(海龍石_1);
                            ExtraSkill eskill = new ExtraSkill(skillID, applier.ai.skillposition != null ? applier.ai.skillposition : applier.ai.position != null ? applier.ai.position : player.getPosition());
                            eskill.TriggerSkillID = applier.effect.getSourceId();
                            eskill.FaceLeft = (applier.ai.direction & 0x80) != 0 ? 1 : 0;
                            eskill.Value = 1;
                            player.send(MaplePacketCreator.RegisterExtraSkill(海龍突襲, Collections.singletonList(eskill)));
                        }
                    }
                    if (player.getBuffStatValueHolder(MapleBuffStat.海龍) != null && !player.isSkillCooling(海龍_null)) {
                        MapleStatEffect effect;
                        if (applier.effect.getSourceId() == 閃_連殺) {
                            effect = player.getSkillEffect(海龍之怒_1);
                        } else {
                            effect = player.getSkillEffect(海龍爆裂II_1);
                            if (effect == null) {
                                effect = player.getSkillEffect(強化海龍I_1);
                            }
                            if (effect == null) {
                                effect = player.getSkillEffect(海龍爆裂_1);
                            }
                        }
                        if (effect != null) {
                            int cooldown = effect.getCooldown();
                            MapleBuffStatValueHolder mbsvh = player.getBuffStatValueHolder(暴能續發);
                            if (mbsvh != null) {
                                cooldown = cooldown * (100 - (mbsvh.effect == null ? 50 : mbsvh.effect.getY())) / 100;
                            }
                            player.registerSkillCooldown(海龍_null, cooldown, true);
                            ExtraSkill eskill = new ExtraSkill(effect.getSourceId(), applier.ai.skillposition != null ? applier.ai.skillposition : applier.ai.position != null ? applier.ai.position : player.getPosition());
                            eskill.TriggerSkillID = applier.effect.getSourceId();
                            eskill.FaceLeft = (applier.ai.direction & 0x80) != 0 ? 1 : 0;
                            eskill.Value = 1;
                            player.send(MaplePacketCreator.RegisterExtraSkill(海龍, Collections.singletonList(eskill)));
                            effect = player.getSkillEffect(海龍石);
                            if (effect != null) {
                                effect.applyBuffEffect(player, player, 2100000000, false, false, true, null);
                            }
                        }
                    }
                    break;
            }
        }
        return -1;
    }

    public static void sendViperMark(MapleCharacter chr) {
        Object obj = chr.getTempValues().get("海龍標記Debuff");
        if (obj == null) {
            return;
        }
        long now = System.currentTimeMillis();
        List<Pair<Long, Integer>> debuffInfos = (List<Pair<Long, Integer>>) obj;
        Iterator<Pair<Long, Integer>> iterator = debuffInfos.iterator();
        while (iterator.hasNext()) {
            Pair<Long, Integer> pair = iterator.next();
            if (now >= pair.getLeft()) {
                iterator.remove();
            }
        }

        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(SendPacketOpcode.SnipeStatSet);
        mplew.writeInt(海龍之怒_1);
        mplew.write(!debuffInfos.isEmpty());
        if (!debuffInfos.isEmpty()) {
            mplew.writeInt(debuffInfos.size());
            for (Pair<Long, Integer> pair : debuffInfos) {
                mplew.writeInt(pair.getRight());
                mplew.writeInt(1);
                mplew.writeInt(0);
                mplew.writeInt(Math.max(0, pair.left - now));
                mplew.writeInt(0);
            }
        } else {
            chr.getTempValues().remove("海龍標記Debuff");
        }
        chr.send(mplew.getPacket());
    }
}
