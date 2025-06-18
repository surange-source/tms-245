/* 變得更強勁的力量，第二種內在能力 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        qm.sendNext("你好，#b#h0##k。這麼快就達到50級啦！通過這段時間的冒險，你積累了不少經驗，可以獲得#b第二種內在能力#k了。我現在就為你解放第二種力量。");
    } else if (status == 1) {
        qm.forceCompleteQuest();
        qm.sendPrev("好了～！我已經為你解放了更強的力量——第二種內在能力。請通過角色屬性窗確認一下～！");
    qm.showCompleteQuestEffect();
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.dispose();
}
