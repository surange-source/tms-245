package database;

import database.tools.SqlTool;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.*;

public class AsyncDbLogger {

    private static final Map<String, AsyncDbLogger> INSTANCES = new HashMap<>();

    private final ExecutorService service = Executors.newFixedThreadPool(8);
    private final String name;

    private AsyncDbLogger(String name) {
        this.name = name;
    }

    public synchronized static AsyncDbLogger getInstance(String name) {
        return INSTANCES.computeIfAbsent(name, AsyncDbLogger::new);
    }

    public void log(String msg) {
        SqlTool.update("INSERT INTO zlog_auction (character_id, action, itemId, count) VALUES ()");
    }

    public void log(String format, Object... params) {
        log(String.format(format, params));
    }
}
