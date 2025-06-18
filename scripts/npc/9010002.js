
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
            zyms = "#fMob/1210102.img/move/0##fMob/1210102.img/move/0##b追憶 - MS#fMob/1210102.img/move/0##fMob/1210102.img/move/0#\r\n#k達到指定VIP等級可以領取獎勵哦。\r\n\r\nVIP等級: #r" + cm.getVipLevel() + "\r\n";
            zyms += "#L1##b領取VIP1獎勵#l    #L2##k查看獎勵清單#l \r\n";
            zyms += "#L3##b領取VIP2獎勵#l    #L4##k查看獎勵清單#l \r\n";
            zyms += "#L5##b領取VIP3獎勵#l    #L6##k查看獎勵清單#l \r\n";
            zyms += "#L7##b領取VIP4級勵#l    #L8##k查看獎勵清單#l \r\n";
            zyms += "#L9##b領取VIP5獎勵#l    #L10##k查看獎勵清單#l \r\n";
            zyms += "#L11##r領取VIP6獎勵#l    #L12##k查看獎勵清單#l \r\n";
            zyms += "#L13##r領取VIP7獎勵#l    #L14##k查看獎勵清單#l \r\n";
            cm.sendSimple(zyms);



        } else if (selection == 1) {
            if  (cm.getVipLevel() < 1) {
                cm.sendOk("只有VIP1以上的玩家才可以領取獎勵。");
            } else if (cm.getSpace(1) < 1 || cm.getSpace(5) < 3) {
                cm.sendOk("領取失敗。\r\n\r\n背包裝備欄至少需要1個空位,特殊欄3個以上的空位才可以領取。");
            } else if (cm.getBossLog("VIP1獎勵", 1) < 1) {
                cm.setBossLog("VIP1獎勵", 1);
                cm.gainItem(1112446, 1);//老公老婆戒指
                cm.gainItem(5390013, 10);//白銀VIP喇叭
                cm.gainItemPeriod(5062000, 8,1);//神奇方塊
                cm.gainItemPeriod(5062002, 5,1);//高級神奇方塊
                cm.sendOk("領取成功,祝您遊戲開心愉快。");
                cm.worldSpouseMessage(0x20, "玩家 " + cm.getChar().getName() + " 領取VIP1等級獎勵,獲得了專屬禮包。");
            } else {
                cm.sendOk("當前送禮項目只可以領取一次,你已經領取過了!");
            }
            cm.dispose();


        } else if (selection == 2) {
            cm.dispose();
            cm.sendOk("#e<#v3991051# #v3991050# #v3991038# #v3991044#-VIP等級送禮>#n\r\nVIP1獎勵清單如下：\r\n#v1112446#x1 #v5390013#x10 #v5062000#x8 #v5062002#x5");

        } else if (selection == 3) {
           if  (cm.getVipLevel() < 2) {
                cm.sendOk("只有VIP2以上的玩家才可以領取獎勵。");
            } else if (cm.getSpace(1) < 1 || cm.getSpace(5) < 3) {
                cm.sendOk("領取失敗。\r\n\r\n背包裝備欄至少需要1個空位,特殊欄3個以上的空位才可以領取。");
            } else if (cm.getBossLog("VIP2獎勵", 1) < 1) {
                cm.setBossLog("VIP2獎勵", 1);
                cm.gainItem(5390013, 15);//白銀VIP喇叭
                cm.gainItemPeriod(5062000, 10,1);//神奇方塊
                cm.gainItemPeriod(5062002, 8,1);//高級神奇方塊
                cm.sendOk("領取成功,祝您遊戲開心愉快。");
                cm.worldSpouseMessage(0x20, "玩家 " + cm.getChar().getName() + " 領取VIP2等級獎勵,獲得了專屬禮包。");
            } else {
                cm.sendOk("當前送禮項目只可以領取一次,你已經領取過了!");
            }
            cm.dispose();

        } else if (selection == 4) { 
            cm.dispose();
            cm.sendOk("#e<#v3991051# #v3991050# #v3991038# #v3991044#-VIP等級送禮>#n\r\nVIP2獎勵清單如下：\r\n#v5390013#x15 #v5062000#x10 #v5062002#x8");



        } else if (selection == 5) { 
           if  (cm.getVipLevel() < 3) {
                cm.sendOk("只有VIP3以上的玩家才可以領取獎勵。");
            } else if (cm.getSpace(2) < 1 || cm.getSpace(5) < 4) {
                cm.sendOk("領取失敗。\r\n\r\n背包消耗欄至少需要1個空位,特殊欄4個以上的空位才可以領取。");
            } else if (cm.getBossLog("VIP3獎勵", 1) < 1) {
                cm.setBossLog("VIP3獎勵", 1);
                cm.gainItem(2340000, 5);//祝福卷軸
                cm.gainItem(5390013, 20);//白銀VIP喇叭
                cm.gainItem(5064000, 2);//防爆卷軸
                cm.gainItemPeriod(5062000, 15,1);//神奇方塊
                cm.gainItemPeriod(5062002, 10,1);//高級神奇方塊
                cm.sendOk("領取成功,祝您遊戲開心愉快。");
                cm.worldSpouseMessage(0x20, "玩家 " + cm.getChar().getName() + " 領取VIP3等級獎勵,獲得了專屬禮包。");
            } else {
                cm.sendOk("當前送禮項目只可以領取一次,你已經領取過了!");
            }
            cm.dispose();

        } else if (selection == 6) { 
            cm.dispose();
            cm.sendOk("#e<#v3991051# #v3991050# #v3991038# #v3991044#-VIP等級送禮>#n\r\nVIP3獎勵清單如下：\r\n#v5390013#x20 #v2340000#x5 #v5064000#x2 #v5062000#x15 #v5062002#x10");


        } else if (selection == 7) { 
           if  (cm.getVipLevel() < 4) {
                cm.sendOk("只有VIP4以上的玩家才可以領取獎勵。");
            } else if (cm.getSpace(2) < 1 || cm.getSpace(5) < 4) {
                cm.sendOk("領取失敗。\r\n\r\n背包消耗欄至少需要1個空位,特殊欄4個以上的空位才可以領取。");
            } else if (cm.getBossLog("VIP4獎勵", 1) < 1) {
                cm.setBossLog("VIP4獎勵", 1);
                cm.gainItem(2340000, 10);//祝福卷軸
                cm.gainItem(5390012, 20);//黃金VIP喇叭
                cm.gainItem(5064000, 3);//防爆卷軸
                cm.gainItemPeriod(5062000, 20,1);//神奇方塊
                cm.gainItemPeriod(5062002, 15,1);//高級神奇方塊
                cm.sendOk("領取成功,祝您遊戲開心愉快。");
                cm.worldSpouseMessage(0x20, "玩家 " + cm.getChar().getName() + " 領取VIP4等級獎勵,獲得了專屬禮包。");
            } else {
                cm.sendOk("當前送禮項目只可以領取一次,你已經領取過了!");
            }
            cm.dispose();

        } else if (selection == 8) { 
            cm.dispose();
            cm.sendOk("#e<#v3991051# #v3991050# #v3991038# #v3991044#-VIP等級送禮>#n\r\nVIP4獎勵清單如下：\r\n#v5390012#x20 #v2340000#x10 #v5064000#x3 #v5062000#x20 #v5062002#x15");

        } else if (selection == 9) { 
            if  (cm.getVipLevel() < 5) {
                cm.sendOk("只有VIP5以上的玩家才可以領取獎勵。");
            } else if (cm.getSpace(2) < 1 || cm.getSpace(5) < 4) {
                cm.sendOk("領取失敗。\r\n\r\n背包消耗欄至少需要1個空位,特殊欄4個以上的空位才可以領取。");
            } else if (cm.getBossLog("VIP5獎勵", 1) < 1) {
                cm.setBossLog("VIP5獎勵", 1);
                cm.gainItem(2340000, 15);//祝福卷軸
                cm.gainItem(5390012, 50);//黃金VIP喇叭
                cm.gainItem(5064000, 5);//防爆卷軸
                cm.gainItemPeriod(5062500, 10,1);//大師神奇方塊
                cm.gainItemPeriod(5062006, 15,1);//白金神奇方塊
                cm.sendOk("領取成功,祝您遊戲開心愉快。");
                cm.worldSpouseMessage(0x20, "玩家 " + cm.getChar().getName() + " 領取VIP5等級獎勵,獲得了專屬禮包。");
            } else {
                cm.sendOk("當前送禮項目只可以領取一次,你已經領取過了!");
            }
            cm.dispose();

        } else if (selection == 10) { 
            cm.dispose();
            cm.sendOk("#e<#v3991051# #v3991050# #v3991038# #v3991044#-VIP等級送禮>#n\r\nVIP5獎勵清單如下：\r\n#v5390012#x50 #v2340000#x15 #v5064000#x5 #v5062500#x10 #v5062006#x15");


        } else if (selection == 11) { //255等級獎勵
            if  (cm.getVipLevel() < 6) {
                cm.sendOk("只有VIP6以上的玩家才可以領取獎勵。");
            } else if (cm.getSpace(2) < 1 || cm.getSpace(5) < 4) {
                cm.sendOk("領取失敗。\r\n\r\n背包消耗欄至少需要1個空位,特殊欄4個以上的空位才可以領取。");
            } else if (cm.getBossLog("VIP6獎勵", 1) < 1) {
                cm.setBossLog("VIP6獎勵", 1);
                cm.gainItem(2340000, 20);//祝福卷軸
                cm.gainItem(5390011, 20);//鑽石VIP喇叭
                cm.gainItem(5064000, 7);//防爆卷軸
                cm.gainItemPeriod(5062500, 15,1);//大師神奇方塊
                cm.gainItemPeriod(5062006, 20,1);//白金神奇方塊
                cm.sendOk("領取成功,祝您遊戲開心愉快。");
                cm.worldSpouseMessage(0x20, "玩家 " + cm.getChar().getName() + " 領取VIP6等級獎勵,獲得了專屬禮包。");
            } else {
                cm.sendOk("當前送禮項目只可以領取一次,你已經領取過了!");
            }
            cm.dispose();

        } else if (selection == 12) { 
            cm.dispose();
            cm.sendOk("#e<#v3991051# #v3991050# #v3991038# #v3991044#-VIP等級送禮>#n\r\nVIP6獎勵清單如下：\r\n#v5390011#x20 #v2340000#x20 #v5064000#x7 #v5062500#x15 #v5062006#x20");
        
        } else if (selection == 13) { //255等級獎勵
            if  (cm.getVipLevel() < 7) {
                cm.sendOk("只有VIP7以上的玩家才可以領取獎勵。");
            } else if (cm.getSpace(2) < 1 || cm.getSpace(5) < 4) {
                cm.sendOk("領取失敗。\r\n\r\n背包消耗欄至少需要1個空位,特殊欄4個以上的空位才可以領取。");
            } else if (cm.getBossLog("VIP7獎勵", 1) < 1) {
                cm.setBossLog("VIP7獎勵", 1);
                cm.gainItem(2340000, 30);//祝福卷軸
                cm.gainItem(5390011, 50);//鑽石VIP喇叭
                cm.gainItem(5064000, 10);//防爆卷軸
                cm.gainItemPeriod(5062500, 30,1);//大師神奇方塊
                cm.gainItemPeriod(5062006, 50,1);//白金神奇方塊
                cm.sendOk("領取成功,祝您遊戲開心愉快。");
                cm.worldSpouseMessage(0x20, "玩家 " + cm.getChar().getName() + " 領取VIP7等級獎勵,獲得了專屬禮包。");
            } else {
                cm.sendOk("當前送禮項目只可以領取一次,你已經領取過了!");
            }
            cm.dispose();

        } else if (selection == 14) { 
            cm.dispose();
            cm.sendOk("#e<#v3991051# #v3991050# #v3991038# #v3991044#-VIP等級送禮>#n\r\nVIP7獎勵清單如下：\r\n#v5390011#x50 #v2340000#x30 #v5064000#x10 #v5062500#x30 #v5062006#x50");

        }
    }
}
