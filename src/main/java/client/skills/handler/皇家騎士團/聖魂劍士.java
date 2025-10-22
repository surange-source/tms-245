package client.skills.handler.皇家騎士團;

import client.MapleBuffStat;
import client.MapleCharacter;
import client.MapleJob;
import client.skills.Skill;
import client.skills.SkillEntry;
import client.skills.SkillFactory;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.status.MonsterStatus;
import constants.SkillConstants;
import packet.MaplePacketCreator;
import packet.SummonPacket;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.maps.MapleSummon;
import tools.types.Pair;

import java.awt.*;
import java.lang.reflect.Field;
import java.util.Collections;
import java.util.Map;

import static constants.skills.聖魂劍士.*;

public class 聖魂劍士 extends AbstractSkillHandler {

    public 聖魂劍士() {
        jobs = new MapleJob[] {
                MapleJob.聖魂劍士1轉,
                MapleJob.聖魂劍士2轉,
                MapleJob.聖魂劍士3轉,
                MapleJob.聖魂劍士4轉
        };

        for (Field field : constants.skills.聖魂劍士.class.getDeclaredFields()) {
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
            case 皇家衝擊:
                return 潛行突襲;
            case 焚影:
                return 殘像追擊;
            case 月影:
                return 光芒四射;
            case 月光十字架:
                return 日光十字架;
            case 大師之魂_旭日:
                return 大師之魂;
            case 雙重力量_沉月:
            case 雙重力量_旭日:
            case 雙重狂斬:
                return 雙重力量;
            case 極樂之境_黃泉十字架:
            case 極樂之境_2:
                return 極樂之境;
            case 疾速黃昏:
            case 疾速黃昏_空中:
            case 月光之舞_空中:
                return 月光之舞;
            case 新月分裂:
                return 太陽穿刺;
            case 靈魂穿透_傀儡:
                return 靈魂穿透;
            case 黃泉十字架_爆破:
                return 黃泉十字架;
            case 日月星爆_1:
            case 日月星爆_2:
                return 日月星爆;
            case 日月分裂:
                return 靈魂蝕日;
            case 閃焰重擊_1:
                return 閃焰重擊;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 聖魂之劍:
                statups.put(MapleBuffStat.ACCR, effect.getInfo().get(MapleStatInfo.x));
                statups.put(MapleBuffStat.IndiePAD, effect.getInfo().get(MapleStatInfo.indiePad));
                statups.put(MapleBuffStat.IndieScriptBuff, effect.getInfo().get(MapleStatInfo.indieMaxDamageOver));
                return 1;
            case 元素_靈魂:
                statups.put(MapleBuffStat.ElementSoul, effect.getLevel());
                monsterStatus.put(MonsterStatus.Seal, 1);
                return 1;
            case 沉月:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.PoseType, 1); //1 = 月光 2 = 旭日
                statups.put(MapleBuffStat.BuckShot, 1);
                statups.put(MapleBuffStat.IndieCr, effect.getInfo().get(MapleStatInfo.indieCr));
                return 1;
            case 旭日:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.PoseType, 2); //1 = 月光 2 = 旭日
                statups.put(MapleBuffStat.IndieBooster, effect.getInfo().get(MapleStatInfo.indieBooster));
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 雙重力量:
                statups.put(MapleBuffStat.GlimmeringTime, 1);
                return 1;
            case 雙重力量_沉月:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.PoseType, 1);
                statups.put(MapleBuffStat.BuckShot, 1);
                statups.put(MapleBuffStat.IndieCr, 20);
                return 1;
            case 雙重力量_旭日:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.PoseType, 2);
                statups.put(MapleBuffStat.IndieBooster, -1);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 大師之魂:
                statups.put(MapleBuffStat.BuckShot, effect.getLevel());
                statups.put(MapleBuffStat.IndieCr, effect.getInfo().get(MapleStatInfo.indieCr));
                return 1;
            case 大師之魂_旭日:
                statups.put(MapleBuffStat.IndieBooster, effect.getInfo().get(MapleStatInfo.indieBooster));
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 真實之眼:
                monsterStatus.put(MonsterStatus.PDR, effect.getInfo().get(MapleStatInfo.x));
                monsterStatus.put(MonsterStatus.MDR, effect.getInfo().get(MapleStatInfo.x));
                monsterStatus.put(MonsterStatus.TrueSight, 0);
                return 1;
            case 光速反應:
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
            case 日月星爆:
                statups.put(MapleBuffStat.元素精靈, 1);
                return 1;
            case 極樂之境:
                statups.put(MapleBuffStat.極樂之境, effect.getLevel());
                return 1;
            case 日月分裂:
                effect.getInfo().put(MapleStatInfo.time, 1500);
                statups.put(MapleBuffStat.IndieInvincible, effect.getInfo().get(MapleStatInfo.x));
                return 1;
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 雙重力量_沉月: {
                applyto.dispelEffect(雙重力量_旭日);
                applyto.dispelEffect(雙重力量_沉月);
                applyto.dispelEffect(旭日);
                applyto.dispelEffect(沉月);
                boolean b = applyto.getSkillLevel(大師之魂) > 0;
                final MapleStatEffect eff = applyto.getSkillEffect(b ? 大師之魂_旭日 : 旭日);
                if (eff != null) {
                    for (final Map.Entry<MapleBuffStat, Integer> entry : eff.getStatups().entrySet()) {
                        applier.sendstatups.put(entry.getKey(), new Pair<>(旭日, entry.getValue()));
                    }
                    for (final Map.Entry<MapleBuffStat, Integer> entry : applier.localstatups.entrySet()) {
                        applier.sendstatups.put(entry.getKey(), new Pair<>(applier.effect.getSourceId(), entry.getValue()));
                    }
                    applier.localstatups.putAll(eff.getStatups());
                    applier.sendstatups.put(MapleBuffStat.PoseType, new Pair<>(旭日, 1));
                    applier.localstatups.put(MapleBuffStat.PoseType, 1);
                }
                if (b) {
                    final MapleStatEffect eff2 = applyto.getSkillEffect(大師之魂);
                    if (eff2 != null) {
                        for (final Map.Entry<MapleBuffStat, Integer> entry : eff2.getStatups().entrySet()) {
                            applier.sendstatups.put(entry.getKey(), new Pair<>(applier.effect.getSourceId(), entry.getValue()));
                        }
                    }
                }
                return 1;
            }
            case 雙重力量_旭日: {
                applyto.dispelEffect(雙重力量_旭日);
                applyto.dispelEffect(雙重力量_沉月);
                applyto.dispelEffect(旭日);
                applyto.dispelEffect(沉月);
                boolean b = applyto.getSkillLevel(大師之魂) > 0;
                final MapleStatEffect eff = applyto.getSkillEffect(b ? 大師之魂 : 沉月);
                if (eff != null) {
                    for (final Map.Entry<MapleBuffStat, Integer> entry : eff.getStatups().entrySet()) {
                        applier.sendstatups.put(entry.getKey(), new Pair<>(沉月, entry.getValue()));
                    }
                    for (final Map.Entry<MapleBuffStat, Integer> entry : applier.localstatups.entrySet()) {
                        applier.sendstatups.put(entry.getKey(), new Pair<>(applier.effect.getSourceId(), entry.getValue()));
                    }
                    applier.localstatups.putAll(eff.getStatups());
                    applier.localstatups.put(MapleBuffStat.PoseType, 2);
                    applier.sendstatups.put(MapleBuffStat.PoseType, new Pair<>(沉月, 2));
                }
                if (b) {
                    final MapleStatEffect eff2;
                    if ((eff2 = applyto.getSkillEffect(大師之魂_旭日)) != null) {
                        for (final Map.Entry<MapleBuffStat, Integer> entry : eff2.getStatups().entrySet()) {
                            applier.sendstatups.put(entry.getKey(), new Pair<>(applier.effect.getSourceId(), entry.getValue()));
                        }
                    }
                }
                return 1;
            }
            case 旭日: {
                applyto.dispelEffect(雙重力量_旭日);
                applyto.dispelEffect(雙重力量_沉月);
                applyto.dispelEffect(旭日);
                applyto.dispelEffect(沉月);
                MapleStatEffect eff = applyto.getSkillEffect(大師之魂_旭日);
                if (eff != null) {
                    applier.localstatups.putAll(eff.getStatups());
                }
                return 1;
            }
            case 沉月: {
                applyto.dispelEffect(雙重力量_旭日);
                applyto.dispelEffect(雙重力量_沉月);
                applyto.dispelEffect(旭日);
                applyto.dispelEffect(沉月);
                MapleStatEffect eff = applyto.getSkillEffect(大師之魂);
                if (eff != null) {
                    applier.localstatups.putAll(eff.getStatups());
                }
                return 1;
            }
            case 雙重力量: {
                int value = applyto.getBuffedIntValue(MapleBuffStat.PoseType);
                if (value <= 0) {
                    return 0;
                } else {
                    MapleStatEffect eff = applyto.getSkillEffect(value == 1 ? 雙重力量_沉月 : 雙重力量_旭日);
                    if (eff != null) {
                        eff.unprimaryPassiveApplyTo(applyto);
                    }
                }
                return 1;
            }
            case 雙重狂斬: {
                applier.b4 = false;
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
            case 極樂之境: {
                if (applier.passive) {
                    return 0;
                }
                applyto.reduceSkillCooldown(黃泉十字架_爆破, 9999);
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onAfterAttack(MapleCharacter player, SkillClassApplier applier) {
        if (applier.effect != null && player.getBuffedValue(MapleBuffStat.GlimmeringTime) != null) {
            int mode = SkillConstants.getSoulMasterAttackMode(applier.effect.getSourceId());
            if (mode > 0) {
                final MapleStatEffect skillEffect8 = player.getSkillEffect(mode == 1 ? 雙重力量_旭日 : 雙重力量_沉月);
                if ((skillEffect8) != null) {
                    skillEffect8.unprimaryPassiveApplyTo(player);
                }
            }
        }
        if (player.getCheatTracker().canNextBonusAttack(5000) && player.getBuffStatValueHolder(MapleBuffStat.元素精靈, 日月星爆) != null) {
            if (player.getBuffedIntValue(MapleBuffStat.PoseType) == 1) {
                player.getClient().announce(MaplePacketCreator.userBonusAttackRequest(日月星爆_1, 0, Collections.emptyList()));
            } else {
                player.getClient().announce(MaplePacketCreator.userBonusAttackRequest(日月星爆_2, 0, Collections.emptyList()));
            }
        }
        if (applier.effect != null && applier.effect.getSourceId() == 極樂之境_黃泉十字架) {
            final MapleSummon summonBySkillID;
            if ((summonBySkillID = player.getSummonBySkillID(極樂之境_2)) != null) {
                final Rectangle a = applier.effect.calculateBoundingBox(player.getPosition(), player.isFacingLeft(), 500);
                if (a.contains(summonBySkillID.getPosition())) {
                    summonBySkillID.setAcState1(summonBySkillID.getAcState1() + 1);
                    player.getMap().broadcastMessage(player, SummonPacket.SummonedSkillState(summonBySkillID, 1), true);
                }
                player.getSummonsOIDsBySkillID(極樂之境_2).size();
                return 1;
            }
            player.getSkillEffect(極樂之境_2).applyTo(player, new Point(player.getPosition().x + (player.isFacingLeft() ? -100 : 100), player.getPosition().y));
        }
        return 1;
    }
}
