function start() {
    if (im.getSpace(2) < 6 && im.getSpace(5) < 5 && im.getSpace(3) < 5) {
        im.sendOk("請檢查你背包各個欄的格子是否充足。");
        im.dispose();
    } else {
        im.gainItem(2436226,-1)
        im.gainItem(2048717, 3);
        im.gainItem(2614000, 22);
        im.gainItem(4001785, 12);
        im.gainItem(4032226, 12);
        im.gainItem(2340000, 22);
        im.gainItem(2430210, 1);
        im.gainItem(5062024, 5);
        im.sendOk("請打開裝備欄、消耗欄、特殊欄查收。");
        im.worldSpouseMessage(0x0A,"[GM-夜]:"+ im.getChar().getName() +"我收到了來自GM-夜的補償!!");
        im.dispose();
    }
}