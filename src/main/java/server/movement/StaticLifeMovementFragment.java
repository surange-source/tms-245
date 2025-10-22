package server.movement;

import tools.types.Pair;
import tools.data.MaplePacketLittleEndianWriter;

import java.util.ArrayList;
import java.util.List;


public final class StaticLifeMovementFragment implements LifeMovementFragment {

    private final byte type;
    private final List<Pair<Number, Integer>> cache = new ArrayList<>();

    public StaticLifeMovementFragment(byte type) {
        this.type = type;
    }

    public void add(Number value, int len) {
        cache.add(new Pair<>(value, len));
    }

    @Override
    public void serialize(MaplePacketLittleEndianWriter mplew) {
        mplew.write(type);
        for (Pair<Number, Integer> pair : cache) {
            switch (pair.getRight()) {
                case 1:
                    mplew.write(pair.getLeft().byteValue());
                    break;
                case 2:
                    mplew.writeShort(pair.getLeft().shortValue());
                    break;
                case 4:
                    mplew.writeInt(pair.getLeft().intValue());
                    break;
                case 8:
                    mplew.writeLong(pair.getLeft().longValue());
                    break;
                default:
                    throw new IllegalArgumentException("invalid movement");
            }
        }
    }
}
