function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (cm.getMonsterCount(240080500) <= 0 && cm.getMapId() == 240080500) {
            if (status == 0) {
                cm.sendPlayerToNpc("等等,好像還有人?!");
            } else if (status == 1) {
                cm.sendPlayerToNpc("御龍魔那個傢伙還活著呀!");
            } else if (status == 2) {
                cm.sendYesNo("你想離開這裡麼?");
            } else if (status == 3) {
                cm.warp(240080000);
                /*if (!cm.canHold(4001713, 1)) {
                 cm.sendOk("請清理其他空間!");
                 cm.dispose();
                 return;
                 }
                 cm.gainItem(4001713, 1);*/
                if (cm.getEventCount("Dragonica") < 10) {
                    cm.setEventCount("Dragonica");
                    var maple = Math.floor(Math.random() * 1) + 50;
                    cm.getPlayer().gainPQPoint(10);
                    cm.gainMeso(100000);
                    cm.gainNX(2, 1000);
                }
                cm.dispose();
            }
        } else {
            cm.dispose();
        }
    }
}
