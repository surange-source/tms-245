
var status = -1;
var text;
var sel;
var time;
var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var ca = java.util.Calendar.getInstance();
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //獲得小時
var minute = ca.get(java.util.Calendar.MINUTE);//獲得分鐘
var second = ca.get(java.util.Calendar.SECOND); //獲得秒

// 每個禮包所需的在線時長
var condition = new Array(60, 120,360,720,1080);
var reward = new Array(// 禮包編號、道具id、數量
                    // 禮包30
                    Array(1, 10000, 1),
                    Array(1, 5000, 2),
                    Array(2, 13000, 1),
                    Array(2, 8000, 2),
                    Array(3, 16000, 1),
                    Array(3, 15000, 2),
                    Array(4, 20000, 1),
                    Array(4, 20000, 2),
                    Array(5, 25000, 1),
                    Array(5, 25000, 2),
                    Array(5, 5, 3)
 
 

                    );

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0)
    {
        cm.dispose();
        return;
    }
    if (mode == 1)
    {
        status++;
    } else {
        status--;
    }
if (cm.haveItem(4001443,1)){
        var A = 40;
    }else{
        var A = 20;
    }
    if (cm.haveItem(4034496,1)){
        //A = A+1080;
    }
    var time = cm.getOnlineTime()+A;
    var curlevel = -1;

    if (status == 0) {
        text = "#e#d您今天在糖糖楓之谷世界時長為： #r" + time + "#k #d分鐘#n#k\r\n#e#d提示#n#k：#e#r23：50#n #b至#r #e00：10#n #b時無法領取在線獎勵。#k\r\n#b請在 #e#r23：50#n#b 分前領取當天未領取的獎勵。以免造成損失。#k\r\n ";
        for (var i = 1; i <= condition.length; i++) {
            text += "#e#b#L" + i + "#"+aaa+" 領取在線" + condition[i-1] + "分鐘獎勵";
            if (cm.getEventCount("在線樂豆點禮包" + i) > 0) {
                text += "(已領取)";
                curlevel = curlevel == -1 ? i : curlevel;
            }
            text += "#l\r\n";
        }
        text += "#k";
        cm.sendSimple(text);
    } else if (status == 1) {
        // 23:50 ~ 23: 59 前一天不領取的時間  00:00 ~ 00:10 第二天不領取的時間  
        if ((hour == 23 && (minute >= 50 && minute <= 59)) || (hour == 0 && (minute >= 0 && minute <= 10))){
            cm.sendOk("#d伺服器當前時間： #r" + hour +" 時 " + minute + " 分 " + second + " 秒#k\r\n\r\n#e#d提示#n#k：#r23 ： 50 #b至#r 00 ： 10 #b時無法領取在線獎勵。#k");
            cm.dispose();
            return;
        }
        if (cm.getEventCount("在線樂豆點禮包" + selection) > 0) {
            cm.sendOk("這個禮包您已經領取過了");
            cm.dispose();
            return;
        }
        sel = selection;
        text = "\t\t\t\t#e#r- 在線 " + condition[selection - 1] + " 分鐘獎勵 -#k#n\r\n\r\n";
        for (var i = 0; i < reward.length; i++) {
            if (reward[i][0] == selection) {
                if (reward[i][2]==1){
                    var A = "樂豆點";
                }else if(reward[i][2]==2){
                    var A = "楓點";
                }else if(reward[i][2]==3){
                    var A = "餘額";
                }
                text += "\t獎勵 "+reward[i][1]+" "+A+"\r\n";
            }
        }
        cm.sendYesNo(text);
    } else if (status == 2) {
        if (time < condition[sel-1]) {
            cm.sendOk("在線時間不足，無法領取。");
            cm.dispose();
            return;
        }
        var rewardlist = new Array();
        for (var i = 0; i < reward.length; i++) {
            if (reward[i][0] == sel) {
                rewardlist.push(new Array(reward[i][1], reward[i][2]));
            }
        }
        for (var i = 0; i < rewardlist.length; i++) {
            if (rewardlist[i][1]==3){
                cm.addHyPay(-rewardlist[i][0]);
            }else{
                cm.gainNX(rewardlist[i][1], rewardlist[i][0]);
            }
        }
        cm.setEventCount("在線樂豆點禮包" + sel);
        cm.playerMessage(1, "領取成功！");
        cm.worldSpouseMessage(0x20,"『在線時間獎勵』" + " : " + "玩家 " + cm.getChar().getName() + " 領取了在線 " + condition[sel-1] + " 分鐘獎勵。");
        //cm.worldMessageYellow("『在線時間獎勵』" + " : " + "玩家 " + cm.getChar().getName() + " 領取了在線 " + condition[sel-1] + " 分鐘獎勵。");
        cm.dispose();
    }
}

