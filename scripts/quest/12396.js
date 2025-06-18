/* 內在能力的圓滿，第三種內在能力 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        qm.sendNext("你好，#b#h0##k。這麼快就達到70級啦！通過這段時間的冒險，你積累了不少經驗，終於可以獲得最後的#b第三種內在能力#k了。我現在就為你解放最後一種力量。");
    } else if (status == 1) {
        qm.forceCompleteQuest(); //發送完成任務的封包
        qm.sendPrev("好了～！我已經為你解放了最後的內在能力——第三種內在能力。請通過角色屬性窗確認一下～！");
    qm.showCompleteQuestEffect(); //發送完成任務的效果
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.dispose();
}
