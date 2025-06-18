package client.skills.handler.冒險家;

import client.*;
import client.force.MapleForceFactory;
import client.skills.SkillFactory;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.status.MonsterStatus;
import constants.SkillConstants;
import handling.channel.handler.AttackInfo;
import handling.opcode.EffectOpcode;
import handling.opcode.SendPacketOpcode;
import packet.EffectPacket;
import packet.ForcePacket;
import packet.MaplePacketCreator;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.life.MapleMonster;
import server.life.MobSkill;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import tools.Pair;
import tools.Randomizer;
import tools.data.MaplePacketLittleEndianWriter;
import tools.data.MaplePacketReader;

import java.awt.*;
import java.lang.reflect.Field;
import java.util.*;
import java.util.List;

import static constants.skills.箭神.*;

public class 箭神 extends AbstractSkillHandler {

    public 箭神() {
        jobs = new MapleJob[] {
                MapleJob.獵人,
                MapleJob.遊俠,
                MapleJob.箭神
        };

        for (Field field : constants.skills.箭神.class.getDeclaredFields()) {
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
            case 閃光幻象_1:
                return 閃光幻象;
            case 回歸箭筒_1:
                return 回歸箭筒;
            case 箭座_攻擊:
                return 箭座;
            case 魔幻箭筒_2轉:
                return 魔幻箭筒;
            case 魔幻箭筒_4轉:
                return 無限箭筒;
            case 箭雨_1:
                return 箭雨;
            case 殘影之矢_1:
                return 殘影之矢;
            case 焰箭齊發_1:
                return 焰箭齊發;
            case 殘影幻象_1:
                return 殘影幻象;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 魔幻箭筒:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.QuiverCatridge, 1);
                return 1;
            case 閃光幻象:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.閃光幻象, 1);
                return 1;
            case 召喚鳳凰:
                effect.setDebuffTime(4000);
                monsterStatus.put(MonsterStatus.Stun, 1);

