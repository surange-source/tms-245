package scripting.npc;

public class AbstractNPCScript implements INPCScript {

    protected NPCConversationManager cm;
    protected int status = -1;

    @Override
    public final void put(Object ms) {
        assert ms instanceof NPCConversationManager;
        this.cm = (NPCConversationManager) ms;
    }


    @Override
    public void start() {
        action(1, 0, 0);
    }

    @Override
    public void action(int mode, int type, int selection) {
        switch (mode) {
            case 0:
                status--;
                break;
            case 1:
                status++;
                break;
        }
    }
}
