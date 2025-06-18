/*  This is mada by Kent    
 *  This source is made by Funms Team
 *  功能：楓葉交換
 *  @Author Kent 
 */
var cashitem;
var status = -1;
var select = -1;
var time;
var itemId;
var quantity;
var x = 0;
var id;
var str = "";
var itemList = Array(
        Array(4021014, 1, 10, -1),//中級
        Array(4021015, 1, 100, -1), //高級
        Array(4021016, 1, 1000, -1)//高級

        );


function start() {
    for (var i = 0; i < itemList.length; i++) {
        var itemId = itemList[i][0];
        str += "#L" + i + "#[我要兌換#v" + itemId + "##b#t" + itemId + "##k需要#r" + itemList[i][2] + "#k個低級結晶]#k\r\n";
    }
    cm.sendSimple("#e你現在擁有 " + cm.getItemQuantity(4021013) + " 個低級結晶#n\n\r\n" + str);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        var limit = itemList[selection][3];
        if (limit > 0 && cm.getPQLog("領取：" + itemList[selection][0]) >= limit) {
            cm.sendOk("你今天已經不能再兌換這個物品了！");
            cm.dispose();
        } else if (cm.getItemQuantity(4021013) >= itemList[selection][2] && cm.getSpace(1) >= 1 && cm.getSpace(2) >= 1 && cm.getSpace(3) >= 1 && cm.getSpace(4) >= 1 && cm.getSpace(5) >= 1) {
            var id = itemList[selection][0];
            var quantity = itemList[selection][1];
            var use = itemList[selection][2];
            cm.gainItem(itemList[selection][0], quantity, id == 5211047 ? 1000 * 60 * 180 : -1);
            cm.gainItem(4021013, -use);
            if (limit > 0) {
                cm.setPQLog("領取：" + itemList[selection][0]);
            }
            cm.sendOk("兌換成功！");
            cm.dispose();
        } else {
            cm.sendOk("你還沒有滿足條件，請確認你有足夠的低級結晶或者背包空間不足(每一欄都必須要有1格以上的空間)！！");
            cm.dispose();
        }
    } else {
        cm.dispose();
    }
}

