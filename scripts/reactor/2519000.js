function act() {
    try {
        var eim = rm.getEventInstance();
        if (eim != null) {
            rm.mapMessage(5, "入口已被關閉!");
            rm.removeItem(4001117);
            eim.setProperty("stage4", parseInt(eim.getProperty("stage4")) + 1);
            if (eim.getProperty("stage4").equals("4")) { //all 5 done
                rm.startMapEffect("所有的門都關上了。好了，我來讓你移動到下一關。", 5120020);
                rm.mapMessage(6, "所有入口已被關閉!");
            }
        }
    } catch (e) {
        rm.playerMessage(5, "Error: " + e);
    }
}
