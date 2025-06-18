var upgradeStartID = 1052715;
var upgradeTimes = 3;

function start() {
    var longcoat = im.getEquippedBySlot(-5);
    var end1 = upgradeStartID + upgradeTimes;
    var end2 = end1 + 1 + upgradeTimes;
    if (longcoat == null || !((longcoat.getItemId() >= upgradeStartID && longcoat.getItemId() < end1) || (longcoat.getItemId() >= end1 + 1 && longcoat.getItemId() < end2))) {
        im.sendNext("你身上並未穿戴可升級的裝備。");
        im.dispose();
    } else {
        im.sendYesNo("要使用#b#t" + im.getItemId() + "##k來將#b#t" + longcoat.getItemId() + "##k強化成#b#t" + (longcoat.getItemId() + 1) + "##k嗎?");
    }
}

function action(mode, type, selection) {
    if (mode == 1) {
        var longcoat = im.getEquippedBySlot(-5);
        var end1 = upgradeStartID + upgradeTimes;
        var end2 = end1 + 1 + upgradeTimes;
        if (longcoat == null || !((longcoat.getItemId() >= upgradeStartID && longcoat.getItemId() < end1) || (longcoat.getItemId() >= end1 + 1 && longcoat.getItemId() < end2))) {
            im.sendOk("需要套用可以進行強化的裝備才可以強化.");
        } else if (im.getSpace(1) < 1) {
            im.sendNext("請將裝備欄空出一格。");
        } else {
            longcoat = longcoat.getItemId();
            var rate = 100;
            switch (longcoat - upgradeStartID) {
                case 0:
                    break;
                case 1:
                    rate *= 2;
                    break;
                case 2:
                    rate *= 3;
                    break;
                case 4:
                    rate *= 5;
                    break;
                case 5:
                    rate *= 6;
                    break;
                case 6:
                    rate *= 150;
                    break;
                default:
                    im.dispose();
                    return;
            }
            if (im.used() && Math.floor(Math.random() * rate) <= 30) {
                im.getPlayer().removeItem(longcoat);
                im.gainItem(longcoat + 1, 1);
                im.sendNext("成功!!!");
                im.showAvatarOriented("Effect/Direction100/itemEffect/GradeUp/0", true);
            } else {
                im.sendNext("失敗!!!");
            }
        }
    }
    im.dispose();
}