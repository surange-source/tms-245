package client.skills.handler.皇家騎士團;

import client.*;
import client.force.MapleForceFactory;
import client.skills.Skill;
import client.skills.SkillEntry;
import client.skills.SkillFactory;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.status.MonsterStatus;
import packet.EffectPacket;
import packet.MaplePacketCreator;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.life.MapleMonster;
import tools.data.MaplePacketReader;

import java.awt.*;
import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static constants.skills.烈焰巫師.*;

public class 烈焰巫師 extends AbstractSkillHandler {

    public 烈焰巫師() {
        jobs = new MapleJob[] {
                MapleJob.烈焰巫師1轉,
                MapleJob.烈焰巫師2轉,
                MapleJob.烈焰巫師3轉,
                MapleJob.烈焰巫師4轉
        };

        for (Field field : constants.skills.烈焰巫師.class.getDeclaredFields()) {
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
            case 元素火焰_1:
                return 元素火焰;
            case 元素火焰II_1:
                return 元素火焰II;
            case 元素火焰III_1:
                return 元素火焰III;
            case 元素火焰IV_1:
                return 元素火焰IV;
            case 極致熾烈_1:
                return 極致熾烈;
            case 燃燒軍團_1:
                return 燃燒軍團;
            case 火焰防護_1:
                return 火焰防護;
            case 火焰之魂_獅子:
            case 火焰之魂_狐狸:
                return 火焰之魂;
            case 烈炎爆發_1:
            case 烈炎爆發_2:
            case 烈炎爆發_3:
                return 烈炎爆發;
            case 本鳳凰_無敵狀態:
                return 本鳳凰;
            case 火步行_1:
            case 火步行_2:
                return 火步行;
            case 龍氣息_最後一擊:
                return 龍氣息;
            case 燃燒_1:
                return 燃燒;
            case 火蜥蜴的惡作劇_1:
                return 火蜥蜴的惡作劇;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 大災變:
                statups.put(MapleBuffStat.NotDamaged, 1);
                effect.getInfo().put(MapleStatInfo.time, 5 * 1000);
                return 1;
            case 燃燒:
                statups.put(MapleBuffStat.Ember, 1);
                break;
            case 焚燒:
                effect.setMpR(effect.getInfo().get(MapleStatInfo.x) / 100.0);
                return 1;
            case 元素_火焰:
            case 元素_火焰II:
            case 元素_火焰III:
            case 元素_火焰IV:
                statups.put(MapleBuffStat.IndieMAD, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 燃燒軍團:
                statups.put(MapleBuffStat.IndieBooster, effect.getInfo().get(MapleStatInfo.indieBooster));
                return 1;
            case 本鳳凰:
                statups.put(MapleBuffStat.SiphonVitality, 1);
                return 1;
            case 本鳳凰_無敵狀態:
                effect.getInfo().put(MapleStatInfo.time, 3 * 1000);
                statups.put(MapleBuffStat.NotDamaged, 1);
                return 1;
            case 火焰防護:
                statups.put(MapleBuffStat.DamageReduce, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 火焰之魂_獅子:
            case 火焰之魂_狐狸:
                statups.put(MapleBuffStat.IgnoreTargetDEF, 1);
                return 1;
            case 火之書:
                statups.put(MapleBuffStat.Booster, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 西格諾斯騎士:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.BasicStatUp, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 守護者的榮耀:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.IndieDamR, effect.getInfo().get(MapleStatInfo.indieDamR));
                return 1;
        }
        return -1;
    }

    @Override
    public int onSkillUse(MaplePacketReader slea, MapleClient c, MapleCharacter chr, SkillClassApplier applier) {
        MapleForceFactory forceFactory = MapleForceFactory.getInstance();
        switch (applier.effect.getSourceId()) {
            case 火步行_2: {
                chr.send(EffectPacket.showFlameWizardFlameWalk(chr.getId()));
                return 1;
            }
            case 火球連結: {
                Point p = slea.readPos();
                slea.readPos();
                slea.skip(1);
                boolean b = slea.readByte() > 0;
//                chr.handle火焰傳動();
                c.announce(MaplePacketCreator.sendSkillUseResult(true, 0));
                if (b) {
                    chr.setPosition(p);
                    chr.getMap().objectMove(-1, chr, null);
                    c.announce(MaplePacketCreator.userTeleport(false, 2, chr.getId(), p));
                }
                return 1;
            }
            case 漩渦: { // TODO 重構MapleSummon
                applier.pos = slea.readPos();
                slea.readByte();
                slea.readShort();
                final MapleMonster mobObject;
                if ((mobObject = chr.getMap().getMonsterByOid(slea.readInt())) == null) {
                    c.announce(MaplePacketCreator.sendSkillUseResult(false, 0));
                    return 0;
                }
                chr.getSpecialStat().setMaelstromMoboid(mobObject.getId());
                return 1;
            }
            case 火焰之魂_獅子:
            case 火焰之魂_狐狸: {
                chr.getSkillEffect(火焰之魂).applyTo(chr);
                return 1;
            }
            case 烈炎爆發_2: {
                List<Integer> oids = IntStream.range(0, slea.readByte()).mapToObj(i -> slea.readInt()).collect(Collectors.toList());
                forceFactory.getMapleForce(chr, applier.effect, 0, oids);
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 燃燒: {
                applier.buffz = applyto.getBuffedIntZ(MapleBuffStat.Ember);
                final MapleBuffStatValueHolder mbsvh = applyto.getBuffStatValueHolder(MapleBuffStat.Ember);
                if (applier.passive && mbsvh != null) {
                    if (applier.primary) {
                        applier.buffz = Math.max(0, applier.buffz - 2);
                    } else {
                        applier.buffz = Math.min(6, applier.buffz + 1);
                    }
                    applier.duration = mbsvh.getLeftTime();
                }
                return 1;
            }
            case 火焰之魂_獅子: {
                applier.localstatups.put(MapleBuffStat.IgnoreTargetDEF, applyto.getTotalSkillLevel(火焰之魂));
                applyto.dispelEffect(火焰之魂_狐狸);
                return 1;
            }
            case 火焰之魂_狐狸: {
                applier.localstatups.put(MapleBuffStat.IgnoreTargetDEF, applyto.getTotalSkillLevel(火焰之魂));
                applyto.dispelEffect(火焰之魂_獅子);
                return 1;
            }
            case 守護者的榮耀: {
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
        }
        return -1;
    }

    @Override
    public int onApplyAttackEffect(MapleCharacter applyfrom, MapleMonster applyto, SkillClassApplier applier) {
        final MapleStatEffect effecForBuffStat4 = applyfrom.getEffectForBuffStat(MapleBuffStat.Ember);
        if (applier.totalDamage > 0L && effecForBuffStat4 != null && applyto != null && applyto.isAlive()) {
            effecForBuffStat4.applyMonsterEffect(applyfrom, applyto, effecForBuffStat4.getDotTime(applyfrom) * 1000);
            if (applyfrom.getSkillEffect(烈炎爆發) != null) {
                effecForBuffStat4.unprimaryPassiveApplyTo(applyfrom);
            }
        }
        return 1;
    }
}
