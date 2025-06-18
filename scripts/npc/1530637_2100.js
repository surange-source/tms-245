var aaa = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

var status = 0;
var typed = 0;
var twd = 0;
var weaponId = null;
var weaponList = Array(
        1052314, // 獅心戰鬥鎖子甲, // (無描述)
        1052315, // 龍尾法師長袍, // (無描述)
        1052316, // 鷹翼哨兵服, // (無描述)
        1052317, // 渡鴉之魂追蹤者盔甲, // (無描述)
        1052318, // 鯊齒船長外套, // (無描述)
        1082296, // 龍尾法師手套, // (無描述)
        1082297, // 鷹翼哨兵手套, // (無描述)
        1082298, // 渡鴉之魂追蹤者手套, // (無描述)
        1082299, // 鯊齒船長手套, // (無描述)
        1082295, // 獅心戰鬥護腕, // (無描述)
        1152110, // 龍尾法師護肩, // (無描述)
        1152111, // 鷹翼哨兵護肩, // (無描述)
        1152112, // 渡鴉之魂獵人護肩, // (無描述)
        1152113, // 鯊齒船長護肩, // (無描述)
        1152108, // 獅心戰鬥護肩, // (無描述)
        1102275, // 獅心戰鬥披風, // (無描述)
        1102276, // 龍尾法師披風, // (無描述)
        1102277, // 鷹翼哨兵披風, // (無描述)
        1102278, // 渡鴉之魂獵人披風, // (無描述)
        1102279, // 鯊齒船長披風, // (無描述)
        1003172, // 獅心戰鬥頭盔, // (無描述)
        1003173, // 龍尾法師帽子, // (無描述)
        1003174, // 鷹翼哨兵便帽, // (無描述)
        1003175, // 渡鴉之魂追蹤者帽, // (無描述)
        1003176, // 鯊齒船長帽, // (無描述)
        1072485, // 獅心戰鬥鞋, // (無描述)
        1072486, // 龍尾法師鞋, // (無描述)
        1072487, // 鷹翼哨兵鞋, // (無描述)
        1072488, // 渡鴉之魂追蹤者鞋, // (無描述)
        1072489 // 鯊齒船長鞋, // (無描述)
        );
var needItemList = Array(
        Array(4000286, 888),
        Array(4000361, 888),
        Array(4021022, 1)
        );
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            var selStr = "#d我這裡可以製作140級防具，請選擇想要製作的裝備：#n#k\r\n";
            for (var key in weaponList) {
                var item = weaponList[key];
                selStr += "#r#L" + key + "#製作 #b#z" + item + "# #r[查看詳情]\r\n";
            }
            cm.sendSimple(selStr);
        } else if (status == 1) {
            weaponId = selection;
            var text = "- #e#d#z" + weaponList[weaponId] + "#需要的材料：#n#k\r\n\r\n#b";
            for (var key in needItemList) {
                var itemName = cm.getItemName(needItemList[key][0]);
                text += itemName;
                for (var i = 0; i <= 25 - itemName.getBytes().length; i++)
                {
                    text += " ";
                }
                var currentItemQuantity = cm.getItemQuantity(needItemList[key][0]);
                var color = "#g";
                if (currentItemQuantity < needItemList[key][1])
                    color = "#r";
                text += color + currentItemQuantity + " / " + needItemList[key][1] + " 個#b\r\n";
            }
            text += "#k\r\n\r\n- #e#d管理提示：#n#b點是進行製作。點否返回上一頁.#k";
            cm.sendYesNo(text);
        } else if (status == 2) {
            flag = true;
            for (var key in needItemList) {
                var itemId = needItemList[key][0];
                var itemQuantity = needItemList[key][1];
                if (!cm.haveItem(itemId, itemQuantity))
                {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                if (cm.getSpace(1) < 1) {
                    cm.sendOk("裝備欄空間不足，請整理後重新製作！");
                    cm.dispose();
                    return;
                }
                for (var key in needItemList) {
                    var itemId = needItemList[key][0];
                    var itemQuantity = needItemList[key][1];
                    cm.gainItem(itemId, -itemQuantity);
                }
                cm.gainItem(weaponList[weaponId], 1);
                cm.sendOk("恭喜您合成#z" + weaponList[weaponId] + "#一把.");
                cm.worldSpouseMessage(0x20, "[任務公告] : 恭喜 " + cm.getChar().getName() + " 製作了一件 <" + cm.getItemName(weaponList[weaponId]) + ">.");
                cm.dispose();
            } else {
                cm.sendOk("材料不足，無法完成製作！");
                cm.dispose();
            }
        }
    }
}