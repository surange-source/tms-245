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
        var selStr = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k   #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#您今天在線：#r"+cm.getOnlineTime()+"#k 分鐘#b\r\n";
        selStr += "#L0#" + eff + "#b領取在線60分鐘[#r1小時#b]獎勵#l\r\n";
        selStr += "#L1#" + eff + "#b領取在線120分鐘[#r2小時#b]獎勵#l\r\n";
        selStr += "#L2#" + eff + "#b領取在線180分鐘[#r3小時#b]獎勵#l\r\n";
        selStr += "#L3#" + eff + "#b領取在線240分鐘[#r4小時#b]獎勵#l\r\n";
        selStr += "#L4#" + eff + "#b領取在線300分鐘[#r5小時#b]獎勵#l\r\n";
        selStr += "#L5#" + eff + "#b領取在線360分鐘[#r6小時#b]獎勵#l\r\n";
        selStr += "#L6#" + eff + "#b領取在線420分鐘[#r7小時#b]獎勵#l\r\n";
        selStr += "#L7#" + eff + "#b領取在線480分鐘[#r8小時#b]獎勵#l\r\n";
        selStr += "#L8#" + eff + "#d領取在線600分鐘[#r10小時#d]獎勵#l\r\n";
        selStr += "#L9#" + eff + "#d領取在線720分鐘[#r12小時#d]獎勵#l\r\n";
        
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
        if (cm.getEventCount("60分鐘獎勵") == 0 && cm.getOnlineTime() >= 60) {
            cm.gainMeso(+3000000);
            cm.setEventCount("60分鐘獎勵");
        cm.worldSpouseMessage(0x15,"" + cm.getChar().getName() + "玩家今天上線已經達到60分鐘.為了表示感謝對本服的支持.給予300W楓幣作為獎勵");
            cm.sendOk("#r - 60分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得300W楓幣！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有在線60分鐘喲.或者你已經領取過今天的60分鐘獎勵了");
            cm.dispose();
            }
            break;
        case 1:
        if (cm.getEventCount("120分鐘獎勵") == 0 && cm.getOnlineTime() >= 120) {
            cm.gainItem(2431725, 3);//熱力四射禮物盒3個
            cm.setEventCount("120分鐘獎勵");
        cm.worldSpouseMessage(0x15,"" + cm.getChar().getName() + "玩家今天上線已經達到120分鐘.為了表示感謝對本服的支持.給予3個熱力四射禮物盒作為獎勵");
            cm.sendOk("#r - 120分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得#v2431725#x3");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有在線120分鐘喲.或者你已經領取過今天的120分鐘獎勵了");
            cm.dispose();
            }
            break;
        case 2:
        if (cm.getEventCount("180分鐘獎勵") == 0 && cm.getOnlineTime() >= 180) {
            cm.gainItem(5062002, 20);//高級神奇方塊20個
            cm.setEventCount("180分鐘獎勵");
        cm.worldSpouseMessage(0x15,"" + cm.getChar().getName() + "玩家今天上線已經達到180分鐘.為了表示感謝對本服的支持.給予20個高級神奇方塊作為獎勵");
            cm.sendOk("#r - 180分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得#v5062002#x20");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有在線180分鐘喲.或者你已經領取過今天的180分鐘獎勵了");
            cm.dispose();
            }
            break;
        case 3:
        if (cm.getEventCount("240分鐘獎勵") == 0 && cm.getOnlineTime() >= 240) {
            cm.gainItem(2431046, 2);//韓果禮盒 2個
            cm.setEventCount("240分鐘獎勵");
        cm.worldSpouseMessage(0x15,"" + cm.getChar().getName() + "玩家今天上線已經達到240分鐘.為了表示感謝對本服的支持.給予2個韓果禮盒作為獎勵");
            cm.sendOk("#r - 240分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得#v2431046#x2");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有在線240分鐘喲.或者你已經領取過今天的240分鐘獎勵了");
            cm.dispose();
            }
            break;
        case 4:
        if (cm.getEventCount("300分鐘獎勵") == 0 && cm.getOnlineTime() >= 300) {
            cm.gainItem(2432353, 5);//開心轉盤5個
            cm.setEventCount("300分鐘獎勵");
        cm.worldSpouseMessage(0x15,"" + cm.getChar().getName() + "玩家今天上線已經達到300分鐘.為了表示感謝對本服的支持.給予5個開心轉盤作為獎勵");
            cm.sendOk("#r - 300分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得#v2432353#x5！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有在線300分鐘喲.或者你已經領取過今天的300分鐘獎勵了");
            cm.dispose();
            }
            break;
        case 5:
        if (cm.getEventCount("360分鐘獎勵") == 0 && cm.getOnlineTime() >= 360) {
            cm.gainNX(2, +10000);
            cm.setEventCount("360分鐘獎勵");
        cm.worldSpouseMessage(0x15,"" + cm.getChar().getName() + "玩家今天上線已經達到360分鐘.為了表示感謝對本服的支持.給予10000楓點作為獎勵");
            cm.sendOk("#r - 360分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得10000楓點！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有在線360分鐘喲.或者你已經領取過今天的360分鐘獎勵了");
            cm.dispose();
            }
            break;
        case 6:
        if (cm.getEventCount("420分鐘獎勵") == 0 && cm.getOnlineTime() >= 420) {
            cm.gainItem(5062500, 50);//大師附加神奇方塊50個
            cm.setEventCount("420分鐘獎勵");
        cm.worldSpouseMessage(0x15,"" + cm.getChar().getName() + "玩家今天上線已經達到420分鐘.為了表示感謝對本服的支持.給予50個大師附加神奇方塊作為獎勵");
            cm.sendOk("#r - 420分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得#v5062500#x50！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有在線420分鐘喲.或者你已經領取過今天的420分鐘獎勵了");
            cm.dispose();
            }
            break;
        case 7:
        if (cm.getEventCount("480分鐘獎勵") == 0 && cm.getOnlineTime() >= 480) {
            cm.gainItem(2049751, 2);//S級潛能卷軸 60%2個
            cm.setEventCount("480分鐘獎勵");
        cm.worldSpouseMessage(0x15,"" + cm.getChar().getName() + "玩家今天上線已經達到480分鐘.為了表示感謝對本服的支持.給予2個S級潛能卷軸 60%作為獎勵");
            cm.sendOk("#r - 480分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得#v2049751#x2！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有在線480分鐘喲.或者你已經領取過今天的480分鐘獎勵了");
            cm.dispose();
            }
            break;
        case 8:
        if (cm.getEventCount("600分鐘獎勵") == 0 && cm.getOnlineTime() >= 600) {
            cm.gainItem(5062009, 30);//超級神奇方塊30個
            cm.setEventCount("600分鐘獎勵");
        cm.worldSpouseMessage(0x20,"" + cm.getChar().getName() + "玩家今天上線已經達到600分鐘.為了表示感謝對本服的支持.給予30個超級神奇方塊作為獎勵");
            cm.sendOk("#r - 600分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得#v5062009#x30！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有在線600分鐘喲.或者你已經領取過今天的600分鐘獎勵了");
            cm.dispose();
            }
            break;
        case 9:
        if (cm.getEventCount("720分鐘獎勵") == 0 && cm.getOnlineTime() >= 720) {
            cm.gainItem(2431743, 2);//楓點10000商品券
            cm.setEventCount("720分鐘獎勵");
        cm.worldSpouseMessage(0x20,"" + cm.getChar().getName() + "玩家今天上線已經達到720分鐘.為了表示感謝對本服的支持.給予2個楓點10000商品券作為獎勵");
            cm.sendOk("#r - 720分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得#v2431743#x2！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有在線720分鐘喲.或者你已經領取過今天的720分鐘獎勵了");
            cm.dispose();
            }
            break;
    }
    }
}