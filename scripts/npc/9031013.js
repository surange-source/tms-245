function action(mode, type, selection) {
    if (cm.getPlayer().getProfessionLevel(92030000) > 0) {
        cm.sendProfessionWindow();
    } else {
        cm.playerMessage( - 9, "未學習飾品製作，無法使用。");
    }
    cm.dispose();
}
