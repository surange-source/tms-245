function start() {
    if (im.haveItem(2432005, 1) == true) {
        im.gainItem(4310088, 5);
        im.gainItem(2432005, -1);
        im.playerMessage(-1, "恭喜您獲得5個RED幣");
        im.worldSpouseMessage(0x20, "『幸運硬幣箱』 : 恭喜 " + im.getPlayer().getName() + " 從 <幸運硬幣箱中> 獲得 5 個RED幣。");
    im.dispose();
    } else {
        im.sendOk("不足");
    im.dispose();
    }
}