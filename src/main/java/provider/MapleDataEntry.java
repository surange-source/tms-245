package provider;

/**
 * @author Matze
 */
public class MapleDataEntry implements MapleDataEntity {

    private final String name;
    private final int size;
    private final int checksum;
    private final MapleDataEntity parent;
    private long offset;

    MapleDataEntry(String name, int size, int checksum, long offset, MapleDataEntity parent) {
        super();
        this.name = name;
        this.size = size;
        this.checksum = checksum;
        this.offset = offset;
        this.parent = parent;
    }

    @Override
    public String getName() {
        return name;
    }

    public int getSize() {
        return size;
    }

    public int getChecksum() {
        return checksum;
    }

    public long getOffset() {
        return offset;
    }

    @Override
    public MapleDataEntity getParent() {
        return parent;
    }
}
