function act() {
    rm.mapMessage(6, "空氣中響起了音樂.");
    var eim = rm.getEventInstance();
    if (eim != null) {
        eim.setProperty("stage", "1");
    }
}
