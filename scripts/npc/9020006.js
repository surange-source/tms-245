function action(mode, type, selection) {
    if (cm.getMapId() / 100 == 9211607) {
        if (cm.getMap().getAllMonster().size() == 0) {
            var maple = Math.floor(Math.random() * 10) + 20;
            if (!cm.canHold(4001534, 1)) {//|| !cm.canHold(4001126, maple)
                cm.sendOk("請整理你的背包空間!.");
                cm.dispose();
                return;
            }
            /*if (!cm.canHold(4001713, 1)) {
             cm.sendOk("請清理其他空間!");
             cm.dispose();
             return;
             }
             cm.gainItem(4001713, 1);*/
            cm.gainExp_PQ(200, 1.5);
            cm.gainPQPoint();
//            cm.gainItem(4001126, maple);
            cm.gainItem(4001534, 1);
            if (cm.getEventCount("Prison") < 10) {
                cm.setEventCount("Prison");
                cm.gainNX(2, 100);
            }
            cm.removeAll(4001528);
            cm.warp(921160000, 0);
            cm.dispose();
        } else {
            cm.sendOk("請快點擊敗看守阿尼!");
            cm.safeDispose();
        }
    }
}
