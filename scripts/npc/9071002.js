var status = -1;

function start() {
    cm.sendNextE("你好～你是來買券的嗎？\r\n#b怪物公園 REBORN#k已經不需要購買入場券了～");
}

function action(mode, type, selection) {
    status++;

    var i = -1;
    if (status == i++ || mode != 1) {
        cm.dispose();
    } else if (status == i++) {
        cm.sendOkE("#b一天可免費使用2次#k，\r\n之後開始使用#b10 新楓之谷點數#k～");
    } else {
        cm.dispose();
    }
}