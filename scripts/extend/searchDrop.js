/*
 *
 *  功能：搜尋掉落道具的怪物
 *
 */
var status = -1;

function start() {
    cm.sendGetText("請輸入需要搜尋的道具名稱:");
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0 || status == 1) {
            cm.dispose();
            return;
        }
        status--;
    }

    var i = -1;
    if (status == i++) {
        cm.dispose();
    } else if (status == i++) {
        var selStr = "";
        var data = cm.getSearchData(1, cm.getText());
        var nCount = 0;
        if ("楓幣".equals(cm.getText())) {
            selStr += "\r\n#L0#fUI/UIWindow2.img/QuestIcon/7/0##l";
            nCount++;
        } else if ("樂豆".equals(cm.getText()) || "樂豆點".equals(cm.getText())) {
           selStr += "\r\n#L1##i2435892:# 樂豆點#l";
           nCount++;
        } else if ("楓點".equals(cm.getText()) || "楓葉點數".equals(cm.getText())) {
            selStr += "\r\n#L2##i2432107:# 楓葉點數#l";
            nCount++;
        } else if ("里程".equals(cm.getText())) {
            selStr += "\r\n#L3##i2431872:# 里程#l";
            nCount++;
        }
        for each (itemId in data) {
            if (itemId < 1000000 || itemId >= 6000000) {
                continue;
            }
            selStr += "\r\n#L" + itemId + "##i" + itemId + ":# #z" + itemId + "#" + (cm.getPlayer().isIntern() ? "(" + itemId + ")" : "") + "#l";
            if (++nCount >= 199) {
                selStr += "\r\n\r\n結果太多，後面已被忽略";
                break;
            }
        }
        if (selStr == "") {
            cm.sendOk("找不到這個道具");
            cm.dispose();
            return;
        }
        cm.sendSimple("請選擇需要搜尋的道具:\r\n" + selStr);
    } else if (status == i++) {
        cm.sendOk(cm.searchDrop(selection < 1000000 ? -selection : selection));
    } else {
        cm.dispose();
    }
}
