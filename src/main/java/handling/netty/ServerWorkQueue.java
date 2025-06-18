package handling.netty;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.*;

public final class ServerWorkQueue extends Thread {

    private static final Logger log = LogManager.getLogger(ServerWorkQueue.class);
    private volatile boolean running = true;
    private final LinkedList<Runnable> list = new LinkedList<>();

    private static final ServerWorkQueue instance = new ServerWorkQueue("Client");

    public static ServerWorkQueue getInstance() {
        return instance;
    }

    public ServerWorkQueue(String name) {
        super(name);
    }

    static {
        instance.start();
    }

    public final void addLast(Runnable runnable) {
        synchronized (list) {
            list.addLast(runnable);
            list.notifyAll();
        }
    }

    public void shutdown() {
        running = false;
        synchronized (list) {
            list.notifyAll();
        }
    }

    @Override
    public void run() {
        while (running) {
            synchronized (list) {
                while (running && list.isEmpty()) {
                    try {
                        list.wait();
                    } catch (InterruptedException e) {
                        log.error(e);
                    }
                }
                if (!this.list.isEmpty()) {
                    this.list.removeFirst().run();
                }
            }
        }
    }
}
