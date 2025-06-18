var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
    status++;
    } else {
    if (status == 0) {
        cm.dispose();
    }
    status--;
    }
    if (status == 0) {
    cm.sendYesNo("怎麼? 你想預約婚禮嗎?");
    } else if (status == 1) {
    if (cm.getPlayer().getMarriageId() <= 0) {
        cm.sendOk("你還沒有訂婚.");
    } else if (!cm.canHold(4150000,60)) {
        cm.sendOk("請確定其他空間.");
    } else if (!cm.haveItem(5251004,1) && !cm.haveItem(5251005,1) && !cm.haveItem(5251006,1)) {
        cm.sendOk("Please purchase a Wedding Ticket from the Cash Shop.");
    } else {
        var chr = cm.getMap().getCharacterById(cm.getPlayer().getMarriageId());
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
        if (cm.haveItem(5251006,1)) {
            cm.gainItem(5251006,-1);
            num = 60;
        } else if (cm.haveItem(5251005,1)) {
            cm.gainItem(5251005,-1);
            num = 30;
        } else if (cm.haveItem(5251004,1)) {
            cm.gainItem(5251004,-1);
            num = 10;
        }
        cm.setCustomData(160002, num + "");
        cm.setCustomData(chr, 160002, num + "");
        cm.sendNext("你現在已經預約了婚禮。這裡是婚禮邀請，你想邀請的客人都需要他們。");
        cm.gainItemPeriod(4150000,num,1);
        } else {
        cm.sendOk("我想你已經結婚了，或者已經預約了。");
        }
    }
    cm.dispose();
    }
}
