function enter(pi) {
    var em = pi.getEventManager("ZChaosPQ3");
    if (em != null && em.getProperty("stage2").equals("3")) {
        pi.warp(926110200, 0);
    } else {
        pi.playerMessage(5, "實驗室入口的大門是關閉的!");
    }
}
