/* 
    累積儲值領取禮包
*/
var ca = java.util.Calendar.getInstance();
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //獲得小時
var minute = ca.get(java.util.Calendar.MINUTE);//獲得分鐘
var second = ca.get(java.util.Calendar.SECOND); //獲得秒

// 最高累積天數
var day = 7;
// 每個階段禮包所需的儲值數
var condition = new Array(30, 50, 100, 200, 500, 1000, 1500, 2000);
// 禮包內容
var reward = new Array(
                    // 禮包1 30
                    Array(1, 5062002, 1),
                    Array(1, 5064000, 1),
                    Array(1, 2340000, 1),

                    // 禮包2 50
                    Array(2, 5062002, 2),
                    Array(2, 5064000, 2),
                    Array(2, 2340000, 2),

                    // 禮包3 100
                    Array(3, 5062002, 3),
                    Array(3, 5064000, 3),
                    Array(3, 2340000, 3),

                    // 禮包4 200
                    Array(4, 5062002, 5),
                    Array(4, 5062500, 5),
                    Array(4, 5064000, 5),
                    Array(4, 2340000, 5),

                    // 禮包5 500
                    Array(5, 2049116, 5),
                    Array(5, 2049124, 5),
                    Array(5, 5062002, 5),
                    Array(5, 5062500, 5),
                    Array(5, 5062009, 5),
                    Array(5, 5064000, 5),
                    Array(5, 2340000, 5),
                    
                    // 禮包6 1000
                    Array(6, 2049116, 10),
                    Array(6, 2049124, 10),
                    Array(6, 5062002, 10),
                    Array(6, 5062500, 10),
                    Array(6, 5062009, 10),
                    Array(6, 5064000, 10),
                    Array(6, 2340000, 10),

                    // 禮包7 1500
                    Array(7, 2049116, 15),
                    Array(7, 2049124, 15),
                    Array(7, 5062002, 15),
                    Array(7, 5062500, 15),
                    Array(7, 5062009, 15),
                    Array(7, 5064000, 15),
                    Array(7, 2340000, 15),
                    Array(7, 2049323, 15),

                    // 禮包8 2000
                    Array(8, 3994417, 1),
                    Array(8, 2049116, 20),
                    Array(8, 2049124, 20),
                    Array(8, 5062002, 20),
                    Array(8, 5062500, 20),
                    Array(8, 5062009, 20),
                    Array(8, 5064000, 20),
                    Array(8, 2340000, 20),
                    Array(8, 2049323, 20)
                    );


var status = -1;
var text;
var paylog;
var sel;
var daily = "每日儲值禮包";
var grandtotal = "7天累計儲值禮包";
var giftname;

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

    if (status == 0) {
        paylog = cm.getSevenDayPayLog(day);
        text = "\t\t\t\t#e- 儲值禮包領取 -#n\r\n\r\n";
        text += "#d您總共儲值金額為： #r" + cm.getPlayer().getTWD() + "\r\n";
        text += "#d您今日儲值金額為： #r"+ getTodayTWD() +"\r\n\r\n#n#b";
        //text += paylog + "#n\r\n#b";
        
        var loop = false;
        for (var i = 0; i < condition.length; i++) {
            giftname = (daily) + (i + 1);

            text += "#L" + i + "#領取每日儲值#r" + condition[i] + "#b元獎勵";

            if (cm.getPlayer().getBossLogAcc(giftname) > 0) {
                text += "(已領取)";
            }
            text += "#l\r\n";
        }

        cm.sendOk(text);
    } else if (status == 1) {
        // 23:50 ~ 23: 59 前一天不領取的時間  00:00 ~ 00:10 第二天不領取的時間  
        if ((hour == 23 && (minute >= 50 && minute <= 59)) || (hour == 0 && (minute >= 0 && minute <= 10))){
            cm.sendOk("#d伺服器當前時間： #r" + hour +" 時 " + minute + " 分 " + second + " 秒#k\r\n\r\n#e#d提示#n#k：#r23 ： 50 #b至#r 00 ： 10 #b時無法領取在線獎勵。#k");
            cm.dispose();
            return;
        }
        sel = selection + 1;
        giftname = (daily) + (sel);
        if (cm.getPlayer().getBossLogAcc(giftname) > 0) {
            cm.sendOk("這個禮包您已經領取過了");
            cm.dispose();
            return;
        }
        text = "\t\t\t\t#e- 禮包內容 -#n\r\n\r\n";
        for (var i = 0; i < reward.length; i++) {
            if (reward[i][0] == sel) {
                text += "\t\t\t#i" + reward[i][1] + "# #z" + reward[i][1] + "#[" + reward[i][2] + "個]\r\n";
            }
        }
        cm.sendYesNo(text);
    } else if (status == 2) {
        var twd = condition[sel - 1];
        if (sel <= condition.length) {
            if (getTodayTWD() < twd) {
                cm.sendOk("您今日儲值不滿" + rmb + "元，無法領取這個禮包。");
                cm.dispose();
                return;
            }
        }
        var rewardlist = new Array();
        for (var i = 0; i < reward.length; i++) {
            if (reward[i][0] == sel) {
                rewardlist.push(new Array(reward[i][1], reward[i][2]));
            }
        }
        if (!cm.canHoldSlots(rewardlist.length)) {
            cm.sendOk("包裹空間不足，請確保包裹每個欄位有至少 " + rewardlist.length + " 格空間");
            cm.dispose();
            return;
        }
        for (var i = 0; i < rewardlist.length; i++) {
            cm.gainItem(rewardlist[i][0], rewardlist[i][1]);
        }
        cm.setBossLogAcc(giftname);
        cm.playerMessage(1, "領取成功！");
        cm.channelMessage(0x18, "『每日儲值』" + " : " + "玩家 " + cm.getChar().getName() + " 領取了每日儲值 " + condition[sel-1] + " 元獎勵。");
        cm.dispose();
    }
}
function getTWD() {
    var ret = 0;
    var conn = cm.getConnection();
    var UpDateData = conn.prepareStatement("SELECT rmb FROM accounts WHERE id = ?");
    UpDateData.setInt(1, cm.getPlayer().getAccountID());
    var rs = UpDateData.executeQuery();
    if (rs.next())
    {
        ret = rs.getInt("rmb");
    }
    UpDateData.close();
    return ret;
}

function gainTWD(times) {
    var conn = cm.getConnection();
    var UpDateData = conn.prepareStatement("UPDATE accounts SET rmb = rmb + ? WHERE id = ?");
    UpDateData.setInt(1, times);
    UpDateData.setInt(2, cm.getPlayer().getAccountID());
    UpDateData.executeUpdate();
    UpDateData.close();
}