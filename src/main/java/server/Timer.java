package server;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import tools.Randomizer;

import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

public abstract class Timer {

    private static final AtomicInteger threadNumber = new AtomicInteger(1);
    protected String name;
    private ScheduledThreadPoolExecutor ses;

    public void start() {
        if (ses != null && !ses.isShutdown() && !ses.isTerminated()) {
            return;
        }
        ses = new ScheduledThreadPoolExecutor(5, new RejectedThreadFactory());
        ses.setKeepAliveTime(10, TimeUnit.MINUTES);
        ses.allowCoreThreadTimeOut(true);
        ses.setMaximumPoolSize(8);
        ses.setContinueExistingPeriodicTasksAfterShutdownPolicy(false);
    }

    public ScheduledThreadPoolExecutor getSES() {
        return ses;
    }

    public void stop() {
        if (ses != null) {
            ses.shutdown();
        }
    }

    /**
     * public ScheduledFuture<?> scheduleAtFixedRate(Runnable command, long initialDelay, long period, TimeUnit unit)
     * 從接口 ScheduledExecutorService 複製的描述創建並執行一個在給定初始延遲後首次啟用的定期操作，後續操作具有給定的週期；
     * 也就是將在 initialDelay 後開始執行，然後在 initialDelay+period 後執行，接著在 initialDelay + 2 * period 後執行，依此類推。
     * 如果任務的任何一個執行遇到異常，則後續執行都會被取消。否則，只能通過執行程序的取消或終止方法來終止該任務。
     * 如果此任務的任何一個執行要花費比其週期更長的時間，則將推遲後續執行，但不會同時執行。
     * 指定者：
     * 接口 ScheduledExecutorService 中的 scheduleAtFixedRate
     * @param command - 要執行的任務
     * @param period - 連續執行之間的週期，單位毫秒
     * @param initialDelay - 首次執行的延遲時間，單位毫秒
     * @return 表示掛起任務完成的 ScheduledFuture，並且其 get() 方法在取消後將拋出異常
     */
    public ScheduledFuture<?> register(Runnable command, long period, long initialDelay) {
        if (ses == null) {
            return null;
        }
        return ses.scheduleAtFixedRate(new LoggingSaveRunnable(command), initialDelay, period, TimeUnit.MILLISECONDS);
    }

    /**
     * public ScheduledFuture<?> scheduleAtFixedRate(Runnable command, long initialDelay, long period, TimeUnit unit)
     * 從接口 ScheduledExecutorService 複製的描述創建並執行一個定期操作，後續操作具有給定的週期；
     * 也就是將立即開始執行，然後在 period 後執行，接著在 2 * period 後執行，依此類推。
     * 如果任務的任何一個執行遇到異常，則後續執行都會被取消。否則，只能通過執行程序的取消或終止方法來終止該任務。
     * 如果此任務的任何一個執行要花費比其週期更長的時間，則將推遲後續執行，但不會同時執行。
     * 指定者：
     * 接口 ScheduledExecutorService 中的 scheduleAtFixedRate
     * @param command - 要執行的任務
     * @param period - 連續執行之間的週期，單位毫秒
     * @return 表示掛起任務完成的 ScheduledFuture，並且其 get() 方法在取消後將拋出異常
     */
    public ScheduledFuture<?> register(Runnable command, long period) {
        if (ses == null) {
            return null;
        }
        return ses.scheduleAtFixedRate(new LoggingSaveRunnable(command), 0, period, TimeUnit.MILLISECONDS);
    }

    /**
     * public ScheduledFuture<?> schedule(Runnable command, long delay, TimeUnit unit)
     * 從接口 ScheduledExecutorService 複製的描述創建並執行在給定延遲後啟用的一次性操作。
     * 指定者：
     * 接口 ScheduledExecutorService 中的 schedule
     * 參數：
     * @param command - 要執行的任務
     * @param delay - 從現在開始延遲執行的時間，單位毫秒
     * @return 表示掛起任務完成的 ScheduledFuture，並且其 get() 方法在完成後將返回 null
     */
    public ScheduledFuture<?> schedule(Runnable command, long delay) {
        if (ses == null) {
            return null;
        }
        return ses.schedule(new LoggingSaveRunnable(command), delay, TimeUnit.MILLISECONDS);
    }

    public ScheduledFuture<?> scheduleAtTimestamp(Runnable command, long timestamp) {
        return schedule(command, timestamp - System.currentTimeMillis());
    }

