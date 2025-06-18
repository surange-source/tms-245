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
            var ii = cm.getPlayer().getOneInfo(160002, "id");
            if (ii == null || parseInt(ii) == 0) {
                cm.sendOk("你還沒有訂婚.");
            } else if (!cm.canHold(4150000, 60)) {
                cm.sendOk("請確定其他空間.");
            } else if (!cm.haveItem(5251004, 1) && !cm.haveItem(5251005, 1) && !cm.haveItem(5251006, 1)) {
                cm.sendOk("請確認樂豆點欄，如果沒有婚禮券，就請去現金商店購買。");
            } else {
                var other = parseInt(ii);
                var chr = cm.getMap().getCharacterById(other);
                if (chr == null) {
                    cm.sendOk("請確認你的另一半也在這裡.");
                    cm.dispose();
                    return;
                }
                var marr = cm.getQuestRecord(160001);
                var data = marr.getCustomData();
                if (data == null) {
                    marr.setCustomData("0");
                    data = "0";
                }
                if (data.equals("0")) {
                    marr.setCustomData("1");
                    cm.setCustomData(chr, 160001, "1");
                    var num = 0;
                    if (cm.haveItem(5251006, 1)) {
                        cm.gainItem(5251006, -1);
                        num = 60;
                    } else if (cm.haveItem(5251005, 1)) {
                        cm.gainItem(5251005, -1);
                        num = 30;
                    } else if (cm.haveItem(5251004, 1)) {
                        cm.gainItem(5251004, -1);
                        num = 10;
                    }
                    cm.setCustomData(160002, num + "");
                    cm.setCustomData(chr, 160002, num + "");
                    cm.sendNext("你現在已經預約了婚禮。這裡是婚禮邀請，你想邀請的客人都需要他們。");
                    cm.gainItemPeriod(4150000, num, 1);
                } else {
                    cm.sendOk("我負責幫助客人預約婚禮。你好像不需要婚禮預約啊。");
                }
            }
            cm.dispose();
            break;
        case 1: //
            cm.dispose();//這是結束腳本，請按照實際情況使用
            break;
        case 2:
        case 3:
            cm.dispose();
            break;
    }
}
