package client;

import client.inventory.MapleWeapon;
import constants.JobConstants;
import tools.data.MaplePacketLittleEndianWriter;
import tools.data.MaplePacketReader;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Map.Entry;

public class AvatarLook {

    private boolean beta;
    private boolean beastTail;
    private int shieldId;
    private int beastTailId;
    private int hair = 0;
    private byte mixAddHairColor = 0;
    private byte mixEyesPercent = 0;
    private final Map<Byte, Integer> equips = new LinkedHashMap<>();
    private final Map<Byte, Integer> maskedEquips = new LinkedHashMap<>();
    private byte mixEyesColor = -1;
    private int face = 0;
    private short job = 0;
    private final int[] pets = new int[3];
    private final Map<Byte, Integer> equipMixColors = new LinkedHashMap<>();
    private byte mixBaseHairColor = -1;
    private int weaponId;
    private byte gender = 0;
    private byte skin = 0;
    private int defFaceAcc;
    private final Map<Byte, Integer> totemEquips = new LinkedHashMap<>();
    private int beastEarId;
    private boolean changeEar;
    private boolean beastEar;
    private int ear;
    private byte mixHairBaseProb = 0;
    private int cashWeaponId;

    public static void encode(MaplePacketLittleEndianWriter p, AvatarLook avatarLook, boolean mega) {
        p.write(avatarLook.getGender());
        p.write(avatarLook.getSkin());
        p.writeInt(avatarLook.getFace());
        p.writeInt(avatarLook.getJob());
        p.writeByte(mega ? 0 : 1);
        p.writeInt(avatarLook.getHair());
        for (Entry<Byte, Integer> entry : avatarLook.getEquips().entrySet()) {
            p.write(entry.getKey());
            p.writeInt(entry.getValue());
        }
        p.writeByte(0xFF);
        for (Entry<Byte, Integer> entry : avatarLook.getMaskedEquips().entrySet()) {
            p.write(entry.getKey());
            p.writeInt(entry.getValue());
        }
        p.writeByte(0xFF);
        for (Entry<Byte, Integer> entry : avatarLook.getEquipMixColors().entrySet()) {
            p.write(entry.getKey());
            p.writeInt(entry.getValue());
        }
        p.writeByte(0xFF);
        for (Entry<Byte, Integer> entry : avatarLook.getTotemEquips().entrySet()) {
            p.write(entry.getKey());
            p.writeInt(entry.getValue());
        }
        p.writeByte(0xFF);
        p.writeInt(avatarLook.getCashWeaponId());
        p.writeInt(avatarLook.getWeaponId());
        p.writeInt(avatarLook.getShieldId());
        p.writeInt(avatarLook.getEar());
        p.writeInt(0);
        p.writeBool(avatarLook.isChangeEar());

        for (int pet : avatarLook.getPets()) {
            p.writeInt(pet);
        }

        if (JobConstants.hasDecorate(avatarLook.getJob())) {
            p.writeInt(avatarLook.getDefFaceAcc());
        } else if (JobConstants.is神之子(avatarLook.getJob())) {
            p.writeBool(avatarLook.isBeta());
        }

        if (JobConstants.is幻獸師(avatarLook.getJob())) {
            p.writeBool(avatarLook.isBeastEar());
            p.writeInt(avatarLook.getBeastEarId());
            p.writeBool(avatarLook.isBeastTail());
            p.writeInt(avatarLook.getBeastTailId());
        }
        p.write(avatarLook.getMixAddHairColor());
        p.write(avatarLook.getMixHairBaseProb());
        p.writeZeroBytes(5);
    }

    public static AvatarLook decode(MaplePacketReader p) {
        AvatarLook avatarLook = new AvatarLook();
        avatarLook.setGender(p.readByte());
        avatarLook.setSkin(p.readByte());
        int face = p.readInt();
        int mixEyeColor;
        if (face > 20000000) {
            mixEyeColor = face % 1000 / 100;
            avatarLook.setFace(face / 1000);
            avatarLook.setMixEyesColor((byte) mixEyeColor);
            avatarLook.setMixEyesPercent((byte) (face % 100));
        } else {
            avatarLook.setFace(face);
            avatarLook.setMixEyesColor((byte) -1);
        }

        avatarLook.setJob((short) p.readInt());
        p.readByte();
        avatarLook.setHair(p.readInt());

        for (byte i = p.readByte(); i != -1; i = p.readByte()) {
            avatarLook.getEquips().put(i, p.readInt());
        }

        for (byte i = p.readByte(); i != -1; i = p.readByte()) {
            avatarLook.getMaskedEquips().put(i, p.readInt());
        }

        for (byte i = p.readByte(); i != -1; i = p.readByte()) {
            avatarLook.getEquipMixColors().put(i, p.readInt());
        }

        for (byte i = p.readByte(); i != -1; i = p.readByte()) {
            avatarLook.getTotemEquips().put(i, p.readInt());
        }

        avatarLook.setCashWeaponId(p.readInt());
        avatarLook.setWeaponId(p.readInt());
        avatarLook.setShieldId(p.readInt());
        avatarLook.setEar(p.readInt());
        p.readInt();
        avatarLook.setChangeEar(p.readByte() > 0);

        for (int i = 0; i < 3; i++) {
            avatarLook.getPets()[i] = p.readInt();
        }

        if (JobConstants.hasDecorate(avatarLook.getJob())) {
            avatarLook.setDefFaceAcc(p.readInt());
        } else if (JobConstants.is神之子(avatarLook.getJob())) {
            avatarLook.setBeta(p.readByte() > 0);
        }

        if (JobConstants.is幻獸師(avatarLook.getJob())) {
            avatarLook.setBeastEar(p.readByte() > 0);
            avatarLook.setBeastEarId(p.readInt());
            avatarLook.setBeastTail(p.readByte() > 0);
            avatarLook.setBeastTailId(p.readInt());
        }

        avatarLook.setMixAddHairColor(p.readByte());
        avatarLook.setMixHairBaseProb(p.readByte());
        p.skip(5);
        return avatarLook;
    }

