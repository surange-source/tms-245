package client.skills.handler.末日反抗軍;

import client.*;
import client.force.MapleForceFactory;
import client.skills.Skill;
import client.skills.SkillEntry;
import client.skills.SkillFactory;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.status.MonsterEffectHolder;
import client.status.MonsterStatus;
import constants.SkillConstants;
import packet.AdelePacket;
import packet.ForcePacket;
import packet.MaplePacketCreator;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.life.MapleMonster;
import server.maps.ForceAtomObject;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import tools.types.Pair;
import server.Randomizer;
import tools.data.MaplePacketReader;

import java.awt.*;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import static constants.skills.傑諾.*;

public class 傑諾 extends AbstractSkillHandler {

    public 傑諾() {
        jobs = new MapleJob[] {
                MapleJob.傑諾,
                MapleJob.傑諾1轉,
                MapleJob.傑諾2轉,
                MapleJob.傑諾3轉,
                MapleJob.傑諾4轉
        };

        for (Field field : constants.skills.傑諾.class.getDeclaredFields()) {
            try {
                skills.add(field.getInt(field.getName()));
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public int baseSkills(MapleCharacter chr, SkillClassApplier applier) {
        if (chr.getLevel() >= 10) {
            Skill skil;
            int[] ss = {英雄的回響, 蓄能系統, 全能增幅I, 普羅梅莎突擊, 多功能模式, 自由飛行, 多樣化裝扮, 轉換星力};
            for (int i : ss) {
                if (chr.getLevel() < 200 && i == 英雄的回響) {
                    continue;
                }
                skil = SkillFactory.getSkill(i);
                if (skil != null && chr.getSkillLevel(skil) <= 0) {
                    applier.skillMap.put(i, new SkillEntry(1, skil.getMaxMasterLevel(), -1));
                }
            }
        }
        return -1;
    }

    @Override
    public int getLinkedSkillID(int skillId) {
        switch (skillId) {
            case 水銀之刃_集中:
            case 水銀之刃_飛躍:
                return 水銀之刃_閃光;
            case 戰鬥轉換_擊落:
            case 戰鬥轉換_分裂:
                return 戰鬥轉換_爆發;
            case 能量領域_力場:
            case 能量領域_支援:
                return 能量領域_貫通;
            case 偽裝掃蕩_砲擊:
            case 偽裝掃蕩_轟炸:
                return 偽裝掃蕩_狙擊;
            case 神盾系統_攻擊:
                return 神盾系統;
            case 毀滅轟炸_1:
                return 毀滅轟炸;
            case 超載模式_1:
                return 超載模式;
            case 能量領域_融合_1:
                return 能量領域_融合;
            case 光子射線_1:
                return 光子射線;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 英雄的回響:
                effect.setRangeBuff(true);
                effect.getInfo().put(MapleStatInfo.time, effect.getDuration() * 1000);
                statups.put(MapleBuffStat.MaxLevelBuff, effect.getX());
                return 1;
            case 蓄能系統:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.SurplusSupply, 1);
                return 1;
            case 自由飛行:
                effect.getInfo().put(MapleStatInfo.time, 30000);
                statups.put(MapleBuffStat.NewFlying, 1);
                return 1;
            case 追縱火箭:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.追縱火箭, 1);
                return 1;
            case 傾斜功率:
                statups.clear();
                statups.put(MapleBuffStat.IndiePAD, effect.getInfo().get(MapleStatInfo.indiePad));
                return 1;
            case 神盾系統:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.XenonAegisSystem, 1);
                return 1;
            case 全域代碼:
                statups.put(MapleBuffStat.IndiePMdR, effect.getInfo().get(MapleStatInfo.indiePMdR));
                statups.put(MapleBuffStat.BdR, effect.getInfo().get(MapleStatInfo.indieBDR));
                return 1;
            case 攻擊矩陣:
                statups.put(MapleBuffStat.Stance, effect.getInfo().get(MapleStatInfo.x));
                statups.put(MapleBuffStat.IgnoreTargetDEF, effect.getInfo().get(MapleStatInfo.y));
                return 1;
            case 能量領域_支援:
                statups.clear();
                statups.put(MapleBuffStat.DEXR, effect.getInfo().get(MapleStatInfo.evaR));
                statups.put(MapleBuffStat.IndieMHPR, effect.getInfo().get(MapleStatInfo.indieMhpR));
                return 1;
            case 阿瑪蘭斯發電機:
                statups.put(MapleBuffStat.AmaranthGenerator, 1);
                return 1;
            case 毀滅轟炸:
                effect.getInfo().put(MapleStatInfo.subTime, effect.getInfo().get(MapleStatInfo.time) * 1000);
                effect.getInfo().put(MapleStatInfo.time, effect.getInfo().get(MapleStatInfo.y) * 1000);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.w));

