/*      
 *  
 *  功能：新手劇情相關
 *  
 */

var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendNext("準備好離開的話，再和我說話吧。");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        cm.sendYesNo("托你的福，出航準備已經全部完成了。現在上船嗎？");
    } else if (status == 1) {
        cm.warp(4000032, 0);
        cm.dispose();
    } else {
        cm.dispose();
    }
}
