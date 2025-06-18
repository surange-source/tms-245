package client.skills.handler.其他;

import client.MapleBuffStat;
import client.MapleBuffStatValueHolder;
import client.MapleCharacter;
import client.MapleClient;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.skills.handler.SkillClassFetcher;
import client.status.MonsterStatus;
import constants.skills.通用V核心;
import handling.opcode.SendPacketOpcode;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.life.MapleMonster;
import tools.Randomizer;
import tools.data.MaplePacketLittleEndianWriter;
import tools.data.MaplePacketReader;

import java.lang.reflect.Field;
import java.util.Map;

import static constants.skills.通用V核心.*;

public class 全職通用 extends AbstractSkillHandler {

    public 全職通用() {
        for (Field field : 通用V核心.class.getDeclaredFields()) {
            try {
                skills.add(field.getInt(field.getName()));
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public boolean containsJob(int jobWithSub) {
        return true;
    }

    @Override
    public int getLinkedSkillID(int skillId) {
        switch (skillId) {
            case 蜘蛛之鏡_1:
            case 蜘蛛之鏡_2:
                return 蜘蛛之鏡;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 實用的時空門:
                statups.put(MapleBuffStat.IndieSummoned, 1);
                return 1;
            case 實用的會心之眼:
                effect.setOverTime(true);
                statups.put(MapleBuffStat.SharpEyes, (effect.getInfo().get(MapleStatInfo.x) << 8) + effect.getInfo().get(MapleStatInfo.y) + effect.getInfo().get(MapleStatInfo.criticaldamageMax));
                return 1;
            case 實用的神聖之火:
                effect.setOverTime(true);
                statups.put(MapleBuffStat.MaxHP, effect.getInfo().get(MapleStatInfo.x));
                statups.put(MapleBuffStat.MaxMP, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 實用的戰鬥命令:
                effect.setOverTime(true);
                statups.put(MapleBuffStat.CombatOrders, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 實用的進階祝福:
                effect.setOverTime(true);
                statups.clear();
                statups.put(MapleBuffStat.AdvancedBless, effect.getInfo().get(MapleStatInfo.x));
                statups.put(MapleBuffStat.IndieMHP, effect.getInfo().get(MapleStatInfo.indieMhp));
                statups.put(MapleBuffStat.IndieMMP, effect.getInfo().get(MapleStatInfo.indieMmp));
                return 1;
            case 實用的最終極速:
                effect.setOverTime(true);
                statups.put(MapleBuffStat.PartyBooster, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 艾爾達斯的新星:
                monsterStatus.put(MonsterStatus.Freeze, 1);
                return 1;
            case 實用的祈禱:
                statups.put(MapleBuffStat.HolySymbol, effect.getInfo().get(MapleStatInfo.x));
                return 1;
        }
        return -1;
    }

    @Override
    public int onSkillUse(MaplePacketReader slea, MapleClient c, MapleCharacter chr, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 瞬移: {
                MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
                mplew.writeOpcode(SendPacketOpcode.LP_RandomTeleportKey);
                mplew.write(Randomizer.nextInt(255));
                c.announce(mplew.getPacket());
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onAfterRegisterEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 實用的祈禱: {
                MapleBuffStatValueHolder mbsvh = applyto.getBuffStatValueHolder(MapleBuffStat.HolySymbol, applier.effect.getSourceId());
                if (mbsvh != null) {
                    mbsvh.DropRate = applier.effect.getV();
                }
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onAttack(final MapleCharacter player, final MapleMonster monster, SkillClassApplier applier) {
        AbstractSkillHandler holder = SkillClassFetcher.getHandlerByJob(player.getJobWithSub());
        if (holder == this) {
            return -1;
        }
        return holder.onAttack(player, monster, applier);
    }

    @Override
    public int onApplyMonsterEffect(MapleCharacter applyfrom, MapleMonster applyto, SkillClassApplier applier) {
        AbstractSkillHandler holder = SkillClassFetcher.getHandlerByJob(applyfrom.getJobWithSub());
        if (holder == this) {
            return -1;
        }
        return holder.onApplyMonsterEffect(applyfrom, applyto, applier);
    }

    @Override
    public int onApplyAttackEffect(MapleCharacter applyfrom, MapleMonster applyto, SkillClassApplier applier) {
        AbstractSkillHandler holder = SkillClassFetcher.getHandlerByJob(applyfrom.getJobWithSub());
        if (holder == this) {
            return -1;
        }
        return holder.onApplyAttackEffect(applyfrom, applyto, applier);
    }

    @Override
    public int onAfterAttack(MapleCharacter player, SkillClassApplier applier) {
        AbstractSkillHandler holder = SkillClassFetcher.getHandlerByJob(player.getJobWithSub());
        if (holder == this) {
            return -1;
        }
        return holder.onAfterAttack(player, applier);
    }
}
