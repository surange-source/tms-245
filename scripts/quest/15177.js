var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    var i = -1;
    if (status == i++) {
        qm.dispose();
    } else if (status == i++) {
        qm.sendNextENoESC("你好嗎？我是#b休菲凱曼#k，呵呵。");
    } else if (status == i++) {
        qm.sendNextPrevENoESC("有人說最近#b怪物公園#k變得有些無聊，\r\n趁這個機會利用新的概念嘗試了新的裝飾！\r\n名字是#b<怪物公園 REBORN(緞帶)>！！#k 哈哈哈！！");
    } else if (status == i++) {
        qm.sendNextPrevENoESC("怎麼樣呢? 光是聽到名字就會讓人覺得很有趣吧?\r\n若是想知道詳細內容，隨時都能來問我~！");
    } else {
        qm.forceCompleteQuest();
        qm.dispose();
    }
}