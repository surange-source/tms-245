/* 黛雅的G-藥水 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        qm.sendNext("你不想現在領取嗎？需要的話，請在週一之內領走。");
        qm.dispose();
        return;
    }
    if (qm.getGuild().getLevel() < 1 || !qm.getGuild().hasSkill(91000006)) {
        qm.dispose();
        return;
    }
    if (status == 0) {
        qm.sendYesNo("公會定期支援物品到了。來，拿著。希望你不要有什麼不滿。努力活動，等公會等級提高之後，就可以獲得更多的東西了。");
    } else {
        if (!qm.canHold(2002037, qm.getGuild().getLevel() * 20)) {
            qm.sendOk("請確保您有足夠的背包空間。");
        } else {
            qm.gainItemPeriod(2002037, qm.getGuild().getLevel() * 20, 7);
            qm.forceCompleteQuest();
            qm.sendNext("這一周辛苦你了。下週一的時候，還會有新的支援物品，到時你再過來看看。");
        }
        qm.dispose();
    }
}

function end(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        qm.sendNext("你不想現在領取嗎？需要的話，請在週一之內領走。");
        qm.dispose();
        return;
    }
    if (qm.getGuild().getLevel() < 1 || !qm.getGuild().hasSkill(91000006)) {
        qm.dispose();
        return;
    }
    if (status == 0) {
        qm.sendYesNo("公會定期支援物品到了。來，拿著。希望你不要有什麼不滿。努力活動，等公會等級提高之後，就可以獲得更多的東西了。");
    } else {
        if (!qm.canHold(2002037, qm.getGuild().getLevel() * 20)) {
            qm.sendOk("請確保您有足夠的背包空間。");
        } else {
            qm.gainItemPeriod(2002037, qm.getGuild().getLevel() * 20, 7);
            qm.forceCompleteQuest();
            qm.sendNext("這一周辛苦你了。下週一的時候，還會有新的支援物品，到時你再過來看看。");
        }
        qm.dispose();
    }
}
