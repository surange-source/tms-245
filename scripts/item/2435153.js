function start() {
    if (im.getSpace(1) < 3) {
        im.sendOk("請讓你背包裝備欄騰出3個空格。");
        im.dispose();
    } else {
        im.gainItem(2435153,-1)
        im.gainItem(1712000, 1);
        im.gainItem(1712000, 1);
        im.gainItem(1712000, 1);
        im.sendOk("請打開裝備欄。");
        var item = im.gainGachaponItem(1712000, 1, "[神秘力量]", 3);
        im.dispose();
    }
}