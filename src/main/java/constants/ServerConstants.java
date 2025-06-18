package constants;

import client.MapleClient;
import configs.Config;
import configs.ServerConfig;
import handling.login.JobType;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.*;
import java.net.*;
import java.nio.charset.Charset;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ServerConstants {

    // 伺服器版本號
    public static final short MapleMajor = 245;
    // 伺服器區域
    public static byte MapleRegion = 6;
    // 測試服
    public static final boolean TestServer = false;
    public static final int MIN_MTS = 150; //lowest amount an item can be, GMS = 110
    public static final int MTS_BASE = 0; //+amount to everything, GMS = 500, MSEA = 1000
    public static final int MTS_TAX = 5; //+% to everything, GMS = 10
    public static final int MTS_MESO = 2500; //拍賣中的手續費用
    //master login is only used in GMS: fake account for localhost only
    //master and master2 is to bypass all accounts passwords only if you are under the IPs below
    public static final List<String> vpnIp = new LinkedList<>();
    public static final int MAXIMUM_CONNECTIONS = 1000;
    // job.length = 23
    public static final String[] JOB_NAMELIST = Arrays.stream(JobType.values()).map(Enum::name).toArray(String[]::new);
    private static final Logger log = LogManager.getLogger(ServerConstants.class);
    private static final Map<String, Boolean> blockedMapFM = new HashMap<>(); // 禁止顯示給其他角色的技能
    //Inject a DLL that hooks SetupDiGetClassDevsExA and returns 0.
    // Start of Poll
    public static String WORLD_INTERFACE = null;
    private static boolean showGMMessage = false;

    static {
        for (int i = 0; i < 256; i++) {
            vpnIp.add("17.1.1." + i);
        }
        for (int i = 0; i < 256; i++) {
            vpnIp.add("17.1.2." + i);
        }
    }

    private static InetAddress getInetAddress(String host) {
        try {
            return InetAddress.getByName(host);
        } catch (UnknownHostException ex) {
            return null;
        }
    }

    public static final String getHostAddress(String host) {
        final InetAddress inetAddr = getInetAddress(host);
        if (inetAddr == null) {
            return "127.0.0.1";
        }
        return inetAddr.getHostAddress();
    }

    public static String getLoopbackAddress() {
        return "127.0.0.1";
    }

    public static List<String> getLocalAddresses() {
        List<String> localIp = new LinkedList<>();
        try {
            Enumeration<NetworkInterface> netInterfaces = NetworkInterface.getNetworkInterfaces();
            InetAddress ip = null;
            while (netInterfaces.hasMoreElements()) {
                NetworkInterface ni = netInterfaces.nextElement();
                Enumeration<InetAddress> address = ni.getInetAddresses();
                while (address.hasMoreElements()) {
                    ip = address.nextElement();
                    if (!ip.isLoopbackAddress() && ip.getHostAddress().indexOf(":") == -1) {
                        if (ip.isSiteLocalAddress()) {
                            localIp.add(ip.getHostAddress());
                        }
                    }
                }
            }
        } catch (SocketException e) {
        }
        return localIp;
    }

    public static String getIPv4Address() {
        String[] hosts = {"http://ip111.cn/", "http://ip.3322.net/", "http://bot.whatismyipaddress.com/"};
        InputStream inputStream = null;
        for (String host : hosts) {
            try {
                URL url = new URL(host);
                URLConnection urlconnnection = url.openConnection();
                inputStream = urlconnnection.getInputStream();
                InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
                BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
                StringBuffer webContent = new StringBuffer();
                String str = null;
                while ((str = bufferedReader.readLine()) != null) {
                    webContent.append(str);
                }
                Pattern p = Pattern.compile("\\d+\\.\\d+\\.\\d+\\.\\d+");
                Matcher matcher = p.matcher(webContent);
                matcher.find();
                return matcher.group();
            } catch (IOException e) {
            } finally {
                if (inputStream != null) {
                    try {
                        inputStream.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
        return getLoopbackAddress();
    }

    public static String getIPByIP(String remoteIP, String localIP) {
        if (!Boolean.valueOf(Config.getProperty("server.forceInternetIP", "false"))) {
            if (remoteIP.equalsIgnoreCase(getLoopbackAddress()) || remoteIP.equalsIgnoreCase(localIP)) {
                return remoteIP;
            }

            if (getLocalAddresses().contains(localIP) && localIP.startsWith(remoteIP.substring(0, remoteIP.lastIndexOf(".")))) {
                return localIP;
            }
        }

        String outerIp = Config.getProperty("server.host", "127.0.0.1");
        if (!outerIp.isEmpty()) {
            return getHostAddress(outerIp);
        } else {
            if (WORLD_INTERFACE == null) {
                WORLD_INTERFACE = getIPv4Address();
            }
            return WORLD_INTERFACE;
        }
    }

    public static byte[] getIPBytesByClient(MapleClient c) {
        return getIPBytes(getIPByIP(c.getSessionIPAddress(), c.getSessionLocalIPAddress()));
    }

    public static final byte[] getIPBytes(String ip) {
        byte[] localhost = new byte[]{(byte) 127, (byte) 0, (byte) 0, (byte) 1};
        if (ip == null || ip.isEmpty()) return localhost;

        String[] ipArr = ip.split("\\.");
        if (ipArr.length != 4) return localhost;

        byte[] ipBytes = new byte[4];
        for (int i = 0; i < ipArr.length; i++) {
            if (!ipArr[i].matches("^\\d+$")) return localhost;
            ipBytes[i] = (byte) Short.parseShort(ipArr[i]);
        }

        return ipBytes;
    }

    public static boolean isIPLocalhost(String sessionIP) {
        return getLoopbackAddress().contains(sessionIP.replace("/", ""));
    }

    public static boolean isVpn(String sessionIP) {
        return vpnIp.contains(sessionIP.replace("/", ""));
    }

    /**
     * 加載禁止使用FM命令的地圖列表
     */
    public static void loadBlockedMapFM() {
        blockedMapFM.clear();
        Properties settings = new Properties();
        try {
            FileInputStream fis = new FileInputStream("config/blockMapFM.ini");
            settings.load(fis);
            fis.close();
        } catch (IOException ex) {
            System.out.println("未加載 blockMapFM.ini 配置, FM指令將無禁止使用地圖列表");
        }
        for (Map.Entry<Object, Object> entry : settings.entrySet()) {
            String property = (String) entry.getKey();
            String value = (String) entry.getValue();
            try {
                blockedMapFM.put(property, Integer.parseInt(value) > 0);
            } catch (Exception ignore) { }
        }
    }

    /**
     * 檢測這個技能是否禁止顯示
     */
    public static boolean isBlockedMapFM(int skillId) {
        if (blockedMapFM.containsKey(String.valueOf(skillId))) {
            return blockedMapFM.get(String.valueOf(skillId));
        }
        return false;
    }

    private static boolean logPacket = false;
    public static boolean isLogPacket() {
        return logPacket;
    }

    public static void setLogPacket(boolean show) {
        logPacket = show;
    }

    public static boolean isShowGMMessage() {
        return showGMMessage;
    }

    public static void setShowGMMessage(boolean b) {
        showGMMessage = b;
    }

    public static boolean isPvpMap(int mapid) {
        return ServerConfig.CHANNEL_PVPMAPS.indexOf(mapid) != -1;
    }

    public static boolean isOpenJob(String jobname) {
        return !ServerConfig.WORLD_CLOSEJOBS.contains(jobname);
    }


    public enum MapleServerName {
        // UI.wz/Login.img/WorldSelect/BtWorld/release

        艾麗亞,
        普力特,
        琉德,
        優依娜,
        愛麗西亞,
        殺人鯨,
        // UNION
        유니온(10),
        // ELYSIUM
        엘리시옴(16),
        // ENOSIS
        이노시스(29),
        LAB,
        // RED
        레드(43),
        // AURORA
        오로라,
        // 리부트
        REBOOT,
        // 리부트2
        REBOOT2,
        // CHALLENGE
        챌린지(48),
        //
        燃燒,
        // ARCANE
        아케인,
        // NOVA
        노바;

        private final int value;

        MapleServerName() {
            this(Counter.nextvalue);
        }

        MapleServerName(int value) {
            this.value = value;
            Counter.nextvalue = value + 1;
        }

        public static MapleServerName getByValue(int value) {
            for (MapleServerName server : values()) {
                if (server.getValue() == value) {
                    return server;
                }
            }
            return getByOrdinal(0);
        }

        public static MapleServerName getByOrdinal(int ordinal) {
            if (ordinal > values().length || ordinal < 0) {
                ordinal = 0;
            }
            return values()[ordinal];
        }

        public int getValue() {
            return value;
        }

        private static class Counter {
            private static int nextvalue = 0;
        }
    }

    public enum MapleServerStatus {
        無,
        活動,
        新服,
        熱門
    }

    public enum MapleType {

        UNKNOWN(-1, 949),
        한국(1, 949),
        한국_TEST(2, 949),
        日本(3, 932),
        中国(4, 936),
        中国_TEST(5, 936),
        台灣(6, 950),
        SEA(7, 949),
        GLOBAL(8, 949),
        BRAZIL(9, 949);

        byte type;
        int codepage;
        Charset charset;

        private MapleType(int type, int codepage) {
            this.type = (byte) type;
            this.codepage = codepage;
            try {
                charset = Charset.forName(String.format("MS%d", codepage));
            } catch (Exception e) {
                this.codepage = 949;
                charset = Charset.forName("MS949");
                System.err.println("設置Charset出錯(" + name() + "):" + e);
            }
        }

        public byte getType() {
            return type;
        }

        public int getCodePage() {
            return codepage;
        }

        public Charset getCharset() {
            return charset;
        }

        public void setType(int type) {
            this.type = (byte) type;
        }

        public static MapleType getByType(byte type) {
            for (MapleType l : MapleType.values()) {
                if (l.getType() == type) {
                    return l;
                }
            }
            return UNKNOWN;
        }
    }
}
