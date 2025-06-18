/*
 * Time Temple - Kirston
 * Twilight of the Gods
 */

function start() {
    cm.sendOk("如果我有善良之鏡,我就能召喚黑魔法師!\r\n等等!好像哪裡錯了!為什麼召喚不了黑魔法師?我感覺到跟黑魔法師完全不同的……啊啊啊!!!!!!!\r\n\r\n #b(請把奇拉的使命傳遞下去.)");
}

function action(mode, type, selection) {
    cm.getMap().killAllMonsters(false);
    if (cm.getMapId() != 270051100) {
        cm.spawnMob(8820010, 1, 5, -42);
        cm.forceStartReactor(cm.getMapId(), 2709000);
    } else {
        cm.spawnMob(8820300, 1, 5, -42);
        cm.killMob(8820300);
    }
    cm.removeNpc(cm.getMapId(), 2141000);
    cm.dispose();
}
