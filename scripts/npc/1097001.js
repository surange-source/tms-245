/*
唐雲
 */

function start() {
    cm.sendYesNo("你想停止製作料理並退出嗎？料理沒有完成的話，就無法獲得獎勵。如果你覺得沒關係，我就送你出去。");
}

function action(mode, type, selection) {
    if (mode == 1) {
        cm.warp(912080000);
        cm.dispose();
    } else {
        cm.sendNext("應該把料理做完才對嘛！明智的決定！製作料理是一種快樂！");
        cm.dispose();
    }
}
