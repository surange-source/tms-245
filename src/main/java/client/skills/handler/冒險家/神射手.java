package client.skills.handler.冒險家;

import client.*;
import client.skills.SkillFactory;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.status.MonsterStatus;
import handling.channel.handler.AttackInfo;
import handling.opcode.SendPacketOpcode;
import packet.EffectPacket;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.life.MapleMonster;
import server.life.MobSkill;
import tools.types.Pair;
import server.Randomizer;
import tools.data.MaplePacketLittleEndianWriter;
import tools.data.MaplePacketReader;

import java.lang.reflect.Field;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import static constants.skills.神射手.*;

public class 神射手 extends AbstractSkillHandler {

    public 神射手() {
        jobs = new MapleJob[] {
                MapleJob.弩弓手,
                MapleJob.狙擊手,
                MapleJob.神射手
        };

        for (Field field : constants.skills.神射手.class.getDeclaredFields()) {
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
            case 回歸之箭_1:
                return 回歸之箭;
            case 光速神弩_1:
            case 光速神弩II_1:
                return 光速神弩II;
            case 覺醒神弩:
                return 覺醒之箭;
            case 覺醒神弩II:
            case 覺醒神弩II_1:
            case 全神貫注:
            case 強化必殺狙擊:
            case 強化必殺狙擊_1:
                return 進階覺醒之箭;
            case 真必殺狙擊_1:
                return 真必殺狙擊;
            case 分裂之矢_1:
                return 分裂之矢;
            case 能量弩矢_1:
            case 能量弩矢_2:
                return 能量弩矢;
            case 極速射擊:
                return 連射十字弓砲彈;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 覺醒之箭:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.覺醒之箭, 0);
                return 1;
            case 召喚銀隼:
                effect.setDebuffTime(effect.getX() * 1000);
                monsterStatus.put(MonsterStatus.Freeze, 1);

                statups.put(MapleBuffStat.IndieSummoned, 1);
                return 1;
            case 回歸之箭:
                statups.put(MapleBuffStat.IndieSummoned, 1);
                return 1;
            case 終極射擊_弩:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.ExtremeArchery, effect.getZ());
                return 1;
            case 反向傷害:
                statups.put(MapleBuffStat.PowerTransferGauge, 0);
                return 1;
            case 幻像箭影:
                effect.setDebuffTime(effect.getSubTime() * 1000);
                monsterStatus.put(MonsterStatus.Stun, 1);

