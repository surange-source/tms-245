
function start() {
    if (im.getJob() == 4112) {
        im.gainItem(2432127, -1);
        im.teachSkill(80011089 ,  1, 1);
        im.sendOk("您通過力量的考驗，獲取了新的技能！！\r\n         #e#r【冰龍斬】#k#n\r\n\r\n             #s80011089#");
        im.dispose();
    } else {
        im.sendOk("您並非為劍豪職業，或者您還未完成4轉！！請完成後再來找我");
        im.dispose();
    }
    im.dispose();
}