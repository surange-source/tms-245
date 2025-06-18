function start() {
    if (im.haveItem(2433295)) {
       im.gainItem(2433295,-1);
       im.gainNX(10000);
       im.playerMessage(1, "恭喜獲得1W樂豆點!");
      // im.worldSpouseMessage(0x00, "『補償獎勵』" + " : " + "玩家 " + im.getChar().getName() + " 已經領取補償樂豆點！");
       im.dispose();
} else {
     im.sendOk("沒有了榮譽勳章");
    }
    im.dispose();
}