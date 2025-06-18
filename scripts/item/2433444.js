
function start() {
    if (im.getSpace(3)>=30) {
       im.gainItem(2433444,-1);
       im.gainItem(4000000,3000);
       im.gainItem(4000016,3000);
       
       im.sendOk("恭喜獲得升級2階瑪瑙戒指所需材料");
       im.dispose();
} else {
     im.sendOk("請保留其他欄有30個格子以上");
    }
    im.dispose();
}