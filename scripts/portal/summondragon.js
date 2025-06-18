function enter(pi) {
    if (pi.haveItem(4001094)) {
        pi.getMap().getReactorByName("dragonBaby").hitReactor(pi.getClient());
        pi.getMap().getReactorByName("dragonBaby2").hitReactor(pi.getClient());
        pi.playerMessage(5, "九靈龍的蛋，舒舒服服的發了一道神秘的光，現在已經回到巢裡。");
        pi.gainItem(4001094, -1);
    }
}
