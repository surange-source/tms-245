/*      
 *  
 *  功能：礦山農場
 *  
 */
var status = -1;
var menu;

function start() {
    status = -1;
    action(1, 0, 0);
}

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
        if (cm.getPlayer().getProfessionLevel(92000000) > 0 || cm.getPlayer().getProfessionLevel(92010000) > 0) {
            menu = "";
            if (cm.getPlayer().getProfessionLevel(92000000) > 0) {
                menu += "\r\n\r\n#L0##b新手秘密農場#k (銀色藥草叢、紫色藥草叢)#b#l\r\n#L1##b中級秘密農場#k (藍色藥草叢、褐色藥草叢)#b#l\r\n#L2#高級秘密農場#k(綠色藥草叢、金色藥草叢)#b#l\r\n#L3#專家秘密農場#k(海藍色藥草叢、紅色藥草叢)#l#k";
            }
            if (cm.getPlayer().getProfessionLevel(92010000) > 0) {
                menu += "\r\n\r\n#L4##b新手秘密礦山#k(銀色礦脈、紫色礦脈)#b#l\r\n#L5#中級秘密礦山#k(藍色礦脈、褐色礦脈)#b#l\r\n#L6#高級秘密礦山#k(綠色礦脈、金色礦脈)#b#l\r\n#L7#專家秘密礦山#k(海藍色礦脈、紅色礦脈)#l#k";
            }
            cm.sendSimple("你想去哪兒呢？" + menu);
        } else {
            cm.sendOk("只有學會採礦或採藥的人才能使用。");
            cm.dispose();
        }
    } else if (status == 1) {
        switch (selection) {
            case 0:
                if (cm.getPQLog("農場") < 10) {
                    cm.warp(910001003, 0);
                    cm.setPQLog("農場");
                    cm.playerMessage(-9, "進入新手秘密農場。中途退出時無法重新進入。");
                } else {
                    cm.playerMessage(-9, "新手秘密農場每人每天限進10次，您今天的進入次數已滿。");
                }
                break;
            case 1:
                if (cm.getPQLog("農場") < 10) {
                    cm.warp(910001004, 0);
                    cm.setPQLog("農場");
                    cm.playerMessage(-9, "進入中級者秘密秘農場。中途退出時無法重新進入。");
                } else {
                    cm.playerMessage(-9, "中級者秘密農場每人每天限進10次，您今天的進入次數已滿。");
                }
                break;
            case 2:
                if (cm.getPQLog("農場") < 10) {
                    cm.warp(910001007, 0);
                    cm.setPQLog("農場");
                    cm.playerMessage(-9, "進入高級秘密農場。中途退出時無法重新進入。");
                } else {
                    cm.playerMessage(-9, "高級秘密農場每人每天限進10次，您今天的進入次數已滿。");
                }
                break;
            case 3:
                if (cm.getPQLog("農場") < 10) {
                    cm.warp(910001009, 0);
                    cm.setPQLog("農場");
                    cm.playerMessage(-9, "進入專家秘密農場。中途退出時無法重新進入。");
                } else {
                    cm.playerMessage(-9, "專家秘密農場每人每天限進10次，您今天的進入次數已滿。");
                }
                break;
            case 4:
                if (cm.getPQLog("礦山") < 10) {
                    cm.warp(910001005, 0);
                    cm.setPQLog("礦山");
                    cm.playerMessage(-9, "進入新手秘密礦山。中途退出時無法重新進入。");
                } else {
                    cm.playerMessage(-9, "新手秘密礦山每人每天限進10次，您今天的進入次數已滿。");
                }
                break;
            case 5:
                if (cm.getPQLog("礦山") < 10) {
                    cm.warp(910001006, 0);
                    cm.setPQLog("礦山");
                    cm.playerMessage(-9, "進入中級秘密礦山。中途退出時無法重新進入。");
                } else {
                    cm.playerMessage(-9, "中級秘密礦山每人每天限進10次，您今天的進入次數已滿。");
                }
                break;
            case 6:
                if (cm.getPQLog("礦山") < 10) {
                    cm.warp(910001008, 0);
                    cm.setPQLog("礦山");
                    cm.playerMessage(-9, "進入高級秘密礦山。中途退出時無法重新進入。");
                } else {
                    cm.playerMessage(-9, "高級秘密礦山每人每天限進10次，您今天的進入次數已滿。");
                }
                break;
            case 7:
                if (cm.getPQLog("礦山") < 10) {
                    cm.warp(910001010, 0);
                    cm.setPQLog("礦山");
                    cm.playerMessage(-9, "進入專家秘密礦山。中途退出時無法重新進入。");
                } else {
                    cm.playerMessage(-9, "專家秘密礦山每人每天限進10次，您今天的進入次數已滿。");
                }
                break;
        }
        cm.dispose();
    }
}
