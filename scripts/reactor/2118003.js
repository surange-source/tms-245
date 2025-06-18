function act() {
    rm.getReactor().forceTrigger();
    rm.getReactor().delayedDestroyReactor(1000);
    rm.mapMessage("萊格斯出現了。");
    rm.spawnMonster(9300281);
}
