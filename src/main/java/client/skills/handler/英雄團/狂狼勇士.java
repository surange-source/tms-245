package client.skills.handler.英雄團;

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
import packet.MaplePacketCreator;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.life.MapleMonster;
import tools.data.MaplePacketReader;

import java.lang.reflect.Field;
import java.util.Collections;
import java.util.Map;

import static constants.skills.狂狼勇士.*;

public class 狂狼勇士 extends AbstractSkillHandler {

    public 狂狼勇士() {
        jobs = new MapleJob[] {
                MapleJob.傳說,
                MapleJob.狂狼勇士1轉,
                MapleJob.狂狼勇士2轉,
                MapleJob.狂狼勇士3轉,
                MapleJob.狂狼勇士4轉
        };

        for (Field field : constants.skills.狂狼勇士.class.getDeclaredFields()) {
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
        final int[] ss = {英雄的回響, 找回的記憶, 戰鬥衝刺, 返回瑞恩};
        for (int i : ss) {
            if (chr.getLevel() < 200 && i == 英雄的回響) {
                continue;
            }
            skil = SkillFactory.getSkill(i);
            if (skil != null && chr.getSkillLevel(skil) <= 0) {
                applier.skillMap.put(i, new SkillEntry(1, skil.getMaxMasterLevel(), -1));
            }
        }
        return -1;
    }

    @Override
    public int getLinkedSkillID(int skillId) {
        switch (skillId) {
            case 粉碎震撼_1:
            case 粉碎震撼_2:
                return 粉碎震撼;
            case 猛擲之矛_1:
                return 猛擲之矛;
            case 突刺之矛_1:
            case 突刺之矛_2:
                return 突刺之矛;
            case 挑飛_1:
                return 挑飛;
            case 旋風斬_1:
                return 旋風斬;
            case 空中震撼_1:
            case 空中震撼_2:
                return 空中震撼;
            case 鬥氣審判_1:
            case 鬥氣審判_2:
            case 鬥氣審判_3:
                return 鬥氣審判;
            case 一網打盡_1:
                return 一網打盡;
            case 極速巔峰_恐懼風暴_1:
            case 極速巔峰_恐懼風暴_2:
                return 極速巔峰_恐懼風暴;
            case 極速巔峰_目標鎖定_1:
                return 極速巔峰_目標鎖定;
            case 終極之矛_1:
            case 終極之矛_2:
            case 終極之矛_3:
            case 終極之矛_4:
                return 終極之矛;
            case 比耀德_1:
            case 比耀德_2擊:
            case 比耀德_3擊:
                return 比耀德;
            case 瑪哈的領域_MIST:
                return 瑪哈的領域;
            case 瑪哈之疾_1:
                return 瑪哈之疾;
            case 揮動瑪哈_1:
                return 揮動瑪哈;
            case 芬里爾墬擊_1:
                return 芬里爾墬擊;
            case 極冰風暴_1:
            case 極冰風暴_2:
                return 極冰風暴;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 英雄的回響:
                effect.setRangeBuff(true);
                effect.getInfo().put(MapleStatInfo.time, effect.getDuration() * 1000);
                statups.put(MapleBuffStat.MaxLevelBuff, effect.getX());
                return 1;
            case 強化連擊:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.BodyPressure, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 寒冰屬性:
                statups.put(MapleBuffStat.WeaponCharge, effect.getInfo().get(MapleStatInfo.x));

                monsterStatus.put(MonsterStatus.Speed, effect.getInfo().get(MapleStatInfo.q) * -1);
                return 1;
            case 旋風斬:
                monsterStatus.put(MonsterStatus.Seal, 1);
                return 1;
            case 矛之鬥氣:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.ComboAbilityBuff, 10);
                return 1;
            case 鬥氣爆發:
                statups.put(MapleBuffStat.IndieBooster, 1);
                statups.put(MapleBuffStat.AdrenalinBoost, effect.getInfo().get(MapleStatInfo.w));
                return 1;
            case 吸血術:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.AranDrain, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 楓葉祝福:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.BasicStatUp, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 英雄誓言:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 腎上腺動力源:
                statups.put(MapleBuffStat.腎上腺動力源, 1);
                return 1;
            case 瑪哈的領域_MIST:
                effect.getInfo().put(MapleStatInfo.time, 12000);
                return 1;
            case 瑪哈之疾:
                statups.put(MapleBuffStat.瑪哈之疾, effect.getInfo().get(MapleStatInfo.x));
                statups.put(MapleBuffStat.元素精靈, effect.getInfo().get(MapleStatInfo.x));
                return 1;
        }
        return -1;
    }

