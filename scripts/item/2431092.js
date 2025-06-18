/*
    名稱：特殊超值禮包禮物箱
    內容：新手100級禮包
*/

var giftMaxNum = 5;    // 禮包數量
var itemReward = new Array( // 道具id，道具數量，禮包等級
                            // 1級禮包
                            Array(2001516, 100, 1),
                            Array(2002036, 100, 1),
                            Array(5040005, 100, 1),
                            Array(2100900, 1, 1),
                            Array(3010013, 1, 1),
                            // 30級禮包
                            Array(2002036, 100, 2),
                            Array(2431887, 30, 2),
                            Array(2001505, 100, 2),
                            Array(2001556, 100, 2), // 包治百病藥
                            Array(2001537, 50, 2),
                            Array(2001538, 50, 2),
                            Array(2001539, 50, 2),
                            Array(2100900, 2, 2),
                            Array(3010037, 1, 2),
                            Array(-1, 1000, 2),
                            // 60級禮包
                            Array(2002036, 100, 3),
                            Array(2002036, 100, 3),
                            Array(2431887, 30, 3),
                            Array(2001505, 300, 3),
                            Array(2001556, 100, 3),
                            Array(2100900, 3, 3),
                            Array(3010038, 1, 3),
                            Array(-1, 2000, 3),
                            // 100級禮包
                            Array(2002036, 100, 4),
                            Array(2431887, 50, 4),
                            Array(2001505, 300, 4),
                            Array(2001505, 200, 4),
                            Array(2001556, 200, 4),
                            Array(2100900, 4, 4),
                            Array(3010046, 1, 4),
                            Array(-1, 3000, 4),
                            // 150級禮包
                            Array(2002036, 100, 5),
                            Array(2431887, 100, 5),
                            Array(2001505, 300, 5),
                            Array(2001505, 300, 5),
                            Array(2001556, 200, 5),
                            Array(2100900, 5, 5),
                            Array(-1, 4000, 5),
                            Array(3010045, 1, 5)
                            );


function start() {
    var giftLevel = 1;
    var newItemReward = new Array();
    var playerLevel = it.getPlayer().getLevel();
    var openReqLevel = 0;
    var text = "";
    for (var i = 1; i <= 5; i++) {
        giftLevel = i;
        if (im.getBossLog("新手禮包" + i, 1) != 0 ) {
            continue;
        } else {
            break;
        }
    }
    

    switch (giftLevel) {
        case 1:
            openReqLevel = 1;
            break;
        case 2:
            openReqLevel = 30;
            break;
        case 3:
            openReqLevel = 60;
            break;
        case 4:
            openReqLevel = 100;
            break;
        case 5:
            openReqLevel = 150;
        default:
            break;
    }
    
    //im.sendOk(openReqLevel+"c"+im.getBossLog("新手禮包5"));
    //im.dispose();qu0
    //return;
    if (giftLevel > 1 && im.getPlayer().getTodayOnlineTime() < (giftLevel * 10)) {
        im.playerMessage(1, "在線時間不足" + (giftLevel * 10) + "分鐘，無法打開禮包\r\n還需堅持 " + (giftLevel * 10 - im.getPlayer().getTodayOnlineTime()) + "分鐘");
        im.dispose();
        return;
    }

    if (playerLevel < openReqLevel) {
        text = "【特殊超值禮包禮物箱】\r\n(需" + openReqLevel + "級才能打開)\r\n打開後可獲得下列物品：\r\n\r\n";
        for (var i = 0; i < itemReward.length; i++) {
            if (itemReward[i][2] == giftLevel) {
                if (itemReward[i][0] == -1) {
                    text += "楓點 " + itemReward[i][1] + " 點\r\n";
                } else {
                    text += im.getItemName(itemReward[i][0]) + " × " + itemReward[i][1] + " 個\r\n";
                }
            }
        }
        it.playerMessage(1, text);
        it.dispose();
        return;
    }
    
    for (var i = 0; i < itemReward.length; i++) {
        if (itemReward[i][2] == giftLevel) {
            newItemReward.push(itemReward[i]);
        }
    }

    if (im.getInventory(2).isFull(newItemReward.length - 1)) {
        im.playerMessage(1, "【特殊超值禮包禮物箱】\r\n(" + openReqLevel + "級禮包)\r\n\r\n消耗欄空間不足，需要 " + newItemReward.length + " 格空間。");
        im.dispose();
        return;
    } else if (im.getInventory(3).isFull(1)) {
        im.playerMessage(1, "【特殊超值禮包禮物箱】\r\n(" + openReqLevel + "級禮包)\r\n\r\n裝飾欄空間不足，需要 1 格空間。");
        im.dispose();
        return;
    }
    
    for (var i = 0; i < newItemReward.length; i++) {
        if (newItemReward[i][0] == -1) {
            im.getPlayer().modifyCSPoints(2, newItemReward[i][1]);
            text += "楓點 " + newItemReward[i][1] + " 點\r\n";
            continue;
        }
        im.gainItem(newItemReward[i][0], newItemReward[i][1]);
        text += im.getItemName(newItemReward[i][0]) + " × " + newItemReward[i][1] + " 個\r\n";
    }

    // 如果已經是最高級的禮包，則消耗掉
    if (giftLevel == giftMaxNum) {
        im.gainItem(2431092, -1);
    }
    im.setBossLog("新手禮包" + giftLevel, 1, 1);
    im.playerMessage(1, "【特殊超值禮包禮物箱】\r\n(" + openReqLevel + "級禮包)\r\n恭喜您已獲得：\r\n\r\n" + text);
    im.dispose();
}