/**
 *    時空石支援
 */
var status = -1;

function start(mode, type, selection) {
    if (mode == 0 && status == 0) {
        qm.sendOk("這可是免費贈送的……如果你想領取禮物，請再來和我說話。");
        qm.dispose();
        return;
    } else if (mode == 0) {
        status--;
    } else {
        status++;
    }
    if (status == 0) {
        qm.sendYesNo("你好，#b#h0##k。在傳說嘉年華期間，每天都會發放可以移動到任何村莊的#b#t2430455##k一次。你想現在領取嗎？");
    } else if (status == 1) {
        if (qm.canHold(2430455)) {
            qm.gainItem(2430455, 1);
            qm.forceCompleteQuest();
            qm.sendOk("#b#t2430455##k存在30分鐘的冷卻時間。希望你好好使用，在楓之谷度過快樂的時光～");
        } else {
            qm.sendOk("背包空間不足.");
        }
        qm.dispose();
    }
}

function end(mode, type, selection) {
}
