package launch;

import client.inventory.MapleInventoryIdentifier;
import configs.Config;
import constants.ItemConstants;
import constants.ServerConstants;
import database.DatabaseLoader;
import handling.auction.AuctionServer;
import handling.cashshop.CashShopServer;
import handling.channel.ChannelServer;
import handling.channel.MapleDojoRanking;
import handling.channel.MapleGuildRanking;
import handling.login.LoginInformationProvider;
import handling.login.LoginServer;
import handling.world.World;
import handling.world.WorldRespawnService;
import handling.world.family.MapleFamily;
import handling.world.guild.MapleGuild;
import handling.world.messenger.MessengerRankingWorker;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import provider.MapleDataProviderFactory;
import scripting.AbstractScriptManager;
import scripting.portal.PortalScriptManager;
import server.AutobanManager;
import server.CharacterCardFactory;
import server.InitializeServer;
import server.MTSStorage;
import server.PredictCardFactory;
import server.RandomRewards;
import server.RankingTop;
import server.RankingWorker;
import server.ShutdownServer;
import server.SpeedRunner;
import server.Timer;
import server.carnival.MapleCarnivalFactory;
import server.life.PlayerNPC;

public class StartServer {
    private static final Logger log = LogManager.getLogger(StartServer.class);
    public static boolean guiEnabled = true;

    public static void main(String[] args) {
        System.out.println("初始化配置...");
        Config.load();
        MapleDataProviderFactory.init();
        if (!InitializeServer.initServer()) {
            System.err.println("伺服端初始化失敗。");
            System.exit(1);
        }
        startServer();
    }

    public static void startServer() {
        log.info("開始加載數據");
        // tmp
        PortalScriptManager.getInstance().getInvocable("portal/106030100_IP.js", null);
        long starttime = System.currentTimeMillis();
        InitializeServer.initAllData(((now, total, loadPart) -> {
            log.info("正在加載數據...總進度：{}/{}, 加載完成：{}" , now , total, loadPart);
            if (now == total) {
                log.info(String.format("加載數據完成，耗時：%.3f秒", (System.currentTimeMillis() - starttime) / 1000.0));
                InitializeServer.InitDataFinished = true;
                run();
            }
        }));
    }

    public static void run() {
        new Thread(new StartThread()).start();
    }

    public static class StartThread implements Runnable {

        @Override
        public void run() {
            try {
                ShutdownServer.getInstance().setShutdown(false);
                DatabaseLoader.restart();
                System.out.println("開啟時鐘線程...");
                Timer.startAll();
                if (Config.getProperty("server.host", "127.0.0.1").isEmpty()) {
                    System.out.println("未設定外網IP, 從網路獲取:" + ServerConstants.getIPv4Address());
                }
                System.out.println("正在啟動 - 好友、組隊、公會、聯盟、角色管理");
                World.init();
                MapleGuildRanking.getInstance().load();
                MapleGuild.loadAll();
                MapleFamily.loadAll();

//                System.out.println("正在加載 - 技能訊息");
//                SkillFactory.loadAllSkills();

                System.out.println("正在加載 - 初始角色訊息");
                LoginInformationProvider.getInstance();

                System.out.println("正在加載 - 隨機獎勵");
                RandomRewards.load();

                System.out.println("正在加載 - 角色卡系統");
                CharacterCardFactory.getInstance().initialize();

                System.out.println("正在加載 - 副本競速排行榜");
                SpeedRunner.loadSpeedRuns();

                System.out.println("正在加載 - 拍賣場系統");
                MTSStorage.load();

                LoginServer.run_startup_configurations();
                ChannelServer.startChannel_Main();
                CashShopServer.run_startup_configurations();
                AuctionServer.getInstance().init();
//                ChatServer.run_startup_configurations();
//                new SpecLoginServer().start();

                System.out.println("正在加載 - 其他訊息");
                Timer.CheatTimer.getInstance().register(AutobanManager.getInstance(), 60000);
                WorldRespawnService.getInstance();
                LoginServer.setOn();
                PredictCardFactory.getInstance().initialize();
                MapleInventoryIdentifier.getInstance();
                PlayerNPC.loadAll();
                MapleDojoRanking.getInstance().load(false);
                RankingWorker.start();
//                PlayMSEvent.start();
                MessengerRankingWorker.getInstance();
//                server.Start.checkCopyItemFromSql();
//                clearOnlineTime();
                RankingTop.getInstance();
//                DataBaseManagePanel.getInstance().autoBackup();
                MapleCarnivalFactory.getInstance();
                ItemConstants.TapJoyReward.init();
                Runtime.getRuntime().addShutdownHook(new Thread(ShutdownServer.getInstance()));
//                ServerNotice.start();
//                Timer.GuiTimer.getInstance().register(() -> {
//                    ChannelServer.getAllInstances().stream()
//                            .flatMap(it -> it.getPlayerStorage().getAllCharacters().stream())
//                            .forEach(player -> player.saveToDB(false, false));
//                }, 1000 * 60 * 3);
                System.err.println("伺服端啟動完成！");
                System.out.println("IP: " + Config.getProperty("server.host", "127.0.0.1"));
                // tmp
                PortalScriptManager.getInstance().getInvocable("portal/106030100_IP.js", null);
            } catch (Exception e) {
                System.err.println("伺服端啟動失敗！");
            }
        }
    }

    public static void exit() {
        Runtime.getRuntime().halt(0);
    }
}
