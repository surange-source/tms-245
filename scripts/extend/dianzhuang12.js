var status = 0;
var giftContent = Array(
    Array("11週年楓葉套裝", 99, Array(
        Array(1052953, 1),
        Array(1082659, 1),
        Array(1004556, 1),
        Array(1702598, 1),
        Array(1070024, 1)
    )), 
    Array("怪盜幻影[男款]套裝", 70, Array(
        Array(1702347, 1),
        Array(1003436, 1),
        Array(1102355, 1),
        Array(1112745, 1),
        Array(1050226, 1),
        Array(1070024, 1)
    )), 
    Array("怪盜幻影[女款]套裝", 70, Array(
        Array(1702347, 1),
        Array(1003436, 1),
        Array(1102355, 1),
        Array(1112745, 1),
        Array(1051276, 1),
        Array(1071036, 1)
    )),
    Array("死亡之刃-男套餐", 70, Array(
        Array(1702565, 1),
        Array(1004450, 1),
        Array(1050356, 1),
        Array(1102809, 1),
        Array(1073041, 1)
    )),
    Array("死亡之刃-女套餐", 70, Array(
        Array(1702565, 1),
        Array(1004450, 1),
        Array(1051426, 1),
        Array(1102809, 1),
        Array(1073041, 1)
    )),
    Array("咯咯嗒小雞套裝", 60, Array(
        Array(1003965, 1),
        Array(1052661, 1),
        Array(1082549, 1),
        Array(1702461, 1)
    )),
    Array("海豹白白套裝", 88, Array(
        Array(1003713, 1),
        Array(1052550, 1),
        Array(1082493, 1),
        Array(1702454, 1)
    )),
    Array("阿拉丁[男款]套裝",50, Array(
        Array(1003666, 1),
        Array(1052372, 1),
        Array(1082448, 1),
        Array(1072680, 1),
        Array(1702379, 1)
    )),
    Array("阿拉丁[女款]套裝", 50, Array(
        Array(1003667, 1),
        Array(1052373, 1),
        Array(1082448, 1),
        Array(1072681, 1),
        Array(1702379, 1)
    )),
    Array("血腥套裝", 60, Array(
        Array(1003934, 1),
        Array(1052644, 1),
        Array(1052643, 1),
        Array(1102605, 1),
        Array(1702444, 1),
        Array(1072848, 1)
    )),
    Array("夏日海洋套裝", 99, Array(
        Array(1003636, 1),
        Array(1702375, 1),
        Array(1052536, 1),
        Array(1102491, 1),
        Array(1072893, 1)
    )),
    Array("波比魔法[男款]套裝", 60, Array(
        Array(1102583, 1),
        Array(1003892, 1),
        Array(1050285, 1),
        Array(1072831, 1),
        Array(1702433, 1)
    )),
    Array("波比魔法[女款]套裝", 60, Array(
        Array(1102583, 1),
        Array(1003892, 1),
        Array(1050352, 1),
        Array(1072831, 1),
        Array(1702433, 1)
    )),
    Array("蝴蝶套裝", 81, Array(
        Array(1102453, 1),
        Array(1003581, 1),
        Array(1042241, 1),
        Array(1062156, 1),
        Array(1702367, 1)
    )), 
    Array("巧克力精靈套裝", 66, Array(
        Array(1003460, 1),
        Array(1052438, 1),
        Array(1072749, 1),
        Array(1102488, 1)
    ))
);
var giftId = -1;
var gifts = null;
var price = 999;
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
        var text = "";
        text += "歡迎來到禮包商城，點擊可以查看禮包內容哦！\r\n";
        for(var key in giftContent) {
            text+="#b#L"+key+"##v2433245# 購買【#r#e"+giftContent[key][0]+"#n#b】 需要#e#d"+giftContent[key][1]+"個黃金楓葉#n#b#l#k\r\n";
        }
        cm.sendSimple(text);
    } else if (status == 1) {
        giftId = parseInt(selection);
        price = giftContent[giftId][1];
        gifts = giftContent[giftId][2];
        var text="#r#e"+giftContent[giftId][0]+"#n#b內容：\r\n";
        for(var key in gifts) {
            var itemId = gifts[key][0];
            var itemQuantity = gifts[key][1];
            text+="#i"+itemId+":##b#z"+itemId+"##k #rx "+itemQuantity+"#k\r\n";
        }
        text+="\r\n#d是否花費#e#r"+price+"#n#d個黃金楓葉購買該禮包？#k";
        cm.sendYesNo(text);
    } else if (status == 2) {
        if (giftId!=-1 && gifts != null) {
            if (cm.getSpace(1) < 8 || cm.getSpace(2) < 8 || cm.getSpace(3) < 8 || cm.getSpace(4) < 8 || cm.getSpace(5) < 8) {
                cm.sendOk("您的背包空間不足，請保證每個欄位至少8格的空間，以避免領取失敗。");
                cm.dispose();
                return ;
            }
            if (!cm.haveItem(4000313, price)) {
                cm.sendOk("您的黃金楓葉不足，請先儲值後再購買。");
                cm.dispose();
                return ;
            }
            for(var key in gifts) {
                var itemId = gifts[key][0];
                var itemQuantity = gifts[key][1];
                cm.gainItem(itemId, itemQuantity);
            }
            cm.gainItem(4000463, -price);
            cm.sendOk("恭喜您，購買成功！");
            cm.dispose();
        } else {
            cm.sendOk("購買錯誤！請聯繫管理員！");
            cm.dispose();
        }
    }
}
