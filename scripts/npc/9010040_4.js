/*
 腳本功能：商店
 */

var a = 0;
var icon = "#fUI/UIWindow/Quest/icon2/7#";
var ttt = "#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
            var str = "";
            
            str += "#r#e請問你需要打開下列哪一種商店#b#n\r\n\r\n";
            str += "#r備註:裝備、消耗、垃圾等無法直接販賣於此，請賣給機器人商店、主城NPC回收#k\r\n";
            
            str += "#L0# "+icon+" 雜貨商店#l";
            str += "#L1# "+icon+" 重砲裝備#l";
            str += "#L2# "+icon+" 影武裝備#l\r\n";
            str += "#L3# "+icon+" 飛標專賣#l";
            str += "#L4# "+icon+" 新手商店#l";
            str += "#L5# "+icon+" 雪花商店#l\r\n";
            str += "#L6# "+icon+" 寵物食品#l";
            cm.sendSimple(str);
        } else if (a == 1) {
            if (selection == 0){
                cm.openShopNPC(61);
                cm.dispose();
            }else if (selection == 1) {//防具商店
                cm.openShopNPC(308);
        cm.dispose();
            } else if (selection == 2) {//武器商店
                cm.openShopNPC(309);
        cm.dispose();
            } else if (selection == 3) {//武器商店
                cm.openShopNPC(64);
        cm.dispose();
            } else if (selection == 4) {//武器商店
                cm.openShopNPC(62);
        cm.dispose();
            } else if (selection == 5) {//武器商店
                cm.openShopNPC(312);
        cm.dispose();
            } else if (selection == 6) {//武器商店
                cm.openShopNPC(200);
        cm.dispose();
            } else if (selection == 7) {//雪花商店
        cm.dispose();
                cm.openShopNPC(312);
            } else if (selection == 8) {//RED
        cm.dispose();
                cm.openShopNPC(69);
            } else if (selection == 9) {//運動幣
        cm.dispose();
                cm.openShopNPC(2);
            } else {
                // 1012123 雜貨商店 x
                //10 低級防具
                //11 50~60級防具
                //12 60~70級防具
                //20 低級武器
                //21 50~60級武器
                //22 60~70級武器
                // 3 其他道具 
                // 4 卷軸商店 x 
                // 1012125 寵物商店
                // 6 輔助武器
                cm.openShopNPC(selection);
                cm.dispose();
            }
        } else if (a == 2) {
            switch (selection) {
                case 0://低級防具
                    //cm.openShop(10)
                    cm.sendOk("暫時未開放。")
                    break;
                case 1://50~60級防具
                    cm.openShopNPC(11)
                    break;
                case 2://60~70級防具
                    cm.openShopNPC(12)
                    break;
                case 3://低級武器
                    //cm.openShop(20)
                    cm.sendOk("暫時未開放。")
                    break;
                case 4://50~60級武器
                    cm.openShopNPC(21)
                    break;
                case 5://60~70級武器
                    cm.openShopNPC(22)
                    break;
            }
            cm.dispose();
        }//a
    }//mode
}//f