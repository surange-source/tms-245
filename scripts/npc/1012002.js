/*
 *  @名稱：    比休斯
 *  @地圖：    弓箭手村市場
 *  @功能：    武器維修
 *  @作者：    彩虹工作室
 *  @時間：    2016年12月30日
 */

var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendNext("好東西容易損壞.偶爾去修修裝備比較好.");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        cm.sendYesNo("暫時只接收耐久度修理工作.\r\n想修復耐久度麼?");
    } else if (status == 1) {
        cm.sendRepairWindow();
        cm.dispose();
    }
}
