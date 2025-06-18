/*
 * 正義的代理人
 * 天使破壞者2轉
 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.sendOk("不管怎樣確實變強了，暫且當成是高興的事情吧。");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.askAcceptDeclineNoESC("由於修煉和練習的結果，和#p3000018#的靈魂的聯繫越來越緊密了。心裡既感到高興，又有一絲不安。是否要進行天使破壞者2轉？");
    } else if (status == 1) {
        if (qm.getJob() == 6500) {
            qm.changeJob(6510);
        }
        if (!qm.haveItem(1142496, 1)) {
            qm.gainItem(1142496, 1);
        }
        qm.forceCompleteQuest();
        qm.dispose();
    }
}
