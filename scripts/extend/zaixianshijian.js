/*芬芬時尚潮流  在線時間兌換東西*/
var status = 0;
var eff = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
        if (status == 0) {
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，請您選擇您需要的功能:\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#您今天在線：#r"+cm.getOnlineTime()+"#k 分鐘#b\r\n";
        selStr += "#L0#" + eff + "#b領取在線60分鐘[#r1小時#b]獎勵#l\r\n";
        selStr += "#L1#" + eff + "#b領取在線120分鐘[#r2小時#b]獎勵#l\r\n";
        selStr += "#L2#" + eff + "#b領取在線180分鐘[#r3小時#b]獎勵#l\r\n";
        selStr += "#L3#" + eff + "#b領取在線240分鐘[#r4小時#b]獎勵#l\r\n";
        selStr += "#L4#" + eff + "#b領取在線300分鐘[#r5小時#b]獎勵#l\r\n";
        selStr += "#L5#" + eff + "#b領取在線360分鐘[#r6小時#b]獎勵#l\r\n";
        selStr += "#L6#" + eff + "#b領取在線420分鐘[#r7小時#b]獎勵#l\r\n";
        selStr += "#L7#" + eff + "#b領取在線480分鐘[#r8小時#b]獎勵#l\r\n";
        
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
        if (cm.getPQLog("60分鐘獎勵") == 0 && cm.getOnlineTime() >= 60) {
            cm.gainMeso(+1000000);
            cm.setPQLog("60分鐘獎勵");
            cm.worldMessage(cm.getChar().getName() + "玩家今天上線已經達到60分鐘.為了表示感謝對本服的支持.給予100W楓幣作為獎勵");
            cm.sendOk("#r - 60分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得100W楓幣！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有在線60分鐘喲.或者你已經領取過今天的60分鐘獎勵了");
            cm.dispose();
            }
            break;
        case 1:
        if (cm.getPQLog("120分鐘獎勵") == 0 && cm.getOnlineTime() >= 120) {
            cm.gainItem(2432466, 5);//音符禮盒 5個
            cm.setPQLog("120分鐘獎勵");
            cm.worldMessage(cm.getChar().getName() + "玩家今天上線已經達到120分鐘.為了表示感謝對本服的支持.給予5個明日禮物箱子作為獎勵");
            cm.sendOk("#r - 120分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得#v2432466#x5");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有在線120分鐘喲.或者你已經領取過今天的120分鐘獎勵了");
            cm.dispose();
            }
            break;
        case 2:
        if (cm.getPQLog("180分鐘獎勵") == 0 && cm.getOnlineTime() >= 180) {
            cm.gainItem(2431046, 2);//末日風暴幣 2個
            cm.setPQLog("180分鐘獎勵");
            cm.worldMessage(cm.getChar().getName() + "玩家今天上線已經達到180分鐘.為了表示感謝對本服的支持.給予2個韓果禮盒作為獎勵");
            cm.sendOk("#r - 180分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得#v2431046#x2");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有在線180分鐘喲.或者你已經領取過今天的180分鐘獎勵了");
            cm.dispose();
            }
            break;
        case 3:
        if (cm.getPQLog("240分鐘獎勵") == 0 && cm.getOnlineTime() >= 240) {
            cm.gainItem(2431046, 2);//韓果禮盒 2個
            cm.setPQLog("240分鐘獎勵");
            cm.worldMessage(cm.getChar().getName() + "玩家今天上線已經達到240分鐘.為了表示感謝對本服的支持.給予2個韓果禮盒作為獎勵");
            cm.sendOk("#r - 240分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得#v2431046#x2");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有在線240分鐘喲.或者你已經領取過今天的240分鐘獎勵了");
            cm.dispose();
            }
            break;
        case 4:
        if (cm.getPQLog("300分鐘獎勵") == 0 && cm.getOnlineTime() >= 300) {
            cm.gainItem(2049160, 1);//一張正向混沌
            cm.setPQLog("300分鐘獎勵");
            cm.worldMessage(cm.getChar().getName() + "玩家今天上線已經達到300分鐘.為了表示感謝對本服的支持.給予1張正向混沌卷作為獎勵");
            cm.sendOk("#r - 300分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得#v2049160#x1！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有在線300分鐘喲.或者你已經領取過今天的300分鐘獎勵了");
            cm.dispose();
            }
            break;
        case 5:
        if (cm.getPQLog("360分鐘獎勵") == 0 && cm.getOnlineTime() >= 360) {
            cm.gainNX(2, +20000);
            cm.setPQLog("360分鐘獎勵");
            cm.worldMessage(cm.getChar().getName() + "玩家今天上線已經達到360分鐘.為了表示感謝對本服的支持.給予2W楓點作為獎勵");
            cm.sendOk("#r - 360分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得1W楓點！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有在線360分鐘喲.或者你已經領取過今天的360分鐘獎勵了");
            cm.dispose();
            }
            break;
        case 6:
        if (cm.getPQLog("420分鐘獎勵") == 0 && cm.getOnlineTime() >= 420) {
            cm.gainNX(2, +20000);
            cm.setPQLog("420分鐘獎勵");
            cm.worldMessage(cm.getChar().getName() + "玩家今天上線已經達到420分鐘.為了表示感謝對本服的支持.給予2W楓點作為獎勵");
            cm.sendOk("#r - 420分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得2W楓點！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有在線420分鐘喲.或者你已經領取過今天的420分鐘獎勵了");
            cm.dispose();
            }
            break;
        case 7:
        if (cm.getPQLog("480分鐘獎勵") == 0 && cm.getOnlineTime() >= 480) {
            cm.gainNX(1, +20000);
            cm.setPQLog("480分鐘獎勵");
            cm.worldMessage(cm.getChar().getName() + "玩家今天上線已經達到480分鐘.為了表示感謝對本服的支持.給予2W樂豆點作為獎勵");
            cm.sendOk("#r - 480分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得2W樂豆點！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有在線480分鐘喲.或者你已經領取過今天的480分鐘獎勵了");
            cm.dispose();
            }
            break;
    }
    }
}