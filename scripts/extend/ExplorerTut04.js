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
            cm.sendNext("你準備好要去消滅怪物的話，再和我說話吧。");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        cm.sendYesNo("我現在就把你送進去，請你把在船內製造騷亂的怪物消滅掉吧！");
    } else if (status == 1) {
        cm.warp(4000033, 0);
        cm.dispose();
    } else {
        cm.dispose();
    }
}
