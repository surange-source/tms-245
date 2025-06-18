function start() {
    var items = cm.getAllHotTimeItems();
    var getAll = true;
    for (var i = 0; i < items.length; i++) {
        if (cm.canHold(items.get(i).getLeft(), items.get(i).getRight())) {
            cm.gainItem(items.get(i).getLeft(), items.get(i).getRight());
        } else {
            getAll = false;
        }
    }
    if (getAll) {
        cm.sendOk("你已獲得HotTime獎勵.");
    } else {
        cm.sendNext("由於道具欄位不足, 部分HotTime無法取得.");
    }
    cm.dispose();
}