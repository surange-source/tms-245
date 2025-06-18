/*      
 *  
 *  功能：快樂聖誕
 *  
 */
﻿var status = 0;
var random = java.lang.Math.floor(Math.random() * 4);
var a = "#fEffect/CharacterEff/1114000/1/0#"; //紅色六芒星
var b = "#fEffect/CharacterEff/1003271/0/0#";
var c = "#fEffect/CharacterEff/1112905/0/0#"; //籃心
var d = "#fEffect/CharacterEff/1002667/0/0#"; //黃星
var e = "#fEffect/CharacterEff/1003252/1/0#"; //音樂
var g = "#fEffect/CharacterEff/1082565/0/0#"; //餅乾兔子
var h = "#fUI/Basic/BtHide3/mouseOver/0#";
var f = "#fEffect/CharacterEff/1112904/2/1#";//彩色五角星

var ca = java.util.Calendar.getInstance();
var year = ca.get(java.util.Calendar.YEAR); //獲得年份
var month = ca.get(java.util.Calendar.MONTH) + 1; //獲得月份
var day = ca.get(java.util.Calendar.DATE);//獲取日
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //獲得小時
var minute = ca.get(java.util.Calendar.MINUTE);//獲得分鐘
var second = ca.get(java.util.Calendar.SECOND); //獲得秒
var weekday = ca.get(java.util.Calendar.DAY_OF_WEEK); //獲得星期
var time = new Date();
var sjr = time.getDay();
var pdtp = 0;
switch (sjr) {
    case 0:
        var xq = "星期日";
        break;
    case 1:
        var xq = "星期一";
        break;
    case 2:
        var xq = "星期二";
        break;
    case 3:
        var xq = "星期三";
        break;
    case 4:
        var xq = "星期四";
        break;
    case 5:
        var xq = "星期五";
        break;
    case 6:
        var xq = "星期六";
        break;
    default:
}
if (hour > 12) {
    hour -= 12;
    var apm = "下午好";
} else {
    var apm = "上午好";
}
function start() {
    status = -1;
    action(1, 0, 0);
}

//22222
function action(mode, type, selection) {
    if (cm.getEventCount("快樂聖誕") <= 0) {
        var sdsj = "0";
        var sdsj1 = "1";
    } else {
        var sdsj = "1";
        var sdsj1 = "0";
    }

    if (cm.getEventCount("聖誕樂豆點", 1) > 0) {
        var sddj = cm.getEventCount("聖誕樂豆點", 1);
    } else {
        var sddj = "0";
    }

    if (status == 0 && mode == 0) {
        //cm.sendOk("#e#r　本商舖歡迎您的再次光臨!我們竭誠為你服務!!");
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (cm.getMapId() == 180000001) {
        cm.sendOk("很遺憾，您因為違反用戶守則被禁止遊戲活動，如有異議請聯繫管理員.")
        cm.dispose();
    } else if (status == 0) {
        var txt = "\r\n#d┌═══════════快樂聖誕══════════┐#k\r\n";
        txt += "\t\t\t　#d#e※　活動要求請仔細閱讀#k#n　#d※#k#n\r\n";
        txt += "　#b※ 當前已完成 [ #r" + sdsj + "#b ] 　　　　 　今天可參與 [ #r" + sdsj1 + "#b ] ※#k  \r\n";
        txt += "　#b※ 收集聖誕道具 [ #z4001231# ] [ #z4001395# ] ※#k#n\r\n";
        txt += "　#b※ 並且保證兩者數量 [ #r500#b ] 個 #r所有怪都有爆率#b　※#k#n\r\n　#b※ #r萬能傳送 - 快速練級 - 大蘑菇 （#g藍蝸牛 可爆#b）#b ※\r\n\r\n";
        txt += "　#b※ 當前擁有#z4001231#數量：\t\t\t　#r" + cm.itemQuantity(4001231) + " / 500 個#b\r\n";
        txt += "　#b※ 當前擁有#z4001395#數量：\t\t#r" + cm.itemQuantity(4001395) + " / 500 個#b\r\n";
        txt += "　#d　　　 當前已累計獲得樂豆點數量：#r" + sddj + "#d 樂豆點#k\r\n";
        txt += "#d└═════════════════════════┘#k";
        //cm.sendYesNoS(txt, 2);
        txt += !cm.isQuestActive(22222) ? " #b#L0#接受任務#l#k  " : " ";
        txt += cm.isQuestActive(22222) ? " #r#L1#提交任務#l  " : " ";
        txt += cm.isQuestActive(22222) ? " #b#L2#放棄任務#l  " : " ";
        cm.sendSimple(txt);
    } else if (status == 1) {
        if (selection == 0) {
            var txt = "\r\n#d┌═══════════快樂聖誕══════════┐#k\r\n\r\n";
            txt += "　#b※            是否要開始執行這個任務呢　  　     ※#k#n\r\n\r\n";
            txt += "　#b※ 如確認請單擊 [ #r是#b ]　　　　否則請單擊 [ #r否#b ]　※#k#n\r\n\r\n";
            txt += "　#b※ 如玩家提供的數量正確　將領到  #r20000#b　 樂豆點　　※#k#n\r\n\r\n";
            txt += "#d└═════════════════════════┘#k\r\n\r\n";
            cm.sendYesNoS(txt, 2);
        } else if (selection == 1) {
            if (cm.getEventCount("快樂聖誕") > 0) {
                cm.playerMessage(1, "　" + cm.getChar().getName() + "\r\n\r\n　尊敬的玩家抱歉\r\n\r\n今天您已參與過此活動請明再來");
                cm.dispose();
                return;
            }
            if (!cm.isQuestActive(22222)) {
                cm.sendOk("你還沒有進行這個任務了。");
                cm.dispose();
                return;
            }
            if (cm.haveItem(4001231, 500) && cm.haveItem(4001395, 500)) {
                cm.gainItem(4001231, -500);
                cm.gainItem(4001395, -500);
                //---------------------------//
                cm.gainNX(1, 20000);
                cm.setEventCount("快樂聖誕");
                cm.setEventCount("聖誕樂豆點", 1, 20000);
                cm.forceCompleteQuest(22222);
                cm.playerMessage(1, "　" + cm.getChar().getName() + "\r\n\r\n　尊敬的玩家恭喜你\r\n\r\n已完成快樂聖誕 - 領樂豆點 [ 20000 ]");
                cm.worldSpouseMessage(0x01, "※ 快樂聖誕 ※ : 恭喜玩家[ " + cm.getPlayer().getName() + " ]完成 快樂聖誕 並獲得 20000 樂豆點 ●ω●");
                cm.dispose();
            } else {
                cm.playerMessage(1, "　" + cm.getChar().getName() + "\r\n\r\n　尊敬的玩家非常抱歉\r\n\r\n你的道具不齊全 請檢查道具數量");
                cm.dispose();
            }
        } else if (selection == 2) {
            cm.playerMessage(1, "　" + cm.getChar().getName() + "\r\n\r\n　你已經放棄了這個任務！");
            cm.forceCompleteQuest(22222);
            cm.setEventCount("快樂聖誕");
            cm.dispose();
        }
    } else if (status == 2) {
        if (!cm.isQuestActive(22222)) {
            cm.forceStartQuest(22222, "1");
            cm.playerMessage(1, "那麼現在就開始去收集把！");
        } else {
            cm.sendOk("你已經在進行這個任務了。");
        }
        cm.dispose();
    }
}