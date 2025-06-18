function start() {
    cm.askMenuS("搭乘小型飛空艇便能前往想去的甲板。\r\n該往哪裡移動呢？\r\n\r\n#b#L0##m130000210##k#l\r\n#b#L1##m450009100##k#l\r\n\r\n#L2#不要使用小型飛空艇。#l");
}

function action(mode, type, selection) {
    switch (selection) {
        case 0:
            if (cm.getLevel() < 250) {
                cm.showProgressMessageFont("僅250等級以上才可進入該地區。", 3, 20, 20, 0);
            } else {
                cm.warp(130000210, 2);
            }
            break;
        case 1:
            cm.warp(450009100, 1);
            break;
    }
    cm.dispose();
}
