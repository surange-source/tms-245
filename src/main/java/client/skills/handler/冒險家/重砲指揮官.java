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
import handling.opcode.SendPacketOpcode;
import packet.EffectPacket;
import packet.MaplePacketCreator;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.life.MapleMonster;
import tools.Randomizer;
import tools.data.MaplePacketLittleEndianWriter;
import tools.data.MaplePacketReader;

import java.awt.*;
import java.lang.reflect.Field;
import java.util.Collections;
import java.util.Map;

import static constants.skills.重砲指揮官.*;

public class 重砲指揮官 extends AbstractSkillHandler {

    public 重砲指揮官() {
        jobs = new MapleJob[]{
                MapleJob.砲手,
                MapleJob.重砲兵,
                MapleJob.重砲兵隊長,
                MapleJob.重砲指揮官
        };

        for (Field field : constants.skills.重砲指揮官.class.getDeclaredFields()) {
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
            case 火藥桶破壞_爆炸:
                return 火藥桶破壞;
            case 幸運木桶_1:
                return 幸運木桶;
            case 狂爆猴子_爆炸:
                return 狂暴猴子;
            case 迷你砲彈_1:
            case 迷你砲彈_2:
                return 迷你砲彈;
            case 雙胞胎猴子_1:
                return 雙胞胎猴子;
            case ICBM_2:
            case ICBM_3:
                return ICBM;
            case 特種猴子部隊_1:
            case 特種猴子部隊_2:
            case 特種猴子部隊_3:
                return 特種猴子部隊;
            case 精準轟炸_1:
            case 精準轟炸_2:
            case 精準轟炸_3:
                return 精準轟炸;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 緊急退後:
                monsterStatus.put(MonsterStatus.Speed, effect.getInfo().get(MapleStatInfo.z));
                return 1;
            case 猴子的魔法:
            case 神聖猴子的咒語:
                statups.put(MapleBuffStat.IndieMHP, effect.getInfo().get(MapleStatInfo.indieMhp));
                statups.put(MapleBuffStat.IndieMMP, effect.getInfo().get(MapleStatInfo.indieMmp));
                statups.put(MapleBuffStat.IndieACC, effect.getInfo().get(MapleStatInfo.indieAcc));
                statups.put(MapleBuffStat.IndieEVA, effect.getInfo().get(MapleStatInfo.indieEva));
                statups.put(MapleBuffStat.IndieJump, effect.getInfo().get(MapleStatInfo.indieJump));
                statups.put(MapleBuffStat.IndieSpeed, effect.getInfo().get(MapleStatInfo.indieSpeed));
                statups.put(MapleBuffStat.IndieAllStat, effect.getInfo().get(MapleStatInfo.indieAllStat));
                return 1;
            case 狂暴猴子:
                monsterStatus.put(MonsterStatus.Burned, 1);
                return 1;
            case 幸運木桶:
                effect.setDebuffTime(effect.getV() * 1000);
                monsterStatus.put(MonsterStatus.Burned, 1);
                monsterStatus.put(MonsterStatus.IndieSpeed, 90);

                statups.put(MapleBuffStat.IndieCD, 0);
                statups.put(MapleBuffStat.Roulette, 0);
                return 1;
            case 幸運骰子:
            case 雙倍幸運骰子:
                statups.put(MapleBuffStat.Dice, 0);
                return 1;
            case 迷你砲彈:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.Bullet_Count2, 0);
                return 1;
            case 磁錨:
                effect.setDebuffTime(effect.getSubTime() * 1000);
                monsterStatus.put(MonsterStatus.Stun, 1);

                statups.put(MapleBuffStat.IndieSummoned, 1);
                return 1;
            case 雙胞胎猴子:
                statups.put(MapleBuffStat.IndieSummoned, 1);
                return 1;
            case 楓葉祝福:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.BasicStatUp, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 傳說冒險:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 壓制砲擊:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.IndieBooster, effect.getInfo().get(MapleStatInfo.indieSpeed));
                statups.put(MapleBuffStat.BuckShot, 1);
                return 1;
            case ICBM:
                statups.put(MapleBuffStat.IndieInvincible, 1);
                return 1;
            case 超級巨型加農砲彈:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.Bullet_Count, 0);
                return 1;
            case 精準轟炸_3:
                statups.put(MapleBuffStat.IndieDamR, effect.getIndieDamR());
                return 1;
        }
        return -1;
    }

    @Override
    public int onSkillUse(MaplePacketReader slea, MapleClient c, MapleCharacter chr, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 與猴子並肩作戰: {
                String statData = chr.getOneInfo(7786, "sw");
                if (statData == null || statData.equals("0")) {
                    statData = String.valueOf(1);
                } else {
                    statData = String.valueOf(0);
                }
                chr.updateOneInfo(7786, "sw", statData, true);
                MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(SendPacketOpcode.CallMonkey);
                mplew.writeInt(chr.getId());
                mplew.write(Integer.parseInt(statData));
                chr.getMap().broadcastMessage(mplew.getPacket());
                return 0;
            }
            case 磁錨:
            case 雙胞胎猴子:
            case 特種猴子部隊: {
                applier.pos = slea.readPos();
                return 1;
            }
            case ICBM_2: {
                applier.pos = new Point(slea.readPosInt());
                c.announce(MaplePacketCreator.UserCreateAreaDotInfo(c.getPlayer().getMap().getAndAddObjectId(), applier.effect.getSourceId(), applier.effect.calculateBoundingBox(applier.pos, true)));
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 回家_加農砲: {
                applyto.changeMap(applier.effect.getX(), 0);
                return 1;
            }
            case 幸運木桶: {
                int dice = Randomizer.nextInt(4) + 1;
                applyto.getClient().announce(EffectPacket.showDiceEffect(-1, applier.effect.getSourceId(), applier.effect.getLevel(), dice, -1, false));
                applyto.getMap().broadcastMessage(applyto, EffectPacket.showDiceEffect(applyto.getId(), applier.effect.getSourceId(), applier.effect.getLevel(), dice, -1, false), false);
                if (dice == 2) {
                    applier.localstatups.put(MapleBuffStat.IndieCD, applier.effect.getS());
                }
                applier.localstatups.put(MapleBuffStat.Roulette, dice);
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
                int[] array = new int[1 + (trueSource == 通用V核心.海盜通用.滿載骰子 ? 1 : 0) + (applier.effect.makeChanceResult(applyto) ? 1 : 0)];
                for (int i = 0; i < array.length; i++) {
                    if (i == 0 && remote > 0) {
                        array[i] = remote;
                    } else {
                        array[i] = Randomizer.rand(1, 6);
                        if (array.length == 3 && array[0] == array[1] && array[1] == array[2] && Randomizer.isSuccess(50)) {
                            array[i] = Randomizer.rand(1, 6);
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
            case 迷你砲彈: {
                final MapleBuffStatValueHolder mbsvh = applyto.getBuffStatValueHolder(MapleBuffStat.Bullet_Count2);
                final int value = (mbsvh == null ? 0 : mbsvh.value) + (applier.passive ? 1 : -1);
                if (!applier.primary || value < 0 || value > applier.effect.getY() || (mbsvh != null && applier.passive && System.currentTimeMillis() < mbsvh.startTime + applier.effect.getW() * 1000L)) {
                    return 0;
                }
                applier.localstatups.put(MapleBuffStat.Bullet_Count2, value);
                if (!applier.passive) {
                    ExtraSkill eskill = new ExtraSkill(!applier.att ? 迷你砲彈_1 : 迷你砲彈_2, applier.pos);
                    eskill.FaceLeft = eskill.SkillID == 迷你砲彈_1 ? applyfrom.isFacingLeft() ? 1 : 0 : -1;
                    eskill.Delay = eskill.SkillID == 迷你砲彈_1 ? 330 : 360;
                    eskill.Value = 1;
                    applyfrom.send(MaplePacketCreator.RegisterExtraSkill(applier.effect.getSourceId(), Collections.singletonList(eskill)));
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
            case 壓制砲擊: {
                if (applyto.getBuffStatValueHolder(applier.effect.getSourceId()) != null) {
                    applyto.dispelEffect(applier.effect.getSourceId());
                    return 0;
                }
                return 1;
            }
            case 超級巨型加農砲彈: {
                final MapleBuffStatValueHolder mbsvh = applyto.getBuffStatValueHolder(MapleBuffStat.Bullet_Count);
                final int value = (mbsvh == null ? 0 : mbsvh.value) + (applier.passive ? 1 : -1);
                if (!applier.primary || value < 0 || value > applier.effect.getY() || (mbsvh != null && applier.passive && System.currentTimeMillis() < mbsvh.startTime + applier.effect.getQ() * 1000L)) {
                    return 0;
                }
                applier.localstatups.put(MapleBuffStat.Bullet_Count, value);
                return 1;
            }
            case 精準轟炸: {
                applyto.getSpecialStat().setPoolMakerCount(applier.effect.getY());
                applyto.send(MaplePacketCreator.poolMakerInfo(true, applyto.getSpecialStat().getPoolMakerCount(), applier.effect.getCooldown()));
                return 1;
            }

        }
        return -1;
    }

    @Override
    public int onApplySummonEffect(final MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 雙胞胎猴子: {
                applier.pos.x += 25;
                Skill skill = SkillFactory.getSkill(雙胞胎猴子_1);
                if (skill != null) {
                    MapleStatEffect effect = skill.getEffect(applier.effect.getLevel());
                    if (effect != null) {
                        effect.applySummonEffect(applyto, new Point(applier.pos.x - 90, applier.pos.y), applier.duration, applyto.getSpecialStat().getMaelstromMoboid(), applier.startTime);
                    }
                }
                return 1;
            }
            case 特種猴子部隊: {
                Skill skill = SkillFactory.getSkill(特種猴子部隊_2);
                if (skill != null) {
                    MapleStatEffect effect = skill.getEffect(applier.effect.getLevel());
                    if (effect != null) {
                        effect.applySummonEffect(applyto, applier.pos, applier.duration, applyto.getSpecialStat().getMaelstromMoboid(), applier.startTime);
                    }
                }
                skill = SkillFactory.getSkill(特種猴子部隊_3);
                if (skill != null) {
                    MapleStatEffect effect = skill.getEffect(applier.effect.getLevel());
                    if (effect != null) {
                        effect.applySummonEffect(applyto, applier.pos, applier.duration, applyto.getSpecialStat().getMaelstromMoboid(), applier.startTime);
                    }
                }
                return 1;
            }
        }
        return -1;
    }


    @Override
    public int onApplyMonsterEffect(MapleCharacter applyfrom, MapleMonster applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 幸運木桶: {
                int value = applyfrom.getBuffedIntValue(MapleBuffStat.Roulette);
                if (value == 3) {
                    applier.localmobstatups.remove(MonsterStatus.Burned);
                    applier.prop = applier.effect.getW();
                } else if (value == 4) {
                    applier.localmobstatups.remove(MonsterStatus.IndieSpeed);
                    applier.prop = 0;
                } else {
                    return 0;
                }
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyAttackEffect(MapleCharacter applyfrom, MapleMonster applyto, SkillClassApplier applier) {
        MapleBuffStatValueHolder mbsvh;
        if (applier.effect != null && applier.totalDamage > 0 && (mbsvh = applyfrom.getBuffStatValueHolder(MapleBuffStat.Roulette)) != null && mbsvh.effect != null && mbsvh.value >= 3 && mbsvh.value <=4) {
            int duration;
            if (mbsvh.value == 4) {
                duration = mbsvh.effect.getDotTime();
            } else {
                duration = mbsvh.effect.getDebuffTime();
            }
            mbsvh.effect.applyMonsterEffect(applyfrom, applyto, mbsvh.effect.calcMobDebuffDuration(duration, applyfrom));
        }
        if (applier.totalDamage > 0 && applier.effect != null
                && (mbsvh = applyfrom.getBuffStatValueHolder(MapleBuffStat.Bullet_Count2)) != null && mbsvh.effect != null && mbsvh.value > 0
                && "1".equals(applyfrom.getOneInfo(1544, String.valueOf(迷你砲彈)))
                && !applyfrom.isSkillCooling(mbsvh.effect.getSourceId())) {
            switch (applier.effect.getSourceId()) {
                case 迷你砲彈_1:
                case 迷你砲彈_2:
                case 磁錨:
                case 雙胞胎猴子:
                case 雙胞胎猴子_1:
                case 特種猴子部隊:
                case 特種猴子部隊_1:
                case 特種猴子部隊_2:
                case 特種猴子部隊_3:
                    break;
                default:
                    mbsvh.effect.applyTo(applyfrom, applyfrom, mbsvh.effect.getBuffDuration(applyfrom), true, true, false, applyto.getPosition());
                    break;
            }
        }
        return 1;
    }

    @Override
    public int onAfterAttack(MapleCharacter player, SkillClassApplier applier) {
        if (applier.effect != null && applier.ai.skillId == 精準轟炸_1 && player.isSkillCooling(精準轟炸)) {
            if (player.getSpecialStat().getPoolMakerCount() > 0) {
                player.getSpecialStat().setPoolMakerCount(player.getSpecialStat().getPoolMakerCount() - 1);
                player.send(MaplePacketCreator.poolMakerInfo(player.getSpecialStat().getPoolMakerCount() > 0, player.getSpecialStat().getPoolMakerCount(), player.getCooldownLeftTime(精準轟炸)));
                if (applier.effect != null && applier.effect.getSourceId() == 精準轟炸_1 && player.getMap().getAffectedAreaObject(player.getId(), 精準轟炸_2).size() < 2) {
                    player.getSkillEffect(精準轟炸_2).applyAffectedArea(player, applier.ai.skillposition);
                }
            } else {
                player.getSpecialStat().setPoolMakerCount(0);
                player.send(MaplePacketCreator.poolMakerInfo(false, 0, 0));
            }
        }
        return 1;
    }
}
