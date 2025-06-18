function start() {
    im.sendYesNo("使用可以賦予機器人30天的商店功能。現在要使用嗎?");
}

function action(mode, type, selection) {
    if (mode != 1) {
        im.sendNext("下次想要使用的話在雙點擊道具看看");
        im.dispose();
        return;
    }

    var android = im.getPlayer().getAndroid();
    if (android == null) {
        im.sendNext("沒有召喚機器人，無法使用");
        im.dispose();
        return;
    }

    var ii = im.getItemInfo();
    var aInfo = ii.getAndroidInfo(ii.getAndroidType(android.getItemId()));
    if (aInfo == null) {
        im.sendNext("出現未知錯誤");
        im.dispose();
        return;
    }

    var time = java.lang.System.currentTimeMillis();
    if (aInfo.shopUsable || android.getShopTime() > time) {
        im.sendNext("只能用於沒有商店功能的機器人上。");
        im.dispose();
        return;
    }

    if (im.used()) {
        time += 30 * 24 * 60 * 60 * 1000;
        android.setShopTime(time);
        im.getPlayer().setAndroid(android);
        im.sendNext("成功給機器人賦予30天的商店功能。");
    } else {
        im.sendNext("出現未知錯誤");
    }
    im.dispose();
}