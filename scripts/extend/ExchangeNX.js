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
            var selStr = "這裡可以使用#r楓幣#k兌換#r楓點#k,兌換比例為#b9000W:1000#k.那麼你想進行兌換麼?";
            cm.sendYesNo(selStr);
            break;
        case 1:
            var selStr = "你想兌換多少楓點呢?\r\n(#r楓點單位為一千,兌換10點只需要輸入#b1#r,以此類推#k).)\r\n\r\n";
            cm.sendGetNumber(selStr, 0, 0, 99);
            break;
        case 2:
            if (selection == 0) {
                cm.sendOk("你覺得0楓點也需要兌換麼?#k.");
                cm.safeDispose();
            } else {
                temp = selection * 0.9;
                cost = selection * 10;
                cm.sendYesNo("你想使用 #r" + temp + "E 楓幣#k 來兌換#b " + cost + " 樂豆點#k嗎?");
            }
            break;
        case 3:
            var mesos = temp * 100000000;
            if (cm.getMeso() < mesos) {
                cm.sendOk("請確認你有足夠的#b楓幣#k.");
            } else {
                cm.gainMeso(-mesos);
                cm.gainNX(2, cost);
                cm.sendOk("兌換好啦！歡迎下次在來");
            }
            cm.dispose();
            break;
    }
}
