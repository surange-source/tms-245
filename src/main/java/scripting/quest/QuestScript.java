package scripting.quest;

import scripting.DefaultScript;

import javax.script.ScriptException;

public interface QuestScript extends DefaultScript {

    void start(int mode, int type, int selection);

    void end(int mode, int type, int selection);

    @Override
    default Object invokeFunction(String name, Object... args) throws ScriptException, NoSuchMethodException {
        try {
            switch (name) {
                case "start":
                    start((byte) args[0], (byte) args[1], (int) args[2]);
                    return null;
                case "end":
                    check(name, args, 3);
                    end((byte) args[0], (byte) args[1], (int) args[2]);
                    return null;
                default:
                    return invokePrivateMethod(name, args);
            }
        } catch (IllegalArgumentException | ClassCastException e) {
            throw new NoSuchMethodException("[Map Script] Function '" + name + "' args are not correct.");
        } catch (NoSuchMethodException e) {
            throw new NoSuchMethodException("[Map Script] Function '" + name + "' does not exist.");
        } catch (Exception e) {
            throw new ScriptException(e);
        }
    }
}
