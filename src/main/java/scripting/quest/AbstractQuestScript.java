package scripting.quest;

public class AbstractQuestScript implements QuestScript {

    protected QuestActionManager qm;
    protected int status = -1;

    @Override
    public void start(int mode, int type, int selection) {
        switch (mode) {
            case 0:
                status--;
                break;
            case 1:
                status++;
                break;
        }
        qm.dispose();
    }

    @Override
    public void end(int mode, int type, int selection) {
        switch (mode) {
            case 0:
                status--;
                break;
            case 1:
                status++;
                break;
        }
        qm.dispose();
    }

    @Override
    public final void put(Object obj) {
        assert obj instanceof QuestActionManager;
        this.qm = (QuestActionManager) obj;
    }
}
