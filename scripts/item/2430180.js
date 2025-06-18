//儲值3000禮包
function start() {
    if (im.getSpace(1)>=3) {
       im.gainItem(2430180,-1);
       im.gainItem(1202187,1);
       im.gainItem(1202188,1);
       im.gainItem(1202189,1);
       
       im.sendOk("恭喜獲得圖騰禮包!!");
       im.dispose();
} else {
     im.sendOk("請保留裝備欄有3個格子以上");
    }
    im.dispose();
}