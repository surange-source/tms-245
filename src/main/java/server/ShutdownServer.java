package server;

import database.DatabaseLoader;
import handling.auction.AuctionServer;
import handling.cashshop.CashShopServer;
import handling.channel.ChannelServer;
import handling.chat.ChatServer;
import handling.login.LoginServer;
import handling.world.WorldAllianceService;
import handling.world.WorldBroadcastService;
import handling.world.WorldFamilyService;
import handling.world.WorldGuildService;
import launch.StartServer;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import server.Timer.*;
import packet.MaplePacketCreator;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;

public class ShutdownServer implements Runnable {

    private static final Logger log = LogManager.getLogger(ShutdownServer.class);
    private static final ShutdownServer instance = new ShutdownServer();
    private int time = 0;
    private final AtomicBoolean running = new AtomicBoolean(false);
    private final AtomicBoolean shutdown = new AtomicBoolean(false);

    public static ShutdownServer getInstance() {
        return instance;
    }

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }

    public void run() {
        shutdown.set(true);
        log.info("正在準備關閉伺服端 " + shutdown);
        if (!running.compareAndSet(false, true)) {
            return;
        }
        CountDownLatch countDownLatch = new CountDownLatch(ChannelServer.getChannelCount());
        for (ChannelServer cs : ChannelServer.getAllInstances()) {
            new Thread(() -> {
                try {
                    cs.setServerMessage("遊戲伺服器將關閉維護，請玩家安全下線...");
                    cs.setShutdown();
                    cs.getPlayerStorage().disconnectAll();
                    cs.shutdown();
                    countDownLatch.countDown();
                } catch (Exception e) {
                    log.error("關閉伺服端錯誤", e);
                }
            }).start();
        }
//        for (ChannelServer cs : ChannelServer.getAllInstances()) {
//            try {
//                cs.closeAllMerchants();
//                cs.closeAllFisher();
//            } catch (Exception e) {
//                log.error("關閉伺服端錯誤", e);
//            }
//        }
        try {
            countDownLatch.await();
            ChannelServer.getSaveExecutor().shutdown();
            while (true) {
                try {
                    if (ChannelServer.getSaveExecutor().awaitTermination(1, TimeUnit.SECONDS)) break;
                } catch (InterruptedException e) {
                    break;
                }
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        for (ChannelServer cs : ChannelServer.getAllInstances()) {
            new Thread(() -> {
                try {
                    cs.shutdown();
                } catch (Exception e) {
                    log.error("關閉伺服端錯誤", e);
                }
            }).start();
        }
        WorldGuildService.getInstance().save();
        WorldAllianceService.getInstance().save();
        WorldFamilyService.getInstance().save();
        LoginServer.shutdown();
        CashShopServer.shutdown();
        AuctionServer.getInstance().shutdown();
        ChatServer.shutdown();
        System.out.println("正在關閉時鐘線程...");
        WorldTimer.getInstance().stop();
        MapTimer.getInstance().stop();
        BuffTimer.getInstance().stop();
        CoolDownTimer.getInstance().stop();
        CloneTimer.getInstance().stop();
        EventTimer.getInstance().stop();
        EtcTimer.getInstance().stop();
        PingTimer.getInstance().stop();
        System.out.println("正在關閉資料庫連接...");
        DatabaseLoader.closeAll();
        System.out.println("伺服端關閉完成...");
        log.info("伺服端關閉完成");
        running.set(false);
        if (!StartServer.guiEnabled) StartServer.exit();
    }

    public void setShutdown(boolean b) {
        shutdown.set(b);
    }

    public boolean isShutdown() {
        return shutdown.get();
    }

    public boolean isRunning() {
        return running.get();
    }
}
