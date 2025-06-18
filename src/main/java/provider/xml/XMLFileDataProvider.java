package provider.xml;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import provider.MapleData;
import provider.MapleDataDirectoryEntry;
import provider.MapleDataFileEntry;
import provider.MapleDataProvider;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class XMLFileDataProvider implements MapleDataProvider {

    private static final Logger log = LogManager.getLogger();
    private final File root;
    private final MapleDataDirectoryEntry rootForNavigation;
    private List<XMLFileDataProvider> subXmlFiles;
    private String subStr;

    public XMLFileDataProvider(File fileIn) {
        this(fileIn, "");
    }

    public XMLFileDataProvider(File fileIn, String subStr) {
        root = fileIn;
        rootForNavigation = new MapleDataDirectoryEntry(fileIn.getName(), null);
        this.subStr = subStr;
        fillMapleDataEntitys(root, rootForNavigation);

        subXmlFiles = new ArrayList<>();
        if (subStr.isEmpty()) {
            for (File file : fileIn.getParentFile().listFiles()) {
                if (!file.isDirectory() || file.getPath().equalsIgnoreCase(fileIn.getPath())) {
                    continue;
                }
                if (file.getName().replaceAll("\\d+","").toLowerCase().equals(fileIn.getName().toLowerCase())) {
                    String sub = file.getName();
                    sub = sub.substring(0, sub.lastIndexOf(".")).replace(fileIn.getName().substring(0, fileIn.getName().lastIndexOf(".")), "");
                    XMLFileDataProvider data = new XMLFileDataProvider(file, sub);
                    subXmlFiles.add(data);
                    rootForNavigation.addAll(data.getRoot());
                }
            }
        }
    }

    private void fillMapleDataEntitys(File lroot, MapleDataDirectoryEntry wzdir) {
        for (File file : lroot.listFiles()) {
            String fileName = file.getName();
            if (file.isDirectory() && !fileName.endsWith(".img")) {
                MapleDataDirectoryEntry newDir = new MapleDataDirectoryEntry(fileName, wzdir);
                wzdir.addDirectory(newDir);
                fillMapleDataEntitys(file, newDir);
            } else if (fileName.endsWith(".xml")) { // get the real size here?
                wzdir.addFile(new MapleDataFileEntry(fileName.substring(0, fileName.length() - 4), wzdir, subStr));
            }
        }
    }

    public MapleData getData(String path) {
        File dataFile = new File(root, path + ".xml");
        File imageDataDir = new File(root, path);
        /*
         * if (!dataFile.exists()) { throw new RuntimeException("Datafile " +
         * path + " does not exist in " + root.getAbsolutePath());
         * }
         */
        MapleData domMapleData = null;
        if (dataFile.exists()) {
            FileInputStream fis;
            try {
                fis = new FileInputStream(dataFile);
            } catch (FileNotFoundException e) {
                log.error("Datafile " + path + " does not exist in " + root.getAbsolutePath(), e);
                throw new RuntimeException("Datafile " + path + " does not exist in " + root.getAbsolutePath());
            }
            try {
                domMapleData = new XMLDomMapleData(fis, imageDataDir.getParentFile());
            } finally {
                try {
                    fis.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }
        if (domMapleData == null) {
            for (XMLFileDataProvider xml : subXmlFiles) {
                domMapleData = xml.getData(path);
                if (domMapleData != null) {
                    break;
                }
            }
        }
        return domMapleData;
    }

    public MapleDataDirectoryEntry getRoot() {
        return rootForNavigation;
    }
}
