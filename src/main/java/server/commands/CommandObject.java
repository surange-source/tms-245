package server.commands;

import client.MapleClient;

/**
 * Represents a command given by a user
 *
 * @author Emilyx3
 */
public class CommandObject {

    /**
     * what {@link MapleClient#gmLevel} is required to use this command
     */
    private final int levelReq;
    private final boolean isGm;
    /**
     * what gets done when this command is used
     */
    private final CommandExecute exe;

    public CommandObject(CommandExecute c, int level, boolean isGm) {
        exe = c;
        levelReq = level;
        this.isGm = isGm;
    }

    /**
     * Call this to apply this command to the specified {@link MapleClient} with
     * the specified arguments.
     *
     * @param c        the MapleClient to apply this to
     * @param splitted the arguments
     * @return See {@link CommandExecute#execute}
     */
    public int execute(MapleClient c, String[] splitted) {
        return exe.execute(c, splitted);
    }

    public CommandType getType() {
        return exe.getType();
    }

    public String getShortCommand() {
        return exe.getShortCommand();
    }

    /**
     * Returns the GMLevel needed to use this command.
     *
     * @return the required GM Level
     */
    public int getReqLevel() {
        return levelReq;
    }

    public boolean isGm() {
        return isGm;
    }

    protected String getName(){
        return exe.getClass().getSimpleName();
    }
}
