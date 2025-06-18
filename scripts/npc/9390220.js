var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == 0) {
        cm.dispose();
        return;
    } else if (mode == 1) {
        status++;
    } else {
        status--;
    }

    switch (status) {
        case 0:
            cm.sendSimple("你好, #e#b#h0##k#n。歡迎來到凱梅爾茲交易所。#b\r\n\r\n" + (cm.isQuestFinished(17007) ? "#L1#進行貿易#l#b\r\n#L2#個人回生系統#l" : "#L0#購置艦船#l"));
            break;
        case 1:
            if (selection == 0) {
                if (!cm.isQuestFinished(17007)) {
                    if (cm.getMeso() >= 10000000) {
                        cm.gainMeso(-10000000);
                        cm.setCanSail();
                        cm.gainItem(4310100, 30);
                        cm.sendOk("艦船購置成功,並交換了30個楓幣");
                    } else {
                        cm.sendOk("購置艦船需要1000W！");
                    }
                } else {
                    cm.sendOk("你已經購置了艦船了！");
                }
                cm.dispose();
            } else if (selection == 1) {
                if (cm.isQuestFinished(17007)) {
                    if (cm.getSailStat() == 0) {
                        cm.sendNext("上次貿易沒有順利完成,我可以返還給你貨物的楓幣,但是貨物不會給你. ");
                    } else if (cm.getSailCoins() > 0) {
                        cm.sendNext("最近,你通過交易所獲得的楓幣是 #b#e" + cm.getSailCoins() + "#k#n個。");
                    } else {
                        cm.openUI(0x22A);
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("你還沒有購置艦船不能進行貿易！");
                    cm.dispose();
                }
            } else {
                if (cm.getItemQuantity(4310100) < 10) {
                    cm.gainItem(4310100, 10);
                    cm.sendOk("好了,我已經給你10個楓幣了,請小心收好！");
                } else {
                    cm.sendOk("你不能使用個人回生系統！");
                }
                cm.dispose();
            }
            break;
        case 2:
            cm.sendYesNo("你要領取楓幣嗎?");
            break;
        case 3:
            if (cm.gainSailBouns()) {
                cm.sendOk("楓幣領取成功！");
            } else {
                cm.sendOk("背包空間不足！");
            }
            cm.dispose();
            break;
    }
}
