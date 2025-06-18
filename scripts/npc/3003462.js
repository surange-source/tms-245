function start() {
    if (cm.isQuestFinished(1465)) {
        cm.sendSimple("我是官廳的書記#p" + cm.getNpc() + "#，找我有什麼事情嗎？\r\n\r\n#b#L0#我想要強化V核心或是製作。#l\r\n#L1#沒什麼啦！天氣真好！#l");
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
        cm.sendOk("這種天氣，光是望著天空欣賞鳥兒就很舒服了，\r\n克里提亞斯的鳥兒最有名的就是飛得高唷！");
    }
}
