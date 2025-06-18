package provider.nx;

import provider.MapleData;
import provider.MapleDataEntity;
import provider.MapleDataType;
import provider.nx.util.NxLittleEndianAccessor;
import tools.data.BufferedRandomAccessFile;
import tools.data.RandomAccessByteStream;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

public class NXNode implements MapleData {

    public static final int NODE_SIZE = 20;

    private NxIMGFile file;
    public NXHeader Header;
    private String name;
    private MapleDataType type;
    private List<MapleData> children = null;
    private Object data;
    private long nodeOffset;
    private final String nxFile;
    private final String parent;

    public NXNode(NxIMGFile file, String nxFile, String parent, long nodeOffset, NXHeader Header) {
        this.file = file;
        this.nxFile = nxFile;
        this.parent = parent;
        this.nodeOffset = nodeOffset;
        this.Header = Header;
    }

    @Override
    public MapleData getChildByPath(String path) {
        String[] segments = path.split("/");
        if (segments[0].equals("..")) {
            return ((MapleData) getParent()).getChildByPath(path.substring(path.indexOf("/") + 1));
        }
        MapleData ret = this;
        for (String segment : segments) {
            boolean foundChild = false;
            for (MapleData child : ret.getChildren()) {
                if (child.getName().equals(segment)) {
                    ret = child;
                    foundChild = true;
                    break;
                }
            }
            if (!foundChild) {
                return null;
            }
        }
        return ret;
    }

    @Override
    public List<MapleData> getChildren() {
        if (children == null) {
            children = new ArrayList<>();
            try (BufferedRandomAccessFile raf = new BufferedRandomAccessFile(nxFile, "r")) {
                NxLittleEndianAccessor nlea = new NxLittleEndianAccessor(new RandomAccessByteStream(raf), Header);
                parseEntry(nlea, true);
                finish();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return Collections.unmodifiableList(children);
    }

    public void setData(Object data) {
        this.data = data;
    }

    @Override
    public Object getData() {
        return data;
    }

    @Override
    public MapleDataType getType() {
        return type;
    }

    public void setType(MapleDataType type) {
        this.type = type;
    }

    @Override
    public Iterator<MapleData> iterator() {
        return getChildren().iterator();
    }

    @Override
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void addChild(NXNode entry) {
        children.add(entry);
    }

    @Override
    public MapleDataEntity getParent() {
        if (parent.equals(file.getRoot().getName())) {
            return file.getRoot();
        } else if (!parent.isEmpty()) {
            return file.getRoot().getChildByPath(parent);
        } else {
            return file.getParent();
        }
    }

    private void parseEntry(NxLittleEndianAccessor nlea, boolean getChild) {
        nlea.seek(nodeOffset);
        setName(file.getTables().getString(nlea, nlea.readUInt()));
        int fCID = nlea.readInt();
        short cCount = nlea.readShort();
        short type = nlea.readShort();
        switch (type) {
            case 0:
                if (fCID <= 0) {
                    setType(MapleDataType.NONE);
                } else {
                    setType(MapleDataType.EXTENDED);
                }
                break;
            case 1:
                long number = nlea.readLong();
                if (number >= Short.MIN_VALUE && number <= Short.MAX_VALUE) {
                    setType(MapleDataType.SHORT);
                    setData((short) number);
                } else if (number >= Integer.MIN_VALUE && number <= Integer.MAX_VALUE) {
                    setType(MapleDataType.INT);
                    setData((int) number);
                } else {
                    setType(MapleDataType.LONG);
                    setData(number);
                }
                break;
            case 2:
                number = nlea.readLong();
                double dNumber = Double.longBitsToDouble(number);
                if (dNumber >= Float.MIN_VALUE && dNumber <= Float.MAX_VALUE) {
                    setType(MapleDataType.FLOAT);
                    setData((float) dNumber);
                } else {
                    setType(MapleDataType.DOUBLE);
                    setData(dNumber);
                }
                break;
            case 3:
                setType(MapleDataType.STRING);
                setData(file.getTables().getString(nlea, (int) nlea.readLong()));
                break;
            case 4:
                setType(MapleDataType.VECTOR);
                setData(nlea.readPosInt());
                break;
            case 5:
                setType(MapleDataType.CANVAS);
                break;
            case 6:
                setType(MapleDataType.SOUND);
                break;
        }
        if ((fCID > 0 || cCount > 0) && getChild) {
            for (int i = 0; i < cCount; i++) {
                long offset = nlea.Header.NodeOffset + (fCID + i) * 20;
                NXNode cNode = new NXNode(file, nxFile, parent + (parent.isEmpty() ? "" : "/") + name, offset, Header);
                cNode.parseEntry(nlea, false);
                addChild(cNode);
            }
        }
    }

    private void finish() {
        ((ArrayList<MapleData>) children).trimToSize();
    }
}
