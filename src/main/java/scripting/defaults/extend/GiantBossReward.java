package scripting.defaults.extend;

import scripting.npc.AbstractNPCScript;

public class GiantBossReward extends AbstractNPCScript {
    @Override
    public void start() {
        cm.sendOk("從這裡進入培羅德的心臟來淨化他吧。時間所剩不多，如果沒在時間內完成的話，就什麼也沒有改變了。", false);
        cm.dispose();
    }
}
