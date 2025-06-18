/* 
階梯
*/

function start() {
    cm.sendSimple("（要移動到哪裡？）\r\n#b#L0#移動至光榮大廳1層。#l\r\n#L1#移動至光榮大廳2層。#l\r\n#L2#移動至光榮大廳3層。#l\r\n#L3#移動至光榮大廳4層。#l\r\n#L4#移動至光榮大廳5層。#l\r\n#L5#退出光榮大廳。#l");
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    }
    switch (selection) {
        case 0:
            cm.warp(710000000);
            break;
        case 1:
            cm.warp(710000100);
            break;
        case 2:
            cm.warp(710000200);
            break;
        case 3:
            cm.warp(710000300);
            break;
        case 4:
            cm.warp(710000400);
            break;
        case 5:
            cm.warp(cm.getSavedLocation("MULUNG_TC"));
            cm.clearSavedLocation("MULUNG_TC");
            break;
    }
    cm.dispose();
}
