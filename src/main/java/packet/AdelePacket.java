package packet;

import handling.opcode.SendPacketOpcode;
import server.maps.ForceAtomObject;
import tools.data.MaplePacketLittleEndianWriter;

import java.util.List;

public class AdelePacket {

    public static byte[] ForceAtomObjectRemove(int chrId, List<ForceAtomObject> var1, int var2) {
        MaplePacketLittleEndianWriter p = new MaplePacketLittleEndianWriter(SendPacketOpcode.LP_ForceAtomObjectRemove);
        p.writeInt(chrId);
        p.writeInt(var1.size());
        for (ForceAtomObject sword : var1) {
            p.writeInt(sword.Idx);
        }

        p.writeInt(var2);
        p.writeInt(0);
        return p.getPacket();
    }

    public static byte[] ForceAtomObjectAttack(int chrId, int var1, int var2) {
        MaplePacketLittleEndianWriter p = new MaplePacketLittleEndianWriter(SendPacketOpcode.LP_ForceAtomObjectAttack);
        p.writeInt(chrId);
        p.writeInt(var1);
        p.writeInt(var2);
        return p.getPacket();
    }

    public static void encodeForceAtomObject(MaplePacketLittleEndianWriter p, ForceAtomObject sword) {
        p.writeInt(sword.Idx);
        p.writeInt(sword.Idk3);
        p.writeInt(sword.DataIndex);
        p.writeInt(sword.Index);
        p.writeInt(sword.OwnerId);
        p.writeInt(sword.Target);
        p.writeInt(sword.CreateDelay);
        p.writeInt(sword.EnableDelay);
        p.writeInt(sword.Rotate);
        p.writeInt(sword.SkillId);
        p.writeInt(sword.Idk4);
        p.writeInt(sword.Idk1);
        p.writeInt(sword.Expire);
        p.writePosInt(sword.Position);
        p.writeInt(sword.Idk5);
        p.writeInt(sword.Idk2);
        p.writePosInt(sword.ObjPosition);
        p.writeBool(sword.B1);
        p.writeBool(sword.B2);
        p.writeBool(sword.B3);
        p.writeInt(sword.ValueList.size());
        for (int i : sword.ValueList) {
            p.writeInt(i);
        }
    }

    public static byte[] ForceAtomObject(int chrId, List<ForceAtomObject> swords, int n) {
        MaplePacketLittleEndianWriter p = new MaplePacketLittleEndianWriter(SendPacketOpcode.LP_ForceAtomObject);
        p.writeInt(chrId);
        p.writeInt(swords.size());
        for (ForceAtomObject sword : swords) {
            encodeForceAtomObject(p, sword);
        }

        p.writeInt(n);
        return p.getPacket();
    }

    public static byte[] AdeleChargeResult(boolean suc) {
        MaplePacketLittleEndianWriter p = new MaplePacketLittleEndianWriter(SendPacketOpcode.LP_AdeleChargeResult);
        p.writeBool(suc);
        return p.getPacket();
    }
}
