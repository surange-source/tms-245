package scripting.defaults.npc;

import scripting.npc.AbstractNPCScript;

public class N9390124 extends AbstractNPCScript {
    @Override
    public void action(int mode, int type, int selection) {
        if (mode == 1) {
            status++;
        } else {
            if (status == 0) {
                cm.dispose();
            }
            status--;
        }
        if (status == 0) {
            cm.sendYesNo("如果現在離開，在完成組隊的挑戰之前無法回來。這樣也要離開嗎？");
        } else if (status == 1) {
            cm.warp(863010000);
            cm.dispose();
        }
    }
}
