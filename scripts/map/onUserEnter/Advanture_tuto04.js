/*
 Made by Pungin
 */

var status = -1;

function action(mode, type, selection) {
    status++;

    if (status == 0) {
        ms.setInGameCurNodeEventEnd(true);
        ms.EnableUI(1);
        ms.playMovie("Mercedes.avi", true);
    } else if (status == 1) {
        if (mode == 0) {
            ms.topMsg("影片播放失敗。");
        }
        ms.warp(4000005, 0);
        ms.setInGameCurNodeEventEnd(true);
        ms.EnableUI(0);
        ms.dispose();
    } else {
        ms.dispose();
    }
}
    
