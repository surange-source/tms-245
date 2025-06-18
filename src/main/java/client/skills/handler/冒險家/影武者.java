package client.skills.handler.冒險家;

import client.MapleBuffStat;
import client.MapleCharacter;
import client.MapleClient;
import client.MapleJob;
import client.skills.ExtraSkill;
import client.skills.Skill;
import client.skills.SkillFactory;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.status.MonsterStatus;
import constants.SkillConstants;
import packet.MaplePacketCreator;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.life.MapleMonster;
import tools.data.MaplePacketReader;

import java.lang.reflect.Field;
import java.util.Collections;
import java.util.Map;

import static constants.skills.影武者.*;

public class 影武者 extends AbstractSkillHandler {

    public 影武者() {
        jobs = new MapleJob[] {
                MapleJob.盜賊_影武,
                MapleJob.下忍,
                MapleJob.中忍,
                MapleJob.上忍,
                MapleJob.隱忍,
                MapleJob.影武者
        };

        for (Field field : constants.skills.影武者.class.getDeclaredFields()) {
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
            case 強化狂刃刺擊_1:
                return 強化狂刃刺擊;
            case 強化狂刃風暴_1:
                return 強化狂刃風暴;
            case 隱_鎖鏈地獄_1:
                return 隱_鎖鏈地獄;
            case 暴風刃_1:
                return 暴風刃;
            case 疾刃颶風_1:
                return 疾刃颶風;
            case 幽靈之刃_修羅:
            case 幽靈之刃_修羅_1:
            case 幽靈之刃_羅剎:
                return 幽靈之刃;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 閃光彈:
                monsterStatus.put(MonsterStatus.AddDamParty, effect.getInfo().get(MapleStatInfo.y));
                return 1;
            case 翔空落葉斬:
                monsterStatus.put(MonsterStatus.Seal, 1);
                return 1;
            case 進階隱身術:
                statups.put(MapleBuffStat.DarkSight, effect.getLevel());
                statups.put(MapleBuffStat.Speed, 1);
                return 1;
            case 絕殺刃:
                effect.getInfo().put(MapleStatInfo.time, 60 * 1000);
                effect.setHpR(-effect.getInfo().get(MapleStatInfo.x) / 100.0);
                statups.put(MapleBuffStat.FinalCut, effect.getInfo().get(MapleStatInfo.y));
                return 1;
            case 隱_鎖鏈地獄:
                effect.setDebuffTime(effect.getDuration());
                effect.getInfo().put(MapleStatInfo.time, (int) (effect.getInfoD().get(MapleStatInfo.t) * 1000));
                statups.put(MapleBuffStat.NotDamaged, 1);
                return 1;
            case 隱_鎖鏈地獄_1:
                effect.setDebuffTime(SkillFactory.getSkill(隱_鎖鏈地獄).getEffect(effect.getLevel()).getDebuffTime());
                monsterStatus.put(MonsterStatus.Stun, 1);
                return 1;
            case 暗影迴避:
                statups.put(MapleBuffStat.IndiePAD, effect.getInfo().get(MapleStatInfo.indiePad));
                return 1;
            case 替身術:
                statups.put(MapleBuffStat.ShadowPartner, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 楓葉祝福:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.BasicStatUp, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 傳說冒險:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 修羅:
                statups.put(MapleBuffStat.Asura, effect.getInfo().get(MapleStatInfo.time) * 1000);
                return 1;
            case 隱藏刀:
                statups.clear();
                statups.put(MapleBuffStat.WindBreakerFinal, effect.getInfo().get(MapleStatInfo.x));
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 暴風刃:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.KeyDownMoving, effect.getInfo().get(MapleStatInfo.x));
                statups.put(MapleBuffStat.IgnoreMobpdpR, effect.getInfo().get(MapleStatInfo.ignoreMobpdpR));
                return 1;
        }
        return -1;
    }

