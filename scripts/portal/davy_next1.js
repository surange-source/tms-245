function enter(pi) {
    var eim = pi.getEventInstance();
    if (eim != null) {
        if (eim.getProperty("stage2").equals("3")) {
            pi.warpParty(925100400, 0);
        } else {
            pi.playerMessage(5, "請收集初級、中級、高級、海盜身份各20個,否則無法通過!");
        }
    } else {
        pi.playerMessage(5, "未執行任務或發生錯誤!!");
    }
}
