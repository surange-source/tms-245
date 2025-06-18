package database;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.sql.Connection;

/**
 * Druid連接池
 * @author Ethan
 * @time 20170713
 */
public class DatabaseConnectionEx {

    public static final int RETURN_GENERATED_KEYS = 1;
    private static final Logger log = LogManager.getLogger(DatabaseConnectionEx.class);

    private static class DatabaseConnectionHolder {
        private static final DatabaseConnectionEx instance = new DatabaseConnectionEx();
    }

    public static DatabaseConnectionEx getInstance() {
        return DatabaseConnectionHolder.instance;
    }

    public Connection getConnection() {
        try {
            return DatabaseLoader.getConnection();
        } catch (DatabaseException e) {
            return null;
        }
    }

}
