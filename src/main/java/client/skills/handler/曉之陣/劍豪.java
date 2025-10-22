package client.skills.handler.曉之陣;

import client.MapleBuffStat;
import client.MapleCharacter;
import client.MapleClient;
import client.MapleJob;
import client.skills.Skill;
import client.skills.SkillEntry;
import client.skills.SkillFactory;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.status.MonsterStatus;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.life.MapleMonster;
import server.Randomizer;
import tools.data.MaplePacketReader;

import java.lang.reflect.Field;
import java.util.Map;

import static constants.skills.劍豪.*;

public class 劍豪 extends AbstractSkillHandler {

    public 劍豪() {
        jobs = new MapleJob[] {
                MapleJob.劍豪,
                MapleJob.劍豪1轉,
                MapleJob.劍豪2轉,
                MapleJob.劍豪3轉,
                MapleJob.劍豪4轉
        };

        for (Field field : constants.skills.劍豪.class.getDeclaredFields()) {
            try {
                skills.add(field.getInt(field.getName()));
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public int baseSkills(MapleCharacter chr, SkillClassApplier applier) {
        Skill skil;
        int[] ss = {疾風五月雨刃, 天賦的才能, 攻守兼備, 英雄共鳴, 拔刀姿勢, 一般姿勢效果, 拔刀姿勢效果, 百人一閃, 五星的歸還, 曉月流基本技};
        for (int i : ss) {
            if (chr.getLevel() < 200 && i == 英雄共鳴) {
                continue;
            }
            skil = SkillFactory.getSkill(i);
            if (chr.getJob() >= i / 10000 && skil != null && chr.getSkillLevel(skil) <= 0) {
                applier.skillMap.put(i, new SkillEntry(skil.getMaxLevel(), skil.getMaxMasterLevel(), -1));
            }
        }
        return -1;
    }

    @Override
    public int getLinkedSkillID(int skillId) {
        switch (skillId) {
            case 百人一閃:
                return 疾風五月雨刃;
            case 一般姿勢效果:
                return 拔刀姿勢;
            case 昇流旋_1:
                return 昇流旋;
            case 曉月流瞬步:
                return 曉月流跳躍;
            case 昇龍斬_1:
                return 昇龍斬;
            case 飛鴉_1:
                return 飛鴉;
            case 旋風斬_1:
                return 旋風斬;
            case 斷空閃_1:
            case 斷空閃_2:
                return 斷空閃;
            case 鷹爪閃_1:
                return 鷹爪閃;
            case 旋風刃_1:
                return 旋風刃;
            case 瞬殺斬_1:
                return 瞬殺斬;
            case 一閃_稜:
                return 一閃;
            case 三連斬_疾_1:
            case 三連斬_疾_2:
            case 拔刀術_疾:
                return 三連斬_疾;
            case 三連斬_風_1:
            case 三連斬_風_2:
            case 拔刀術_風:
                return 三連斬_風;
            case 三連斬_迅_2:
            case 三連斬_迅_3:
            case 拔刀術_迅:
                return 三連斬_迅;
            case 三連斬_雷_2:
            case 三連斬_雷_3:
            case 曉月痕:
            case 拔刀術_雷:
                return 三連斬_雷;
            case 連刃斬_1:
            case 連刃斬_2:
            case 連刃斬_3:
                return 連刃斬;
            case 曉月流秘技:
                return 曉月流基本技;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 英雄共鳴:
                effect.setRangeBuff(true);
                effect.getInfo().put(MapleStatInfo.time, effect.getDuration() * 1000);
                statups.put(MapleBuffStat.MaxLevelBuff, effect.getX());
                return 1;
            case 疾風五月雨刃:
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 拔刀姿勢:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.HayatoStance, 1);
                return 1;
            case 一般姿勢效果:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.IndieMHPR, effect.getInfo().get(MapleStatInfo.indieMmpR));
                statups.put(MapleBuffStat.IndieMMPR, effect.getInfo().get(MapleStatInfo.indieMhpR));
                statups.put(MapleBuffStat.IndieIgnoreMobpdpR, effect.getInfo().get(MapleStatInfo.indieIgnoreMobpdpR));
                statups.put(MapleBuffStat.IndiePADR, effect.getInfo().get(MapleStatInfo.indiePadR));
                statups.put(MapleBuffStat.Stance, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 拔刀姿勢效果:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.IndieCr, 30);
                statups.put(MapleBuffStat.HayatoStanceBonus, 1);
                statups.put(MapleBuffStat.IndieBooster, effect.getInfo().get(MapleStatInfo.indieBooster));
                statups.put(MapleBuffStat.IndieBDR, effect.getInfo().get(MapleStatInfo.indieBDR));
                return 1;
            case 武神招來:
                statups.put(MapleBuffStat.HayatoPAD, effect.getInfo().get(MapleStatInfo.padX));
                statups.put(MapleBuffStat.HayatoHPR, effect.getInfo().get(MapleStatInfo.x));
                statups.put(MapleBuffStat.HayatoMPR, effect.getInfo().get(MapleStatInfo.y));
                return 1;
            case 柳身:
                statups.put(MapleBuffStat.RWCombination, effect.getInfo().get(MapleStatInfo.damR)); // MapleBuffStat.柳身_攻擊傷害上昇
                return 1;
            case 一閃:
                statups.put(MapleBuffStat.HayatoCr, effect.getInfo().get(MapleStatInfo.prop));
                return 1;
            case 迅速:
                statups.put(MapleBuffStat.迅速_減少敵人傷害, effect.getInfo().get(MapleStatInfo.t));
                return 1;
            case 剛健:
                statups.put(MapleBuffStat.IndieAsrR, effect.getInfo().get(MapleStatInfo.x));
                statups.put(MapleBuffStat.IndieTerR, effect.getInfo().get(MapleStatInfo.y));
                return 1;
            case 制敵之先:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.COUNTE_RATTACK, 0);
                return 1;
            case 無雙十刃之型:
                statups.put(MapleBuffStat.TerR, effect.getInfo().get(MapleStatInfo.x));
                statups.put(MapleBuffStat.AsrR, effect.getInfo().get(MapleStatInfo.y));
                return 1;
            case 曉月流基本技:
                statups.put(MapleBuffStat.DamR, effect.getInfo().get(MapleStatInfo.damR));
                statups.put(MapleBuffStat.曉月流基本技, 1);
                return 1;
            case 昇流旋:
            case 昇流旋_1:
            case 昇龍斬:
                effect.getInfo().put(MapleStatInfo.prop, 100);
                effect.getInfo().put(MapleStatInfo.time, 2300);

                monsterStatus.put(MonsterStatus.RiseByToss, 1);
                return 1;
            case 公主的加護:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 神速無雙:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.KeyDownMoving, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 秘劍_隼:
                statups.put(MapleBuffStat.Booster, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 曉月勇者:
                statups.put(MapleBuffStat.BasicStatUp, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 嘯月五影劍:
                statups.put(MapleBuffStat.IndiePMdR, 0);
                statups.put(MapleBuffStat.AriaShadowSword, 0);
                return 1;
            case 紅蓮咒縛:
                monsterStatus.put(MonsterStatus.Burned, 1);
                return 1;
            case 旋風刃:
            case 旋風刃_1:
                monsterStatus.put(MonsterStatus.Stun, 1);
                return 1;
            case 瞬殺斬:
            case 瞬殺斬_1:
                monsterStatus.put(MonsterStatus.AddDamParty, 1);
                return 1;
        }
        return -1;
    }

    @Override
    public int onSkillUse(MaplePacketReader slea, MapleClient c, MapleCharacter chr, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 嘯月五影劍:
                chr.applyHayatoStance(-200);
                return 1;
            case 拔刀姿勢:
                chr.applyHayatoStance((int) (-0.15 * chr.getSpecialStat().getHayatoPoint()));
                return 1;
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 五星的歸還: {
                applyto.changeMap(applier.effect.getX(), 0);
                return 1;
            }
            case 嘯月五影劍: {
                if (!applier.passive) {
                    return 1;
                }
                final int min9 = Math.min(5, applyto.getBuffedIntValue(MapleBuffStat.AriaShadowSword) + 1);
                applier.localstatups.put(MapleBuffStat.IndiePMdR, applier.effect.getW() * min9);
                applier.localstatups.put(MapleBuffStat.AriaShadowSword, min9);
                if (min9 >= 5) {
                    applier.applySummon = false;
                }
                return 1;
            }
            case 一般姿勢效果: {
                applyto.dispelEffect(拔刀姿勢效果);
                return 1;
            }
            case 拔刀姿勢效果: {
                applyto.dispelEffect(一般姿勢效果);
                return 1;
            }
            case 制敵之先: {
                if (!applier.primary) {
                    return 0;
                }
                return 1;
            }
            case 柳身: {
                applier.buffz = Math.min(applyto.getBuffedIntZ(MapleBuffStat.柳身_攻擊傷害上昇) + 1, applier.effect.getX());
                applier.localstatups.put(MapleBuffStat.柳身_攻擊傷害上昇, applier.buffz * applier.effect.getDamR());
                return 1;
            }
            case 公主的加護: {
                if (applyfrom.getJob() / 1000 != applyto.getJob() / 1000) {
                    return 0;
                }
                applyto.dispelEffect(constants.skills.劍豪.公主的加護);
                applyto.dispelEffect(constants.skills.陰陽師.公主的加護);
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyAttackEffect(MapleCharacter applyfrom, MapleMonster applyto, SkillClassApplier applier) {
        if (!applyto.isAlive()) {
            if (applyfrom.getBuffedIntValue(MapleBuffStat.HayatoStance) <= 0) {
                applyfrom.applyHayatoStance(5);
            }
            if (applier.effect != null && applier.effect.getSourceId() == 曉月流極義_劍神) {
                applyfrom.applyHayatoStance(applier.effect.getU());
            }
        } else {
            MapleStatEffect g112 = applyfrom.getSkillEffect(紅咒縛);
            if (applyfrom.getSkillEffect(紅蓮咒縛) != null) {
                g112 = applyfrom.getSkillEffect(紅蓮咒縛);
            }
            if (g112 != null) {
                g112.applyMonsterEffect(applyfrom, applyto, g112.getMobDebuffDuration(applyfrom));
            }
        }
        final MapleStatEffect skillEffect17;
        if ((skillEffect17 = applyfrom.getSkillEffect(心頭滅卻)) != null && skillEffect17.makeChanceResult(applyfrom) && Randomizer.nextInt(100) < applyfrom.getStat().critRate) {
            applyfrom.addHPMP(skillEffect17.getX(), 0);
        }
        return 1;
    }

    @Override
    public int onAfterAttack(MapleCharacter player, SkillClassApplier applier) {
        if (applier.effect != null) {
            switch (applier.effect.getSourceId()) {
                case 百人一閃: {
                    player.applyHayatoStance(-player.getSpecialStat().getHayatoPoint());
                    return 1;
                }
                case 曉月流極義_劍神: {
                    player.applyHayatoStance(applier.effect.getQ());
                    return 1;
                }
                case 嘯月光斬:
                case 曉月大太刀: {
                    player.applyHayatoStance(applier.effect.getX());
                    return 1;
                }
                case 嘯月五影劍: {
                    final MapleStatEffect effecForBuffStat13 = player.getEffectForBuffStat(MapleBuffStat.AriaShadowSword);
                    if (applier.totalDamage > 0L && effecForBuffStat13 != null) {
                        effecForBuffStat13.applyTo(player, true);
                    }
                    return 1;
                }
                default:
                    if (player.getBuffedIntValue(MapleBuffStat.HayatoStance) > 0) {
                        player.applyHayatoStance(2);
                    }
            }
        }
        return 1;
    }
}
