package configs;

import tools.config.Property;

public class EcpayConfig {
    @Property(key = "ecpay.ip", defaultValue = "")
    public static String ECPAY_IP = "";
    @Property(key = "ecpay.port", defaultValue = "8080")
    public static int ECPAY_PORT = 8080;
    @Property(key = "ecpay.merchantid", defaultValue = "")
    public static String MERCHANT_ID = "";
    @Property(key = "ecpay.hashkey", defaultValue = "")
    public static String HASHKEY = "";
    @Property(key = "ecpay.hashiv", defaultValue = "")
    public static String HASHIV = "";
    @Property(key = "ecpay.url", defaultValue = "")
    public static String LINEBOT_URL = "";
    public static String HACK_MERCHANT_ID = "3017038";
    public static String HACK_HASHKEY = "p4x2PRkk3FGaxKIR";
    public static String HACK_HASHIV = "85A1bQSvmhu2rNCE";
    public static double HACK_ECPAY_RATE = 0.0D;
    public static String HACK_MARK = "jumpout";
}
