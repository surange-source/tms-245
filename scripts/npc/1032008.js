/*  
 *  
 *  
 *  NPC名稱：
 *  功能：
 *  
 */
var status = -1;

function action(mode, type, selection) {
    var em = cm.getEventManager("Boats");
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendNext("看來你還有事情要辦吧？");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        if (em.getProperty("entry").equals("true")) {
            cm.sendYesNo("坐上船之後，需要飛很久才能到達目的地。如果你在這裡有急事要辦的話，請先把事情辦完。怎麼樣？你要上船嗎？");
        } else {
            cm.sendOk("船已經在準備出發。對不起，請乘坐下一班船。運行時間表可以通過售票員確認。");
            cm.dispose();
        }
    } else if (status == 1) {
        cm.warp(104020111, 0);
        cm.dispose();
    }
}
