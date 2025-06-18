package database;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class DatabaseException extends RuntimeException {

    private static final Logger log = LogManager.getLogger("Database");
    private static final long serialVersionUID = -420103154764822555L;

    public DatabaseException(String msg) {
        super(msg);
    }

    public DatabaseException(Exception e) {
        super(e);
        log.error("數據庫錯誤", e);
    }

    public DatabaseException(String message, Throwable cause) {
        super(message, cause);
    }
}
