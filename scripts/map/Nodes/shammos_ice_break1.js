function act(oid, time) {
    var em = nm.getEventManager("Rex");
    var eim = nm.getEventInstance();
    if (em != null && eim != null) {
        nm.startMapEffect("冰塊擋住了路，你們快去把冰塊破壞掉，開出一條路來！", 5120035);
        nm.getMap().getReactorByName("iceTrap").forceHitReactor(1);
    }
}
