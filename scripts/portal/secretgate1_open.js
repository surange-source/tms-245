/*
Stage 4: Mark of Evil Door - Guild Quest

@Author Lerk
*/

function enter(pi) {
    if (pi.getMap().getReactorByName("secretgate1").getState() == 1) {
        pi.warp(990000611, 1);
        return true;
    } else {
        pi.playerMessage("這個門是關閉的。");
        return false;
    }
}
