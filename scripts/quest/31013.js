/*
    任務: 消滅薛西斯
    描述: 所有的準備差不多都完成了。去和米卡埃爾談談吧。
    獲得: 經驗值48,000
*/
var status = -1;

function start(mode, type, selection) {
    qm.sendNext("Thank you so much.");
    qm.forceCompleteQuest();
    qm.dispose();
}
function end(mode, type, selection) {
    qm.sendNext("Thank you so much.");
    qm.forceCompleteQuest();
    qm.dispose();
}
