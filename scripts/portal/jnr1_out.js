function enter(pi) {
    if (pi.getMap().getAllMonster().size() == 0) {
        pi.warp(926110100, 0);
    } else {
        pi.playerMessage(5, "請確認地圖上是否還存在怪物!");
    }
}
