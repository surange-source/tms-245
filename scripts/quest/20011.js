/*
    NPC Name:         Kisan
    Description:         Quest - Cygnus tutorial helper
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 2) {
            qm.sendNext("你不想要這個東西嗎？");
            qm.safeDispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("有許多方式可以來打獵， 但是最基本的方式就是#b「基礎攻擊」#k。你只要一把武器，只要簡單的操作就可以殺死敵人。");
    } else if (status == 1) {
        qm.sendNextPrev("按 #bCtrl#k 鍵即可普通攻擊， 如果你不常用這個按鍵，可以在右下角的鍵盤設置處更換其它的按鍵。");
    } else if (status == 2) {
        qm.askAcceptDecline("試一下吧！你可以找到 #r#o100120##k， 打敗他們，然後和我談話。");
    } else if (status == 3) {
        qm.forceStartQuest();
        qm.summonMsg(4);
        qm.dispose();
    }
}

function end(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        qm.sendNext("噢，看來你已經成功打敗了 #o100120#。 很簡單，不是嗎？這些只是普通的怪物，更厲害的怪物在外面非常危險的世界。好了，看來你已經通過了我的測試，我送給你一點東西吧。");
    } else if (status == 1) {
        qm.gainItem(1002869, 1);
        qm.gainItem(1052177, 1);
        qm.forceCompleteQuest();
        qm.gainExp(30);
        qm.summonMsg(6);
        qm.dispose();
    }
}
