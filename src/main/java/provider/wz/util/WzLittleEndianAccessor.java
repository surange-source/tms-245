package provider.wz.util;

import provider.wz.WzHeader;
import tools.data.ByteStream;
import tools.data.MaplePacketReader;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

public class WzLittleEndianAccessor extends MaplePacketReader {

    public int Hash;
    public WzHeader Header;
    private static WzMapleVersion WzFileVersion = WzMapleVersion.CLASSIC;

    public static enum WzMapleVersion {
        GMS, EMS, BMS, CLASSIC, GENERATE, GETFROMZLZ
    }

    private static byte[] encKey = null;

    static {
        byte[] iv;
        switch (WzFileVersion) {
            case EMS:
                // WZ_MSEAIV
                iv = new byte[]{(byte) 0xB9, (byte) 0x7D, (byte) 0x63, (byte) 0xE9, (byte) 0xB9, (byte) 0x7D, (byte) 0x63,
                    (byte) 0xE9, (byte) 0xB9, (byte) 0x7D, (byte) 0x63, (byte) 0xE9, (byte) 0xB9, (byte) 0x7D,
                    (byte) 0x63, (byte) 0xE9,};
                break;
            case GMS:
                // WZ_GMSIV
                iv = new byte[]{(byte) 0x4D, (byte) 0x23, (byte) 0xC7, (byte) 0x2B, (byte) 0x4D, (byte) 0x23, (byte) 0xC7,
                    (byte) 0x2B, (byte) 0x4D, (byte) 0x23, (byte) 0xC7, (byte) 0x2B, (byte) 0x4D, (byte) 0x23,
                    (byte) 0xC7, (byte) 0x2B,};
                break;
            case BMS:
            case CLASSIC:
            default:
                iv = null;
                break;
        }
        if (iv != null) {
            encKey = new byte[0xFFFF];
            byte[] key = new byte[]{(byte) 0x13, 0x00, 0x00, 0x00, (byte) 0x08, 0x00, 0x00, 0x00, (byte) 0x06, 0x00,
                0x00, 0x00, (byte) 0xB4, 0x00, 0x00, 0x00, (byte) 0x1B, 0x00, 0x00, 0x00, (byte) 0x0F, 0x00, 0x00,
                0x00, (byte) 0x33, 0x00, 0x00, 0x00, (byte) 0x52, 0x00, 0x00, 0x00};

            Cipher cipher = null;
            SecretKeySpec skeySpec = new SecretKeySpec(key, "AES");
            try {
                cipher = Cipher.getInstance("AES");
                cipher.init(Cipher.ENCRYPT_MODE, skeySpec);
            } catch (NoSuchAlgorithmException | NoSuchPaddingException | InvalidKeyException e) {
                System.err.println("啟動加密計算工具錯誤(讀取WZ時):" + e);
            }

            for (int i = 0; i < (0xFFFF / 16); i++) {
                try {
                    iv = cipher.doFinal(iv);
                } catch (IllegalBlockSizeException | BadPaddingException e) {
                }
                System.arraycopy(iv, 0, encKey, (i * 16), 16);
            }

            try {
                iv = cipher.doFinal(iv);
            } catch (IllegalBlockSizeException | BadPaddingException e) {
            }

            System.arraycopy(iv, 0, encKey, 0xFFF0, 15);
        }
    }

    public WzLittleEndianAccessor(ByteStream bs) {
        super(bs);
    }

    public String readStringAtOffset(long Offset) {
        return readStringAtOffset(Offset, false);
    }

    public String readStringAtOffset(long Offset, boolean readByte) {
        long CurrentOffset = getPosition();
        seek(Offset);
        if (readByte) {
            readByte();
        }
        String ReturnString = readString();
        seek(CurrentOffset);
        return ReturnString;
    }

    private String readString() {
        byte smallLength = readByte();

        if (smallLength == 0x00) {
            return "";
        }

        int length;
        StringBuilder retString = new StringBuilder();
        if (smallLength > 0) { // Unicode
            int mask = 0xAAAA;
            if (smallLength == Byte.MAX_VALUE) {
                length = readInt();
            } else {
                length = (int) smallLength;
            }
            if (length <= 0) {
                return "";
            }

            for (int i = 0; i < length; i++) {
                short encryptedChar = readShort();
                encryptedChar ^= mask;
                encryptedChar ^= (short) (((encKey == null ? 0 : encKey[i * 2 + 1]) << 8) + (encKey == null ? 0 : encKey[i * 2]));
                retString.append((char) encryptedChar);
                mask++;
            }
        } else { // ASCII
            byte mask = (byte) 0xAA;
            if (smallLength == Byte.MIN_VALUE) {
                length = readInt();
            } else {
                length = -smallLength;
            }
            if (length < 0) {
                return "";
            }

            for (int i = 0; i < length; i++) {
                byte encryptedChar = readByte();
                encryptedChar ^= mask;
                encryptedChar ^= (byte) (encKey == null ? 0 : encKey[i]);
                retString.append((char) encryptedChar);
                mask++;
            }
        }
        return retString.toString();
    }

    public int readCompressedInt() {
        byte sb = readByte();
        if (sb == Byte.MIN_VALUE) {
            return readInt();
        }
        return ((int) sb);
    }

    public long readLongValue() {
        byte b = readByte();
        if (b == Byte.MIN_VALUE) {
            return readLong();
        }
        return ((long) b);
    }

    public float readFloatValue() {
        byte b = readByte();
        if (b == Byte.MIN_VALUE) {
            return readFloat();
        }
        return 0.0f;
    }

    public long readOffset() {
        long offset = getPosition();
        offset = (offset - Header.FStart) ^ 0xFFFFFFFF;
        offset *= Hash;
        offset -= 0x581C3F6D;
        int distance = (int)offset & 0x1F;
        offset = (offset << distance) | (offset >> (32 - distance));
        long encryptedOffset = readUInt();
        offset ^= encryptedOffset;
        offset += Header.FStart * 2;
        return offset;
    }

    public String readStringBlock(long offset) {
        byte b = readByte();
        switch (b) {
            case 0x00:
            case 0x03:
            case 0x04:
            case 0x73:
                return readString();
            case 0x01:
            case 0x02:
            case 0x1B:
                return readStringAtOffset(readInt() + offset);
            default:
                throw new RuntimeException("Unknown extended image identifier: " + b + " at offset " + (getPosition() - offset));
        }
    }
}
