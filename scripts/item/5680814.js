var status = -1;
var isAngel;
var isBeta;
var isZero;

function start() {
    isAngel = im.getBeginner() == 6001;
    isZero = im.getBeginner() == 10000;
    if (isAngel) {
        im.askAngelicBuster();
    } else if (isZero) {
        im.sendSimple("請選擇要接受變更的角色.#b\r\n\r\n#b#L0#神之子阿爾法#l\r\n#L1#神之子蓓塔#l\r\n#L2#神之子阿爾法 + 神之子蓓塔#l");
    } else {
        action(1, 0, 0);
    }
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else
        status--;

    var i = -1;
    if (status == i++) {
        im.dispose();
    } else if (status == i++) {
        if (isAngel) {
            if (selection == -1) {
                im.dispose();
                return;
            }
            isAngel = selection != 0;
            isBeta = false;
            isZero = false;
        } else if (isZero) {
            isBeta = selection == 1;
            isZero = selection == 2;
            isAngel = false;
        }
        im.askRandomMixColorLens(im.getItemId(), isAngel, isBeta, isZero, "點擊確認後，頭髮將立即染色為任意選擇的2種混合顏色。");
    } else if (status == i++) {
        if (im.used()) {
            var srcBaseColor = isAngel || isBeta ? im.getPlayer().getSecondHairBaseColor() : im.getPlayer().getHairBaseColor();
            var srcMixColor = isAngel || isBeta ? im.getPlayer().getSecondHairMixedColor() : im.getPlayer().getHairMixedColor();
            var srcPropColor = isAngel || isBeta ? im.getPlayer().getSecondHairProbColor() : im.getPlayer().getHairProbColor();
            var baseColor = Math.random() * 8;
            var mixColor = Math.random() * 8;
            if (baseColor == mixColor) {
                mixColor = mixColor == 7 ? 0 : (mixColor + 1);
            }
            im.getPlayer().changeMixHairColor(isAngel || isBeta, baseColor, mixColor, 50);
            var msg = "已將頭髮染成特殊的混合顏色了！真是個美麗的顏色，要照照鏡子嗎？";
            if (isZero) {
                var baseColor2 = Math.random() * 8;
                var mixColor2 = Math.random() * 8;
                if (baseColor2 == mixColor2) {
                    mixColor2 = mixColor2 == 7 ? 0 : (mixColor2 + 1);
                }
                var srcBaseColor2 = im.getPlayer().getSecondHairBaseColor();
                var srcMixColor2 = im.getPlayer().getSecondHairMixedColor();
                var srcPropColor2 = im.getPlayer().getSecondHairProbColor();
                im.getPlayer().changeMixHairColor(true, baseColor2, mixColor2, 50);
                im.sayMixHairColorZeroNew(msg, baseColor, mixColor, 50, baseColor2, mixColor2, 50, srcBaseColor, srcMixColor, srcPropColor, srcBaseColor2, srcMixColor2, srcPropColor2);
            } else {
                baseColor2 = -1;
                mixColor2 = -1;
                im.sayMixHairColorNew(isAngel, isBeta, isZero, msg, baseColor, mixColor, 50, srcBaseColor, srcMixColor, srcPropColor);
            }
        } else {
            im.sendOk("發生未知錯誤。");
        }
        im.dispose();
    } else {
        im.dispose();
    }
}
