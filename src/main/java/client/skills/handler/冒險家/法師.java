package client.skills.handler.冒險家;

import client.*;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.skills.handler.SkillClassFetcher;
import client.status.MonsterStatus;
import constants.SkillConstants;
import handling.opcode.SendPacketOpcode;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.life.MapleMonster;
import server.Randomizer;
import tools.data.MaplePacketLittleEndianWriter;
import tools.data.MaplePacketReader;

import java.awt.*;
import java.lang.reflect.Field;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import static constants.skills.法師.*;

public class 法師 extends AbstractSkillHandler {

    public 法師() {
        jobs = new MapleJob[] {
                MapleJob.法師
        };

        for (Field field : constants.skills.法師.class.getDeclaredFields()) {
            try {
                skills.add(field.getInt(field.getName()));
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }

    public int getLinkedSkillID(int skillId) {
        switch (skillId) {
            case 魔力波動_1:
                return 魔力波動;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 實戰的知識:
                statups.put(MapleBuffStat.實戰的知識, 1);
                return 1;
            case 魔心防禦:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.MagicGuard, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 魔力波動_1:
                statups.put(MapleBuffStat.IndieCurseDampening, 1);
                return 1;
        }
        return -1;
    }

    @Override
    public int onSkillUse(MaplePacketReader slea, MapleClient c, MapleCharacter chr, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 瞬間移動: {
                final MapleStatEffect effect1 = chr.getEffectForBuffStat(MapleBuffStat.ChillingStep);
                applier.pos = new Point(chr.getPosition().x + (chr.isFacingLeft() ? -80 : 80), chr.getPosition().y);
                if (effect1 != null && effect1.makeChanceResult(chr)) {
                    effect1.applyAffectedArea(chr, applier.pos);
                }
                return 1;
            }
            case 波動記憶: {
                final List<Integer> skills = SkillConstants.getUnstableMemorySkillsByJob(chr.getJob());
                Collections.shuffle(skills);
                int skillID = 0;
                for (int n13 = 0; n13 < 15; ++n13) {
                    final int intValue = skills.get(Randomizer.nextInt(skills.size()));
                    if (chr.getSkillLevel(intValue) > 0) {
                        skillID = intValue;
                        break;
                    }
                }
                final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
                mplew.writeShort(SendPacketOpcode.UnstableMemory.getValue());
                mplew.writeInt(skillID);
                mplew.writeInt(0);
                c.announce(mplew.getPacket());
                return 1;
            }
        }
        return -1;
    }

    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 實戰的知識: {
                Object z = applyfrom.getTempValues().remove("實戰的知識OID");
                int oid = (z instanceof Integer) ? (int) z : 0;
                MapleBuffStatValueHolder mbsvh = applyto.getBuffStatValueHolder(MapleBuffStat.實戰的知識);
                if (mbsvh != null && mbsvh.z == oid) {
                    applier.localstatups.put(MapleBuffStat.實戰的知識, Math.min(mbsvh.value + 1, mbsvh.effect.getX()));
                }
                applier.buffz = oid;
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
