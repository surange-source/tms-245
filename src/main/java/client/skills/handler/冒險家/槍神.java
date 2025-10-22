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
import packet.EffectPacket;
import packet.MaplePacketCreator;
import packet.SummonPacket;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.life.MapleMonster;
import server.life.MobSkill;
import server.maps.MapleSummon;
import server.Randomizer;
import tools.data.MaplePacketReader;

import java.awt.*;
import java.lang.reflect.Field;
import java.util.*;
import java.util.List;

import static constants.skills.槍神.*;

public class 槍神 extends AbstractSkillHandler {

    public 槍神() {
        jobs = new MapleJob[] {
                MapleJob.槍手,
                MapleJob.神槍手,
                MapleJob.槍神
        };

        for (Field field : constants.skills.槍神.class.getDeclaredFields()) {
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
            case 召喚船員_2轉_1:
                return 召喚船員_2轉;
            case 緩降術:
                return 飛翼;
            case 船員強化:
            case 船員強化_1:
            case 船員強化_2:
                return 召喚船員_3轉;
            case 海盜砲擊艇:
            case 海盜砲擊艇_1:
            case 海盜砲擊艇_2:
            case 砲艇標記:
                return 船員指令;
            case 霸王射_1:
                return 霸王射;
            case 鯨魚號突擊_1:
            case 鯨魚號突擊_2:
                return 鯨魚號突擊;
            case 死亡板機_1:
                return 死亡板機;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 幸運骰子:
            case 雙倍幸運骰子:
                statups.put(MapleBuffStat.Dice, 0);
                return 1;
            case 召喚船員_2轉:
            case 召喚船員_3轉:
            case 船員強化:
            case 海盜砲擊艇:
                statups.put(MapleBuffStat.IndieSummoned, 1);
                return 1;
            case 無盡追擊:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.GuidedBullet, 1);
                return 1;
            case 傳說冒險:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 槍神奧義:
                effect.getInfo().put(MapleStatInfo.prob, 100);
                return 1;
            case 極速之指:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.QuickDraw, 1);
                return 1;
            case 瞬_迅雷:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.KeyDownMoving, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 楓葉祝福:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.BasicStatUp, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 海盜風采:
                statups.put(MapleBuffStat.IndieEVA, effect.getInfo().get(MapleStatInfo.indieEva));
                statups.put(MapleBuffStat.IndieAsrR, effect.getInfo().get(MapleStatInfo.indieAsrR));
                statups.put(MapleBuffStat.IndieTerR, effect.getInfo().get(MapleStatInfo.indieTerR));
                statups.put(MapleBuffStat.IndiePADR, effect.getInfo().get(MapleStatInfo.indiePadR));
                statups.put(MapleBuffStat.DamR, 0);
                statups.put(MapleBuffStat.TerR, 0);
                return 1;
            case 進攻姿態:
                effect.getInfo().put(MapleStatInfo.cooltimeMS, 500);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 船員指令:
                effect.getInfo().put(MapleStatInfo.time, 120000);
                statups.put(MapleBuffStat.SpiritLink, 0);
                return 1;
            case 撫慰甘露:
                statups.put(MapleBuffStat.IgnoreMobDamR, effect.getW());
                statups.put(MapleBuffStat.撫慰甘露, effect.getW());
                return 1;
            case 槍彈盛宴:
                statups.put(MapleBuffStat.槍彈盛宴, effect.getInfo().get(MapleStatInfo.x));
                return 1;
        }
        return -1;
    }

    @Override
    public int onSkillUse(MaplePacketReader slea, MapleClient c, MapleCharacter chr, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 召喚船員_3轉: {
                slea.readPos();
                slea.skip(3);
                slea.readPosInt();
                applier.pos = slea.readPosInt();
                return 1;
            }
            case 海盜砲擊艇: {
                int value = (int) chr.getTempValues().getOrDefault("海盜砲擊艇", 0);
                if (value == 0) {
                    applier.effect.applyTo(chr, chr.getPosition(), true);
                    chr.getTempValues().put("海盜砲擊艇", 1);
                } else {
                    Skill skill = SkillFactory.getSkill(海盜砲擊艇_1);
                    if (skill != null) {
                        MapleStatEffect effect = skill.getEffect(applier.effect.getLevel());
                        if (effect != null) {
                            effect.applyTo(chr, chr.getPosition(), true);
                        }
                    }
                    chr.getTempValues().put("海盜砲擊艇", 0);
                }
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyTo(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 戰艦鯨魚號: {
                if (applyfrom.getSkillEffect(鯨魚號突擊) != null && applyfrom.getCooldownLeftTime(鯨魚號突擊) < 8000) {
                    applyfrom.registerSkillCooldown(鯨魚號突擊, 8000, true);
                }
                return 1;
            }
            case 死亡板機: {
                if (applier.att || !applier.passive) {
                    applier.cooldown = 0;
                }
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        if (applier.effect instanceof MobSkill) {
            boolean isDebuff = false;
            for (MapleBuffStat stat : applier.localstatups.keySet()) {
                if (stat.isNormalDebuff() || stat.isCriticalDebuff()) {
                    isDebuff = true;
                    break;
                }
            }
            if (isDebuff) {
                List<MapleSummon> sums = applyto.getSummonsReadLock();
                try {
                    for (MapleSummon sum : sums) {
                        if (sum.getSkillId() == 召喚船員_3轉 || sum.getSkillId() == 船員強化) {
                            if (!sum.isResist()) {
                                sum.setResist(true);
                                applyto.getMap().broadcastMessage(SummonPacket.summonedSetAbleResist(sum.getOwnerId(), sum.getObjectId(), (byte) 0));
                                return 0;
                            }
                        }
                    }
                } finally {
                    applyto.unlockSummonsReadLock();
                }
            }
            return -1;
        }
        switch (applier.effect.getSourceId()) {
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
            case 無盡追擊:
            case 海盜砲擊艇:
            case 海盜砲擊艇_1: {
                if (!applier.passive) {
                    return 0;
                }
                return 1;
            }
            case 召喚船員_3轉: {
                applyto.dispelEffect(召喚船員_2轉);
                return 1;
            }
            case 船員指令: {
                Object value = applyfrom.getTempValues().remove("船員指令");
                if (!(value instanceof Integer)) {
                    return 0;
                }
                applier.localstatups.put(MapleBuffStat.SpiritLink, (int) value);
                applier.cancelEffect = false;
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
            case 撫慰甘露: {
                applyto.addHPMP(applier.effect.getZ(), 0);
                return 1;
            }
            case 槍彈盛宴: {
                if (applier.att) {
                    return 0;
                }
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplySummonEffect(final MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 召喚船員_3轉: {
                Skill skill = SkillFactory.getSkill(船員強化);
                if (skill != null) {
                    MapleStatEffect effect = skill.getEffect(applier.effect.getLevel());
                    if (effect != null) {
                        effect.applySummonEffect(applyto, new Point(applier.pos.x + 170, applier.pos.y), applier.duration, applyto.getSpecialStat().getMaelstromMoboid(), applier.startTime);
                    }
                }
                MapleStatEffect effect;
                if ((effect = applyto.getSkillEffect(船員指令)) != null) {
                    applyto.getTempValues().put("船員指令", applier.effect.getSourceId());
                    effect.applyBuffEffect(applyto, applyto, effect.getBuffDuration(applyto), false, false, false, null);
                }
                return 1;
            }
            case 船員強化: {
                MapleStatEffect effect;
                if ((effect = applyto.getSkillEffect(船員指令)) != null) {
                    applyto.getTempValues().put("船員指令", applier.effect.getSourceId());
                    effect.applyBuffEffect(applyto, applyto, effect.getBuffDuration(applyto), false, false, false, null);
                }
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyAttackEffect(MapleCharacter applyfrom, MapleMonster applyto, SkillClassApplier applier) {
        MapleStatEffect effect;
        if (applier.totalDamage > 0L && applier.effect != null && applyto.isAlive() && applier.effect.getSourceId() == 無盡追擊) {
            applyfrom.setLinkMobObjectID(applyto.getObjectId());
            applier.effect.unprimaryPassiveApplyTo(applyfrom);
            if ("1".equals(applyfrom.getOneInfo(1544, String.valueOf(砲艇標記))) && (effect = applyfrom.getSkillEffect(砲艇標記)) != null && !applyfrom.isSkillCooling(砲艇標記)) {
                effect.applyTo(applyfrom, applyto.getPosition());
            }
        }
        return 1;
    }

    @Override
    public int onAfterAttack(MapleCharacter player, SkillClassApplier applier) {
        if (!applier.ai.mobAttackInfo.isEmpty()) {
            MapleStatEffect effect;
            if (!player.isSkillCooling(進攻姿態) && (effect = player.getSkillEffect(進攻姿態)) != null) {
                player.registerSkillCooldown(effect, true);
                effect.applyBuffEffect(player, player, effect.getBuffDuration(player), false, false, true, null);
            }
            if (player.getBuffedValue(MapleBuffStat.QuickDraw) == null) {
                if ((effect = player.getSkillEffect(極速之指)) != null && effect.makeChanceResult(player)) {
                    effect.unprimaryPassiveApplyTo(player);
                }
            } else if (applier.effect != null) {
                switch (applier.effect.getSourceId()) {
                    case 爆頭射擊:
                    case 核爆巨彈:
                    case 戰艦鯨魚號:
                    case 死亡之眼:
                        player.dispelEffect(MapleBuffStat.QuickDraw);
                        break;
                }
            }
            if (applier.ai.skillId == 死亡板機 || applier.ai.skillId == 死亡板機_1) {
                ExtraSkill eskill = new ExtraSkill(死亡板機_1, applier.ai.pos);
                eskill.FaceLeft = (applier.ai.direction & 0x80) != 0 ? 1 : 0;
                eskill.TriggerSkillID = applier.ai.unInt1;
                eskill.Value = 1;
                player.send(MaplePacketCreator.RegisterExtraSkill(applier.ai.skillId, Collections.singletonList(eskill)));
            }
        }
        return 1;
    }

    @Override
    public int onAfterCancelEffect(MapleCharacter player, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 召喚船員_3轉:
                player.dispelEffect(船員指令);
                break;
        }
        return -1;
    }
}
