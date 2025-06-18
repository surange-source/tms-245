/* 神奇方塊碎片 */

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0) {
        im.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        im.sendNext("搜集到#r10個#k#b#t2430481##k，可以獲得#b#i2049401:##t2049401##k。搜集到#r20個#k#b#t2430481##k可以獲得#b#i2049400:##t2049400##k。");
    }
    if (status == 1)
    {
        im.sendYesNo("你是否要進行兌換?");
    }
    if (status == 2)
    {
        im.sendNext("請選擇要兌換的物品:\r\n#L1#用#r10個#k#b#t2430481##k兌換1個#b#i2049401:##t2049401##k#l\r\n#L2#用#r20個#k#b#t2430481##k兌換1個#b#i2049400:##t2049400##k")
    }
    if (status == 3)
    {
        if(im.getItemQuantity(2430481) >= selection * 10) {
            im.gainItem(2430481, - selection * 10);
            im.gainItem(2049402 - selection,1);
            im.sendOk("Ok");
            im.dispose();
        } else {
            im.sendOk("你擁有的#b#t2430112##k不夠哦!....");
            im.dispose();
        }
    }
}