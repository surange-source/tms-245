var status = -1;
var select = -1;
function start() {
        cm.sendSimple("在天空之城碼頭，有很多升降場。根據目的地的不同，必須找到對應的升降場才行。你想到哪個升降場去，乘坐去哪裡的船呢？\r\n#b#L0#乘坐開往維多利亞島的船的升降場#l\r\n#b#L1#乘坐開往玩具城的船的升降場#l#k\r\n#b#L2#乘坐開往神木村的船的升降場#l\r\n#b#L3#乘坐開往武陵的船的升降場#l\r\n#b#L4#乘坐開往納希沙漠的船的升降場#l#k\r\n#b#L5#乘坐開往聖地的船的升降場#l#k \r\n#b#L6#乘坐開往埃德爾斯坦的船的升降場#l");
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            if (select == 0) {
                cm.sendNext("請重新確認你要去的目的地，然後通過我移動到升降場。船的航班是固定的，必須看好時間！");
            } else if (select == 1) {
                cm.sendNext("請重新確認你要去的目的地，然後通過我移動到升降場。船的航班是固定的，必須看好時間！");
            } else if (select == 2) {
                cm.sendNext("請重新確認你要去的目的地，然後通過我移動到升降場。船的航班是固定的，必須看好時間！");
            } else if (select == 3) {
                cm.sendNext("請重新確認你要去的目的地，然後通過我移動到升降場。");
            } else if (select == 4) {
                cm.sendNext("請重新確認你要去的目的地，然後通過我移動到升降場。");
            } else if (select == 5) {
                cm.sendNext("請重新確認你要去的目的地，然後通過我移動到升降場。");
            } else if (select == 6) {
                cm.sendNext("請重新確認你要去的目的地，然後通過我移動到升降場。");
            }
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        if (select == -1)
            select = selection;
        if (select == 0) {        
            cm.sendYesNo("如果走錯了地方，你可以通過傳送口回到我這裡來，所以請你放心。你想移動到#b乘坐開往維多利亞島的船的升降場#k去嗎？");
        } else if (select == 1) {
            cm.sendYesNo("如果走錯了地方，你可以通過傳送口回到我這裡來，所以請你放心。你想移動到#b乘坐開往玩具城的船的升降場#k去嗎？");
        } else if (select == 2) {
            cm.sendYesNo("如果走錯了地方，你可以通過傳送口回到我這裡來，所以請你放心。你想移動到#b乘坐開往神木村的船的升降場#k去嗎？");
        } else if (select == 3) {
            cm.sendYesNo("如果走錯了地方，你可以通過傳送口回到我這裡來，所以請你放心。你想移動到#b乘坐開往武陵的船的升降場#k去嗎？");
        } else if (select == 4) {
            cm.sendYesNo("如果走錯了地方，你可以通過傳送口回到我這裡來，所以請你放心。你想移動到#b乘坐開往納希沙漠的船的升降場#k去嗎？");
        } else if (select == 5) {
            cm.sendYesNo("如果走錯了地方，你可以通過傳送口回到我這裡來，所以請你放心。你想移動到#b乘坐開往聖地的船的升降場#k去嗎？");
        } else if (select == 6) {
            cm.sendYesNo("如果走錯了地方，你可以通過傳送口回到我這裡來，所以請你放心。你想移動到#b乘坐開往埃德爾斯坦的船的升降場#k去嗎？");    
        }
    } else if (status == 1) {
        if (select == 0) {
            cm.warp(200000111,0);
        } else if (select == 1) {
            cm.warp(200000121,0);
        } else if (select == 2) {
            cm.warp(200000131,0);
        } else if (select == 3) {
            cm.warp(200000141,0);
        } else if (select == 4) {
            cm.warp(200000151,0);
        } else if (select == 5) {
            cm.warp(200000161,0);
        } else if (select == 6) {
            cm.warp(200000170,0);
        }
        cm.dispose();
    } else {
        cm.dispose();
    }
}
