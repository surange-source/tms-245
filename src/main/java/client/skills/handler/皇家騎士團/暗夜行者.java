package client.skills.handler.皇家騎士團;

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
import packet.EffectPacket;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.life.MapleMonster;
import tools.data.MaplePacketReader;

import java.lang.reflect.Field;
import java.util.Map;

import static constants.skills.暗夜行者.*;

public class 暗夜行者 extends AbstractSkillHandler {

    public 暗夜行者() {
        jobs = new MapleJob[] {
                MapleJob.暗夜行者1轉,
                MapleJob.暗夜行者2轉,
                MapleJob.暗夜行者3轉,
                MapleJob.暗夜行者4轉
        };

        for (Field field : constants.skills.暗夜行者.class.getDeclaredFields()) {
            try {
                skills.add(field.getInt(field.getName()));
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public int baseSkills(MapleCharacter chr, SkillClassApplier applier) {
        super.baseSkills(chr, applier);
        Skill skill;
        int[] ss = {自然旋律, 影跳, 快速迴避};
        for (int i : ss) {
            skill = SkillFactory.getSkill(i);
            if (chr.getJob() >= i / 10000 && skill != null && chr.getSkillLevel(skill) <= 0) {
                applier.skillMap.put(skill.getId(), new SkillEntry(1, skill.getMaxMasterLevel(), -1));
            }
        }
        return -1;
    }

    @Override
    public int getLinkedSkillID(int skillId) {
        switch (skillId) {
            case 星塵_爆炸:
                return 星塵;
            case 三倍緩慢:
                return 三連投擲;
            case 五倍緩慢:
                return 四連投擲;
            case 四倍緩慢:
                return 五連投擲;
            case 暗影蝙蝠_攻擊:
            case 暗影蝙蝠_反彈:
            case 暗影蝙蝠_召喚獸:
                return 暗影蝙蝠;
            case 吸收活力_1:
                return 吸收活力;
            case 影幻_影子40:
            case 影幻_影子20:
                return 影幻;
            case 影之槍_1:
            case 影之槍_2:
                return 影之槍;
            case 暗影投擲_1:
                return 暗影投擲;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 暗影蝙蝠_攻擊:
                effect.getInfo().put(MapleStatInfo.mobCount, 3);
                return 1;
            case 元素_闇黑:
                statups.put(MapleBuffStat.ElementDarkness, 1);
                return 1;
            case 急速:
                effect.setPartyBuff(true);
                return 1;
            case 暗影蝙蝠:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.NightWalkerBat, 1);
                return 1;
            case 暗影僕從:
                statups.put(MapleBuffStat.ShadowServant, 1);
                return 1;
            case 闇黑蔓延:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.ReviveOnce, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 影跡:
                statups.put(MapleBuffStat.Stance, 100);

                monsterStatus.put(MonsterStatus.Freeze, 1);
                return 1;
            case 吸收活力:
                statups.put(MapleBuffStat.SiphonVitality, 1);
                statups.put(MapleBuffStat.IncMaxHP, effect.getInfo().get(MapleStatInfo.y));
                return 1;
            case 道米尼奧:
                statups.put(MapleBuffStat.Dominion, 1);
                statups.put(MapleBuffStat.IndiePMdR, effect.getInfo().get(MapleStatInfo.indiePMdR));
                statups.put(MapleBuffStat.IndieStance, effect.getInfo().get(MapleStatInfo.indieStance));
                statups.put(MapleBuffStat.IndieCr, effect.getInfo().get(MapleStatInfo.indieCr));
                return 1;
            case 影幻:
                statups.put(MapleBuffStat.ShadowIllusion, 1);
                return 1;
            case 暗影蝙蝠_召喚獸:
                effect.getInfo().put(MapleStatInfo.time, 60000);
                return 1;
            case 黑暗面:
                statups.put(MapleBuffStat.DarkSight, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 投擲助推器:
                statups.put(MapleBuffStat.Booster, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 西格諾斯騎士:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.BasicStatUp, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 守護者的榮耀:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 影之槍:
                statups.put(MapleBuffStat.WizardIgnite, effect.getLevel());
                return 1;
            case 暗影吞噬:
                statups.put(MapleBuffStat.IndiePMdR, effect.getInfo().get(MapleStatInfo.y));
                return 1;
        }
        return -1;
    }

    @Override
    public int onSkillUse(MaplePacketReader slea, MapleClient c, MapleCharacter chr, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 影幻: {
                chr.getSkillEffect(暗影僕從).applyTo(chr);
                chr.getSkillEffect(影幻_影子40).applyTo(chr);
                chr.getSkillEffect(影幻_影子20).applyTo(chr);
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 暗影蝙蝠: {
                if (applyto.getBuffedIntValue(MapleBuffStat.NightWalkerBat) > 0) {
                    applier.overwrite = false;
                    applier.localstatups.clear();
                }
                return 1;
            }
            case 吸收活力: {
                final int min3 = Math.min(5, applyto.getBuffedIntValue(MapleBuffStat.SiphonVitality) + 1);
                int y = applier.effect.getY();
                if (applyto.getSkillLevel(吸收活力_血魔加成) > 0) {
                    y += 300;
                }
                if (applyto.getSkillLevel(吸收活力_強化) > 0) {
                    applier.localstatups.put(MapleBuffStat.IndiePDD, min3 * 100);
                }
                if (applyto.getSkillLevel(吸收活力_抗性提升) > 0) {
                    applier.localstatups.put(MapleBuffStat.IndieAsrR, 2 * min3);
                }
                applier.localstatups.put(MapleBuffStat.SiphonVitality, min3);
                applier.localstatups.put(MapleBuffStat.IncMaxHP, y * min3);
                return 1;
            }
            case 暗影蝙蝠_召喚獸: {
                applier.b7 = false;
                if (applyto.getSummonCountBySkill(暗影蝙蝠_召喚獸) >= 2 + (applyto.getSkillLevel(蝙蝠交流) > 0 ? 1 : 0) + (applyto.getSkillLevel(蝙蝠交流Ⅱ) > 0 ? 1 : 0) + (applyto.getSkillLevel(蝙蝠交流Ⅲ) > 0 ? 1 : 0)) {
                    return 0;
                }
                return 1;
            }
            case 闇黑蔓延: {
                if (applier.passive) {
                    applier.localstatups.clear();
                    applier.duration = 2000;
                    applier.localstatups.put(MapleBuffStat.NotDamaged, 1);
                    applyto.getClient().announce(EffectPacket.show黑暗重生(-1, 闇黑蔓延, 3000));
                    applyto.getMap().broadcastMessage(applyto, EffectPacket.show黑暗重生(applyto.getId(), 闇黑蔓延, 3000), false);
                }
                return 1;
            }
            case 守護者的榮耀: {
                if (applyfrom.getJob() / 1000 != applyto.getJob() / 1000 || applyto.getJob() / 1000 == 5) {
                    return 0;
                }
                applyto.dispelEffect(constants.skills.聖魂劍士.守護者榮耀);
                applyto.dispelEffect(constants.skills.烈焰巫師.守護者的榮耀);
                applyto.dispelEffect(constants.skills.破風使者.守護者榮耀);
                applyto.dispelEffect(constants.skills.暗夜行者.守護者的榮耀);
                applyto.dispelEffect(constants.skills.閃雷悍將.守護者榮耀);
                applyto.dispelEffect(constants.skills.米哈逸.明日女皇);
                return 1;
            }
            case 暗影吞噬: {
                applier.localstatups.put(MapleBuffStat.IndiePMdR, Math.min(applier.effect.getQ(), applier.effect.getY() * applyfrom.getSpecialStat().getShadowBite()));
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyAttackEffect(MapleCharacter applyfrom, MapleMonster applyto, SkillClassApplier applier) {
        if (applyfrom.getEffectForBuffStat(MapleBuffStat.SpinesOfShadow) != null && applyto.isAlive() && applier.effect != null && applier.effect.getSourceId() != 闇黑天魔 && applier.effect.getSourceId() != 影之槍_1 && applyfrom.getCheatTracker().canNextBonusAttack(3000)) {
            applyfrom.getSkillEffect(影之槍_1).applyAffectedArea(applyfrom, applyto.getPosition());
        }
        if (applier.effect != null && applier.effect.getSourceId() == 暗影吞噬) {
            if (applyto != null) {
                if (applyto.isBoss()) {
                    applyfrom.getSpecialStat().addShadowBite(applier.effect.getDuration(), applier.effect.getW());
                } else if (!applyto.isAlive()) {
                    applyfrom.getSpecialStat().addShadowBite(applier.effect.getDuration(), 1);
                }
            }
        }
        return 1;
    }

    @Override
    public int onAfterAttack(MapleCharacter player, SkillClassApplier applier) {
        final MapleStatEffect effecForBuffStat7 = player.getEffectForBuffStat(MapleBuffStat.NightWalkerBat);
        if (applier.totalDamage > 0L && effecForBuffStat7 != null && applier.effect != null && applier.effect.getBulletCount() > 1) {
            player.getCheatTracker().addShadowBat();
            final MapleStatEffect skillEffect12;
            if ((skillEffect12 = player.getSkillEffect(暗影蝙蝠_召喚獸)) != null && player.getCheatTracker().canSpawnShadowBat()) {
                skillEffect12.applyTo(player);
            }
        }
        return 1;
    }
}
