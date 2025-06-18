/*
 *  @名稱：    麥吉
 *  @地圖：    勇士部落
 *  @功能：    挑戰蝙蝠魔BOSS
 *  @作者：    彩虹工作室
 *  @時間：    2016年12月30日
 */
var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
    status++;
    } else {
    if (status == 0) {
        cm.dispose();
    }
    status--;
    }
    if (cm.getPlayer().getLevel() < 50) {
    cm.sendOk("對不起，你的等級小於50級無法挑戰蝙蝠BOSS");
    cm.dispose();
    return;
    }
    if (status == 0) {
    cm.sendYesNo("你看上去很強大，我可以傳送你去挑戰魔王巴洛古BOSS，你敢去嗎？");
    } else if (status == 1) {
    cm.warp(105100100);
    cm.dispose();
    }
}
