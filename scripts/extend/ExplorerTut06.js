/*      
 *  
 *  功能：新手劇情相關
 *  
 */

var status = -1;

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else
        status--;
    if (status == 0) {
        cm.sendNext("剛剛那個女孩是誰呢？為什麼一見到我就逃走了呢？");
    } else if (status == 1) {
        cm.sendNext("我也朝著那個方向過去看看吧。");
    } else if (status == 2) {
        status = -1;
        cm.EnableUI(0);
        cm.DisableUI(false);
        cm.dispose();
    }
}
