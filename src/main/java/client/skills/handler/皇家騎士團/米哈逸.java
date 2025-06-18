package client.skills.handler.皇家騎士團;

import client.*;
import client.skills.Skill;
import client.skills.SkillEntry;
import client.skills.SkillFactory;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.status.MonsterStatus;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;

import java.lang.reflect.Field;
import java.util.Map;

import static constants.skills.米哈逸.*;

public class 米哈逸 extends AbstractSkillHandler {

    public 米哈逸() {
        jobs = new MapleJob[] {
                MapleJob.米哈逸,
                MapleJob.米哈逸1轉,
                MapleJob.米哈逸2轉,
                MapleJob.米哈逸3轉,
                MapleJob.米哈逸4轉
        };

        for (Field field : constants.skills.米哈逸.class.getDeclaredFields()) {
            try {
                skills.add(field.getInt(field.getName()));
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public int baseSkills(MapleCharacter chr, SkillClassApplier applier) {
        Skill skill;
        int[] ss = {英雄的回響, 聖地回歸, 元素精通};
        for (int i : ss) {
            if (chr.getLevel() < 200 && i == 英雄的回響) {
                continue;
            }
            skill = SkillFactory.getSkill(i);
            if (skill != null && chr.getSkillLevel(skill) <= 0) {
                applier.skillMap.put(skill.getId(), new SkillEntry(1, skill.getMaxMasterLevel(), -1));
            }
        }
        return -1;
    }

    @Override
    public int getLinkedSkillID(int skillId) {
        switch (skillId) {
            case 皇家之盾_9:
            case 皇家之盾_10:
                return 進階皇家之盾;
            case 皇家之盾_1:
            case 皇家之盾_2:
            case 皇家之盾_3:
            case 皇家之盾_4:
            case 皇家之盾_5:
            case 皇家之盾_6:
            case 皇家之盾_7:
            case 皇家之盾_8:
                return 皇家之盾;
            case 光輝聖劍_1:
            case 光輝聖劍_2:
            case 光輝聖劍_3:
            case 光輝聖劍_4:
            case 光輝聖劍_5:
                return 光輝聖劍;
            case 靈魂光狂斬:
                return 魂光劍擊;
            case 光之勇氣_1:
            case 光之勇氣_2:
            case 光之勇氣_3:
            case 光之勇氣_4:
                return 光之勇氣;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 英雄的回響:
                effect.setRangeBuff(true);
            case 女皇的祈禱:
                effect.getInfo().put(MapleStatInfo.time, effect.getDuration() * 1000);
                statups.put(MapleBuffStat.MaxLevelBuff, effect.getX());
                return 1;
            case 光之守護:
                statups.put(MapleBuffStat.MichaelStanceLink, 0);
                return 1;
            case 光之守護_傳授:
                statups.put(MapleBuffStat.Stance, effect.getInfo().get(MapleStatInfo.prop));
                return 1;
            case 神聖護石:
                statups.clear();
                statups.put(MapleBuffStat.DamAbsorbShield, effect.getInfo().get(MapleStatInfo.x));
                statups.put(MapleBuffStat.IndieMHPR, effect.getInfo().get(MapleStatInfo.indieMhpR));
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 快速之劍:
                statups.put(MapleBuffStat.Booster, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 皇家之盾_1:
                statups.put(MapleBuffStat.RoyalGuardPrepare, 1);
                effect.getInfo().put(MapleStatInfo.time, 4000);
                return 1;
            case 靈魂抗性:
                statups.put(MapleBuffStat.AsrR, effect.getInfo().get(MapleStatInfo.y));
                statups.put(MapleBuffStat.TerR, effect.getInfo().get(MapleStatInfo.z));
                statups.put(MapleBuffStat.DDR, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 魔防消除:
                monsterStatus.put(MonsterStatus.MagicCrash, 1);
                return 1;
            case 閃耀連擊:
                monsterStatus.put(MonsterStatus.Seal, 1);
                return 1;
            case 西格諾斯騎士:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.BasicStatUp, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 靈魂之怒:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.Enrage, effect.getInfo().get(MapleStatInfo.x));
                statups.put(MapleBuffStat.EnrageCr, effect.getInfo().get(MapleStatInfo.z));
                statups.put(MapleBuffStat.EnrageCrDamMin, effect.getInfo().get(MapleStatInfo.y));
                return 1;
            case 閃光交叉:
            case 靈魂突擊:
                monsterStatus.put(MonsterStatus.Blind, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 致命衝擊:
                monsterStatus.put(MonsterStatus.DeadlyCharge, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 明日女皇:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 熾天覆七重圓環:
                statups.put(MapleBuffStat.熾天覆七重圓環, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 魂光劍擊:
                statups.put(MapleBuffStat.IndieCr, effect.getInfo().get(MapleStatInfo.indieCr));
                statups.put(MapleBuffStat.IndieIgnoreMobpdpR, effect.getInfo().get(MapleStatInfo.indieIgnoreMobpdpR));
                statups.put(MapleBuffStat.IndiePADR, effect.getInfo().get(MapleStatInfo.indiePadR));
                statups.put(MapleBuffStat.魂光劍擊, effect.getInfo().get(MapleStatInfo.x));
                return 1;
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 聖地回歸: {
                applyto.changeMap(applier.effect.getX(), 0);
                return 1;
            }
            case 光之守護: {
                if (!applier.passive) {
                    return 1;
                }
                final MapleBuffStatValueHolder mbsvh = applyto.getBuffStatValueHolder(MapleBuffStat.MichaelStanceLink);
                if (mbsvh == null) {
                    return 0;
                }
                final int max = Math.max(0, mbsvh.value - 1);
                if (max > 0) {
                    applier.duration = mbsvh.getLeftTime();
                    applier.localstatups.put(MapleBuffStat.MichaelStanceLink, max);
                    return 1;
                }
                applier.overwrite = false;
                applier.localstatups.clear();
                return 1;
            }
            case 靈魂抗性: {
                MapleStatEffect eff;
                if ((eff = applyto.getSkillEffect(靈魂抗性_免疫附體)) != null) {
                    applier.localstatups.put(MapleBuffStat.TerR, applier.effect.getY() + eff.getY());
                    applier.localstatups.put(MapleBuffStat.AsrR, applier.effect.getZ() + eff.getZ());
                }
                if ((eff = applyto.getSkillEffect(靈魂抗性_鋼鐵身軀)) != null) {
                    applier.localstatups.put(MapleBuffStat.DDR, applier.effect.getX() + eff.getX());
                }
                return 1;
            }
            case 皇家之盾_1:
            case 皇家之盾_2:
            case 皇家之盾_3:
            case 皇家之盾_4:
            case 皇家之盾_5: {
                applier.b3 = true;
                applyto.registerSkillCooldown(皇家之盾, 6000, true);
                return 1;
            }
            case 皇家之盾_6:
            case 皇家之盾_7:
            case 皇家之盾_8:
            case 皇家之盾_9:
            case 皇家之盾_10: {
                applier.localstatups.put(MapleBuffStat.RoyalGuardState, Math.min(applyto.getBuffedIntValue(MapleBuffStat.RoyalGuardState) + 1, 5));
                applier.localstatups.put(MapleBuffStat.IndiePAD, applier.effect.getW());
                applyto.dispelEffect(MapleBuffStat.RoyalGuardState);
                applier.maskedstatups.put(MapleBuffStat.NotDamaged, 1);
                applier.maskedDuration = 2000;
                return 1;
            }
            case 明日女皇: {
                if (applyfrom.getJob() / 1000 != applyto.getJob() / 1000 || applyto.getJob() / 1000 == 1) {
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
        }
        return -1;
    }
}