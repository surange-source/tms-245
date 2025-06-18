function start() {
    if (im.haveItem(2431642)) {
       im.gainItem(2431642,-1);
       im.gainNX(150000);
       im.playerMessage(1, "恭喜獲得15W樂豆點!");
       im.worldSpouseMessage(0x0A, "『新人獎勵』" + " : " + "玩家 " + im.getChar().getName() + " 已經領取新人15W樂豆點！");
       im.dispose();
} else {
     im.sendOk("沒有了榮譽勳章");
    }
    im.dispose();
}