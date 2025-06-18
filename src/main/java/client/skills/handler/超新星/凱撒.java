package client.skills.handler.超新星;

import client.MapleBuffStat;
import client.MapleCharacter;
import client.MapleClient;
import client.MapleJob;
import client.inventory.Item;
import client.inventory.MapleInventoryType;
import client.skills.Skill;
import client.skills.SkillEntry;
import client.skills.SkillFactory;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.status.MonsterStatus;
import handling.channel.handler.AttackInfo;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.life.MapleMonster;
import tools.data.MaplePacketReader;

import java.awt.*;
import java.lang.reflect.Field;
import java.util.Map;

import static constants.skills.凱撒.*;

public class 凱撒 extends AbstractSkillHandler {

    public 凱撒() {
        jobs = new MapleJob[] {
                MapleJob.凱撒,
                MapleJob.凱撒1轉,
                MapleJob.凱撒2轉,
                MapleJob.凱撒3轉,
                MapleJob.凱撒4轉
        };

        for (Field field : constants.skills.凱撒.class.getDeclaredFields()) {
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
        int[] ss = {專用咒語, 洗牌交換_防禦模式, 洗牌交換_攻擊模式, 縱向連接, 變身, 復仇護衛};
        for (int i : ss) {
            if (chr.getLevel() < 200 && i == 專用咒語) {
                continue;
            }
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
            case 劍龍連斬_1:
            case 劍龍連斬_2:
            case 劍龍連斬_變身_3轉:
            case 劍龍連斬_變身_4轉:
                return 劍龍連斬;
            case 雙重跳躍:
            case 雙重跳躍_1:
            case 雙重跳躍_2:
                return 龍旋;
            case 龍劍風_變身:
            case 展翅飛翔_變身:
                return 龍劍風;
            case 石化:
                return 地龍襲擊;
            case 龍劍雨_1:
            case 龍劍雨_2:
            case 飛劍風暴_變身:
            case 飛劍風暴:
            case 飛劍風暴_爆發_變身:
                return 龍劍雨_爆發;
            case 進階終極形態:
            case 跳耀:
                return 終極型態;
            case 龍劍雨_變身:
            case 藍色絲線:
                return 龍劍雨;
            case 藍焰恐懼_變身:
                return 藍焰恐懼;
            case 意志之劍_變身:
                return 意志之劍;
            case 進階意志之劍_變身:
                return 進階意志之劍;
            case 穿心強襲:
                return 迅捷突進;
            case 牽引鎖鏈:
                return 龍劍鎖;
            case 烈焰箭:
                return 火焰衝擊;
            case 惡魔之嘆:
            case 龍烈焰_暴怒:
                return 龍烈焰;
            case 衝擊波:
                return 龍氣衝;
            case 超新星的意志:
                return 超新星勇士意志;
            case 展翅飛翔:
                return 龍劍風;
            case 超新星守護者_1:
            case 超新星守護者_2:
                return 超新星守護者;
            case 意志之劍_重磅出擊_1:
            case 意志之劍_重磅出擊_2:
            case 意志之劍_重磅出擊_3:
                return 意志之劍_重磅出擊;
            case 天龍恐懼_1:
            case 天龍恐懼_2:
            case 天龍恐懼_3:
                return 天龍恐懼;
            case 龍焰合一_1:
            case 龍焰合一_2:
            case 龍焰合一_3:
                return 龍焰合一;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 專用咒語:
                effect.setRangeBuff(true);
                effect.getInfo().put(MapleStatInfo.time, effect.getDuration() * 1000);
                statups.put(MapleBuffStat.MaxLevelBuff, effect.getX());
                return 1;
            case 洗牌交換_防禦模式:
            case 洗牌交換_攻擊模式:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.ReshuffleSwitch, 0);
                return 1;
            case 意志之劍:
            case 進階意志之劍:
            case 意志之劍_變身:
            case 進階意志之劍_變身:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.StopForceAtomInfo, effect.getLevel());
                return 1;
            case 怒火中燒:
                statups.put(MapleBuffStat.Booster, effect.getInfo().get(MapleStatInfo.x));
                statups.put(MapleBuffStat.IndiePAD, effect.getInfo().get(MapleStatInfo.indiePad));
                return 1;
            case 地龍襲擊:
            case 石化:
                monsterStatus.put(MonsterStatus.Speed, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 龍爆走:
                statups.put(MapleBuffStat.AsrR, effect.getInfo().get(MapleStatInfo.terR));
                statups.put(MapleBuffStat.TerR, effect.getInfo().get(MapleStatInfo.asrR));
                return 1;
            case 堅韌護甲:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.PartyBarrier, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 變身:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.SmashStack, 0);
                break;
            case 終極型態:
            case 進階終極形態:
            case 超_終極型態:
                statups.put(MapleBuffStat.IgnoreAllCounter, 1);
                statups.put(MapleBuffStat.IndiePMdR, effect.getInfo().get(MapleStatInfo.indiePMdR));
                statups.put(MapleBuffStat.Speed, effect.getInfo().get(MapleStatInfo.speed));
                statups.put(MapleBuffStat.Morph, effect.getInfo().get(MapleStatInfo.morph));
                statups.put(MapleBuffStat.Stance, effect.getInfo().get(MapleStatInfo.prop));
                statups.put(MapleBuffStat.CriticalBuff, effect.getInfo().get(MapleStatInfo.cr));
                return 1;
            case 凱撒王權:
                statups.put(MapleBuffStat.IndieIgnorePCounter, 1);
                statups.put(MapleBuffStat.IgnorePImmune, 1);
                return 1;
            case 龍劍鎖:
                effect.getInfo().put(MapleStatInfo.time, 2000);
            case 迅捷突進:
            case 穿心強襲:
            case 牽引鎖鏈:
                monsterStatus.put(MonsterStatus.Stun, 1);
                return 1;
            case 龍劍風:
            case 龍劍風_變身:
            case 展翅飛翔:
            case 展翅飛翔_變身:
                monsterStatus.put(MonsterStatus.Speed, effect.getInfo().get(MapleStatInfo.z));
                return 1;
            case 超新星勇士:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.BasicStatUp, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 意志之劍_重磅出擊:
            case 意志之劍_重磅出擊_1:
                effect.getInfo().put(MapleStatInfo.bulletCount, 5);
                return 1;
        }
        return -1;
    }

    @Override
    public int onSkillUse(MaplePacketReader slea, MapleClient c, MapleCharacter chr, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 凱撒王權: {
                chr.clearCooldown(true);
                return 1;
            }
            case 超新星守護者: {
                chr.getSkillEffect(超新星守護者_1).applyTo(chr, new Point(chr.getPosition().x + 100, chr.getPosition().y));
                chr.getSkillEffect(超新星守護者_2).applyTo(chr, new Point(chr.getPosition().x - 100, chr.getPosition().y));
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 復仇護衛: {
                applyto.changeMap(applier.effect.getX(), 0);
                return 1;
            }
            case 變身: {
                applier.localstatups.put(MapleBuffStat.SmashStack, Math.min(applyto.getBuffedIntValue(MapleBuffStat.SmashStack) + 10, 700));
                return 1;
            }
            case 終極型態:
            case 進階終極形態: {
                applyto.setBuffStatValue(MapleBuffStat.SmashStack, 變身, 0);
                applier.localstatups.put(MapleBuffStat.SmashStack, 0);
                return 1;
            }
            case 意志之劍:
            case 意志之劍_變身:
            case 進階意志之劍:
            case 進階意志之劍_變身: {
                if (!applier.primary) {
                    return 0;
                }
                Item weapon = applyto.getInventory(MapleInventoryType.EQUIPPED).getItem((short) -11);
                applier.buffz = weapon == null ? 0 : weapon.getItemId();
                return 1;
            }
            case 洗牌交換_防禦模式: {
                applyto.dispelEffect(洗牌交換_攻擊模式);
                return 1;
            }
            case 洗牌交換_攻擊模式: {
                applyto.dispelEffect(洗牌交換_防禦模式);
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyAttackEffect(MapleCharacter applyfrom, MapleMonster applyto, SkillClassApplier applier) {
        final MapleStatEffect skillEffect20;
        if (containsJob(applyfrom.getJobWithSub()) && applyfrom.getBuffedValue(MapleBuffStat.Morph) == null && (skillEffect20 = applyfrom.getSkillEffect(變身)) != null) {
            skillEffect20.unprimaryPassiveApplyTo(applyfrom);
        }
        return 1;
    }

    @Override
    public int onAfterAttack(MapleCharacter player, SkillClassApplier applier) {
        final MapleStatEffect skillEffect15;
        if (applier.effect != null && applier.effect.getSourceId() == 龍劍雨_爆發 && (skillEffect15 = player.getSkillEffect(飛劍風暴)) != null) {
            skillEffect15.applyAffectedArea(player, player.getPosition());
        }
        return 1;
    }
}
