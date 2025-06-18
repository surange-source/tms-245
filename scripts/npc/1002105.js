/*
 *  @名稱：    次元傳送口
 *  @地圖：    維多利亞 = 六岔路口
 *  @功能：    傳送到萬神殿
 *  @作者：    彩虹工作室
 *  @時間：    2016年12月30日
 */
function start() {
    cm.sendYesNo("要通過#p1002105#移動到萬神殿嗎？");
}

function action(mode, type, selection) {
    if (mode == 1) {
        cm.warp(400000001, 1);
    }
    cm.dispose();
}
