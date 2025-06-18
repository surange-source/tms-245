package tools.data;

import constants.ServerConstants;
import handling.opcode.SendPacketOpcode;
import tools.HexTool;

import java.awt.Point;
import java.awt.Rectangle;
import java.io.*;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;

/**
 * Writes a maplestory-packet little-endian stream of bytes.
 */
public final class MaplePacketLittleEndianWriter {

    private final ByteArrayOutputStream baos;
    private static final Charset CHARSET = ServerConstants.MapleType.getByType(ServerConstants.MapleRegion).getCharset();
    private static final Map<String, byte[]> HexMap = new HashMap<>();

    /**
     * Constructor - initializes this stream with a default size.
     */
    public MaplePacketLittleEndianWriter() {
        this(32);
    }

    /**
     * Constructor - initializes this stream with size
     * <code>size</code>.
     *
     * @param size The size of the underlying stream.
     */
    public MaplePacketLittleEndianWriter(int size) {
        this.baos = new ByteArrayOutputStream(size);
    }

    public MaplePacketLittleEndianWriter(SendPacketOpcode opcode) {
        this.baos = new ByteArrayOutputStream(32);
        writeShort(opcode.getValue());
    }

    /**
     * Write the number of zero bytes
     */
    public final void writeZeroBytes(final int i) {
        for (int x = 0; x < i; x++) {
            baos.write((byte) 0);
        }
    }

    /**
     * Write an array of bytes to the stream.
     *
     * @param b The bytes to write.
     */
    public final void write(final byte[] b) {
        for (byte aB : b) {
            baos.write(aB);
        }
    }

    /**
     * Write a byte to the stream.
     *
     * @param b The byte to write.
     */
    public final void write(final byte b) {
        baos.write(b);
    }

    /**
     * Write a byte in integer form to the sequence.
     *
     * @param b The byte as an Integer to write.
     */
    public final void write(final int b) {
        baos.write((byte) b);
    }


    /**
     * 以Boolean類型來寫入一個Byte
     *
     * @param b The byte as an Boolean to write.
     */
    public final void write(final boolean b) {
        baos.write((byte) (b ? 1 : 0));
    }

    /**
     * Write a short integer to the stream.
     *
     * @param i The short integer to write.
     */
    public final void writeShort(final short i) {
        baos.write((byte) (i & 0xFF));
        baos.write((byte) ((i >>> 8) & 0xFF));
    }

    /**
     * Write a int integer to the sequence.
     *
     * @param i The int integer to write.
     */
    public final void writeShort(final int i) {
        baos.write((byte) (i & 0xFF));
        baos.write((byte) ((i >>> 8) & 0xFF));
    }

    /**
     * Writes an integer to the stream.
     *
     * @param i The integer to write.
     */
    public final void writeInt(final int i) {
        baos.write((byte) (i & 0xFF));
        baos.write((byte) ((i >>> 8) & 0xFF));
        baos.write((byte) ((i >>> 16) & 0xFF));
        baos.write((byte) ((i >>> 24) & 0xFF));
    }

    public final void writeInt(final long n) {
        baos.write((byte)(n & 0xFFL));
        baos.write((byte)(n >>> 8 & 0xFFL));
        baos.write((byte)(n >>> 16 & 0xFFL));
        baos.write((byte)(n >>> 24 & 0xFFL));
    }

    public final void writeReversedInt(final long l) {
        baos.write((byte) ((l >>> 32) & 0xFF));
        baos.write((byte) ((l >>> 40) & 0xFF));
        baos.write((byte) ((l >>> 48) & 0xFF));
        baos.write((byte) ((l >>> 56) & 0xFF));
    }

    /**
     * Writes an CHARSET string the the stream.
     *
     * @param s The CHARSET string to write.
     */
    public final void writeAsciiString(final String s) {
        write(s.getBytes(CHARSET));
    }

    /**
     * Writes a null-terminated CHARSET string to the sequence.
     *
     * @param s   The CHARSET string to write.
     * @param max
     */
    public final void writeAsciiString(final String s, final int max) {
        byte[] bytes = s.getBytes(CHARSET);
//        write(bytes);
        for (int i = 0, len = bytes.length; i < max; i++) {
            if (i < len) {
                write(bytes[i]);
            } else {
                write(0);
            }
        }
    }

    /**
     * Writes a Maple Name CHARSET string to the sequence.
     *
     * @param s The CHARSET string to write.
     */
    public final void writeMapleNameString(String s) {
        if (s.getBytes().length > 13) {
            s = s.substring(0, 13);
        }
        writeAsciiString(s);
        for (int x = s.getBytes().length; x < 13; x++) {
            write(0);
        }
    }

    /**
     * Writes a maple-convention CHARSET string to the stream.
     *
     * @param s The CHARSET string to use maple-convention to write.
     */
    public final void writeMapleAsciiString(final String s) {
        if (s == null) {
            writeShort(0);
            return;
        }
        writeShort((short) s.getBytes(CHARSET).length);
        writeAsciiString(s);
    }

