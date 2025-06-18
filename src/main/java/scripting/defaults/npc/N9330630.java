package scripting.defaults.npc;

import client.MapleBuffStat;
import client.MapleCharacter;
import scripting.npc.AbstractNPCScript;

public class N9330630 extends AbstractNPCScript {

    @Override
    public void start() {
        MapleCharacter chr = cm.getPlayer();
        if (chr.getBuffedIntValue(MapleBuffStat.培羅德束縛) > 0) {
            cm.playerMessage(5, "被邪惡的氣息束縛住無法移動。");
        } else {
            cm.warp(863010500, 3);
        }
        cm.dispose();
    }
}
