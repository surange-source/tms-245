function act() {
        rm.mapMessage(6, "箱子被打開了，怪物已被召喚！");
    rm.dropItems();
        rm.spawnMonster(9300117, 1);
}
