var status = 0;
var giftContent = Array(
    Array("端午節溫情大禮包", 777, Array(
        Array(2049160, 5),
        Array(2049116, 5),
        Array(4310030, 50),
        Array(4310036, 200)
    )), 
    Array("端午節恭賀大禮包", 888, Array(
        Array(2049160, 8),
        Array(2049116, 8),
        Array(2340000, 5),
        Array(4310030, 100),
        Array(2431945, 1)
    )),
    Array("150級防具自選禮包", 3333, Array(
        Array(2049160, 12),
        Array(2049116, 12),
        Array(2340000, 12),
        Array(5064000 , 5),
        Array(4310030, 200),
        Array(2431988, 1)
    )),
    Array("150級武器自選禮包", 3888, Array(
        Array(2430781, 1),
        Array(2430656, 1),
        Array(2431509, 1)
    )),
    Array("正義火種大禮包  ", 500, Array(
        Array(4033356, 10)
        //Array(2049116, 5),
        //Array(4310030, 50),
        //Array(4310036, 200)
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
        text += "#e#b歡迎來到兔花花端午節兌換物品中心，點擊可以查看兌換物品內容哦！\r\n#d萬能傳送--快速練級--幽靈船2 --爆物!\r\n";
        for(var key in giftContent) {
            text+="#b#L"+key+"#兌換【#r#e"+giftContent[key][0]+"#n#b】 #v4032952# 和 #v4033024##e#d"+"各"+giftContent[key][1]+"個#n#b#l#k\r\n";
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
        text+="\r\n#d是否花費#e#r"+price+"#n#d個粽葉兌換端午節禮包？#k";
        cm.sendYesNo(text);
    } else if (status == 2) {
        if (giftId!=-1 && gifts != null) {
            if (cm.getSpace(1) < 8 || cm.getSpace(2) < 8 || cm.getSpace(3) < 8 || cm.getSpace(4) < 8 || cm.getSpace(5) < 8) {
                cm.sendOk("您的背包空間不足，請保證每個欄位至少8格的空間，以避免領取失敗。");
                cm.dispose();
                return ;
            }
            if (!cm.haveItem(4032952, price)||!cm.haveItem(4033024, price)) {
                cm.sendOk("您的粽葉和麵粉不足，請先湊齊後再兌換。");
                cm.dispose();
                return ;
            }
            for(var key in gifts) {
                var itemId = gifts[key][0];
                var itemQuantity = gifts[key][1];
                cm.gainItem(itemId, itemQuantity);
            }
            cm.gainItem(4032952, -price);
            cm.gainItem(4033024, -price);
            cm.sendOk("恭喜您，兌換成功！");
            cm.dispose();
        } else {
            cm.sendOk("兌換錯誤！請聯繫管理員！");
            cm.dispose();
        }
    }
}