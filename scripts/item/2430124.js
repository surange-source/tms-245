function start() {
    if (!im.isQuestFinished(1465)) {
        im.sendOkS("當前還無法使用這個物品！");
    } else {
        if (im.used()) {
            if (!im.gainRandVSkill()) {
                im.gainItem(im.getItemId(), 1);
                im.sendOkS("沒有五轉或是其他未知原因，使用失敗！");
            }
        }
    }
    im.dispose();
}