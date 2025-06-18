
var status = -1;
var text;
var sel;
var twd;
var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var cal = java.util.Calendar.getInstance();
var month = cal.get(java.util.Calendar.MONTH) + 1; //獲得月份
var year = cal.get(java.util.Calendar.YEAR); //獲得年份
var bosslogId = year+""+month+"月累計儲值禮包";
// 每個禮包所需的儲值金額
var condition = new Array(10, 100, 300, 500, 1000, 2000, 5000);
var reward = new Array(// 禮包編號、道具id、數量
    //10
    Array(1, 5062002, 1),
    Array(1, 5062000, 1),
    Array(1, 5062500, 1),
    //100
    Array(2, 5062002, 10),
    Array(2, 5062000, 10),
    Array(2, 5062500, 10),
    Array(2, 5064000, 2),
    Array(2, 2340000, 2),
    //300
    Array(3, 5062002, 15),
    Array(3, 5062000, 15),
    Array(3, 5062500, 15),
    Array(3, 5064000, 3),
    Array(3, 2340000, 3),
    Array(3, 2049116, 3),
    Array(3, 2049124, 3),
    //500
    Array(4, 2430640, 1),
    Array(4, 5062002, 30),
    Array(4, 5062000, 30),
    Array(4, 5062500, 30),
    Array(4, 5064000, 5),
    Array(4, 2049116, 5),
    Array(4, 2049124, 5),
    Array(4, 2340000, 5),
    //1000
    Array(5, 2431995, 1),
    Array(5, 5062002, 50),
    Array(5, 5062000, 50),
    Array(5, 5062500, 50),
    Array(5, 5064000, 10),
    Array(5, 2049116, 10),
    Array(5, 2049124, 10),
    Array(5, 2340000, 10),
    Array(5, 4310129, 200),
    //2000
    Array(6, 2431725, 1),
    Array(6, 5062002, 100),
    Array(6, 5062000, 100),
    Array(6, 5062500, 100),
    Array(6, 5062009, 100),
    Array(6, 5064000, 20),
    Array(6, 2049116, 20),
    Array(6, 2049124, 20),
    Array(6, 2340000, 20),
    Array(6, 2049323, 20),
    Array(6, 4310129, 400),
    Array(6, 4000517, 20),
    //5000
    Array(7, 2431996, 1),
    Array(7, 5062002, 150),
    Array(7, 5062000, 150),
    Array(7, 5062500, 150),
    Array(7, 5062009, 150),
    Array(7, 5064000, 50),
    Array(7, 2049116, 50),
    Array(7, 2049124, 50),
    Array(7, 2340000, 50),
    Array(7, 2049323, 50),
    Array(7, 4310129, 1000),
    Array(7, 4000517, 50)
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

    twd = getTWD();
    var curlevel = -1;

    if (status == 0) {
        text = "您本月累計儲值金額為： #r" + twd + "#k 元\r\n\r\n";
        for (var i = 1; i <= condition.length; i++) {
            text += "#b#L" + i + "#"+aaa+" 本月累計儲值 #r" + condition[i-1] + " #b元獎勵";
            if (cm.getBossLogAcc(bosslogId + i) == -1) {
                text += "(已領取)";
                curlevel = curlevel == -1 ? i : curlevel;
            }
            text += "#l\r\n";
        }
        text += "#k";
        cm.sendSimple(text);
    } else if (status == 1) {
        sel = selection;
        text = "\t\t\t#e#r- 本月累計儲值" + condition[selection - 1] + "元獎勵 -#k#n\r\n\r\n";
        for (var i = 0; i < reward.length; i++) {
            if (reward[i][0] == selection) {
                text += "\t\t\t#i" + reward[i][1] + "# #z" + reward[i][1] + "#[" + reward[i][2] + "個]\r\n";
            }
        }
        cm.sendYesNo(text);
    } else if (status == 2) {
        if (cm.getBossLogAcc(bosslogId + sel) == -1) {
            cm.sendOk("這個禮包您已經領取過了");
            cm.dispose();
            return;
        }
        if (twd < condition[sel-1]) {
            cm.sendOk("本月累計儲值金額不足，無法領取。");
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
        cm.setBossLogAcc(bosslogId + sel, -2);
        cm.playerMessage(1, "領取成功！");
        cm.channelMessage(0x18, "『本月累計儲值』" + " : " + "玩家 " + cm.getChar().getName() + " 領取了本月累計儲值 " + condition[sel-1] + " 元獎勵。");
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
        ret = rs.getInt("twd");
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