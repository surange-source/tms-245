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
            var selStr = "這邊可以對收集到的郵票進行兌換。\r\n#b#L0#兌換#r#v4002000##t4002000##k 每張1000樂豆點#k\r\n#b#L1#兌換#r#v4002001##t4002001##k 每張2000樂豆點#k\r\n#b#L2#兌換#r#v4002002##t4002002##k 每張5000樂豆點#k\r\n#b#L3#兌換#r#v4002003##t4002003##k 每張10000樂豆點#k";
            cm.sendSimple(selStr);
            break;
        case 1: //4310085
            intype = 4002000 + selection;
            var base;
            switch (intype) {
                case 4002000:
                    base = 1000;
                    break;
                case 4002001:
                    base = 2000;
                    break;
                case 4002002:
                    base = 5000;
                    break;
                case 4002003:
                    base = 10000;
                    break;
            }
            temp = cm.getItemQuantity(intype);
            if (temp > 0) {
                cost = temp * base;
                cm.sendYesNo("是否要兌換 " + temp + "張#b#v" + intype + "##t" + intype + "##k.");
            } else {
                cm.sendOk("你並沒有#b#v" + intype + "##t" + intype + "##k...");
                cm.safeDispose();
            }
            break;
        case 2:
            cm.gainItem(intype, -temp);
            cm.gainNX(cost);
            cm.sendOk("兌換好啦！歡迎下次在來");
            cm.dispose();
            break;
    }
}
