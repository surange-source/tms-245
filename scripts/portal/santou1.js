function enter(pi) {
    if (pi.haveItem(4001022,55) && pi.isLeader()) {
        pi.warpParty(510001400, 0);
            pi.removeAll(4001022);
    } else {
        pi.playerMessage(-1, "必須搜集55個通行證才可以進入下一關！請讓隊長與我說話！");
        pi.playerMessage(5, "必須搜集55個通行證才可以進入下一關！請讓隊長與我說話！");
    }
}