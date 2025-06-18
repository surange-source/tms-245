var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

var status = 0;
var typed=0;
var twd = 0;
var weaponId = null;
var weaponList = Array(
5000228, // 獅心戰鬥鎖子甲, // (無描述)
5000229, // 龍尾法師長袍, // (無描述)
5000230, // 鷹翼哨兵服, // (無描述)
5000237, // 渡鴉之魂追蹤者盔甲, // (無描述)
5000243, // 鯊齒船長外套, // (無描述)
5000244, // 龍尾法師手套, // (無描述)
5000245, // 鷹翼哨兵手套, // (無描述)
5000284, // 渡鴉之魂追蹤者手套, // (無描述)
5000247, // 鯊齒船長手套, // (無描述)
5000285, // 獅心戰鬥護腕, // (無描述)
5000252, // 龍尾法師護肩, // (無描述)
5000288, // 鷹翼哨兵護肩, // (無描述)
5000289, // 渡鴉之魂獵人護肩, // (無描述)
5000290, // 鯊齒船長護肩, // (無描述)
5000292, // 獅心戰鬥護肩, // (無描述)
5000291, // 獅心戰鬥披風, // (無描述)
5000293, // 龍尾法師披風, // (無描述)
5000294, // 鷹翼哨兵披風, // (無描述)
5000295, // 渡鴉之魂獵人披風, // (無描述)
5000324, // 鯊齒船長披風, // (無描述)
5000324, // 獅心戰鬥頭盔, // (無描述)
5000296, // 龍尾法師帽子, // (無描述)
5000297, // 鷹翼哨兵便帽, // (無描述)
5000298, // 渡鴉之魂追蹤者帽, // (無描述)
5000370, // 鯊齒船長帽, // (無描述)
5000369, // 獅心戰鬥鞋, // (無描述)
5000371, // 龍尾法師鞋, // (無描述)
5000352, // 鷹翼哨兵鞋, // (無描述)
5000353, 
5000354,
5000375,
5000376,
5000377,
5000191,
5000382,
5000366,
5000367,
5000365 
);
var needItemList = Array(
    Array(4310036, 2000),
    Array(4000021, 100),
    Array(4001241, 5),
    Array(4001242, 5),
    Array(4004000, 50),
    Array(4004001, 50),
    Array(4004002, 50),
    Array(4004003, 50)
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
            for(var key in weaponList) {
                var item = weaponList[key];
                selStr += "#r#L"+key+"#製作 #b#z"+item+"# #r[查看詳情]\r\n";
            }
            cm.sendSimple(selStr);    
        } else if (status == 1) {
            weaponId = selection;
            var text = "- #e#d#z"+weaponList[weaponId]+"#需要的材料：#n#k\r\n\r\n#b";
            for(var key in needItemList) {
                var itemName = cm.getItemName(needItemList[key][0]);
                text+=itemName;
                for(var i=0; i<=25-itemName.getBytes().length; i++)
                {
                    text+=" ";
                }
                var currentItemQuantity = cm.getItemQuantity(needItemList[key][0]);
                var color="#g";
                if (currentItemQuantity<needItemList[key][1])
                    color="#r";
                text+=color+currentItemQuantity+" / "+needItemList[key][1]+" 個#b\r\n";
            }
            text+="#k\r\n\r\n- #e#d管理提示：#n#b點是進行製作。點否返回上一頁.#k";
            cm.sendYesNo(text);
        } else if (status == 2) {
            flag=true;
            for(var key in needItemList) {
                var itemId = needItemList[key][0];
                var itemQuantity = needItemList[key][1];
                if (!cm.haveItem(itemId, itemQuantity))
                {
                    flag=false;
                    break;
                }
            }
            if (flag) {
                if (cm.getSpace(1)<1) {
                    cm.sendOk("裝備欄空間不足，請整理後重新製作！");
                    cm.dispose();
                    return;
                }
                for(var key in needItemList) {
                    var itemId = needItemList[key][0];
                    var itemQuantity = needItemList[key][1];
                    cm.gainItem(itemId, -itemQuantity);
                }
                cm.gainItem(weaponList[weaponId], 1);
                cm.sendOk("恭喜您合成#z"+weaponList[weaponId]+"#一把.");
                cm.worldSpouseMessage(0x20, "[任務公告] : 恭喜 " + cm.getChar().getName() + " 製作了一件 <"+cm.getItemName(weaponList[weaponId])+">.");
                cm.dispose();
            } else {
                cm.sendOk("材料不足，無法完成製作！");
                cm.dispose();
            }
        }
    }
}