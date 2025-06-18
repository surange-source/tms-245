/*
 *  功能：5轉 緋紅神秘石
 */


var status = 0;


function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0) {
        im.dispose();
        return;
    } else {
        status++;
    }
    if (im.isQuestActive(1476)) {
        //im.forceCompleteQuest(1476);
        //var exp = im.getOneInfo(1470, "exp");
        var t = Math.max(0, (60 - im.getPlayer().getQuestDiffTime()));
        im.sendOk("#r該神秘石激活中！剩餘時間：#e" + t + "#n分鐘");
        im.dispose();
    } else {
        if (im.isQuestFinished(1476)) {
            im.sendOk("#r該神秘石已激活完畢。。");
            im.dispose();
            return;
        }
        if (im.isQuestActive(1474) || im.isQuestActive(1475)) {
            im.sendOk("已激活其他神秘石。。");
            im.dispose();
            return;
        }
        if (status == 0) {
            im.sendYesNo("你要立刻激活神秘石嗎？\r\n\r\n#b(如果點擊確認，接下來1小時內的狩獵經驗值將會被記錄。)#k");
        } else if (status == 1) {
            im.setLTime();
            im.forceStartQuest(1476);
            im.dispose();
        }
    }
}
