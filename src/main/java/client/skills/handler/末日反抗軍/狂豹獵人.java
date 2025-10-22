package client.skills.handler.末日反抗軍;

import client.*;
import client.skills.Skill;
import client.skills.SkillEntry;
import client.skills.SkillFactory;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.status.MonsterEffectHolder;
import client.status.MonsterStatus;
import constants.GameConstants;
import constants.JobConstants;
import constants.SkillConstants;
import handling.opcode.EffectOpcode;
import packet.EffectPacket;
import packet.MaplePacketCreator;
import packet.MobPacket;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.life.MapleMonster;
import server.quest.MapleQuest;
import server.Randomizer;
import tools.data.MaplePacketReader;

import java.awt.*;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import static constants.skills.狂豹獵人.*;

public class 狂豹獵人 extends AbstractSkillHandler {

    public 狂豹獵人() {
        jobs = new MapleJob[] {
                MapleJob.狂豹獵人1轉,
                MapleJob.狂豹獵人2轉,
                MapleJob.狂豹獵人3轉,
                MapleJob.狂豹獵人4轉
        };

        for (Field field : constants.skills.狂豹獵人.class.getDeclaredFields()) {
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
        int[] ss = {捕獲, 獵人的呼喚, 美洲豹騎乘, 召喚美洲豹_銀灰, 爪攻擊, 挑釁, 管理美洲豹};
        for (int i : ss) {
            skil = SkillFactory.getSkill(i);
            if (chr.getJob() >= i / 10000 && skil != null && chr.getSkillLevel(skil) <= 0) {
                applier.skillMap.put(i, new SkillEntry(11, skil.getMaxMasterLevel(), -1));
            }
        }
        return -1;
    }

    @Override
    public int getLinkedSkillID(int skillId) {
        switch (skillId) {
            case 雙重射擊_美洲豹:
                return 雙重射擊;
            case 三重射擊_美洲豹:
                return 三重射擊;
            case 瘋狂射擊_美洲豹:
                return 瘋狂射擊;
            case 狂野機關砲_美洲豹:
            case 狂野機關砲_1:
            case 狂野機關砲TypeP:
                return 狂野機關砲;
            case 召喚美洲豹_暗黃:
            case 召喚美洲豹_血紅:
            case 召喚美洲豹_紫光:
            case 召喚美洲豹_深藍:
            case 召喚美洲豹_傑拉:
            case 召喚美洲豹_白雪:
            case 召喚美洲豹_歐尼斯:
            case 召喚美洲豹_地獄裝甲:
            case 召喚美洲豹_攻擊:
            case 另一個咬擊:
            case 召喚美洲豹_捕獲:
                return 召喚美洲豹_銀灰;
            case 歧路_騎乘:
            case 歧路_1:
                return 歧路;
            case 美洲豹靈魂_1:
                return 美洲豹靈魂;
            case 上跳_美洲豹:
            case 三連跳:
                return 連續跳躍;
            case 狂豹之怒:
            case 狂豹之怒_1:
                return 閃光雨;
            case 爪攻擊_1:
                return 爪攻擊;
            case 音暴_1:
                return 音暴;
            case 豹魂嵐擊_1:
            case 豹魂嵐擊_2:
                return 豹魂嵐擊;
            case 狂暴榴彈_1:
                return 狂暴榴彈;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 狂獸附體:
                statups.put(MapleBuffStat.BeastFormDamageUp, effect.getInfo().get(MapleStatInfo.x));
                statups.put(MapleBuffStat.Speed, effect.getInfo().get(MapleStatInfo.z));
                return 1;
            case 咆哮:
                statups.put(MapleBuffStat.HowlingAttackDamage, effect.getInfo().get(MapleStatInfo.z));
                return 1;
            case 延伸彈匣:
                statups.put(MapleBuffStat.IndieAllStat, effect.getInfo().get(MapleStatInfo.indieAllStat));
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 召喚美洲豹_銀灰:
            case 召喚美洲豹_暗黃:
            case 召喚美洲豹_血紅:
            case 召喚美洲豹_紫光:
            case 召喚美洲豹_深藍:
            case 召喚美洲豹_傑拉:
            case 召喚美洲豹_白雪:
            case 召喚美洲豹_歐尼斯:
            case 召喚美洲豹_地獄裝甲:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.JaguarSummoned, effect.getInfo().get(MapleStatInfo.criticaldamageMin) << 8 + effect.getInfo().get(MapleStatInfo.asrR));

                monsterStatus.put(MonsterStatus.Stun, 2);
                return 1;
            case 寧靜狂暴:
                statups.put(MapleBuffStat.FireBomb, effect.getInfo().get(MapleStatInfo.prop));
                return 1;
            case 障礙:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.DrawBack, 0);
                return 1;
            case 挑釁:
                monsterStatus.put(MonsterStatus.DodgeBodyAttack, 1);
                monsterStatus.put(MonsterStatus.JaguarProvoke, 6271772);//召喚獸ID
                return 1;
            case 另一個咬擊:
                monsterStatus.put(MonsterStatus.JaguarBleeding, 1);
                return 1;
            case 歧路:
                monsterStatus.put(MonsterStatus.Stun, 2);
                return 1;
            case 美洲豹靈魂:
                monsterStatus.put(MonsterStatus.Freeze, 1);
                monsterStatus.put(MonsterStatus.Smite, 1);
                return 1;
            case 銳利之眼:
                statups.put(MapleBuffStat.SharpEyes, (effect.getInfo().get(MapleStatInfo.x) << 8) + effect.getInfo().get(MapleStatInfo.y));
                return 1;
            case 楓葉祝福:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.BasicStatUp, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 自由意志:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 美洲豹風暴:
                statups.put(MapleBuffStat.元素精靈, effect.getLevel());
                return 1;
            case 豹魂嵐擊:
                statups.put(MapleBuffStat.NotDamaged, 1);
                return 1;
            case 狂暴榴彈:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.狂暴榴彈, 0);
                return 1;
        }
        return -1;
    }

    @Override
    public int onSkillUse(MaplePacketReader slea, MapleClient c, MapleCharacter chr, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 捕獲: {
                int mobID = slea.readInt();
                MapleMonster mob = chr.getMap().getMonsterByOid(mobID);
                if (mob != null) {
                    boolean success = mob.getHp() <= mob.getMobMaxHp() / 2 && mob.getId() >= 9304000 && mob.getId() < 9305000;
                    chr.getMap().broadcastMessage(chr, EffectPacket.encodeUserEffect(chr, applier.effect.getSourceId(), EffectOpcode.UserEffect_SkillUse, chr.getLevel(), applier.effect.getLevel(), (byte) (success ? 1 : 0)), chr.getPosition());
                    if (success) {
                        chr.getQuestNAdd(MapleQuest.getInstance(GameConstants.JAGUAR)).setCustomData(String.valueOf((mob.getId() % 10 + 1) * 10));
                        chr.getMap().killMonster(mob, chr, true, false, (byte) 1, 0);
                        chr.dispelEffect(MapleBuffStat.RideVehicle);
                        c.announce(MobPacket.showResults(mobID, true));
                        c.announce(MaplePacketCreator.updateJaguar(chr));
                    } else {
                        chr.dropMessage(5, "怪物體力過高，捕抓失敗。");
                        c.announce(MobPacket.showResults(mobID, false));
                    }
                }
                c.sendEnableActions();
                return 1;
            }
            case 豹魂嵐擊_2: {
                chr.getSkillEffect(美洲豹騎乘).applyTo(chr);
                return 1;
            }
            case 豹魂嵐擊: {
                c.announce(MaplePacketCreator.userBonusAttackRequest(豹魂嵐擊, 0, Collections.emptyList()));
                c.announce(MaplePacketCreator.userBonusAttackRequest(豹魂嵐擊_1, 0, Collections.emptyList()));
                return 1;
            }
            case 爪攻擊_1:
            case 爪攻擊:
            case 挑釁:
            case 歧路_1:
            case 歧路:
            case 歧路_騎乘:
            case 音暴_1:
            case 音暴:
            case 美洲豹靈魂:
            case 狂豹之怒: {
                chr.getSpecialStat().setJaguarSkillID(applier.effect.getSourceId());
                c.announce(MaplePacketCreator.美洲豹攻擊效果(applier.effect.getSourceId()));
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 狂獸附體: {
                final MapleStatEffect eff;
                if ((eff = applyto.getSkillEffect(狂獸附體_強化傷害)) != null) {
                    applier.localstatups.put(MapleBuffStat.BeastFormDamageUp, applier.effect.getZ() + eff.getZ());
                }
                if (applyto.getSkillEffect(狂獸附體_快速攻擊) != null) {
                    applier.localstatups.put(MapleBuffStat.IndieBooster, applier.effect.getIndieBooster() - 1);
                }
                return 1;
            }
            case 美洲豹連接: {
                final String keyValue = applyto.getKeyValue("JaguarCount");
                if (keyValue == null || !JobConstants.is狂豹獵人(applyto.getJob())) {
                    return 0;
                }
                applier.localstatups.put(MapleBuffStat.JaguarCount, Math.min(6, Integer.valueOf(keyValue)));
                return 1;
            }
            case 召喚美洲豹_銀灰:
            case 召喚美洲豹_暗黃:
            case 召喚美洲豹_血紅:
            case 召喚美洲豹_紫光:
            case 召喚美洲豹_深藍:
            case 召喚美洲豹_傑拉:
            case 召喚美洲豹_白雪:
            case 召喚美洲豹_歐尼斯:
            case 召喚美洲豹_地獄裝甲: {
                if (applier.duration < 2100000000) {
                    applier.b7 = false;
                    applier.localstatups.remove(MapleBuffStat.JaguarSummoned);
                    return 1;
                }
                applyto.dispelEffect(MapleBuffStat.JaguarSummoned);
                applier.localstatups.put(MapleBuffStat.JaguarSummoned, 2078);
                applier.duration = 2100000000;
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
            case 美洲豹風暴: {
                List<Integer> list = new ArrayList<>();
                int[] skills = {召喚美洲豹_暗黃, 召喚美洲豹_血紅, 召喚美洲豹_紫光,
                        召喚美洲豹_深藍, 召喚美洲豹_傑拉, 召喚美洲豹_白雪,
                        召喚美洲豹_歐尼斯, 召喚美洲豹_地獄裝甲};
                while (true) {
                    int skillid = skills[Randomizer.nextInt(skills.length)];
                    int mountid = Integer.parseInt(applyfrom.getInfoQuest(GameConstants.JAGUAR)) / 10 + 管理美洲豹;
                    if (!list.contains(skillid) && mountid != skillid) {
                        list.add(skillid);
                        if (list.size() >= applier.effect.getY()) {
                            break;
                        }
                    }
                }
                for (int skill : list) {
                    Point randomPos;
                    do {
                        randomPos = applyto.getMap().getRandomPos(applyto.getPosition());
                    } while (!applier.effect.calculateBoundingBox(applyto.getPosition(), applyto.isFacingLeft()).contains(randomPos));
                    applyfrom.getSkillEffect(skill).applyTo(applyfrom, applyfrom, applier.primary, randomPos, applier.duration, applier.passive);
                }
                return 1;
            }
            case 狂暴榴彈: {
                final int n44 = applyto.getBuffedIntValue(MapleBuffStat.狂暴榴彈) + ((applier.primary && applier.passive) ? 1 : -1);
                final MapleBuffStatValueHolder buffStatValueHolder31 = applyto.getBuffStatValueHolder(MapleBuffStat.狂暴榴彈);
                if (n44 < 0 || (applier.primary && buffStatValueHolder31 != null && System.currentTimeMillis() < buffStatValueHolder31.startTime + applier.effect.getT() * 1000 && applier.primary && applier.passive) || n44 > applier.effect.getZ()) {
                    return 0;
                }
                applier.duration = 2100000000;
                applier.localstatups.put(MapleBuffStat.狂暴榴彈, n44);
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyAttackEffect(MapleCharacter applyfrom, MapleMonster applyto, SkillClassApplier applier) {
        if (applyfrom.getEffectForBuffStat(MapleBuffStat.JaguarSummoned) != null && applyfrom.getCheatTracker().canNextPantherAttack()) {
            applyfrom.getClient().announce(MaplePacketCreator.openPantherAttack(true));
        }
        final MonsterEffectHolder x1089;
        if ((x1089 = applyto.getEffectHolder(MonsterStatus.JaguarBleeding)) != null && applier.effect != null && SkillConstants.eH(applier.effect.getSourceId())) {
            applyfrom.getClient().announce(MaplePacketCreator.userBonusAttackRequest(另一個咬擊, x1089.value, Collections.singletonList(applyto.getObjectId())));
        }
        if (applier.effect != null && SkillConstants.eF(applier.effect.getSourceId()) && applier.effect.makeChanceResult(applyfrom)) {
            final MapleStatEffect cc = SkillFactory.getSkill(另一個咬擊).getEffect(1);
            cc.applyMonsterEffect(applyfrom, applyto, cc.getMobDebuffDuration(applyfrom));
        }
        return 1;
    }

    @Override
    public int onAfterAttack(MapleCharacter player, SkillClassApplier applier) {
        MapleStatEffect skillEffect = player.getSkillEffect(狂暴榴彈);
        if (applier.effect != null && skillEffect != null && applier.effect.getSourceId() == 狂暴榴彈) {
            skillEffect.applyBuffEffect(player, player, 0, true, false, false, null);
        }
        return 1;
    }
}
