function enter(pi) {
    var em = pi.getEventManager("ZChaosPQ3");
    if (em != null && em.getProperty("stage1").equals("1")) {
        pi.warp(926110001, 0);
    } else {
        pi.playerMessage(5, "實驗室入口的大門是關閉的!");
    }
}
