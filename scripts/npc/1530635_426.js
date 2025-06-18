/*      

 NPC類型:    綜合NPC

 */

var status = 0;
var typede = 0;
var slot = Array();
var dsa = "";
var ttt2 ="#fUI/Initials.img/Basic/BtDelete/normal/0#";// 
var ttt3 ="#fCharacter/Cape/01102969.img/info/icon#";//
var ttt4 ="#fCharacter/Cape/01102970.img/info/icon#";// 
var ttt5 ="#fCharacter/Cape/01102971.img/info/icon#";//
var ttt6 ="#fCharacter/Cape/01102863.img/info/icon#";// 
var ttt7 ="#fCharacter/Cape/01102818.img/info/icon#";// 
var ttt8 ="#fCharacter/Cape/01102816.img/info/icon#";// 

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
            zyms = "#b#h0# #k一旦物品"+ttt2+"就無法找回~~~請慎重!!!\r\n";
            zyms += "#L1#"+ttt3+"#d>>>"+ttt2+"裝備欄道具<<<#k#l\r\n\r\n";
            zyms += "#L2#"+ttt4+"#d>>>"+ttt2+"消耗欄道具<<<#k#l\r\n\r\n";
            zyms += "#L3#"+ttt5+"#d>>>"+ttt2+"裝飾欄道具<<<#k#l\r\n\r\n";
            zyms += "#L4#"+ttt6+"#d>>>"+ttt2+"其他欄道具<<<#k#l\r\n\r\n";
            zyms += "#L5#"+ttt7+"#d>>>"+ttt2+"特殊欄道具<<<#k#l\r\n\r\n";
            zyms += "#L6#"+ttt8+"#d>>>一鍵"+ttt2+"所有道具<<<#k#l\r\n\r\n";
            cm.sendSimple(zyms);



        } else if (selection == 1) { //"+ttt2+"裝備欄道具
            dsd = 100;
            var avail = "";
            for (var i = 0; i < 96; i++) {
                if (cm.getInventory(1).getItem(i) != null) {
                    avail += "#L" + cm.getInventory(1).getItem(i).getItemId() + "# #z" + cm.getInventory(1).getItem(i).getItemId() + "# #i" + cm.getInventory(1).getItem(i).getItemId() + ":##l\r\n";
                }
                slot.push(i);
            }
            cm.sendSimple(dsa + "#b請選擇需要"+ttt2+"的道具:\r\n#b" + avail);

        } else if (selection == 2) { //"+ttt2+"消耗欄道具
            dsd = 400;
            var avail = "";
            for (var i = 0; i < 96; i++) {
                if (cm.getInventory(2).getItem(i) != null) {
                    avail += "#L" + cm.getInventory(2).getItem(i).getItemId() + "# #z" + cm.getInventory(2).getItem(i).getItemId() + "# #i" + cm.getInventory(2).getItem(i).getItemId() + ":##l\r\n";
                }
                slot.push(i);
            }
            cm.sendSimple(dsa + "#b請選擇需要"+ttt2+"的道具:\r\n#b" + avail);

        } else if (selection == 3) { //"+ttt2+"其他欄道具
            dsd = 400;
            var avail = "";
            for (var i = 0; i < 96; i++) {
                if (cm.getInventory(3).getItem(i) != null) {
                    avail += "#L" + cm.getInventory(3).getItem(i).getItemId() + "# #z" + cm.getInventory(3).getItem(i).getItemId() + "# #i" + cm.getInventory(3).getItem(i).getItemId() + ":##l\r\n";
                }
                slot.push(i);
            }
            cm.sendSimple(dsa + "#b請選擇需要"+ttt2+"的道具:\r\n#b" + avail);

        } else if (selection == 4) { //"+ttt2+"裝飾欄道具
            dsd = 400;
            var avail = "";
            for (var i = 0; i < 96; i++) {
                if (cm.getInventory(4).getItem(i) != null) {
                    avail += "#L" + cm.getInventory(4).getItem(i).getItemId() + "# #z" + cm.getInventory(4).getItem(i).getItemId() + "# #i" + cm.getInventory(4).getItem(i).getItemId() + ":##l\r\n";
                }
                slot.push(i);
            }
            cm.sendSimple(dsa + "#b請選擇需要"+ttt2+"的道具:\r\n#b" + avail);

        } else if (selection == 5) { //"+ttt2+"特殊欄道具
            dsd = 400;
            var avail = "";
            for (var i = 0; i < 96; i++) {
                if (cm.getInventory(5).getItem(i) != null) {
                    avail += "#L" + cm.getInventory(5).getItem(i).getItemId() + "# #z" + cm.getInventory(5).getItem(i).getItemId() + "# #i" + cm.getInventory(5).getItem(i).getItemId() + ":##l\r\n";
                }
                slot.push(i);
            }
            cm.sendSimple(dsa + "#b請選擇需要"+ttt2+"的道具:\r\n#b" + avail);

        } else if (selection == 6) { 
            cm.dispose();
            cm.openNpc(9000132,"yjsc");
        } else if (status == 2) {//"+ttt2+"道具 
            itemss = selection;
            if (dsd == 100) {
                var shul = cm.getPlayer().getItemQuantity(itemss);
                if (cm.getMeso() < 0) {
                    cm.sendOk("你沒有足夠的楓幣,"+ttt2+"道具需要收取手續費50萬楓幣。");
                } else {
                    //cm.gainMeso(-500000);
                    cm.gainItem(itemss, -shul);
                    cm.sendOk(dsa + "我已經將您背包裡的 #i" + itemss + ":#從你的背包清理！");
                }
              status = -1;
            }
            
        
            
            if (dsd == 400) {
                var shul = cm.getPlayer().getItemQuantity(itemss);
                if (cm.getMeso() < 0) {
                    cm.sendOk("你沒有足夠的楓幣,"+ttt2+"道具需要收取手續費50萬楓幣。");
                } else {
                    //cm.gainMeso(-500000);
                    cm.gainItem(itemss, -shul);
                    cm.sendOk(dsa + "我已經將您背包裡的 #i" + itemss + ":#從你的背包清理！");
                }
            }
            status = -1;
        } else {
            cm.dispose();


        }
    }
}

