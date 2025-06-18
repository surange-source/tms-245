var status = -1;
var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var buyId = -1;
var item = null;
var itemList = Array(
    //道具代碼，楓點，數量， 次數：-1為不限制
    //Array(5220040, 5000, 10, -1),
    Array(5062000, 600, 1, 30),
    Array(5050000, 5000, 50, -1),
    Array(5062002, 1200, 1, 10),
    Array(5062500, 1500, 1, 10),
    Array(5062010, 1800, 1, 10),
    Array(5062009, 2000, 1, 5),
    Array(2340000, 2000, 1, 10),
    Array(5064000, 3000, 1, 10),
    //Array(2049116, 3000, 1, 10),
    //Array(2049124, 3000, 1, 10),
    Array(2049402, 2500, 1, 10),
    Array(2049704, 5000, 1, 1),
    Array(5076000, 800, 1, -1),
    Array(5072000, 500, 1, -1)
);
function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        var text = "歡迎來到#e#b楓點商城#k#n，請選擇你要購買的物品，部分物品有次數限制哦！\r\n";
        for(var key in itemList) {
            var itemid = itemList[key][0];
            var itemquantity = itemList[key][2];
            var limitcount = itemList[key][3];
            var price = itemList[key][1];
            text+="#L"+key+"#"+aaa+" #r"+price+"楓點#d兌換#b#z"+itemid+"# #d"+itemquantity+"個#k ";
            if (limitcount != -1) {
                var currentTimes = cm.getPQLog("楓點"+cm.getItemName(itemid));
                if (currentTimes >= limitcount)
                    text+="#r("+currentTimes+"/"+limitcount+"次)#k#l\r\n";
                else
                    text+="#g("+currentTimes+"/"+limitcount+"次)#k#l\r\n";
            } else {
                text+="#l\r\n";
            }
        }
        cm.sendSimple(text);
        //cm.dispose();
    } else if (status == 1) {
        buyId = selection;
        item = itemList[buyId];
        var itemid = item[0];
        var itemquantity = item[2];
        var price = item[1];
        cm.sendYesNo("是否需要花費#r"+price+"楓點#k購買"+itemquantity+"個#b#z"+itemid+"##k？");
    } else if (status == 2) {
        var itemid = item[0];
        var itemquantity = item[2];
        var limitcount = item[3];
        var price = item[1];
        var currentTimes = cm.getPQLog("楓點"+cm.getItemName(itemid));
        var myNx = cm.getPlayer().getCSPoints(2);
        if (myNx < price) {
            cm.sendOk("您的楓點餘額不足，無法完成購買。");
            cm.dispose();
            return;
        }
        if (limitcount!=-1 && currentTimes>=limitcount) {
            cm.sendOk("您今天無法再購買該物品。");
            cm.dispose();
            return;
        }
        if (cm.getSpace(Math.floor(itemid/1000000))<=2) {
            cm.sendOk("您的背包空間不足，請整理後再購買。");
            cm.dispose();
            return; 
        }
        cm.gainItem(itemid, itemquantity);
        cm.gainNX(2, -price);
        if (limitcount!=-1) {
            cm.setPQLog("楓點"+cm.getItemName(itemid))
        }
        cm.sendOk("恭喜您購買成功！");
        cm.dispose();
    }
}