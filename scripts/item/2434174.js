function start() {
    if (im.getSpace(4)>=62) {
       im.gainItem(2434174,-1);
       im.gainItem(4032006,1200);
       im.gainItem(4000115,5000);
       im.gainItem(4000134,5000);
       
       im.sendOk("恭喜獲得升級4階瑪瑙戒指所需材料");
       im.dispose();
} else {
     im.sendOk("請保留其他欄有62個格子以上");
    }
    im.dispose();
}