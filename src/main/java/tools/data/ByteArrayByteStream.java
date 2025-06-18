package tools.data;

import tools.HexTool;

import java.io.IOException;

/**
 * Provides for an abstraction layer for an array of bytes.
 *
 * @author Frz
 * @version 1.0
 * @since Revision 326
 */
public final class ByteArrayByteStream implements ByteStream {

    private final byte[] arr;
    private int pos = 0;
    private long bytesRead = 0;

    /**
     * Class constructor.
     *
     * @param arr Array of bytes to wrap the stream around.
     */
    public ByteArrayByteStream(byte[] arr) {
        this.arr = arr;
    }

    /**
     * Gets the current position of the stream.
     *
     * @return The current position of the stream.
     * @see ByteArrayByteStream#getPosition()
     */
    public long getPosition() {
        return pos;
    }

    /**
     * Seeks the pointer the the specified position.
     *
     * @param offset The position you wish to seek to.
     * @see ByteArrayByteStream#seek(long)
     */
    public void seek(long offset) throws IOException {
        pos = (int) offset;
    }

    /**
     * Returns the numbers of bytes read from the stream.
     *
     * @return The number of bytes read.
     */
    public long getBytesRead() {
        return bytesRead;
    }

    /**
     * Reads a byte from the current position.
     *
     * @return The byte as an integer.
     */
    public int readByte() {
        try {
            bytesRead++;
            return (arr[pos++]) & 0xFF;
        } catch (ArrayIndexOutOfBoundsException e) {
            throw new PacketReadException("讀取封包出錯：" + toString(true), e);
        }
    }

    /**
     * Returns the current stream as a hexadecimal string of values. Shows the
     * entire stream, and the remaining data at the current position.
     *
     * @return The current stream as a string.
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return toString(false);
    }

    public String toString(boolean b) {
        String nows = "";
        if (arr.length - pos > 0) {
            byte[] now = new byte[arr.length - pos];
            System.arraycopy(arr, pos, now, 0, arr.length - pos);
            nows = HexTool.toString(now);
        }
        StringBuilder ret = new StringBuilder();
        if (b) {
            ret.append("\r\n所有: ");
            ret.append(HexTool.toString(arr));
            ret.append("\r\n現在: ");
            ret.append(nows);
            return ret.toString();
        } else {
            ret.append("\r\n封包: ").append(nows);
            return ret.toString();
        }
    }

    /**
     * Returns the number of bytes available from the stream.
     *
     * @return Number of bytes available as a long integer.
     */
    public long available() {
        return arr.length - pos;
    }

    private static class PacketReadException extends RuntimeException {

        PacketReadException(String s, Exception e) {
            super(s, e);
        }
    }
}
