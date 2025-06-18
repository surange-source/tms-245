var status = -1;
var selectedpay = 0;
var acash = 3000;

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
            if (status == 2) {
                cm.sendNext("如果您需要儲值金額兌換成樂豆點的話，那麼請下次來找我！");
                cm.dispose();
            }
            status--;
        }
        if (status == 0) {
            cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，您的消費信息為:\r\n\r\n儲值餘額:#r " + cm.getHyPay(1) + " #k元\r\n已消費金額:#r " + cm.getHyPay(3) + " #k元\r\n累計儲值總金額:#r " + cm.getHyPay(2) + " #k元\r\n#b#L0#兌換樂豆點(1:3000)");
        } else if (status == 1) {
            if (cm.getHyPay(1) == 0) {
                cm.sendNext("您沒有可兌換的儲值金額。");
                cm.dispose();
            } else {
                cm.sendGetNumber("請輸入您要兌換的儲值金額:\r\n遊戲樂豆點的兌換比例為 1 : 3000\r\n", 1, 1, cm.getHyPay(1));
            }
        } else if (status == 2) {
            selectedpay = selection;
            if (cm.getHyPay(1) < selectedpay) {
                cm.sendNext("您儲值金額不夠。");
                cm.dispose();
            } else {
                cm.sendYesNo("您是否要將#r " + selectedpay + " #k元的儲值金額兌換成#b " + selectedpay * acash + " #k的樂豆點。");
            }
        } else if (status == 3) {
            if (cm.getHyPay(1) < selectedpay) {
                cm.sendNext("您儲值金額不夠。");
            } else if (cm.addHyPay(selectedpay) > 0) {
                cm.gainNX(selectedpay * acash);
                cm.sendOk("恭喜您成功兌換#b " + selectedpay * acash + " #k的樂豆點，本次兌換消費儲值金額#r " + selectedpay + " #k元，您目前的儲值餘額為:#r " + cm.getHyPay(1) + " #k元。");
            } else {
                cm.sendOk("兌換樂豆點出現錯誤，請反饋給管理員！");
            }
            cm.dispose();
        } else {
            cm.dispose();
        }
    }
}