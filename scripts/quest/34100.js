function end(mode, type, selection) {
    if (!qm.isQuestFinished(1466)) {
        qm.sendOk("…該怎麼做才會消氣呢？\r\n\r\n#b(必須完成<全新的力量，神秘力量> 任務取得秘法符文。)");
    } else {
        qm.forceCompleteQuest();
    }
    qm.dispose();
}