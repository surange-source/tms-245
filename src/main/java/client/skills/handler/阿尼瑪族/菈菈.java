package client.skills.handler.阿尼瑪族;

import client.*;
import client.skills.ExtraSkill;
import client.skills.Skill;
import client.skills.SkillEntry;
import client.skills.SkillFactory;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.status.MonsterStatus;
import constants.GameConstants;
import packet.AdelePacket;
import packet.BuffPacket;
import packet.MaplePacketCreator;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.maps.ForceAtomObject;
import server.maps.MapleAffectedArea;
import server.quest.MapleQuest;
import tools.Pair;
import tools.Randomizer;
import tools.data.MaplePacketReader;

import java.awt.*;
import java.lang.reflect.Field;
import java.util.*;
import java.util.List;

import static constants.skills.菈菈.*;

public class 菈菈 extends AbstractSkillHandler {

    public 菈菈() {
        jobs = new MapleJob[] {
                MapleJob.菈菈,
                MapleJob.菈菈1轉,
                MapleJob.菈菈2轉,
                MapleJob.菈菈3轉,
                MapleJob.菈菈4轉
        };

        for (Field field : constants.skills.菈菈.class.getDeclaredFields()) {
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
        final int[] ss = {前往納林, 精靈親和, 形象變幻, 獨門咒語};
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
        return -1;
    }

    @Override
    public int getLinkedSkillID(int skillId) {
        switch (skillId) {
            case 小山靈_1:
                return 小山靈;
            case 釋放_波瀾之江_1:
            case 釋放_波瀾之江_2:
                return 釋放_波瀾之江;
            case 釋放_旋風_1:
            case 釋放_旋風_2:
                return 釋放_旋風;
            case 釋放_日光井_1:
            case 釋放_日光井_2:
            case 釋放_日光井_3:
                return 釋放_日光井;
            case 發現_風之鞦韆_1:
            case 發現_風之鞦韆_2:
                return 發現_風之鞦韆;
            case 發現_江水流動之地_1:
                return 發現_江水流動之地;
            case 發現_充滿陽光之處_1:
                return 發現_充滿陽光之處;
            case 吸收_潑江水_1:
            case 吸收_潑江水_2:
                return 吸收_潑江水;
            case 吸收_凜冽的寒風_1:
            case 吸收_凜冽的寒風_2:
                return 吸收_凜冽的寒風;
            case 吸收_陽光之力_1:
            case 吸收_陽光之力_2:
                return 吸收_陽光之力;
            case 釋放_波瀾之江_3:
            case 釋放_波瀾之江_4:
            case 釋放_波瀾之江_5:
            case 釋放_旋風_3:
            case 釋放_旋風_4:
            case 釋放_日光井_4:
            case 釋放_日光井_5:
            case 釋放_日光井_6:
                return 風月主人;
            case 精氣散播_1:
                return 知己;
            case 神木_1:
                return 神木;
            case 日江山風_1:
            case 日江山風_2:
            case 日江山風_3:
            case 日江山風_4:
            case 日江山風_5:
                return 日江山風;
            case 蜿蜒的山脊_1:
                return 蜿蜒的山脊;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 大自然夥伴:
            case 大自然夥伴_傳授:
                statups.put(MapleBuffStat.一般怪物傷害, effect.getW());
                return 1;
            case 大自然夥伴_計數:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.大自然夥伴_計數, 1);
                return 1;
            case 獨門咒語:
                effect.setRangeBuff(true);
                effect.getInfo().put(MapleStatInfo.time, effect.getDuration() * 1000);
                statups.put(MapleBuffStat.MaxLevelBuff, effect.getX());
                return 1;
            case 短杖加速:
                statups.put(MapleBuffStat.Booster, effect.getX());
                return 1;
            case 阿尼瑪的勇士:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.BasicStatUp, effect.getX());
                return 1;
            case 山不敗:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.山不敗, effect.getX());
                return 1;
            case 龍脈讀取:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.龍脈讀取, 1);
                return 1;
            case 山之種子:
                statups.put(MapleBuffStat.山之種子, 0);
                return 1;
            case 釋放_日光井_1:
            case 釋放_日光井_4:
                statups.put(MapleBuffStat.IndieCurseDampening, 1);
            case 釋放_波瀾之江_1:
            case 釋放_旋風_1:
            case 釋放_波瀾之江_3:
            case 釋放_旋風_3:
                statups.put(MapleBuffStat.IndieSummoned, 1);
                return 1;
            case 龍脈的迴響:
                statups.put(MapleBuffStat.IndiePMdR, effect.getX());
                return 1;
            case 龍脈的痕跡:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.龍脈的痕跡, 0);
                return 1;
            case 自由龍脈:
                statups.put(MapleBuffStat.自由龍脈, 0);
                return 1;
            case 發現_充滿陽光之處:
            case 發現_風之鞦韆:
                statups.clear();
                return 1;
            case 發現_充滿陽光之處_1:
                statups.put(MapleBuffStat.IndieDamR, effect.getIndieDamR());
                return 1;
            case 發現_風之鞦韆_1:
                statups.put(MapleBuffStat.IndieJump, effect.getInfo().get(MapleStatInfo.indieJump));
                statups.put(MapleBuffStat.IndieSpeed, effect.getInfo().get(MapleStatInfo.indieSpeed));
                statups.put(MapleBuffStat.IndieBooster, effect.getIndieBooster());
                return 1;
            case 發現_風之鞦韆_2:
                statups.put(MapleBuffStat.NewFlying, 1);
                return 1;
            case 吸收_潑江水_1:
                statups.put(MapleBuffStat.吸收_潑江水, 1);
                return 1;
            case 吸收_凜冽的寒風_1:
                statups.put(MapleBuffStat.吸收_凜冽的寒風, 1);
                return 1;
            case 吸收_陽光之力_1:
                statups.put(MapleBuffStat.吸收_陽光之力, 1);
                return 1;
            case 山環抱:
                effect.getInfo().put(MapleStatInfo.time, effect.getQ() * 1000);
                statups.put(MapleBuffStat.IndieDamageReduce, -effect.getX());
                statups.put(MapleBuffStat.IndieCurseDampening, 1);
                statups.put(MapleBuffStat.AntiMagicShell, 1);
                statups.put(MapleBuffStat.HoYoungHide, 1);
                return 1;
            case 山環抱_額外護盾:
                statups.put(MapleBuffStat.IndieCurseDampening, 1);
                return 1;
            case 藤蔓交織:
                monsterStatus.put(MonsterStatus.Freeze, 1);
                return 1;
            case 神木:
                monsterStatus.put(MonsterStatus.Ticktock, effect.getW());
                statups.put(MapleBuffStat.IndieCD, effect.getX());
                statups.put(MapleBuffStat.IndieBDR, effect.getIndieBDR());
                statups.put(MapleBuffStat.IndieStance, effect.getInfo().get(MapleStatInfo.indieStance));
                return 1;
            case 神木_1:
                statups.put(MapleBuffStat.IndieSummoned, 1);
                statups.put(MapleBuffStat.IndieCurseDampening, 1);
                return 1;
        }
        return -1;
    }

    @Override
    public int onSkillUse(MaplePacketReader slea, MapleClient c, MapleCharacter chr, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
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
            case 釋放_波瀾之江_1:
            case 釋放_旋風_1:
            case 釋放_波瀾之江_3:
            case 釋放_旋風_3: {
                applier.pos = slea.readPos();
                return 1;
            }
            case 釋放_日光井_1: {
                MapleStatEffect effect = chr.getSkillEffect(釋放_日光井_2);
                if (effect != null) {
                    effect.applyAffectedArea(chr, applier.pos != null ? applier.pos : chr.getPosition());
                }
                return 1;
            }
            case 釋放_日光井_4: {
                MapleStatEffect effect = chr.getSkillEffect(釋放_日光井_5);
                if (effect != null) {
                    effect.applyAffectedArea(chr, applier.pos != null ? applier.pos : chr.getPosition());
                }
                return 1;
            }
            case 釋放_日光井_3:
            case 釋放_日光井_6: {
                if (chr.getMap().getAffectedAreaByChr(chr.getId(), applier.effect.getSourceId() == 釋放_日光井_6 ? 釋放_日光井_5 : 釋放_日光井_2) == null) {
                    return 0;
                }
                slea.readInt();
                int x = slea.readInt();
                int y = slea.readInt();
                slea.readByte();
                Map<Integer, ForceAtomObject> objsMap = chr.getForceAtomObjects();
                List<ForceAtomObject> removeList = new ArrayList<>();
                Iterator<Map.Entry<Integer, ForceAtomObject>> iterator = objsMap.entrySet().iterator();
                while (iterator.hasNext()) {
                    Map.Entry<Integer, ForceAtomObject> obj = iterator.next();
                    if (obj.getValue().SkillId == applier.effect.getSourceId()) {
                        removeList.add(obj.getValue());
                        iterator.remove();
                    }
                }
                if (!removeList.isEmpty()) {
                    chr.getMap().broadcastMessage(AdelePacket.ForceAtomObjectRemove(chr.getId(), removeList, 1), chr.getPosition());
                }

                List<ForceAtomObject> createList = new ArrayList<>();
                for (int i = 0; i < 5; i++) {
                    ForceAtomObject obj = new ForceAtomObject(chr.getSpecialStat().gainForceCounter(), 21, i + 1, chr.getId(), 0, applier.effect.getSourceId());
                    obj.EnableDelay = 750;
                    obj.Expire = 4000;
                    obj.Position = new Point(0, 1);
                    obj.ObjPosition = new Point(x + Randomizer.rand(-200, 200), y + Randomizer.rand(-100, -90));
                    obj.addX(x);
                    obj.addX(y);
                    objsMap.put(obj.Idx, obj);
                    createList.add(obj);
                }
                if (!createList.isEmpty()) {
                    chr.getMap().broadcastMessage(AdelePacket.ForceAtomObject(chr.getId(), createList, 0), chr.getPosition());
                }
                return 1;
            }
            case 龍脈釋放:
            case 龍脈吸收: {
                MapleStatEffect effect = chr.getSkillEffect(龍脈的迴響);
                if (effect != null) {
                    effect.applyTo(chr);
                }
                return 1;
            }
            case 喚醒: {
                int nCount = slea.readByte();
                for (int i = 0; i < nCount; i++) {
                    slea.readInt();
                }
                slea.readByte();
                slea.readShort();
                applier.pos = slea.readPosInt();
                slea.readByte();
                nCount = Math.min(applier.effect.getZ(), Math.max(applier.effect.getBulletCount(), nCount));
                int type = -1;
                Map<Integer, ForceAtomObject> objsMap = chr.getForceAtomObjects();
                for (ForceAtomObject obj : objsMap.values()) {
                    if (龍脈讀取 == obj.SkillId && obj.ObjPosition.equals(applier.pos) && obj.ValueList != null && obj.ValueList.size() > 0) {
                        type = obj.ValueList.get(0);
                        break;
                    }
                }

                if (type == 1 || type == 2 || type == 4 || type == 8) {
                    List<ForceAtomObject> createList = new ArrayList<>();
                    for (int i = 0; i < nCount; i++) {
                        ForceAtomObject obj = new ForceAtomObject(chr.getSpecialStat().gainForceCounter(), type == 1 ? 22 :  type == 2 ? 25 : type == 8 ? 27 : 26, i, chr.getId(), 0, applier.effect.getSourceId());
                        obj.CreateDelay = 600;
                        obj.EnableDelay = 1140;
                        obj.Expire = 4000;
                        obj.Position = new Point(0, 1);
                        obj.ObjPosition = new Point(applier.pos.x + Randomizer.rand(-150, 150), applier.pos.y + Randomizer.rand(-200, -100));
                        objsMap.put(obj.Idx, obj);
                        createList.add(obj);
                    }
                    if (!createList.isEmpty()) {
                        chr.getMap().broadcastMessage(AdelePacket.ForceAtomObject(chr.getId(), createList, 0), chr.getPosition());
                    }
                }
                return 1;
            }
            case 吸收_陽光之力_2: {
                int[] oids = new int[slea.readByte()];
                for (int i = 0; i < oids.length; i++) {
                    oids[i] = slea.readInt();
                }
                slea.skip(3);
                applier.pos = slea.readPosInt();
                slea.readByte();

                List<ForceAtomObject> createList = new ArrayList<>();
                for (int i = 0; i < 5; i++) {
                    ForceAtomObject obj = new ForceAtomObject(chr.getSpecialStat().gainForceCounter(), 23, i, chr.getId(), Randomizer.nextInt(10) * 10, applier.effect.getSourceId());
                    if (oids.length > 0) {
                        obj.Target = oids[Randomizer.nextInt(oids.length)];
                    }
                    obj.CreateDelay = 1110;
                    obj.EnableDelay = 1200;
                    obj.Expire = 4000;
                    obj.Position = new Point(80, 1);
                    obj.ObjPosition = new Point(applier.pos.x + Randomizer.rand(-150, 150), applier.pos.y + Randomizer.rand(-200, -200));
                    obj.addX(applier.pos.x);
                    obj.addX(applier.pos.y);
                    chr.getForceAtomObjects().put(obj.Idx, obj);
                    createList.add(obj);
                }
                if (!createList.isEmpty()) {
                    chr.getMap().broadcastMessage(AdelePacket.ForceAtomObject(chr.getId(), createList, 0), chr.getPosition());
                }
                return 1;
            }
            case 自由龍脈: {
                ForceAtomObject obj = new ForceAtomObject(chr.getSpecialStat().gainForceCounter(), 20, 0, chr.getId(), 0, 龍脈讀取);
                obj.CreateDelay = 540;
                obj.Idk1 = 1;
                obj.Position = new Point(0, 1);
                obj.Idk2 = 1;
                obj.ObjPosition = applier.pos;
                obj.B1 = true;
                obj.addX(8);
                obj.addX(applier.ai.unInt1);
                chr.getForceAtomObjects().put(obj.Idx, obj);
                chr.send(AdelePacket.ForceAtomObject(chr.getId(), Collections.singletonList(obj), 0));
                return 1;
            }
            case 大大的舒展: {
                int[] oids = new int[slea.readByte()];
                for (int i = 0; i < oids.length; i++) {
                    oids[i] = slea.readInt();
                }
                slea.skip(3);
                applier.pos = slea.readPosInt();
                slea.readByte();

                List<ForceAtomObject> createList = new ArrayList<>();
                for (int i = 0; i < 5; i++) {
                    ForceAtomObject obj = new ForceAtomObject(chr.getSpecialStat().gainForceCounter(), applier.ai.unInt1 == 8 ? 30 : applier.ai.unInt1 == 4 ? 29 : applier.ai.unInt1 == 2 ? 28 : 24, i, chr.getId(), 0, applier.effect.getSourceId());
                    if (oids.length > 0) {
                        obj.Target = oids[Randomizer.nextInt(oids.length)];
                    }
                    obj.CreateDelay = 660;
                    obj.EnableDelay = 1320;
                    obj.Expire = 4800;
                    obj.Position = new Point(0, 1);
                    obj.ObjPosition = new Point(applier.pos.x + Randomizer.rand(-150, 150), applier.pos.y + Randomizer.rand(-200, -200));
                    obj.addX(applier.pos.x);
                    obj.addX(applier.pos.y);
                    chr.getForceAtomObjects().put(obj.Idx, obj);
                    createList.add(obj);
                }
                if (!createList.isEmpty()) {
                    chr.getMap().broadcastMessage(AdelePacket.ForceAtomObject(chr.getId(), createList, 0), chr.getPosition());
                }
                return 1;
            }
            case 日江山風: {
                List<ExtraSkill> eskills = new LinkedList<>();
                for (int i = 5; i > 0; i--) {
                    ExtraSkill eskill = new ExtraSkill(applier.effect.getSourceId() + i, applier.pos);
                    eskill.FaceLeft = applier.ai.left ? 1 : 0;
                    eskill.Delay = i == 5 ? 5850 : i == 4 ? 3150 : i == 3 ? 2250 : i == 2 ? 1560 : 630;
                    eskill.Value = i == 5 ? 8 : 4;
                    eskills.add(eskill);
                }
                chr.send(MaplePacketCreator.RegisterExtraSkill(applier.effect.getSourceId(), eskills));
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 前往納林: {
                applyto.changeMap(applier.effect.getX(), 0);
                return 1;
            }
            case 山之種子: {
                if (applier.passive) {
                    applier.applySummon = false;
                    applier.localstatups.remove(MapleBuffStat.IndieSummoned);
                    int newDuration = applier.duration;
                    applier.duration = 2100000000;
                    int changeValue = 1;
                    if (applier.primary) {
                        changeValue = -1;
                    }
                    final MapleBuffStatValueHolder mbsvh = applyfrom.getBuffStatValueHolder(MapleBuffStat.山之種子);
                    if (mbsvh == null) {
                        applier.localstatups.put(MapleBuffStat.山之種子, Math.max(0, Math.min(applyto.getBuffedIntValue(MapleBuffStat.山之種子) + changeValue, applier.effect.getW2())));
                    } else {
                        mbsvh.value += changeValue;
                        mbsvh.startTime = System.currentTimeMillis();
                        applyfrom.send(BuffPacket.giveBuff(applyfrom, mbsvh.effect, Collections.singletonMap(MapleBuffStat.山之種子, mbsvh.effect.getSourceId())));
                    }
                    if (applier.primary) {
                        applier.effect.applyBuffEffect(applyfrom, applyto, newDuration, true, false, false, applier.pos);
                    }
                    if (mbsvh != null) {
                        return 0;
                    }
                } else {
                    applier.localstatups.remove(MapleBuffStat.山之種子);
                }
                return 1;
            }
            case 龍脈的迴響: {
                applyfrom.addHPMP(applier.effect.getU(), applier.effect.getU());
                MapleStatEffect eff = applyfrom.getSkillEffect(龍脈的迴響_效果強化);
                if (eff != null) {
                    int value = applier.localstatups.remove(MapleBuffStat.IndiePMdR);
                    applier.localstatups.put(MapleBuffStat.IndieJump, eff.getY());
                    applier.localstatups.put(MapleBuffStat.IndieSpeed, eff.getX());
                    applier.localstatups.put(MapleBuffStat.IndiePMdR, value);
                }
                return 1;
            }
            case 龍脈讀取: {
                if (applyfrom.getBuffStatValueHolder(龍脈讀取) != null) {
                    applyfrom.dispelEffect(龍脈讀取);
                    return 0;
                }
                return 1;
            }
            case 龍脈的痕跡: {
                int changeValue;
                if (!applier.primary && applier.passive) {
                    return 0;
                } else if (applier.primary && applier.passive) {
                    changeValue = 1;
                } else {
                    changeValue = -1;
                }
                applier.duration = 2100000000;
                applier.localstatups.put(MapleBuffStat.龍脈的痕跡, Math.max(0, Math.min(applyto.getBuffedIntValue(MapleBuffStat.龍脈的痕跡) + changeValue, applier.effect.getV())));
                return 1;
            }
            case 自由龍脈: {
                if (applier.passive) {
                    int changeValue = 1;
                    if (applier.primary) {
                        changeValue = -1;
                    }
                    applier.duration = 2100000000;
                    applier.localstatups.put(MapleBuffStat.自由龍脈, Math.max(0, Math.min(applyto.getBuffedIntValue(MapleBuffStat.自由龍脈) + changeValue, applier.effect.getV())));
                }
                return 1;
            }
            case 發現_充滿陽光之處:
            case 發現_風之鞦韆: {
                applier.effect.applyAffectedArea(applyto, applier.pos != null ? applier.pos : applyto.getPosition());
                MapleStatEffect eff = applyto.getSkillEffect(龍脈的迴響);
                if (eff != null) {
                    eff.applyTo(applyto);
                }
                return 1;
            }
            case 發現_風之鞦韆_2: {
                int oid = 0;
                for (final MapleAffectedArea mist : applyfrom.getMap().getAllAffectedAreasThreadsafe()) {
                    if (mist.getEffect().getSourceId() == 發現_風之鞦韆) {
                        MapleCharacter playerObject = applyfrom.getMap().getPlayerObject(mist.getOwnerId());
                        if (playerObject == null) {
                            continue;
                        }
                        if ((playerObject.getParty() != null && playerObject.getParty() == applyto.getParty()) || applyto == playerObject) {
                            oid = mist.getObjectId();
                            break;
                        }
                    }
                }
                applier.buffz = oid;
                return 1;
            }
            case 喚醒: {
                MapleStatEffect eff = applyto.getSkillEffect(龍脈的迴響);
                if (eff != null) {
                    eff.applyTo(applyto);
                }
                return 1;
            }
            case 發現_江水流動之地: {
                List<Integer> idxs = new LinkedList<>();
                Map<Integer, ForceAtomObject> objsMap = applyfrom.getForceAtomObjects();
                for (ForceAtomObject obj : objsMap.values()) {
                    if (發現_江水流動之地 == obj.SkillId) {
                        int idx;
                        if (obj.DataIndex == 32) {
                            idx = obj.ValueList.get(0);
                        } else {
                            idx = obj.Idx;
                        }
                        if (idxs.contains(idx)) {
                            idxs.remove(idxs.indexOf(idx));
                        } else {
                            idxs.add(idx);
                        }
                    }
                }
                if (!idxs.isEmpty()) {
                    ForceAtomObject obj = new ForceAtomObject(applyfrom.getSpecialStat().gainForceCounter(), 32, 0, applyfrom.getId(), 0, 發現_江水流動之地);
                    obj.Idk1 = 20;
                    obj.Position = new Point(0, 1);
                    obj.ObjPosition = new Point(applier.pos.x, applier.pos.y);
                    objsMap.put(obj.Idx, obj);
                    return 1;
                }
                ForceAtomObject obj = new ForceAtomObject(applyfrom.getSpecialStat().gainForceCounter(), 31, 0, applyfrom.getId(), 0, 發現_江水流動之地);
                obj.Expire = 20000;
                obj.Idk1 = 20;
                obj.Position = new Point(0, 1);
                obj.ObjPosition = new Point(applier.pos.x, applier.pos.y);
                obj.addX(0);
                MapleStatEffect eff = applyto.getSkillEffect(龍脈的迴響);
                if (eff != null) {
                    eff.applyTo(applyto);
                }
                objsMap.put(obj.Idx, obj);
                applyfrom.getMap().broadcastMessage(AdelePacket.ForceAtomObject(applyfrom.getId(), Collections.singletonList(obj), 0), applyfrom.getPosition());
                return 1;
            }
            case 山環抱: {
                MapleStatEffect eff = applyfrom.getSkillEffect(山環抱_額外護盾);
                if (eff != null) {
                    eff.applyTo(applyfrom, applier.duration + eff.getDuration());
                }
                return 1;
            }
            case 山環抱_額外護盾: {
                applier.localstatups.put(MapleBuffStat.IndieShield, applyfrom.getStat().getCurrentMaxHP() * applier.effect.getX() / 100);
                return 1;
            }
            case 神木: {
                if (applier.primary) {
                    MapleStatEffect eff = applyto.getSkillEffect(神木_1);
                    if (eff != null) {
                        eff.applyTo(applyto);
                    }
                }
                return 1;
            }
            case 大大的舒展: {
                MapleStatEffect eff = applyto.getSkillEffect(龍脈的迴響);
                if (eff != null && applyto.getBuffStatValueHolder(龍脈的迴響) == null) {
                    eff.applyTo(applyto);
                }
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onAfterAttack(MapleCharacter player, SkillClassApplier applier) {
        if (applier.totalDamage > 0L) {
            switch (applier.effect.getSourceId()) {
                case 精氣散播:
                case 精氣散播_1: {
                    int prop = 0;
                    MapleStatEffect eff = player.getSkillEffect(小山靈);
                    if (eff != null) {
                        MapleStatEffect eff1 = player.getSkillEffect(風水地理深化);
                        if (eff1 != null) {
                            eff = eff1;
                        }
                        prop = eff.getProp();
                    }
                    if (Randomizer.isSuccess(prop)) {
                        ExtraSkill eskill = new ExtraSkill(小山靈_1, new Point(applier.ai.mobAttackInfo.get(0).hitX, applier.ai.mobAttackInfo.get(0).hitY));
                        eskill.Value = 1;
                        eskill.FaceLeft = (applier.ai.direction & 0x80) != 0 ? 1 : 0;
                        player.send(MaplePacketCreator.RegisterExtraSkill(applier.effect.getSourceId(), Collections.singletonList(eskill)));
                    }
                    Map<MapleBuffStat, Pair<Integer, Integer>> sMap = new LinkedHashMap();
                    sMap.put(MapleBuffStat.吸收_潑江水, new Pair(吸收_潑江水_2, 1));
                    sMap.put(MapleBuffStat.吸收_凜冽的寒風, new Pair(吸收_凜冽的寒風_2, 7));
                    sMap.put(MapleBuffStat.吸收_陽光之力, new Pair(吸收_陽光之力_2, 5));
                    for (Map.Entry<MapleBuffStat, Pair<Integer, Integer>> entry : sMap.entrySet()) {
                        int sourceid = entry.getValue().getLeft();
                        if (player.getBuffStatValueHolder(entry.getKey()) != null && !player.isSkillCooling(sourceid)) {
                            player.registerSkillCooldown(sourceid, 2500, true);
                            ExtraSkill eskill = new ExtraSkill(entry.getValue().getLeft(), new Point(applier.ai.mobAttackInfo.get(0).hitX, applier.ai.mobAttackInfo.get(0).hitY));
                            eskill.Value = entry.getValue().getRight();
                            eskill.FaceLeft = (applier.ai.direction & 0x80) != 0 ? 1 : 0;
                            player.send(MaplePacketCreator.RegisterExtraSkill(sourceid, Collections.singletonList(eskill)));
                        }
                    }
                    return 1;
                }
            }
        }
        return -1;
    }

    @Override
    public int onAfterCancelEffect(MapleCharacter player, SkillClassApplier applier) {
        if (!applier.overwrite) {
            switch (applier.effect.getSourceId()) {
                case 龍脈讀取: {
                    Map<Integer, ForceAtomObject> objsMap = player.getForceAtomObjects();
                    List<ForceAtomObject> removeList = new ArrayList<>();
                    Iterator<Map.Entry<Integer, ForceAtomObject>> iterator = objsMap.entrySet().iterator();
                    while (iterator.hasNext()) {
                        Map.Entry<Integer, ForceAtomObject> obj = iterator.next();
                        if (obj.getValue().SkillId == 龍脈讀取) {
                            removeList.add(obj.getValue());
                            iterator.remove();
                        }
                    }
                    if (!removeList.isEmpty()) {
                        player.getMap().broadcastMessage(AdelePacket.ForceAtomObjectRemove(player.getId(), removeList, 1), player.getPosition());
                    }
                    break;
                }
            }
        }
        return -1;
    }
}
