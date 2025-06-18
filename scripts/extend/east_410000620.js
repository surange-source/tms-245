function start() {
    cm.askMenuS("該往哪裡移動呢？\r\n\r\n#b#L0##m410000770##l\r\n\r\n#L1##m410003020##l");
}

function action(mode, type, selection) {
    switch (selection) {
        case 0:
            cm.warp(410000770, 2);
            break;
        case 1:
            if (cm.getLevel() < 270) {
                cm.showProgressMessageFont("僅270等級以上才可進入該地區。", 3, 20, 20, 0);
            } else {
                cm.warp(410003020, 3);
            }
            break;
    }
    cm.dispose();
}
