var status = -1;

function start() {
    cm.sendNext("啊，又……你好。你想離開聖地，前往其他地區嗎？那你就找對人了。這裡有開往#維多利亞島#k的#b六岔路口#k的船。");
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else
        status--;

    if (status == -1) {
        cm.sendNext("看來你在聖地還有事要辦，等你想去維多利亞島了再來找我吧。");
        cm.dispose();
    } else if (status == 0) {
        cm.sendYesNo("到維多利亞島的#b六岔路口#k去所需的時間是#b2分鐘#k左右，費用是#b1000#k楓幣。1000您要支付楓幣乘坐船嗎？");
    } else if (status == 1) {
        if (cm.getMeso() < 1000) {
            cm.sendNext("你明明沒有錢嘛……必須有#b1000#k才可以去。");
        } else {
            cm.warp(104020120);
        }
        cm.dispose();
    } else {
        cm.dispose();
    }
}
