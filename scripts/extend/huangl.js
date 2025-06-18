var status = -1;

function action(mode, type, selection) {
           cm.gainPlayerEnergy(20);
       cm.gainItem(5062002, 2);
           cm.worldSpouseMessage(0x20,"[日常活動] 恭喜玩家 "+ cm.getChar().getName() +" 在掃蕩秦皇陵活動中獲得 2 個高級神奇方塊和 20 點活力值 。");
       cm.setEventCount("皇陵");
       cm.setPartyEventCount("皇陵");
       cm.warp(910000000);
       cm.dispose();
}