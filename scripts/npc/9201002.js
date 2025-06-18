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
    if (cm.getMapId() != 680000210) {
    cm.sendOk("如果你想舉行婚禮，請和我的助手們說。");
    cm.dispose();
    return;
    }
    if (status == 0) {
    cm.sendYesNo("你想現在就行動起來麼?");
    } else if (status == 1) {
        var marr = cm.getQuestRecord(160001);
        var data = marr.getCustomData();
        if (data == null) {
        marr.setCustomData("0");
            data = "0";
        }
        if (data.equals("1")) {
        if (cm.getPlayer().getMarriageId() <= 0) {
            cm.sendOk("發生了一些錯誤：你沒有與任何人訂婚。");
            cm.dispose();
            return;
        }
            var chr = cm.getMap().getCharacterById(cm.getPlayer().getMarriageId());
            if (chr == null) {
            cm.sendOk("請確認你的另一半在這裡");
            cm.dispose();
            return;
            }
        marr.setCustomData("2_");
        cm.setCustomData(chr, 160001, "2_");
        cm.doWeddingEffect(chr);
        } else if (data.equals("2_") || data.equals("2")) {
        if (cm.getPlayer().getMarriageId() <= 0) {
            cm.sendOk("發生了一些錯誤：你沒有與任何人訂婚。");
            cm.dispose();
            return;
        }
            var chr = cm.getMap().getCharacterById(cm.getPlayer().getMarriageId());
            if (chr == null) {
            cm.sendOk("請確認你的另一半在這裡.");
            cm.dispose();
            return;
            }
        cm.setCustomData(160001,"3");
        cm.setCustomData(chr,160001,"3");
        var dat = parseInt(cm.getQuestRecord(160002).getCustomData());
        if (dat > 10) {
            cm.warpMap(680000300, 0);
        } else {
            cm.setCustomData(chr,160002,"0");
            cm.setCustomData(160002,"0");
            cm.warpMap(680000500, 0);
        }
        } else {
        cm.sendOk("你還沒結婚！");
        }
    cm.dispose();
    }
}
