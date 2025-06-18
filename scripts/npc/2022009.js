function action(mode, type, selection) {
    if (cm.haveItem(2022698)) {
        cm.removeNpc(2022009);
        cm.nextNodeAction(9300275, 0);
        cm.startMapEffect("如果你們在護衛我的時候，我陷入了危險，你們必須毫不猶豫地讓我喝下萬年冰河水。那就繼續吧？", 5120035);
    } else {
        cm.sendNext("你們要喝萬年冰河水嗎？");
    }
    cm.dispose();
}
