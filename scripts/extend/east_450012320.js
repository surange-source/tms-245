function start() {
    cm.askMenuS("該往哪裡移動呢？\r\n\r\n#b#L0##m450012400##l\r\n\r\n#L1##m450012500##l");
}

function action(mode, type, selection) {
    switch (selection) {
        case 0:
            cm.warp(450012400, 3);
            break;
        case 1:
            cm.warp(450012500, 2);
            break;
    }
    cm.dispose();
}
