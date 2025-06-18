function start() {
    if (ms.isQuestFinished(34218) && !ms.isQuestFinished(34300)) {
        ms.forceCompleteQuest(34300);
        ms.warp(450003100, 3);
    }
    ms.dispose();
}