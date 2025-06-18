package database;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.sql.Connection;
import java.sql.SQLException;

/**
 * Druid連接池
 * @author Ethan
 * @time 20170713
 */
public class DatabaseConnection implements AutoCloseable {

    private static final Logger log = LogManager.getLogger("Database");
    private Connection conn;

    public DatabaseConnection() {
        this(DatabaseLoader.getConnection());
    }

    public DatabaseConnection(final boolean notAutoCommit) {
        this(DatabaseLoader.getConnection(), true);
    }

    private DatabaseConnection(final Connection conn) {
        this.conn = conn;
    }

    private DatabaseConnection(final Connection conn, final boolean notAutoCommit) {
        this.conn = conn;
        try {
            this.conn.setAutoCommit(false);
        }
        catch (SQLException ex) {
            throw new DatabaseException(ex);
        }
    }

    public final Connection getConnection() {
        return conn;
    }

    public final void commit() {
        try {
            conn.commit();
        }
        catch (SQLException ex) {
            throw new DatabaseException(ex);
        }
    }

    public final void rollback() {
        try {
            conn.rollback();
        }
        catch (SQLException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public final void close() {
        try {
            conn.close();
        }
        catch (SQLException ex) {
            throw new DatabaseException(ex);
        }
    }

    public static <T> T domain(DatabaseInterface<T> interfaces) {
        return domain(interfaces, "資料庫異常", false);
    }

    public static <T> T domain(DatabaseInterface<T> interfaces, String errmsg) {
        return domain(interfaces, errmsg, false);
    }

    public static <T> T domain(DatabaseInterface<T> interfaces, String errmsg, boolean needShutdown) {
        T Object = null;
        DatabaseConnection con = new DatabaseConnection(true);
        try {
            Object = interfaces.domain(con.getConnection());
            con.commit();
        } catch (Throwable e) {
            con.rollback();
            log.error(errmsg, e);
            if (needShutdown) {
                System.exit(0);
            }
        } finally {
            con.close();
        }
        return Object;
    }

    public static <T> T domainThrowsException(DatabaseInterface<T> interfaces) throws DatabaseException {
        T Object = null;
        DatabaseConnection con = new DatabaseConnection(true);
        try {
            Object = interfaces.domain(con.getConnection());
            con.commit();
        } catch (Exception e) {
            con.rollback();
            throw new DatabaseException(e);
        } finally {
            con.close();
        }
        return Object;
    }

    public interface DatabaseInterface<T> {
        T domain(Connection con) throws SQLException;
    }
}
