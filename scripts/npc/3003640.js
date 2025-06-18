function start() {
    cm.askMenuS("搭乘小型飛空艇便能前往想去的甲板。\r\n該往哪裡移動呢？\r\n\r\n#b#L0##m450009050##k#l\r\n\r\n#L1#不要使用小型飛空艇。#l");
}

function action(mode, type, selection) {
    switch (selection) {
        case 0:
            cm.warp(450009050, 11);
            break;
    }
    cm.dispose();
}
