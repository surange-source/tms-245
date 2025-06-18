var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
    status++;
    } else {
    if (status == 0) {
        cm.dispose();
    }
    status--;
    }
    if (status == 0) {
        cm.setInGameCurNodeEventEnd(true);
        cm.sendDirectionEffectPlay("Effect/Direction6.img/effect/tuto/balloonMsg1/4");
        cm.enableActions();
        cm.EnableUI(1);
        cm.enableActions();
        cm.sendPlayerToNpc("#b這是……#k");
    } else if (status == 1) {
        cm.showMapEffect("demonSlayer/pendant");
        cm.setDelay(4200);
        cm.sendPlayerToNpc("#b...#k");
    } else if (status == 2) {
        cm.sendDirectionEffectPlay("Effect/Direction6.img/effect/tuto/balloonMsg1/5");
        cm.sendDirectionEffectPlay("Effect/Direction6.img/effect/tuto/balloonMsg1/6");
        cm.setDelay(2000);
        cm.EnableUI(0);
        cm.warp(931050040,0);
        cm.enableActions();
        cm.dispose();
    }

}
