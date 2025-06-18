function enter(pi) {
    if (pi.getMap().getAllMonster().size() == 0) {
        pi.warp_Instanced(pi.getMapId() + 100);
    } else {
        pi.showProgressMessageFont("必須消滅平原內所有怪物才能移動到下一個關卡。", 3, 20, 4, 0);
        pi.showSystemMessage("首先打倒場地內所有怪物。");
    }
}
