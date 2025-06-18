/* RED 1st impact
 Monster Park Shuttle
 Made by Daenerys
 */

var status = -1;

function start() {
    if (cm.getMapId() == 951000000) {
        cm.sendYesNo("您好，我們怪物公園接送服務一直為滿足顧客而努力。您要回村莊嗎？");
    } else {
        cm.askYesNo("親愛的顧客我愛您。要移動到總是充滿全新娛樂的休菲凱曼的怪物公園嗎？", false);
    }
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    if (status == -2) {
        if (cm.getMapId() == 951000000) {
            cm.sendNext("離開怪物公園時請來找我，我會用心服務。");
        } else {
            cm.sendNext("隨時都可利用喔，若改變想法隨時再度光臨。", false);
        }
    } else if (status == -1) {
        cm.dispose();
    } else if (status == 0) {
        if (cm.getMapId() == 951000000) {
            cm.sendNext("好，那我會安全又舒適的送您到村莊。");
        } else {
            cm.sendNext("希望您在怪物公園內度過愉快的時間。", false);
        }
    } else if (status == 1) {
        cm.dispose();
        if (cm.getMapId() == 951000000) {
            cm.warp(cm.getSavedLocation("MULUNG_TC"), "mPark00");
            cm.clearSavedLocation("MULUNG_TC");
        } else {
            cm.saveLocation("MULUNG_TC");
            cm.warp(951000000);
        }
    } else {
        cm.dispose();
    }
}
