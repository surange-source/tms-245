package client.skills.handler.末日反抗軍;

import client.*;
import client.skills.Skill;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.status.MonsterEffectHolder;
import client.status.MonsterStatus;
import handling.channel.handler.AttackInfo;
import packet.MaplePacketCreator;
import packet.SummonPacket;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.life.MapleMonster;
import server.maps.MapleSummon;
import tools.data.MaplePacketReader;

import java.lang.reflect.Field;
import java.util.Collections;
import java.util.Map;

import static constants.skills.煉獄巫師.*;

public class 煉獄巫師 extends AbstractSkillHandler {

    public 煉獄巫師() {
        jobs = new MapleJob[] {
                MapleJob.煉獄巫師1轉,
                MapleJob.煉獄巫師2轉,
                MapleJob.煉獄巫師3轉,
                MapleJob.煉獄巫師4轉
        };

        for (Field field : constants.skills.煉獄巫師.class.getDeclaredFields()) {
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
            case 急速之躍:
                return 瞬間移動_Ver2;
            case 黑暗閃電_1:
                return 黑暗閃電;
            case 黑暗世紀_1:
                return 黑暗世紀;
            case 鬥王杖擊_第2擊:
                return 鬥王杖擊;
            case 聯盟繩索_攻擊:
                return 聯盟繩索;
            case 深淵閃電_1:
            case 深淵閃電_2:
            case 深淵閃電_3:
                return 深淵閃電;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 死神:
            case 死神契約I:
            case 死神契約II:
            case 死神契約III:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.BMageDeath, 0);
                return 1;
            case 黃色光環:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.BMageAura, effect.getLevel());
                statups.put(MapleBuffStat.IndieSpeed, effect.getInfo().get(MapleStatInfo.indieSpeed));
                statups.put(MapleBuffStat.IndieBooster, effect.getInfo().get(MapleStatInfo.indieBooster));
                return 1;
            case 紅色光環:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.BMageAura, effect.getLevel());
                statups.put(MapleBuffStat.AranDrain, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 藍色繩索:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.BMageAura, effect.getLevel());
                return 1;
            case 黑色光環:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.BMageAura, effect.getLevel());
                return 1;
            case 減益效果光環:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.BMageAura, effect.getLevel());

                monsterStatus.put(MonsterStatus.BMageDebuff, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 煉獄鬥氣:
                statups.clear();
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.Enrage, effect.getInfo().get(MapleStatInfo.x));
                statups.put(MapleBuffStat.EnrageCr, effect.getInfo().get(MapleStatInfo.z));
                statups.put(MapleBuffStat.EnrageCrDamMin, effect.getInfo().get(MapleStatInfo.y));
                return 1;
            case 長杖極速:
                statups.put(MapleBuffStat.Booster, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 黑色鎖鏈:
            case 黑暗世紀:
                monsterStatus.put(MonsterStatus.Seal, 1);
                return 1;
            case 黑暗閃電:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.DarkLighting, 1);

                monsterStatus.put(MonsterStatus.DarkLightning, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 瞬間移動爆發:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.RpSiksin, 1);
                return 1;
            case 死之奧義:
                statups.put(MapleBuffStat.AttackCountX, 2);
                return 1;
            case 楓葉祝福:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.BasicStatUp, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 自由意志:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 聯盟繩索:
                statups.put(MapleBuffStat.聯盟繩索, effect.getLevel());

                monsterStatus.put(MonsterStatus.BMageDebuff, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 黑魔祭壇:
                statups.put(MapleBuffStat.Bullet_Count, 0);
                return 1;
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 黃色光環:
            case 紅色光環:
            case 藍色繩索:
            case 黑色光環:
            case 減益效果光環: {
                applyto.dispelEffect(MapleBuffStat.BMageAura);
                if (applier.effect.getSourceId() == 黑色光環 && applyto.getSkillEffect(黑色光環_魔王剋星) != null) {
                    applier.localstatups.put(MapleBuffStat.IndieBDR, applier.effect.getIndieBDR());
                }
                return 1;
            }
            case 黑暗閃電: {
                if (applier.passive) {
                    return 0;
                }
                return 1;
            }
            case 死神:
            case 死神契約I:
            case 死神契約II:
            case 死神契約III: {
                int maxValue = 0;
                MapleStatEffect eff;
                if ((eff = applyto.getSkillEffect(死神)) != null) {
                    maxValue = eff.getX();
                }
                if ((eff = applyto.getSkillEffect(死神契約I)) != null) {
                    maxValue = eff.getX();
                }
                if ((eff = applyto.getSkillEffect(死神契約II)) != null) {
                    maxValue = eff.getX();
                }
                if ((eff = applyto.getSkillEffect(死神契約III)) != null) {
                    maxValue = eff.getX();
                }
                if (applyto.getEffectForBuffStat(MapleBuffStat.AttackCountX) != null) {
                    maxValue = 1;
                }
                int value = applyto.getBuffedIntValue(MapleBuffStat.BMageDeath);
                if (applyto.getBuffedValue(MapleBuffStat.BMageDeath) != null) {
                    applier.localstatups.clear();
                    applier.applySummon = false;
                    ++value;
                }
                value = Math.min(value, maxValue);
                applier.localstatups.put(MapleBuffStat.BMageDeath, value);
                if (value == maxValue && applyto.getCheatTracker().canNext死神契約()) {
                    final MapleSummon summon = applyto.getSummonBySkillID(applier.effect.getSourceId());
                    if (summon != null) {
                        applier.localstatups.put(MapleBuffStat.BMageDeath, 0);
                        applyto.getClient().announce(SummonPacket.SummonedAssistAttackRequest(applyto.getId(), summon.getObjectId(), 0));
                    }
                }
                return 1;
            }
            case 自由意志: {
                if (applyfrom.getJob() / 1000 != applyto.getJob() / 1000) {
                    return 0;
                }
                applyto.dispelEffect(constants.skills.惡魔復仇者.惡魔韌性);
                applyto.dispelEffect(constants.skills.爆拳槍神.自由意志);
                applyto.dispelEffect(constants.skills.煉獄巫師.自由意志);
                applyto.dispelEffect(constants.skills.狂豹獵人.自由意志);
                applyto.dispelEffect(constants.skills.機甲戰神.自由意志);
                return 1;
            }
            case 聯盟繩索: {
                MapleStatEffect eff;
                if ((eff = applyto.getSkillEffect(黃色光環)) != null) {
                    applier.localstatups.putAll(eff.getStatups());
                }
                if ((eff = applyto.getSkillEffect(紅色光環)) != null) {
                    applier.localstatups.putAll(eff.getStatups());
                }
                if ((eff = applyto.getSkillEffect(藍色繩索)) != null) {
                    applier.localstatups.putAll(eff.getStatups());
                }
                if ((eff = applyto.getSkillEffect(黑色光環)) != null) {
                    applier.localstatups.putAll(eff.getStatups());
                }
                if ((eff = applyto.getSkillEffect(減益效果光環)) != null) {
                    applier.localstatups.putAll(eff.getStatups());
                }
                return 1;
            }
            case 黑魔祭壇: {
                applier.applySummon = !applier.passive;
                applier.localstatups.clear();
                if (applier.applySummon) {
                    applier.localstatups.put(MapleBuffStat.IndieSummoned, 1);
                }
                final int value = applyto.getBuffedIntValue(MapleBuffStat.Bullet_Count) + (applier.passive ? 1 : -1);
                final MapleBuffStatValueHolder mbsvh = applyto.getBuffStatValueHolder(MapleBuffStat.Bullet_Count);
                if (!applier.primary || value < 0 || mbsvh != null && System.currentTimeMillis() < mbsvh.startTime + 500L) {
                    return 0;
                }
                applier.maskedDuration = 2100000000;
                applier.maskedstatups.put(MapleBuffStat.Bullet_Count, value);
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyAttackEffect(MapleCharacter applyfrom, MapleMonster applyto, SkillClassApplier applier) {
        final MapleStatEffect effecForBuffStat10;
        if ((effecForBuffStat10 = applyfrom.getEffectForBuffStat(MapleBuffStat.BMageDeath)) != null && (applier.effect == null || applier.effect.getSourceId() != effecForBuffStat10.getSourceId())) {
            effecForBuffStat10.applyTo(applyfrom, true);
        }

        final MapleStatEffect darkLightning = applyfrom.getSkillEffect(黑暗閃電);
        if (applyto.getEffectHolder(MonsterStatus.DarkLightning) == null &&
                (applier.effect != null && applier.effect.getSourceId() == 黑暗閃電) &&
                applier.totalDamage > 0L && darkLightning != null) {
            darkLightning.applyMonsterEffect(applyfrom, applyto, darkLightning.getMobDebuffDuration(applyfrom));
            final MonsterEffectHolder holder = applyto.getEffectHolder(MonsterStatus.DarkLightning);
            if(holder != null){
                holder.remain = 15;
            }
        }
        final MonsterEffectHolder holder;
        if ((holder = applyto.getEffectHolder(MonsterStatus.DarkLightning)) != null &&
                (applier.effect != null && applier.effect.getSourceId() != 黑暗閃電
                        && applier.effect.getSourceId() != 黑暗閃電_1)
        ) {
            if(holder.remain > 0){
                holder.remain -= 1;
                applyfrom.getClient().announce(MaplePacketCreator.userBonusAttackRequest(黑暗閃電_1, 4, Collections.singletonList(applyto.getObjectId())));

                if(holder.remain == 0){
                    applyto.removeEffect(applyfrom.getId(), 黑暗閃電);
                }
            }
        }
        if (!applyto.isAlive()) {
            if (applyfrom.getSkillLevel(紅色光環) > 0) {
                MapleStatEffect eff = applyfrom.getSkillEffect(紅色光環);
                int toHeal = eff.getKillRecoveryR();
                applyfrom.addHPMP((int) ((toHeal / 100.0) * applyfrom.getStat().getCurrentMaxHP()), 0, false, true);
            }
        }
        return -1;
    }

    @Override
    public int onAfterAttack(MapleCharacter player, SkillClassApplier applier) {
        MapleStatEffect eff = player.getEffectForBuffStat(MapleBuffStat.ComboDrain);
        if (applier.totalDamage > 0L && eff != null && player.getCheatTracker().canNextBonusAttack(5000)) {
            player.addHPMP((int) Math.min(player.getStat().getCurrentMaxHP() * 15 / 100, applier.totalDamage / 100L), 0, false, true);
        }
        return 1;
    }
}
