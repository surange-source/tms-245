function start() {
    im.sendSimple("您好！我是可以變更名稱的新名稱先生，需要我幫忙嗎？ \r\n\r\n#b#L0# 角色名稱變更\r\n#L1# 結束對話。");
}

function action(mode, type, selection) {
    if (selection == 0) {
        im.sendUIWindow(1110, im.getItemId());
    } else {
        im.sendOk("那麼告辭了！");
    }
    im.dispose();
}