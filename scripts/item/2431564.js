function start() {
    if (im.haveItem(1122234) && im.haveItem(1122239)) {
        im.sendSimple("你身上有#i1122234##t1122234#和#i1122239##t1122239#，你想進化哪一個？#b\r\n#L0##i1122234##t1122234##l\r\n#L1##i1122239##t1122239##l");
    } else {
        if(im.haveItem(1122234)) {
            action(1, 0, 0);
        } else if(im.haveItem(1122239)) {
            action(1, 0, 1);
        } else {
            im.sendOk("請確認你背包裡有#t1122234#或者#t1122239#。");
            im.dispose();
        }
    }
}

function action(mode, type, selection) {
    var i = -1;
    var chance = -1;
    var gain = -1;
    if (selection == 0) {
        i = 1122234;
        chance = 70;
        gain = 1122239;
    } else if (selection == 1) {
        i = 1122239;
        chance = 50;
        gain = 1122244;
    }
    if (i == -1) {
        im.sendOk("出現未知錯誤。")
        im.dispose();
        return;
    }
    var random = new java.util.Random();
    if(random.nextInt(100) <= chance) {
        if(im.canHold(i)) {
            im.used(1);
            im.gainItem(i, -1);
            im.gainLockItem(gain, 1, false, 0, "高級楓之谷勇士之心(盜賊)");
        } else {
            im.sendOk("請確認你背包有足夠的空間。");
        }
    } else {
        im.used(1);
        im.sendOk("進化失敗。");
    }
    im.dispose();
}