    public void encodeBuffer(MaplePacketLittleEndianWriter p) {
        int[] equipArr = new int[11];
        for (byte i = 0; i < equipArr.length; i++) {
            equipArr[i] = equips.getOrDefault(i, 0);
        }
        int visibleWeaponId = cashWeaponId != 0 ? cashWeaponId : weaponId;
        int weaponType = 0;
        for (MapleWeapon type : MapleWeapon.values()) {
            if (type.getWeaponType() == visibleWeaponId / 1000 % 1000) {
                break;
            }
            if (++weaponType > 36) {
                weaponType = 0;
                break;
            }
        }

        byte[] bytes = new byte[120];
        writeArrIndex(bytes, 0, (getSkin() & 0x3FF) << 1);
        writeArrIndex(bytes, 0, getGender() & 1);
        writeArrIndex(bytes, 1, ((face > 0 ? face % 1000 : -1) & 0x3FF) << 3);
        writeArrIndex(bytes, 2, (face / 1000 % 10 & 0xF) << 5);
        writeArrIndex(bytes, 3, hair / 10000 == 4 ? 2 : 0);
        writeArrIndex(bytes, 3, ((hair > 0 ? hair % 1000 : -1) & 0x3FF) << 2);
        writeArrIndex(bytes, 4, (hair / 1000 % 10 & 0xF) << 4);
        writeArrIndex(bytes, 5, (equipArr[1] > 0 ? equipArr[1] % 1000 : -1) & 0x3FF);
        writeArrIndex(bytes, 6, (equipArr[1] / 1000 % 10 & 7) << 2);
        writeArrIndex(bytes, 6, ((defFaceAcc > 0 ? defFaceAcc % 1000 : -1) & 0x3FF) << 5);
        writeArrIndex(bytes, 7, (defFaceAcc / 1000 % 10 & 3) << 7);
        writeArrIndex(bytes, 8, ((equipArr[3] > 0 ? equipArr[3] % 1000 : -1) & 0x3FF) << 1);
        writeArrIndex(bytes, 9, (equipArr[3] / 1000 % 10 & 3) << 3);
        writeArrIndex(bytes, 9, ((equipArr[4] > 0 ? equipArr[4] % 1000 : -1) & 0x3FF) << 5);
        writeArrIndex(bytes, 10, (equipArr[4] / 1000 % 10 & 3) << 7);
        writeArrIndex(bytes, 11, equipArr[5] / 10000 == 105 ? 2 : 0);
        writeArrIndex(bytes, 11, ((equipArr[5] > 0 ? equipArr[5] % 1000 : -1) & 0x3FF) << 2);
        writeArrIndex(bytes, 12, (equipArr[5] / 1000 % 10 & 0xF) << 4);
        writeArrIndex(bytes, 13, (equipArr[6] > 0 ? equipArr[6] % 1000 : -1) & 0x3FF);
        writeArrIndex(bytes, 14, (equipArr[6] / 1000 % 10 & 3) << 2);
        writeArrIndex(bytes, 14, ((equipArr[7] > 0 ? equipArr[7] % 1000 : -1) & 0x3FF) << 4);
        writeArrIndex(bytes, 15, (equipArr[7] / 1000 % 10 & 3) << 6);
        writeArrIndex(bytes, 16, (equipArr[8] > 0 ? equipArr[8] % 1000 : -1) & 0x3FF);
        writeArrIndex(bytes, 17, (equipArr[8] / 1000 % 10 & 3) << 2);
        writeArrIndex(bytes, 17, ((equipArr[9] > 0 ? equipArr[9] % 1000 : -1) & 0x3FF) << 4);
        writeArrIndex(bytes, 18, (equipArr[9] / 1000 % 10 & 3) << 6);
        writeArrIndex(bytes, 19, equipArr[10] > 0 ? equipArr[10] / 10000 == 109 ? 1 : 3 - (equipArr[10] / 10000 == 134 ? 1 : 0) : 0);
        writeArrIndex(bytes, 19, ((equipArr[10] > 0 ? equipArr[10] % 1000 : -1) & 0x3FF) << 2);
        writeArrIndex(bytes, 20, (equipArr[10] / 1000 % 10 & 0xF) << 4);
        writeArrIndex(bytes, 21, visibleWeaponId / 10000 == 170 ? 1 : 0);
        writeArrIndex(bytes, 21, ((visibleWeaponId > 0 ? visibleWeaponId % 1000 : -1) & 0x3FF) << 1);
        writeArrIndex(bytes, 22, (visibleWeaponId / 1000 % 10 & 3) << 3);
        writeArrIndex(bytes, 22, weaponType << 5);
        writeArrIndex(bytes, 23, (getMixBaseHairColor() & 0xF) << 5);
        writeArrIndex(bytes, 24, getMixAddHairColor() & 0xF);
        writeArrIndex(bytes, 24, (getMixHairBaseProb() & 0xF) << 5);
        writeArrIndex(bytes, 119, 15);
        p.write(bytes);
    }