    @Override
    public int onSkillUse(MaplePacketReader slea, MapleClient c, MapleCharacter chr, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 幻影替身: {
                applier.pos = slea.readPos();
                return 1;
            }
            case 炎獄修羅斬: {
                c.announce(MaplePacketCreator.sendSkillUseResult(true, applier.effect.getSourceId()));
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 回歸墮落城市: {
                applyto.changeMap(applier.effect.getX(), 0);
                return 1;
            }
            case 暗影迴避: {
                applyto.getClient().announce(MaplePacketCreator.sendCritAttack());
                return 1;
            }
            case 隱_鎖鏈地獄: {
                applier.b4 = false;
                return 1;
            }
            case 絕殺刃: {
                if (applier.primary || !applier.passive) {
                    return 0;
                }
                applier.maskedDuration = 3000;
                applier.maskedstatups.put(MapleBuffStat.NotDamaged, 1);
                if (applyto.getBuffedValue(MapleBuffStat.FinalCut) != null && !applyto.getCheatTracker().canNext絕殺刃()) {
                    applier.overwrite = false;
                    applier.localstatups.clear();
                    applier.localstatups.put(MapleBuffStat.FinalCut, applier.effect.getY());
                    applier.duration -= applier.effect.getV() * 1000;
                    return 1;
                }
                applyto.getCheatTracker().setNext絕殺刃(System.currentTimeMillis() + applier.effect.getV() * 1000);
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
            case 隱藏刀: {
                if (applier.passive) {
                    return 0;
                }
                return 1;
            }
            case 穢土轉生: {
                applyto.reduceSkillCooldownRate(絕殺刃, applier.effect.getX());
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyAttackEffect(MapleCharacter applyfrom, MapleMonster applyto, SkillClassApplier applier) {
        MapleStatEffect skillEffect11;
        if (containsJob(applyfrom.getJobWithSub()) && applier.totalDamage > 0L && (skillEffect11 = applyfrom.getSkillEffect(飛毒殺)) != null) {
            final MapleStatEffect skillEffect12;
            if ((skillEffect12 = applyfrom.getSkillEffect(致命的飛毒殺)) != null) {
                skillEffect11 = skillEffect12;
            }
            skillEffect11.applyMonsterEffect(applyfrom, applyto, skillEffect11.getDotTime() * 1000);
        }
        return 1;
    }

    @Override
    public int onAfterAttack(MapleCharacter player, SkillClassApplier applier) {
        if (applier.totalDamage > 0L) {
            MapleStatEffect eff = player.getEffectForBuffStat(MapleBuffStat.DarkSight);
            if (eff != null && eff.getSourceId() == constants.skills.盜賊.隱身術 && containsJob(player.getJobWithSub()) && (eff = player.getSkillEffect(進階隱身術)) != null && !eff.makeChanceResult(player)) {
                player.dispelEffect(MapleBuffStat.DarkSight);
            }

            if (applier.effect != null) {
                int add_skillId = 0;
                int cooldownSkillId = 0;
                int add_skillValue = 0;
                switch (applier.effect.getSourceId()) {
                    case 短刀護佑:
                        add_skillId = 幽靈之刃_修羅;
                        cooldownSkillId = 幽靈之刃;
                        add_skillValue = 6;
                        break;
                    case 幻影箭:
                        add_skillId = 幽靈之刃_羅剎;
                        cooldownSkillId = 幽靈之刃;
                        add_skillValue = 5;
                        break;
                    default:
                        add_skillId = 0;
                        break;
                }
                int skillLevel;
                Skill skill;
                MapleStatEffect addSkillEffect;
                if (add_skillId != 0 && (skillLevel = SkillConstants.getLinkedAttackSkill(cooldownSkillId)) > 0 && (skill = SkillFactory.getSkill(cooldownSkillId)) != null && (addSkillEffect = skill.getEffect(player.getSkillLevel(skillLevel))) != null && !player.isSkillCooling(cooldownSkillId)) {
                    player.registerSkillCooldown(cooldownSkillId, addSkillEffect.getCooldown(player), true);
                    ExtraSkill eskill = new ExtraSkill(add_skillId, player.getPosition());
                    eskill.Value = add_skillValue;
                    eskill.FaceLeft = (applier.ai.direction & 0x80) != 0 ? 1 : 0;
                    player.send(MaplePacketCreator.RegisterExtraSkill(applier.effect.getSourceId(), Collections.singletonList(eskill)));
                }
            }
        }

        if (applier.effect != null && applier.effect.getSourceId() == 絕殺刃) {
            applier.effect.applyBuffEffect(player, player, applier.effect.getBuffDuration(player), false, false, true, player.getPosition());
        }
        if (applier.effect != null && applier.effect.getSourceId() == 疾刃颶風) {
            ExtraSkill eskill = new ExtraSkill(疾刃颶風_1, player.getPosition());
            eskill.Value = 1;
            eskill.FaceLeft = (applier.ai.direction & 0x80) != 0 ? 1 : 0;
            player.getClient().announce(MaplePacketCreator.RegisterExtraSkill(applier.effect.getSourceId(), Collections.singletonList(eskill)));
        }
        return -1;
    }
}
