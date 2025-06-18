var status = -1;
var beauty = 0;
var tosend = 0;

function start() {
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
                cm.sendNext("如果您需要金卷中介的話，那麼請下次來找我！");
                cm.dispose();
            }
            status--;
        }
        if (status == 0) {
            var text = "";
            text = "#fMob/1210102.img/move/0##fMob/1210102.img/move/0##b追憶 - MS#fMob/1210102.img/move/0##fMob/1210102.img/move/0##k\r\n金卷兌換#z4000463# 比例:10=1\r\n#z4000463#兌換金卷 比例:1=9\r\n當前金卷:#r " + cm.getJQ() + " #k張\r\n國慶紀念幣:#r " + cm.itemQuantity(4000463) + " #k個\r\n";
            text += "            #L0##b>>>金卷兌換#z4000463#<<<#l\r\n\r\n";
            text += "            #L1##b>>>#z4000463#兌換金卷<<<#l\r\n";
            cm.sendSimple(text);
        } else if (status == 1) {
            if (cm.getPlayer() >= 1 && cm.getPlayer() <= 5) {
                cm.sendOk("GM不能參與兌換.");
                cm.dispose();
            }
            if (selection == 0) {
                if (cm.getSpace(4) < 5) {
                    cm.sendOk("你的背包「其它」空間不足!至少有5個空間以上才可以兌換。");
                    cm.dispose();
                } else if (cm.getJQ() / 10 == 0) {
                    cm.sendNext("金卷不足無法兌換國慶紀念幣。");
                    status = -1;
                } else {
                    beauty = 1;
                    cm.sendGetNumber("請輸入金卷兌換國慶紀念幣的數量:\r\n兌換比例為 10 : 1\r\n", 1, 1, cm.getJQ() / 10);
                }
            } else if (selection == 1) {
                if (cm.haveItem(4000463) == false) {
                    cm.sendNext("國慶紀念幣不足無法兌換金卷。");
                    status = -1;
                } else {
                    beauty = 2;
                    cm.sendGetNumber("請輸入國慶紀念幣兌換金卷的數量:\r\n兌換比例為 1 : 9\r\n", 1, 1, 999);
                }
            }
        } else if (status == 2) {
            if (beauty == 1) {
                if (cm.getSpace(4) < 5) {
                    cm.sendOk("你的背包「其它」空間不足!至少有5個空間以上才可以兌換。");
                    cm.dispose();
                } else if (selection <= 0) {
                    cm.sendOk("輸入的兌換數字錯誤。");
                    cm.dispose();
                } else if (cm.getJQ() >= selection * 10) {
                    cm.addJQ(-selection * 10);
                    cm.gainItem(4000463, selection);
                    cm.sendOk("您成功將#r " + (selection * 10) + " #k金卷兌換成國慶紀念幣#v4000463# x #r" + selection + "#k。");
                } else {
                    cm.sendNext("您的輸入的數量錯誤，無法兌換國慶紀念幣。");
                    cm.dispose();
                }
            } else if (beauty == 2) {
                if (cm.haveItem(4000463, selection)) {
                    cm.gainItem(4000463, -selection);
                    cm.addJQ(9 * selection);
                    cm.sendOk("您成功將國慶紀念幣#v4000463# x #r" + selection + " #k兌換成#r " + (9 * selection) + " #k金卷。");
                } else {
                    cm.sendNext("您的輸入的數量錯誤，無法兌換樂豆點。");
                    cm.dispose();
                }
            }
            status = -1;
        } else {
            cm.dispose();
        }
    }
}
