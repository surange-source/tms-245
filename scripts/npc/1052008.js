/*
 *
 *  金利奇的尋寶任務
 *
 */



function start() {
    status = -1;
    action(1, 0, 0);
}


function action(mode, type, selection) {
    if (status >= 2 && mode == 0) {
        cm.sendOk("Alright, see you next time.");
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (cm.getMapId == 910360002) {
        if (status == 0) {
            if (cm.getQuestStatus(2055) == 1 && !cm.haveItem(4031039)) {
                cm.gainItem(4031039, 1); // Shumi's Coin
                cm.warp(103000000, 0);
            } else {
                var rand = 1 + Math.floor(Math.random() * 6);
                if (rand == 1) {
                    cm.gainItem(4010003, 2); // Adamantium Ore
                } else if (rand == 2) {
                    cm.gainItem(4010000, 2); // Bronze Ore
                } else if (rand == 3) {
                    cm.gainItem(4010002, 2); // Mithril Ore
                } else if (rand == 4) {
                    cm.gainItem(4010005, 2); // Orihalcon Ore
                } else if (rand == 5) {
                    cm.gainItem(4010004, 2); // Silver Ore
                } else if (rand == 6) {
                    cm.gainItem(4010001, 2); // Steel Ore
                }
                cm.warp(103000000, 0);
            }
            cm.dispose();
        }
    } else {
        if (status == 0) {
            var mapid = cm.getMapId();
            var random = new java.util.Random();
            if (cm.getCustomData(200100) == mapid && cm.isQuestActive(200100)) {
                if (!cm.haveItem(2430251)) {
                    cm.sendOk("你沒有在規定的時間裡找到我，沒有獎勵喲！");
                    cm.removeNpcforQ(mapid, 1052008);
                    cm.dispose();
                    return;
                }
                if (cm.getSpace(1) < 1 || cm.getSpace(2) < 1 || cm.getSpace(3) < 1 || cm.getSpace(4) < 1 || cm.getSpace(5) < 1) {
                    cm.sendOk("找到了寶藏！但是你要保證你背包的每一欄都有空位，請先整理一下吧。");
                    cm.dispose();
                    return;
                }
                var ii = cm.getItemInfo();
                var chance = random.nextInt(999);
                if (chance <= 800) {
                    cm.gainItem(2430641, 1); //隨機這個道具
                    cm.worldSpouseMessage(0x18, "『每日尋寶』" + "[" + cm.getChar().getName() + "] 在每日尋寶中獲得了<" + cm.getItemName(2430641) + ">, 大家快去尋寶吧！");
                }
                if (chance <= 60) {
                    cm.gainItem(2430030, 1); //隨機這個道具
                    cm.worldSpouseMessage(0x18, "『每日尋寶』" + "[" + cm.getChar().getName() + "] 在每日尋寶中獲得了<" + cm.getItemName(2430030) + ">, 大家快去尋寶吧！");
                }
                //cm.gainItem(4001839, 200);
                cm.gainMeso((random.nextInt(8) + 1) * 1000000);
                cm.gainItem(2430251, -1);
                cm.forceCompleteQuest(200100);
                cm.sendOk("恭喜你，找到了寶藏！");
                cm.removeNpcforQ(mapid, 1052008);
            } else {
                cm.sendOk("你的寶藏好像不是藏在這裡喲");
            }
            cm.dispose();
        }


    }
}