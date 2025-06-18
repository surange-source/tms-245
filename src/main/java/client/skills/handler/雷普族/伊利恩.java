package client.skills.handler.雷普族;

import client.*;
import client.force.MapleForceFactory;
import client.skills.Skill;
import client.skills.SkillEntry;
import client.skills.SkillFactory;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.status.MonsterStatus;
import constants.skills.通用V核心.雷普族通用;
import packet.EffectPacket;
import packet.ForcePacket;
import packet.MaplePacketCreator;
import packet.SummonPacket;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.maps.MapleSummon;
import server.quest.MapleQuest;
import tools.data.MaplePacketReader;

import java.awt.*;
import java.lang.reflect.Field;
import java.util.Collections;
import java.util.Map;

import static constants.skills.伊利恩.*;

public class 伊利恩 extends AbstractSkillHandler {

    public 伊利恩() {
        jobs = new MapleJob[] {
                MapleJob.伊利恩,
                MapleJob.伊利恩1轉,
                MapleJob.伊利恩2轉,
                MapleJob.伊利恩3轉,
                MapleJob.伊利恩4轉
        };

        for (Field field : constants.skills.伊利恩.class.getDeclaredFields()) {
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
        final int[] ss = {魔法迴路, 回歸魔法屏障, 獨門咒語};
        for (int i : ss) {
            if (chr.getLevel() < 200 && i == 獨門咒語) {
                continue;
            }
            skil = SkillFactory.getSkill(i);
            if (skil != null && chr.getSkillLevel(skil) <= 0) {
                applier.skillMap.put(i, new SkillEntry(1, skil.getMaxMasterLevel(), -1));
            }
        }
        if (chr.getQuestStatus(34900) != 2) {
            MapleQuest.getInstance(34900).forceComplete(chr, 0);
        }
        return -1;
    }

    @Override
    public int getLinkedSkillID(int skillId) {
        switch (skillId) {
            case 水晶傳送點_1:
                return 水晶傳送點;
            case 祝福標誌_1:
                return 祝福標誌;
            case 詛咒之印_怪物狀態:
                return 詛咒之印;
            case 水晶技能_德烏斯_1:
                return 水晶技能_德烏斯;
            case 古代水晶:
            case 古代水晶_1:
                return 水晶控制;
            case 技藝_子彈:
            case 榮耀之翼_強化暗器:
                return 技藝_暗器;
            case 技藝_暗器Ⅱ_1:
            case 技藝_子彈Ⅱ:
                return 技藝_暗器Ⅱ;
            case 榮耀之翼_強化暗器_2:
                return 榮耀之翼_和諧拍翅;
            case 即刻反應_光線:
                return 水晶燃燒;
            case 神怒寶劍_1:
            case 神怒寶劍_2:
                return 神怒寶劍;
            case 水晶之門_1:
            case 水晶之門_2:
                return 水晶之門;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 戰鬥的流動:
            case 戰鬥的流動_傳授:
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.x));
                statups.put(MapleBuffStat.戰鬥的流動, 1);
                return 1;
            case 獨門咒語:
                effect.setRangeBuff(true);
                effect.getInfo().put(MapleStatInfo.time, effect.getDuration() * 1000);
                statups.put(MapleBuffStat.MaxLevelBuff, effect.getX());
                return 1;
            case 古代水晶:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                return 1;
            case 祝福標誌_1:
                statups.put(MapleBuffStat.祝福標誌, 1);
                statups.put(MapleBuffStat.IndiePAD, 0);
                statups.put(MapleBuffStat.IndieMAD, 0);
                statups.put(MapleBuffStat.IndieBooster, 0);
                return 1;
            case 詛咒之印_怪物狀態:
                monsterStatus.put(MonsterStatus.CurseMark, 1);
                return 1;
            case 魔法護腕推進器:
                statups.put(MapleBuffStat.Booster, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 雷普的勇士:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.BasicStatUp, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 補充佩斯特:
                statups.put(MapleBuffStat.IndieDamageRReduce, effect.getInfo().get(MapleStatInfo.x));
                statups.put(MapleBuffStat.快速充能, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 原始保護:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.NotDamaged, 1);
//                statups.put(MapleBuffStat.原初庇護, 1);
                return 1;
            case 技藝_子彈:
            case 技藝_子彈Ⅱ:
                effect.getInfo().put(MapleStatInfo.time, 2000);
                statups.put(MapleBuffStat.JavelinDamage, effect.getInfo().get(MapleStatInfo.y));
//                statups.put(MapleBuffStat.原初庇護, 1);
                return 1;
            case 水晶傳送點_1:
                effect.getInfo().put(MapleStatInfo.time, 1000);
//                statups.put(MapleBuffStat.原初庇護, 1);
                statups.put(MapleBuffStat.NewFlying, 1);
                return 1;
            case 水晶技能_榮耀之翼:
                statups.put(MapleBuffStat.NewFlying, 1);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                statups.put(MapleBuffStat.IndieStance, effect.getInfo().get(MapleStatInfo.indieStance));
//                statups.put(MapleBuffStat.原初庇護, 1);
                statups.put(MapleBuffStat.榮耀之翼, 1);
                return 1;
            case 強化水晶傳送點:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.RpSiksin, 1);
                return 1;
            case 完成水晶衝刺:
                effect.getInfo().put(MapleStatInfo.time, 10000);
                statups.put(MapleBuffStat.充能完成, 1);
                return 1;
            case 水晶技能_和諧連結:
                effect.getInfo().put(MapleStatInfo.time, 15000);
                statups.put(MapleBuffStat.和諧連結, 1);
                return 1;
            case 榮耀之翼_強化暗器_2:
                effect.getInfo().put(MapleStatInfo.bulletCount, 5);
                return 1;
            case 神之種族:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 水晶燃燒:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.KeyDownMoving, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 即刻反應_光線:
                effect.getInfo().put(MapleStatInfo.cooltime, 1);
                return 1;
        }
        return -1;
    }

    @Override
    public int onSkillUse(MaplePacketReader slea, MapleClient c, MapleCharacter chr, SkillClassApplier applier) {
        MapleForceFactory forceFactory = MapleForceFactory.getInstance();
        switch (applier.effect.getSourceId()) {
            case 技藝_暗器:
            case 榮耀之翼_強化暗器:
            case 技藝_暗器Ⅱ: {
                chr.getMap().broadcastMessage(chr, ForcePacket.forceAtomCreate(forceFactory.getMapleForce(chr, applier.effect, 0, Collections.singletonList(0))), true);
                return 1;
            }
            case 水晶控制: {
                final MapleSummon summon = chr.getSummonBySkillID(古代水晶);
                final MapleSummon summon1 = chr.getSummonBySkillID(瑪奇納);
                final Point point3 = new Point(chr.getPosition().x + (chr.isFacingLeft() ? -360 : 360), chr.getPosition().y);
                if (summon != null) {
                    c.announce(SummonPacket.SummonedForceMove(summon, 水晶控制, chr.getSkillLevel(水晶控制), point3));
                }
                if (summon1 != null) {
                    c.announce(SummonPacket.SummonedForceMove(summon1, 瑪奇納, chr.getSkillLevel(瑪奇納), point3));
                }
                return 1;
            }
            case 古代水晶_1: {
                final MapleSummon summonBySkillID4;
                if ((summonBySkillID4 = chr.getSummonBySkillID(古代水晶)) != null) {
                    final int ownerId = summonBySkillID4.getOwnerId();
                    final int objectId = summonBySkillID4.getObjectId();
                    final Point position = chr.getPosition();
                    c.announce(SummonPacket.SummonedForceReturn(ownerId, objectId, position));
                }
                return 1;
            }
            case 水晶技能_德烏斯: {
                final MapleSummon summon;
                if ((summon = chr.getSummonBySkillID(古代水晶)) != null) {
                    summon.setState(2, 0);
                    c.announce(SummonPacket.SummonedSkillState(summon, 2));
                }
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 回歸魔法屏障: {
                applyto.changeMap(applier.effect.getX(), 0);
                return 1;
            }
            case 古代水晶: {
                return 1;
            }
            case 里幽: {
                applier.localstatups.remove(MapleBuffStat.Speed);
                return 1;
            }
            case 祝福標誌_1: {
                int n = 0;
                MapleStatEffect eff;
                if ((eff = applyto.getSkillEffect(祝福標誌)) != null) {
                    n = eff.getX();
                }
                if ((eff = applyto.getSkillEffect(熟練水晶衝刺)) != null) {
                    n = eff.getX();
                }
                if ((eff = applyto.getSkillEffect(完成祝福標誌)) != null) {
                    n = eff.getX();
                }
                if (n <= 0) {
                    return 0;
                }
                final int value = 2 * applier.effect.getX() + 4 * applier.effect.getY() + 6 * applier.effect.getZ() + applier.effect.getW() * 10;
                applier.localstatups.put(MapleBuffStat.祝福標誌, applier.effect.getLevel());
                applier.localstatups.put(MapleBuffStat.IndiePAD, value);
                applier.localstatups.put(MapleBuffStat.IndieMAD, value);
                applier.localstatups.put(MapleBuffStat.IndieBooster, -applier.effect.getW());
                if (!applier.passive) {
                    return 1;
                }
                final MapleBuffStatValueHolder mbsvh = applyto.getBuffStatValueHolder(MapleBuffStat.祝福標誌);
                if (mbsvh != null) {
                    applier.duration = mbsvh.getLeftTime();
                    return 1;
                }
                applier.overwrite = false;
                applier.localstatups.clear();
                return 1;
            }
            case 原始保護: {
                applier.duration += applyto.getBuffedIntValue(MapleBuffStat.祝福標誌) * 1000;
                return 1;
            }
            case 水晶技能_榮耀之翼: {
                if (!applier.passive) {
                    applier.buffz = 1;
                    return 1;
                }
                applier.buffz = 0;
                final MapleBuffStatValueHolder mbsvh = applyto.getBuffStatValueHolder(MapleBuffStat.榮耀之翼);
                if (mbsvh != null) {
                    applier.duration = mbsvh.getLeftTime();
                }
                return 1;
            }
            case 聖靈護盾: {
                applier.b5 = false;
                applyto.getClient().announce(EffectPacket.showBlessOfDarkness(-1, applier.effect.getSourceId()));
                applyto.getMap().broadcastMessage(applyto, EffectPacket.showBlessOfDarkness(applyto.getId(), applier.effect.getSourceId()), false);
                return 1;
            }
            case 水晶技能_德烏斯: {
                applyto.dispelBuff(里幽);
                applyto.dispelBuff(瑪奇納);
                return 1;
            }
            case 神之種族: {
                if (applyfrom.getJob() / 1000 != applyto.getJob() / 1000) {
                    return 0;
                }
                applyto.dispelEffect(constants.skills.阿戴爾.神之種族);
                applyto.dispelEffect(constants.skills.伊利恩.神之種族);
                applyto.dispelEffect(constants.skills.亞克.神之種族);
                return 1;
            }
            case 靈魂水晶: {
                final int n43 = applyto.getBuffedIntValue(MapleBuffStat.Bullet_Count) + (applier.passive ? 1 : -1);
                final MapleBuffStatValueHolder buffStatValueHolder30 = applyto.getBuffStatValueHolder(MapleBuffStat.Bullet_Count);
                if (n43 < 0 || (applier.primary && buffStatValueHolder30 != null && System.currentTimeMillis() < buffStatValueHolder30.startTime + applier.effect.getQ() * 1000 && applier.passive) || n43 > applier.effect.getY()) {
                    return 0;
                }
                applier.duration = 2100000000;
                applier.localstatups.put(MapleBuffStat.Bullet_Count, n43);
                if (applier.passive && !applier.primary) {
                    applier.pos = applyto.getSummonBySkillID(古代水晶).getPosition();
                }
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onAfterAttack(MapleCharacter player, SkillClassApplier applier) {
        MapleStatEffect eff;
        if ((eff = player.getEffectForBuffStat(MapleBuffStat.榮耀之翼)) != null && applier.effect != null && applier.effect.getSourceId() == 榮耀之翼_致命龍劍風) {
            eff.unprimaryPassiveApplyTo(player);
        }
        final MapleSummon summonBySkillID2;
        if (applier.effect != null && applier.effect.getSourceId() == 水晶技能_致命攻擊 && (summonBySkillID2 = player.getSummonBySkillID(古代水晶)) != null) {
            summonBySkillID2.setState(0, 0);
            player.getClient().announce(SummonPacket.SummonedSkillState(summonBySkillID2, 2));
        }
        if (applier.effect != null && (applier.effect.getSourceId() == 即刻反應_文明爭戰 || applier.effect.getSourceId() == 即刻反應_文明爭戰Ⅱ)) {
            player.registerSkillCooldown(applier.effect, true);
        }
        final MapleSummon summonBySkillID3;
        if (applier.effect != null && applier.effect.getSourceId() == 即刻反應_光線 && (summonBySkillID3 = player.getSummonBySkillID(古代水晶)) != null) {
            player.registerSkillCooldown(applier.effect, true);
            player.getClient().announce(SummonPacket.SummonedStateChange(summonBySkillID3, 3, 0, 0));
        }
        final MapleStatEffect effecForBuffStat17;
        if ((effecForBuffStat17 = player.getEffectForBuffStat(MapleBuffStat.魔法迴路效能全開)) != null && applier.effect != null && applier.effect.getSourceId() != 雷普族通用.魔法迴路效能全開_1 && player.getCheatTracker().canNextBonusAttack(effecForBuffStat17.getX() * 1000)) {
            player.getClient().announce(MaplePacketCreator.userBonusAttackRequest(雷普族通用.魔法迴路效能全開_1, 0, Collections.emptyList()));
            effecForBuffStat17.unprimaryPassiveApplyTo(player);
        }
        return 1;
    }
}
