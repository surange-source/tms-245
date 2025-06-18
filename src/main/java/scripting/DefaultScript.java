package scripting;

import javax.script.Invocable;
import javax.script.ScriptException;

public interface DefaultScript extends Invocable {
    @Override
    default Object invokeMethod(Object thiz, String name, Object... args) throws ScriptException, NoSuchMethodException {
        throw new UnsupportedOperationException("not support");
    }

    @Override
    default Object invokeFunction(String name, Object... args) throws ScriptException, NoSuchMethodException {
        throw new UnsupportedOperationException("not support");
    }

    default Object invokePrivateMethod(String name, Object[] args) throws NoSuchMethodException {
        throw new NoSuchMethodException("Function '" + name + "' does not exist.");
    }

    default void check(String name, Object[] args, int num) throws IllegalArgumentException {
        if (args == null || args.length < num) {
            throw new IllegalArgumentException("Function '" + name + "' args length not enough.");
        }
    }

    @Override
    default <T> T getInterface(Class<T> clasz) throws IllegalArgumentException {
        try {
            return clasz.cast(this);
        } catch (ClassCastException e) {
            throw new IllegalArgumentException(e);
        }
    }

    @Override
    default <T> T getInterface(Object thiz, Class<T> clasz) {
        throw new UnsupportedOperationException("not support");
    }

    void put(Object obj);

    default int parseInt(String s) {
        try {
            return Integer.parseInt(s);
        } catch (Exception e) {
            return 0;
        }
    }

    default int parseInt(double d) {
        return (int) d;
    }

    default String String(long n) {
        return String.valueOf(n);
    }

}
