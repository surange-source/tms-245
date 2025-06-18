function enter(pi) {
    if (pi.getMap().getCharactersSize() >= 1) {
        pi.warpParty(926110401, 0);
    } else {
        pi.playerMessage(5, "請確認每一個隊員都在這!");
    }
}
