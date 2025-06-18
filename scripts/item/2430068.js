function start() {
    if (im.getSpace(2)>=5) {
       im.gainItem(2430068,-1);
       im.gainItem(2048723,5);
       im.sendOk("恭喜獲得#r#e5#k#n個#v2048721#，請保持消耗5個空格再使用!");
       im.dispose();
} else {
     im.sendOk("請保留消耗欄裡只有有5個格子以上");
    }
    im.dispose();
}