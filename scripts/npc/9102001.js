/*     Garnox - Pet Scientist
    Singapore and NLC
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
    cm.sendNext("你好，我是迦爾努斯寵物專家。你聽說過寵物進化嗎？");
    } else if (status == 1) {
    cm.sendYesNo("如果你的寵物達到了15級,那麼就可以進化喲,那麼你想讓你的寵物進化麼?");
    } else if (status == 2) {
    
    cm.dispose();
    }
}
