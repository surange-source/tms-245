/*      
 *  
 *  功能：楓葉交換楓葉幣
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
            var selStr = "這裡可以使用#r#v4001126##t4001126##k兌換#r#v4310028##t4310028##k,兌換比例為#b1:2#k.那麼你想進行兌換麼?";
            cm.sendYesNo(selStr);
            break;
        case 1:
            var selStr = "你想兌換多少#r#v4310028##t4310028##k呢?\r\n\r\n";
            cm.sendGetNumber(selStr, 0, 0, 99999);
            break;
        case 2:
            if (selection == 0) {
                cm.sendOk("你覺得0個也需要兌換麼?#k.");
                cm.safeDispose();
            } else {
                temp = selection * 2;
                cost = selection;
                cm.sendYesNo("你想使用 #r" + cost + "個#v4001126##t4001126##k 來兌換#b " + temp + "個#v4310028##t4310028###k嗎?");
            }
            break;
        case 3:
            if (cm.getItemQuantity(4001126) < cost) {
                cm.sendOk("請確認你有足夠的#b#v4001126##t4001126##k.");
            } else {
                cm.gainItem(4001126, -cost);
                cm.gainItem(4310028, temp);
                cm.sendOk("兌換好啦！歡迎下次在來");
            }
            cm.dispose();
            break;
    }
}
