package scripting.item;

import scripting.npc.INPCScript;

public abstract class AbstractItemScript implements INPCScript {

    protected ItemActionManager im;
    protected int status = -1;

    @Override
    public final void put(Object ms) {
        assert ms instanceof ItemActionManager;
        this.im = (ItemActionManager) ms;
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
