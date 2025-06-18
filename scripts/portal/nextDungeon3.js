function enter(pi) {
    if (pi.getMap().getAllMonster().size() == 0) {
        pi.warpParty(pi.getMapId() + 1000, 0);
        pi.playerMessage(-1, "請殺死所有怪物進入下一關。");
        pi.playerMessage(5, "請殺死所有怪物進入下一關。");
    } else {
        pi.playerMessage(-1, "必須消滅區域內的所有怪物才能移動到下一回合。");
        pi.playerMessage(5, "必須消滅區域內的所有怪物才能移動到下一回合。");
    }
}