function start() {
    im.sendYesNo("你好，#h0#" + (im.getPlayer().getGender() == 0 ? "先生" : "女士") + "！\r\n目前可以獲得#i" + im.getItemId() + ":# #t" + im.getItemId() + ":#  #b1個#k 喔。要現在接收嗎？");
}

function action(mode, type, selection) {
    if (mode != 1) {
        im.dispose();
        return;
    }
    if (im.canHold(5212000) && im.used()) {
        im.sendNext("那祝你有愉快的一天。");
        im.gainItemPeriod(5212000, 1, 14400000);
    }
    im.dispose();
}