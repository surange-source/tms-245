var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0 && status == 0) {
        cm.dispose();
        return;
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        var mapId = cm.getMapId();
        if (mapId == 910340000) {
            cm.warp(910002000, 0);
            cm.removeAll(4001007);
            cm.removeAll(4001008);
            cm.dispose();
        } else {
            var outText;
            if (mapId == 910340600) {
                outText = "你準備好離開這個地圖嗎？";
            } else {
                outText = "一旦你離開地圖，你必須重新啟動整個任務如果你想再試一次。你還想離開這裡嗎？";
            }
            if (status == 0) {
                cm.sendYesNo(outText);
            } else if (mode == 1) {
                cm.warp(910340000, "st00");
                cm.dispose();
            }
        }
    }
}
