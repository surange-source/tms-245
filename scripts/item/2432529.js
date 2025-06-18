//福袋
function start() {
    if (im.getPQLog("回憶福袋") == 0) {
        if (im.getSpace(4) <= 1) {
            im.sendOk("其他欄位置不足，無法打開福袋");
            im.dispose();
        } else {
            im.gainItem(4033248, 50);
            im.getPlayer().dropMessage(1, "從福袋中領取了50個金色楓葉,可找「可可熊運營員NPC」兌換50兔幣");
            im.gainItem(2432529, -1);
            im.setPQLog("回憶福袋");
            im.dispose();
        }
    } else {
        im.getPlayer().dropMessage(1, "您今天已經打開過福袋，不能再次打開");
        im.dispose();
    }
    
}