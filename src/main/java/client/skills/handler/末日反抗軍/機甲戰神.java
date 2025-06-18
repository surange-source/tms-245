package client.skills.handler.末日反抗軍;

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
import constants.enums.UserChatMessageType;
import constants.skills.通用V核心;
import packet.EffectPacket;
import packet.ForcePacket;
import packet.MaplePacketCreator;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import tools.Randomizer;
import tools.data.MaplePacketReader;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static constants.skills.機甲戰神.*;

public class 機甲戰神 extends AbstractSkillHandler {

    public 機甲戰神() {
        jobs = new MapleJob[]{
                MapleJob.機甲戰神1轉,
                MapleJob.機甲戰神2轉,
                MapleJob.機甲戰神3轉,
                MapleJob.機甲戰神4轉
        };

        for (Field field : constants.skills.機甲戰神.class.getDeclaredFields()) {
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
        Skill skil;
        int[] ss = {機甲戰神衝鋒, 隱藏碎片};
        for (int i : ss) {
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
            case 機甲戰神撞擊:
            case 機甲戰神雙重跳躍:
                return 機甲戰神衝鋒;
            case 巨型火炮_IRON:
                return 巨型火炮_SPLASH;
            case 巨型火炮_IRON_B_爆炸:
            case 巨型火炮_IRON_B:
                return 巨型火炮_SPLASH_F;
            case 機器人工廠_機器人:
                return 機器人工廠_RM1;
            case 多重屬性_M_FL_1:
                return 多重屬性_M_FL;
            case 重新填裝追蹤飛彈:
                return 合金盔甲_火力全開;
            case 巨型航母_1:
                return 巨型航母;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 合金盔甲_人型:
            case 合金盔甲終極:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.Mechanic, effect.getLevel());
                statups.put(MapleBuffStat.IndieBooster, 1);
                statups.put(MapleBuffStat.IndieSpeed, effect.getInfo().get(MapleStatInfo.indieSpeed)); //這個封包要放在騎獸BUFF的後面
                return 1;
            case 合金盔甲_戰車:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.Mechanic, effect.getLevel());
                statups.put(MapleBuffStat.CriticalBuff, effect.getInfo().get(MapleStatInfo.cr));
                return 1;
            case 隱藏碎片:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.HiddenPieceOn, 1);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                statups.put(MapleBuffStat.IndieMHPR, effect.getInfo().get(MapleStatInfo.indieMhpR));
                statups.put(MapleBuffStat.IndieMMPR, effect.getInfo().get(MapleStatInfo.indieMmpR));
                return 1;
            case 機甲戰神極速:
                statups.put(MapleBuffStat.Booster, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 全備型盔甲_Perfect_Armor:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.Guard, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 輔助機器強化:
            case 輔助機器_H_EX:
                monsterStatus.put(MonsterStatus.PDR, effect.getInfo().get(MapleStatInfo.y));
                return 1;
            case 磁場:
            case 火箭衝擊:
                monsterStatus.put(MonsterStatus.Seal, 1);
                return 1;
            case 幸運骰子:
            case 雙倍幸運骰子:
                statups.put(MapleBuffStat.Dice, 0);
                return 1;
            case 楓葉祝福:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.BasicStatUp, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 自由意志:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 多重屬性_M_FL:
                statups.put(MapleBuffStat.IndieSummoned, 1);
                return 1;
            case 微型導彈箱:
                effect.getInfo().put(MapleStatInfo.time, 2000);
                return 1;
            case 轟炸時刻:
                statups.put(MapleBuffStat.BombTime, 1);
                return 1;
            case 合金盔甲_火力全開:
                statups.put(MapleBuffStat.IndieInvincible, 1);
                statups.put(MapleBuffStat.IndieIgnorePCounter, 1);
                return 1;
        }
        return -1;
    }

    @Override
    public int onSkillUse(MaplePacketReader slea, MapleClient c, MapleCharacter chr, SkillClassApplier applier) {
        MapleForceFactory forceFactory = MapleForceFactory.getInstance();
        switch (applier.effect.getSourceId()) {
            case 追蹤飛彈:
            case 進階追蹤飛彈: {
                List<Integer> oids = IntStream.range(0, slea.readByte()).mapToObj(i -> slea.readInt()).collect(Collectors.toList());
                chr.getMap().broadcastMessage(chr, ForcePacket.forceAtomCreate(forceFactory.getMapleForce(chr, applier.effect, 0, oids)), true);
                return 1;
            }
            case 磁場: {
                if (chr.getSummonCountBySkill(磁場) < 2) {
                    applier.effect.applyBuffEffect(chr, applier.effect.getSummonDuration(chr), false);
//                    applier.effect.unprimaryApplyTo(chr, null);
                    return 0;
                }
                return 1;
            }
            case 微型導彈箱: {
                List<Integer> oids = new ArrayList<>();
                for (MapleMapObject mapleMapObject : chr.getMap().getMapObjectsInRange(chr.getPosition(), 775, Collections.singletonList(MapleMapObjectType.MONSTER))) {
                    oids.add(mapleMapObject.getObjectId());
                    if (oids.size() >= applier.effect.getMobCount()) {
                        return 1;
                    }
                }
                chr.getMap().broadcastMessage(chr, ForcePacket.forceAtomCreate(forceFactory.getMapleForce(chr, applier.effect, 0, oids)), true);
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 幸運骰子: {
                int dice = Randomizer.nextInt(6) + 1;
                if (applyto.getSpecialStat().getRemoteDice() > 0) {
                    dice = applyto.getSpecialStat().getRemoteDice();
                    applyto.getSpecialStat().setRemoteDice(-1);
                }
                if (dice == 1) {
                    applyto.reduceSkillCooldown(幸運骰子, 90000);
                }
                applyto.send(MaplePacketCreator.spouseMessage(UserChatMessageType.系統, "幸運骰子 技能發動[" + dice + "]號效果。"));
                applier.localstatups.put(MapleBuffStat.Dice, dice);
                applyto.getClient().announce(EffectPacket.showDiceEffect(-1, applier.effect.getSourceId(), applier.effect.getLevel(), dice, -1, false));
                applyto.getMap().broadcastMessage(applyto, EffectPacket.showDiceEffect(applyto.getId(), applier.effect.getSourceId(), applier.effect.getLevel(), dice, -1, false), false);
                return 1;
            }
            case 雙倍幸運骰子: {
                int remote = 0;
                int trueSource = applier.effect.getSourceId();
                int trueLevel = applier.effect.getLevel();
                MapleStatEffect effect = applyfrom.getSkillEffect(通用V核心.海盜通用.滿載骰子);
                if (effect != null) {
                    remote = applyfrom.getBuffedIntValue(MapleBuffStat.滿載骰子);
                    trueSource = effect.getSourceId();
                    trueLevel = effect.getLevel();
                }
                int[] array = new int[1 + (trueSource == 通用V核心.海盜通用.滿載骰子 ? 1 : 0) + (applier.effect.makeChanceResult(applyto) ? 1 : 0)];
                for (int i = 0; i < array.length; i++) {
                    if (i == 0 && remote > 0) {
                        array[i] = remote;
                    } else {
                        array[i] = Randomizer.rand(1, 6);
                        if (array.length == 3 && array[0] == array[1] && array[1] == array[2] && Randomizer.isSuccess(50)) {
                            array[i] = Randomizer.rand(1, 6);
                        }
                    }
                }
                int buffId = 0;
                for (int i = 0; i < array.length; i++) {
                    if (array[i] == 1) {
                        applyto.reduceSkillCooldown(雙倍幸運骰子, 90000);
                    }
                    buffId += array[i] * (int) Math.pow(10, i);
                    if (array[i] > 0) {
                        applyto.send(MaplePacketCreator.spouseMessage(UserChatMessageType.系統, "雙倍幸運骰子 技能發動[" + array[i] + "]號效果。"));
                    }
                }
                if (trueSource == 通用V核心.海盜通用.滿載骰子) {
                    applyto.getClient().announce(EffectPacket.showDiceEffect(-1, trueSource, trueLevel, -1, 1, false));
                    applyto.getMap().broadcastMessage(applyto, EffectPacket.showDiceEffect(applyto.getId(), trueSource, trueLevel, -1, 1, false), false);
                    for (int i = 0; i < array.length; i++) {
                        if (array[i] > 0) {
                            applyto.getClient().announce(EffectPacket.showDiceEffect(-1, trueSource, trueLevel, array[i], i == array.length - 1 ? 0 : -1, i != 0));
                            applyto.getMap().broadcastMessage(applyto, EffectPacket.showDiceEffect(applyto.getId(), trueSource, trueLevel, array[i], i == array.length - 1 ? 0 : -1, i != 0), false);
                        }
                    }
                    applyto.getClient().announce(EffectPacket.showDiceEffect(-1, trueSource, trueLevel, -1, 2, false));
                    applyto.getMap().broadcastMessage(applyto, EffectPacket.showDiceEffect(applyto.getId(), trueSource, trueLevel, -1, 2, false), false);
                } else {
                    applyto.getClient().announce(EffectPacket.showDiceEffect(-1, trueSource, trueLevel, buffId, -1, false));
                    applyto.getMap().broadcastMessage(applyto, EffectPacket.showDiceEffect(applyto.getId(), trueSource, trueLevel, buffId, -1, false), false);
                }
                applier.localstatups.put(MapleBuffStat.Dice, buffId);
                return 1;
            }
            case 自由意志: {
                if (applyfrom.getJob() / 1000 != applyto.getJob() / 1000) {
                    return 0;
                }
                applyto.dispelEffect(constants.skills.惡魔復仇者.惡魔韌性);
                applyto.dispelEffect(constants.skills.爆拳槍神.自由意志);
                applyto.dispelEffect(constants.skills.煉獄巫師.自由意志);
                applyto.dispelEffect(constants.skills.狂豹獵人.自由意志);
                applyto.dispelEffect(constants.skills.機甲戰神.自由意志);
                return 1;
            }
            case 輔助機器強化: {
                applier.localstatups.remove(MapleBuffStat.IndiePMdR);
                if (applier.passive) {
                    applier.localstatups.clear();
                    applier.maskedDuration = applier.duration;
                    applier.duration = 0;
                    applier.maskedstatups.put(MapleBuffStat.IndiePMdR, applier.effect.getZ());
                }
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onAfterAttack(MapleCharacter player, SkillClassApplier applier) {
        if (applier.effect != null && applier.effect.getSourceId() == 扭曲領域 && !applier.passive) {
            applier.effect.applyTo(player);
        }
        return 1;
    }
}
