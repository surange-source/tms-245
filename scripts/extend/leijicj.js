
var status = -1;
var text;
var sel;
var twd;
var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

// 每個禮包所需的儲值金額
var condition = new Array(100, 500, 1000, 3000, 5000, 8000);
var reward = new Array(// 禮包編號、道具id、數量

                    Array(4, 3010054, 1),
                    Array(4, 3010059, 1),
                    Array(4, 2431945, 1),
                                Array(4, 2431944, 1),
                    Array(4, 2430026, 1),
                                Array(4, 2049419, 2),
                                Array(4, 3010976, 1),//100


                    // 禮包7
                                        Array(7, 2431938, 1),
                                        Array(7, 3012028, 1),
                                        Array(7, 2431673, 1),
                                        Array(7, 2431926, 2),
                                        Array(7, 4001785, 10),

                    // 禮包8
                    Array(8, 3010832, 1),
                    Array(8, 2049323, 20),
                    Array(8, 3994417, 1),//1000
                    Array(8, 3994418, 1),
                    Array(8, 3994419, 1),

                    Array(8, 3010038, 1),
                    Array(8, 4001715, 1),
                    Array(8, 2610001, 4),
                    
                    // 禮包9
                    Array(9, 4161008, 1),
                    Array(9, 2049323, 50),
                    Array(9, 1142796, 1),
                    Array(9, 2432397, 1),
                    Array(9, 3994417, 1),//2000
                    Array(9, 3994418, 1),
                    Array(9, 3994419, 1),
            
                    Array(9, 3010073, 1),
                    Array(9, 2610001, 6),
                    
                    // 禮包10
                    //Array(10, 1142796, 1),//3000
                    Array(10, 2049323, 100),
                    Array(10, 3994417, 3),
                    Array(10, 3994418, 2),
                    Array(10, 3994419, 2),
                    Array(10, 3994420, 1),
                    //Array(10, 3994420, 1),
                    Array(10, 3994421, 1),
                    Array(10, 3994422, 1),
                                        Array(10, 1152160, 1),
                    Array(10, 2431991, 2),
    
                    Array(10, 2049137, 100),//驚人40
                    //Array(10, 3010696, 1),
                    //Array(10, 1112179, 1),
                    Array(10, 1112279, 1),
                    Array(10, 3010751, 1),
                    Array(10, 3010070, 1),
                    Array(10, 3010519, 1),
                    Array(10, 3015058, 1),
                    Array(10, 3015060, 1),
                    Array(10, 3010566, 1),
                                        Array(10, 4001715, 3),
                
                                        Array(11, 3994417, 5),
                                        Array(11, 3994418, 5),
                                        Array(11, 3994419, 5),
                    Array(11, 3994420, 3),//5000
                    Array(11, 3994421, 3),
                                        Array(11, 3994422, 3),

                                        Array(11, 2431996, 4),
                     Array(11, 2431991, 2),
                    Array(11, 2432397, 1),


                    //Array(11, 2049155, 400),
                    Array(11, 4001716, 2),
                    Array(11, 3010658, 1),
                    Array(11, 3010788, 1),
                    Array(11, 3010810, 1),
                    Array(11, 3012019, 1),
                    Array(11, 3012019, 1),
                    Array(11, 3010717, 1),
                    Array(11, 3010715, 1),
                                        Array(11, 2610001, 15),

                                        // 禮包12
                        Array(12, 2049323, 300),
                        Array(12, 2431923, 1),//護肩80G箱子
                        Array(12, 2431924, 1),//50G勳章

                    Array(12, 3010509, 1),
                    Array(12, 3010611, 1)

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

    twd = getTotalTWD();
    var curlevel = -1;

    if (status == 0) {
        text = "您累計儲值金額為： #r" + rmb + "#k 元\r\n\r\n";
        for (var i = 1; i <= condition.length; i++) {
            text += "#b#L" + i + "#"+aaa+" 累計儲值 #r" + condition[i-1] + " #b元獎勵";
            if (cm.getEventCount("累計儲值禮包" + i) == -1) {
                text += "(已領取)";
                curlevel = curlevel == -1 ? i : curlevel;
            }
            text += "#l\r\n";
        }
        text += "#k";
        cm.sendSimple(text);
    } else if (status == 1) {
        sel = selection;
        text = "\t\t\t\t#e#r- 累計儲值" + condition[selection - 1] + "元獎勵 -#k#n\r\n\r\n";
        for (var i = 0; i < reward.length; i++) {
            if (reward[i][0] == selection) {
                text += "\t\t\t#i" + reward[i][1] + "# #z" + reward[i][1] + "#[" + reward[i][2] + "個]\r\n";
            }
        }
        cm.sendYesNo(text);
    } else if (status == 2) {
        if (cm.getEventCount("累計儲值禮包" + sel) == -1) {
            cm.sendOk("這個禮包您已經領取過了");
            cm.dispose();
            return;
        }
        if (twd < condition[sel-1]) {
            cm.sendOk("累計儲值金額不足，無法領取。");
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
        cm.setEventCount("累計儲值禮包" + sel, -2);
        cm.playerMessage(1, "領取成功！");
        cm.worldSpouseMessage(0x0F,"『累計儲值獎勵』" + " : " + "玩家 " + cm.getChar().getName() + " 領取了累計儲值 " + condition[sel-1] + " 元獎勵。");
        cm.worldSpouseMessage(0x0F,"『累計儲值獎勵』" + " : " + "玩家 " + cm.getChar().getName() + " 領取了累計儲值 " + condition[sel-1] + " 元獎勵。");
        cm.worldSpouseMessage(0x0F,"『累計儲值獎勵』" + " : " + "玩家 " + cm.getChar().getName() + " 領取了累計儲值 " + condition[sel-1] + " 元獎勵。");
        cm.dispose();
    }
}
function getTotalTWD() {
    var ret = 0;
    var conn = cm.getConnection();
    var UpDateData = conn.prepareStatement("SELECT totalrmb FROM accounts WHERE id = ?");
    UpDateData.setInt(1, cm.getPlayer().getAccountID());
    var rs = UpDateData.executeQuery();
    if (rs.next())
    {
        ret = rs.getInt("totalrmb");
    }
    UpDateData.close();
    return ret;
}
//alter table accounts add totalrmb int(11);