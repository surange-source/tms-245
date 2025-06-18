/*      
 *  
 *  功能：BOSS 西格諾斯
 *  
 */

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
            var text = "";
            text = "#e#n#b#h0# #k前方就是#b西格諾斯#k的庭院了,那麼你想幹嘛???\r\n\r\n";//\r\n2、參加遠征隊必須有#b#t4032923##k才可以進行。\r\n";
            text += "#L1##b前往#b西格諾斯庭院#k#l\r\n";
            text += "#L2##b購買#v4032923##z4032923# (每日2次/3000W楓幣) #k#l\r\n";
            cm.sendSimple(text);
        } else if (selection == 1) {
            if (cm.haveItem(4032923, 1)) {
                cm.gainItem(4032923, -1);
                cm.warp(271040000, 2);
            } else {
                cm.sendOk("你沒有#b#t4032923##k,無法前往#b西格諾斯#k殿堂入口。");
            }
            cm.dispose();
        } else if (selection == 2) {
            if (cm.getMeso() < 30000000) {
                cm.sendOk("購買失敗,你沒有足夠的楓幣。\r\n\r\n購買該項目需要支付3000W楓幣。\r\n\r\n賬戶楓幣:" + cm.getMeso() + "");
            } else if (cm.getSpace(3) < 1) {
                cm.sendOk("購買失敗。\r\n\r\n背包其他欄空間2個以上才可以購買。");
            } else if (!cm.canHold(4032923, 1)) {
                cm.sendOk("你已經有了#v4032923##z4032923#,請不要重複購買。");
            } else if (cm.getPQLog("夢之鑰匙") < 2) {
                cm.setPQLog("夢之鑰匙");
                cm.gainMeso(-30000000);
                cm.gainItem(4032923, 1, 1);
                cm.sendOk("恭喜您購買成功!!!");
            } else {
                cm.sendOk("購買失敗。\r\n\r\n你今天已經購買過了,每日只能楓幣購買2次。");
            }
            cm.dispose();
        }
    }
}
