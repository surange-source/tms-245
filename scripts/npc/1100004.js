var status = -1;

function start() {
    cm.sendNext("嗯……今天的風真好。你想離開聖地，到其他地區去嗎？這艘船開往神秘島的天空之城。");
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else
        status--;

    if (status == -1) {
        cm.sendNext("怎麼？你還有事要留在聖地嗎？那你先去解決了再來吧。");
        cm.dispose();
    } else if (status == 0) {
        cm.sendYesNo("到達神秘島的#b天空之城#k的時間大約是#b4分鐘#k。費用是#b1000#k楓幣。1000您要支付楓幣乘坐船嗎？");
    } else if (status == 1) {
        if (cm.getMeso() < 1000) {
            cm.sendNext("你明明沒有錢嘛……必須有#b1000#k才可以去。");
        } else {
            cm.warp(200000100);
        }
        cm.dispose();
    } else {
        cm.dispose();
    }
}
