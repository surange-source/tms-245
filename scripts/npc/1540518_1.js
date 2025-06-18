
var status = -1;
var text;
var diff;
var sel;
var time;
var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var ca = java.util.Calendar.getInstance();
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //獲得小時
var minute = ca.get(java.util.Calendar.MINUTE);//獲得分鐘
var second = ca.get(java.util.Calendar.SECOND); //獲得秒

// 每個禮包所需的線上時長
var condition = new Array(30, 60, 120, 360, 600, 840);
var reward = new Array(// 禮包編號、道具id、數量
                    // 30
                    //Array(1, 2450062, 1), //雙倍經驗
                    Array(1, 4001713, 2), //定居金20W
                    //Array(1, 5062002, 10),  // 高級神奇方塊
                    //Array(1, 5062000, 10),   //神奇方塊
                    //Array(1, 2431738, 1),
                    Array(1, 2431739, 2), //楓點2000

                    // 60
                    Array(2, 2000005, 200), //超級藥水
                    Array(2, 4310030, 30),  //運動會幣
                    Array(2, 5062002, 40),    // 高級神奇方塊
                    Array(2, 4310036, 30), //征服者幣
                                        Array(2, 2431739, 5), //楓點5000
                    
                    // 120
                    Array(3, 5062009, 30),    // 超級神奇方塊
                    Array(3, 4310030, 30),  //運動會幣
                                        Array(3, 5064000, 5), //防爆卷軸
                                        Array(3, 2340000, 5), //zhufu
                    //Array(3, 2049402, 1),       //特殊潛能附加卷軸 100%
                    //Array(3, 4001785, 1),          // 定居金五百萬
                    Array(3, 4310036, 30), //征服者幣
                    //Array(3, 2614000, 3),

                    // 360
                    Array(4, 5062009, 50),    // 超級神奇方塊
                    Array(4, 4310030, 50),  //運動會幣
                                        Array(4, 5064000, 5), //防爆卷軸
                                        Array(4, 5062500, 30), //大師附加神奇方塊
                                        Array(4, 2340000, 1), //zhufu
                            Array(4, 2049752, 1), // 特殊潛能附加卷軸 80%
                    Array(4, 2431739, 5), //楓點5000
                    Array(4, 4310036, 30), //征服者幣

                    // 540
                    //Array(5, 5062010, 10),    // 終極神奇方塊
                    Array(5, 5062009, 30),   //超級神奇方塊
                                        Array(5, 5062500, 30), //大師附加神奇方塊
                                        Array(5, 5064000, 5), //防爆卷軸
                                        Array(5, 2340000, 5), //zhufu
                            Array(5, 2049752, 1), // 特殊潛能附加卷軸 80%
                            Array(5, 4310036, 30), //征服者幣
                    Array(5, 2431739, 15), //楓點15000
                    Array(4, 4310030, 50),  //運動會幣

                                        // 840
                    Array(6, 5062010, 30),    // 終極神奇方塊
                    Array(6, 5062009, 20),   //超級神奇方塊
                                        Array(6, 5062500, 30), //大師附加神奇方塊
                                        Array(4, 4310030, 80),  //運動會幣
                                        Array(5, 4310036, 50), //征服者幣
                                        Array(6, 5062024, 10), //閃炫
                                        Array(6, 5062503, 3), //附加潛能記憶
                    Array(6, 2049752, 2),       //特殊潛能附加卷軸 100%
                            Array(6, 2028175, 4), // 宿命正義卷軸箱
                    Array(6, 2431739, 5),
                    Array(6, 2614001, 1)
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

    var time = cm.getOnlineTime();
    var curlevel = -1;

    if (status == 0) {
        text = "#e#d您今天在" + cm.getServerName() + "世界時長為： #r" + time + "#k #d分鐘#n#k\r\n#e#d提示#n#k：#e#r23 ： 50#n #b至#r #e00 ： 10#n #b時無法領取在線獎勵。#k\r\n#b請在 #e#r23：50#n#b 分前領取當天未領取的獎勵。以免造成損失。服務中心內還有免費樂豆點可以領哦~#k\r\n\r\n";
        for (var i = 1; i <= condition.length; i++) {
            text += "#b#L" + i + "#"+aaa+" 領取在線" + condition[i-1] + "分鐘獎勵";
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
                if (reward[i][3] == null || reward[i][3] == '')
                    reward[i][3]=0;
                rewardlist.push(new Array(reward[i][1], reward[i][2], reward[i][3]));
            }
        }
        if (!cm.canHoldSlots(rewardlist.length)) {
            cm.sendOk("包裹空間不足，請確保包裹每個欄位有至少 " + rewardlist.length + " 格空間");
            cm.dispose();
            return;
        }
        for (var i = 0; i < rewardlist.length; i++) {
            if (rewardlist[i][2] != 0) {
                //有期限道具
                cm.gainItemPeriod(rewardlist[i][0], rewardlist[i][1], rewardlist[i][2]);
                //java.lang.System.out.println("有");
            } else {
                //無期限道具
                cm.gainItem(rewardlist[i][0], rewardlist[i][1]);
            }
        }
        cm.setEventCount("在線禮包" + sel);
        cm.playerMessage(1, "領取成功！");
        //cm.worldMessage("『線上時間獎勵』" + " : " + "玩家 " + cm.getChar().getName() + " 領取了線上 " + condition[sel-1] + " 分鐘獎勵。");
        /*if (sel == 4) {
            cm.finishActivity(120108);
        } else if (sel == 5) {
            cm.finishActivity(120109);
        }*/
        cm.dispose();
    }
}