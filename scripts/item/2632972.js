function start() {
    if (!im.isQuestFinished(39801)) {
        im.sendOkS("當前還無法使用這個物品！");
    } else {
        if (im.haveItem(im.getItemId())) {
            if (!im.gainVCoreSkill(10000031) || !im.used()) {
                im.sendOkS("因未知原因，使用失敗！");
            }
        }
    }
    im.dispose();
}
