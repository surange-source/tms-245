package client.skills.handler.其他;

import client.MapleBuffStat;
import client.MapleCharacter;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.skills.handler.SkillClassFetcher;
import client.status.MonsterStatus;
import constants.JobConstants;
import constants.skills.通用V核心.劍士通用;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.life.MapleMonster;

import java.lang.reflect.Field;
import java.util.Map;

import static constants.skills.通用V核心.劍士通用.*;

public class 全部劍士 extends AbstractSkillHandler {

    public 全部劍士() {
        for (Field field : 劍士通用.class.getDeclaredFields()) {
            try {
                skills.add(field.getInt(field.getName()));
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public boolean containsJob(int jobWithSub) {
        return JobConstants.is劍士(jobWithSub);
    }

    @Override
    public int getLinkedSkillID(int skillId) {
        switch (skillId) {
            case 幻靈武具_1:
                return 幻靈武具;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 幻靈武具:
                statups.put(MapleBuffStat.IndieSummoned, 1);
                statups.put(MapleBuffStat.幻靈武具, effect.getLevel());
                return 1;
            case 幻靈武具_1:
                effect.getInfo().put(MapleStatInfo.attackCount, 15);
                return 1;
            case 鋼鐵之軀:
                statups.put(MapleBuffStat.IndieAsrR, effect.getInfo().get(MapleStatInfo.indieAsrR));
                statups.put(MapleBuffStat.UNK55, 1);
                statups.put(MapleBuffStat.鋼鐵之軀, 1);
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
        AbstractSkillHandler holder = SkillClassFetcher.getHandlerByJob(player.getJobWithSub());
        if (holder == this) {
            return -1;
        }
        return holder.onAfterAttack(player, applier);
    }
}
