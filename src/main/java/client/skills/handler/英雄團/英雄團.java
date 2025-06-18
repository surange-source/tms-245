package client.skills.handler.英雄團;

import client.MapleBuffStat;
import client.MapleCharacter;
import client.MapleClient;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.skills.handler.SkillClassFetcher;
import client.status.MonsterStatus;
import constants.JobConstants;
import constants.skills.通用V核心.英雄團通用;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.life.MapleMonster;
import tools.data.MaplePacketReader;

import java.lang.reflect.Field;
import java.util.Map;

import static constants.skills.通用V核心.英雄團通用.*;

public class 英雄團 extends AbstractSkillHandler {

    public 英雄團() {
        for (Field field : 英雄團通用.class.getDeclaredFields()) {
            try {
                skills.add(field.getInt(field.getName()));
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public boolean containsJob(int jobWithSub) {
        return JobConstants.is英雄團(jobWithSub);
    }

    @Override
    public int getLinkedSkillID(int skillId) {
        switch (skillId) {
            case 普力特的祝福_1:
            case 普力特的祝福_2:
            case 普力特的祝福_3:
            case 普力特的祝福_4:
            case 普力特的祝福_5:
            case 普力特的祝福_6:
                return 普力特的祝福;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 普力特的祝福_1:
            case 普力特的祝福_2:
            case 普力特的祝福_3:
            case 普力特的祝福_4:
            case 普力特的祝福_5:
                statups.put(MapleBuffStat.普力特的祝福, effect.getSourceId() % 10 - 4);
                statups.put(MapleBuffStat.IndieCooldownR, effect.getInfo().get(MapleStatInfo.indieCooltimeReduce));
                statups.put(MapleBuffStat.IndieStance, effect.getInfo().get(MapleStatInfo.indieStance));
                statups.put(MapleBuffStat.IndieAllStat, effect.getInfo().get(MapleStatInfo.indieAllStat));
                statups.put(MapleBuffStat.IndiePAD, effect.getInfo().get(MapleStatInfo.indiePad));
                statups.put(MapleBuffStat.IndieMAD, effect.getInfo().get(MapleStatInfo.indieMad));
                statups.put(MapleBuffStat.IndieBDR, effect.getInfo().get(MapleStatInfo.indieBDR));
                return 1;
            case 普力特的祝福_6:
                statups.clear();
                statups.put(MapleBuffStat.普力特的祝福, 6);
                statups.put(MapleBuffStat.IndieCooldownR, effect.getInfo().get(MapleStatInfo.indieCooltimeReduce));
                statups.put(MapleBuffStat.IndieStance, effect.getInfo().get(MapleStatInfo.indieStance));
                statups.put(MapleBuffStat.IndieAllStat, effect.getInfo().get(MapleStatInfo.indieAllStat));
                statups.put(MapleBuffStat.IndiePAD, effect.getInfo().get(MapleStatInfo.indiePad));
                statups.put(MapleBuffStat.IndieMAD, effect.getInfo().get(MapleStatInfo.indieMad));
                statups.put(MapleBuffStat.IndieBDR, effect.getInfo().get(MapleStatInfo.indieBDR));
                statups.put(MapleBuffStat.NotDamaged, 1);
                break;
        }
        return -1;
    }

    @Override
    public int onSkillUse(MaplePacketReader slea, MapleClient c, MapleCharacter chr, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 普力特的祝福:
            case 普力特的祝福_1:
            case 普力特的祝福_2:
            case 普力特的祝福_3:
            case 普力特的祝福_4:
            case 普力特的祝福_5: {
                final MapleStatEffect eff;
                if ((eff = chr.getSkillEffect(普力特的祝福)) != null && !chr.isSkillCooling(eff.getSourceId())) {
                    chr.registerSkillCooldown(eff.getSourceId(), eff.getCooldown(chr), true);
                }
                return 1;
            }
            case 普力特的祝福_6: {
                final MapleStatEffect eff;
                if ((eff = chr.getSkillEffect(普力特的祝福)) == null) {
                    return 1;
                }
                if (!chr.isSkillCooling(eff.getSourceId())) {
                    chr.registerSkillCooldown(eff.getSourceId(), eff.getY() * 1000, true);
                    return 1;
                }
                if (chr.isSkillCooling(eff.getSourceId())) {
                    return 0;
                }
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 普力特的祝福_1:
            case 普力特的祝福_2:
            case 普力特的祝福_3:
            case 普力特的祝福_4:
            case 普力特的祝福_5:
            case 普力特的祝福_6: {
                applyto.dispelEffect(MapleBuffStat.普力特的祝福);
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
