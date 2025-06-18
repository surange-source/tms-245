/* 
 * 領取每日星星
 */
var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        qm.sendAcceptDecline("#b#h ##k. 每天登陸都可以在這裡領取100星星喲,是否現在就要領取");
    } else if (status == 1) {
        if (qm.canHold(4001839, 100)) {
            qm.gainItem(4001839, 100);
            qm.forceStartQuest();
            qm.forceCompleteQuest();
        }
        qm.dispose();
    }
}
function end(mode, type, selection) {
    qm.dispose();
}
