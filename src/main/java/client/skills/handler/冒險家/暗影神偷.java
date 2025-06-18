package client.skills.handler.冒險家;

import client.*;
import client.force.MapleForceAtom;
import client.force.MapleForceFactory;
import client.inventory.Item;
import client.skills.ExtraSkill;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.status.MonsterStatus;
import constants.JobConstants;
import constants.skills.盜賊;
import handling.opcode.EffectOpcode;
import packet.BuffPacket;
import packet.EffectPacket;
import packet.ForcePacket;
import packet.MaplePacketCreator;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.life.MapleMonster;
import server.maps.MapleAffectedArea;
import server.maps.MapleMapItem;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import tools.Randomizer;
import tools.data.MaplePacketReader;

import java.awt.*;
import java.lang.reflect.Field;
import java.util.*;
import java.util.List;

import static constants.skills.暗影神偷.*;

public class 暗影神偷 extends AbstractSkillHandler {

    public 暗影神偷() {
        jobs = new MapleJob[] {
                MapleJob.俠盜,
                MapleJob.神偷,
                MapleJob.暗影神偷
        };

        for (Field field : constants.skills.暗影神偷.class.getDeclaredFields()) {
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
            case 二段跳:
                return 盜賊迅捷;
            case 致命暗殺_1:
                return 致命暗殺;
            case 楓幣炸彈_攻擊:
                return 楓幣炸彈;
            case 楓幣炸彈_1:
            case 楓幣炸彈_2:
            case 殺意:
                return 血腥掠奪術;
            case 滅殺刃影_1:
            case 滅殺刃影_2:
            case 滅殺刃影_3:
                return 滅殺刃影;
            case 黑影切斷_1:
            case 黑影切斷_2:
                return 黑影切斷;
            case 滅鬼斬靈陣_1:
            case 滅鬼斬靈陣_2:
            case 滅鬼斬靈陣_3:
            case 滅鬼斬靈陣_4:
                return 滅鬼斬靈陣;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 妙手術:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.妙手術, 1);
                return 1;
            case 勇者掠奪術:
            case 血腥掠奪術:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.PickPocket, 1);
                return 1;
            case 影分身:
                statups.put(MapleBuffStat.ShadowPartner, effect.getX());
                return 1;
            case 致命暗殺:
                effect.getInfo().put(MapleStatInfo.time, 45000);
                statups.put(MapleBuffStat.Exceed, 1);
                return 1;
            case 致命暗殺_1:
                effect.getInfo().put(MapleStatInfo.time, 10000);
                statups.put(MapleBuffStat.致命暗殺_殺數點數, 1);
                return 1;
            case 殺意:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.MesoGuard, 1);
                return 1;
            case 楓葉祝福:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.BasicStatUp, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 傳說冒險:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 翻轉硬幣:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.暴能續發, 1);
                return 1;
            case 滅殺刃影:
            case 滅殺刃影_1:
            case 滅殺刃影_2:
            case 滅殺刃影_3:
                effect.getInfo().put(MapleStatInfo.time, 5000);
                statups.put(MapleBuffStat.滅殺刃影, 3);
                return 1;
        }
        return -1;
    }

    @Override
    public int onSkillUse(MaplePacketReader slea, MapleClient c, MapleCharacter chr, SkillClassApplier applier) {
        MapleForceFactory forceFactory = MapleForceFactory.getInstance();
        switch (applier.effect.getSourceId()) {
            case 黑暗瞬影: {
                MapleStatEffect effect;
                if (chr.isSkillCooling(盜賊.隱身術) || (effect = chr.getSkillEffect(盜賊.隱身術)) == null) {
                    return 0;
                }
                effect.applyTo(chr);
                return 1;
            }
            case 楓幣炸彈:
            case 楓幣炸彈_1: {
                final ArrayList<Integer> moboids = new ArrayList<>();
                MapleMonster bossMob = null;
                for (MapleMapObject o : chr.getMap().getMapObjectsInRange(chr.getPosition(), applier.effect.getRange(), Collections.singletonList(MapleMapObjectType.MONSTER))) {
                    moboids.add(o.getObjectId());
                    if (((MapleMonster) o).isBoss() && (bossMob == null || bossMob.getMaxHP() < ((MapleMonster) o).getMaxHP())) {
                        bossMob = ((MapleMonster) o);
                    }
                }
                if (bossMob != null) {
                    moboids.clear();
                    moboids.add(bossMob.getObjectId());
                }
                if (moboids.isEmpty()) {
                    return 0;
                }
                final List<MapleMapItem> stealMesoObject = chr.getMap().getStealMesoObject(chr, applier.effect.getBulletCount(), applier.effect.getRange());
                for (MapleMapItem item : stealMesoObject) {
                    item.setEnterType((byte) 0);
                    chr.getMap().disappearMapObject(item);
                }
                if (stealMesoObject.isEmpty()) {
                    return 0;
                }
                final MapleForceAtom force = new MapleForceAtom();
                force.setOwnerId(chr.getId());
                force.setBulletItemID(0);
                force.setArriveDir(0);
                force.setArriveRange(500);
                force.setForcedTarget(null);
                force.setFirstMobID(0);
                final ArrayList<Integer> oids = new ArrayList<>();
                for (int i = 0; i < applier.effect.getMobCount(); i++) {
                    oids.add(moboids.get(i % moboids.size()));
                }
                force.setToMobOid(oids);
                if (applier.effect.getSourceId() == 楓幣炸彈) {
                    force.setSkillId(楓幣炸彈_攻擊);
                    force.setForceType(MapleForceType.楓幣炸彈.ordinal());
                } else if (applier.effect.getSourceId() == 楓幣炸彈_1) {
                    force.setSkillId(楓幣炸彈_2);
                    force.setForceType(75);
                }
                force.setInfo(forceFactory.getForceInfo_楓幣炸彈(chr, stealMesoObject, 1000));
                chr.getMap().broadcastMessage(chr, ForcePacket.forceAtomCreate(force), true);
                chr.send(EffectPacket.encodeUserEffectLocal(applier.effect.getSourceId(), EffectOpcode.UserEffect_SkillUse, chr.getLevel(), applier.effect.getLevel()));
                chr.getMap().broadcastMessage(chr, EffectPacket.onUserEffectRemote(chr, applier.effect.getSourceId(), EffectOpcode.UserEffect_SkillUse, chr.getLevel(), applier.effect.getLevel()), false);

                MapleStatEffect effect;
                if (chr.getBuffStatValueHolder(殺意) == null && (effect = chr.getSkillEffect(殺意)) != null && applier.effect.getSourceId() == 楓幣炸彈_1) {
                    effect.applyBuffEffect(chr, chr, 2100000000, false, false, true, null);
                }
                return 1;
            }
            case 暗影霧殺: {
                c.announce(MaplePacketCreator.sendSkillUseResult(true, applier.effect.getSourceId()));
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 勇者掠奪術:
            case 血腥掠奪術: {
                if (applier.effect.getSourceId() != applyto.getBuffSource(MapleBuffStat.PickPocket)) {
                    final List<MapleMapItem> stealMesoObject = applyto.getMap().getStealMesoObject(applyto, -1, -1);
                    for (MapleMapItem item : stealMesoObject) {
                        applyto.getMap().disappearMapObject(item);
                    }
                }
                if (applier.passive) {
                    applier.buffz = applyto.getBuffedIntZ(MapleBuffStat.PickPocket);
                    final List stealMesos = applyto.getMap().getStealMesoObject(applyto, applier.effect.getY(), -1);
                    if (applier.buffz != stealMesos.size()) {
                        applier.buffz = stealMesos.size();
                        return 1;
                    }
                } else {
                    applier.buffz = 0;
                }
                return !applier.passive ? 1 : 0;
            }
            case 致命暗殺_1: {
                if (applier.passive) {
                    Object z = applyfrom.getTempValues().remove("致命暗殺減益OID");
                    int oid = (z instanceof Integer) ? (int) z : 0;
                    MapleBuffStatValueHolder mbsvh = applyto.getBuffStatValueHolder(MapleBuffStat.致命暗殺_殺數點數);
                    if (mbsvh != null && mbsvh.z == oid) {
                        applier.localstatups.put(MapleBuffStat.致命暗殺_殺數點數, Math.min(mbsvh.value + 1, 3));
                    }
                    applier.buffz = oid;
                    return 1;
                }
                return 0;
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
            case 翻轉硬幣: {
                int value = Math.min(applyto.getBuffedIntValue(MapleBuffStat.暴能續發), applier.effect.getY() + 1);
                if (!JobConstants.is幻影俠盜(applyto.getJob())) {
                    value = value < applier.effect.getY() + 1 ? value + 1 : value;
                    applier.localstatups.put(MapleBuffStat.暴能續發, value);
                }
                return 1;
            }
            case 滅殺刃影:
            case 滅殺刃影_1:
            case 滅殺刃影_2:
            case 滅殺刃影_3: {
                applier.b4 = false;
                if (!applier.primary) {
                    return 0;
                }
                int value = applyto.getBuffedIntValue(MapleBuffStat.滅殺刃影);
                if (applyto.getBuffedValue(MapleBuffStat.滅殺刃影) == null) {
                    return 1;
                }
                applyto.dispelEffect(MapleBuffStat.滅殺刃影);
                applier.localstatups.put(MapleBuffStat.滅殺刃影, --value);
                if (value <= 0) {
                    applier.overwrite = false;
                    applier.localstatups.clear();
                }
                return 1;
            }
            case 滅鬼斬靈陣: {
                List<Integer> exList = Arrays.asList(滅鬼斬靈陣_4, 滅鬼斬靈陣_2, 滅鬼斬靈陣_1, 滅鬼斬靈陣_3, 滅鬼斬靈陣_2, 滅鬼斬靈陣_1, 滅鬼斬靈陣_3, 滅鬼斬靈陣_2, 滅鬼斬靈陣_1, 滅鬼斬靈陣_3, 滅鬼斬靈陣_2, 滅鬼斬靈陣_1);
                List<ExtraSkill> eskills = new LinkedList<>();
                for (int skill : exList) {
                    ExtraSkill eskill = new ExtraSkill(skill, applyto.getPosition());
                    eskill.Value = 1;
                    eskill.FaceLeft = applyto.isFacingLeft() ? 0 : 1;
                    eskills.add(eskill);
                }
                applyto.send(MaplePacketCreator.RegisterExtraSkill(滅鬼斬靈陣, eskills));
                return 0;
            }
        }
        return -1;
    }

    @Override
    public int onApplyAttackEffect(MapleCharacter applyfrom, MapleMonster applyto, SkillClassApplier applier) {
        if (applier.totalDamage > 0L) {
            MapleStatEffect effect = applyfrom.getEffectForBuffStat(MapleBuffStat.妙手術);
            if (effect != null && applyto.isShouldDropAssassinsMark() && Randomizer.isSuccess(effect.getZ())) {
                applyto.setShouldDropAssassinsMark(false);
                final MapleMapItem mdrop = new MapleMapItem(new Item(!applyto.isBoss() ? 2431835 : 2431850, (byte) 0, (short) 1), applyto.getPosition(), applyto, applyfrom, (byte) 0, false, 0);
                mdrop.setOnlySelfID(applyfrom.getId());
                mdrop.setSourceOID(applyto.getObjectId());
                applyfrom.getMap().spawnMobDrop(mdrop, applyto, applyfrom);
            }
            effect = applyfrom.getEffectForBuffStat(MapleBuffStat.PickPocket);
            if (effect != null) {
                int prop = effect.getProp(applyfrom);
                if (applier.effect.getSourceId() == 冷血連擊) {
                    prop = prop * applier.effect.getX() / 100;
                }
                for (int i = 0; i < applier.effect.getAttackCount(); i++) {
                    if (Randomizer.isSuccess(prop) && applyfrom.getBuffedIntZ(MapleBuffStat.PickPocket) < effect.getY()) {
                        Point p = new Point(applyto.getPosition());
                        p.y = applyfrom.getMap().getFootholds().findBelow(applyto.getPosition()).getPoint1().y;
                        applyfrom.getMap().spawnMobMesoDrop(1, p, applyto, applyfrom, true, (byte) 0, 0, effect.getSourceId());
                        effect.unprimaryPassiveApplyTo(applyfrom);
                    }
                }
            }
            if ((effect = applyfrom.getSkillEffect(飛毒殺)) != null) {
                final MapleStatEffect effect1;
                if ((effect1 = applyfrom.getSkillEffect(致命飛毒殺)) != null) {
                    effect = effect1;
                }
                effect.applyMonsterEffect(applyfrom, applyto, effect.getDotTime() * 1000);
            }
            if (applier.effect != null && applier.effect.getSourceId() == 致命暗殺_1) {
                applyfrom.dispelEffect(殺意);
                if (applyfrom.getSkillEffect(黑影切斷) != null) {
                    applyfrom.getTempValues().put("致命暗殺減益OID", applyto.getObjectId());
                    applier.effect.unprimaryPassiveApplyTo(applyfrom);
                }
            }
        }
        return 1;
    }

    @Override
    public int onAfterAttack(MapleCharacter player, SkillClassApplier applier) {
        MapleStatEffect eff = player.getEffectForBuffStat(MapleBuffStat.DarkSight);
        if (eff != null && eff.getSourceId() == 盜賊.隱身術 && (eff = player.getSkillEffect(進階隱身術)) != null) {
            int prop = player.getMap().getAllAffectedAreasThreadsafe().stream().anyMatch(mist -> (mist.getSkillID() == 煙幕彈 || mist.getSkillID() == 暗影霧殺) && mist.getOwnerId() == player.getId() && mist.getArea().contains(player.getPosition())) ? 100 : eff.getProp(player);
            if (applier.effect != null && prop != 100) {
                switch (applier.effect.getSourceId()) {
                    case 致命暗殺:
                        prop = 100;
                        break;
                    case 致命暗殺_1:
                        prop = 0;
                        break;
                }
            }
            if (!Randomizer.isSuccess(prop)) {
                player.dispelEffect(MapleBuffStat.DarkSight);
            }
        }
        if (!applier.ai.mobAttackInfo.isEmpty() && (eff = player.getEffectForBuffStat(MapleBuffStat.暴能續發)) != null) {
            eff.applyBuffEffect(player, player, 2100000000, false, false, true, null);
        }
        return 1;
    }

    @Override
    public int onAfterCancelEffect(MapleCharacter player, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 勇者掠奪術:
            case 血腥掠奪術:
                if (!applier.overwrite) {
                    final List<MapleMapItem> stealMesoObject = player.getMap().getStealMesoObject(player, -1, -1);
                    for (MapleMapItem item : stealMesoObject) {
                        player.getMap().disappearMapObject(item);
                    }
                }
                break;
        }
        return -1;
    }
}
