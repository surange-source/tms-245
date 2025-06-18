function start() {
    var openUI = false;
    if (im.getMap() == null || !im.getMap().isTown()) {
        im.sendOk("葫蘆裡的經驗值只能在村莊中獲得的喔！");
    } else if (im.getWorldShareInfo(500605, "subName") == null) {
        im.sendOk("由於不是#e弟子角色#n所以，所以無法再獲得經驗值。");
        im.used();
        im.updateWorldShareInfo(500605, null);
    } else if (im.getWorldShareInfo(500605, "mainLv") == null || im.getLevel() >= parseInt(im.getWorldShareInfo(500605, "mainLv"))) {
        im.sendOk("由於等級比師父角色等級 (最初登錄時間) 高，所以無法再獲得經驗值。");
        im.used();
        im.updateWorldShareInfo(500605, null);
    } else if (im.getLevel() >= 220) {
        im.sendOk("由於等級大於220，所以無法再獲得經驗值。");
        im.used();
        im.updateWorldShareInfo(500605, null);
    } else {
        openUI = true;
    }
    im.showSpecialUI(openUI, "UIExpBottle");
    im.dispose();
}