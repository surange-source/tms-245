var exchangeList = Array();
// 經驗值2倍優惠券
exchangeList.push([2450112, 1, 1]);
// 寵物裝備透明藥水
exchangeList.push([2610200, 1, 2]);
// 白金鎚子
exchangeList.push([2472000, 1, 3]);
// 生命水
exchangeList.push([5180000, 1, 3]);
// 寵物白金剪刀
exchangeList.push([5520003, 1, 4]);
// 永恆的生命水
exchangeList.push([5180003, 1, 5]);

function start() {
    var menu = "";
    for (var i = 0; i < exchangeList.length; i++) {
        menu += "\r\n#L" + i + "##b#v" + exchangeList[i][0] + "##t" + exchangeList[i][0] + "#" + (exchangeList[i][1] > 1 ? (" " + exchangeList[i][1] + "個") : "") + "(#t" + im.getItemId() + "# " + exchangeList[i][2] + "個)#l";
    }
    im.sendSimple("具有#b#t" + im.getItemId() + "# #c" + im.getItemId() + "#個#k.  確定要使用寵物硬幣交換下列其中一項嗎?\r\n#b" + menu + "#k");
}

function action(mode, type, selection) {
    if (mode != 1) {
        im.dispose();
        return;
    }
    if (exchangeList.length < (selection + 1) || selection < 0) {
        im.dispose();
        return;
    }
    if (!im.haveItem(im.getItemId(), exchangeList[selection][2]) || !im.canHold(exchangeList[selection][0], exchangeList[selection][1])) {
        im.sendOk("背包欄位空間不足或#t" + im.getItemId() + "#不足");
    } else {
        im.gainItem(im.getItemId(), -exchangeList[selection][2]);
        im.gainItem(exchangeList[selection][0], exchangeList[selection][1]);
    }
    im.dispose();
}