/* 內在能力入門，第一種內在能力 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        qm.sendNext("你好，#b#h0##k。這麼快就達到30級啦！達到#b30級#k之後，可以獲得特殊的力量#b內在能力#k。我現在就能為你解放那種力量");
    } else if (status == 1) {
        qm.forceCompleteQuest();
        qm.sendPrev("好了～！我已經為你解放了新的力量——內在能力。請通過角色屬性窗確認一下～！");
    qm.showCompleteQuestEffect();
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.dispose();
}
