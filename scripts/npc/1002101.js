/*
 *  @名稱：    坤
 *  @地圖：    維多利亞港
 *  @功能：    傳送
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
    if (status == 0) {
        cm.sendYesNo("你想前往龍沉睡的島嗎?");
    } else if (status == 1) {
        cm.warp(914100000);
        cm.dispose();
    }
}
