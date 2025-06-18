package client.skills.handler.超新星;

import client.MapleBuffStat;
import client.MapleCharacter;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.skills.handler.SkillClassFetcher;
import client.status.MonsterStatus;
import constants.JobConstants;
import constants.skills.通用V核心.超新星通用;
import server.buffs.MapleStatEffect;
import server.life.MapleMonster;

import java.lang.reflect.Field;
import java.util.Map;

import static constants.skills.通用V核心.超新星通用.*;

public class 超新星 extends AbstractSkillHandler {

    public 超新星() {
        for (Field field : 超新星通用.class.getDeclaredFields()) {
            try {
                skills.add(field.getInt(field.getName()));
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public boolean containsJob(int jobWithSub) {
        return JobConstants.is超新星(jobWithSub);
    }

    @Override
    public int getLinkedSkillID(int skillId) {
        switch (skillId) {
            case 萬神殿_1: {
                return 萬神殿;
            }
        }
        return -1;
    }

    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 萬神殿:
            case 萬神殿_1:
                statups.put(MapleBuffStat.HeavensDoor, effect.getLevel());
                return 1;
        }
        return -1;
    }

    @Override
    public int onAttack(final MapleCharacter player, final MapleMonster monster, SkillClassApplier applier) {
        AbstractSkillHandler holder = SkillClassFetcher.getHandlerByJob(player.getJobWithSub());
        if (holder == this) {
            return -1;
        }
        return holder.onAttack(player, monster, applier);
    }

    @Override
    public int onApplyMonsterEffect(MapleCharacter applyfrom, MapleMonster applyto, SkillClassApplier applier) {
        AbstractSkillHandler holder = SkillClassFetcher.getHandlerByJob(applyfrom.getJobWithSub());
        if (holder == this) {
            return -1;
        }
        return holder.onApplyMonsterEffect(applyfrom, applyto, applier);
    }

    @Override
    public int onApplyAttackEffect(MapleCharacter applyfrom, MapleMonster applyto, SkillClassApplier applier) {
        AbstractSkillHandler holder = SkillClassFetcher.getHandlerByJob(applyfrom.getJobWithSub());
        if (holder == this) {
            return -1;
        }
        return holder.onApplyAttackEffect(applyfrom, applyto, applier);
    }

    @Override
    public int onAfterAttack(MapleCharacter player, SkillClassApplier applier) {
        MapleStatEffect eff;
        if (applier.effect != null && applier.effect.getSourceId() == 萬神殿 && (eff = player.getSkillEffect(萬神殿_1)) != null) {
            eff.unprimaryPassiveApplyTo(player);
        }

        AbstractSkillHandler holder = SkillClassFetcher.getHandlerByJob(player.getJobWithSub());
        if (holder == this) {
            return -1;
        }
        return holder.onAfterAttack(player, applier);
    }
}
