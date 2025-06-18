//開服大禮包3
function start() {
    if (im.getSpace(5)>=6) {
       im.gainItem(2431295,-1);
       im.gainItem(5062002,10);
       im.gainItem(5062009,10);
       im.gainItem(5062010,3);
       im.gainItem(5062024,1);
       im.gainItem(5062500,10);
       im.gainItem(5062503,3);
       im.sendOk("恭喜獲得大量炫酷方塊!");
       im.worldSpouseMessage(0x0A,""+ im.getChar().getName() +" ：我從糖糖楓之谷開服大禮包3中獲取了大量的酷炫方塊,很強勢!!!");
       im.dispose();
} else {
     im.sendOk("請保留其他欄有6個格子以上");
    }
    im.dispose();
}