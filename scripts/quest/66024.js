var status = -1;
var spaceCheck = false;
function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    var i = 0;
    if (status == i++) {
        qm.sendNext("您好，#h0#！");
    } else if (status == i++) {
        qm.sendNextPrev("真的非常感謝您一直以來對#b蒼龍俠客#k角色的喜愛！");
    } else if (status == i++) {
        qm.sendNextPrev("我想您應該也發現了，#h0#您已經重生為#b<墨玄>#k這個強大的新角色！\r\n不過遺憾的是，您沒辦法再繼續使用原先的#b蒼龍俠客#k角色。");
    } else if (status == i++) {
        qm.sendNextPrev("不過您也不用太擔心，#h0#您這段期間創造的紀錄全都有保存下來，不會消失！\r\n\r\n#b角色等級/經驗值/屬性/潛能\r\n#b持有裝備/道具/秘法符文\r\n#b任務/成就/收藏");
    } else if (status == i++) {
        qm.sendNextPrev("新職業#b墨玄#k無法使用您先前使用的#b[槍]#k系列武器，");
    } else if (status == i++) {
        qm.sendNextPrev("不過為了協助像#h0#一樣重生為新職業的玩家，在一定期間內，我們會讓您將#b[槍]#k武器變更為墨玄專用武器#b[武拳]#k，只不過#b每個世界僅限1次#k。\r\n\r\n#b烏特卡勒、俠客圖斯、夫尼爾、航海師、神秘冥界武器\r\n#b克梅勒茲、波賽頓、戰國時代武器\r\n#b梅斯特武器\r\n#b封印的創世武器、 創世武器\r\n\r\n#r※ 活動時間：\r\n   2021年 02月 24日 09時 00分\r\n   ~ 2021年 03月 30日 23時 59分");
    } else if (status == i++) {
        qm.sendNextPrev("喔對了！還有一件事情。為了減少勇士的不便#b現金道具#k也可以在一定時間內於#b冒險者職業群#k和#k墨玄#k之間自由透過現金保管箱移動。\r\n\r\n#r※ 活動時間：\r\n   2021年 02月 24日 09時 00分\r\n   ~ 2021年 03月 30日 23時 59分");
    } else if (status == i++) {
        if (!spaceCheck && qm.getSpace(2) < 3) {
            qm.sendPrev("最後想給勇士一個禮物，不過你的背包似乎沒有空位耶。\r\n可以先幫忙把#b消耗欄位空出3格以上#k嗎？");
        } else {
            spaceCheck = true;
            qm.sendNextPrev("那麼最後，請收下這份禮物。希望勇士你能好好運用。\r\n\r\n#b#i2633101:# #t2633101:#\r\n#b#i2633102:# #t2633102:#\r\n#b#i2633103:# #t2633103:#");
        }
    } else if (status == i++) {
        if (!qm.isQuestFinished(qm.getQuest())) {
            qm.forceCompleteQuest();
            qm.gainItemPeriod(2633101, 1, 7);
            qm.gainItemPeriod(2633102, 1, 7);
            qm.gainItemPeriod(2633103, 1, 7);
        }
        qm.sendNextPrev("現在您只要走進那個傳送點，就能重新誕生為全新的#b<墨玄>#k了，\r\n我們相信#h0#一定可以迅速適應，並成長為更強大的勇士！");
    } else if (status == i++) {
        qm.sendNextPrev("以墨玄的身分重新出發的#h0#，祝福您獲得幸運女神的眷顧！");
    } else if (status == i++) {
        qm.dispose();
    } else {
        qm.dispose();
    }
}