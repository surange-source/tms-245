function start() {
    if (im.haveItem(2432278)) {
       im.gainItem(2432278,-1);
       im.gainNX(1000);
       im.playerMessage(1, "恭喜獲得1000樂豆點!");
       im.worldSpouseMessage(0x12, "『簽到系統』" + " : " + "玩家 " + im.getChar().getName() + " 已經領取1000樂豆點！");
       im.dispose();
} else {
     im.sendOk("沒有了榮譽勳章");
    }
    im.dispose();
}