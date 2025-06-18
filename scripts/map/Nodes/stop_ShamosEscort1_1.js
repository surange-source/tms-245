function act(oid, time) {
    var em = nm.getEventManager("Rex");
    var eim = nm.getEventInstance();
    if (em != null && eim != null) {
        nm.startMapEffect("你們去取一些上面的冰河水來，我在這裡等著你們……", 5120035);
        //eim.schedule("summonwave", 0);
        nm.spawnNpc(2022009, nm.getMap().getMonsterById(9300275).getPosition());
    }
    //nm.talkMonster("時間不多了讓我們快點吧!", 5120035, oid);
}
