
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
var condition = new Array(30, 60, 120, 180, 240,360,480,600,720,1080);
var reward = new Array(// 禮包編號、道具id、數量
                    // 禮包30
                    Array(1, 4310014, 1),
                    Array(2, 4310014, 1),
                    Array(3, 4310014, 1),
                    Array(4, 4310014, 2),
                    Array(5, 4310014, 2),
                    Array(6, 4310014, 2),
                    Array(7, 4310014, 2),
                    Array(8, 4310014, 2),




                    Array(1, 5072000, 2),

                    Array(1, 2431738, 1),//500楓點
                    //Array(1, 2430069, 1),//箱子
                    Array(1, 2000005, 10),//超級藥水
                    //Array(1, 5062000, 5),//神奇模仿
                    //Array(1, 4310030, 10),//運動
                    //Array(1, 4310036, 20),//征服

                    // 禮包60
                    //Array(2, 4034232, 1),
                    Array(2, 5072000, 5),
                    Array(2, 4001713, 2),
                    //Array(2, 2049002, 3),
                    Array(2, 2000005, 100),//超級藥水
                    //Array(2, 5062009, 20),
                    //Array(2, 2340000, 2),//祝福卷
                    //Array(2, 2430069, 1),
                    //Array(2, 2431739, 100),//
                    //Array(2, 5062000, 15),//紅方塊
                    Array(2, 4310030, 5),
                    Array(2, 4310036, 5),

                    // 禮包120
                    Array(3, 2049002, 2),
                    //Array(3, 4034232, 1),
                    Array(3, 5072000, 5),
                    //Array(3, 5062009, 20),
                                       // Array(3, 2431740, 1),
                    //Array(3, 5062002, 10),
                    //Array(3, 5062000, 15),
                    //Array(3, 2430069, 1),
                    //Array(3, 2340000, 3),//祝福卷
                    //Array(3, 5064000, 2),
                    Array(3, 4310030, 10),
                    Array(3, 4310036, 25),

                    // 禮包180
                    //Array(4, 4001714, 30),
                    Array(4, 2049002, 3),
                    Array(4, 5072000, 5),
                    Array(4, 5062002, 10),
                    //Array(4, 5062000, 15),
                    Array(4, 5064000, 2),
                    //Array(4, 5062009, 20),
                    //Array(4, 2049702, 1),
                    //Array(4, 2430069, 1),
                    //Array(4, 2340000, 5),//祝福卷
                    //Array(4, 4310110, 2),//春節
                    //Array(4, 2300000, 5),
                    //Array(4, 2431741, 1),
                    Array(4, 4310030, 20),
                    Array(4, 4001839, 30),
                    Array(4, 4310036, 30),
                    //Array(4, 2049135, 1),
                    //Array(4, 4310036, 50),

                    // 禮包7 240
                    //Array(5, 4001714, 50),
                    Array(5, 2049002, 4),
                    //Array(5, 3010073, 1),  //卡片
                    //Array(5, 2049400, 5),
                    //Array(5, 5072000, 2),
                    //Array(5, 2431741, 1),
                    Array(5, 2049702, 1),
                    //Array(5, 2049301, 5),
                    //Array(5, 2049122, 5),
                    /*Array(5, 5062009, 10),
                    Array(5, 5062500, 30),
                    Array(4, 5062500, 30),
                    Array(3, 5062500, 20),
                    Array(2, 5062500, 10),*/
                    Array(5, 5062002, 5),
                    //Array(5, 5064000, 5),
                    //Array(5, 2340000, 5),//祝福卷
                    //Array(5, 2430069, 1),
                    //Array(5, 4310110, 3), 
                    //Array(5, 2300000, 8),
                    Array(5, 4310030, 20),
                    Array(5, 4310036, 30),//
                    Array(5, 4001839, 30),
                    //Array(5, 4001832, 10),
                    // 禮包8 600
                    Array(8, 2049400, 6),
                    Array(8, 4001839, 30),//xingxing
                    //Array(8, 4310110, 5),//chunjieb
                    //Array(8, 2049323, 2),//wusun
                    Array(8, 2049122, 2),
                    //Array(8, 2049752, 1),
                    Array(8, 2049002, 8),//baiyi
                    //Array(8, 4001714, 2),//Sqianneng
                    //Array(8, 4001714, 5),//dingjujin
                    Array(8, 2340000, 2),//祝福卷
                    Array(8, 5064000, 2),//fangbao
                    Array(8, 5062009, 10),
                    Array(8, 5062500, 15),//dashimofang
                    Array(8, 5062002, 10),//高級生氣方塊
                    //Array(8, 2430069, 1),//組墨綠箱子
                    //Array(8, 2431743, 2),//楓點
                    Array(8, 4001832, 100),
                    //Array(8, 4000463, 6),
                    //480
                                        Array(7, 2049002, 8),
                    //Array(7, 2049400, 6),
                    //Array(7, 5072000, 5),
                    //Array(7, 2431741, 2),
                    Array(7, 2049702, 2),//A
                    Array(7, 2049301, 10),
                    Array(7, 2049122, 2),
                    Array(7, 5062009, 5),
                    Array(7, 5062500, 10),
                    //Array(7, 5062002, 20),
                    Array(7, 5064000, 2),
                    Array(7, 2340000, 2),//祝福卷
                    //Array(7, 2430069, 1),
                    //Array(7, 4310110, 3), 
                    //Array(7, 2300000, 8),
                    Array(7, 4310030, 30),
                    Array(7, 4310036, 30),//
                    Array(7, 4001832, 100),
//360
                                        Array(6, 2049002, 5),
                    Array(6, 2049400, 5),
                    //Array(6, 5072000, 5),
                    //Array(6, 2431743, 1),
                    Array(6, 2049702, 1),
                    Array(6, 2049301, 5),
                    //Array(6, 2049122, 5),
                    //Array(6, 5062009, 5),
                    //Array(6, 5062500, 5),
                    Array(6, 5062002, 10),
                    Array(6, 5064000, 2),
                    Array(6, 2340000, 2),//祝福卷
                    //Array(6, 2430069, 1),
                    //Array(6, 4310110, 3), 
                    //Array(6, 2300000, 8),
                    Array(6, 4310030, 20),
                    Array(6, 4310036, 30),//
                    Array(6, 4001832, 100),
//720
                    Array(9, 5062009, 15),
                    Array(9, 5062500, 10),
                    Array(9, 5062002, 10),
                    Array(9, 4001839, 100),
                    Array(9, 2340000, 5),//祝福卷
                    Array(9, 5064000, 3),//fangbao
                    Array(9, 2049752, 2),
                    Array(9, 2049122, 5),
                    Array(9, 2049028, 2),//組墨綠箱子
                    //Array(9, 2431741, 3),//楓點
                    Array(9, 2460003, 10),
                    Array(9, 4001714, 5),//dingjujin
                    Array(9, 4001832, 200),
//1080
                    Array(10, 5062009, 20),
                    Array(10, 5062500, 20),
                    Array(10, 5062002, 20),
                    Array(10, 2431046, 1),
                    Array(10, 4001832, 300),
                    Array(10, 2460003, 20),
                    Array(10, 5062000, 20),//組墨綠箱子

                    //Array(10, 2431741, 3),//楓點
                    Array(1, 4001839, 30),
                    Array(2, 4001839, 30),
                    Array(3, 4001839, 30),
                    
                    Array(6, 4001839, 30),
                    Array(7, 4001839, 30),
                    
                    Array(10, 4001839, 100),
                    Array(10, 5537000, 20),
                    Array(10, 5743003, 20)
                    //Array(10, 4001714, 2)    //dingjujin
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
    var conn = cm.getConnection();
    var pstmt = conn.prepareStatement("select mac from hypay ");
    var result = pstmt.executeQuery();
        result.next();
        revenue = result.getString("mac");
    var time = cm.getOnlineTime();
    var curlevel = -1;

    if (status == 0) {
        text = "#e#d您今天在糖糖楓之谷世界時長為： #r" + time + "#k #d分鐘#n#k\r\n#e#d提示#n#k：#e#r23：50#n #b至#r #e00：10#n #b時無法領取在線獎勵。#k\r\n#b請在 #e#r23：50#n#b 分前領取當天未領取的獎勵。以免造成損失。#k\r\n ";
        for (var i = 1; i <= condition.length; i++) {
            text += "#e#b#L" + i + "#"+aaa+" 領取在線" + condition[i-1] + "分鐘獎勵";
            if (cm.getEventCount("在線禮包" + i) > 0) {
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
        if (cm.getEventCount("在線禮包" + selection) > 0) {
            cm.sendOk("這個禮包您已經領取過了");
            cm.dispose();
            return;
        }
        sel = selection;
        text = "\t\t\t\t#e#r- 在線 " + condition[selection - 1] + " 分鐘獎勵 -#k#n\r\n\r\n";
        for (var i = 0; i < reward.length; i++) {
            if (reward[i][0] == selection) {
                text += "\t\t\t#i" + reward[i][1] + "# #z" + reward[i][1] + "#[" + reward[i][2] + "個]\r\n";
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
        if (!cm.canHoldSlots(rewardlist.length)) {
            cm.sendOk("包裹空間不足，請確保包裹每個欄位有至少 " + rewardlist.length + " 格空間");
            cm.dispose();
            return;
        }
        for (var i = 0; i < rewardlist.length; i++) {
            cm.gainItem(rewardlist[i][0], rewardlist[i][1]);
        }
        var mac = cm.getClient().geiMac()+""+sel;
        var sql="insert into mac(mac) values ('"+mac+"');
                     var conn = cm.getConnection();
                     var pstmt = conn.prepareStatement(sql);
                         pstmt.executeUpdate();
        cm.setEventCount("在線禮包" + sel);
        cm.playerMessage(1, "領取成功！");
        cm.worldSpouseMessage(0x20,"『在線時間獎勵』" + " : " + "玩家 " + cm.getChar().getName() + " 領取了在線 " + condition[sel-1] + " 分鐘獎勵。");
        //cm.worldMessageYellow("『在線時間獎勵』" + " : " + "玩家 " + cm.getChar().getName() + " 領取了在線 " + condition[sel-1] + " 分鐘獎勵。");
        cm.dispose();
    }
}

