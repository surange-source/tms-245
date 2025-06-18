package configs;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import tools.config.Property;

import java.util.ArrayList;
import java.util.List;

public class OpcodeConfig {

    private static final Logger log = LogManager.getLogger();
    private static final List<String> blockops = new ArrayList<>();

    @Property(key = "sendops", defaultValue = "")
    public static String sendops;
    @Property(key = "recvops", defaultValue = "")
    public static String recvops;

    public static void load() {
        blockops.clear();

        for (String s : sendops.split(",")) {
            if (s.isEmpty()) {
                continue;
            }
            blockops.add("S_" + s);
        }

        for (String s : recvops.split(",")) {
            if (s.isEmpty()) {
                continue;
            }
            blockops.add("R_" + s);
        }
    }

    public static boolean isblock(String ops, boolean issend) {
        return blockops.contains(issend ? "S_" + ops : "R_" + ops);
    }
}
