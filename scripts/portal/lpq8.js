function enter(pi) {
    var eim = pi.getPlayer().getEventInstance();

    // only let people through if the eim is ready
    if (eim.getProperty("8stageclear") == null) { // do nothing; send message to player
        pi.playerMessage(5, "請完成數字組合任務.");
    } else {
        pi.warpParty(922010900, 0);
    }
}
