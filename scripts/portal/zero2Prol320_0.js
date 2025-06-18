function enter(pi) {
    if (pi.getMap().getAllMonster().size() == 0) {
        pi.warpParty(321190350, 0);
    } else {
        pi.playerMessage(-1, "必須消滅區域內的所有怪物才能移動到下一回合。");
        pi.playerMessage(5, "必須消滅區域內的所有怪物才能移動到下一回合。");
    }
}
