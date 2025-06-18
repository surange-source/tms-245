function act() {
    var em = rm.getEventManager("Rex");
    var eim = rm.getEventInstance();
    if (em != null && eim != null) {
        rm.startMapEffect("你們解決得還挺快的嘛。我們快去封印萊格斯吧。", 5120035);
        rm.nextNodeAction(9300275, 0);
    }
}