    private void writeArrIndex(byte[] arr, int index, int value) {
        arr[index] |= (byte) (value & 0xFF);
        if (value > 0xFF && index < arr.length - 1) {
            arr[index + 1] |= (byte) (value >>> 8 & 0xFF);
        }
    }

    public int getFace() {
        return this.mixEyesColor > -1 ? this.face * 1000 + this.mixEyesColor * 100 + this.mixEyesPercent : this.face;
    }

    public boolean isBeta() {
        return beta;
    }

    public void setBeta(boolean beta) {
        this.beta = beta;
    }

    public boolean isBeastTail() {
        return beastTail;
    }

    public void setBeastTail(boolean beastTail) {
        this.beastTail = beastTail;
    }

    public int getShieldId() {
        return shieldId;
    }

    public void setShieldId(int shieldId) {
        this.shieldId = shieldId;
    }

    public int getBeastTailId() {
        return beastTailId;
    }

    public void setBeastTailId(int beastTailId) {
        this.beastTailId = beastTailId;
    }

    public int getHair() {
        return hair;
    }

    public void setHair(int hair) {
        this.hair = hair;
    }

    public byte getMixAddHairColor() {
        return mixAddHairColor;
    }

    public void setMixAddHairColor(byte mixAddHairColor) {
        this.mixAddHairColor = mixAddHairColor;
    }

    public byte getMixEyesPercent() {
        return mixEyesPercent;
    }

    public void setMixEyesPercent(byte mixEyesPercent) {
        this.mixEyesPercent = mixEyesPercent;
    }

    public Map<Byte, Integer> getEquips() {
        return equips;
    }

    public Map<Byte, Integer> getMaskedEquips() {
        return maskedEquips;
    }

    public byte getMixEyesColor() {
        return mixEyesColor;
    }

    public void setMixEyesColor(byte mixEyesColor) {
        this.mixEyesColor = mixEyesColor;
    }

    public void setFace(int face) {
        this.face = face;
    }

    public short getJob() {
        return job;
    }

    public void setJob(short job) {
        this.job = job;
    }

    public int[] getPets() {
        return pets;
    }

    public Map<Byte, Integer> getEquipMixColors() {
        return equipMixColors;
    }

    public byte getMixBaseHairColor() {
        return mixBaseHairColor;
    }

    public void setMixBaseHairColor(byte mixBaseHairColor) {
        this.mixBaseHairColor = mixBaseHairColor;
    }

    public int getWeaponId() {
        return weaponId;
    }

    public void setWeaponId(int weaponId) {
        this.weaponId = weaponId;
    }

    public byte getGender() {
        return gender;
    }

    public void setGender(byte gender) {
        this.gender = gender;
    }

    public byte getSkin() {
        return skin;
    }

    public void setSkin(byte skin) {
        this.skin = skin;
    }

    public int getDefFaceAcc() {
        return defFaceAcc;
    }

    public void setDefFaceAcc(int defFaceAcc) {
        this.defFaceAcc = defFaceAcc;
    }

    public Map<Byte, Integer> getTotemEquips() {
        return totemEquips;
    }

    public int getBeastEarId() {
        return beastEarId;
    }

    public void setBeastEarId(int beastEarId) {
        this.beastEarId = beastEarId;
    }

    public boolean isChangeEar() {
        return changeEar;
    }

    public void setChangeEar(boolean changeEar) {
        this.changeEar = changeEar;
    }

    public boolean isBeastEar() {
        return beastEar;
    }

    public void setBeastEar(boolean beastEar) {
        this.beastEar = beastEar;
    }

    public int getEar() {
        return ear;
    }

    public void setEar(int ear) {
        this.ear = ear;
    }

    public byte getMixHairBaseProb() {
        return mixHairBaseProb;
    }

    public void setMixHairBaseProb(byte mixHairBaseProb) {
        this.mixHairBaseProb = mixHairBaseProb;
    }

    public int getCashWeaponId() {
        return cashWeaponId;
    }

    public void setCashWeaponId(int cashWeaponId) {
        this.cashWeaponId = cashWeaponId;
    }
}
