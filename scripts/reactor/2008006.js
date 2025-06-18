function act() {
    rm.mapMessage(6, "空氣中響起了音樂.");
    var em = rm.getEventManager("OrbisPQ");
    if (em != null) {
        em.setProperty("stage3", "1");
    }
}
