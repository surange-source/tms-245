function start() {
    if (im.getSpace(2)>=10) {
       im.gainItem(2431297,-1);
       im.gainItem(5062000,50);
       im.gainItem(5062009,50);
       im.gainItem(5062500,50);
     //  im.gainItem(5062009,50);
       im.gainItem(5062024,15);
       im.gainItem(2049116,6);
       im.gainItem(2430781,5);
       im.gainItem(2340000,6);
       im.gainItem(2431923,3);
       im.gainItem(4001839,3000);
       im.gainItem(4021016,1000);
       im.gainItem(4032226,5);
       //im.gainItem(2431944,1);
       //im.gainItem(2431945,6);
       //im.gainItem(2048723,3);
       //im.gainItem(2432352,1);
      // im.gainItem(2434956,1);
       //im.gainItem(5030035,1); 
       im.gainNX(1, 99999);
    //   im.gainNX(2, 66666);

       im.sendOk("#e#r恭喜你獲得了冰雪聰明的GM送出的超值大禮!");
       im.dispose();
} else {
     im.sendOk("請保留消耗欄裡只有有10個格子以上");
    }
    im.dispose();
}