var point = 100;

function start() {
    if (!cm.getPlayer().isBronzeIMvp()) {
        cm.getPlayer().dropMessage(1, "很抱歉，你不能使用這個功能。");
        cm.dispose();
        return;
    }
    cm.sendYesNo("要開啟防搶圖#e30分鐘#n需要消耗#b" + point + "楓點(不足時用樂豆補)#k\r\n是否需要開啟?\r\n\r\n#r※離開地圖或是下線時自動關閉#k\r\n");
}

function action(mode, type, selection) {
    if (mode == 1) {
        if (cm.getNX(1) + cm.getNX(2) > point) {
            if (cm.getMap() == null) {
                cm.getPlayer().dropMessage(1, "很抱歉，你不能使用這個功能。");
                cm.dispose();
                return;
            }
            if (cm.getMap().setOwner(cm.getPlayer().getId(), point)) {
                cm.sendOk("成功開啟防搶圖模式。");
            } else {
                cm.sendOk("開啟防搶圖模式失敗。\r\n\r\n#r※請確認當前地圖可以使用防搶圖功能並且沒有其他玩家#k\r\n");
            }
        } else {
            cm.sendOk("你的點數不足，無法使用。");
        }
    } else {
        cm.sendOk("需要的時候再找我吧。");
    }
    cm.dispose();
}