package scripting.reactor;

import scripting.event.EventInstanceManager;

public interface IReactorScript {
    void act(ReactorActionManager rm);

    default int parseInt(String s) {
        return Integer.parseInt(s);
    }

    default int parseInt(double d) {
        return Double.valueOf(d).intValue();
    }

    default String String(long n) {
        return String.valueOf(n);
    }
}
