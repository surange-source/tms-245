package client.skills.handler.皇家騎士團;

import client.*;
import client.force.MapleForceAtom;
import client.force.MapleForceFactory;
import client.skills.Skill;
import client.skills.SkillEntry;
import client.skills.SkillFactory;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.status.MonsterStatus;
import constants.SkillConstants;
import packet.ForcePacket;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.life.MapleMonster;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import tools.Randomizer;
import tools.Triple;
import tools.data.MaplePacketReader;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import static constants.skills.破風使者.*;

public class 破風使者 extends AbstractSkillHandler {

    public 破風使者() {
        jobs = new MapleJob[] {
                MapleJob.破風使者1轉,
                MapleJob.破風使者2轉,
                MapleJob.破風使者3轉,
                MapleJob.破風使者4轉
        };

        for (Field field : constants.skills.破風使者.class.getDeclaredFields()) {
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
        Skill skill = SkillFactory.getSkill(自然旋律);
        if (skill != null && chr.getSkillLevel(skill) <= 0) {
            applier.skillMap.put(skill.getId(), new SkillEntry(1, skill.getMaxMasterLevel(), -1));
        }
        return -1;
    }

    @Override
    public int getLinkedSkillID(int skillId) {
        switch (skillId) {
            case 風妖精之箭I_1:
            case 風妖精之箭I_攻擊:
                return 風妖精之箭I;
            case 風妖精之箭II_攻擊:
                return 風妖精之箭II;
            case 風妖精之箭Ⅲ_攻擊:
                return 風妖精之箭Ⅲ;
            case 破風之箭_濺射:
                return 破風之箭;
            case 狂風呼嘯_1:
                return 狂風呼嘯;
            case 西爾芙之壁_1:
                return 西爾芙之壁;
            case 漩渦巨球_1:
                return 漩渦巨球;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 元素_風暴:
                statups.put(MapleBuffStat.CygnusElementSkill, 1);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 風妖精之箭I:
            case 風妖精之箭II:
            case 風妖精之箭Ⅲ:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.TriflingWhimOnOff, 1);
                return 1;
            case 阿爾法:
                statups.put(MapleBuffStat.Albatross, effect.getLevel());
                statups.put(MapleBuffStat.IndiePAD, effect.getInfo().get(MapleStatInfo.indiePad));
                statups.put(MapleBuffStat.IndieMHP, effect.getInfo().get(MapleStatInfo.indieMhp));
                statups.put(MapleBuffStat.IndieBooster, effect.getInfo().get(MapleStatInfo.indieBooster));
                statups.put(MapleBuffStat.IndieCr, effect.getInfo().get(MapleStatInfo.indieCr));
                return 1;
            case 極限阿爾法:
                statups.put(MapleBuffStat.IgnoreTargetDEF, effect.getInfo().get(MapleStatInfo.ignoreMobpdpR));
                statups.put(MapleBuffStat.Albatross, effect.getLevel());
                statups.put(MapleBuffStat.IndiePAD, effect.getInfo().get(MapleStatInfo.indiePad));
                statups.put(MapleBuffStat.IndieMHP, effect.getInfo().get(MapleStatInfo.indieMhp));
                statups.put(MapleBuffStat.IndieBooster, effect.getInfo().get(MapleStatInfo.indieBooster));
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                statups.put(MapleBuffStat.IndieAsrR, effect.getInfo().get(MapleStatInfo.indieAsrR));
                statups.put(MapleBuffStat.IndieTerR, effect.getInfo().get(MapleStatInfo.indieTerR));
                statups.put(MapleBuffStat.IndieCr, effect.getInfo().get(MapleStatInfo.indieCr));
                return 1;
            case 風之祈禱:
                statups.put(MapleBuffStat.IllusionStep, effect.getInfo().get(MapleStatInfo.x));
                statups.put(MapleBuffStat.ACCR, effect.getInfo().get(MapleStatInfo.y));
                statups.put(MapleBuffStat.DEXR, effect.getInfo().get(MapleStatInfo.prop));
                statups.put(MapleBuffStat.IndieMHPR, effect.getInfo().get(MapleStatInfo.indieMhpR));
                return 1;
            case 風暴使者:
                statups.put(MapleBuffStat.StormBringer, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 翡翠花園:
                monsterStatus.put(MonsterStatus.Speed, effect.getInfo().get(MapleStatInfo.z));
                return 1;
            case 強化翡翠花園:
                monsterStatus.put(MonsterStatus.PDR, effect.getInfo().get(MapleStatInfo.w));
                monsterStatus.put(MonsterStatus.Speed, effect.getInfo().get(MapleStatInfo.z));
                return 1;
            case 貫穿箭:
                //不存在時間
                effect.getInfo().put(MapleStatInfo.time, 210000000);
                monsterStatus.put(MonsterStatus.AddDamSkil, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 西格諾斯騎士:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.BasicStatUp, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 會心之眼:
                statups.put(MapleBuffStat.SharpEyes, (effect.getInfo().get(MapleStatInfo.x) << 8) + effect.getInfo().get(MapleStatInfo.y));
                return 1;
            case 季風:
                monsterStatus.put(MonsterStatus.Burned, 1);
                return 1;
            case 守護者榮耀:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 狂風呼嘯:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.狂風呼嘯, 0);
                return 1;
            case 風轉奇想:
                effect.getInfo().put(MapleStatInfo.bulletCount, 10);
                return 1;
            case constants.skills.破風使者.西爾芙之壁:
                statups.put(MapleBuffStat.風之屏障, effect.getInfo().get(MapleStatInfo.w));
                return 1;
        }
        return -1;
    }

    @Override
    public int onSkillUse(MaplePacketReader slea, MapleClient c, MapleCharacter chr, SkillClassApplier applier) {
        MapleForceFactory forceFactory = MapleForceFactory.getInstance();
        switch (applier.effect.getSourceId()) {
            case 風妖精之箭I: {
                if (chr.getSkillEffect(風妖精之箭Ⅲ) != null) {
                    applier.effect = chr.getSkillEffect(風妖精之箭Ⅲ);
                    return 1;
                }
                if (chr.getSkillEffect(風妖精之箭II) != null) {
                    applier.effect = chr.getSkillEffect(風妖精之箭II);
                    return 1;
                }
                return 1;
            }
            case 風轉奇想: {
                List<Integer> moboids = new ArrayList<>();
                for (MapleMapObject obj : chr.getMap().getMapObjectsInRange(chr.getPosition(), 500, Collections.singletonList(MapleMapObjectType.MONSTER))) {
                    moboids.add(obj.getObjectId());
                    if (moboids.size() >= applier.effect.getMobCount()) {
                        break;
                    }
                }
                chr.getMap().broadcastMessage(chr, ForcePacket.forceAtomCreate(forceFactory.getMapleForce(chr, applier.effect, 0, moboids)), true);
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
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
            case 狂風呼嘯: {
                final int value = Math.min(applyto.getBuffedIntValue(MapleBuffStat.狂風呼嘯) + (applier.passive ? 1 : -1), 2);
                final MapleBuffStatValueHolder mbsvh = applyto.getBuffStatValueHolder(MapleBuffStat.狂風呼嘯);
                if (!applier.primary || value < 0 || applier.passive && mbsvh != null && System.currentTimeMillis() < mbsvh.startTime + applier.effect.getX() * 700) {
                    return 0;
                }
                applier.localstatups.put(MapleBuffStat.狂風呼嘯, value);
                return 1;
            }
            case 西爾芙之壁: {
                final MapleBuffStatValueHolder buffStatValueHolder32;
                if (applier.primary || (buffStatValueHolder32 = applyto.getBuffStatValueHolder(MapleBuffStat.風之屏障)) == null) {
                    return 1;
                }
                final int max2;
                if ((max2 = Math.max(applyto.getBuffedIntValue(MapleBuffStat.風之屏障) - 1, 0)) > 0) {
                    applier.duration = buffStatValueHolder32.getLeftTime();
                    applier.localstatups.put(MapleBuffStat.風之屏障, max2);
                    return 1;
                }
                applier.overwrite = false;
                applier.localstatups.clear();
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyAttackEffect(MapleCharacter applyfrom, MapleMonster applyto, SkillClassApplier applier) {
        final MapleForceFactory mmf = MapleForceFactory.getInstance();
        final MapleStatEffect effecForBuffStat5;
        if (containsJob(applyfrom.getJobWithSub()) && (effecForBuffStat5 = applyfrom.getEffectForBuffStat(MapleBuffStat.StormBringer)) != null && applyto.isAlive() && effecForBuffStat5.makeChanceResult(applyfrom) && applier.effect != null) {
            final int n5 = 0;
            applyfrom.getMap().broadcastMessage(applyfrom, ForcePacket.forceAtomCreate(mmf.getMapleForce(applyfrom, effecForBuffStat5, n5)), true);
        }
        return 1;
    }

    @Override
    public int onAfterAttack(MapleCharacter player, SkillClassApplier applier) {
        final MapleForceFactory mff = MapleForceFactory.getInstance();
        MapleStatEffect effecForBuffStat6;
        if ((effecForBuffStat6 = player.getEffectForBuffStat(MapleBuffStat.TriflingWhimOnOff)) != null && applier.effect != null) {
            List<MapleMapObject> mobs = player.getMap().getMapObjectsInRect(applier.effect.calculateBoundingBox(player.getPosition(), player.isFacingLeft(), 500), Collections.singletonList(MapleMapObjectType.MONSTER));
            final ArrayList<Integer> list = new ArrayList<>();
            player.getMap().getAllMonster().forEach(mob -> {
                if (mob.isBoss()) {
                    list.add(mob.getObjectId());
                }
            });
            mobs.forEach(mob -> list.add(mob.getObjectId()));
            final MapleStatEffect skillEffect9;
            if ((skillEffect9 = player.getSkillEffect(風妖精之箭II)) != null) {
                effecForBuffStat6 = skillEffect9;
            }
            final MapleStatEffect skillEffect10;
            if ((skillEffect10 = player.getSkillEffect(風妖精之箭Ⅲ)) != null) {
                effecForBuffStat6 = skillEffect10;
            }
            if (!list.isEmpty() && effecForBuffStat6.getSourceId() != SkillConstants.getLinkedAttackSkill(applier.effect.getSourceId())) {
                if (effecForBuffStat6.makeChanceResult(player)) {
                    final MapleStatEffect skillEffect11;
                    if ((skillEffect11 = player.getSkillEffect(effecForBuffStat6.getSourceId() == 風妖精之箭Ⅲ ? effecForBuffStat6.getSourceId() + 7 : effecForBuffStat6.getSourceId() + 5)) != null) {
                        player.getMap().broadcastMessage(player, ForcePacket.forceAtomCreate(mff.getMapleForce(player, skillEffect11, 0, list)), true);
                    }
                } else if (Randomizer.nextInt(100) <= effecForBuffStat6.getSubProp()) {
                    player.getMap().broadcastMessage(player, ForcePacket.forceAtomCreate(mff.getMapleForce(player, effecForBuffStat6, 0, list)), true);
                }
            }
        }
        final MapleStatEffect effecForBuffStat9 = player.getEffectForBuffStat(MapleBuffStat.風之屏障);
        if (applier.totalDamage > 0L && effecForBuffStat9 != null && player.getCheatTracker().canNextAllRocket(西爾芙之壁_1, effecForBuffStat9.getW2() * 1000)) {
            final List<MapleMapObject> mapObjectsInRange2 = player.getMap().getMapObjectsInRange(player.getPosition(), 500, Collections.singletonList(MapleMapObjectType.MONSTER));
            final ArrayList<Integer> list3 = new ArrayList<>();
            mapObjectsInRange2.forEach(sx2 -> list3.add(sx2.getObjectId()));
            if (!list3.isEmpty()) {
                final ArrayList<Triple<Integer, Integer, Map<Integer, MapleForceAtom>>> list4 = new ArrayList<>();
                for (int l = 0; l < effecForBuffStat9.getQ2(); ++l) {
                    list4.add(new Triple<>(西爾芙之壁_1, 51, Collections.singletonMap(list3.get(Randomizer.nextInt(list3.size())), mff.getMapleForce(player, player.getSkillEffect(西爾芙之壁_1), 0))));
                }
                player.getMap().broadcastMessage(player, ForcePacket.forceTeleAtomCreate(player.getId(), 西爾芙之壁_1, list4), true);
            }
        }
        return 1;
    }
}
