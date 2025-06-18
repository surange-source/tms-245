function act() {
    rm.mapMessage(6, "已經修復了其中一個部位.");
    var em = rm.getEventManager("OrbisPQ");
    if (em != null) {
        rm.removeItem(4001046);
        em.setProperty("stage", parseInt(em.getProperty("stage")) + 1);
        var r = rm.getMap().getReactorByName("minerva");
        r.forceHitReactor(r.getState() + 1);
    }
}
