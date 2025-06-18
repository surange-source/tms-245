package constants.enums;

public enum ZeroMask {
    EYE_ACCESSORY((short)1, (short)3),
    HAT((short)2, (short)1),
    FOREHEAD((short)4, (short)2),
    EARRING((short)8, (short)4),
    CAPE((short)16, (short)9),
    TOP((short)32, (short)5),
    GLOVE((short)64, (short)8),
    WEAPON((short)128, (short)11),
    BOTTOM((short)256, (short)6),
    SHOE((short)512, (short)7),
    RING3((short)1024, (short)12),
    RING2((short)2048, (short)13),
    RING1((short)4096, (short)15);

    private final short value;
    private final short type;

    ZeroMask(short value, short type) {
        this.value = value;
        this.type = type;
    }

    public short getValue() {
        return value;
    }

    public static ZeroMask getByType(final int n) {
        ZeroMask[] values;
        for (int length = (values = values()).length, i = 0; i < length; ++i) {
            final ZeroMask j126;
            if ((j126 = values[i]).type == n) {
                return j126;
            }
        }
        return null;
    }

    public final boolean check(int n) {
        return (n & this.value) != 0;
    }
}
