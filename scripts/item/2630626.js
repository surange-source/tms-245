var equipSets = Array(
    // 神秘冥界組合包(戰士)
    617,
    // 神秘冥界組合包(法師)
    618,
    // 神秘冥界組合包(弓手)
    619,
    // 神秘冥界組合包(盜賊)
    620,
    // 神秘冥界組合包(海盜)
    621
);

var setName = "神秘冥界裝備";
var equips = Array();
var jobEquips = Array();
var isJobList = true;
var status = -1;
var selEqp = -1;

function start() {
    var ii = im.getItemInfo();
    var msg = "";
    for each (set in equipSets){
        var setItemArrays = im.getSetItems(set);
        for each (itemId in setItemArrays) {
            if (im.isItemType("武器", itemId) && !ii.isFixedPotential(itemId)) {
                if (im.haveItem(itemId)) {
                    msg += "\r\n#L" + itemId + "##v" + itemId + "##t" + itemId + "##l";
                }
                equips.push(itemId);
                if (ii.canEquipByJob(itemId, im.getPlayer().getJob())) {
                    jobEquips.push(itemId);
                }
            }
        }
    }
    // 雙刀不在套組內 獨立添加
    var itemId = 1342104;
    if (im.haveItem(itemId)) {
        msg += "\r\n#L" + itemId + "##v" + itemId + "##t" + itemId + "##l";
    }
    equips.push(itemId);
    if (ii.canEquipByJob(itemId, im.getPlayer().getJob())) {
        jobEquips.push(itemId);
    }
    if (msg == "") {
        im.sendNext("沒有可以變更的裝備。");
        im.dispose();
    } else {
        im.sendSimple("下方為可變換的裝備，請選擇要變換的裝備。\r\n#b背包內若有相同種類的裝備，將從左上方的道具開始優先變換！#k" + msg);
    }
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        im.dispose();
        return;
    }

    var i = -1;
    if (status == i++) {
        im.dispose();
    } else if (status == i++) {
        if (selEqp == -1) {
            selEqp = selection;
        }
        var msg = "";
        if (isJobList && jobEquips.length > 0) {
            msg += "\r\n推薦你優先選擇目前職業可穿戴的裝備。#b";
            jobEquips.forEach(function(itemId) {
                msg += "\r\n#L" + itemId + "##v" + itemId + "##t" + itemId + "##l";
            });
            msg += "\r\n\r\n#L0#查看完整目錄。#l";
        } else {
            msg += "#b";
            equips.forEach(function(itemId) {
                msg += "\r\n#L" + itemId + "##v" + itemId + "##t" + itemId + "##l";
            });
            msg += "\r\n";
            if (jobEquips.length > 0) {
                msg += "\r\n#L0#查看可穿戴的目錄。#l";
            }
        }
        im.sendSimple("請選擇要領取的#b" + setName + "#k。" + msg + "\r\n#L1#結束。#l");
    } else if (status == i++) {
        switch (selection) {
            case 0:
                isJobList = !isJobList;
                status -= 2;
                action(1, 0, 0);
                break;
            case 1:
                im.dispose();
                break;
            default:
                if (equips.indexOf(selEqp) != -1 && equips.indexOf(selection) != -1 && im.haveItem(selEqp) && im.used()) {
                    im.gainItem(selEqp, -1);
                    im.gainItem(selection, 1, 3);
                } else {
                    im.sendNext("因未知錯誤，使用失敗。");
                }
                im.dispose();
                break;
        }
    } else {
        im.dispose();
    }
}