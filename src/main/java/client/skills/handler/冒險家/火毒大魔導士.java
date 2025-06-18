package client.skills.handler.冒險家;

import client.*;
import client.force.MapleForceFactory;
import client.skills.ExtraSkill;
import client.skills.Skill;
import client.skills.SkillFactory;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.status.MonsterEffectHolder;
import client.status.MonsterStatus;
import handling.opcode.EffectOpcode;
import packet.*;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.life.Element;
import server.life.MapleMonster;
import server.life.MobSkill;
import server.maps.ForceAtomObject;
import server.maps.MapleAffectedArea;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import tools.Pair;
import tools.Randomizer;
import tools.data.MaplePacketReader;

import java.awt.*;
import java.lang.reflect.Field;
import java.util.*;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static constants.skills.火毒.*;

public class 火毒大魔導士 extends AbstractSkillHandler {

    public 火毒大魔導士() {
        jobs = new MapleJob[] {
                MapleJob.火毒巫師,
                MapleJob.火毒魔導士,
                MapleJob.火毒大魔導士
        };

        for (Field field : constants.skills.火毒.class.getDeclaredFields()) {
            try {
                skills.add(field.getInt(field.getName()));
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public int getLinkedSkillID(int skillId) {
        switch (skillId) {
            case 燎原之火_MIST:
                return 燎原之火;
            case 劇毒領域_1:
                return 劇毒領域;
            case 火流星_墜落:
                return 火流星;
            case 劇毒新星_1:
                return 劇毒新星;
            case 劇毒連鎖_1:
            case 劇毒連鎖_2:
                return 劇毒連鎖;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 元素吸收:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.DotBasedBuff, 1);
                return 1;
            case 毒霧:
            case 致命毒霧:
            case 藍焰斬:
            case 劇毒新星:
            case 持續制裁者:
                monsterStatus.put(MonsterStatus.Burned, 1);
                return 1;
            case 精神強化:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.IndieMAD, effect.getInfo().get(MapleStatInfo.indieMad));
                return 1;
            case 燎原之火:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.WizardIgnite, 1);
                return 1;
            case 劇毒領域:
            case 召喚火魔:
                monsterStatus.put(MonsterStatus.Burned, 1);

                statups.put(MapleBuffStat.IndieSummoned, 1);
                return 1;
            case 元素適應_火毒:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.AntiMagicShell, effect.getY());
                return 1;
            case 瞬間移動精通:
                statups.put(MapleBuffStat.TeleportMasteryOn, 1);
                monsterStatus.put(MonsterStatus.Stun, 1);
                monsterStatus.put(MonsterStatus.Burned, 1);
                return 1;
            case 瞬間移動爆發:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.RpSiksin, 1);
                return 1;
            case 火焰之襲:
                effect.getInfo().put(MapleStatInfo.time, effect.getInfo().get(MapleStatInfo.time) * 2);
                monsterStatus.put(MonsterStatus.Stun, 1);
                monsterStatus.put(MonsterStatus.Burned, 1);
                return 1;
            case 炙焰毒火:
                monsterStatus.put(MonsterStatus.IndieSpeed, effect.getInfo().get(MapleStatInfo.x));
                monsterStatus.put(MonsterStatus.DodgeBodyAttack, 1);
                monsterStatus.put(MonsterStatus.Burned, 1);
                return 1;
            case 魔力無限:
                effect.setHpR(effect.getInfo().get(MapleStatInfo.y) / 100.0);
                effect.setMpR(effect.getInfo().get(MapleStatInfo.y) / 100.0);
                statups.put(MapleBuffStat.Stance, effect.getInfo().get(MapleStatInfo.prop));
                statups.put(MapleBuffStat.Infinity, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 楓葉祝福:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.BasicStatUp, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 神秘狙擊:
                effect.getInfo().put(MapleStatInfo.time, 5000);
                statups.put(MapleBuffStat.ArcaneAim, 1);
                return 1;
            case 傳說冒險:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 火靈結界:
                monsterStatus.put(MonsterStatus.Burned, 1);

                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.FireAura, 1);
                return 1;
        }
        return -1;
    }

    @Override
    public int onSkillUse(MaplePacketReader slea, MapleClient c, MapleCharacter chr, SkillClassApplier applier) {
        MapleForceFactory forceFactory = MapleForceFactory.getInstance();
        switch (applier.effect.getSourceId()) {
            case 藍焰斬: {
                chr.getSpecialStat().gainFieldSkillCounter(藍焰斬);
                List<Integer> oids = IntStream.range(0, slea.readByte()).mapToObj(i -> slea.readInt()).collect(Collectors.toList());
                List<ForceAtomObject> createList = new ArrayList<>();
                for (int i = 0; i < applier.effect.getBulletCount(); i++) {
                    ForceAtomObject obj = new ForceAtomObject(chr.getSpecialStat().gainForceCounter(), 35, i, chr.getId(), 0, applier.effect.getSourceId());
                    obj.Idk3 = 1;
                    if (!oids.isEmpty()) {
                        obj.Target = oids.get(i % oids.size());
                    }
                    obj.CreateDelay = 480;
                    obj.EnableDelay = 720;
                    obj.Idk1 = 1;
                    obj.Expire = 5000;
                    obj.Position = new Point(0, 1);
                    obj.ObjPosition = new Point(applier.ai.skillposition);
                    obj.ObjPosition.x += Randomizer.rand(-100, 100);
                    obj.ObjPosition.y += Randomizer.rand(-100, 100);
                    createList.add(obj);
                }
                if (!createList.isEmpty()) {
                    chr.getMap().broadcastMessage(AdelePacket.ForceAtomObject(chr.getId(), createList, 0), chr.getPosition());
                }
                chr.getTempValues().put("藍焰斬Count", createList.size());
                return 1;
            }
            case 持續制裁者: {
                List<Integer> oids = new ArrayList<>();
                for (MapleMapObject monster : chr.getMap().getMapObjectsInRange(chr.getPosition(), 500, Collections.singletonList(MapleMapObjectType.MONSTER))) {
                    oids.add(monster.getObjectId());
                    if (oids.size() >= applier.effect.getMobCount()) {
                        break;
                    }
                }
                chr.getMap().broadcastMessage(chr, ForcePacket.forceAtomCreate(forceFactory.getMapleForce(chr, applier.effect, 0, oids)), true);
                return 1;
            }
            case 劇毒連鎖_1: {
                ForceAtomObject obj = new ForceAtomObject(chr.getSpecialStat().gainForceCounter(), 38, 0, chr.getId(), 0, applier.effect.getSourceId());
                Pair<Integer, Point> spawninfo = null;
                if (!applier.ai.skillSpawnInfo.isEmpty()) {
                    spawninfo = applier.ai.skillSpawnInfo.get(0);
                }
                if (spawninfo != null) {
                    obj.Target = spawninfo.getLeft();
                }
                obj.Expire = 10000;
                obj.Position = new Point(0, 1);
                obj.ObjPosition = new Point(spawninfo == null ? applier.ai.skillposition : spawninfo.getRight());
                obj.ObjPosition.y -= 43;
                obj.addX(chr.getSpecialStat().getFieldSkillCounter(劇毒連鎖));
                chr.getMap().broadcastMessage(AdelePacket.ForceAtomObject(chr.getId(), Collections.singletonList(obj), 0), chr.getPosition());
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyTo(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 元素適應_火毒: {
                applier.cooldown = 0;
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        if (applier.effect instanceof MobSkill) {
            boolean isCriticalDebuff = false;
            for (MapleBuffStat stat : applier.localstatups.keySet()) {
                if (stat.isCriticalDebuff()) {
                    isCriticalDebuff = true;
                    break;
                }
            }
            MapleBuffStatValueHolder mbsvh;
            if (isCriticalDebuff && (mbsvh = applyto.getBuffStatValueHolder(MapleBuffStat.AntiMagicShell)) != null && mbsvh.value > 0) {
                int mpCon = applyto.getStat().getCurrentMaxHP() * mbsvh.effect.getX() / 100;
                if (applyto.getStat().getHp() < mpCon) {
                    return -1;
                }
                applyto.addMP(-mpCon, true);
                applyto.send(EffectPacket.showBlessOfDarkness(-1, mbsvh.effect.getSourceId()));
                applyto.getMap().broadcastMessage(applyto, EffectPacket.showBlessOfDarkness(applyto.getId(), mbsvh.effect.getSourceId()), false);
                mbsvh.value--;
                if (mbsvh.value > 0) {
                    applyto.send(BuffPacket.giveBuff(applyto, mbsvh.effect, Collections.singletonMap(MapleBuffStat.AntiMagicShell, mbsvh.effect.getSourceId())));
                } else {
                    applyto.dispelEffect(MapleBuffStat.AntiMagicShell);
                    applyto.registerSkillCooldown(mbsvh.effect, true);
                }
                return 0;
            }
            return -1;
        }
        switch (applier.effect.getSourceId()) {
            case 燎原之火: {
                if (applyto.getBuffedValue(MapleBuffStat.WizardIgnite) != null) {
                    applier.overwrite = false;
                    applier.localstatups.clear();
                }
                return 1;
            }
            case 元素吸收: {
                int count = 0;
                for (MapleMapObject obj : applyfrom.getMap().getMapObjectsInRange(applyfrom.getPosition(), applier.effect.getRange(), Collections.singletonList(MapleMapObjectType.MONSTER))) {
                    if (((MapleMonster) obj).getEffectHolder(applyfrom.getId(), MonsterStatus.Burned) != null && ++count >= 5) {
                        break;
                    }
                }
                if (count <= 0) {
                    applyfrom.dispelEffect(元素吸收);
                    return 0;
                }
                applier.localstatups.put(MapleBuffStat.DotBasedBuff, count);
                return 0;
            }
            case 瞬間移動精通: {
                applier.duration = 2100000000;
                return 1;
            }
            case 神秘狙擊: {
                if (applyto.getBuffedValue(MapleBuffStat.ArcaneAim) != null) {
                    applier.localstatups.put(MapleBuffStat.ArcaneAim, Math.min(applier.effect.getY(), applyto.getBuffedIntValue(MapleBuffStat.ArcaneAim) + 1));
                }
                return 1;
            }
            case 劇毒連鎖: {
                applyfrom.getSpecialStat().gainFieldSkillCounter(劇毒連鎖);
                return -1;
            }
            case 傳說冒險: {
                if (applyfrom.getJob() / 1000 != applyto.getJob() / 1000) {
                    return 0;
                }
                applyto.dispelEffect(constants.skills.英雄.傳說冒險);
                applyto.dispelEffect(constants.skills.聖騎士.傳說冒險);
                applyto.dispelEffect(constants.skills.黑騎士.傳說冒險);
                applyto.dispelEffect(constants.skills.火毒.傳說冒險);
                applyto.dispelEffect(constants.skills.冰雷.傳說冒險);
                applyto.dispelEffect(constants.skills.主教.傳說冒險);
                applyto.dispelEffect(constants.skills.箭神.傳說冒險);
                applyto.dispelEffect(constants.skills.神射手.傳說冒險);
                applyto.dispelEffect(constants.skills.開拓者.傳說冒險);
                applyto.dispelEffect(constants.skills.暗影神偷.傳說冒險);
                applyto.dispelEffect(constants.skills.夜使者.傳說冒險);
                applyto.dispelEffect(constants.skills.影武者.傳說冒險);
                applyto.dispelEffect(constants.skills.拳霸.傳說冒險);
                applyto.dispelEffect(constants.skills.槍神.傳說冒險);
                applyto.dispelEffect(constants.skills.重砲指揮官.傳說冒險);
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyMonsterEffect(MapleCharacter applyfrom, MapleMonster applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 瞬間移動精通: {
                final EnumMap<MonsterStatus, MonsterEffectHolder> statups = new EnumMap<>(MonsterStatus.class);
                int prop = applier.effect.getSubProp();
                long currentTimeMillis = System.currentTimeMillis();
                if (Randomizer.isSuccess(prop)) {
                    statups.put(MonsterStatus.Stun, new MonsterEffectHolder(applyfrom.getId(), 1, currentTimeMillis, applier.effect.calcMobDebuffDuration(applier.effect.getDuration(), applyfrom), applier.effect));
                }
                prop = applier.effect.getProp();
                if (Randomizer.isSuccess(prop)) {
                    MonsterEffectHolder holder = new MonsterEffectHolder(applyfrom.getId(), 1, currentTimeMillis, applier.effect.getMobDebuffDuration(applyfrom), applier.effect);
                    applier.effect.setDotData(applyfrom, holder);
                    statups.put(MonsterStatus.Burned, holder);
                }
                if (!statups.isEmpty()) {
                    applyto.registerEffect(statups);
                    Map<MonsterStatus, Integer> writeStatups = new LinkedHashMap<>();
                    for (MonsterStatus stat : statups.keySet()) {
                        writeStatups.put(stat, applier.effect.getSourceId());
                    }
                    applyfrom.getMap().broadcastMessage(MobPacket.mobStatSet(applyto, writeStatups), applyto.getPosition());
                }
                return 0;
            }
        }
        return -1;
    }

    @Override
    public int onApplyAttackEffect(MapleCharacter applyfrom, MapleMonster applyto, SkillClassApplier applier) {
        MapleStatEffect effect;
        if ((effect = applyfrom.getSkillEffect(魔力吸收)) != null && effect.makeChanceResult(applyfrom)) {
            int rate;
            if (!applyto.getStats().isBoss()) {
                rate = effect.getX();
            } else {
                rate = effect.getY();
            }
            int absorbMp = Math.min(applyto.getMobMaxMp() * rate / 100, applyto.getMp());
            if (absorbMp > 0) {
                applyto.setMp(applyto.getMp() - absorbMp);
                applyfrom.addMP(absorbMp);
                applyfrom.send(EffectPacket.encodeUserEffectLocal(effect.getSourceId(), EffectOpcode.UserEffect_SkillUse, applyfrom.getLevel(), effect.getLevel()));
                applyfrom.getMap().broadcastMessage(applyfrom, EffectPacket.onUserEffectRemote(applyfrom, effect.getSourceId(), EffectOpcode.UserEffect_SkillUse, applyfrom.getLevel(), effect.getLevel()), false);
            }
        }
        final MapleStatEffect effecForBuffStat;
        if (applier.effect != null && applier.effect.getSourceId() != 燎原之火_MIST && (effecForBuffStat = applyfrom.getEffectForBuffStat(MapleBuffStat.WizardIgnite)) != null && effecForBuffStat.makeChanceResult(applyfrom)) {
            final Skill jk = SkillFactory.getSkill(applier.effect.getSourceId());
            final MapleStatEffect skillEffect;
            if ((skillEffect = applyfrom.getSkillEffect(燎原之火_MIST)) != null && jk.getElement() == Element.火) {
                skillEffect.applyAffectedArea(applyfrom, applyto.getPosition());
            }
        }
        return 1;
    }

    @Override
    public int onAfterAttack(MapleCharacter player, SkillClassApplier applier) {
        if (applier.effect != null) {
            if (applier.effect.getSourceId() == 致命毒霧) {
                applier.effect.applyAffectedArea(player, new Point(applier.ai.forcedXSh, applier.ai.forcedYSh));
            }

            if (applier.effect.getSourceId() == 劇毒領域_1 || applier.effect.getSkill().getElement() == Element.火) {
                Rectangle rect;
                if (applier.effect.getSourceId() == 劇毒領域_1) {
                    rect = applier.ai.rect;
                } else {
                    rect = applier.effect.calculateBoundingBox(new Point(applier.ai.forcedX, applier.ai.forcedY), (applier.ai.direction & 0x80) != 0);
                }
                for (MapleAffectedArea area : player.getMap().getAllAffectedAreasThreadsafe()) {
                    if (area.getSkillID() != 劇毒領域) {
                        continue;
                    }
                    Rectangle aRect = area.getBounds();
                    if (rect.contains(aRect) || aRect.contains(rect) || aRect.equals(rect) || rect.intersects(aRect)) {
                        ExtraSkill eskill = new ExtraSkill(劇毒領域_1, area.getPosition());
                        eskill.TriggerSkillID = applier.effect.getSourceId();
                        eskill.Delay = 240;
                        eskill.Value = 1;
                        eskill.TargetOID = area.getObjectId();
                        player.send(MaplePacketCreator.RegisterExtraSkill(劇毒領域, Collections.singletonList(eskill)));
                    }
                }
            }

            if (applier.effect.getSourceId() == 地獄爆發) {
                if (applier.ai.mobAttackInfo.size() > 0) {
                    player.cancelSkillCooldown(炙焰毒火);
                }
                if (applier.ai.mists != null) {
                    for (int id : applier.ai.mists) {
                        MapleAffectedArea mist = player.getMap().getAffectedAreaByOid(id);
                        if (mist != null && mist.getSkillID() == 致命毒霧 && mist.getOwnerId() == player.getId()) {
                            mist.cancel();
                            player.getMap().disappearMapObject(mist);
                        }
                    }
                }
            }

            if (applier.effect.getSourceId() == 藍焰斬 && player.getTempValues().containsKey("藍焰斬Count")) {
                int nCount = (int) player.getTempValues().get("藍焰斬Count");
                if (nCount < applier.effect.getX()) {
                    List<MapleMapObject> mobs = player.getMap().getMonstersInRect(applier.effect.calculateBoundingBox(applier.ai.skillposition, false));
                    if (!mobs.isEmpty()) {
                        List<ForceAtomObject> createList = new ArrayList<>();
                        int bulletCount = Math.min(2, applier.effect.getX() - nCount);
                        for (int i = 0; i < bulletCount; i++) {
                            ForceAtomObject obj = new ForceAtomObject(player.getSpecialStat().gainForceCounter(), 35, i, player.getId(), 0, applier.effect.getSourceId());
                            obj.Idk3 = 1;
                            obj.CreateDelay = 180;
                            obj.EnableDelay = 480;
                            obj.Idk1 = 1;
                            obj.Expire = 5000;
                            obj.Position = new Point(0, 1);
                            obj.addX(player.getSpecialStat().getFieldSkillCounter(藍焰斬));
                            MapleMonster mob = (MapleMonster) mobs.get(i % mobs.size());
                            if (mob != null) {
                                obj.Target = mob.getObjectId();
                            }
                            obj.ObjPosition = new Point(applier.ai.skillposition);
                            obj.ObjPosition.x += Randomizer.rand(-100, 100);
                            obj.ObjPosition.y += Randomizer.rand(-100, 100);
                            createList.add(obj);
                        }
                        if (!createList.isEmpty()) {
                            player.getMap().broadcastMessage(AdelePacket.ForceAtomObject(player.getId(), createList, 0), player.getPosition());
                        }
                        player.getTempValues().put("藍焰斬Count", nCount + createList.size());
                    }
                }
            }
        }
        return 1;
    }
}
