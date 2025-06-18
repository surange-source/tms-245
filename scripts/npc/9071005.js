var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendNext("好啊！再多玩一會兒。");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        if (cm.getMapId() == 951000000) {
            cm.dispose();
        } else {
            cm.askYesNo("怎麼啦？這麼快就要走了啊？還有很多有趣的事唷。");
        }
    } else if (status == 1) {
        cm.sendNext("真是個毅力不夠的傢伙，算了，你要走就讓你走吧。");
    } else if (status == 2) {
        cm.warp(951000000);
        cm.dispose();
    }
}
