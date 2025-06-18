function start() {
    cm.askMenu("搭乘小型飛空艇便能前往想去的甲板。\r\n該往哪裡移動呢？\r\n\r\n#b#L0#搭乘小型飛空艇前往新楓之谷聯盟的前哨基地。#k#l\r\n\r\n#L1#不要使用小型飛空艇。#l");
}

function action(mode, type, selection) {
    switch (selection) {
        case 0:
            if (cm.getLevel() >= 245) {
                cm.warp(450009050, 11);
            } else {
                cm.sendOk("僅245等級以上才可進入該地區。");
            }
            break;
    }
    cm.dispose();
}