                statups.put(MapleBuffStat.IndieSummoned, 1);
                return 1;
            case 會心之眼:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.SharpEyes, (effect.getX() << 8) + effect.getY());
                return 1;
            case 楓葉祝福:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.BasicStatUp, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 傳說冒險:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 全神貫注:
                statups.put(MapleBuffStat.IndieIgnoreMobpdpR, effect.getX());
                statups.put(MapleBuffStat.IndiePMdR, effect.getZ());
                return 1;
            case 專注弱點:
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                statups.put(MapleBuffStat.IndieIgnoreMobpdpR, effect.getInfo().get(MapleStatInfo.indieIgnoreMobpdpR));
                statups.put(MapleBuffStat.IgnoreTargetDEF, 0);
                statups.put(MapleBuffStat.BullsEye, (effect.getX() << 8) + effect.getY());
                return 1;
            case 真必殺狙擊:
                statups.put(MapleBuffStat.CursorSniping, effect.getX());
                return 1;
            case 分裂之矢:
                statups.put(MapleBuffStat.分裂之矢, 1);
                return 1;
            case 連射十字弓砲彈:
                statups.put(MapleBuffStat.連射十字弓砲彈, effect.getX());
                return 1;
        }
        return -1;
    }

    public int onSkillUse(MaplePacketReader slea, MapleClient c, MapleCharacter chr, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 幻像箭影:
                applier.pos = slea.readPos();
                return 1;
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 覺醒之箭: {
                applier.localstatups.put(MapleBuffStat.覺醒之箭, Math.min(applyto.getBuffedIntValue(MapleBuffStat.覺醒之箭) + applier.effect.getX(), applier.effect.getY()));
                return 1;
            }
            case 止痛藥: {
                List<MapleBuffStatValueHolder> mbsvhs = new LinkedList<>();
                for (Map.Entry<MapleBuffStat, List<MapleBuffStatValueHolder>> entry : applyto.getAllEffects().entrySet()) {
                    if (!entry.getKey().isNormalDebuff() && !entry.getKey().isCriticalDebuff()) {
                        continue;
                    }
                    entry.getValue().stream().filter(mbsvh -> mbsvh.effect instanceof MobSkill).forEach(mbsvhs::add);
                }
                if (mbsvhs.size() > 0) {
                    mbsvhs.forEach(mbsvh -> applyto.cancelEffect(mbsvh.effect, mbsvh.startTime));
                }
                return 1;
            }
            case 終極射擊_弩: {
                if (applyto.getBuffedValue(MapleBuffStat.ExtremeArchery) != null) {
                    applier.overwrite = false;
                    applier.localstatups.clear();
                }
                return 1;
            }
            case 會心之眼: {
                MapleStatEffect effect;
                applier.buffz = 0;
                if ((effect = applyfrom.getSkillEffect(會心之眼_無視防禦)) != null) {
                    applier.buffz = effect.getIndieIgnoreMobpdpR();
                }
                if ((effect = applyfrom.getSkillEffect(會心之眼_爆擊提升)) != null) {
                    applier.localstatups.put(MapleBuffStat.SharpEyes, applier.localstatups.get(MapleBuffStat.SharpEyes) + (effect.getX() << 8));
                }
                return 1;
            }
            case 反向傷害: {
                if (applyto.getBuffedValue(MapleBuffStat.PowerTransferGauge) == null) {
                    applyto.send(EffectPacket.showBlessOfDarkness(-1, 反向傷害));
                    applyto.getMap().broadcastMessage(applyto, EffectPacket.showBlessOfDarkness(applyto.getId(), 反向傷害), false);
                }
                applier.localstatups.put(MapleBuffStat.PowerTransferGauge, applyto.getStat().getCurrentMaxHP() * applier.effect.getZ() / 100);
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
            case 真必殺狙擊: {
                if (!applier.primary && !applier.att) {
                    applier.localstatups.clear();
                    applier.localstatups.put(MapleBuffStat.IndieInvincible, 1);
                    return 1;
                }
                final MapleBuffStatValueHolder mbsvh = applyto.getBuffStatValueHolder(MapleBuffStat.CursorSniping);
                int value;
                if (mbsvh != null) {
                    value = mbsvh.value - 1;
                    applier.duration = mbsvh.getLeftTime();
                } else {
                    value = applier.localstatups.get(MapleBuffStat.CursorSniping);
                }
                applier.localstatups.put(MapleBuffStat.CursorSniping, value);
                if (value <= 0) {
                    applier.overwrite = false;
                    applier.duration = 0;
                }
                return 1;
            }
            case 連射十字弓砲彈: {
                final MapleBuffStatValueHolder mbsvh = applyto.getBuffStatValueHolder(MapleBuffStat.連射十字弓砲彈);
                int value;
                if (mbsvh != null) {
                    value = mbsvh.z - 1;
                    mbsvh.z = value;
                    applier.duration = mbsvh.getLeftTime();
                } else {
                    value = applier.localstatups.get(MapleBuffStat.連射十字弓砲彈) * applier.effect.getV();
                }
                applier.buffz = value;
                if ((double) value % applier.effect.getV() != 0.0) {
                    return 0;
                }
                applier.localstatups.put(MapleBuffStat.連射十字弓砲彈, value / applier.effect.getV());
                if (value <= 0) {
                    applier.overwrite = false;
                    applier.duration = 0;
                }
                return 1;
            }
            case 極速射擊: {
                applyfrom.getSkillEffect(連射十字弓砲彈).applyBuffEffect(applyfrom, applyto, 0, applier.primary, applier.att, applier.passive, applier.pos);
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyAttackEffect(MapleCharacter applyfrom, MapleMonster applyto, SkillClassApplier applier) {
        MapleStatEffect effect;
        if (applier.totalDamage > 0L && (effect = applyfrom.getSkillEffect(反向傷害)) != null) {
            effect.unprimaryPassiveApplyTo(applyfrom);
        }
        if ((effect = applyfrom.getSkillEffect(致命箭)) != null && Randomizer.isSuccess(effect.getX())) {
            MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
            mplew.writeShort(SendPacketOpcode.LP_MobSpecialEffectBySkill.getValue());
            mplew.writeInt(applyto.getObjectId());
            mplew.writeInt(effect.getSourceId());
            mplew.writeInt(applyfrom.getId());
            mplew.writeShort(0);
            applyfrom.getMap().broadcastMessage(applyfrom, mplew.getPacket(), true);
            applyfrom.addHPMP(effect.getZ(), effect.getZ());
        }
        if ((effect = applyfrom.getSkillEffect(強化必殺狙擊)) != null && (applier.effect.getSourceId() == 必殺狙擊 || applier.effect.getSourceId() == 強化必殺狙擊)) {
            Pair<Long, Integer> debuffInfo = (Pair<Long, Integer>) applyfrom.getTempValues().getOrDefault("必殺狙擊Debuff", new Pair(0L, 0));
            if (applier.effect.getSourceId() == 強化必殺狙擊) {
                if (applyto.isAlive()) {
                    debuffInfo.left = System.currentTimeMillis() + effect.getDuration();
                    debuffInfo.right = applyto.getObjectId();
                    applyfrom.getTempValues().put("必殺狙擊Debuff", debuffInfo);
                    sendSnipeStatSet(applyfrom);
                }
            } else {
                MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(SendPacketOpcode.SnipeExtraAttack);
                mplew.writeInt(強化必殺狙擊_1);
                mplew.writeInt(0);
                mplew.writeInt(1);
                mplew.writeInt(debuffInfo.getRight());
                mplew.writeInt(761);
                applyfrom.send(mplew.getPacket());

                debuffInfo.left = 0L;
                sendSnipeStatSet(applyfrom);
            }
        }
        return 1;
    }

    @Override
    public int onAfterAttack(MapleCharacter player, SkillClassApplier applier) {
        MapleStatEffect effect;
        if (applier.ai.skillId != 光速神弩 && applier.ai.skillId != 覺醒神弩II_1 && applier.ai.skillId != 光速神弩II_1  && applier.ai.skillId != 必殺狙擊 && applier.ai.mobAttackInfo.size() > 0 && (effect = player.getSkillEffect(全神貫注)) != null && effect.getSkill().getSkillList().contains(applier.ai.skillId) && !player.isSkillCooling(全神貫注)) {
            player.registerSkillCooldown(全神貫注, 500, true);
            effect.applyBuffEffect(player, player, effect.getBuffDuration(player), false, false, true, null);
        }
        switch (applier.ai.skillId) {
            case 覺醒神弩:
            case 覺醒神弩II_1:
            case 強化必殺狙擊:
                player.dispelEffect(MapleBuffStat.覺醒之箭);
                break;
        }
        if (applier.ai.mobAttackInfo.size() > 0 && (effect = player.getSkillEffect(覺醒之箭)) != null) {
            if (applier.ai.skillId == 光速神弩 || applier.ai.skillId == 光速神弩II_1 || (applier.ai.skillId == 必殺狙擊 && player.getSkillEffect(進階覺醒之箭) != null)) {
                effect.applyBuffEffect(player, player, effect.getBuffDuration(player), false, false, true, null);
            }
        }
        if (applier.effect != null && applier.effect.getSourceId() == 真必殺狙擊_1 && (effect = player.getEffectForBuffStat(MapleBuffStat.CursorSniping)) != null) {
            effect.applyBuffEffect(player, player, effect.getBuffDuration(player), false, true, true, null);
        }
        return 1;
    }

    public int onAfterCancelEffect(MapleCharacter player, SkillClassApplier applier) {
        if (!applier.overwrite) {
            switch (applier.effect.getSourceId()) {
                case 真必殺狙擊:
                    if (applier.localstatups.containsKey(MapleBuffStat.CursorSniping)) {
                        applier.effect.applyBuffEffect(player, player, 2000, false, false, true, null);
                    }
                    break;
            }
        }
        return -1;
    }

    public static void sendSnipeStatSet(MapleCharacter chr) {
        Object obj = chr.getTempValues().get("必殺狙擊Debuff");
        if (obj == null) {
            return;
        }
        long now = System.currentTimeMillis();
        Pair<Long, Integer> debuffInfo = (Pair<Long, Integer>) obj;
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(SendPacketOpcode.SnipeStatSet);
        mplew.writeInt(強化必殺狙擊);
        if (now < debuffInfo.getLeft()) {
            mplew.write(1);
            mplew.writeInt(1);
            mplew.writeInt(debuffInfo.getRight());
            mplew.writeInt(1);
            mplew.writeInt(0);
            mplew.writeInt(Math.max(0, debuffInfo.getLeft() - now));
            mplew.writeInt(783);
        } else {
            mplew.write(0);
            chr.getTempValues().remove("必殺狙擊Debuff");
        }
        chr.send(mplew.getPacket());
    }
}
