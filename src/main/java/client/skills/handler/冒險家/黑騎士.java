package client.skills.handler.冒險家;

import client.*;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.stat.PlayerStats;
import client.status.MonsterStatus;
import handling.channel.handler.AttackInfo;
import handling.channel.handler.AttackMobInfo;
import packet.AdelePacket;
import packet.BuffPacket;
import packet.MaplePacketCreator;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.life.MapleMonster;
import server.maps.ForceAtomObject;
import server.maps.MapleSummon;
import server.Randomizer;

import java.awt.*;
import java.lang.reflect.Field;
import java.util.*;
import java.util.List;

import static constants.skills.黑騎士.*;

public class 黑騎士 extends AbstractSkillHandler {

    public 黑騎士() {
        jobs = new MapleJob[] {
                MapleJob.槍騎兵,
                MapleJob.嗜血狂騎,
                MapleJob.黑騎士
        };

        for (Field field : constants.skills.黑騎士.class.getDeclaredFields()) {
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
            case 追隨者衝擊II_1:
                return 追隨者衝擊II;
            case 轉生_狀態:
            case 轉生1_4:
            case 轉生1_2:
            case 完整轉生:
                return 轉生;
            case 追隨者衝擊III:
            case 追隨者衝擊III_1:
            case 闇靈復仇_1:
                return 闇靈復仇;
            case 槍刺旋風_1:
                return 槍刺旋風;
            case 黑暗靈氣_1:
                return 黑暗靈氣;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 追隨者:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.Beholder, effect.getLevel());
                return 1;
            case 追隨者衝擊:
            case 追隨者衝擊II_1:
            case 追隨者衝擊III:
                monsterStatus.put(MonsterStatus.Stun, 21);
                return 1;
            case 神聖之火:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.MaxHP, effect.getInfo().get(MapleStatInfo.x));
                statups.put(MapleBuffStat.MaxMP, effect.getInfo().get(MapleStatInfo.y));
                return 1;
            case 十字深鎖鏈:
                statups.put(MapleBuffStat.CrossOverChain, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 黑暗守護:
                statups.put(MapleBuffStat.IndieCr, effect.getInfo().get(MapleStatInfo.indieCr));
                statups.put(MapleBuffStat.EPAD, effect.getInfo().get(MapleStatInfo.epad));
                statups.put(MapleBuffStat.EMAD, effect.getInfo().get(MapleStatInfo.epad));
                statups.put(MapleBuffStat.EPDD, effect.getInfo().get(MapleStatInfo.epdd));
                return 1;
            case 魔防消除:
                monsterStatus.put(MonsterStatus.MagicCrash, 1);
                return 1;
            case 闇靈共鳴:
                effect.setHpR(effect.getInfo().get(MapleStatInfo.y) / 100.0);
                statups.put(MapleBuffStat.IndieBDR, effect.getInfo().get(MapleStatInfo.x));
                statups.put(MapleBuffStat.IndiePMdR, effect.getInfo().get(MapleStatInfo.v));
                statups.put(MapleBuffStat.IgnoreTargetDEF, effect.getInfo().get(MapleStatInfo.indieBDR));
                return 1;
            case 楓葉祝福:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.BasicStatUp, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 轉生:
                statups.put(MapleBuffStat.IndieSummoned, 1);
                return 1;
            case 轉生契約:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.ReincarnationMode, 0);
                return 1;
            case 轉生1_4:
            case 轉生1_2:
            case 完整轉生:
                statups.put(MapleBuffStat.ReincarnationCount, effect.getZ());
                return 1;
            case 轉生_狀態:
                statups.put(MapleBuffStat.IndieInvincible, 1);
                statups.put(MapleBuffStat.Reincarnation, 1);
                return 1;
            case 傳說冒險:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 黑暗飢渴:
                statups.put(MapleBuffStat.IndiePAD, effect.getInfo().get(MapleStatInfo.indiePad));
                statups.put(MapleBuffStat.ComboDrain, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 斷罪之槍:
                effect.getInfo().put(MapleStatInfo.time, effect.getW2());
                statups.put(MapleBuffStat.IndieAllDamageReduce, effect.getW());
                statups.put(MapleBuffStat.IndieCurseDampening, 1);
                return 1;
            case 槍刺旋風:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.KeyDownMoving, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 黑暗靈氣:
                statups.put(MapleBuffStat.IndieShield, 0);
                statups.put(MapleBuffStat.黑暗靈氣, effect.getU());
                return 1;
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 十字深鎖鏈: {
                PlayerStats stats = applyfrom.getStat();
                if (stats != null) {
                    int qHP = stats.getCurrentMaxHP() * applier.effect.getQ() / 100;
                    if (stats.getHp() < qHP) {
                        applier.localstatups.put(MapleBuffStat.CrossOverChain, (int) Math.ceil((double) (stats.getHp() * applier.effect.getX()) / qHP));
                    }
                    applier.buffz = (stats.getCurrentMaxHP() - stats.getHp()) * applier.effect.getY() / 100;
                }
                return 1;
            }
            case 黑暗守護: {
                MapleStatEffect effect;
                if ((effect = applyfrom.getSkillEffect(追隨者_BUFF強化傷害)) != null) {
                    applier.localstatups.put(MapleBuffStat.EPAD, applier.localstatups.get(MapleBuffStat.EPAD) + effect.getX());
                    applier.localstatups.put(MapleBuffStat.EMAD, applier.localstatups.get(MapleBuffStat.EMAD) + effect.getX());
                }
                return 1;
            }
            case 轉生契約: {
                Integer mode = (Integer) applyfrom.getTempValues().remove("ReincarnationMode");
                applier.localstatups.put(MapleBuffStat.ReincarnationMode, mode == null ? 1 : mode);
                return 1;
            }
            case 轉生1_4:
            case 轉生1_2:
            case 完整轉生: {
                applier.duration = applier.effect.getU() * 1000;
                int nCount = applier.localstatups.getOrDefault(MapleBuffStat.ReincarnationCount, applier.effect.getZ());
                MapleStatEffect effect;
                if ((effect = applyfrom.getSkillEffect(轉生_減免目標)) != null) {
                    nCount = nCount * (100 - effect.getZ()) / 100;
                }
                applier.localstatups.put(MapleBuffStat.ReincarnationCount, nCount);
                applier.buffz = nCount;
                return 1;
            }
            case 轉生_狀態: {
                MapleBuffStatValueHolder mbsvh = applyfrom.getBuffStatValueHolder(MapleBuffStat.ReincarnationMode);
                if (mbsvh == null || mbsvh.effect == null) {
                    return 0;
                }
                MapleStatEffect effect = applyfrom.getSkillEffect((mbsvh.effect.getSourceId() - 1000) + mbsvh.value);
                if (effect == null) {
                    return 0;
                }
                applier.duration = effect.getBuffDuration(applyfrom);
                effect.applyBuffEffect(applyfrom, applyto, applier.duration, applier.primary, applier.att, applier.passive, applier.pos);
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
            case 斷罪之槍: {
                if (!applier.primary) {
                    return 0;
                }
                return 1;
            }
            case 黑暗靈氣: {
                if (!applier.primary) {
                    return 0;
                }
                applier.localstatups.put(MapleBuffStat.IndieShield, applyto.getStat().getCurrentMaxHP() * applier.effect.getY() / 100);
                applier.buffz = 0;
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onAfterRegisterEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 黑暗守護:
                applyto.getEffects().values().stream().flatMap(Collection::stream).filter(mbsvh -> mbsvh.effect.getSourceId() == 黑暗守護).forEach(mbsvh -> mbsvh.sourceID = -2022125);
                break;
        }
        return -1;
    }

    @Override
    public int onApplyAttackEffect(MapleCharacter applyfrom, MapleMonster applyto, SkillClassApplier applier) {
        MapleBuffStatValueHolder mbsvh = applyfrom.getBuffStatValueHolder(MapleBuffStat.ReincarnationCount);
        if (applier.totalDamage > 0L && mbsvh != null && mbsvh.effect != null && mbsvh.value > 0 && (!applyto.isAlive() || applyto.isBoss())) {
            mbsvh.value = Math.max(mbsvh.value - 1, 0);
            if (mbsvh.value > 0) {
                applyfrom.send(BuffPacket.giveBuff(applyfrom, mbsvh.effect, Collections.singletonMap(MapleBuffStat.ReincarnationCount, mbsvh.effect.getSourceId())));
            } else {
                applyfrom.reduceSkillCooldown(轉生_狀態, mbsvh.effect.getY() * 1000);
                applyfrom.dispelEffect(MapleBuffStat.ReincarnationCount);
            }
        }
        if (applyfrom != null && applyto != null && applier.effect != null && applier.effect.getSourceId() == 黑暗靈氣_1) {
            applyfrom.send(MaplePacketCreator.objSkillEffect(applyto.getObjectId(), applier.effect.getSourceId(), applyfrom.getId(), new Point(0, 0)));
        }
        return 1;
    }

    @Override
    public int onAfterAttack(MapleCharacter player, SkillClassApplier applier) {
        if (applier.ai.attackType != AttackInfo.AttackType.SummonedAttack) {
            if (applier.ai.mobAttackInfo.size() > 0) {
                MapleStatEffect effect = player.getSkillEffect(闇靈共鳴);
                if (effect != null && player.isSkillCooling(闇靈共鳴)) {
                    player.reduceSkillCooldown(闇靈共鳴, 350);
                }
                effect = player.getSkillEffect(闇靈復仇);
                if (effect != null && !player.isSkillCooling(effect.getSourceId())) {
                    final MapleSummon summon = player.getSummonBySkillID(追隨者);
                    if (summon != null) {
                        int mobCount = effect.getInfo().get(MapleStatInfo.mobCount);
                        List<Integer> oids = new LinkedList<>();
                        for (AttackMobInfo ami : applier.ai.mobAttackInfo) {
                            oids.add(ami.mobId);
                            if (oids.size() >= mobCount) {
                                break;
                            }
                        }
                        player.getMap().broadcastMessage(player, MaplePacketCreator.summonedBeholderRevengeAttack(player.getId(), summon.getObjectId(), oids), true);

                        if (effect.getCooldown(player) > 0) {
                            player.registerSkillCooldown(effect, true);
                        }
                    }
                }
                if ((槍刺旋風 == applier.ai.skillId || 槍刺旋風_1 == applier.ai.skillId) && applier.effect != null) {
                    player.addHPMP(applier.effect.getW(), 0);
                }

                if (黑暗靈氣 == applier.ai.skillId && applier.effect != null) {
                    List<ForceAtomObject> createList = new ArrayList<>();
                    int i = 0;
                    for (AttackMobInfo ami : applier.ai.mobAttackInfo) {
                        MapleMonster mob = player.getMap().getMobObject(ami.mobId);
                        if (mob == null) {
                           continue;
                        }
                        Point pos = mob.getPosition();
                        for (int j = 0; j < 4; j++) {
                            ForceAtomObject obj = new ForceAtomObject(player.getSpecialStat().gainForceCounter(), 15, i++, player.getId(), 0, applier.effect.getSourceId());
                            obj.Target = player.getId();
                            obj.Expire = 3500;
                            obj.Position = new Point(Randomizer.rand(-50, 50), 1);
                            obj.ObjPosition = new Point(pos.x + Randomizer.rand(-50, 50), pos.y);
                            obj.Idk5 = 1;
                            obj.B1 = true;
                            createList.add(obj);
                        }
                    }
                    if (!createList.isEmpty()) {
                        player.getMap().broadcastMessage(AdelePacket.ForceAtomObject(player.getId(), createList, 0), player.getPosition());

                        MapleBuffStatValueHolder mbsvh = player.getBuffStatValueHolder(MapleBuffStat.黑暗靈氣);
                        if (mbsvh != null && mbsvh.z < mbsvh.effect.getS()) {
                            mbsvh.z += 1;
                            player.send(BuffPacket.giveBuff(player, mbsvh.effect, Collections.singletonMap(MapleBuffStat.黑暗靈氣, mbsvh.effect.getSourceId())));
                        }
                    }

                    int maxHP = player.getStat().getCurrentMaxHP();
                    if (player.getStat().getHp() < maxHP) {
                        player.addHPMP(applier.effect.getX(), 0);
                    } else {
                        MapleBuffStatValueHolder mbsvh = player.getBuffStatValueHolder(MapleBuffStat.IndieShield, 黑暗靈氣);
                        if (mbsvh != null) {
                            mbsvh.value = Math.min(mbsvh.value + (maxHP * applier.effect.getX() * applier.effect.getV() / 10000), maxHP * applier.effect.getY() / 100);
                            player.send(BuffPacket.giveBuff(player, mbsvh.effect, Collections.singletonMap(MapleBuffStat.IndieShield, mbsvh.effect.getSourceId())));
                        }
                    }
                }
            }
        }
        return 1;
    }
}
