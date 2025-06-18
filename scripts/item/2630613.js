function start() {
    var msg = "請選擇需要獲得的戒指#b\r\n#L0##v1112951##t1112951#l\r\n#L1##v1112952##t1112952#l";
    im.sendSimple(msg);
}

function action(mode, type, selection) {
    im.dispose();
    if (mode != 1) {
        return;
    }
    var itemId = 1112952;
    if (selection == 0) {
        itemId = 1112951;
    }
    if (im.canHold(itemId) && im.used()) {
        im.gainItem(itemId, 1);
    }
}