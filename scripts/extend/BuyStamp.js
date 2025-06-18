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
/*
 * 4002000 - 蝸牛郵票 
 4002001 - 藍蝸牛郵票
 4002002 - 木妖郵票
 4002003 - 綠水靈郵票
 */
function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    switch (status) {
        case 0:
            var selStr = "這邊可以購買特殊的郵票。\r\n#b#L0#購買#r#v4002000##t4002000##k 1050樂豆點#k\r\n#b#L1#購買#r#v4002001##t4002001##k 2090樂豆點#k\r\n#b#L2#購買#r#v4002002##t4002002##k 5230樂豆點#k\r\n#b#L3#購買#r#v4002003##t4002003##k 10450樂豆點#k";
            cm.sendSimple(selStr);
            break;
        case 1: //4310085
            intype = 4002000 + selection;
            var selStr = "那麼你現在想用購買多少張#v" + intype + "##t" + intype + "#？(本次最大可以輸入:99個)\r\n\r\n";
            cm.sendGetNumber(selStr, 0, 0, 99);
            break;
        case 2:
            if (selection == 0) {
                cm.sendOk("我不能和你兌換0張#b#v" + intype + "##t" + intype + "#k.");
                cm.safeDispose();
            } else {
                temp = selection;
                var base;
                switch (intype) {
                    case 4002000:
                        base = 1050;
                        break;
                    case 4002001:
                        base = 2090;
                        break;
                    case 4002002:
                        base = 5230;
                        break;
                    case 4002003:
                        base = 10450;
                        break;
                }
                cost = temp * base;
                cm.sendYesNo("你想使用 #b" + cost + " 樂豆點#k 來兌換#b " + temp + " 個#v" + intype + "##t" + intype + "##k嗎?");
            }
            break;
        case 3:
            if (cm.getNX(1) < cost || !cm.canHold(intype)) {
                cm.sendOk("請確認你有足夠多的樂豆點或者其他物品欄有足夠的空間.");
            } else {
                cm.gainItem(intype, temp);
                cm.gainNX(-cost);
                cm.sendOk("兌換好啦！歡迎下次在來");
            }
            cm.dispose();
            break;
    }
}
