package packet;

import client.MapleCharacter;
import client.MapleStat;
import client.inventory.MaplePet;
import handling.opcode.EffectOpcode;
import handling.opcode.SendPacketOpcode;
import server.movement.LifeMovementFragment;
import tools.data.MaplePacketLittleEndianWriter;

import java.awt.*;
import java.util.List;

public class PetPacket {

    public static byte[] showPetPickUpMsg(boolean canPickup, int pets) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_CashPetPickUpOnOffResult.getValue());
        mplew.write(canPickup ? 1 : 0);
        mplew.write(pets);

        return mplew.getPacket();
    }

    public static byte[] showPetAutoEatMsg() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_CashPetSkillSettingResult.getValue());

        return mplew.getPacket();
    }

    public static byte[] showPet(MapleCharacter chr, MaplePet pet, boolean remove, byte showType) {
        return showPet(chr, pet, remove, showType, false);
    }

    public static byte[] showPet(MapleCharacter chr, MaplePet pet, boolean remove, byte showType, boolean show) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(show ? SendPacketOpcode.LP_PetModified.getValue() : SendPacketOpcode.LP_PetActivated.getValue());
        mplew.writeInt(chr.getId());
        mplew.writeInt(chr.getPetIndex(pet));
        mplew.write(remove ? 0 : 1);
        /*
         * 0 = 手動召回
         * 1 = 寵物飢餓度為0自動回去
         * 2 = 寵物時間到期
         */
        mplew.write(showType);
        if (!remove) {
            addPetInfo(mplew, pet);
        }

        return mplew.getPacket();
    }

    public static void addPetInfo(MaplePacketLittleEndianWriter mplew, MaplePet pet) {
        mplew.writeInt(pet.getPetItemId());  //寵物ID
        mplew.writeMapleAsciiString(pet.getName()); //寵物名字
        mplew.writeLong(pet.getUniqueId()); //寵物的SQL唯一ID
        mplew.writePos(pet.getPos()); //寵物的坐標
        mplew.write(pet.getStance()); //姿勢
        mplew.writeShort(pet.getFh());
        mplew.writeInt(pet.getColor()); //getColor
        mplew.writeShort(-1);//V.161 new
        mplew.writeShort(100); //short getHugeRate / 100 ; short isTransform ? 1 : 0
        mplew.write(0);
        mplew.write(0);
    }

    public static byte[] movePet(int chrId, int slot, int gatherDuration, int nVal1, Point mPos, Point oPos, List<LifeMovementFragment> moves) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_PetMove.getValue());
        mplew.writeInt(chrId);
        mplew.writeInt(slot);
        PacketHelper.serializeMovementList(mplew, gatherDuration, nVal1, mPos, oPos, moves, null);

        return mplew.getPacket();
    }

    public static byte[] petChat(int chaId, short act, String text, short slot) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_PetAction.getValue());
        mplew.writeInt(chaId);
        mplew.writeInt(slot);
        mplew.writeShort(act);
        mplew.writeMapleAsciiString(text);

        return mplew.getPacket();
    }

    public static byte[] commandResponse(int chrId, byte command, short slot, boolean success, boolean food) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_PetActionCommand.getValue());
        mplew.writeInt(chrId);
        mplew.writeInt(slot);
        mplew.write(food ? 2 : 1);
        mplew.write(command);
        if (food) {
            mplew.writeInt(0); //T071修改為 Int
        } else {
            mplew.writeShort(success ? 1 : 0);  //T071修改為 byte
        }
        return mplew.getPacket();
    }

    public static byte[] showPetLevelUp(MapleCharacter chr, byte index) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserEffectRemote.getValue());
        mplew.writeInt(chr.getId());
        mplew.write(EffectOpcode.UserEffect_Pet.getValue());
        mplew.write(0);
        mplew.writeInt(index);

        return mplew.getPacket();
    }

    public static byte[] loadExceptionList(MapleCharacter chr, MaplePet pet) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_PetLoadExceptionList.getValue());
        mplew.writeInt(chr.getId());
        mplew.writeInt(chr.getPetIndex(pet));
        mplew.writeLong(pet.getUniqueId());
        List<Integer> excluded = pet.getExcluded();
        mplew.write(excluded.size());
        for (Integer anExcluded : excluded) {
            mplew.writeInt(anExcluded);
        }

        return mplew.getPacket();
    }

    public static byte[] petStatUpdate(MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_StatChanged.getValue());
        mplew.write(0);
        mplew.write(0);
        mplew.write(1);
        mplew.writeLong(MapleStat.寵物.getValue());
        MaplePet[] pets = chr.getSpawnPets();
        for (int i = 0; i < 3; i++) {
            if (pets[i] != null) {
                mplew.writeLong(pets[i].getUniqueId());
            } else {
                mplew.writeLong(0);
            }
        }
        mplew.write(chr.getHairBaseColor());
        mplew.write(chr.getHairMixedColor());
        mplew.write(chr.getHairProbColor());

        return mplew.getPacket();
    }

    public static byte[] changePetColor(MapleCharacter player, MaplePet pet) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PET_COLOR_CHANGE.getValue());
        mplew.writeInt(player.getId());
        mplew.writeInt(player.getPetIndex(pet));
        mplew.writeInt(pet.getColor());

        return mplew.getPacket();
    }
}
