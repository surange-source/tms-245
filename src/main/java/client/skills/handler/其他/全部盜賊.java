package client.skills.handler.其他;

import client.MapleBuffStat;
import client.MapleCharacter;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.skills.handler.SkillClassFetcher;
import client.status.MonsterStatus;
import constants.JobConstants;
import constants.skills.通用V核心.盜賊通用;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.life.MapleMonster;

import java.lang.reflect.Field;
import java.util.Map;

import static constants.skills.通用V核心.盜賊通用.*;

public class 全部盜賊 extends AbstractSkillHandler {

    public 全部盜賊() {
        for (Field field : 盜賊通用.class.getDeclaredFields()) {
            try {
                skills.add(field.getInt(field.getName()));
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public boolean containsJob(int jobWithSub) {
        return JobConstants.is盜賊(jobWithSub);
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 必死決心:
                statups.put(MapleBuffStat.IndiePMdR, effect.getInfo().get(MapleStatInfo.y));
                statups.put(MapleBuffStat.減少總迴避率, effect.getInfo().get(MapleStatInfo.x));
                statups.put(MapleBuffStat.受擊傷增加, effect.getInfo().get(MapleStatInfo.z));
                statups.put(MapleBuffStat.必死決心, 1);
                return 1;
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 必死決心: {
                final int value = applyto.getBuffedIntValue(MapleBuffStat.必死決心) + 1;
                if (value > 2) {
                    applier.overwrite = false;
                    applier.localstatups.clear();
                    return 1;
                }
                applier.localstatups.put(MapleBuffStat.必死決心, value);
                applier.localstatups.put(MapleBuffStat.IndiePMdR, value == 2 ? applier.effect.getQ() : applier.effect.getY());
                applier.localstatups.put(MapleBuffStat.受擊傷增加, value == 2 ? applier.effect.getS() : applier.effect.getZ());
                applier.localstatups.put(MapleBuffStat.減少總迴避率, value == 2 ? applier.effect.getW() : applier.effect.getX());
                return 1;
            }
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
