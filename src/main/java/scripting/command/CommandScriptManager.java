package scripting.command;

import client.MapleClient;
import configs.Config;
import scripting.AbstractScriptManager;
import server.commands.CommandObject;

import javax.script.Invocable;
import java.util.HashMap;
import java.util.Map;

public class CommandScriptManager extends AbstractScriptManager {

    private static final CommandScriptManager instance = new CommandScriptManager();

    private final Map<String, CommandObject> commands = new HashMap<>();

    private CommandScriptManager() {

    }

    public static CommandScriptManager getInstance() {
        return instance;
    }

    public CommandObject getCommand(String name, MapleClient c) {
        if (commands.get(name) == null || Config.isDevelop()) {
            Invocable iv = getInvocable("command/" + name, c);
            if (iv != null) {
                try {
                    CommandObject cmd = iv.getInterface(CommandObject.class);
                    if (cmd != null) commands.put(name, cmd);
                    return cmd;
                } catch (Exception ignore) {
                }
            }
            return null;
        } else {
            return commands.get(name);
        }
    }

}
