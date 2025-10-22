package packet;

import client.MapleCharacter;
import client.MonsterFamiliar;
import configs.ServerConfig;
import handling.opcode.SendPacketOpcode;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import packet.familiar.*;
import server.movement.LifeMovementFragment;
import tools.types.Pair;
import tools.data.MaplePacketLittleEndianWriter;

import java.awt.*;
import java.util.*;
import java.util.List;

public class SpecialPacket {

    private static final Logger log = LogManager.getLogger(SpecialPacket.class);

    public enum SpecialPacketType {

        NONE(-1),
        SKILL_INNER_GLARE(-2107976430),
        SKILL_INNER_STORM(-1570672098),
        FAMILIAR_CARDS(-1723358014),
        FAMILIAR_LIFE(-1692623269);
        public final int MagicNumber;

        SpecialPacketType(final int magicNumber) {
            MagicNumber = magicNumber;
        }
    }

    public static byte[] singleSpecialResult(int chrId, final SpecialPacketType packetType, IFamiliarPacket packet) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.SPECIAL_OPERATION.getValue());

        mplew.writeInt(chrId);
        mplew.write(5);

        MaplePacketLittleEndianWriter mplew2 = new MaplePacketLittleEndianWriter();
        mplew2.writeInt(packetType.ordinal());
        mplew2.writeShort(packet.getSubType());
        packet.writePacket(mplew2);

        mplew.writeShort(mplew2.getPacket().length);
        mplew.write(mplew2.getPacket());

        return mplew.getPacket();
    }

    public static byte[] specialResult(int chrId, List<SpecialPacketEntry> list) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.SPECIAL_OPERATION.getValue());

        mplew.writeInt(chrId);
        mplew.write(7);
        writeSpecialPacket(mplew, chrId, list);

        return mplew.getPacket();
    }

    private static void writeSpecialPacket(MaplePacketLittleEndianWriter mplew, int chrId, List<SpecialPacketEntry> list) {
        for (final SpecialPacketEntry packet : list) {
            mplew.writeInt(packet.packetType.ordinal());
            mplew.writeInt(packet.packetType.MagicNumber);
            mplew.writeInt(packet.nUnkValue);
            mplew.writeInt(chrId);
            mplew.write(packet.subPackets.size() > 0 ? 1 : 2);
            if (packet.subPackets.size() > 0) {
                packet.writePacket(mplew);
            }
            mplew.write(0);
        }
    }

    public static byte[] writeWarpToMap(MapleCharacter player, int setFieldType) {
        List<SpecialPacketEntry> entries = new ArrayList<>();
        SpecialPacketEntry entry;
        MonsterFamiliar familiar = player.getSummonedFamiliar();
        if (setFieldType == 1) {
            entry = new SpecialPacketEntry(SpecialPacketType.SKILL_INNER_GLARE, 0);
            entry.subPackets.add(new SpecialUnkPacket1());
            entry.subPackets.add(new SpecialUnkPacket2(entry.nUnkValue, player.getId()));
            entry.subPackets.add(new SpecialUnkPacket3(1));
            entries.add(entry);
            entry = new SpecialPacketEntry(SpecialPacketType.FAMILIAR_CARDS, 0);
            entry.subPackets.add(new SpecialUnkPacket1());
            entry.subPackets.add(new SpecialUnkPacket2(entry.nUnkValue, player.getId()));
            entry.subPackets.add(new SpecialUnkPacket3(1));
            entry.subPackets.add(new FamiliarSpawnedValuePacket(familiar == null ? SpecialPacketType.NONE.ordinal() : SpecialPacketType.FAMILIAR_LIFE.ordinal()));
            entry.subPackets.add(new FamiliarInfoPacket(player.getFamiliars().values()));
            entry.subPackets.add(new FamiliarTeamStatSelectedPacket((short) player.getSelectedFamiliarTeamStat()));
            entry.subPackets.add(new FamiliarTeamStatsPacket(player.getFamiliarTeamStats()));
            entry.subPackets.add(new FamiliarsSealCostPacket(ServerConfig.FAMILIAR_SEAL_COST));
            entry.subPackets.add(new FamiliarUnkPacketType2(0));
            entries.add(entry);
            if (player.checkInnerStormValue()) {
                entry = new SpecialPacketEntry(SpecialPacketType.SKILL_INNER_STORM, 0);
                entry.subPackets.add(new SpecialUnkPacket1());
                entry.subPackets.add(new SpecialUnkPacket2(entry.nUnkValue, player.getId()));
                entry.subPackets.add(new SpecialUnkPacket3(1));
                entry.subPackets.add(new InnerStormSkillValuePacket(player.getInnerStormValue()));
                entry.subPackets.add(new InnerStormSkillEffectPacket(player.getInnerStormValue() > 0 ? 1 : 0));
                entries.add(entry);
            }
            if (familiar != null) {
                entry = new SpecialPacketEntry(SpecialPacketType.FAMILIAR_LIFE, 0);
                entry.subPackets.add(new SpecialUnkPacket1());
                entry.subPackets.add(new SpecialUnkPacket2(entry.nUnkValue, player.getId()));
                entry.subPackets.add(new SpecialUnkPacket3(1));
                entry.subPackets.add(new FamiliarSpawnPacket(familiar, familiar.getPosition()));
                entries.add(entry);
            }
        } else if (setFieldType == 2) {
            if (player.checkInnerStormValue()) {
                entry = new SpecialPacketEntry(SpecialPacketType.SKILL_INNER_STORM, 0);
                entry.subPackets.add(new SpecialUnkPacket1());
                entry.subPackets.add(new SpecialUnkPacket3(1));
                entry.subPackets.add(new FamiliarInfoPacket(null));
                entries.add(entry);
            }
            if (familiar != null) {
                entry = new SpecialPacketEntry(SpecialPacketType.FAMILIAR_LIFE, 0);
                entry.subPackets.add(new SpecialUnkPacket1());
                entry.subPackets.add(new SpecialUnkPacket3(1));
                entry.subPackets.add(new FamiliarSpawnPacket(familiar, familiar.getPosition()));
                entries.add(entry);
            }
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        writeSpecialPacket(mplew, player.getId(), entries);
        mplew.writeInt(0);
        return mplew.getPacket();
    }

    public static byte[] openCardPack(int chrId, List<Pair<Integer, Integer>> familiarids) {
        return singleSpecialResult(chrId, SpecialPacketType.FAMILIAR_CARDS, new FamiliarUseCardPackPacket(familiarids));
    }

    public static byte[] initSpecialData(int chrId, boolean initInnerStorm) {
        List<SpecialPacketEntry> list = new ArrayList<>();
        SpecialPacketEntry entry;
        entry = new SpecialPacketEntry(SpecialPacketType.SKILL_INNER_GLARE, 0);
        entry.subPackets.add(new SpecialUnkPacket1());
        entry.subPackets.add(new SpecialUnkPacket2(entry.nUnkValue, chrId));
        entry.subPackets.add(new SpecialUnkPacket3(1));
        list.add(entry);
        if (initInnerStorm) {
            entry = new SpecialPacketEntry(SpecialPacketType.SKILL_INNER_STORM, 0);
            entry.subPackets.add(new SpecialUnkPacket1());
            entry.subPackets.add(new SpecialUnkPacket2(entry.nUnkValue, chrId));
            entry.subPackets.add(new SpecialUnkPacket3(1));
            entry.subPackets.add(new InnerStormSkillValuePacket(0));
            entry.subPackets.add(new InnerStormSkillEffectPacket(0));
            list.add(entry);
        }
        entry = new SpecialPacketEntry(SpecialPacketType.FAMILIAR_CARDS, 0);
        entry.subPackets.add(new SpecialUnkPacket1());
        entry.subPackets.add(new SpecialUnkPacket2(entry.nUnkValue, chrId));
        entry.subPackets.add(new SpecialUnkPacket3(1));
        entry.subPackets.add(new FamiliarSpawnedValuePacket(SpecialPacketType.NONE.ordinal()));
        entry.subPackets.add(new FamiliarInfoPacket(null));
        entry.subPackets.add(new FamiliarTeamStatSelectedPacket((short) 0));
        entry.subPackets.add(new FamiliarTeamStatsPacket(null));
        entry.subPackets.add(new FamiliarsSealCostPacket(ServerConfig.FAMILIAR_SEAL_COST));
        entry.subPackets.add(new FamiliarUnkPacketType2(0));
        list.add(entry);
        return specialResult(chrId, list);
    }

    public static byte[] initFamiliarData(MapleCharacter chr) {
        List<SpecialPacketEntry> list = new ArrayList<>();
        SpecialPacketEntry entry;
        entry= new SpecialPacketEntry(SpecialPacketType.FAMILIAR_CARDS, 0);
        entry.subPackets.add(new FamiliarSpawnedValuePacket(SpecialPacketType.FAMILIAR_LIFE.ordinal()));
        entry.subPackets.add(new FamiliarInfoPacket(chr.getFamiliars().values()));
        entry.subPackets.add(new FamiliarTeamStatSelectedPacket((short) chr.getSelectedFamiliarTeamStat()));
        entry.subPackets.add(new FamiliarTeamStatsPacket(chr.getFamiliarTeamStats()));
        list.add(entry);
        entry = new SpecialPacketEntry(SpecialPacketType.FAMILIAR_LIFE, 0);
        MonsterFamiliar summonedFamiliar = chr.getSummonedFamiliar();
        if (summonedFamiliar != null) {
            entry.subPackets.add(new SpecialUnkPacket1());
            entry.subPackets.add(new SpecialUnkPacket2(entry.nUnkValue, chr.getId()));
            entry.subPackets.add(new SpecialUnkPacket3(1));
            entry.subPackets.add(new FamiliarSpawnPacket(summonedFamiliar, summonedFamiliar.getPosition()));
        }
        list.add(entry);
        return specialResult(chr.getId(), list);
    }

    public static byte[] equipInnerStorm(int cid) {
        List<SpecialPacketEntry> list = new ArrayList<>();
        SpecialPacketEntry entry;
        entry = new SpecialPacketEntry(SpecialPacketType.SKILL_INNER_STORM, 0);
        entry.subPackets.add(new SpecialUnkPacket1());
        entry.subPackets.add(new SpecialUnkPacket2(entry.nUnkValue, cid));
        entry.subPackets.add(new SpecialUnkPacket3(1));
        entry.subPackets.add(new InnerStormSkillValuePacket(0));
        entry.subPackets.add(new InnerStormSkillEffectPacket(0));
        list.add(entry);
        return specialResult(cid, list);
    }

    public static byte[] unequipInnerStorm(int cid) {
        List<SpecialPacketEntry> list = new ArrayList<>();
        SpecialPacketEntry entry = new SpecialPacketEntry(SpecialPacketType.SKILL_INNER_STORM, 0);
        list.add(entry);
        return specialResult(cid, list);
    }

    public static byte[] updateInnerStormValue(int chrId, int value, int effect) {
        List<SpecialPacketEntry> entries = new ArrayList<>();
        SpecialPacketEntry entry = new SpecialPacketEntry(SpecialPacketType.SKILL_INNER_STORM, 0);
        entry.subPackets.add(new InnerStormSkillValuePacket(value));
        if (effect >= 0) {
            entry.subPackets.add(new InnerStormSkillEffectPacket(effect));
        }
        entries.add(entry);
        return specialResult(chrId, entries);
    }

    public static byte[] removeFamiliar(int chrId, boolean self) {
        List<SpecialPacketEntry> entries = new ArrayList<>();
        SpecialPacketEntry entry;
        if (self) {
            entry = new SpecialPacketEntry(SpecialPacketType.FAMILIAR_CARDS, 0);
            entry.subPackets.add(new FamiliarSpawnedValuePacket(SpecialPacketType.NONE.ordinal()));
            entries.add(entry);
        }
        entry = new SpecialPacketEntry(SpecialPacketType.FAMILIAR_LIFE, 0);
        entries.add(entry);
        return specialResult(chrId, entries);
    }

    public static byte[] spawnFamiliar(int chrId, boolean hasOld, MonsterFamiliar familiar, Point pos, boolean self) {
        List<SpecialPacketEntry> entries = new ArrayList<>();
        SpecialPacketEntry entry;
        if (hasOld) {
            entry = new SpecialPacketEntry(SpecialPacketType.FAMILIAR_LIFE, 0);
            entries.add(entry);
        }
        if (self) {
            entry = new SpecialPacketEntry(SpecialPacketType.FAMILIAR_CARDS, 0);
            entry.subPackets.add(new FamiliarSpawnedValuePacket(SpecialPacketType.FAMILIAR_LIFE.ordinal()));
            entries.add(entry);
        }
        entry = new SpecialPacketEntry(SpecialPacketType.FAMILIAR_LIFE, 0);
        entry.subPackets.add(new SpecialUnkPacket1());
        entry.subPackets.add(new FamiliarSpawnPacket(familiar, pos));
        entries.add(entry);
        return specialResult(chrId, entries);
    }

    public static byte[] updateFamiliarInfo(int chrId, Collection<MonsterFamiliar> familiars) {
        List<SpecialPacketEntry> entries = new ArrayList<>();
        SpecialPacketEntry entry = new SpecialPacketEntry(SpecialPacketType.FAMILIAR_CARDS, 0);
        entry.subPackets.add(new FamiliarInfoPacket(familiars));
        entries.add(entry);
        return specialResult(chrId, entries);
    }

    public static byte[] changeTeamStatSelected(MapleCharacter chr, int selected) {
        List<SpecialPacketEntry> entries = new ArrayList<>();
        SpecialPacketEntry entry = new SpecialPacketEntry(SpecialPacketType.FAMILIAR_CARDS, 0);
        entry.subPackets.add(new FamiliarTeamStatSelectedPacket((short) selected));
        entries.add(entry);
        return specialResult(chr.getId(), entries);
    }

    public static byte[] changeTeamStats(MapleCharacter chr, List<Short> options) {
        List<SpecialPacketEntry> entries = new ArrayList<>();
        SpecialPacketEntry entry = new SpecialPacketEntry(SpecialPacketType.FAMILIAR_CARDS, 0);
        entry.subPackets.add(new FamiliarTeamStatsPacket(options));
        entries.add(entry);
        return specialResult(chr.getId(), entries);
    }

    public static byte[] familiarGainExp(int id, HashMap<Integer, Integer> hashMap) {
        return singleSpecialResult(id, SpecialPacketType.FAMILIAR_CARDS, new FamiliarGainExpPacket(hashMap));
    }

    public static byte[] upgradeFamiliar(int id) {
        return singleSpecialResult(id, SpecialPacketType.FAMILIAR_CARDS, new FamiliarUpgradePacket());
    }

    public static byte[] familiarMove(int id, final int gatherDuration, final int nVal1, final Point oPos, final Point mPos, final List<LifeMovementFragment> res) {
        return singleSpecialResult(id, SpecialPacketType.FAMILIAR_LIFE, new FamiliarMovePacket(gatherDuration, nVal1, oPos, mPos, res));
    }
}
