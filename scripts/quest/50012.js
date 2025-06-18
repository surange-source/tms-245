/*
    任務: 魔術、科學和宇宙能源
    描述: #o9400295#也可以奪取處於昏迷狀態的#p9120030#的肉體，再偽裝成#p9120030#的意志並控制#o9400296#…！我必須盡快將此事告訴#p9120025#。
*/

function start(mode, type, selection) {
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.getQuestStatus(50012) == 0) {
        qm.forceStartQuest();
    } else {
        qm.forceCompleteQuest(50015);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}
