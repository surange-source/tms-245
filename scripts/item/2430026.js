function start() {
    if (im.getSpace(1) < 4 ) {
        im.sendOk("請讓你背包裝備欄騰出4個空格。");
        im.dispose();
    } else {
        im.gainItem(2430026,-1)
        im.gainItem(1712001, 1);
        im.gainItem(1712002, 1);
        im.gainItem(1712003, 1);
        im.sendOk("請打開裝備欄、消耗欄、特殊欄查收。");
    im.dispose();
    }
}