
var status = -1;
var text;
var sel;
var twd;
var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

// 每個禮包所需的儲值金額
var condition = new Array(1, 10, 30, 50, 100, 200, 300, 500, 800, 1000);
var reward = new Array(// 禮包編號、道具id、數量
                    // 禮包1
                    Array(1, 1112793, 1),
                    Array(1, 3010118, 1),
                    Array(1, 2340000, 1),
                    Array(1, 2049137, 1),

                    // 禮包2
                    Array(2, 2430865, 1, 1), //VIP
                    Array(2, 5062002, 10),
                    Array(2, 5064000, 10),
                    Array(2, 2340000, 2),
                    Array(2, 2049137, 3),
                    Array(2, 4001785, 1),

                    // 禮包3
                    Array(3, 5062002, 10),
                    Array(3, 5064000, 15),
                    Array(3, 2340000, 5),
                    Array(3, 2049137, 4),
                    Array(3, 3010535, 1),
                    Array(3, 5073000, 50),
                    Array(3, 5390004, 10),
                    Array(3, 4001785, 1),

                    // 禮包4
                    Array(4, 5062002, 10),                    
                    Array(4, 5064000, 20),
                    Array(4, 2340000, 5),
                    Array(4, 3010678, 1),
                    Array(4, 2049137, 5),
                    Array(4, 5073000, 80),
                    Array(4, 5390004, 20),
                    Array(4, 4001785, 5),

                    // 禮包5
                    Array(5, 1102709, 1),
                    
                    //Array(5, 3010417, 1),
                    //Array(5, 3994417, 1),
                    Array(5, 5062002, 20),
                    Array(5, 5064000, 25),
                    Array(5, 4310036, 3000),
                    Array(5, 2340000, 10),
                    Array(5, 2049137, 5),
                    Array(5, 5073000, 100),
                    Array(5, 5390004, 20),
                    Array(5, 5390018, 5),
                    Array(5, 4001785, 10),

                    // 禮包6
                    
                    //Array(6, 3994418, 1),
                    
                    Array(6, 5062002, 20),    
                    Array(6, 5062500, 20),
                    Array(6, 5064000, 30),
                    Array(6, 2048307, 1),
                    Array(6, 4310036, 3000),
                    Array(6, 2340000, 10),
                    Array(6, 2049137, 10),
                    Array(6, 5390004, 30),    
                    Array(6, 5390018, 10),
                    Array(6, 4001785, 10),

                    // 禮包7
                    //Array(7, 2432069, 1),
                    //Array(7, 3010416, 1),
                    //Array(7, 3994419, 1),
                    Array(7, 2430865, 1, 30), //VIP
                    Array(7, 5062002, 30),
                    Array(7, 5062500, 30),
                    Array(7, 5064000, 35),
                    Array(7, 2048307, 1),
                    Array(7, 4310036, 6000),
                    Array(7, 2340000, 15),
                    Array(7, 2049137, 15),
                    Array(7, 5390004, 30),
                    Array(7, 5390018, 15),
                    
                    // 禮包8
                    //Array(8, 2431938, 1),
                    //Array(8, 2432069, 1),
                    //Array(8, 3010876, 1),
                    //Array(8, 2430226, 1),
                    //Array(8, 3994417, 1),
                    //Array(8, 3994418, 1),
                    //Array(8, 3994419, 1),
                    Array(8, 5062002, 40),
                    Array(8, 5062500, 40),
                    Array(8, 5064000, 40),
                    Array(8, 2048307, 1),
                    Array(8, 4310036, 6000),
                    Array(8, 2340000, 15),
                    Array(8, 2049137, 20),
                    Array(8, 5390004, 30),
                    Array(8, 5390018, 20),
                    
                    // 禮包9
                    //Array(9, 2431993, 1),
                    //Array(9, 3994417, 1),
                    //Array(9, 3994418, 1),
                    //Array(9, 3994419, 1),
                    //Array(9, 3994420, 1),
                    //Array(9, 3994421, 1),
                    Array(9, 5062002, 60),
                    Array(9, 5062500, 60),
                    Array(9, 2048307, 1),
                    Array(9, 2049750, 5),
                    Array(9, 2340000, 20),
                    Array(9, 5064000, 50),
                    Array(9, 4310036, 15000),
                    Array(9, 2049137, 30),
                    //Array(9, 2430865, 1, 60), //VIP
                    Array(9, 5390018, 30),
                    Array(9, 4001715, 1),
                    
                    // 禮包10
                    Array(10, 2046829, 10),
                    //Array(10, 2431991, 1),
                    Array(10, 2049405, 1),
                    Array(10, 3994417, 1),
                    Array(10, 5062002, 100),
                    Array(10, 5062500, 100),
                    Array(10, 5064000, 50),
                    Array(10, 2340000, 30),
                    Array(10, 4310036, 20000),
                    Array(10, 2049137, 40),
                    Array(10, 5390018, 40),
                    Array(10, 4001715, 2)
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

    twd = cm.getHyPay(1);
    var curlevel = -1;

    if (status == 0) {
        text = "您累計儲值金額為： #r" + twd + "#k 元\r\n\r\n";
        for (var i = 1; i <= condition.length; i++) {
            text += "#b#L" + i + "#"+aaa+" 累計儲值 #r" + condition[i-1] + " #b元獎勵";
            if (cm.getBossLogAcc("累計儲值禮包" + i) == -1) {
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
        if (cm.getBossLogAcc("累計儲值禮包" + sel) == -1) {
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
                if (reward[i][3]==null)
                    reward[i][3]=-1;
                rewardlist.push(new Array(reward[i][1], reward[i][2], reward[i][3]));
            }
        }
        if (!cm.canHoldSlots(rewardlist.length)) {
            cm.sendOk("包裹空間不足，請確保包裹每個欄位有至少 " + rewardlist.length + " 格空間");
            cm.dispose();
            return;
        }
        for (var i = 0; i < rewardlist.length; i++) {
            if (rewardlist[i][0]==2430865) {
                cm.gainItem(rewardlist[i][0], rewardlist[i][1], rewardlist[i][2]);
            } else {
                cm.gainItem(rewardlist[i][0], rewardlist[i][1]);
            }
        }
        cm.setBossLogAcc("累計儲值禮包" + sel, -2);
        cm.playerMessage(1, "領取成功！");
        cm.channelMessage(0x18, "『累計儲值獎勵』" + " : " + "玩家 " + cm.getChar().getName() + " 領取了累計儲值 " + condition[sel-1] + " 元獎勵。");
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