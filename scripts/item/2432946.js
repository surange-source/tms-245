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
        im.askMixHairColor(im.getItemId(), isAngel, isBeta ? 1 : isZero ? 2 : 0, 50, "可以變更為混合2種顏色的髮色. 選擇基本顏色和混合顏色後, 利用滾輪製作出屬於自己的顏色.");
    } else if (status == i++) {
        var player = im.getPlayer();
        var baseColor = player.getTempValues().getOrDefault("baseHairColor", null);
        var mixColor = player.getTempValues().getOrDefault("mixHairColor", null);
        var mixProp = player.getTempValues().getOrDefault("mixColorProp", null);
        var baseColor2 = player.getTempValues().getOrDefault("baseHairColor2", null);
        var mixColor2 = player.getTempValues().getOrDefault("mixHairColor2", null);
        var mixProp2 = player.getTempValues().getOrDefault("mixColorProp2", null);
        if (baseColor == null || mixColor == null || mixProp == null || baseColor2 == null || mixColor2 == null || mixProp2 == null) {
            im.sendOk("發生未知錯誤。");
        } else if (im.used()) {
            var srcBaseColor = isAngel || isBeta ? player.getSecondHairBaseColor() : player.getHairBaseColor();
            var srcMixColor = isAngel || isBeta ? player.getSecondHairMixedColor() : player.getHairMixedColor();
            var srcPropColor = isAngel || isBeta ? player.getSecondHairProbColor() : player.getHairProbColor();
            player.changeMixHairColor(isAngel || isBeta, baseColor, mixColor, mixProp);
            var msg = "已將頭髮染成特殊的混合顏色了！真是個美麗的顏色，要照照鏡子嗎？";
            if (isZero) {
                var srcBaseColor2 = player.getSecondHairBaseColor();
                var srcMixColor2 = player.getSecondHairMixedColor();
                var srcPropColor2 = player.getSecondHairProbColor();
                player.changeMixHairColor(true, baseColor2, mixColor2, mixProp2);
                im.sayMixHairColorZero(msg, baseColor, mixColor, mixProp, baseColor2, mixColor2, mixProp2, srcBaseColor, srcMixColor, mixProp2, srcPropColor, srcMixColor2, srcPropColor2);
            } else {
                baseColor2 = -1;
                mixColor2 = -1;
                im.sayMixHairColor(isAngel, isBeta, isZero, msg, baseColor, mixColor, mixProp, srcBaseColor, srcMixColor, srcPropColor);
            }
        } else {
            im.sendOk("發生未知錯誤。");
        }
        player.getTempValues().remove("baseHairColor");
        player.getTempValues().remove("mixHairColor");
        player.getTempValues().remove("mixColorProp");
        player.getTempValues().remove("baseHairColor2");
        player.getTempValues().remove("mixHairColor2");
        player.getTempValues().remove("mixColorProp2");
        im.dispose();
    } else {
        im.dispose();
    }
}