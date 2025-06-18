package scripting.portal;

public interface PortalScript {

    void enter(PortalPlayerInteraction pi);

    default long parseInt(String s) {
        try {
            return Long.parseLong(s);
        } catch (Exception e) {
            return 0;
        }
    }

    default long parseInt(double d) {
        return (long) d;
    }

    default String String(long n) {
        return String.valueOf(n);
    }

}
