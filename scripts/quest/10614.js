/**
 *    影武者達到60級！
 */
var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("影武者達到了60級！\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n\r\n#i3800008# 貓頭鷹圖標 1個。\r\n\r\n#i1012189# #t1012189# 1個。");
    } else if (status == 1) {
        if (qm.isQuestFinished(10614)) {
            qm.dispose();
        } else {
            qm.sendOk("領取成功了。");
            qm.gainItem(1012189, 1); //藍色面巾
            qm.gainItem(3800008, 1); //貓頭鷹圖標
            qm.forceCompleteQuest();
            qm.dispose();
        }
    }
}
