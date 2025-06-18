/*
Stage 1: Gatekeeper door - Guild Quest

@Author Lerk
*/

function enter(pi) {
    if (pi.getMap().getReactorByName("statuegate").getState() == 1 || (pi.getPlayer().getEventInstance() != null && pi.getPlayer().getEventInstance().getProperty("stage1clear") != null && pi.getPlayer().getEventInstance().getProperty("stage1clear").equals("true"))) {
        pi.warp(990000301);
        return true;
    } else {
        pi.playerMessage("這個門是關閉的，請先通過門神的挑戰。");
        return false;
    }
}
