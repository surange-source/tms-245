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
import constants.GameConstants;
import constants.SkillConstants;
import packet.AdelePacket;
import packet.MaplePacketCreator;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.maps.ForceAtomObject;
import server.Randomizer;
import tools.data.MaplePacketReader;

import java.awt.*;
import java.lang.reflect.Field;
import java.util.*;
import java.util.List;
import java.util.stream.IntStream;

import static constants.skills.精靈遊俠.*;

public class 精靈遊俠 extends AbstractSkillHandler {

    public 精靈遊俠() {
        jobs = new MapleJob[] {
                MapleJob.精靈遊俠,
                MapleJob.精靈遊俠1轉,
                MapleJob.精靈遊俠2轉,
                MapleJob.精靈遊俠3轉,
                MapleJob.精靈遊俠4轉
        };

        for (Field field : constants.skills.精靈遊俠.class.getDeclaredFields()) {
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
        int[] ss = {時髦的移動, 王的資格, 精靈的回復, 英雄共鳴};
        for (int i : ss) {
            if (chr.getLevel() < 200 && i == 英雄共鳴) {
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
            case 靈魂之躍:
                return 藝術跳躍;
            case 旋風月光翻轉_2轉:
                return 昇龍刺擊;
            case 元素騎士1:
            case 元素騎士2:
                return 元素騎士;
            case 元素精靈_1:
            case 元素精靈_2:
            case 元素精靈_額外攻擊:
                return 元素精靈;
            case 精神迴避_1:
                return 精神迴避;
            case 西皮迪亞_1:
            case 西皮迪亞_2:
                return 西皮迪亞;
            case 皇家騎士_1:
                return 皇家騎士;
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
            case 精靈的祝福:
            case 精靈的祝福_傳授:
                effect.setMoveTo(effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 獨角獸射擊:
                monsterStatus.put(MonsterStatus.AddDamParty, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 依古尼斯咆嘯:
                statups.put(MapleBuffStat.AddAttackCount, 0);
                return 1;
            case 遠古意志:
                statups.put(MapleBuffStat.EMHP, effect.getInfo().get(MapleStatInfo.emhp));
                statups.put(MapleBuffStat.DamR, effect.getInfo().get(MapleStatInfo.damR));
                statups.put(MapleBuffStat.IndiePADR, effect.getInfo().get(MapleStatInfo.indiePadR));
                return 1;
            case 水盾:
                statups.put(MapleBuffStat.DamAbsorbShield, effect.getInfo().get(MapleStatInfo.x));
                statups.put(MapleBuffStat.TerR, effect.getInfo().get(MapleStatInfo.terR));
                statups.put(MapleBuffStat.AsrR, effect.getInfo().get(MapleStatInfo.terR));
                return 1;
            case 元素騎士:
                effect.setDebuffTime(effect.getSubTime() * 1000);
                monsterStatus.put(MonsterStatus.Freeze, 1);
                return 1;
            case 元素騎士1:
                monsterStatus.put(MonsterStatus.Burned, 1);
                return 1;
            case 傳說之槍: //not sure if negative
                monsterStatus.put(MonsterStatus.PDR, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 閃電之鋒:
                monsterStatus.put(MonsterStatus.DodgeBodyAttack, effect.getInfo().get(MapleStatInfo.x));
                monsterStatus.put(MonsterStatus.AddDamSkil, 1);
                return 1;
            case 楓葉祝福:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.BasicStatUp, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 英雄誓言:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 精靈祝福:
                statups.put(MapleBuffStat.Stance, effect.getInfo().get(MapleStatInfo.x));
                statups.put(MapleBuffStat.IndiePAD, effect.getInfo().get(MapleStatInfo.indiePad));
                return 1;
            case 元素精靈:
                statups.put(MapleBuffStat.元素精靈, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 西皮迪亞:
                statups.put(MapleBuffStat.IndieStance, effect.getInfo().get(MapleStatInfo.indieStance));
                statups.put(MapleBuffStat.IndiePADR, effect.getInfo().get(MapleStatInfo.indiePadR));
                return 1;
            case 皇家騎士:
                statups.put(MapleBuffStat.IndieInvincible, 1);
                statups.put(MapleBuffStat.皇家騎士, 1);
                return 1;
        }
        return -1;
    }

    @Override
    public int onSkillUse(MaplePacketReader slea, MapleClient c, MapleCharacter chr, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 元素騎士: {
                if (IntStream.of(元素騎士, 元素騎士1, 元素騎士2).filter(k -> chr.getSummonBySkillID(k) != null).count() >= 2) {
                    c.announce(MaplePacketCreator.sendSkillUseResult(false, 0));
                    return 0;
                }
                final int n4;
                if ((n4 = 元素騎士 + Randomizer.nextInt(3)) != applier.effect.getSourceId()) {
                    applier.effect = chr.getSkillEffect(n4);
                }
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 精靈的祝福:
            case 精靈的祝福_傳授: {
                applyto.changeMap(applier.effect.getX(), 0);
                return 1;
            }
            case 依古尼斯咆嘯: {
                if (applier.passive) {
                    applier.localstatups.clear();
                    applier.maskedDuration = applier.effect.getSubTime() * 1000;
                    applier.maskedstatups.put(MapleBuffStat.AddAttackCount, Math.min(applyto.getBuffedIntValue(MapleBuffStat.AddAttackCount) + 1, applier.effect.getY()));
                }
                return 1;
            }
            case 水盾: {
                MapleStatEffect eff;
                if ((eff = applyfrom.getSkillEffect(水盾_強化)) != null) {
                    applier.localstatups.put(MapleBuffStat.DamAbsorbShield, applier.effect.getX() + eff.getX());
                }
                if ((eff = applyfrom.getSkillEffect(水盾_提高免疫1)) != null) {
                    applier.localstatups.put(MapleBuffStat.AsrR, applier.effect.getASRRate() + eff.getX());
                }
                if ((eff = applyfrom.getSkillEffect(水盾_提高免疫2)) != null) {
                    applier.localstatups.put(MapleBuffStat.TerR, applier.effect.getTERRate() + eff.getX());
                }
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
            case 元素精靈: {
                applyto.getSkillEffect(元素精靈_1).applyTo(applyto);
                applyto.getSkillEffect(元素精靈_2).applyTo(applyto);
                return 1;
            }
            case 元素精靈_1:
            case 元素精靈_2: {
                applier.b7 = false;
                return 1;
            }
            case 元素精靈_額外攻擊: {
                applier.b3 = false;
                return 1;
            }
            case 西皮迪亞: {
                applier.localstatups.put(MapleBuffStat.RideVehicle, GameConstants.getMountItem(applier.effect.getSourceId(), applyto));
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onAfterAttack(MapleCharacter player, SkillClassApplier applier) {
        final MapleStatEffect skillEffect13 = player.getSkillEffect(依古尼斯咆嘯);
        if (applier.totalDamage > 0L && skillEffect13 != null && applier.effect != null && SkillConstants.getLinkedAttackSkill(applier.effect.getSourceId()) != SkillConstants.getLinkedAttackSkill(player.getCheatTracker().getLastAttackSkill())) {
            skillEffect13.unprimaryPassiveApplyTo(player);
        }
        final MapleStatEffect effecForBuffStat12;
        if ((effecForBuffStat12 = player.getEffectForBuffStat(MapleBuffStat.元素精靈)) != null && player.getCheatTracker().canNextBonusAttack(effecForBuffStat12.getS2() * 1000) && player.getBuffStatValueHolder(MapleBuffStat.元素精靈, 元素精靈) != null) {
            player.getClient().announce(MaplePacketCreator.userBonusAttackRequest(元素精靈_額外攻擊, 0, Collections.emptyList()));
        }
        if (player.getLastAttackSkillId() == 傳說之槍 && (applier.ai.skillId == 落葉旋風射擊 || applier.ai.skillId == 旋風突進 || applier.ai.skillId == 旋風月光翻轉 || applier.ai.skillId == 憤怒天使)) {
            if (effecForBuffStat12 != null) {
                player.reduceSkillCooldown(元素精靈, 1000);
            }
            player.reduceSkillCooldown(傳說之槍, 1000);
        } else if (player.getLastAttackSkillId() == 獨角獸射擊 && (applier.ai.skillId == 旋風月光翻轉 || applier.ai.skillId == 光速雙擊 || applier.ai.skillId == 傳說之槍 || applier.ai.skillId == 閃電之鋒 || applier.ai.skillId == 憤怒天使)) {
            if (effecForBuffStat12 != null) {
                player.reduceSkillCooldown(元素精靈, 1000);
            }
            player.reduceSkillCooldown(獨角獸射擊, 1000);
        } else if (player.getLastAttackSkillId() == 憤怒天使 && (applier.ai.skillId == 旋風月光翻轉 || applier.ai.skillId == 光速雙擊 || applier.ai.skillId == 獨角獸射擊 || applier.ai.skillId == 傳說之槍 || applier.ai.skillId == 閃電之鋒)) {
            if (effecForBuffStat12 != null) {
                player.reduceSkillCooldown(元素精靈, 1000);
            }
            player.reduceSkillCooldown(憤怒天使, 1000);
        }

        Map<Integer, ForceAtomObject> swordsMap = player.getForceAtomObjects();
        if (!player.isSkillCooling(皇家騎士_1)) {
            List<ForceAtomObject> removeList = new ArrayList<>();
            Iterator<Map.Entry<Integer, ForceAtomObject>> iterator = swordsMap.entrySet().iterator();
            while (iterator.hasNext()) {
                Map.Entry<Integer, ForceAtomObject> sword = iterator.next();
                if (sword.getValue().SkillId == 皇家騎士_1) {
                    removeList.add(sword.getValue());
                    iterator.remove();
                }
            }
            if (!removeList.isEmpty()) {
                player.getMap().broadcastMessage(AdelePacket.ForceAtomObjectRemove(player.getId(), removeList, 1), player.getPosition());
            }
        }

        if (applier.totalDamage > 0 && applier.ai.mobAttackInfo.size() > 0 && applier.ai.skillId != 皇家騎士_1 && player.getBuffStatValueHolder(皇家騎士) != null && !player.isSkillCooling(皇家騎士_1)) {
            player.registerSkillCooldown(player.getSkillEffect(皇家騎士_1), true);
            List<ForceAtomObject> createList = new ArrayList<>();
            for (int i = 0; i < 4; i++) {
                ForceAtomObject sword = new ForceAtomObject(player.getSpecialStat().gainForceCounter(), 14, 0, player.getId(), 0, 皇家騎士_1);
                sword.Position = new Point(applier.ai.mobAttackInfo.get(0).hitX + Randomizer.nextInt(200), applier.ai.mobAttackInfo.get(0).hitY + 46);
                sword.ObjPosition = new Point(applier.ai.mobAttackInfo.get(0).hitX, applier.ai.mobAttackInfo.get(0).hitY);
                sword.Expire = 10000;
                sword.Target = applier.ai.mobAttackInfo.get(0).mobId;
                swordsMap.put(sword.Idx, sword);
                createList.add(sword);
            }
            if (!createList.isEmpty()) {
                player.getMap().broadcastMessage(AdelePacket.ForceAtomObject(player.getId(), createList, 0), player.getPosition());
            }
        }
        return 1;
    }
}
