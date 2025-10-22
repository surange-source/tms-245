package client.skills.handler.阿尼瑪族;

import client.MapleBuffStat;
import client.MapleCharacter;
import client.MapleClient;
import client.MapleJob;
import client.force.MapleForceFactory;
import client.skills.Skill;
import client.skills.SkillEntry;
import client.skills.SkillFactory;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.status.MonsterStatus;
import constants.GameConstants;
import constants.skills.管理員;
import handling.world.party.MaplePartyCharacter;
import packet.EffectPacket;
import packet.ForcePacket;
import packet.MaplePacketCreator;
import packet.SummonPacket;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.life.MapleMonster;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import server.maps.MapleSummon;
import server.quest.MapleQuest;
import server.Randomizer;
import tools.data.MaplePacketReader;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import static constants.skills.虎影.*;

public class 虎影 extends AbstractSkillHandler {

    public 虎影() {
        jobs = new MapleJob[] {
                MapleJob.虎影,
                MapleJob.虎影1轉,
                MapleJob.虎影2轉,
                MapleJob.虎影3轉,
                MapleJob.虎影4轉
        };

        for (Field field : constants.skills.虎影.class.getDeclaredFields()) {
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
        final int[] ss = {青雲回歸, 精靈親和, 形象變幻, 獨門咒語};
        for (int i : ss) {
            if (chr.getLevel() < 200 && i == 獨門咒語) {
                continue;
            }
            int skillLevel = 1;
            skil = SkillFactory.getSkill(i);
            if (skil != null && chr.getSkillLevel(skil) < skillLevel) {
                applier.skillMap.put(i, new SkillEntry(skillLevel, skil.getMaxMasterLevel(), -1));
            }
        }
        int[] fixskills = {筋斗云};
        for (int f : fixskills) {
            skil = SkillFactory.getSkill(f);
            if (chr.getJob() >= f / 10000 && skil != null && chr.getSkillLevel(skil) <= 0 && chr.getMasterLevel(skil) <= 0) {
                applier.skillMap.put(f, new SkillEntry(0, skil.getMasterLevel() == 0 ? skil.getMaxLevel() : skil.getMasterLevel(), SkillFactory.getDefaultSExpiry(skil)));
            }
        }
        return -1;
    }

    @Override
    public int getLinkedSkillID(int skillId) {
        switch (skillId) {
            case 魔封葫蘆符_1:
                return 魔封葫蘆符;
            case 土破流_虛實:
            case 土破流_實:
            case 土破流_虛:
                return 土破流_地;
            case 幻影分身符_1:
                return 幻影分身符;
            case 暗行_1:
                return 暗行;
            case 芭蕉風_虛實:
            case 芭蕉風_虛實_1:
            case 芭蕉風_虛實_2:
            case 芭蕉風_虛實_3:
            case 芭蕉風_虛實_4:
            case 芭蕉風_虛實_5:
                return 芭蕉風_天;
            case 地震碎_虛實:
            case 地震碎_虛實_1:
            case 地震碎_虛實_2:
            case 地震碎_虛實_3:
            case 地震碎_虛實_4:
                return 地震碎_地;
            case 滅火炎_虛實:
            case 滅火炎_虛實_1:
            case 滅火炎_虛實_2:
            case 滅火炎_虛實_3:
                return 滅火炎_天;
            case 金箍棒_人_1:
                return 金箍棒_人;
            case 歪曲縮地符_向門傳送:
            case 歪曲縮地符_向幻影傳送:
                return 歪曲縮地符;
            case 卷術_吸星渦流_1:
                return 卷術_吸星渦流;
            case 卷術_蝴蝶之夢_1:
                return 卷術_蝴蝶之夢;
            case 仙技_分身遁甲太乙仙人_攻擊:
                return 仙技_分身遁甲太乙仙人;
            case 仙技_極大分身亂舞_1:
                return 仙技_極大分身亂舞;
            case 卷術_山靈召喚_1:
                return 卷術_山靈召喚;
            case 仙技_降臨怪力亂神_1:
                return 仙技_降臨怪力亂神;
            case 仙技_天地人幻影_1:
            case 仙技_天地人幻影_2:
            case 仙技_天地人幻影_3:
            case 仙技_天地人幻影_4:
            case 仙技_天地人幻影_5:
                return 仙技_天地人幻影;
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
            case 仙扇加速:
                statups.put(MapleBuffStat.Booster, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 阿尼瑪勇士:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.BasicStatUp, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 魔封葫蘆符:
                monsterStatus.put(MonsterStatus.魔封葫蘆符, 1);
                return 1;
            case 筋斗云:
                // wz里单位是毫秒
                effect.getInfo().put(MapleStatInfo.time, effect.getInfo().get(MapleStatInfo.time) / 1000);
                statups.put(MapleBuffStat.IndieCurseDampening, 1);
                statups.put(MapleBuffStat.NewFlying, 1);
                return 1;
            case 雲身:
                // wz里单位是毫秒
                effect.getInfo().put(MapleStatInfo.time, effect.getInfo().get(MapleStatInfo.time) / 1000);
                return 1;
            case 暗行_1:
                statups.put(MapleBuffStat.DarkSight, 1);
                return 1;
            case 幻影分身符:
                statups.put(MapleBuffStat.幻影分身符, 1);
                return 1;
            case 地震碎_地:
                monsterStatus.put(MonsterStatus.Stun, 1);
                return 1;
            case 仙技_靈藥太乙仙丹:
                effect.getInfo().put(MapleStatInfo.subTime, effect.getInfo().get(MapleStatInfo.subTime) / 1000);
                statups.put(MapleBuffStat.IndiePMdR, effect.getIndiePMdR());
                statups.put(MapleBuffStat.太乙仙丹, 1);
                return 1;
            case 仙技_夢遊桃源:
                effect.getInfo().put(MapleStatInfo.time, effect.getInfo().get(MapleStatInfo.updatableTime));
                statups.put(MapleBuffStat.NotDamaged, 1);
                return 1;
            case 仙技_分身遁甲太乙仙人_攻擊:
                monsterStatus.put(MonsterStatus.Freeze, 1);
                return 1;
            case 卷術_蝴蝶之夢:
                statups.put(MapleBuffStat.IndiePMdR, effect.getIndiePMdR());
                statups.put(MapleBuffStat.蝴蝶之夢, 1);
                return 1;
            case 卷術_微生強變:
                monsterStatus.put(MonsterStatus.微生強變, 1);
                monsterStatus.put(MonsterStatus.IndiePDR, effect.getX());
                return 1;
            case 仙技_降臨怪力亂神:
                statups.put(MapleBuffStat.怪力亂神, 1);
                statups.put(MapleBuffStat.IndieDamR, effect.getIndieDamR());
                statups.put(MapleBuffStat.IndieSummoned, 1);
                return 1;
            case 仙技_極大分身亂舞:
                statups.put(MapleBuffStat.極大分身亂舞, 1);
                return 1;
            case 卷術_山靈召喚:
                statups.put(MapleBuffStat.IndieSummoned, 1);
                return 1;
        }
        return -1;
    }

    @Override
    public int onSkillUse(MaplePacketReader slea, MapleClient c, MapleCharacter chr, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 芭蕉風_虛實_2: {
                final MapleStatEffect skillEffect = chr.getSkillEffect(暗行_1);
                if (skillEffect != null) {
                    skillEffect.unprimaryPassiveApplyTo(chr);
                }
                return 1;
            }
            case 形象變幻: {
                chr.setQuestAdd(MapleQuest.getInstance(GameConstants.阿尼瑪外形), (byte) 0, "sw=1");
                String statData = chr.getOneInfo(GameConstants.阿尼瑪外形, "sw");
                if (statData == null || statData.equals("0")) {
                    statData = String.valueOf(1);
                } else {
                    statData = String.valueOf(0);
                }
                chr.updateOneInfo(GameConstants.阿尼瑪外形, "sw", statData, true);
                chr.getMap().broadcastMessage(MaplePacketCreator.showHoyoungHide(chr.getId(), Integer.valueOf(statData) == 1));
                return 1;
            }
            case 歪曲縮地符:
            case 歪曲縮地符_向門傳送: {
                applier.pos = slea.readPos();
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 青雲回歸: {
                applyto.changeMap(applier.effect.getX(), 0);
                return 1;
            }
            case 筋斗云: {
                applier.buffz = 50 + applyfrom.getStat().getSkillCustomVal(筋斗云);
                return 1;
            }
            case 暗行_1: {
                applyto.send(EffectPacket.showBuffEffect(applyto, false, applier.effect.getSourceId(), applier.effect.getLevel(), 1, null));
                return 1;
            }
            case 歪曲縮地符:
            case 歪曲縮地符_向門傳送:
            case 歪曲縮地符_向幻影傳送: {
                applier.overwrite = false;
                applyto.removeSummon(歪曲縮地符_向門傳送);
                return 1;
            }
            case 卷術_吸星渦流_1: {
                final MapleSummon summon = applyto.getSummonBySkillID(卷術_吸星渦流);
                if (summon != null) {
                    if (summon.getAcState2() > 0) {
                        final MapleStatEffect skillEffect = applyto.getSkillEffect(卷術_吸星渦流);
                        if (skillEffect == null) {
                            return 1;
                        }
                        final int hpMpHeal = summon.getAcState2() * skillEffect.getY();
                        if (applyto.getParty() == null) {
                            applyto.addHPMP(hpMpHeal, hpMpHeal);
                        } else {
                            for (MaplePartyCharacter mpc : applyto.getParty().getMembers().values()) {
                                final MapleCharacter pchr = mpc.getChr();
                                if (pchr != null) {
                                    pchr.addHPMP(hpMpHeal, hpMpHeal);
                                }
                            }
                        }
                        applyto.send(EffectPacket.showHoYoungHeal(-1, applier.effect.getSourceId(), summon.getPosition(), summon.getAcState2()));
                        applyto.getMap().broadcastMessage(applyto, EffectPacket.showHoYoungHeal(applyto.getId(), applier.effect.getSourceId(), summon.getPosition(), summon.getAcState2()), false);
                    }
                }
                applyto.dispelEffect(卷術_吸星渦流);
                return 1;
            }
            case 仙技_降臨怪力亂神: {
                if (applier.att) {
                    return 0;
                }
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyAttackEffect(MapleCharacter applyfrom, MapleMonster applyto, SkillClassApplier applier) {
        if (applier.effect != null && applier.effect.getSourceId() == constants.skills.虎影.卷術_吸星渦流) {
            MapleSummon summon = applyfrom.getSummonBySkillID(applier.effect.getSourceId());
            if (summon != null) {
                if (summon.getAcState1() < applier.effect.getZ()) {
                    summon.setAcState1(summon.getAcState1() + (applyto.isBoss() ? applier.effect.getW() : 1));
                } else {
                    summon.setAcState1(0);
                    summon.setAcState2(Math.min(summon.getAcState2() + 1, applier.effect.getX()));
                }
                applyfrom.getMap().broadcastMessage(applyfrom, SummonPacket.SummonedStateChange(summon, 2, summon.getAcState1(), summon.getAcState2()), true);
                applyfrom.getMap().broadcastMessage(applyfrom, SummonPacket.SummonedSpecialEffect(summon, 3), true);
            }
        }
        return 1;
    }

    @Override
    public int onAfterAttack(MapleCharacter player, SkillClassApplier applier) {
        MapleStatEffect effect;
        if ((effect = player.getEffectForBuffStat(MapleBuffStat.DarkSight)) != null) {
            if (effect.getSourceId() != 管理員.終極隱藏) {
                player.dispelEffect(MapleBuffStat.DarkSight);
            }
        } else if (applier.effect != null) {
            final MapleStatEffect skillEffect = player.getSkillEffect(暗行_1);
            if (skillEffect != null) {
                switch (applier.effect.getSourceId()) {
                    case 土破流_虛:
                    case 地震碎_虛實_3:
                        skillEffect.unprimaryPassiveApplyTo(player);
                        break;
                }
            }
        }
        if (applier.effect != null && applier.ai.mobCount > 0) {
            if (applier.effect.getAtSkillType() > 0 && player.getSkillEffect(符咒道力) != null) {
                final int state = player.handleHoYoungState(applier.effect.getAtSkillType());
                int runeHeal = 5 * state + 5;
                player.handleHoYoungValue(runeHeal, 0);
            }
            List<MapleMapObject> mobs;
            final MapleForceFactory mff = MapleForceFactory.getInstance();
            if (player.getBuffStatValueHolder(MapleBuffStat.幻影分身符) != null) {
                if (player.getCheatTracker().canNext幻影分身符()) {
                    effect = player.getEffectForBuffStat(MapleBuffStat.極大分身亂舞);
                    if (effect == null) {
                        effect = player.getSkillEffect(幻影分身符_1);
                    } else {
                        effect = player.getSkillEffect(仙技_極大分身亂舞_1);
                    }
                    if (effect != null) {
                        mobs = player.getMap().getMapObjectsInRect(effect.calculateBoundingBox(player.getPosition(), player.isFacingLeft(), 100), Collections.singletonList(MapleMapObjectType.MONSTER));
                        final List<Integer> list2 = new ArrayList<>();
                        if (!mobs.isEmpty()) {
                            for (int i = 0; i < effect.getY(); i++) {
                                list2.add(mobs.get(Randomizer.nextInt(mobs.size())).getObjectId());
                            }
                            player.getMap().broadcastMessage(player, ForcePacket.forceAtomCreate(mff.getMapleForce(player, effect, 0, list2)), true);
                        }
                    }
                }
            }
            if (player.getBuffStatValueHolder(MapleBuffStat.蝴蝶之夢) != null && applier.effect.getSourceId() != 卷術_蝴蝶之夢_1) {
                if (player.getCheatTracker().canNext蝶梦()) {
                    effect = player.getSkillEffect(卷術_蝴蝶之夢_1);
                    if (effect != null) {
                        mobs = player.getMap().getMapObjectsInRange(player.getPosition(), 500, Collections.singletonList(MapleMapObjectType.MONSTER));
                        List<Integer> mobOids;
                        if (mobs.size() > 0) {
                            mobOids = new ArrayList<>();
                            for (int i = 0; i < player.getSkillEffect(卷術_蝴蝶之夢).getU2() && i < mobs.size(); i++) {
                                mobOids.add(mobs.get(Randomizer.nextInt(mobs.size())).getObjectId());
                            }
                            player.getMap().broadcastMessage(player, ForcePacket.forceAtomCreate(mff.getMapleForce(player, effect, 0, mobOids, player.getPosition())), true);
                        }
                    }
                }
            }
        }
        return 1;
    }
}
