function start() {
    if (im.haveItem(2430048)) {
       im.gainItem(2430048,-1);
       im.gainItem(2049153,10);
       im.sendOk("恭喜獲得#r#e10#k#n個#v2049153#，請保持消耗10個空格在使用!");
       im.dispose();
} else {
     im.sendOk("沒有了榮譽勳章");
    }
    im.dispose();
}