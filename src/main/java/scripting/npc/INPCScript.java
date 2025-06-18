/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package scripting.npc;

import scripting.DefaultScript;

import javax.script.ScriptException;

/**
 * @author PlayDK
 */
public interface INPCScript extends DefaultScript {

    void start();

    void action(int mode, int type, int selection);

    @Override
    default Object invokeFunction(String name, Object... args) throws ScriptException, NoSuchMethodException {
        try {
            switch (name) {
                case "start":
                    start();
                    return null;
                case "action":
                    check(name, args, 3);
                    action((byte) args[0], (byte) args[1], (int) args[2]);
                    return null;
                default:
                    return invokePrivateMethod(name, args);
            }
        } catch (IllegalArgumentException | ClassCastException e) {
            throw new NoSuchMethodException("[NPC Script] Function '" + name + "' args are not correct.");
        } catch (NoSuchMethodException e) {
            throw new NoSuchMethodException("[NPC Script] Function '" + name + "' does not exist.");
        } catch (Exception e) {
            throw new ScriptException(e);
        }
    }
}
