function act(oid, time) {
    var em = nm.getEventManager("Rex");
    var eim = nm.getEventInstance();
    if (em != null && eim != null) {
        nm.startMapEffect("寒冰的碎片掉了下來！快躲開！", 5120035);
        nm.nextNodeAction(9300275, time);
    }
}
