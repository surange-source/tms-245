/*
 腳本功能：商店
 */

var a = 0;
var icon = "#fUI/Basic.img/BtMin2/normal/0#";

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
            cm.sendSimple("請問你需要打開下列哪一種商店#b\r\n\r\n#L0# "+icon+" 雜貨商店#l #L10# "+icon+ " 暴君商店 #L1# "+icon+" 重砲裝備\r\n#L2# "+icon+" 影武裝備 #L3# "+icon+" 飛標專賣 #L4# "+icon+" 外星裝備 \r\n#L5# "+icon+" 特殊裝備 #L6# "+icon+" 獅王道具 #L7# "+icon+" 征服幣店\r\n#L11# "+icon+" 普通卷軸 #L9# "+icon+" 運動幣店 #L8# "+icon+" RED幣商店")
        } else if (a == 1) {
            if (selection == 0){
                cm.openShop(1012123);//shop字段不能為0
                cm.dispose();
            }else if (selection == 1) {//防具商店
                cm.openShop(1012124);
        cm.dispose();
            } else if (selection == 2) {//武器商店
                cm.openShop(1012125);
        cm.dispose();
            } else if (selection == 3) {//武器商店
                cm.openShop(1033003);
        cm.dispose();
            } else if (selection == 4) {//武器商店
                cm.openShop(9310117);
        cm.dispose();
            } else if (selection == 5) {//武器商店
                cm.openShop(1033001);
        cm.dispose();
            } else if (selection == 6) {//武器商店
                cm.openShop(2161010);
        cm.dispose();
            } else if (selection == 7) {//武器商店
        cm.dispose();
                cm.openNpc(9900003, "zhengfuzhe");
            } else if (selection == 8) {//RED
        cm.dispose();
                cm.openShop(20000);
            } else if (selection == 9) {//運動幣
        cm.dispose();
                cm.openShop(22200);
            } else if (selection == 10) {
                cm.dispose();
                cm.openShop(22224);
            } else if (selection == 11) {
                cm.dispose();
                cm.openNpc(9310144,"putongjuan");
            
            } else {
                cm.sendOk("好吧~");
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
                //cm.openShop(selection);
                cm.dispose();
            }
        } else if (a == 2) {
            switch (selection) {
                case 0://低級防具
                    //cm.openShop(10)
                    cm.sendOk("暫時未開放。")
                    break;
                case 1://50~60級防具
                    cm.openShop(11)
                    break;
                case 2://60~70級防具
                    cm.openShop(12)
                    break;
                case 3://低級武器
                    //cm.openShop(20)
                    cm.sendOk("暫時未開放。")
                    break;
                case 4://50~60級武器
                    cm.openShop(21)
                    break;
                case 5://60~70級武器
                    cm.openShop(22)
                    break;
            }
            cm.dispose();
        }//a
    }//mode
}//f