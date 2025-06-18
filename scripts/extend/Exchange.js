/*      
 *  
 *  功能：專屬幣交換
 *  
 */

var status;
var temp;
var cast;
var intype;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    switch (status) {
        case 0:
            var selStr = "我可以對#b[泰密硬幣]#k進行兌換，#b[泰密硬幣]#k可以兌換許多絕版東西喲。\r\n#r1000W楓幣#k可以兌換#r1個泰密硬幣#k 當然也可以用來兌換楓幣，#r1個泰密硬幣#k可以兌換#r900W楓幣#k\r\n那麼現在你想？\r\n#b#L1#[楓幣兌換泰密硬幣]#k\r\n#b#L2#[泰密硬幣兌換楓幣]#k";
            cm.sendSimple(selStr);
            break;
        case 1: //4310085
            intype = selection;
            if (intype == 1) {
                var selStr = "那麼你現在想用#r楓幣#k兌換#r泰密硬幣#k，兌換比率是：#r2500W楓幣#k可以兌換#r1個泰密硬幣#k，那麼你要兌換多少個#r泰密硬幣#k呢？(本次最大可以輸入:99個)\r\n\r\n";
            } else if (intype == 2) {
                var selStr = "那麼你現在想用#r泰密硬幣#k兌換#r楓幣#k，兌換比率是：#r1個泰密硬幣#k可以兌換#r2000W楓幣#k，那麼你想使用兌換多少#r泰密硬幣#k進行兌換呢？(本次最大可以輸入:99個)\r\n\r\n";
            }
            cm.sendGetNumber(selStr, 0, 0, 99);
            break;
        case 2:
            if (intype == 1) {
                if (selection == 0) {
                    cm.sendOk("我不能和你兌換0個#b[泰密硬幣]#k.");
                    cm.safeDispose();
                } else {
                    temp = selection;
                    cost = temp * 25000000;
                    cm.sendYesNo("你想使用 #b" + cost + " 楓幣#k 來兌換#b " + temp + " 個[泰密硬幣]#k嗎?");
                }
            } else if (intype == 2) {
                if (selection == 0) {
                    cm.sendOk("你不能用0個#b[泰密硬幣]#k進行兌換.");
                    cm.safeDispose();
                } else {
                    temp = selection;
                    cost = temp * 20000000;
                    cm.sendYesNo("你想使用#b " + temp + " 個[泰密硬幣]#k 來兌換#b" + cost + " 楓幣#k嗎?");
                }
            }
            break;
        case 3:
            if (intype == 1) {
                if (cm.getMeso() < cost || !cm.canHold(4310085)) {
                    cm.sendOk("請確認你有足夠多的楓幣或者其他物品欄有足夠的空間.");
                } else {
                    cm.gainItem(4310085, temp);
                    cm.gainMeso(-cost);
                    cm.sendOk("兌換好啦！歡迎下次在來");
                }
            } else if (intype == 2) {
                if (cm.getItemQuantity(4310085) < temp) {
                    cm.sendOk("請確認你有足夠的#b[泰密硬幣]#k.");
                } else {
                    cm.gainItem(4310085, -temp);
                    cm.gainMeso(cost);
                    cm.sendOk("兌換好啦！歡迎下次在來");
                }
            }
            cm.dispose();
            break;
    }
}