                statups.put(MapleBuffStat.IndieSummoned, 1);
                return 1;
            case 回歸箭筒:
                statups.put(MapleBuffStat.IndieSummoned, 1);
                return 1;
            case 終極射擊_箭:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.IndiePMdR, effect.getInfo().get(MapleStatInfo.indiePMdR));
                statups.put(MapleBuffStat.ExtremeArchery, 1);
                return 1;
            case 致命箭:
                statups.put(MapleBuffStat.BowMasterMortalBlow, 0);
                return 1;
            case 集中專注:
                statups.put(MapleBuffStat.BowMasterConcentration, 0);
                return 1;
            case 會心之眼:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.SharpEyes, (effect.getX() << 8) + effect.getY());
                return 1;
            case 楓葉祝福:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.BasicStatUp, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 波紋衝擊:
                monsterStatus.put(MonsterStatus.IndieSpeed, Math.abs(effect.getS()));
                return 1;
            case 傳說冒險:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 戰鬥準備:
                statups.put(MapleBuffStat.IndiePAD, effect.getInfo().get(MapleStatInfo.indiePad));
                statups.put(MapleBuffStat.Preparation, 1);
                return 1;
            case 箭雨:
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 箭雨_1:
                effect.getInfo().put(MapleStatInfo.time, 2500);
                return 1;
            case 殘影之矢:
                statups.put(MapleBuffStat.元素精靈, 1);
                return 1;
            case 焰箭齊發:
                statups.put(MapleBuffStat.焰箭齊發, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 殘影幻象:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.殘影幻象, 1);
                return 1;
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        if (applier.effect instanceof MobSkill) {
            applyto.dispelEffect(MapleBuffStat.BowMasterConcentration);
            applyto.send(EffectPacket.showBlessOfDarkness(-1, 集中專注));
            applyto.getMap().broadcastMessage(applyto, EffectPacket.showBlessOfDarkness(applyto.getId(), 集中專注), false);
            return -1;
        }
        switch (applier.effect.getSourceId()) {
            case 魔幻箭筒: {
                if (applier.primary) {
                    int mode = 1;
                    if (applyfrom.getSkillEffect(無限箭筒) != null && applyfrom.getBuffedIntValue(MapleBuffStat.QuiverCatridge) == 1) {
                        mode = 2;
                        applier.localstatups.put(MapleBuffStat.QuiverCatridge, 2);
                    }
                    applyto.send(EffectPacket.showSkillMode(-1, applier.effect.getSourceId(), mode, 0));
                    applyto.getMap().broadcastMessage(applyto, EffectPacket.showSkillMode(applyto.getId(), applier.effect.getSourceId(), mode, 0), false);
                }
                return 1;
            }
            case 閃光幻象:
                if (applier.primary) {
                    if (applyto.getBuffedValue(MapleBuffStat.閃光幻象) != null) {
                        applyto.dispelEffect(閃光幻象);
                        return 0;
                    }
                } else {
                    int value = applyto.getBuffedIntValue(MapleBuffStat.閃光幻象) + 1;
                    MapleStatEffect effect = applyto.getSkillEffect(閃光幻象II);
                    if (effect == null) {
                        effect = applier.effect;
                    }
                    if (value > effect.getU()) {
                        value = effect.getU();
                        if (!applyto.isSkillCooling(閃光幻象_1)) {
                            applyto.registerSkillCooldown(閃光幻象_1, applier.effect.getCooldown(applyfrom), true);
                            MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
                            mplew.writeShort(SendPacketOpcode.SpeedMirageAttack.getValue());
                            mplew.writeInt(effect.getW());
                            mplew.writeInt(0);
                            applyto.send(mplew.getPacket());
                        }
                    }
                    applier.localstatups.put(MapleBuffStat.閃光幻象, value);
                }
                return 1;
            case 終極射擊_箭: {
                if (applyto.getBuffedValue(MapleBuffStat.ExtremeArchery) != null) {
                    applyto.dispelEffect(終極射擊_箭);
                    return 0;
                }
                applier.buffz = applier.effect.getZ();
                return 1;
            }
            case 致命箭: {
                if (applyto.getBuffStatValueHolder(MapleBuffStat.IndieDamR, 致命箭) != null) {
                    return 0;
                }
                final int value = applyto.getBuffedIntValue(MapleBuffStat.BowMasterMortalBlow) + 1;
                if (value > applier.effect.getX()) {
                    applyto.dispelEffect(致命箭);
                    applier.localstatups.clear();
                    applier.localstatups.put(MapleBuffStat.IndieDamR, applier.effect.getY());
                    applier.localstatups.put(MapleBuffStat.IndieCurseDampening, 1);
                } else {
                    applier.duration = 2100000000;
                    applier.localstatups.put(MapleBuffStat.BowMasterMortalBlow, value);
                }
                return 1;
            }
            case 集中專注: {
                applier.localstatups.put(MapleBuffStat.BowMasterConcentration, Math.min(applyto.getBuffedIntValue(MapleBuffStat.BowMasterConcentration) + 1, 100 / applier.effect.getX()));
                applyto.send(EffectPacket.showBuffEffect(applyto, false, applier.effect.getSourceId(), applyto.getLevel(), 0, null));
                applyto.getMap().broadcastMessage(applyto, EffectPacket.showBuffEffect(applyto, true, applier.effect.getSourceId(), applyto.getLevel(), 0, null), false);
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
            case 破甲射擊: {
                applier.b3 = true;
                applier.duration = 3000;
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
            case 殘影之矢: {
                if (!applier.primary) {
                    return 0;
                }
                int duration = applier.effect.calcBuffDuration(applier.effect.getS() * 1000, applyfrom);
                applyfrom.getTempValues().put("殘影之矢時間", new Pair(System.currentTimeMillis(), duration));
                applyfrom.send(MaplePacketCreator.InhumanSpeedAttackeRequest(applyfrom.getId(), (byte) 1, duration));
                return 1;
            }
            case 殘影幻象: {
                applier.buffz = 0;
                if (!applier.primary) {
                    MapleBuffStatValueHolder mbsvh;
                    if ((mbsvh = applyto.getBuffStatValueHolder(MapleBuffStat.殘影幻象)) == null || mbsvh.z >= applier.effect.getX()) {
                        return 0;
                    }
                    applier.buffz = Math.min(applier.effect.getX(), mbsvh.z + 1);
                }
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyAttackEffect(MapleCharacter applyfrom, MapleMonster applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 魔幻箭筒_2轉:
            case 魔幻箭筒_4轉:
            case 終極之弓:
            case 進階終極攻擊:
            case 召喚鳳凰:
            case 箭座_攻擊:
            case 閃光幻象_1:
            case 殘影幻象_1:
            case 殘影之矢:
            case 殘影之矢_1:
                return -1;
        }

        final MapleForceFactory mff = MapleForceFactory.getInstance();
        MapleBuffStatValueHolder mbsvh;
        if ((mbsvh = applyfrom.getBuffStatValueHolder(MapleBuffStat.QuiverCatridge)) != null && mbsvh.effect != null && mbsvh.value == 1) {
            MapleStatEffect effect;
            int prop;
            if (applyfrom.getSkillEffect(魔幻箭筒_4轉) == null) {
                prop = mbsvh.effect.getU();
                effect = mbsvh.effect;
            } else {
                effect = applyfrom.getSkillEffect(無限箭筒);
                prop = effect.getU();
            }
            if (effect != null && Randomizer.isSuccess(prop)) {
                applyfrom.getMap().broadcastMessage(applyfrom, ForcePacket.forceAtomCreate(mff.getMapleForce(applyfrom, effect, 0, applyto.getObjectId(), null, null)), true);
            }
        }
        if (applyto != null && applyfrom.getBuffStatValueHolder(MapleBuffStat.IndieDamR, 箭雨) != null && applyfrom.getCheatTracker().canNextBonusAttack(5000)) {
            applyfrom.getSkillEffect(箭雨_1).applyTo(applyfrom);
        }
        return 1;
    }

    @Override
    public int onAfterAttack(MapleCharacter player, SkillClassApplier applier) {
        if (applier.ai.skillId == 箭座_攻擊 || applier.ai.skillId == 終極之弓 || applier.ai.skillId == 進階終極攻擊 || applier.ai.attackType == AttackInfo.AttackType.SummonedAttack) {
            return -1;
        }
        final MapleForceFactory mff = MapleForceFactory.getInstance();
        MapleBuffStatValueHolder mbsvh;
        MapleStatEffect effect;
        if (applier.ai.mobAttackInfo.size() > 0) {
            if ((mbsvh = player.getBuffStatValueHolder(MapleBuffStat.QuiverCatridge)) != null) {
                if (mbsvh.value == 2) {
                    effect = player.getSkillEffect(無限箭筒);
                    if (effect != null && Randomizer.isSuccess(effect.getW())) {
                        player.addHPMP(player.getStat().getCurrentMaxHP() * effect.getX() / 100, 0, false);
                        player.send(EffectPacket.showBlessOfDarkness(-1, 魔幻箭筒));
                        player.getMap().broadcastMessage(player, EffectPacket.showBlessOfDarkness(player.getId(), 魔幻箭筒), false);
                    }
                }
            } else if ((effect = player.getSkillEffect(魔幻箭筒)) != null) {
                effect.unprimaryPassiveApplyTo(player);
            }
        }
        if (applier.ai.attackType == AttackInfo.AttackType.ShootAttack && applier.ai.mobAttackInfo.size() > 0 && (effect = player.getSkillEffect(致命箭)) != null) {
            final int value = player.getBuffedIntValue(MapleBuffStat.BowMasterMortalBlow) + 1;
            if (value >= effect.getX()) {
                for (int i = 0; i < Math.min(applier.ai.mobAttackInfo.size(), 2); i++) {
                    MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
                    mplew.writeShort(SendPacketOpcode.LP_MobSpecialEffectBySkill.getValue());
                    mplew.writeInt(applier.ai.mobAttackInfo.get(i).mobId);
                    mplew.writeInt(effect.getSourceId());
                    mplew.writeInt(player.getId());
                    mplew.writeShort(0);
                    player.getMap().broadcastMessage(player, mplew.getPacket(), true);
                }
            }
            effect.unprimaryPassiveApplyTo(player);
        }
        if (applier.ai.mobAttackInfo.size() > 0 && (effect = player.getSkillEffect(集中專注)) != null) {
            effect.unprimaryPassiveApplyTo(player);
        }
        if (applier.ai.attackType == AttackInfo.AttackType.ShootAttack && applier.ai.mobAttackInfo.size() > 0 && (mbsvh = player.getBuffStatValueHolder(閃光幻象)) != null) {
            boolean apply = true;
            switch (SkillConstants.getLinkedAttackSkill(applier.ai.skillId)) {
                case 箭座:
                case 暴風神射:
                case 殘影幻象:
                case 殘影之矢:
                case 焰箭齊發:
                case 箭雨:
                    int value = (int) player.getTempValues().getOrDefault("閃光幻象暴風技能累計", 0) + 1;
                    if (value >= mbsvh.effect.getU2()) {
                        value = 0;
                    } else {
                        apply = false;
                    }
                    player.getTempValues().put("閃光幻象暴風技能累計", value);
                    break;
            }
            if (apply) {
                mbsvh.effect.unprimaryPassiveApplyTo(player);
            }
        }
        if (applier.ai.attackType == AttackInfo.AttackType.ShootAttack && applier.ai.mobAttackInfo.size() > 0 && (effect = player.getSkillEffect(破甲射擊)) != null) {
            MapleCoolDownValueHolder mcvh = player.getSkillCooldowns().get(破甲射擊);
            if (mcvh == null || mcvh.getLeftTime() <= 0) {
                player.registerSkillCooldown(破甲射擊, effect.getY() * 1000, true);
                player.send(EffectPacket.showBuffEffect(player, false, applier.effect.getSourceId(), player.getLevel(), 1, null));
                player.getMap().broadcastMessage(player, EffectPacket.showBuffEffect(player, true, applier.effect.getSourceId(), player.getLevel(), 1, null), false);
            } else if (mcvh.getLeftTime() > 1000) {
                player.registerSkillCooldown(破甲射擊, Math.max(1000, mcvh.getLeftTime() - (effect.getW() * 1000)), true);
            }
        }
        if (applier.ai.attackType == AttackInfo.AttackType.ShootAttack && SkillConstants.getLinkedAttackSkill(applier.ai.skillId) != 殘影之矢 && applier.ai.mobAttackInfo.size() > 0) {
            if ((mbsvh = player.getBuffStatValueHolder(MapleBuffStat.元素精靈, 殘影之矢)) != null) {
                Object timeDat = player.getTempValues().getOrDefault("殘影之矢時間", null);
                Pair<Long, Integer> timeInfo;
                long timeNow = System.currentTimeMillis();
                int duration = mbsvh.effect.calcBuffDuration(mbsvh.effect.getS() * 1000, player);
                if (timeDat == null) {
                    timeInfo = new Pair(timeNow - 1000, duration);
                } else {
                    timeInfo = (Pair<Long, Integer>) timeDat;
                    duration += timeInfo.getRight();
                }
                if (timeNow - (long) timeDat >= 1000) {
                    timeInfo.left = timeNow;
                    duration -= Math.max(0, timeNow - ((long) timeDat));
                    player.send(MaplePacketCreator.InhumanSpeedAttackeRequest(player.getId(), (byte) 1, duration));
                }
                timeInfo.right = duration;
                player.getTempValues().put("殘影之矢時間", timeInfo);
            } else if (player.isSkillCooling(殘影之矢) && (effect = player.getSkillEffect(殘影之矢)) != null) {
                int value = (int) player.getTempValues().getOrDefault("殘影之矢技能累計", 0) + 1;
                if (value >= effect.getU()) {
                    value = 0;
                    player.send(EffectPacket.showBuffEffect(player, false, 殘影之矢_1, player.getLevel(), 1, null));
                    player.getMap().broadcastMessage(player, EffectPacket.showBuffEffect(player, true, 殘影之矢_1, player.getLevel(), 1, null), false);
                    player.getMap().broadcastMessage(player, ForcePacket.forceAtomCreate(mff.getMapleForce(player, SkillFactory.getSkill(殘影之矢_1).getEffect(effect.getLevel()), 0, 0, Collections.emptyList(), player.getPosition())), true);
                }
                player.getTempValues().put("殘影之矢技能累計", value);
            }
        }

        final MapleStatEffect effecForBuffStat6;
        if ((effecForBuffStat6 = player.getEffectForBuffStat(MapleBuffStat.焰箭齊發)) != null && player.getCheatTracker().canNextAllRocket(焰箭齊發_1, 2500)) {
            final Iterator<MapleMapObject> iterator2 = player.getMap().getMapObjectsInRange(player.getPosition(), 500, Collections.singletonList(MapleMapObjectType.MONSTER)).iterator();
            for (int n8 = 0; n8 < effecForBuffStat6.getMobCount() && iterator2.hasNext(); ++n8) {
                player.getMap().broadcastMessage(player, ForcePacket.forceAtomCreate(mff.getMapleForce(player, effecForBuffStat6, 0, 0, null, iterator2.next().getPosition())), true);
            }
        }
        if (applier.ai.attackType == AttackInfo.AttackType.ShootAttack && applier.ai.mobAttackInfo.size() > 0 && (mbsvh = player.getBuffStatValueHolder(MapleBuffStat.殘影幻象)) != null && mbsvh.effect != null && mbsvh.z > 0 && !player.isSkillCooling(殘影幻象_1)) {
            effect = SkillFactory.getSkill(殘影幻象_1).getEffect(mbsvh.effect.getLevel());
            if (effect != null) {
                List<MapleMapObject> objs = player.getMap().getMonstersInRect(effect.calculateBoundingBox(player.getPosition(), player.isFacingLeft()));
                if (!objs.isEmpty()) {
                    List<Integer> toMobOid = new LinkedList<>();
                    for (int i = 0; i < effect.getBulletCount(); i++) {
                        toMobOid.add(objs.get(i % objs.size()).getObjectId());
                    }
                    Point p = new Point(player.getPosition());
                    player.registerSkillCooldown(殘影幻象_1, (int) (mbsvh.effect.getInfoD().get(MapleStatInfo.t) * 1000), false);
                    MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(SendPacketOpcode.LP_UserEffectLocal);
                    mplew.write(EffectOpcode.UserEffect_SkillSpecial.getValue());
                    mplew.writeInt(mbsvh.effect.getSourceId());
                    mplew.writeInt(mbsvh.effect.getLevel());
                    mplew.writePosInt(p);
                    player.send(mplew.getPacket());
                    p.y -= 100;
                    player.getMap().broadcastMessage(player, ForcePacket.forceAtomCreate(mff.getMapleForce(player, effect, 0, 0, toMobOid, p)), true);
                }
            }
        }
        return 1;
    }

    @Override
    public int onAfterCancelEffect(MapleCharacter player, SkillClassApplier applier) {
        if (!applier.overwrite) {
            switch (applier.effect.getSourceId()) {
                case 殘影之矢: {
                    player.getTempValues().remove("殘影之矢時間");
                    player.send(MaplePacketCreator.InhumanSpeedAttackeRequest(player.getId(), (byte) 0, 0));
                    break;
                }
            }
        }
        return -1;
    }
}