    @Override
    public int onSkillUse(MaplePacketReader slea, MapleClient c, MapleCharacter chr, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 腎上腺動力源: {
                chr.getSkillEffect(鬥氣爆發).applyTo(chr);
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 返回瑞恩: {
                applyto.changeMap(applier.effect.getX(), 0);
                return 1;
            }
            case 吸血術: {
                if (applyto.getBuffedIntValue(MapleBuffStat.AranDrain) > 0) {
                    applier.b3 = false;
                    applier.overwrite = false;
                    applier.localstatups.clear();
                }
                return 1;
            }
            case 矛之鬥氣: {
                final MapleStatEffect skillEffect13 = applyto.getSkillEffect(進階矛之鬥氣);
                final int min4;
                if ((min4 = Math.min(applyto.getAranCombo() / 50, applier.effect.getX())) <= 0 || applyto.getBuffedIntValue(MapleBuffStat.ComboAbilityBuff) >= applier.effect.getX()) {
                    return 0;
                }
                applier.localstatups.put(MapleBuffStat.IndiePAD, min4 * applier.effect.getY());
                applier.localstatups.put(MapleBuffStat.IndiePDD, min4 * applier.effect.getZ());
                applier.localstatups.put(MapleBuffStat.IndieSpeed, min4 * applier.effect.getW());
                if (skillEffect13 != null) {
                    applier.localstatups.put(MapleBuffStat.IndieCr, min4 * skillEffect13.getY());
                    applier.localstatups.put(MapleBuffStat.IndiePAD, min4 * (applier.effect.getY() + skillEffect13.getZ()));
                }
                applier.localstatups.put(MapleBuffStat.ComboAbilityBuff, min4);
                return 1;
            }
            case 瑪哈之疾: {
                applyto.getMap().removeAffectedArea(applyto.getId(), 瑪哈的領域_MIST);
                applyto.gainAranCombo(100, true);
                return 1;
            }
            case 瑪哈的領域_MIST: {
                applyto.removeDebuffs();
                applyto.addHPMP(applier.effect.getW(), applier.effect.getW());
                return 1;
            }
            case 英雄誓言: {
                if (applyfrom.getJob() / 1000 != applyto.getJob() / 1000) {
                    return 0;
                }
                applyto.dispelEffect(constants.skills.狂狼勇士.英雄誓言);
                applyto.dispelEffect(constants.skills.龍魔導士.英雄歐尼斯);
                applyto.dispelEffect(constants.skills.夜光.英雄誓言);
                applyto.dispelEffect(constants.skills.精靈遊俠.英雄誓言);
                applyto.dispelEffect(constants.skills.幻影俠盜.英雄誓言);
                applyto.dispelEffect(constants.skills.隱月.英雄誓約);
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyAttackEffect(MapleCharacter applyfrom, MapleMonster applyto, SkillClassApplier applier) {
        final MapleStatEffect eff = applyfrom.getSkillEffect(寒冰屬性);
        if (eff != null && applyfrom.getBuffedValue(MapleBuffStat.WeaponCharge, 寒冰屬性) != null) {
            eff.applyMonsterEffect(applyfrom, applyto, eff.getY() * 1000);
        }
        return 1;
    }

    @Override
    public int onAfterAttack(MapleCharacter player, SkillClassApplier applier) {
        final MapleStatEffect skillEffect16;
        if (applier.effect != null && applier.effect.getSourceId() == 瑪哈的領域 && (skillEffect16 = player.getSkillEffect(瑪哈的領域_MIST)) != null) {
            skillEffect16.applyAffectedArea(player, player.getPosition());
        }
        if (player.getBuffStatValueHolder(MapleBuffStat.元素精靈, 瑪哈之疾) != null && player.getCheatTracker().canNextBonusAttack(3000)) {
            player.getClient().announce(MaplePacketCreator.userBonusAttackRequest(瑪哈之疾_1, 0, Collections.emptyList()));
        }
        MapleStatEffect l803;
        if (applier.effect != null && applier.effect.getSourceId() == 粉碎震撼 && (l803 = player.getSkillEffect(終極研究I)) != null) {
            if (player.getSkillEffect(終極研究II) != null) {
                l803 = player.getSkillEffect(終極研究II);
            }
            l803.unprimaryPassiveApplyTo(player);
        }
        if (player.getAranCombo() > 0 && player.getAranCombo() % 50 == 0) {
            final MapleStatEffect comboEff = player.getSkillEffect(矛之鬥氣);
            comboEff.applyTo(player);
        }
        return 1;
    }
}
