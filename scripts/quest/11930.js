/**
 *    [鬼節]不給糖果，他們就會搗蛋～！
 */

var status = -1;

function start(mode, type, selection) {
    qm.forceStartQuest();;
    qm.dispose();
}

function end(mode, type, selection) {
    qm.forceCompleteQuest();
    qm.dispose();
}
