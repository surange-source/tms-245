/*
    任務: 森林深處的真相 - 降魔十字旅團
    描述: 收到了有關背叛者#p9120218#的位置的情報。接到了抓捕#p9120218#的命令，她真的是背叛者嗎？快趕去#b#m240010901##k揭開真相！
    獲得: 4310018*35 - 十字楓幣
          1112613*1 - 十字旅團降魔戒指
*/
var status = -1;

function start(mode, type, selection) {
    qm.dispose();
}

function end(mode, type, selection) {
    if (!qm.canHold(4310018, 35) || !qm.canHold(1112613, 1)) {
        qm.sendOk("背包空間不足.");
    } else {
        qm.gainItem(4310018, 35);
        qm.gainItem(1112613, 1);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}
