package client.skills.handler.其他;

import client.*;
import client.skills.Skill;
import client.skills.SkillEntry;
import client.skills.SkillFactory;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.status.MonsterStatus;
import packet.MaplePacketCreator;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import tools.data.MaplePacketReader;

import java.lang.reflect.Field;
import java.util.Map;

import static constants.skills.墨玄.*;

public class 墨玄 extends AbstractSkillHandler {

    public 墨玄() {
        jobs = new MapleJob[] {
                MapleJob.墨玄,
                MapleJob.墨玄1轉,
                MapleJob.墨玄2轉,
                MapleJob.墨玄3轉,
                MapleJob.墨玄4轉
        };

        for (Field field : constants.skills.墨玄.class.getDeclaredFields()) {
            try {
                skills.add(field.getInt(field.getName()));
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public int baseSkills(MapleCharacter chr, SkillClassApplier applier) {
        int level = chr.getLevel();
        Skill skil;
        final int[] ss = {玄山氣勢, 玄山回歸, 獨門咒語};
        for (int i : ss) {
            if (i == 獨門咒語 && level < 200) {
                continue;
            }
            int skillLevel = i == 玄山氣勢 ? Math.min(10, level / 20 + 1) : 1;
            skil = SkillFactory.getSkill(i);
            if (skil != null && chr.getSkillLevel(skil) < skillLevel) {
                applier.skillMap.put(i, new SkillEntry(skillLevel, (byte) 1, -1));
            }
        }
        if (chr.getJob() >= MapleJob.墨玄1轉.getId()) {
            int[] fixskills = {神功_粉碎拳, 覺醒};
            for (int f : fixskills) {
                skil = SkillFactory.getSkill(f);
                if (skil != null && chr.getSkillLevel(skil) <= 0 && chr.getMasterLevel(skil) <= 0) {
                    applier.skillMap.put(f, new SkillEntry((byte) 0, (byte) (skil.getMasterLevel() == 0 ? skil.getMaxLevel() : skil.getMasterLevel()), SkillFactory.getDefaultSExpiry(skil)));
                }
            }
        }
        return -1;
    }

    @Override
    public int getLinkedSkillID(int skillId) {
        switch (skillId) {
            case 玄山_招式進行_1: {
                return 玄山_第1式;
            }
            case 玄山_招式進行_2:
            case 玄山_招式進行_3: {
                return 玄山_第2式;
            }
            case 玄山_招式進行_4: {
                return 玄山_第3式;
            }
            case 玄山_招式進行_5:
            case 玄山_招式進行_6:
            case 玄山_招式進行_7:
            case 玄山_招式進行_8: {
                return 玄山_第4式;
            }
            case 密技_玄山微步_1: {
                return 密技_玄山微步;
            }
            case 神功_旋風腳_1:
            case 神功_旋風腳_2: {
                return 神功_旋風腳;
            }
            case 神功_亂打連拳_1: {
                return 神功_亂打連拳;
            }
            case 神功_大地崩塌_1:
            case 神功_大地崩塌_2: {
                return 神功_大地崩塌;
            }
            case 神功_移形換位_1:
            case 神功_移形換位_2: {
                return 神功_移形換位;
            }
            case 絕技_神玄武極_1: {
                return 絕技_神玄武極;
            }
            case 絕技_無我之境_1: {
                return 絕技_無我之境;
            }
            case 神功_破空拳_1:
            case 神功_破空拳_2:
            case 神功_破空拳神力的氣息: {
                return 神功_破空拳;
            }
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 獨門咒語:
                effect.setRangeBuff(true);
                effect.getInfo().put(MapleStatInfo.time, effect.getDuration() * 1000);
                statups.put(MapleBuffStat.MaxLevelBuff, effect.getX());
                return 1;
            case 密技_弓身彈影:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.Bullet_Count, 0);
                return 1;
            case 密技_狂暴化:
                statups.put(MapleBuffStat.Booster, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 密技_臨機應變:
                statups.put(MapleBuffStat.臨機應變, 1);
                return 1;
            case 密技_護身強氣:
                statups.put(MapleBuffStat.護身強氣, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 神功_旋風腳_1:
                effect.getInfo().put(MapleStatInfo.time, 5000);
                statups.put(MapleBuffStat.旋風腳, 1);
                return 1;
            case 神功_無影腳:
                effect.getInfo().put(MapleStatInfo.time, effect.getInfo().get(MapleStatInfo.z));
                statups.put(MapleBuffStat.IndieInvincible, 1);
                return 1;
            case 神功_移形換位_1:
                statups.put(MapleBuffStat.Indie_ExtraAttack, 47);
                statups.put(MapleBuffStat.IndieCurseDampening, 1);
                return 1;
            case 楓葉祝福:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.BasicStatUp, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 絕技_超熱波神力:
            case 絕技_神玄武極:
                effect.getInfo().put(MapleStatInfo.time, effect.getInfo().get(MapleStatInfo.y));
                statups.put(MapleBuffStat.IndieInvincible, 1);
                return 1;
            case 絕技_無我之境:
                statups.put(MapleBuffStat.Indie_ExtraAttack, 20);
                statups.put(MapleBuffStat.IndieCurseDampening, 1);
                return 1;
            case 絕技_暴技:
                statups.put(MapleBuffStat.IndieCr, effect.getInfo().get(MapleStatInfo.indieCr));
                statups.put(MapleBuffStat.IndieCD, effect.getInfo().get(MapleStatInfo.indieCD));
                statups.put(MapleBuffStat.IndieSummoned, 1);
                statups.put(MapleBuffStat.IndieCurseDampening, 1);
                return 1;
        }
        return -1;
    }

    @Override
    public int onSkillUse(MaplePacketReader slea, MapleClient c, MapleCharacter chr, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 神功_移形換位: {
                int godPower = 0;
                int time = 30000;
                if (chr.getSkillLevel(入神) > 0) {
                    godPower = (int) chr.getTempValues().getOrDefault("GodPower", 0);
                    godPower = Math.min(5, ++godPower);
                    chr.getTempValues().put("GodPower", godPower);
                    if (chr.getSkillLevel(入神_時間持續) > 0) {
                        time += 10000;
                    }
                }
                c.announce(MaplePacketCreator.encodeMoxuanPower(0, 0, 3000, 1, null));
                c.announce(MaplePacketCreator.encodeMoxuanPower(1, godPower, time, 0, null));
                return 1;
            }
            case 密技_武神降臨:
            case 絕技_神玄武極: {
                int godPower = 0;
                int time = 30000;
                if (chr.getSkillLevel(入神) > 0) {
                    godPower = applier.effect.getSourceId() == 密技_武神降臨 ? 5 : 0;
                    chr.getTempValues().put("GodPower", godPower);
                    if (chr.getSkillLevel(入神_時間持續) > 0) {
                        time += 10000;
                    }
                }
                c.announce(MaplePacketCreator.encodeMoxuanPower(1, godPower, time, 0, null));
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 玄山回歸: {
                applyto.changeMap(applier.effect.getX(), 0);
                return 1;
            }
            case 密技_弓身彈影: {
                final int value = applyto.getBuffedIntValue(MapleBuffStat.Bullet_Count) + (applier.passive ? 1 : -1);
                final MapleBuffStatValueHolder mbsvh = applyto.getBuffStatValueHolder(MapleBuffStat.Bullet_Count);
                if (!applier.primary || value < 0 || mbsvh != null && System.currentTimeMillis() < mbsvh.startTime + applier.effect.getT() * 1000 && applier.passive || value > applier.effect.getY()) {
                    return 0;
                }
                applier.duration = 2100000000;
                applier.localstatups.put(MapleBuffStat.Bullet_Count, value);
                return 1;
            }
            case 神功_旋風腳: {
                final MapleStatEffect skillEffect = applyto.getSkillEffect(神功_旋風腳_1);
                if (skillEffect != null) {
                    skillEffect.applyBuffEffect(applyto, skillEffect.getBuffDuration(applyto), true);
                }
                return 1;
            }
            case 神功_旋風腳_1: {
                if (applyto.hasBuffSkill(神功_旋風腳_1)) {
                    applyto.dispelEffect(神功_旋風腳_1);
                    return 0;
                }
                return 1;
            }
            case 神功_無影腳: {
                applyto.send(MaplePacketCreator.encodeMagicData17(applier.effect.getSourceId(), null));
                return 1;
            }
            case 神功_移形換位: {
                if (!applyto.hasBuffSkill(絕技_無我之境)) {
                    final MapleStatEffect skillEffect = applyto.getSkillEffect(神功_移形換位_1);
                    if (skillEffect != null) {
                        skillEffect.applyBuffEffect(applyto, skillEffect.getBuffDuration(applyto), true);
                    }
                }
                return 1;
            }
            case 絕技_無我之境: {
                if (applyto.hasBuffSkill(神功_移形換位_1)) {
                    applyto.dispelEffect(神功_移形換位_1);
                }
                return 1;
            }
            case 絕技_暴技: {
                applier.startChargeTime = 1;
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onAfterCancelEffect(MapleCharacter player, SkillClassApplier applier) {
        if (!applier.overwrite) {
            switch (applier.effect.getSourceId()) {
                case 絕技_無我之境: {
                    MapleStatEffect effect = player.getSkillEffect(神功_移形換位);
                    if (effect != null) {
                        effect.applyTo(player, true);
                    }
                    break;
                }
            }
        }
        return -1;
    }
}