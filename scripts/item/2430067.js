function start() {
    if (im.getSpace(2)>=5) {
       im.gainItem(2430067,-1);
       im.gainItem(2048724,5);
       im.sendOk("恭喜獲得#r#e5#k#n個#v2048724#，請保持消耗5個空格再使用!");
       im.dispose();
} else {
     im.sendOk("請檢查消耗欄是否有5個格子以上");
    }
    im.dispose();
}