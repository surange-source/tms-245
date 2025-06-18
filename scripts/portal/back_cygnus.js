function enter(pi) {
    if (pi.getMap().getAllMonster().size() == 0) {
        pi.warp(271040100, 0);
    } else {
        pi.playerMessage("西格諾斯封鎖著這個出口.請消滅所有騎士!");
    }
}
