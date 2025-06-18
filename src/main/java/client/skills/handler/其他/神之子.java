package client.skills.handler.其他;

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
import tools.data.MaplePacketReader;

import java.lang.reflect.Field;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import static constants.skills.神之子.*;

public class 神之子 extends AbstractSkillHandler {

    public 神之子() {
        jobs = new MapleJob[] {
                MapleJob.神之子JR,
                MapleJob.神之子10100,
                MapleJob.神之子10110,
                MapleJob.神之子10111,
                MapleJob.神之子
        };

        for (Field field : constants.skills.神之子.class.getDeclaredFields()) {
            try {
                skills.add(field.getInt(field.getName()));
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public int baseSkills(MapleCharacter chr, SkillClassApplier applier) {
        if (chr.getLevel() >= 100) {
            Skill skil;
            List<Integer> jobSkills = SkillFactory.getSkillsByJob(10100);
            jobSkills.addAll(SkillFactory.getSkillsByJob(10110));
            jobSkills.addAll(SkillFactory.getSkillsByJob(10111));
            jobSkills.addAll(SkillFactory.getSkillsByJob(10112));
            for (int i : jobSkills) {
                skil = SkillFactory.getSkill(i);
                if (skil != null && !skil.isInvisible() && skil.isFourthJob() && chr.getSkillLevel(skil) <= 0 && chr.getMasterLevel(skil) <= 0 && skil.getMasterLevel() > 0) {
                    applier.skillMap.put(i, new SkillEntry((byte) 0, (byte) skil.getMasterLevel(), SkillFactory.getDefaultSExpiry(skil))); //usually 10 master
                }
            }
            int[] skillIds = {神殿回歸, 雙重打擊, 時之威能, 聖靈神速, 爆裂跳躍, 爆裂衝刺, 時之庇護, 時之意志, 時間凝結, 時間扭曲, 掌握時間, 時間倒轉, 暗影之雨, 集中時間};
            for (int i : skillIds) {
                if (chr.getLevel() < 200 && i == 集中時間) {
                    continue;
                }
                skil = SkillFactory.getSkill(i);
                if (skil != null && skil.canBeLearnedBy(chr.getJob()) && chr.getSkillLevel(skil) <= 0) {
                    applier.skillMap.put(i, new SkillEntry((byte) skil.getMaxLevel(), (byte) skil.getMaxLevel(), -1));
                }
            }
        }
        return -1;
    }

    @Override
    public int getLinkedSkillID(int skillId) {
        switch (skillId) {
            case 爆裂閃現:
                return 爆裂衝刺;
            case 進階威力震擊_衝擊波:
                return 進階威力震擊;
            case 暗影降臨_劍氣:
                return 暗影降臨;
            case 進階迴旋之刃_劍氣:
                return 進階迴旋之刃;
            case 進階旋風_吸收:
                return 進階旋風;
            case 進階旋風急轉彎_劍氣:
                return 進階旋風急轉彎;
            case 進階旋風落葉斬_劍氣:
                return 進階旋風落葉斬;
            case 跳躍暴砍_衝擊波:
                return 跳躍暴砍;
            case 碎地猛擊_衝擊波:
                return 碎地猛擊;
            case 進階碎地猛擊_衝擊波:
            case 進階碎地猛擊_電磁區域:
                return 進階碎地猛擊;
            case 狂風千刃_漩渦:
                return 狂風千刃;
            case 暴風裂擊_漩渦:
                return 暴風裂擊;
            case 進階暴風裂擊_漩渦:
            case 進階暴風裂擊_電磁區域:
                return 進階暴風裂擊;
            case 時間凝結_發現:
            case 時間凝結_貝塔:
                return 時間凝結;
            case 終焉之時_1:
            case 終焉之時_2:
                return 終焉之時;
            case 協力攻擊_1:
            case 協力攻擊_2:
            case 協力攻擊_3:
            case 協力攻擊_4:
            case 協力攻擊_5:
            case 協力攻擊_6:
            case 協力攻擊_7:
                return 協力攻擊;
            case 暗影瞬閃_1:
            case 暗影瞬閃_2:
            case 暗影瞬閃_3:
                return 暗影瞬閃;
            case 自主武器_1:
                return 自主武器;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 集中時間:
                effect.setRangeBuff(true);
                effect.getInfo().put(MapleStatInfo.time, effect.getDuration() * 1000);
                statups.put(MapleBuffStat.MaxLevelBuff, effect.getX());
                return 1;
            case 時之威能:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.ZeroAuraStr, 1);
                statups.put(MapleBuffStat.IndiePAD, effect.getInfo().get(MapleStatInfo.indiePad));
                statups.put(MapleBuffStat.IndieMAD, effect.getInfo().get(MapleStatInfo.indieMad));
                statups.put(MapleBuffStat.IndiePDD, effect.getInfo().get(MapleStatInfo.indiePdd));
                statups.put(MapleBuffStat.IndieAsrR, effect.getInfo().get(MapleStatInfo.indieTerR));
                statups.put(MapleBuffStat.IndieTerR, effect.getInfo().get(MapleStatInfo.indieAsrR));
                return 1;
            case 聖靈神速:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.ZeroAuraSpd, 1);
                statups.put(MapleBuffStat.IndieACC, effect.getInfo().get(MapleStatInfo.indieAcc));
                statups.put(MapleBuffStat.IndieEVA, effect.getInfo().get(MapleStatInfo.indieEva));
                statups.put(MapleBuffStat.IndieJump, effect.getInfo().get(MapleStatInfo.indieJump));
                statups.put(MapleBuffStat.IndieSpeed, effect.getInfo().get(MapleStatInfo.indieSpeed));
                statups.put(MapleBuffStat.IndieBooster, effect.getInfo().get(MapleStatInfo.indieBooster));
                return 1;
            case 時間凝結_發現:
                statups.put(MapleBuffStat.TimeFastABuff, 1);
                return 1;
            case 時間凝結_貝塔:
                statups.put(MapleBuffStat.TimeFastBBuff, 1);
                return 1;
            case 免疫護罩:
                statups.put(MapleBuffStat.PowerTransferGauge, effect.getInfo().get(MapleStatInfo.x)); //MapleBuffStat.DamAbsorbShield
                return 1;
            case 時間倒轉:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.ReviveOnce, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 掌握時間:
                statups.put(MapleBuffStat.NotDamaged, 1);
                return 1;
            case 時之庇護:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.BasicStatUp, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 時間扭曲:
                monsterStatus.put(MonsterStatus.AddDamSkill2, effect.getInfo().get(MapleStatInfo.x));
                monsterStatus.put(MonsterStatus.AddDamParty, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 撕裂暴殺:
                monsterStatus.put(MonsterStatus.Lifting, 300);
                monsterStatus.put(MonsterStatus.Freeze, 1);
                return 1;
            case 碎甲:
                monsterStatus.put(MonsterStatus.MultiPMDR, effect.getInfo().get(MapleStatInfo.y));
                monsterStatus.put(MonsterStatus.PDR, effect.getInfo().get(MapleStatInfo.y));
                monsterStatus.put(MonsterStatus.MDR, effect.getInfo().get(MapleStatInfo.y));
                return 1;
            case 聖靈裂襲:
                monsterStatus.put(MonsterStatus.Burned, 1);
                return 1;
            case 終焉之時:
                effect.getInfo().put(MapleStatInfo.cooltimeMS, effect.getInfo().get(MapleStatInfo.cooltime));
                effect.getInfo().put(MapleStatInfo.cooltime, 0);
                statups.put(MapleBuffStat.IndiePMdR, effect.getInfo().get(MapleStatInfo.indiePMdR));
                statups.put(MapleBuffStat.IndieBooster, effect.getInfo().get(MapleStatInfo.indieBooster));
                statups.put(MapleBuffStat.IndieCooldownR, effect.getInfo().get(MapleStatInfo.q));

                monsterStatus.put(MonsterStatus.Speed, effect.getInfo().get(MapleStatInfo.y));
                return 1;
            case 協力攻擊:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.IndieInvincible, 1);
                statups.put(MapleBuffStat.SPAWN_UNK_56, 1);
                return 1;
        }
        return -1;
    }

    public int onSkillUse(MaplePacketReader slea, MapleClient c, MapleCharacter chr, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 終焉之時: {
                final MapleBuffStatValueHolder mbsvh;
                if ((mbsvh = chr.getBuffStatValueHolder(終焉之時)) != null) {
                    applier.effect.applyToMonster(chr, mbsvh.getLeftTime());
                    if (!chr.isSkillCooling(終焉之時)) {
                        chr.registerSkillCooldown(applier.effect.getSourceId(), applier.effect.getInfo().get(MapleStatInfo.cooltimeMS) * 1000, true);
                    }
                }
                return 0;
            }
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 神殿回歸: {
                applyto.changeMap(applier.effect.getX(), 0);
                return 1;
            }
            case 時之威能: {
                applyto.dispelEffect(聖靈神速);
                if (applyto.getBuffedValue(MapleBuffStat.ZeroAuraStr) != null) {
                    applier.overwrite = false;
                    applier.localstatups.clear();
                }
                return 1;
            }
            case 聖靈神速: {
                applyto.dispelEffect(時之威能);
                if (applyto.getBuffedValue(MapleBuffStat.ZeroAuraSpd) != null) {
                    applier.overwrite = false;
                    applier.localstatups.clear();
                }
                return 1;
            }
            case 免疫護罩: {
                final MapleBuffStatValueHolder mbsvh = applyto.getBuffStatValueHolder(MapleBuffStat.ImmuneBarrier);
                if (mbsvh != null) {
                    applier.buffz = Math.min(applyto.getBuffedIntValue(MapleBuffStat.ImmuneBarrier), applier.effect.getX() * applyto.getStat().getCurrentMaxHP() / 100);
                    applier.duration = mbsvh.getLeftTime();
                    applier.localstatups.put(MapleBuffStat.ImmuneBarrier, applier.buffz);
                    return 1;
                }
                applier.buffz = applier.effect.getX() * applyto.getStat().getCurrentMaxHP() / 100;
                applier.localstatups.put(MapleBuffStat.ImmuneBarrier, applier.buffz);
                return 1;
            }
            case 掌握時間: {
                if (applyto.getLevel() >= 200) {
                    SkillFactory.getSkill(掌握時間_200).getEffect(1).applyTo(applyto);
                }
                return 1;
            }
            case 時間凝結_發現: {
                applyto.reduceAllSkillCooldown(4000, true);
                applier.localstatups.put(MapleBuffStat.TimeFastABuff, Math.min(10, applyto.getBuffedIntValue(MapleBuffStat.TimeFastABuff) + 1));
                return 1;
            }
            case 時間凝結_貝塔: {
                applyto.reduceAllSkillCooldown(4000, true);
                applier.localstatups.put(MapleBuffStat.TimeFastBBuff, Math.min(10, applyto.getBuffedIntValue(MapleBuffStat.TimeFastBBuff) + applier.effect.getX()));
                return 1;
            }
            case 協力攻擊: {
                if (!applier.primary) {
                    return 0;
                }
                applier.overwrite = false;
                applier.startChargeTime = System.currentTimeMillis();
                applier.localstatups.put(MapleBuffStat.IndieInvincible, (int) applier.startChargeTime);
                applier.localstatups.put(MapleBuffStat.SPAWN_UNK_56, (int) applier.startChargeTime);
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyAttackEffect(MapleCharacter applyfrom, MapleMonster applyto, SkillClassApplier applier) {
        if (applier.effect != null && applier.effect.getSourceId() == 終焉之時 && applier.totalDamage > 0L) {
            final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
            mplew.writeShort(SendPacketOpcode.LP_MobTimeResist.getValue());
            mplew.writeInt(applyto.getObjectId());
            mplew.writeInt(1);
            mplew.writeInt(終焉之時_1);
            mplew.writeShort(100);
            mplew.writeInt(applyfrom.getId());
            mplew.write(1);
            applyfrom.getMap().broadcastMessage(applyfrom, mplew.getPacket(), true);
        }
        if (!applyfrom.isBeta()) {
            final MapleStatEffect skillEffect21 = applyfrom.getSkillEffect(聖靈裂襲);
            if (applier.totalDamage > 0L && skillEffect21 != null) {
                skillEffect21.applyMonsterEffect(applyfrom, applyto, skillEffect21.getMobDebuffDuration(applyfrom));
            }
        } else {
            if (applier.effect != null && applier.effect.getSourceId() == 進階威力震擊) {
                ExtraSkill eskill = new ExtraSkill(進階威力震擊_衝擊波, applyfrom.getPosition());
                eskill.Value = 1;
                eskill.FaceLeft = applyfrom.isFacingLeft() ? 0 : 1;
                applyfrom.getClient().announce(MaplePacketCreator.RegisterExtraSkill(applier.effect.getSourceId(), Collections.singletonList(eskill)));
            }
            final MapleStatEffect skillEffect22 = applyfrom.getSkillEffect(撕裂暴殺);
            if (applier.totalDamage > 0L && skillEffect22 != null) {
                skillEffect22.applyMonsterEffect(applyfrom, applyto, skillEffect22.getMobDebuffDuration(applyfrom));
            }
            final MapleStatEffect skillEffect23 = applyfrom.getSkillEffect(碎甲);
            if (applier.totalDamage > 0L && skillEffect23 != null) {
                skillEffect23.applyMonsterEffect(applyfrom, applyto, skillEffect23.getMobDebuffDuration(applyfrom));
            }
        }
        return 1;
    }

    @Override
    public int onAfterAttack(MapleCharacter player, SkillClassApplier applier) {
        if (player.isBeta() && applier.effect != null && applier.effect.getSourceId() == 進階威力震擊) {
            ExtraSkill eskill = new ExtraSkill(進階威力震擊_衝擊波, player.getPosition());
            eskill.Value = 1;
            eskill.FaceLeft = player.isFacingLeft() ? 0 : 1;
            player.getClient().announce(MaplePacketCreator.RegisterExtraSkill(applier.effect.getSourceId(), Collections.singletonList(eskill)));
        }
        final MapleStatEffect skillEffect20;
        if (applier.effect != null && applier.totalDamage > 0L && (skillEffect20 = player.getSkillEffect(時間凝結)) != null) {
            int n10;
            if (player.isBeta()) {
                n10 = 時間凝結_貝塔;
            } else {
                n10 = 時間凝結_發現;
            }
            final MapleStatEffect skillEffect21;
            if ((skillEffect21 = player.getSkillEffect(n10)) != null) {
                skillEffect21.applyTo(player);
            }
        }
        final MapleStatEffect skillEffect22;
        if (applier.effect != null && applier.effect.getSourceId() == 進階碎地猛擊_衝擊波 && (skillEffect22 = player.getSkillEffect(進階碎地猛擊)) != null) {
            skillEffect22.applyTo(player, player.getPosition());
        }
        return 1;
    }
}
