status = -1;
function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            im.dispose();
        }
        status--;
    }
    if (status == 0) {
        var avail = "";
            avail+="#r注意：裝備提升後默認升級次數為0\r\n";
            avail+="#r注意：裝備不支持增加火花提升的屬性\r\n";
            avail+="#r注意：提升的時候一定要先砸卷後提升\r\n";
            avail+="#r注意：把要提升的 [最高級貝勒首飾裝備] 放在裝備欄的第一個位置！\r\n\r\n\r\n#k";
            im.sendOk("#b#e哈咯，憑借本券私聊GMQQ：3812049 提升 攻擊100\r\n#b"+avail);
            im.dispose();
    }
}