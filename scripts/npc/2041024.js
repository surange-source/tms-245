function start() {
    cm.sendYesNo("你想獲得#b#i4031179:# #t4031179##k嗎？");
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    }
    if (cm.haveItem(4031179)) {
        cm.sendNext("你身上已經有#b#i4031179:# #t4031179##k了啊，還來找我做什麼？");
    } else {
        cm.gainItem(4031179, 1);
    }
    cm.dispose();
}
