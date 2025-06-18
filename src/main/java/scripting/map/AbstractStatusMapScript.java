package scripting.map;

public class AbstractStatusMapScript extends AbstractMapScript {

    protected int status;

    @Override
    public void start() {
        status = -1;
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
