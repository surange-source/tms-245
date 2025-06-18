var status = -1;
var ca = java.util.Calendar.getInstance();
var year = ca.get(java.util.Calendar.YEAR); //獲得年份
var month = ca.get(java.util.Calendar.MONTH) + 1; //獲得月份
var day = ca.get(java.util.Calendar.DATE);//獲取日
var hour = ca.get(java.util.Calendar.HOUR); //獲得小時
var minute = ca.get(java.util.Calendar.MINUTE);//獲得分鐘
var second = ca.get(java.util.Calendar.SECOND); //獲得秒

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendNext("呵呵，好吧，你繼續玩吧。");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
            cm.sendYesNo("#e#r爆物如下：#n\r\n#v4001839# #v2049323# #v5062009# #v5062500# #v5062024# #v2028048# #v2431743# \r\n\r\n#b你想進入地圖嗎，看好時間哦。\r\n#d每小時#r10#b#d分#r00#d秒-#r15#d分#r00#d秒開始？");
    } else if (status == 1) {
    //    cm.sendNext("真沒耐心。如果你非要走的話，我也不會攔你。再見。");
  //  } else if (status == 2) {
        cm.warp(910040001);
           cm.worldSpouseMessage(0x0A, "[被召喚的怪物] : 玩家 " + cm.getChar().getName() + " 在市場雪人飛到了隱藏地圖等待被召喚的怪物中!");
        cm.dispose();
    }
}