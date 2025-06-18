function start() {
    if (ms.isQuestFinished(34331) && !ms.isQuestFinished(34450) && !ms.isQuestActive(34450)) {
        if (ms.isQuestFinished(34478)) {
            var status = ms.getQuestNoRecord(34478);
            status.setStatus(0);
            ms.getPlayer().updateQuest(status, true);
        }
    }
    ms.dispose();
}