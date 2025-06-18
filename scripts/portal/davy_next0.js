function enter(pi) {
    if (pi.haveItem(4001260,7) && pi.getPlayer().getParty() != null && pi.getMap().getAllMonstersThreadsafe().size() == 0) {
        pi.warpParty(925100100, 0);
    } else {
        pi.playerMessage(5, "請收集老海盜箱子的鑰匙6個並消滅所有怪物,否則無法通過!");
    }
}
