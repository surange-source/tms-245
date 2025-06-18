var status = -1;
function action(mode, type, selection) {
    if (mode == 1) {
        status ++;
    } else {
        cm.dispose();
        return;
    }

    if (status == 0) {
        cm.sendYesNo("你想移動到匠人的村莊匠人街嗎？在#b<匠人街>#k可以學習#b採藥、採礦、裝備製作、飾品製作、煉金術等#k5種專業技術。");
    } else if (status == 1) {
        cm.saveLocation("ARDENTMILL");
        cm.playPortalSE();
        cm.warp(910001000, "st00");
        cm.dispose();
    }
}