                monsterStatus.put(MonsterStatus.PDR, -effect.getInfo().get(MapleStatInfo.x));
                monsterStatus.put(MonsterStatus.MDR, -effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 超載模式:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.超載模式, effect.getInfo().get(MapleStatInfo.w));
                return 1;
            case 能量纏繞:
                monsterStatus.put(MonsterStatus.Freeze, 1);
                monsterStatus.put(MonsterStatus.MagicCrash, 1);
                return 1;
            case 三角列陣:
                monsterStatus.put(MonsterStatus.EVA, -8);
                monsterStatus.put(MonsterStatus.Blind, 8);
                monsterStatus.put(MonsterStatus.Explosion, 1);
                return 1;
            case 虛擬投影:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.ShadowPartner, effect.getInfo().get(MapleStatInfo.y));
                return 1;
            case 楓葉祝福:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.BasicStatUp, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 滅世雷射光:
                statups.put(MapleBuffStat.IndieInvincible, 0);
                statups.put(MapleBuffStat.滅世雷射光, -1);
                return 1;
            case 能量領域_融合:
                statups.put(MapleBuffStat.EVAR, 1);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 光子射線:
                statups.put(MapleBuffStat.光子射線, 1);
                return 1;
        }
        return -1;
    }

    @Override
    public int onSkillUse(MaplePacketReader slea, MapleClient c, MapleCharacter chr, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 額外供應: {
                if (chr.getSkillEffect(蓄能系統) != null) {
                    chr.applyXenonEnegy(applier.effect.getX());
                }
                return 1;
            }
            case 光子射線_1: {
                slea.readInt();
                applier.pos = slea.readPosInt();
                if (chr.getBuffStatValueHolder(MapleBuffStat.光子射線) != null) {
                    chr.dispelEffect(MapleBuffStat.光子射線);
                    if (!applier.ai.skillTargetList.isEmpty()) {
                        List<ForceAtomObject> createList = new ArrayList<>();
                        int idx = 1;
                        int[] list = {-45, -70, -135, -165, -150, -35, -55, -50, -160,
                                -48, -140, -167, -40, -170, 52, -10, -15, -170, -165, -175,
                                -5, -20, -25, -160, -30, -155, -150, -32, -177, -38};
                        for (Pair<Integer, Integer> pair : applier.ai.skillTargetList) {
                            for (int i = 0; i < pair.right; i++) {
                                ForceAtomObject sword = new ForceAtomObject(idx, 9, idx - 1, chr.getId(), 0, 光子射線_1);
                                sword.Position = new Point(applier.pos.x + Randomizer.nextInt(200), applier.pos.y + 46);
                                sword.ObjPosition = new Point(applier.pos.x, applier.pos.y);
                                sword.Expire = 10000;
                                sword.Target = pair.left;
                                sword.CreateDelay = 150 + i * 30;
                                for (int x : list) {
                                    sword.addX(x);
                                }
                                createList.add(sword);
                                idx++;
                            }
                        }
                        if (!createList.isEmpty()) {
                            chr.getMap().broadcastMessage(AdelePacket.ForceAtomObject(chr.getId(), createList, 0), chr.getPosition());
                        }
                    }
                    return 1;
                }
                return 0;
            }
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 普羅梅莎突擊: {
                applyto.changeMap(applier.effect.getX(), 0);
                return 1;
            }
            case 追縱火箭: {
                if (!applier.primary) {
                    return 0;
                }
                if (applyto.getBuffedValue(MapleBuffStat.追縱火箭) != null) {
                    applier.overwrite = false;
                    applier.localstatups.clear();
                }
                return 1;
            }
            case 蓄能系統: {
                applier.localstatups.put(MapleBuffStat.SurplusSupply, Math.min(SkillConstants.dY(applyto.getJob()) * 5 + applyto.getBuffedIntValue(MapleBuffStat.超載模式), Math.max(0, applyto.getBuffedIntValue(MapleBuffStat.SurplusSupply))));
                return 1;
            }
            case 神盾系統: {
                if (applyto.getBuffedValue(MapleBuffStat.XenonAegisSystem) != null) {
                    applier.overwrite = false;
                    applier.localstatups.clear();
                }
                return 1;
            }
            case 虛擬投影: {
                applyto.getSpecialStat().setShadowHP(applyto.getStat().getCurrentMaxHP() * applier.effect.getX());
                return 1;
            }
            case 時空膠囊: {
                if (applier.primary) {
                    applyto.setChair(new PortableChair(3010587));
                    applyto.getMap().broadcastMessage(applyto, MaplePacketCreator.UserSetActivePortableChair(applyto), false);
                    applyto.getClient().announce(MaplePacketCreator.showSitOnTimeCapsule());
                }
                return 1;
            }
            case 阿瑪蘭斯發電機: {
                applyfrom.applyXenonEnegy(20);
                return 1;
            }
            case 滅世雷射光: {
                if (applier.passive) {
                    final MapleBuffStatValueHolder mbsvh = applyto.getBuffStatValueHolder(MapleBuffStat.滅世雷射光);
                    if (mbsvh != null) {
                        applier.duration += Math.min((int) (System.currentTimeMillis() - mbsvh.startTime) / (applier.effect.getY() * 1000), applier.effect.getZ()) * 1000;
                    }
                    applier.localstatups.put(MapleBuffStat.滅世雷射光, 1);
                    break;
                }
                applier.localstatups.remove(MapleBuffStat.IndieInvincible);
                applier.duration = 2100000000;
                return 1;
            }
            case 光子射線: {
                applier.buffz = 0;
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyAttackEffect(MapleCharacter applyfrom, MapleMonster applyto, SkillClassApplier applier) {
        final MonsterEffectHolder meh;
        if ((meh = applyto.getEffectHolder(MonsterStatus.Explosion)) != null && meh.value >= 3) {
            if (applier.effect != null) {
                applyfrom.getClient().announce(ForcePacket.UserExplosionAttack(applyto));
                applyto.removeEffect(applyfrom.getId(), 三角列陣);
            }
        } else {
            final MapleStatEffect skillEffect19;
            if ((skillEffect19 = applyfrom.getSkillEffect(三角列陣)) != null && applier.effect != null && applier.effect.getSourceId() != 三角列陣) {
                skillEffect19.applyMonsterEffect(applyfrom, applyto, skillEffect19.getY() * 1000);
            }
        }
        return 1;
    }

    @Override
    public int onAfterAttack(MapleCharacter player, SkillClassApplier applier) {
        final MapleForceFactory mff = MapleForceFactory.getInstance();
        final MapleStatEffect effecForBuffStat11 = player.getEffectForBuffStat(MapleBuffStat.追縱火箭);
        if (applier.totalDamage > 0L && effecForBuffStat11 != null && player.getCheatTracker().canNext追縱火箭() && (applier.effect == null || applier.effect.getSourceId() != 追縱火箭)) {
            List<MapleMapObject> mobs = player.getMap().getMapObjectsInRect(effecForBuffStat11.calculateBoundingBox(player.getPosition(), player.isFacingLeft(), 100), Collections.singletonList(MapleMapObjectType.MONSTER));
            final ArrayList<Integer> list2 = new ArrayList<>();
            mobs.forEach(mob -> list2.add(mob.getObjectId()));
            if (!list2.isEmpty()) {
                player.getMap().broadcastMessage(player, ForcePacket.forceAtomCreate(mff.getMapleForce(player, effecForBuffStat11, 0, list2)), true);
            }
        }
        return 1;
    }
}
