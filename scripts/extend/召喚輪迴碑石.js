var point = 30;

function start() {
    if (!cm.getPlayer().isBronzeIMvp()) {
        cm.getPlayer().dropMessage(1, "很抱歉，你不能使用這個功能。");
        cm.dispose();
        return;
    }
    cm.sendYesNo("要召喚輪迴碑石需要消耗#b" + point + "楓點(不足時用樂豆補)#k\r\n是否需要召喚?\r\n\r\n#r※離開地圖、下線或是輪迴持續時間結束時消失#k\r\n");
}

function action(mode, type, selection) {
    if (mode == 1) {
        if (cm.getNX(1) + cm.getNX(2) >= point) {
            if (cm.getNX(2) >= point) {
                cm.gainNX(2, -point);
            } else {
                if (cm.getNX(2) > 0) {
                    point -= cm.getNX(2);
                    cm.gainNX(2, -cm.getNX(2));
                }
                cm.gainNX(1, -point);
            }
            cm.useSkill(80011261, 1);
        } else {
            cm.sendOk("你的點數不足，無法使用。");
        }
    } else {
        cm.sendOk("需要召喚的時候再找我吧。");
    }
    cm.dispose();
}