var status = -1;
var firstSelection = -1;
var secondSelection = -1;
var ingredients_0 = Array(4011004, 4021007);
var ingredients_1 = Array(4011006, 4021007);
var ingredients_2 = Array(4011007, 4021007);
var ingredients_3 = Array(4021009, 4021007);
var mats = Array();
var mesos = Array(10000000, 20000000, 30000000, 50000000);

function action(mode, type, selection) {
    if (mode == 1) {
    status++;
    } else if (mode == 0) {
    cm.dispose();
    return;
    } else {
    status--;
    }
    if (status == 0) {
    if (cm.getPlayer().getMarriageId() > 0) {
        cm.sendNext("祝賀你訂婚！");
        
    } else {
        cm.sendSimple("你好,我能為你做點什麼?\r\n#b#L0#製作月長石戒指#l\r\n#L1#製作閃耀新星戒指#l\r\n#L2#製作金心戒指#l\r\n#L3#製作銀翼戒指#l\r\n#L4#求婚遇到問題了.#l#k");
    }
    } else if (status == 1) {
    if (selection > 3) {
        status = 3;
        action(mode,type,selection);
        return;
    }
    firstSelection = selection;
    cm.sendSimple("那麼你要什麼品質的戒指呢?\r\n#b#L0#1 克拉#l\r\n#L1#2 克拉#l\r\n#L2#3 克拉#l" + (cm.isGMS() ? "\r\n#L3#4 Karat#l" : "") + "#k");
    } else if (status == 2) {
    secondSelection = selection;
    var prompt = "現在,我需要一些材料來製作它. 且確認你有足夠的背包空間!#b";
    switch(firstSelection) {
        case 0:
        mats = ingredients_0;
        break;
        case 1:
        mats = ingredients_1;
        break;
        case 2:
        mats = ingredients_2;
        break;
        case 3:
        mats = ingredients_3;
        break;
        default:
        cm.dispose();
        return;
    }
    for(var i = 0; i < mats.length; i++) {
        prompt += "\r\n#i"+mats[i]+"##t" + mats[i] + "# x 1";
    }
    prompt += "\r\n#i4031138# " + mesos[secondSelection]; + " meso";
    cm.sendYesNo(prompt);
    } else if (status == 3) {
    if (cm.getMeso() < mesos[secondSelection]) {
        cm.sendOk("No meso, no item.");
    } else {
        var complete = true;
        for (var i = 0; i < mats.length; i++) {
        if (!cm.haveItem(mats[i], 1)) {
            complete = false;
            break;
        }
        }
        if (!complete) {
        cm.sendOk("沒有足夠的材料.");
        } else if (!cm.canHold(secondSelection == 3 ? (2240000 + firstSelection) : (2240004 + (firstSelection * 3) + secondSelection), 1)) {
        cm.sendOk("Please make room in USE.");
        } else {
        cm.sendOk("戒指製作好啦,現在可以去求婚啦");
        cm.gainMeso(-mesos[secondSelection]);
        for (var i = 0; i < mats.length; i++) {
            cm.gainItem(mats[i], -1);
        }
        cm.gainItem(secondSelection == 3 ? (2240000 + firstSelection) : (2240004 + (firstSelection * 3) + secondSelection), 1);
        }
    }
    cm.dispose();
    } else if (status == 4) {
        var found = false;
        var selStr = "請選擇求婚戒指.";
        for (var i = 2240000; i < 2240016; i++) {
        if (cm.haveItem(i)) {
            found = true;
            selStr += "\r\n#L" + i + "##v" + i + "##t" + i + "##l";
        }
        }
        if (!found) {
        cm.sendOk("在你的消耗欄沒有發現任何的戒指.");
        cm.dispose();
        } else {
        cm.sendSimple(selStr);
        }
    } else if (status == 5) {
    firstSelection = selection;
    cm.sendGetText("現在請輸入你想求婚對象的名字：");
    } else if (status == 6) {
    cm.doRing(cm.getText(), firstSelection);
     cm.dispose();
    }
}
