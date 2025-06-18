var status = -1;

function action(mode, type, selection) {
           cm.gainPlayerEnergy(5);
       cm.gainItem(4000082, 3);
       cm.gainItem(4033356, 2);
           cm.worldSpouseMessage(0x20,"[小副本] 恭喜玩家 "+ cm.getChar().getName() +" 在相框NPC小副本活動中獲得 2 個正義火種和 3 殭屍丟失的金齒 。");
       cm.setEventCount("鏡世界副本");
       cm.setPartyEventCount("鏡世界副本");
      cm.warp(910000000);
       cm.dispose();
}