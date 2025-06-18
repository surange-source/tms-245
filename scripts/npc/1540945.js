function start() {
    if (cm.isQuestFinished(1465)) {
        cm.sendSimple("勇士，你想要做什麼啊？\r\n\r\n#b#L0#我想要強化V核心或是製作。#l\r\n#L1#沒什麼啦！天氣真好！#l");
    } else {
        cm.sendOk("我還無法為你提供服務。");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    cm.dispose();
    if (mode != 1) {
        return;
    }
    if (selection == 0) {
        cm.openUI(1131);
    } else {
        cm.sendOk("這附近受到艾爾達斯的影響氣候劇烈變化，要小心啊！");
    }
}
