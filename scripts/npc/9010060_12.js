
/*      
 
 NPC版權:                追憶楓之谷
 NPC類型:                 綜合NPC
 製作人：故事、
 
 */

var status = 0;
var typede = 0;


function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        if (status == 0) {
            var zyms = "";
            zyms = "#fMob/1210102.img/move/0##fMob/1210102.img/move/0##b追憶 - MS#fMob/1210102.img/move/0##fMob/1210102.img/move/0#\r\n";
            zyms += "#k賬戶楓幣:" + cm.getMeso() + "\r\n\r\n";
            zyms += "#b#v2500000##z2500000##L1#免費領取(1次)#l\r\n";
            zyms += "#b#v5230000##z5230000##L2#免費領取(1次)#l#L3#楓幣購買(5W)#l\r\n";
            zyms += "#b#v5064000##z5064000##L4#免費領取(1次)#l\r\n";
            cm.sendSimple(zyms);





        } else if (selection == 1) {
            if (cm.getBossLog("sp卷領取") == 0) {
                cm.gainItem(2500000, 1);
                cm.setBossLog("sp卷領取");
                cm.sendOk("領取成功。");
            } else {
                cm.sendOk("你今天已經領取過來,請明天再來。");
            }
            cm.dispose();

        
            
        } else if (selection == 2) {
            if (cm.getBossLog("搜索器領取") == 0) {
                cm.gainItem(5230000, 1);
                cm.setBossLog("搜索器領取");
                cm.sendOk("領取成功。");
            } else {
                cm.sendOk("你今天已經領取過來,請明天再來。");
            }
            cm.dispose();

        } else if (selection == 3) {
            if (cm.getMeso() >= 50000) {
                cm.gainMeso(-50000);
                cm.gainItem(5230000, 1);
                cm.sendOk("恭喜您購買成功!!!");
            } else {
                cm.sendOk("購買失敗,你沒有足夠的楓幣。\r\n\r\n賬戶楓幣:" + cm.getMeso() + "");
            }
            cm.dispose();    
        
        } else if (selection == 4) {
            if (cm.getMeso() < 3000000) {
               cm.sendOk("購買失敗,你沒有足夠的楓幣。\r\n\r\n領取該免費項目需要支付300W楓幣。\r\n\r\n賬戶楓幣:" + cm.getMeso() + "");
               } else if (cm.getBossLog("免費防爆") == 0) {
                cm.setBossLog("免費防爆");
                cm.gainMeso(-3000000);
                cm.gainItemPeriod(5064000, 1 , 1);
                cm.sendOk("恭喜您領取成功!!!");
            } else {
                cm.sendOk("領取失敗。\r\n\r\n你今天已經領取過來,請明天再來。");
            }
            cm.dispose();      







        }
    }
}

