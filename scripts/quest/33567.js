/* 
 * 烏勒斯
 */
var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.dispose();
            return;
        }
        qm.dispose();
        return;
    }

    if (qm.getMapId() == 970072200) {
        qm.dispose();
        qm.openNpc(9070100);
    } else {
        if (status == 0) {
            qm.sendSimpleN("#b現在立刻去挑戰打敗烏勒斯嗎? #k\r\n#L0#快速開始(通過匹配進行18人挑戰)#l\r\n#L1#前往烏勒斯入場地圖. #l");
        } else if (status == 1) {
            if (selection == 0) {
                qm.openUI(0x123);
                qm.dispose();
            } else if (selection == 1) {
                qm.warp(970072200);
                qm.dispose();
            }
        }
    }
}
function end(mode, type, selection) {
    qm.dispose();
}
