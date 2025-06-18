var status = 0;
var typed;
var em;
var eim;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) { 
    if (mode == 1) {
        if (cm.getMapId() == 450004150) {
            cm.warp(450004550);
            cm.dispose();
        } else {
            cm.dispose();
        }
    }
    cm.dispose();
}
