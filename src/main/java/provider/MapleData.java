package provider;

import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.awt.*;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public interface MapleData extends MapleDataEntity, Iterable<MapleData> {

    public MapleData getChildByPath(String path);

    public List<MapleData> getChildren();

    public Object getData();

    public MapleDataType getType();
}
