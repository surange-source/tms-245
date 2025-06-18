//開服大禮包2
function start() {
    if (im.getSpace(3)>=10) {
       im.gainItem(2431294,-1);
       im.gainItem(4310097,1);
       im.gainItem(4310098,1);
       im.gainItem(4310064,1);
       im.gainItem(4310065,1);
       im.gainItem(4310156,1);
       im.gainItem(4032766,3);
       im.gainItem(4310210,20);
       im.gainItem(4033115,1);
       im.sendOk("恭喜獲得大量神秘貨幣!!");
       im.worldSpouseMessage(0x0A,""+ im.getChar().getName() +" ：我從糖糖楓之谷開服大禮包2中獲取了大量的神秘貨幣獎勵,賊嗨!!!");
       im.dispose();
} else {
     im.sendOk("請保留其他欄有10個格子以上");
    }
    im.dispose();
}