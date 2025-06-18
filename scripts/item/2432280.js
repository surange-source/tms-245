function start() {
    if (im.haveItem(2432280)) {
       im.gainItem(2432280,-1);
       im.gainNX(10000);
       im.playerMessage(1, "恭喜獲得10000樂豆點!");
       im.worldSpouseMessage(0x15, "『在線獎勵』" + " : " + "玩家 " + im.getChar().getName() + " 已經領取在線360分鐘獎勵10000樂豆點！");
       im.dispose();
} else {
     im.sendOk("沒有了榮譽勳章");
    }
    im.dispose();
}