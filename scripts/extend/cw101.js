var status = -1;
var random = java.lang.Math.floor(Math.random() * 10);
function action(mode, type, selection) {
       if(random >= 0 && random <= 8){
           cm.worldSpouseMessage(0x14,"[小夥伴養成] 玩家 "+ cm.getChar().getName() +" 的小夥伴突然 - 哇嗚~~施展了奇葩的神功 掉落神奇禮物包x1。");
       cm.gainItem(2430066,1);
           cm.resetPQLog("寵物總計成長值");
       cm.dispose();
       } else {
           cm.worldSpouseMessage(0x14,"[小夥伴養成] 玩家 "+ cm.getChar().getName() +" 的小夥伴突然 - 哇嗚~~施展了奇葩的神功 掉落神奇禮物包x2。");
       cm.gainItem(2430066,2);
           cm.resetPQLog("寵物總計成長值");
       cm.dispose();
       }
}