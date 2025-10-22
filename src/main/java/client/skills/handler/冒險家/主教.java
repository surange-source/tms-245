package client.skills.handler.冒險家;

import client.*;
import client.skills.SkillFactory;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.status.MonsterEffectHolder;
import client.status.MonsterStatus;
import constants.JobConstants;
import handling.opcode.EffectOpcode;
import packet.AdelePacket;
import packet.BuffPacket;
import packet.EffectPacket;
import packet.SummonPacket;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.buffs.MapleStatEffectFactory;
import server.life.MapleMonster;
import server.life.MobSkill;
import server.maps.ForceAtomObject;
import server.maps.MapleMapObject;
import server.maps.MapleSummon;
import server.Randomizer;
import tools.data.MaplePacketReader;

import java.awt.*;
import java.lang.reflect.Field;
import java.util.*;
import java.util.List;
import java.util.stream.Collectors;

import static constants.skills.主教.*;

public class 主教 extends AbstractSkillHandler {

    public 主教() {
        jobs = new MapleJob[] {
                MapleJob.僧侶,
                MapleJob.祭司,
                MapleJob.主教
        };

        for (Field field : constants.skills.主教.class.getDeclaredFields()) {
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
            case 天使之觸:
                return 群體治癒;
            case 天使之泉:
                return 神聖之泉;
            case 勝利之羽:
            case 勝利之羽_1:
                return 淨化;
            case 聖十字魔法盾_CD:
                return 聖十字魔法盾;
            case 神聖之血:
                return 神聖之水;
            case 天堂之門_BUFF:
                return 天堂之門;
            case 天秤之使_1:
            case 天秤之使_2:
                return 天秤之使;
            case 和平使者_1:
                return 和平使者;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 祝福福音:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.BlessEnsenble, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 天使之觸:
                monsterStatus.put(MonsterStatus.IndieMDR, effect.getX());
                return 1;
            case 天使祝福:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.Bless, effect.getLevel());
                return 1;
            case 聖光:
                monsterStatus.put(MonsterStatus.Stun, 1);
                return 1;
            case 神聖之泉:
            case 天使之泉:
            case 時空門:
            case 天秤之使:
                statups.put(MapleBuffStat.IndieSummoned, 1);
                return 1;
            case 聖靈守護:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.AntiMagicShell, 1);
                return 1;
            case 勝利之羽:
                statups.put(MapleBuffStat.勝利之羽, 1);
                return 1;
            case 神聖祈禱:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.HolySymbol, effect.getX());
                return 1;
            case 瞬間移動精通:
                statups.put(MapleBuffStat.TeleportMasteryOn, 1);
                monsterStatus.put(MonsterStatus.Stun, 1);
                return 1;
            case 瞬間移動爆發:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.RpSiksin, 1);
                return 1;
            case 聖十字魔法盾:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.HolyMagicShell, effect.getInfo().get(MapleStatInfo.x));
                effect.getInfo().put(MapleStatInfo.cooltime, effect.getInfo().get(MapleStatInfo.y));
                effect.setHpR(effect.getInfo().get(MapleStatInfo.z) / 100.0D);
                return 1;
            case 聖十字魔法盾_CD:
                statups.put(MapleBuffStat.HolyMagicShellCooldown, 1);
                return 1;
            case 天使之箭:
                monsterStatus.put(MonsterStatus.IndiePMdR, effect.getS());
                return 1;
            case 神聖之水:
                statups.put(MapleBuffStat.神聖之水, 0);
                return 1;
            case 神聖之血:
                statups.put(MapleBuffStat.IndiePMdR, effect.getU());
                statups.put(MapleBuffStat.受擊傷增加, effect.getV());
                statups.put(MapleBuffStat.神聖之血, 1);
                return 1;
            case 復甦之光:
                statups.put(MapleBuffStat.NotDamaged, 1);
                return 1;
            case 魔力無限:
                effect.setHpR(effect.getInfo().get(MapleStatInfo.y) / 100.0);
                effect.setMpR(effect.getInfo().get(MapleStatInfo.y) / 100.0);
                statups.put(MapleBuffStat.Stance, effect.getInfo().get(MapleStatInfo.prop));
                statups.put(MapleBuffStat.Infinity, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 召喚聖龍:
                effect.setDebuffTime(effect.getSubTime() * 1000);
                monsterStatus.put(MonsterStatus.BahamutLightElemAddDam, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 進階祝福:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.IndieMHP, effect.getInfo().get(MapleStatInfo.indieMhp));
                statups.put(MapleBuffStat.IndieMMP, effect.getInfo().get(MapleStatInfo.indieMmp));
                statups.put(MapleBuffStat.AdvancedBless, effect.getInfo().get(MapleStatInfo.mpConReduce));
                return 1;
            case 楓葉祝福:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.BasicStatUp, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 神秘狙擊:
                effect.getInfo().put(MapleStatInfo.time, 5000);
                statups.put(MapleBuffStat.ArcaneAim, 1);
                return 1;
            case 天堂之門_BUFF:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.HeavensDoor, 1);
                statups.put(MapleBuffStat.HeavensDoorCooldown, 1);
                return 1;
            case 傳說冒險:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 復仇天使:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.VengeanceOfAngel, 1);
                return 1;
            case 聖靈祈禱:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.聖靈祈禱, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 天秤之使_1:
                effect.setDebuffTime(effect.getSubTime() * 1000);
                monsterStatus.put(MonsterStatus.BahamutLightElemAddDam, effect.getY());

                statups.put(MapleBuffStat.IndieSummoned, 1);
                return 1;
            case 天秤之使_2:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.IndieDamR, 0);
                return 1;
            case 和平使者_1:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
            case 神之懲罰:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.Bullet_Count, 0);
                return 1;
        }
        return -1;
    }

    @Override
    public int onSkillUse(MaplePacketReader slea, MapleClient c, MapleCharacter chr, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 淨化: {
                applier.pos = slea.readPos();
                chr.setPosition(applier.pos);
                return 1;
            }
            case 神聖之水: {
                MapleBuffStatValueHolder mbsvh = chr.getBuffStatValueHolder(MapleBuffStat.神聖之水);
                if (mbsvh == null) {
                    return 0;
                }
                int nCount = slea.readShort();
                for (int i = 0; i < Math.min(nCount, applier.effect.getW()); i++) {
                    if (mbsvh.value <= 0) {
                        mbsvh.value = 0;
                        break;
                    }
                    mbsvh.value -= 1;
                    applier.effect.applyAffectedArea(chr, slea.readPosInt());
                }
                return 1;
            }
            case 召喚聖龍: {
                chr.dispelEffect(天秤之使);
                chr.dispelEffect(天秤之使_1);
                return 1;
            }
            case 天秤之使:
            case 天秤之使_1: {
                chr.dispelEffect(召喚聖龍);
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyTo(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 群體治癒:
            case 天使之箭: {
                MapleBuffStatValueHolder mbsvh = applyfrom.getBuffStatValueHolder(MapleBuffStat.神聖之血);
                int hpValue = 0;
                if (applier.effect.getSourceId() == 群體治癒) {
                    hpValue = MapleStatEffectFactory.makeHealHP(applier.effect.getHp() / 100.0, applyfrom.getStat().getTotalMagic(), 3, 5);
                }
                Point p = applyfrom.getPosition();
                Rectangle rect;
                if (applier.effect.getSourceId() == 天使之箭) {
                    rect = MapleStatEffectFactory.calculateBoundingBox(p, applyfrom.isFacingLeft(), new Point(-25, -37), new Point(25, 38), applier.effect.getInfo().get(MapleStatInfo.range));
                } else {
                    rect = applier.effect.calculateBoundingBox(p);
                }
                int count = 0;
                for (MapleCharacter chr : applyfrom.getMap().getCharactersInRect(rect)) {
                    if (chr == applyfrom || chr.getParty() == applyfrom.getParty()) {
                        if (applier.effect.getSourceId() == 天使之箭) {
                            hpValue = chr.getStat().getCurrentMaxHP() * applier.effect.getHp() / 100;
                        } else {
                            if (chr.getBuffStatValueHolder(MapleBuffStat.BanMap) != null) {
                                hpValue = -hpValue;
                            } else if (chr.getStat().getHp() < chr.getStat().getCurrentMaxHP()) {
                                count++;
                            }
                        }
                        if (mbsvh != null && mbsvh.effect != null) {
                            hpValue -= hpValue * mbsvh.effect.getQ() / 100;
                        }
                        chr.addHP(hpValue);
                    }
                }
                if (count > 0) {
                    applier.cooldown -= count * applier.effect.getY() * 1000;
                }
                return 1;
            }
            case 聖靈守護: {
                applier.cooldown = 0;
                return 1;
            }
            case 淨化: {
                Rectangle rect = applier.effect.calculateBoundingBox(applyfrom.getPosition());
                int count = 0;
                for (MapleCharacter chr : applyfrom.getMap().getCharactersInRect(rect)) {
                    if (chr == applyfrom || chr.getParty() == applyfrom.getParty()) {
                        List<MapleBuffStatValueHolder> mbsvhs = new LinkedList<>();
                        for (Map.Entry<MapleBuffStat, List<MapleBuffStatValueHolder>> entry : chr.getAllEffects().entrySet()) {
                            if (!entry.getKey().isNormalDebuff() && !entry.getKey().isCriticalDebuff()) {
                                continue;
                            }
                            entry.getValue().stream().filter(mbsvh -> mbsvh.effect instanceof MobSkill).forEach(mbsvhs::add);
                        }
                        if (mbsvhs.size() > 0) {
                            count++;
                            mbsvhs.forEach(mbsvh -> chr.cancelEffect(mbsvh.effect, mbsvh.startTime));
                        }
                    }
                }
                for (MapleMapObject obj : applyfrom.getMap().getMonstersInRect(rect)) {
                    MapleMonster mob = (MapleMonster) obj;
                    List<Integer> skills = new LinkedList<>();
                    for (List<MonsterEffectHolder> mehs : mob.getAllEffects().values()) {
                        mehs.stream().filter(meh -> (meh.effect instanceof MobSkill) && !skills.contains(meh.effect.getSourceId())).forEach(meh -> skills.add(meh.effect.getSourceId()));
                    }
                    for (int skill : skills) {
                        mob.removeEffect(0, skill);
                    }
                }
                if (count > 0) {
                    applier.cooldown -= applier.effect.getY() * count * 1000;
                    applyfrom.reduceSkillCooldown(聖靈守護, applier.effect.getDuration() * count);
                }
                return 1;
            }
            case 神聖之血: {
                int intValue = applyfrom.getStat().getTotalInt();
                if (intValue >= applier.effect.getS()) {
                    applier.cooldown -= intValue / applier.effect.getS() * applier.effect.getW2() * 1000;
                    applier.cooldown = Math.max(applier.cooldown, applier.effect.getInfo().get(MapleStatInfo.v2) * 1000);
                }
                return 1;
            }
            case 復甦之光: {
                int duration = applier.effect.getBuffDuration(applyfrom);
                int count = 0;
                for (MapleCharacter chr : applyfrom.getMap().getCharactersInRect(applier.effect.calculateBoundingBox(applyfrom.getPosition()))) {
                    if (applyfrom != chr && applyfrom.getParty() == chr.getParty() && !chr.isAlive()) {
                        chr.heal();
                        applier.effect.applyBuffEffect(applyfrom, chr, duration, false, false, true, null);
                        count++;
                    }
                }
                if (count <= 0) {
                    applier.cooldown = 0;
                }
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
                applyto.registerSkillCooldown(mbsvh.effect, true);
                applyto.dispelEffect(MapleBuffStat.AntiMagicShell);
                return 0;
            }
            return -1;
        }
        switch (applier.effect.getSourceId()) {
            case 祝福福音: {
                int count;
                if (applyfrom.getParty() != null) {
                    count = (int) applyfrom.getParty().getMemberList().stream()
                            .filter(member -> member.getChr() != null && member.getMapid() == applyfrom.getMapId() && member.getChr().getPosition().distance(applyfrom.getPosition()) <= 700.0)
                            .filter(member -> member.getChr().getAllEffects().values().stream().flatMap(Collection::stream).collect(Collectors.toCollection(LinkedList::new)).stream()
                                    .anyMatch(mbsvh -> mbsvh != null && mbsvh.effect != null && containsSkill(mbsvh.effect.getSourceId()) && mbsvh.effect.isPartyBuff()))
                            .count();
                } else {
                    count = applyfrom.getChrBuffStatValueHolder(applyfrom.getId()).stream().anyMatch(mbsvh -> mbsvh != null && mbsvh.effect != null && mbsvh.effect.isPartyBuff()) ? 1 : 0;
                }
                if (count <= 0) {
                    applyfrom.dispelEffect(祝福福音);
                    return 0;
                }
                MapleStatEffect effect = applyfrom.getSkillEffect(祝福旋律);
                if (effect == null) {
                    effect = applier.effect;
                }
                applier.localstatups.put(MapleBuffStat.BlessEnsenble, count * effect.getX());
                return 1;
            }
            case 天使祝福: {
                final MapleBuffStatValueHolder mbsvh = applyto.getBuffStatValueHolder(MapleBuffStat.AdvancedBless);
                if (mbsvh != null) {
                    applyto.cancelEffect(mbsvh.effect, mbsvh.startTime);
                }
                return 1;
            }
            case 聖靈守護: {
                applier.buffz = 0;
                return 1;
            }
            case 神聖祈禱: {
                MapleBuffStatValueHolder mbsvh;
                if (!applier.primary && (mbsvh = applyto.getBuffStatValueHolder(MapleBuffStat.HolySymbol, applier.effect.getSourceId())) != null) {
                    Map<MapleBuffStat, Integer> statups = new LinkedHashMap<>();
                    statups.put(MapleBuffStat.HolySymbol, applier.effect.getSourceId());
                    applier.buffz = mbsvh.z;
                    if (applier.buffz == 0) {
                        mbsvh.value = applier.effect.getX() * applier.effect.getY() / 100;
                        mbsvh.DropRate = 0;
                    } else {
                        mbsvh.value = applier.effect.getX();
                        MapleStatEffect effect;
                        if (applyfrom != null && (effect = applyfrom.getSkillEffect(神聖祈禱_掉寶提升)) != null) {
                            mbsvh.DropRate = effect.getV();
                        }
                    }
                    mbsvh = applyto.getBuffStatValueHolder(MapleBuffStat.IndieAsrR, applier.effect.getSourceId());
                    if (mbsvh != null) {
                        if (applier.buffz == 0) {
                            mbsvh.value = 0;
                        } else {
                            mbsvh.value = 10;
                        }
                        statups.put(MapleBuffStat.IndieAsrR, applier.effect.getSourceId());
                    }
                    mbsvh = applyto.getBuffStatValueHolder(MapleBuffStat.IndieTerR, applier.effect.getSourceId());
                    if (mbsvh != null) {
                        if (applier.buffz == 0) {
                            mbsvh.value = 0;
                        } else {
                            mbsvh.value = 10;
                        }
                        statups.put(MapleBuffStat.IndieTerR, applier.effect.getSourceId());
                    }
                    applyto.send(BuffPacket.giveBuff(applyto, applier.effect, statups));
                    applyto.getStat().recalcLocalStats(false, applyto);
                    return 0;
                }
                applier.buffz = 1;
                MapleStatEffect effect;
                if (applyfrom == applyto && (effect = applyfrom.getSkillEffect(神聖祈禱_經驗提升)) != null) {
                    applier.localstatups.put(MapleBuffStat.HolySymbol, applier.localstatups.get(MapleBuffStat.HolySymbol) + effect.getY());
                }
                if ((effect = applyfrom.getSkillEffect(神聖祈禱_抗性提升)) != null) {
                    applier.localstatups.put(MapleBuffStat.IndieAsrR, effect.getASRRate());
                    applier.localstatups.put(MapleBuffStat.IndieTerR, effect.getTERRate());
                }
                return 1;
            }
            case 瞬間移動精通: {
                applier.duration = 2100000000;
                return 1;
            }
            case 聖十字魔法盾: {
                if (applyto.getBuffStatValueHolder(聖十字魔法盾_CD) != null) {
                    return 0;
                }
                SkillFactory.getSkill(聖十字魔法盾_CD).getEffect(1).applyBuffEffect(applyfrom, applyto, applier.effect.getY() * 1000, false , false, true, null);

                int hpValue = applyto.getStat().getCurrentMaxHP() * applier.effect.getZ() / 100;
                MapleBuffStatValueHolder mbsvh = applyfrom.getBuffStatValueHolder(MapleBuffStat.神聖之血);
                if (mbsvh != null && mbsvh.effect != null) {
                    hpValue -= hpValue * mbsvh.effect.getQ() / 100;
                }
                applyto.addHP(hpValue);

                MapleStatEffect effect;
                if ((effect = applyfrom.getSkillEffect(聖十字魔法盾_額外防禦)) != null) {
                    applier.localstatups.put(MapleBuffStat.HolyMagicShell, applier.localstatups.get(MapleBuffStat.HolyMagicShell) + effect.getX());
                }
                applier.buffz = applier.effect.getW();
                if ((effect = applyfrom.getSkillEffect(聖十字魔法盾_效果強化)) != null) {
                    applier.buffz += effect.getW();
                }
                return 1;
            }
            case 神聖之水: {
                MapleBuffStatValueHolder mbsvh = applyfrom.getBuffStatValueHolder(MapleBuffStat.神聖之水);
                int count = mbsvh == null ? 0 : mbsvh.value;
                if (!applier.primary) {
                    count += 1;
                }
                count = Math.min(Math.max(0, count), applier.effect.getW());
                if (mbsvh != null) {
                    mbsvh.value = count;
                }
                if (count <= 0) {
                    applyfrom.dispelEffect(MapleBuffStat.神聖之水);
                    return 0;
                }
                applier.duration = 2100000000;
                applier.localstatups.put(MapleBuffStat.神聖之水, count);
                return 1;
            }
            case 神聖之血: {
                int intValue = applyfrom.getStat().getTotalInt();
                if (intValue >= applier.effect.getS()) {
                    applier.localstatups.put(MapleBuffStat.IndiePMdR, Math.min(applier.effect.getS2(), applier.localstatups.get(MapleBuffStat.IndiePMdR) + (intValue / applier.effect.getS() * applier.effect.getU2())));
                }
                return 1;
            }
            case 復甦之光: {
                if (applyfrom == applyto) {
                    return 0;
                }
                return 1;
            }
            case 進階祝福: {
                final MapleBuffStatValueHolder mbsvh = applyto.getBuffStatValueHolder(MapleBuffStat.Bless);
                if (mbsvh != null) {
                    applyto.cancelEffect(mbsvh.effect, mbsvh.startTime);
                }
                applier.buffz = applier.effect.getX();
                MapleStatEffect effect;
                if ((effect = applyfrom.getSkillEffect(進階祝福_加碼傷害)) != null) {
                    applier.buffz += effect.getX();
                    applier.localstatups.put(MapleBuffStat.IndiePAD, effect.getX());
                    applier.localstatups.put(MapleBuffStat.IndieMAD, effect.getY());
                }
                if ((effect = applyfrom.getSkillEffect(進階祝福_血魔加成)) != null) {
                    applier.localstatups.put(MapleBuffStat.IndieMHP, applier.localstatups.get(MapleBuffStat.IndieMHP) + effect.getIndieMHp());
                    applier.localstatups.put(MapleBuffStat.IndieMMP, applier.localstatups.get(MapleBuffStat.IndieMMP) + effect.getIndieMMp());
                }
                return 1;
            }
            case 神秘狙擊: {
                if (applyto.getBuffedValue(MapleBuffStat.ArcaneAim) != null) {
                    applier.localstatups.put(MapleBuffStat.ArcaneAim, Math.min(applier.effect.getY(), applyto.getBuffedIntValue(MapleBuffStat.ArcaneAim) + 1));
                }
                return 1;
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
            case 天堂之門_BUFF: {
                if (applyto.getBuffStatValueHolder(MapleBuffStat.HeavensDoorCooldown) != null) {
                    return 0;
                }
                if (applier.primary) {
                    applier.effect.applyBuffEffect(applyfrom, applyto, applier.effect.getDuration(), false , false, true, null);
                    applier.duration = 2100000000;
                    applier.localstatups.remove(MapleBuffStat.HeavensDoorCooldown);
                } else {
                    applier.localstatups.remove(MapleBuffStat.HeavensDoor);
                }
                return 1;
            }
            case 聖靈祈禱: {
                if (applier.primary) {
                    if (applyfrom != applyto) {
                        return 0;
                    }
                } else {
                    applier.duration = 2000;
                    applier.localstatups.clear();
                    int intValue = applyfrom.getStat().getTotalInt();
                    if (applyfrom != applyto && intValue >= applier.effect.getU()) {
                        applier.localstatups.put(MapleBuffStat.IndieBooster, Math.max(-(applier.effect.getU() / intValue), applier.effect.getV()));
                    }
                    applier.localstatups.put(MapleBuffStat.IndiePMdR, applier.effect.getQ());
                    if (applyfrom != applyto && intValue >= applier.effect.getQ2()) {
                        applier.localstatups.put(MapleBuffStat.IndiePMdR, Math.min(applier.localstatups.get(MapleBuffStat.IndiePMdR) + (applier.effect.getQ2() / intValue), applier.effect.getW()));
                    }
                }
                return 1;
            }
            case 天秤之使:
                if (!applier.primary) {
                    return 0;
                }
                SkillFactory.getSkill(天秤之使_1).getEffect(applier.effect.getLevel()).applyBuffEffect(applyfrom, applyto, applier.duration, applier.primary, applier.att, applier.passive, applier.pos);
                return 1;
            case 天秤之使_1:
            case 神之懲罰: {
                if (!applier.primary) {
                    return 0;
                }
                return 1;
            }
            case 天秤之使_2: {
                MapleStatEffect effect = SkillFactory.getSkill(天秤之使).getEffect(applier.effect.getLevel());
                if (effect == null) {
                    return 0;
                }
                int intValue = applyfrom.getStat().getTotalInt();
                applier.localstatups.put(MapleBuffStat.IndiePMdR, effect.getW());
                if (applyfrom != applyto && intValue >= effect.getAttackCount()) {
                    applier.localstatups.put(MapleBuffStat.IndiePMdR, Math.min(applier.localstatups.get(MapleBuffStat.IndiePMdR) + (effect.getAttackCount() / intValue), effect.getDamage()));
                }
                applyto.addHPMP(effect.getY(), 0);
                applyto.send(EffectPacket.showSkillAffected(-1, 天秤之使, effect.getLevel(), 0));
                return 1;
            }
            case 和平使者_1: {
                if (applyfrom == applyto && !applier.effect.calculateBoundingBox(applier.pos).contains(applyfrom.getPosition())) {
                    return 0;
                }
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onAfterRegisterEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 神聖祈禱: {
                MapleBuffStatValueHolder mbsvh = applyto.getBuffStatValueHolder(MapleBuffStat.HolySymbol, applier.effect.getSourceId());
                if (mbsvh != null && mbsvh.z == 1) {
                    MapleStatEffect effect;
                    if ((effect = applyfrom.getSkillEffect(神聖祈禱_掉寶提升)) != null) {
                        mbsvh.DropRate = effect.getV();
                    }
                }
                return 1;
            }
            case 神聖之水: {
                MapleBuffStatValueHolder mbsvh = applyto.getBuffStatValueHolder(MapleBuffStat.神聖之水);
                if (mbsvh != null && mbsvh.sourceID == applier.effect.getSourceId()) {
                    mbsvh.sourceID = 0;
                }
                return 1;
            }
            case 進階祝福: {
                MapleBuffStatValueHolder mbsvh = applyto.getBuffStatValueHolder(MapleBuffStat.AdvancedBless, applier.effect.getSourceId());
                if (mbsvh != null) {
                    MapleStatEffect effect;
                    if ((effect = applyfrom.getSkillEffect(進階祝福_魔王剋星)) != null) {
                        mbsvh.BDR = effect.getInfo().get(MapleStatInfo.bdR);
                    }
                }
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyMonsterEffect(MapleCharacter applyfrom, MapleMonster applyto, SkillClassApplier applier) {
        if (applier.effect == null) {
            return -1;
        }
        switch (applier.effect.getSourceId()) {
            case 瞬間移動精通:
                applier.prop = applier.effect.getSubProp();
                return 1;
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
        return 1;
    }

    @Override
    public int onAfterAttack(MapleCharacter player, SkillClassApplier applier) {
        if (applier.effect == null) {
            return -1;
        }
        MapleBuffStatValueHolder mbsvh;
        if (applier.ai.mobAttackInfo.size() > 0 && 勝利之羽_1 != applier.ai.skillId && (mbsvh = player.getBuffStatValueHolder(MapleBuffStat.勝利之羽)) != null) {
            if (!player.isSkillCooling(勝利之羽_1)) {
                Point p = applier.ai.skillposition != null ? applier.ai.skillposition : applier.ai.position != null ? applier.ai.position : player.getPosition();
                List<MapleMapObject> mobs = player.getMap().getMonstersInRect(SkillFactory.getSkill(勝利之羽_1).getEffect(mbsvh.effect.getLevel()).calculateBoundingBox(p));
                if (!mobs.isEmpty()) {
                    player.registerSkillCooldown(勝利之羽_1, mbsvh.effect.getU(), true);
                    List<ForceAtomObject> createList = new ArrayList<>();
                    for (int i = 0; i < mbsvh.effect.getBulletCount(); i++) {
                        ForceAtomObject obj = new ForceAtomObject(player.getSpecialStat().gainForceCounter(), 37, i, player.getId(), Randomizer.rand(-360, 360), 勝利之羽_1);
                        obj.EnableDelay = 60;
                        obj.Expire = mbsvh.effect.getW() * 1000;
                        obj.Position = new Point(0, 1);
                        obj.ObjPosition = new Point(p);
                        obj.ObjPosition.x += Randomizer.rand(-100, 100);
                        obj.ObjPosition.y += Randomizer.rand(-100, -20);
                        createList.add(obj);
                        MapleMonster mob = (MapleMonster) mobs.get(i % mobs.size());
                        if (mob != null) {
                            obj.Target = mob.getObjectId();
                        }
                    }
                    if (!createList.isEmpty()) {
                        player.getMap().broadcastMessage(AdelePacket.ForceAtomObject(player.getId(), createList, 0), player.getPosition());
                    }
                }
            }
        }

        MapleStatEffect effect;
        if (applier.effect.getSourceId() == 天使之箭 && applier.ai.mobAttackInfo.size() > 0 && (effect = player.getSkillEffect(神聖之水)) != null) {
            int count = (int) player.getTempValues().getOrDefault("天使之箭累計次數", 0) + 1;
            if (count >= effect.getU()) {
                count = 0;
                effect.applyBuffEffect(player, player, 2100000000, false, false, true, null);
            }
            player.getTempValues().put("天使之箭累計次數", count);
        }
        return -1;
    }

    @Override
    public int onAfterCancelEffect(MapleCharacter player, SkillClassApplier applier) {
        if (!applier.overwrite) {
            switch (applier.effect.getSourceId()) {
                case 天秤之使:
                case 天秤之使_1: {
                    if (player.getBuffStatValueHolder(天秤之使) == null && player.getBuffStatValueHolder(天秤之使_1) == null) {
                        MapleStatEffect effect = player.getSkillEffect(召喚聖龍);
                        if (effect != null) {
                            effect.applyTo(player, true);
                        }
                    }
                    break;
                }
            }
        }
        return -1;
    }

    public static void handlePassive(MapleCharacter chr, int numTimes) {
        MapleBuffStatValueHolder mbsvh;
        if (numTimes % 4 == 0) {
            mbsvh = chr.getBuffStatValueHolder(MapleBuffStat.HolySymbol, 神聖祈禱);
            if (mbsvh != null && mbsvh.effect != null && chr.getMap() != null && mbsvh.fromChrID != chr.getId()) {
                MapleCharacter fchr;
                int buffz;
                if ((fchr = chr.getMap().getPlayerObject(mbsvh.fromChrID)) != null && mbsvh.effect.calculateBoundingBox2(fchr.getPosition()).contains(chr.getPosition())) {
                    buffz = 1;
                } else {
                    buffz = 0;
                }
                if (mbsvh.z != buffz) {
                    mbsvh.z = buffz;
                    mbsvh.effect.applyBuffEffect(fchr, chr, mbsvh.getLeftTime(), false, false, true, null);
                }
            }
            final MapleSummon summonBySkillID;
            if ((summonBySkillID = chr.getSummonBySkillID(天秤之使_1)) != null && !chr.getMap().getMonstersInRange(chr.getPosition(), 500).isEmpty()) {
                chr.getClient().announce(SummonPacket.SummonedAssistAttackRequest(chr.getId(), summonBySkillID.getObjectId(), 0));
            }
        }
        if (numTimes % 2 == 0 && JobConstants.is主教(chr.getJob()) && (mbsvh = chr.getBuffStatValueHolder(MapleBuffStat.聖靈祈禱)) != null) {
            for (MapleCharacter tchr : chr.getMap().getCharactersInRect(mbsvh.effect.calculateBoundingBox(chr.getPosition()))) {
                if (tchr != null && (tchr == chr || tchr.getParty() == chr.getParty())) {
                    mbsvh.effect.applyBuffEffect(chr, tchr, 2000, false, false, true, null);
                }
            }
        }
    }
}
