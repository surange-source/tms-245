package client.skills.handler.皇家騎士團;

import client.*;
import client.skills.ExtraSkill;
import client.skills.Skill;
import client.skills.SkillEntry;
import client.skills.SkillFactory;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.status.MonsterStatus;
import handling.opcode.SendPacketOpcode;
import packet.MaplePacketCreator;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.life.MapleMonster;
import tools.data.MaplePacketLittleEndianWriter;

import java.lang.reflect.Field;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import static constants.skills.閃雷悍將.*;

public class 閃雷悍將 extends AbstractSkillHandler {

    public 閃雷悍將() {
        jobs = new MapleJob[] {
                MapleJob.閃雷悍將1轉,
                MapleJob.閃雷悍將2轉,
                MapleJob.閃雷悍將3轉,
                MapleJob.閃雷悍將4轉
        };

        for (Field field : constants.skills.閃雷悍將.class.getDeclaredFields()) {
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
        Skill skill = SkillFactory.getSkill(constants.skills.貴族.自然旋律);
        if (skill != null && chr.getSkillLevel(skill) <= 0) {
            applier.skillMap.put(skill.getId(), new SkillEntry(1, skill.getMaxMasterLevel(), -1));
        }
        return -1;
    }

    @Override
    public int getLinkedSkillID(int skillId) {
        switch (skillId) {
            case 海浪_1:
                return 海浪;
            case 神雷合一_1:
                return 神雷合一;
            case 雷神槍擊_1:
                return 雷神槍擊;
            case 槍雷連擊_1:
            case 槍雷連擊_2:
            case 槍雷連擊_3:
            case 槍雷連擊_4:
            case 槍雷連擊_5:
            case 槍雷連擊_6:
            case 槍雷連擊_7:
            case 槍雷連擊_8:
            case 槍雷連擊_9:
                return 槍雷連擊;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 開天闢地:
                statups.put(MapleBuffStat.StrikerHyperElectric, 1);
                return 1;
            case 元素_雷電:
                statups.put(MapleBuffStat.CygnusElementSkill, 1); //主動BUFF是這個
                statups.put(MapleBuffStat.IgnoreTargetDEF, 5); //被動BUFF是這個默認為5點
                return 1;
            case 引雷:
                statups.put(MapleBuffStat.ShadowPartner, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 颱風:
            case 疾風:
                effect.setOverTime(true);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.y));
                return 1;
            case 致命快打:
                statups.put(MapleBuffStat.Booster, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 西格諾斯騎士:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.BasicStatUp, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 守護者榮耀:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 最終極速:
                statups.put(MapleBuffStat.PartyBooster, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 神雷合一:
                statups.put(MapleBuffStat.神雷合一, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 雷神槍擊:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.雷神槍擊, 0);
                return 1;
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 元素_雷電: {
                if (!applier.passive) {
                    return 1;
                }
                applier.localstatups.clear();
                applier.b3 = false;
                applier.maskedDuration = 30000;
                applier.buffz = Math.min(applyto.getBuffedIntZ(MapleBuffStat.IgnoreTargetDEF) + 1, applier.effect.getAttackCount(applyto));
                applier.maskedstatups.put(MapleBuffStat.IgnoreTargetDEF, (applier.buffz * (applyto.getSkillEffect(開天闢地) != null ? 9 : applier.effect.getX())));
                final MapleBuffStatValueHolder buffStatValueHolder11;
                if ((buffStatValueHolder11 = applyto.getBuffStatValueHolder(MapleBuffStat.CygnusElementSkill)) != null) {
                    applier.duration = buffStatValueHolder11.getLeftTime();
                }
                final MapleStatEffect skillEffect12;
                if ((skillEffect12 = applyto.getSkillEffect(引雷)) != null && applyto.isSkillCooling(引雷)) {
                    applyto.reduceSkillCooldown(引雷, skillEffect12.getY() * 1000);
                }
                return 1;
            }
            case 颱風:
            case 疾風: {
                applier.localstatups.put(MapleBuffStat.IndieDamR, applyto.getBuffedIntZ(MapleBuffStat.IgnoreTargetDEF) * applier.effect.getY());
                return 1;
            }
            case 開天闢地: {
                applyto.cancelSkillCooldown(疾風);
                applyto.cancelSkillCooldown(颱風);
                return 1;
            }
            case 守護者榮耀: {
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
            case 神雷合一: {
                if (applier.passive) {
                    return 0;
                }
                return 1;
            }
            case 雷神槍擊: {
                applier.duration = 2100000000;
                applier.localstatups.put(MapleBuffStat.雷神槍擊, Math.min(applier.effect.getX(), Math.max(0, applyto.getBuffedIntValue(MapleBuffStat.雷神槍擊) + 1)));
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyAttackEffect(MapleCharacter applyfrom, MapleMonster applyto, SkillClassApplier applier) {
        final MapleStatEffect effecForBuffStat9;
        if (containsJob(applyfrom.getJobWithSub()) && (effecForBuffStat9 = applyfrom.getEffectForBuffStat(MapleBuffStat.CygnusElementSkill)) != null && effecForBuffStat9.makeChanceResult(applyfrom) && applier.effect != null && applier.effect.getSourceId() != 疾風 && applier.effect.getSourceId() != 颱風 && applier.effect.getSourceId() != 消滅) {
            effecForBuffStat9.unprimaryPassiveApplyTo(applyfrom);
        }
        return 1;
    }

    @Override
    public int onAfterAttack(MapleCharacter player, SkillClassApplier applier) {
        MapleStatEffect eff = player.getEffectForBuffStat(MapleBuffStat.神雷合一);
        if (applier.effect != null && applier.totalDamage > 0L && eff != null) {
            final MapleClient client = player.getClient();
            final int sourceID = applier.effect.getSourceId();
            final int sourceID2 = eff.getSourceId();
            final int level = eff.getLevel();
            final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
            mplew.writeShort(SendPacketOpcode.ThunderSkillAction.getValue());
            mplew.writeInt(sourceID);
            mplew.writeInt(sourceID2);
            mplew.writeInt(level);
            client.announce(mplew.getPacket());
        }
        final MapleStatEffect skillEffect13 = player.getSkillEffect(雷神槍擊);
        if (applier.effect != null && applier.totalDamage > 0L && applier.ai.raytheonPike > 0 && skillEffect13 != null) {
            if (player.getBuffedIntValue(MapleBuffStat.雷神槍擊) >= 8) {
                List<ExtraSkill> eskills = new LinkedList<>();
                for (int i = 0; i < 7; i++) {
                    ExtraSkill eskill = new ExtraSkill(i == 0 ? 雷神槍擊 : 雷神槍擊_1, player.getPosition());
                    eskill.Value = 1;
                    eskill.FaceLeft = player.isFacingLeft() ? 0 : 1;
                    eskills.add(eskill);
                }
                player.getClient().announce(MaplePacketCreator.RegisterExtraSkill(雷神槍擊, eskills));
                player.dispelEffect(MapleBuffStat.雷神槍擊);
                return 1;
            }
            skillEffect13.unprimaryPassiveApplyTo(player);
        }
        return 1;
    }
}