    public static void startAll() {
        Timer.WorldTimer.getInstance().start();
        Timer.MapTimer.getInstance().start();
        Timer.BuffTimer.getInstance().start();
        Timer.CoolDownTimer.getInstance().start();
        Timer.EventTimer.getInstance().start();
        Timer.CloneTimer.getInstance().start();
        Timer.EtcTimer.getInstance().start();
        Timer.CheatTimer.getInstance().start();
        Timer.PingTimer.getInstance().start();
        Timer.PlayerTimer.getInstance().start();
        Timer.ExpiredTimer.getInstance().start();
    }

    public static final class WorldTimer extends Timer {

        private static final WorldTimer instance = new WorldTimer();

        private WorldTimer() {
            name = "Worldtimer";
        }

        public static WorldTimer getInstance() {
            return instance;
        }
    }

    public static final class MapTimer extends Timer {

        private static final MapTimer instance = new MapTimer();

        private MapTimer() {
            name = "Maptimer";
        }

        public static MapTimer getInstance() {
            return instance;
        }
    }

    public static final class BuffTimer extends Timer {

        private static final BuffTimer instance = new BuffTimer();

        private BuffTimer() {
            name = "Bufftimer";
        }

        public static BuffTimer getInstance() {
            return instance;
        }
    }

    public static final class CoolDownTimer extends Timer {

        private static final CoolDownTimer instance = new CoolDownTimer();

        private CoolDownTimer() {
            name = "CoolDownTimer";
        }

        public static CoolDownTimer getInstance() {
            return instance;
        }
    }

    public static final class EventTimer extends Timer {

        private static final EventTimer instance = new EventTimer();

        private EventTimer() {
            name = "Eventtimer";
        }

        public static EventTimer getInstance() {
            return instance;
        }
    }

    public static final class CloneTimer extends Timer {

        private static final CloneTimer instance = new CloneTimer();

        private CloneTimer() {
            name = "Clonetimer";
        }

        public static CloneTimer getInstance() {
            return instance;
        }
    }

    public static final class EtcTimer extends Timer {

        private static final EtcTimer instance = new EtcTimer();

        private EtcTimer() {
            name = "Etctimer";
        }

        public static EtcTimer getInstance() {
            return instance;
        }
    }

    public static final class CheatTimer extends Timer {

        private static final CheatTimer instance = new CheatTimer();

        private CheatTimer() {
            name = "Cheattimer";
        }

        public static CheatTimer getInstance() {
            return instance;
        }
    }

    public static final class PingTimer extends Timer {

        private static final PingTimer instance = new PingTimer();

        private PingTimer() {
            name = "Pingtimer";
        }

        public static PingTimer getInstance() {
            return instance;
        }
    }

    public static final class GuiTimer extends Timer {

        private static final GuiTimer instance = new GuiTimer();

        private GuiTimer() {
            name = "GuiTimer";
        }

        public static GuiTimer getInstance() {
            return instance;
        }
    }

    public static final class PlayerTimer extends Timer {

        private static final PlayerTimer instance = new PlayerTimer();

        private PlayerTimer() {
            name = "PlayerTimer";
        }

        public static PlayerTimer getInstance() {
            return instance;
        }
    }

    public static final class ExpiredTimer extends Timer {

        private static final PlayerTimer instance = new PlayerTimer();

        private ExpiredTimer() {
            name = "ExpiredTimer";
        }

        public static PlayerTimer getInstance() {
            return instance;
        }
    }

    private static final class LoggingSaveRunnable implements Runnable {

        private static final Logger logger = LogManager.getLogger(LoggingSaveRunnable.class);
        final Runnable command;

        public LoggingSaveRunnable(Runnable r) {
            this.command = r;
        }

        @Override
        public void run() {
            try {
                command.run();
            } catch (Throwable t) {
                logger.error("", t); //寫出執行定時任務的錯誤信息
            }
        }
    }

    private final class RejectedThreadFactory implements ThreadFactory {

        private final AtomicInteger threadNumber2 = new AtomicInteger(1);
        private final String tname;

        public RejectedThreadFactory() {
            tname = name + Randomizer.nextInt();
        }

        @Override
        public Thread newThread(Runnable r) {
            Thread t = new Thread(r);
            t.setName(tname + "-W-" + threadNumber.getAndIncrement() + "-" + threadNumber2.getAndIncrement());
            return t;
        }
    }
}