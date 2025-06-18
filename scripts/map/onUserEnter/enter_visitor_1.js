function start() {
    var eim = ms.getEventInstance();
    if (eim != null) {
        eim.setProperty("total", "180");
        var total = 180;
        ms.showVisitoKillResult(total);
        ms.showVisitorResult(1);
        //更新任務信息數據
        ms.getPlayer().updateOneInfo(17204, "stg", "1");
        ms.showEffect("Visitor/Stage1");
        ms.showEffect("Dojang/start");
    }
    ms.dispose();
}