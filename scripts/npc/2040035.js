function action(mode, type, selection) {
    /*if (!cm.canHold(4001713, 1)) {
     cm.sendOk("請清理其他空間!");
     cm.dispose();
     return;
     }
     cm.gainItem(4001713, 1);*/
//    if (!cm.canHold(4001126, maple)) {
//        cm.sendOk("請清理其他空間!");
//        cm.dispose();
//        return;
//    }
    cm.gainPQPoint();
    cm.removeAll(4001022);
    cm.removeAll(4001023);
    cm.addTrait("will", 35);
    cm.addTrait("charisma", 10);
//    var maple = Math.floor(Math.random() * 10) + 20;
//    cm.gainItem(4001126, maple);
    cm.getPlayer().endPartyQuest(1202);//might be a bad implentation.. incase they dc or something
    if (cm.getEventCount("LudiPQ") < 10) {
        cm.setEventCount("LudiPQ");
        cm.gainNX(2, 10);
    } else {
        cm.playerMessage(-5, "當天帳號在此副本已經額外獲得10次楓點獎勵,次數已經用完。");
    }
    cm.warp(922010000);
    cm.dispose();
}
