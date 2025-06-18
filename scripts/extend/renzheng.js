var ca = java.util.Calendar.getInstance();
var year = ca.get(java.util.Calendar.YEAR); //獲得年份
var month = ca.get(java.util.Calendar.MONTH) + 1; //獲得月份
var day = ca.get(java.util.Calendar.DATE);//獲取日
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //獲得小時
var minute = ca.get(java.util.Calendar.MINUTE);//獲得分鐘
var second = ca.get(java.util.Calendar.SECOND); //獲得秒
var weekday = ca.get(java.util.Calendar.DAY_OF_WEEK);

var yun1 ="#fUI/UIWindow/Quest/icon7/10#";////紅色圓
var yun2 ="#fUI/UIWindow/Quest/icon8/0#";////藍指標
var yun4 ="#fUI/UIWindow/Quest/reward#";////獎勵
var ppp = "#fEffect/CharacterEff/1112907/4/0#"; //泡炮
var zs = "#fEffect/CharacterEff/1112946/2/0#";  //磚石粉
var zs1 = "#fEffect/CharacterEff/1112946/1/1#";  //磚石藍
var yun ="#fUI/UIWindow/PartySearch2/BtNext/mouseOver/0#";////紅沙漏
var wn1 = "#fUI/Basic.img/BtClaim/normal/0#";  //警燈
var yun2 ="#fUI/UIWindow/Quest/icon8/0#";////藍指標
var status = -1;
var giftNX = 10000;

function start() {
    status = -1;
    action(1, 0, 0);
}//裝備代碼：1142574 官方認證女生

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        var selStr = "     #e#r#v1142574##v1142574#『女生專用活動中心』#v1142574##v1142574#\r\n\r\n";
            selStr += "#e#b#L0#必看說明#l\r\n\r\n";
            selStr += "#e#d#L1#" + yun + " 領取女生每日福利(#r樂豆點 #kx#r10000#k #v5062000#x#r10#k #v5062002#x#r10#k #v5062500#x#r10#k #v4001784#x#r4#k #v5152053#x#r1#k#l)#l\r\n\r\n";
            //selStr += "  #r進入女生專用特色副本(暫未開放)\r\n";
        cm.sendSimple(selStr)
    } else if (status == 1) {
        switch (selection) {
        /*case 0:
            if (hour == 17 && (minute >= 0 && minute <= 30) && (weekday == 6)) {
                cm.warp(749050500,0);
                //cm.worldMessage(0x18, "『每週活動』" + " : " + "玩家 " + cm.getChar().getName() + " 進入了每週活動★手控遊戲★。");
                //cm.sendOk("本活動有2關,第二關掉下去則失敗,輸入@PM");
            } else {
                cm.sendOk("時間還沒到!");
            }
            break;*/
        case 0:
            cm.dispose();
            cm.sendOk("#e#r如何獲得女生認證勳章：\r\n#d  QQ私密群裡的客服管理並進行視頻認證，管理進行登記即可獲得女生認證勳章一枚。\r\n#e#r領取女生每日福利要求：\r\n#d  只有在本服贊助超過1000元以上，並常駐一個月，群內發言次數多的，才可以領取到這個女生免費福利。");
            break;
        case 1:
            if (cm.getPQLog("女生獎勵")<1 && cm.haveItem(1142574, 1)) {
                cm.setPQLog("女生獎勵");
               // cm.gainItem(4002001,4);
                //cm.gainItem(5150040,5);
                            cm.gainNX(1, giftNX);
                           // cm.gainItem(5152053, 1);
                            cm.gainItem(5062000, 10);
                            cm.gainItem(5062002, 10);
                            cm.gainItem(5062500, 10);
                            cm.gainItem(4001784, 4);
                //cm.gainMeso(2000000);
                //cm.gainItem(3800748, 1);
                cm.worldSpouseMessage(0x20, "『女生系統』" + " : " + "女生認證玩家 " + cm.getChar().getName() + " 成功領取每日女生福利。");
                cm.sendOk("領取成功\r\n祝你遊戲愉快!!");
            } else {
                cm.sendOk("你已經領取過了,或者你沒有把女生勳章取下來");
            }
            break;
        case 3:
                if (cm.haveItem(3800748, 1) && cm.getPlayerStat("GENDER") == 0) {
                    cm.gainItem(3800748, -1);
                    cm.gainItem(3700219, 1);//蜜蝴蝶沉迷認證
                    cm.sendOk("恭喜你獲得了#v3700219#");
                    cm.worldSpouseMessage(0x20, "『女生系統』" + " : " + "玩家 " + cm.getChar().getName() + " 成功獲取某人的芳心領取了女生給與他的獎勵。");
                    cm.dispose();
                } else {
                cm.sendOk("你沒有#v3800748#或者你不是男生。");
            }
            break;
        }
        cm.dispose();
    }
}
