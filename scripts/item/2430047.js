function start() {
    if (im.haveItem(2430047)) {
       im.gainItem(2430047,-1);
       im.gainNX(50000);
       im.sendOk("恭喜獲得#r#e5W#k#n樂豆點!");
       im.dispose();
} else {
     im.sendOk("沒有了榮譽勳章");
    }
    im.dispose();
}