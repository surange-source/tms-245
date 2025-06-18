var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        cm.sendYesNo("你想完成#e#r5轉任務#n#k嗎？到達200級後點擊我即可立刻完成！！");
    } else if (status == 1) {
            cm.forceCompleteQuest(1460);
            cm.forceCompleteQuest(1461);
            cm.forceCompleteQuest(1462);
            cm.forceCompleteQuest(1463);
            cm.forceCompleteQuest(1464);
            cm.forceCompleteQuest(1465);
            cm.forceCompleteQuest(1467);
            cm.forceCompleteQuest(1466);
            cm.forceCompleteQuest(1478);
            cm.show5thJobEffect();
     cm.sendOk("恭喜你完成了！");
        cm.dispose();
    }
}