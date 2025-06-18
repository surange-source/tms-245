function enter(pi) {
    if (pi.getMap().getAllMonster().size() == 0) {
        pi.openNpc(9071000, "mPark_Reward");
    } else {
        pi.showProgressMessageFont("請消滅平原內的所有怪物。", 3, 20, 4, 0);
        pi.showSystemMessage("首先打倒場地內所有怪物。");
    }
}
