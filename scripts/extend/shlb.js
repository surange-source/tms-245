var status = 0;
var giftContent = Array(
    Array("就是愛抽獎禮包", 10000, Array(
        Array(2430640, 1),
        Array(2430051, 2),
        Array(2430069, 10),
        Array(2432353, 10)
    )), 
    Array("初級強化禮包", 2000, Array(
        Array(5064000, 5),
        Array(2049116, 5),
        Array(2049124, 5)
    )),
    Array("高級強化禮包", 6000, Array(
        Array(5064000, 20),
        Array(5062009, 20),
        Array(5062500, 20)
    )),
    Array("心動強化禮包", 10000, Array(
        Array(2049323, 2),
        Array(2340000, 10),
        Array(5062009, 10),
        Array(5062500, 10),
        Array(2049116, 5),
        Array(2049124, 5)
    )),
    Array("溫暖冬季禮包", 40000, Array(
        Array(4310129, 2000),
        Array(4000517, 5),
        Array(2431945, 1),
        Array(5062009, 10),
        Array(5062500, 10),
        Array(5064000, 10)
    )),
    Array("實力戰將禮包", 40000, Array(
        Array(2049135, 10),
        Array(2340000, 10),
        Array(5064000, 10),
        Array(5062009, 30),
        Array(5062500, 30)
    )),
    Array("閃耀品級禮包", 50000, Array(
        Array(4000517, 40),
        Array(2431944, 1),
        Array(2431944, 1),
        Array(2431944, 1),
        Array(2431945, 1),
        Array(2431945, 1),
        Array(2431945, 1)
    )),
    Array("#t5062002#禮包", 50000, Array(
        Array(5062002, 100),
        Array(5062500, 100)
    )),
    Array("升級強化型大禮包", 65000, Array(
        Array(2340000, 100),
        Array(5064000, 50),
        Array(2049323, 50)
    )),
    Array("驚人正義卷大禮包", 30000, Array(
        Array(2340000, 50),
        Array(5064000, 50),
        Array(2049137, 25)
    )),
    Array("潛能卷軸大禮包", 20000, Array(
        Array(2049402, 5),
        Array(2048307, 5)
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
            text+="#b#L"+key+"#購買【#r#e"+giftContent[key][0]+"#n#b】 #e#d"+giftContent[key][1]+"樂豆點#n#b#l#k\r\n";
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
        text+="\r\n#d是否花費#e#r"+price+"#n#d樂豆點購買該禮包？#k";
        cm.sendYesNo(text);
    } else if (status == 2) {
        if (giftId!=-1 && gifts != null) {
            if (cm.getSpace(1) < 8 || cm.getSpace(2) < 8 || cm.getSpace(3) < 8 || cm.getSpace(4) < 8 || cm.getSpace(5) < 8) {
                cm.sendOk("您的背包空間不足，請保證每個欄位至少8格的空間，以避免領取失敗。");
                cm.dispose();
                return ;
            }
            //if (!cm.haveItem(4310014, price)) {
                        if (cm.getPlayer().getCSPoints(1) < price) {
                cm.sendOk("您的樂豆點不足，請先儲值後再購買。");
                cm.dispose();
                return ;
            }
            for(var key in gifts) {
                var itemId = gifts[key][0];
                var itemQuantity = gifts[key][1];
                cm.gainItem(itemId, itemQuantity);
            }
            //cm.gainItem(4310014, -price);
                           cm.gainNX(-price);
            cm.sendOk("恭喜您，購買成功！");
            cm.dispose();
        } else {
            cm.sendOk("購買錯誤！請聯繫管理員！");
            cm.dispose();
        }
    }
}