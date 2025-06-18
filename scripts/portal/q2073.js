function enter(pi) {
    if (pi.getQuestStatus(2073) == 1) {
        pi.warp(900000000, 0);
        return true;
    } else {
        pi.playerMessage(5, "神秘的力量阻止著你的前進...");
        return false;
    }
}
