var tt = "#fEffect/CharacterEff/1082565/0/0#"; //餅乾兔子
// 每個階段禮包所需的儲值數
var condition = new Array(200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200, 3400, 3600, 3800, 4000, 4200, 4400, 4600, 4800, 5000, 5200, 5400, 5600, 5800, 6000, 6200, 6400, 6600, 6800, 7000, 7200, 7400, 7600, 7800, 8000, 8200, 8400, 8600, 8800, 9000, 9200, 9400, 9600, 9800, 10000);
// 禮包內容
var reward = new Array(
                    // 禮包1
                    Array(1, 2048717, 3),          // 定居金一百萬


                    // 禮包2

                                         Array(2, 2048717, 3),//專屬紫金楓葉披風

                    // 禮包3
                    Array(3, 2048717, 3),     // 征服者幣


                    // 禮包4
                    Array(4, 2048717, 3),              //風

                    // 禮包5
                    Array(5, 2048717, 3),                  

                    // 禮包6
                    Array(6, 2048717, 3),                    

                    // 禮包7
                    Array(7, 2048717, 3),                    


                    // 禮包8
                    Array(8, 2048717, 3),                    

                        // 禮包9
                                     Array(9, 2048717, 3),        

                            // 禮包10
                                     Array(10, 2048717, 3),



                            // 禮包11
                                     Array(11, 2048717, 3),
 


                            // 禮包12
                                  Array(12, 2048717, 3),


                            // 禮包13
                                  Array(13, 2048717, 3), 

                            // 禮包14
                                  Array(14, 2048717, 3), 

                            // 禮包15
                                  Array(15, 2048717, 3), 


                            // 禮包16
                                  Array(16, 2048717, 3), 

                            // 禮包17
                                  Array(17, 2048717, 3), 

                            // 禮包18
                                  Array(18, 2048717, 3), 

                            // 禮包19
                                  Array(19, 2048717, 3), 

                            // 禮包20
                                  Array(20, 2048717, 3), 

                            // 禮包21
                                  Array(21, 2048717, 3), 

                            // 禮包22
                                  Array(22, 2048717, 3), 

                            // 禮包23
                                  Array(23, 2048717, 3), 

                            // 禮包24
                                  Array(24, 2048717, 3), 


                            // 禮包25
                                  Array(25, 2048717, 3), 

                            // 禮包26
                                  Array(26, 2048717, 3), 
                            // 禮包27
                                  Array(27, 2048717, 3), 
                            // 禮包28
                                  Array(28, 2048717, 3), 
                            // 禮包29
                                  Array(29, 2048717, 3), 
                            // 禮包30
                                  Array(30, 2048717, 3), 
                            // 禮包31
                                  Array(31, 2048717, 3), 
                            // 禮包32
                                  Array(32, 2048717, 3), 
                            // 禮包33
                                  Array(33, 2048717, 3), 
                            // 禮包34
                                  Array(34, 2048717, 3), 
                            // 禮包35
                                  Array(35, 2048717, 3), 
                            // 禮包36
                                  Array(36, 2048717, 3), 
                            // 禮包37
                                  Array(37, 2048717, 3), 

                            // 禮包38
                                  Array(38, 2048717, 3), 
                            // 禮包39
                                  Array(39, 2048717, 3), 
                            // 禮包39
                                  Array(40, 2048717, 3), 
                            // 禮包39
                                  Array(41, 2048717, 3), 
                            // 禮包39
                                  Array(42, 2048717, 3), 
                            // 禮包39
                                  Array(43, 2048717, 3), 
                            // 禮包39
                                  Array(44, 2048717, 3), 
                            // 禮包39
                                  Array(45, 2048717, 3), 
                            // 禮包39
                                  Array(46, 2048717, 3), 
                            // 禮包39
                                  Array(47, 2048717, 3), 
                            // 禮包39
                                  Array(48, 2048717, 3), 
                            // 禮包39
                                  Array(49, 2048717, 3), 
                            // 禮包39
                                  Array(50, 2048717, 3), 
                            // 禮包39
                                  Array(51, 2048717, 3), 
                            // 禮包39
                                  Array(52, 2048717, 3), 
                            // 禮包39
                                  Array(53, 2048717, 3), 
                            // 禮包39
                                  Array(54, 2048717, 3) 

                    );

var sel;
var status = -1;
var text;
var ljname;
var curlevel = -1;;
function start() {
    action(1, 0, 0);
}

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
        var revenue = cm.getHyPay(3);
        text = "\t\t\t" + tt + " #e#b棉花楓之谷▲儲值禮包中心#k#n " + tt + "\r\n\r\n#e#r注意：消耗空間需要有3個空格才能領取一次，不然我領取不到！\r\n\r\n";
        text += "#d#e當前總儲值金額數量： #r" + revenue.formatMoney(0, "") + " #d元#k\r\n#e";
        for (var i = 1; i <= condition.length; i++) {
            if (cm.getEventCount("累計儲值11" + i, 1) == 1) {
                text += "#d#L" + i + "#" + tt + " [#r已完成#d]累計儲值福利 #r\t\t\t" + condition[i - 1] + "#l\r\n";
                curlevel = curlevel == -1 ? i : curlevel;
            } else {
                text += "#d#L" + i + "#" + tt + " [未完成]累計儲值福利 #r\t\t\t" + condition[i - 1] + "#l\r\n";
            }
        }
        text += "#k";
        cm.sendSimple(text);
    } else if (status == 1) {
        sel = selection;
        text = "\t\t\t#e#r- 累計儲值" + condition[selection - 1] + "元福利 -#k#n\r\n\r\n";
        for (var i = 0; i < reward.length; i++) {
            if (reward[i][0] == selection) {
                text += "\t\t\t#i" + reward[i][1] + "# #z" + reward[i][1] + "#[" + reward[i][2] + "個]\r\n";
            }
        }
        cm.sendYesNo(text);
    } else if (status == 2) {
        if (cm.getEventCount("累計儲值11" + sel, 1) == 1) {
            cm.sendOk("#e#r\r\n\r\n\t\t這個禮包您已經領取過了");
            status = -1;
            //cm.dispose();
            return;
        }
        if (cm.getHyPay(3) < condition[sel - 1]) {
            cm.playerMessage(1, "累計金額未達標！");
            cm.dispose();
            return;
        }

        var rewardlist = new Array();
        for (var i = 0; i < reward.length; i++) {
            if (reward[i][0] == sel) {
                if (reward[i][3] == null)
                    reward[i][3] = -1;
                rewardlist.push(new Array(reward[i][1], reward[i][2], reward[i][3]));
            }
        }
        if (!cm.canHoldSlots(rewardlist.length)) {
            cm.sendOk("包裹空間不足，請確保包裹每個欄位有至少 " + rewardlist.length + " 格空間");
            cm.dispose();
            return;
        }
        for (var i = 0; i < rewardlist.length; i++) {
            if (rewardlist[i][0] == 2430865) {
                cm.gainItem(rewardlist[i][0], rewardlist[i][1], rewardlist[i][2]);
            } else {
                cm.gainItem(rewardlist[i][0], rewardlist[i][1]);
            }
        }
        cm.setEventCount("累計儲值11" + sel, 1);
        cm.playerMessage(1, "領取成功");
        cm.worldSpouseMessage(0x20, "≡累計儲值≡　　恭喜玩家 " + cm.getChar().getName() + " 領取了累計儲值 " + condition[sel - 1] + " 元的福利禮包！！！");
        cm.dispose();
    }
}

Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : "　";
    thousand = thousand || ",";
    decimal = decimal || ".";
    var number = this,
        negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};