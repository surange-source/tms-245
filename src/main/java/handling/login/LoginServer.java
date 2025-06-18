package handling.login;

import configs.ServerConfig;
import handling.ServerType;
import handling.login.handler.MapleBalloon;
import handling.netty.ServerConnection;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import provider.MapleData;
import provider.MapleDataProviderFactory;
import tools.Pair;
import tools.Quadruple;
import tools.Randomizer;

import java.util.*;

public class LoginServer {

    private static final Logger log = LogManager.getLogger(LoginServer.class);
    private static final List<MapleBalloon> lBalloon = new ArrayList<>();
    private static final HashMap<Integer, Quadruple<String, String, Integer, String>> loginAuth = new HashMap<>();
    private static final HashMap<String, Pair<String, Integer>> loginAuthKey = new HashMap<>();
    private static short port;
    private static ServerConnection init;
    private static Map<Integer, Integer> load = new HashMap<>();
    private static int usersOn = 0;
    private static boolean finishedShutdown = true;
    private static Map<String, List<Integer>> worldSelectBGs = new HashMap<>();

    public static void putLoginAuth(int chrid, String ip, String tempIp, int channel, String mac) {
        loginAuth.put(chrid, new Quadruple<>(ip, tempIp, channel, mac));
    }

    public static Quadruple<String, String, Integer, String> getLoginAuth(int chrid) {
        return loginAuth.remove(chrid);
    }

    public static void pubLoginAuthKey(String key, String account, int channel) {
        loginAuthKey.put(key, new Pair<>(account, channel));
    }

    public static Pair<String, Integer> getLoginAuthKey(String account, boolean remove) {
        if (remove) {
            return loginAuthKey.remove(account);
        } else {
            return loginAuthKey.get(account);
        }
    }

    public static void addChannel(int channel) {
        load.put(channel, 0);
    }

    public static void removeChannel(int channel) {
        load.remove(channel);
    }

    public static void run_startup_configurations() {
        MapleData data = MapleDataProviderFactory.getMap().getData("Obj/login.img").getChildByPath("WorldSelect");
        for (MapleData dat : data.getChildren()) {
            if (dat == null || dat.getChildren().size() <= 0) {
                continue;
            }
            List<Integer> ls = new LinkedList<>();
            for (MapleData da : dat.getChildren()) {
                try {
                    ls.add(Integer.parseInt(da.getName()));
                } catch (Exception e) {
                }
            }
            if (ls.size() > 0) {
                worldSelectBGs.put(dat.getName(), ls);
            }
        }
        port = ServerConfig.LOGIN_PORT;
        try {
            init = new ServerConnection(port, -1, -1, ServerType.LoginServer);
            init.run();
            log.info("登入伺服器綁定連接埠: " + port + ".");
        } catch (Exception e) {
            throw new RuntimeException("登入伺服器綁定連接埠: " + port + " 失敗", e);
        }
    }

    public static void shutdown() {
        if (finishedShutdown) {
            return;
        }
        log.info("正在關閉登入伺服器...");
        init.close();
        finishedShutdown = true; //nothing. lol
    }

    public static String getServerName() {
        return ServerConfig.LOGIN_SERVERNAME;
    }

    public static String getTrueServerName() {
        return ServerConfig.LOGIN_SERVERNAME.substring(0, ServerConfig.LOGIN_SERVERNAME.length() - 3);
    }

    public static String getEventMessage() {
        return ServerConfig.LOGIN_EVENTMESSAGE;
    }

    public static void setEventMessage(String newMessage) {
        ServerConfig.LOGIN_EVENTMESSAGE = newMessage;
    }

    public static byte getFlag() {
        return ServerConfig.LOGIN_SERVERFLAG;
    }

    public static void setFlag(byte newflag) {
        ServerConfig.LOGIN_SERVERFLAG = newflag;
    }

    public static Map<Integer, Integer> getLoad() {
        return load;
    }

    public static void setLoad(Map<Integer, Integer> load_, int usersOn_) {
        load = load_;
        usersOn = usersOn_;
    }

    public static int getUserLimit() {
        return ServerConfig.LOGIN_USERLIMIT;
    }

    public static void setUserLimit(int newLimit) {
        ServerConfig.LOGIN_USERLIMIT = newLimit;
    }

    public static int getUsersOn() {
        return usersOn;
    }

    public static List<MapleBalloon> getBalloons() {
        return lBalloon;
    }

    public static boolean isShutdown() {
        return finishedShutdown;
    }

    public static void setOn() {
        finishedShutdown = false;
    }

    public static Pair<String, Integer> getRandomWorldSelectBG() {
        int day = Calendar.getInstance().get(Calendar.DAY_OF_WEEK);
        Set<String> set = new HashSet<>(worldSelectBGs.keySet());
        Iterator<String> it = set.iterator();
        while(it.hasNext()) {
            String s = it.next();
            if ("default".equalsIgnoreCase(s) || "signboard".equalsIgnoreCase(s)) {
                it.remove();
            } else {
                if (day == 1) {
                    if (!"sundayMaple".equalsIgnoreCase(s) && !"specialSundayMaple".equalsIgnoreCase(s)) {
                        it.remove();
                    }
                } else {
                    if ("sundayMaple".equalsIgnoreCase(s) || "specialSundayMaple".equalsIgnoreCase(s)) {
                        it.remove();
                    }
                }
            }
        }
        Object[] keys = set.toArray();
        if (keys.length <= 0) {
            return new Pair<>("default", 0);
        }
        String bgName = keys[Randomizer.nextInt(keys.length)].toString();
        List<Integer> values = worldSelectBGs.get(bgName);
        int value = values.get(Randomizer.nextInt(values.size()));
        return new Pair<>(bgName, value);
    }
}
