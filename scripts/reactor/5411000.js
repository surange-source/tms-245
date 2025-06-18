function act() {
    try {
        rm.changeMusic("Bgm09/TimeAttack");
        rm.spawnMonster(9420513, -146, 225);
        rm.mapMessage(5, "幽靈船長出現了。");
    } catch(e) {
        rm.mapMessage(5, "出現錯誤: " + e);
    }
}
