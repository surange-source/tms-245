var status;
var eff ="#fUI/UIWindow/Quest/icon6/7#";
var bili = 3000;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            if (status == 0) {
                cm.sendNext("如果您需要樂豆點中介的話，那麼請下次來找我！");
                cm.dispose();
            }
            status--;
        }
        if (status == 0) {
            cm.sendSimple("#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，這裡可以將餘額兌換為樂豆點\r\n  兌換比例 1:" + bili + ",請想好了再兌換哦!!!\r\n\r\n  您當前餘額為:#r " + cm.getTWD() + " #k元\r\n  您當前樂豆點為:#r " + cm.getNX(1) + "#k點\r\n#b#L0#" + eff + "我要兌換樂豆點#l\r\n");
        } else if (status == 1) {
            cm.sendGetNumber("#e#r請輸入您要兌換多少餘額：(兌換比例為1:" + bili + ")\r\n\r\n ", 1, 1, 1000);
        } else if (status == 2) {
            if (selection < 1 || selection > 1000) {
                cm.sendOk("所填數字非法，請重新輸入");
                status = 0;
            } else if (cm.getTWD() < selection) {
                cm.sendOk("你沒有那麼多的餘額，請重新輸入");
                status = 0;
            } else {
                cm.gainTWD(-selection);
                cm.gainNX(1, selection * bili);
                cm.sendOk("#e恭喜你成功將#r " + selection + " 餘額 #k兌換成 #r" + (selection * bili) + " 樂豆點#k\r\n\r\n#b祝你遊戲愉快！");
                cm.dispose();
            }
            status = -1;
        }
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