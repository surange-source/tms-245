
/*      
 
 NPC版權:                追憶楓之谷
 NPC類型:                 綜合NPC
 製作人：故事、
 
 */

var status = 0;
var typede = 0;
var slot = Array();
var dsa = "";

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
            zyms = "#e<#v3991051# #v3991050# #v3991038# #v3991044#-道具刪除NPC>#n\r\n#b#h0# #k一旦物品刪除就無法找回~~~請慎重!!!\r\n";
            zyms += "            #L1##b>>>刪除裝備欄道具<<<#k#l\r\n\r\n";
            zyms += "            #L2##b>>>刪除消耗欄道具<<<#k#l\r\n\r\n";
            zyms += "            #L3##b>>>刪除裝飾欄道具<<<#k#l\r\n\r\n";
            zyms += "            #L4##b>>>刪除其他欄道具<<<#k#l\r\n\r\n";
            zyms += "            #L5##b>>>刪除特殊欄道具<<<#k#l\r\n\r\n";
            cm.sendSimple(zyms);



        } else if (selection == 1) { //刪除裝備欄道具
            dsd = 100;
            var avail = "";
            for (var i = 0; i < 96; i++) {
                if (cm.getInventory(1).getItem(i) != null) {
                    avail += "#L" + cm.getInventory(1).getItem(i).getItemId() + "# #z" + cm.getInventory(1).getItem(i).getItemId() + "# #i" + cm.getInventory(1).getItem(i).getItemId() + ":##l\r\n";
                }
                slot.push(i);
            }
            cm.sendSimple(dsa + "#b請選擇需要刪除的道具:\r\n#b" + avail);

        } else if (selection == 2) { //刪除消耗欄道具
            dsd = 400;
            var avail = "";
            for (var i = 0; i < 96; i++) {
                if (cm.getInventory(2).getItem(i) != null) {
                    avail += "#L" + cm.getInventory(2).getItem(i).getItemId() + "# #z" + cm.getInventory(2).getItem(i).getItemId() + "# #i" + cm.getInventory(2).getItem(i).getItemId() + ":##l\r\n";
                }
                slot.push(i);
            }
            cm.sendSimple(dsa + "#b請選擇需要刪除的道具:\r\n#b" + avail);

        } else if (selection == 3) { //刪除其他欄道具
            dsd = 400;
            var avail = "";
            for (var i = 0; i < 96; i++) {
                if (cm.getInventory(3).getItem(i) != null) {
                    avail += "#L" + cm.getInventory(3).getItem(i).getItemId() + "# #z" + cm.getInventory(3).getItem(i).getItemId() + "# #i" + cm.getInventory(3).getItem(i).getItemId() + ":##l\r\n";
                }
                slot.push(i);
            }
            cm.sendSimple(dsa + "#b請選擇需要刪除的道具:\r\n#b" + avail);

        } else if (selection == 4) { //刪除裝飾欄道具
            dsd = 400;
            var avail = "";
            for (var i = 0; i < 96; i++) {
                if (cm.getInventory(4).getItem(i) != null) {
                    avail += "#L" + cm.getInventory(4).getItem(i).getItemId() + "# #z" + cm.getInventory(4).getItem(i).getItemId() + "# #i" + cm.getInventory(4).getItem(i).getItemId() + ":##l\r\n";
                }
                slot.push(i);
            }
            cm.sendSimple(dsa + "#b請選擇需要刪除的道具:\r\n#b" + avail);

        } else if (selection == 5) { //刪除特殊欄道具
            dsd = 400;
            var avail = "";
            for (var i = 0; i < 96; i++) {
                if (cm.getInventory(5).getItem(i) != null) {
                    avail += "#L" + cm.getInventory(5).getItem(i).getItemId() + "# #z" + cm.getInventory(5).getItem(i).getItemId() + "# #i" + cm.getInventory(5).getItem(i).getItemId() + ":##l\r\n";
                }
                slot.push(i);
            }
            cm.sendSimple(dsa + "#b請選擇需要刪除的道具:\r\n#b" + avail);










        } else if (status == 2) {//刪除道具 
            itemss = selection;
            if (dsd == 100) {
                var shul = cm.getPlayer().getItemQuantity(itemss);
                if (cm.getMeso() < 0) {
                    cm.sendOk("你沒有足夠的楓幣,刪除道具需要收取手續費50萬楓幣。");
                } else {
                    cm.gainMeso(-500000);
                    cm.gainItem(itemss, -1);
                    cm.sendOk(dsa + "我已經將您背包裡的 #i" + itemss + ":#從你的背包清理！");
                }
              status = -1;
            }
            
        
            
            if (dsd == 400) {
                var shul = cm.getPlayer().getItemQuantity(itemss);
                if (cm.getMeso() < 0) {
                    cm.sendOk("你沒有足夠的楓幣,刪除道具需要收取手續費50萬楓幣。");
                } else {
                    cm.gainMeso(-500000);
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