    public final void writeMapleAsciiString(String s, final int max) {
        writeShort((short) max);
        if (s.getBytes().length > max) {
            s = s.substring(0, max);
        }
        writeAsciiString(s);
        for (int x = s.getBytes(CHARSET).length; x < max; x++) {
            write(0);
        }
    }

    public void writeMapleAsciiString(String[] arrstring) {
        int n2 = 0;
        for (String string : arrstring) {
            if (string != null) {
                n2 += string.getBytes(CHARSET).length;
            }
        }
        if (n2 < 1) {
            writeShort(0);
            return;
        }
        writeShort((short) (n2 + arrstring.length - 1));
        for (int i = 0; i < arrstring.length; ++i) {
            if (arrstring[i] != null) {
                writeAsciiString(arrstring[i]);
            }
            if (i < arrstring.length - 1) {
                write(0);
            }
        }
    }

    /**
     * Writes a 2D 4 byte position information
     *
     * @param s The Point position to write.
     */
    public final void writePos(final Point s) {
        writeShort(s.x);
        writeShort(s.y);
    }

    /**
     * Writes a 2D 8 byte position information
     *
     * @param s The Point position to write.
     */
    public void writePosInt(Point s) {
        writeInt(s.x);
        writeInt(s.y);
    }

    /**
     * Writes a 4 int 16 byte Rectangle information
     *
     * @param s The Rectangle to write.
     */
    public final void writeRect(final Rectangle s) {
        writeInt(s.x);
        writeInt(s.y);
        writeInt(s.x + s.width);
        writeInt(s.y + s.height);
    }

    /**
     * Write a long integer to the stream.
     *
     * @param l The long integer to write.
     */
    public final void writeLong(final long l) {
        writeInt(l);
        writeReversedInt(l);
    }

    public final void writeReversedLong(final long l) {
        writeReversedInt(l);
        writeInt(l);
    }

    /**
     * 寫入布爾值 true ? 1 : 0
     *
     * @param b The boolean to write.
     */
    public final void writeBool(final boolean b) {
        write(b ? 1 : 0);
    }

    /**
     * 寫入反向布爾值 true ? 0 : 1
     *
     * @param b The boolean to write.
     */
    public final void writeReversedBool(final boolean b) {
        write(b ? 0 : 1);
    }

    public final void writeDouble(final double b) {
        writeLong(Double.doubleToLongBits(b));
    }

    public final void writeHexString(final String s) {
        write(HexMap.computeIfAbsent(s, k -> HexTool.getByteArrayFromHexString(s)));
    }

    public void writeOpcode(WritableIntValueHolder op) {
        writeShort(op.getValue());
    }

    public final void writeFile(final File file) {
        byte[] bytes = new byte[0];
        if (file != null && file.exists()) {
            long length = file.length();
            if (length > Integer.MAX_VALUE) {
                System.err.println("檔案太大");
            } else {
                bytes = new byte[(int) length];
                int offset = 0;
                int numRead = 0;
                try (InputStream is = new FileInputStream(file)) {
                    while ((offset < bytes.length) && ((numRead = is.read(bytes, offset, bytes.length - offset)) >= 0)) {
                        offset += numRead;
                    }
                } catch (IOException e) {
                    System.err.println("讀取檔案失敗:" + e);
                    bytes = new byte[0];
                }
                if (offset < bytes.length) {
                    System.err.println("無法完整讀取檔案:" + file.getName());
                    bytes = new byte[0];
                }
            }
        }
        writeInt(bytes.length);
        write(bytes);
    }

    public final void writeZigZagVarints(int b) {
        b = (b << 1) ^ (b >> 31);
        writeVarints(b);
    }

    public final void writeVarints(int b) {
        while (true) {
            if ((b & (~0x7F)) == 0) {
                write(b);
                break;
            } else {
                write((b & 0x7F) | 0x80);
                b >>= 7;
            }
        }
    }

    public final void writeReversedVarints(int b) {
        while (true) {
            if ((b & (~0x7F)) == 0) {
                write(b << 1);
                break;
            } else {
                write(((b & 0x7F) << 1) | 1);
                b >>= 7;
            }
        }
    }

    /**
     * Gets a
     * <code>MaplePacket</code> instance representing this sequence of bytes.
     *
     * @return A <code>MaplePacket</code> with the bytes in this stream.
     */
    public byte[] getPacket() {
        return baos.toByteArray();
    }

    /**
     * Changes this packet into a human-readable hexadecimal stream of bytes.
     *
     * @return This packet as hex digits.
     */
    @Override
    public String toString() {
        return HexTool.toString(baos.toByteArray());
    }

    public void writeByte(int i) {
        write(i);
    }
}
