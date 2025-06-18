/*
 * 名稱：楓幣服務NPC
 * 作者：故事
 * 版本：1.0
 
 
 */

var status = -1;
var beauty = 0;
var tosend = 0;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            if (status == 0) {
                cm.sendOk("歡迎下次在來。");
                cm.dispose();
            }
            status--;
        }
        if (status == 0) {
            var zak = 3 - cm.getBossLog("ZAK");
            var zyms = "";
            zyms = "#e<#v3991051# #v3991050# #v3991038# #v3991044#-副本重置>#n\r\n選擇需要重置的副本吧。\r\n您當前楓幣額度:" + cm.getMeso() + "。\r\n";
            zyms += "#L0##b#v3010127#普通殘暴炎魔 #k已進行" + cm.getBossLog("ZAK") + "次 剩餘:" + zak + "次 當前地圖:"+ cm.getPlayerCount(280030100) +"人  #l\r\n";
            zyms += "#L1##b#v3010127#進階殘暴炎魔 #k已進行" + cm.getBossLog("ZAK") + "次 剩餘:" + zak + "次 當前地圖:"+ cm.getPlayerCount(280030001) +"人  #l\r\n";
            zyms += "#L2##b#v3010128#普通黑龍 #k已進行" + cm.getBossLog("ZAK") + "次 剩餘:" + zak + "次 當前地圖:"+ cm.getPlayerCount(280030100) +"人  #l\r\n";
            zyms += "#L3##b#v3010128#進階黑龍 #k已進行" + cm.getBossLog("ZAK") + "次 剩餘:" + zak + "次 當前地圖:"+ cm.getPlayerCount(280030100) +"人  #l\r\n";
            //zyms += "#L3##g楓幣現金商店#l\r\n";
            //zyms += "#L4##r楓幣重置組隊任務進行次數(New)#l\r\n";
            cm.sendSimple(zyms);
        } else if (status == 1) {

            if (selection == 0) {
                var zak = 3 - cm.getBossLog("ZAK");
                var chaozak = 2 - cm.getBossLog("ChaosZak");
                var heilong = 3 - cm.getBossLog("Horntail");
                var chaoheilong = 2 - cm.getBossLog("ChaosHT");
                var shiziwang = 2 - cm.getBossLog("VonLeon");
                var wangxingren = 2 - cm.getBossLog("alien");
                var pb = 2 - cm.getBossLog("PinkBean");
                var hdpb = 2 - cm.getBossLog("ChaosPinkBean");
                var xila = 2 - cm.getBossLog("希拉遠征隊");
                var nvhuang = 2 - cm.getBossLog("西格諾斯遠征隊");
                var text = "";
                text = "#e<殘暴炎魔遠征隊>#n\r\n每日可申請:3次  已進行:" + cm.getBossLog("ZAK") + " 次 剩餘申請次數:" + zak + " 次\r\n";
                text += "#e<進階殘暴炎魔遠征隊>#n\r\n每日可申請:2次  已進行:" + cm.getBossLog("ChaosZak") + " 次 剩餘申請次數:" + chaozak + " 次\r\n";
                text += "#e<闇黑龍王遠征隊>#n\r\n每日可申請:3次  已進行:" + cm.getBossLog("Horntail") + " 次 剩餘申請次數:" + heilong + " 次\r\n";
                text += "#e<進階闇黑龍王遠征隊>#n\r\n每日可申請:2次  已進行:" + cm.getBossLog("ChaosHT") + " 次 剩餘申請次數:" + chaoheilong + " 次\r\n";
                text += "#e<獅子王遠征隊>#n\r\n每日可申請:2次  已進行:" + cm.getBossLog("VonLeon") + " 次 剩餘申請次數:" + shiziwang + " 次\r\n";
                text += "#e<外星人鑽機遠征隊>#n\r\n每日可申請:2次  已進行:" + cm.getBossLog("alien") + " 次 剩餘申請次數:" + wangxingren + " 次\r\n";
                text += "#e<品客賓遠征隊>#n\r\n每日可申請:2次  已進行:" + cm.getBossLog("PinkBean") + " 次 剩餘申請次數:" + pb + " 次\r\n";
                text += "#e<混沌品客賓遠征隊>#n\r\n每日可申請:2次  已進行:" + cm.getBossLog("ChaosPinkBean") + " 次 剩餘申請次數:" + hdpb + " 次\r\n";
                text += "#e<希拉遠征隊>#n\r\n每日可申請:2次  已進行:" + cm.getBossLog("希拉遠征隊") + " 次 剩餘申請次數:" + xila + " 次\r\n";
                text += "#e<西格諾斯遠征隊>#n\r\n每日可申請:2次  已進行:" + cm.getBossLog("希拉斯遠征隊") + " 次 剩餘申請次數:" + nvhuang + " 次\r\n";
                cm.sendOk(text);
                status = -1;

            } else if (selection == 1) {
                var zak = 3 - cm.getBossLog("ZAK");
                var zyms = "";
                zyms = "#e<#v3991051# #v3991050# #v3991038# #v3991044#-副本重置>#n\r\n選擇需要重置的副本吧。\r\n您當前楓幣額度:" + cm.getMeso() + "。\r\n";
                zyms += "#L10##b#v3010127#普通殘暴炎魔 #k已進行" + cm.getBossLog("ZAK") + "次 #g剩餘:" + zak + "次 當前地圖:0人  #l\r\n";
                zyms += "#L11##b#v3010127#進階殘暴炎魔 #g剩餘挑戰次數:" + zak + "  #l\r\n";
                zyms += "#L12##b#v3010128#普通黑龍 #g剩餘挑戰次數:" + zak + "  #l\r\n";
                zyms += "#L13##b#v3010128#進階黑龍 #g剩餘挑戰次數:" + zak + "  #l\r\n";
                cm.sendSimple(zyms);
                //beauty = 1;

            } else if (selection == 2) {
                if (cm.getPlayer().getJob() != 434) {
                    cm.sendOk("只有影武者職業才可以進行此項目。");
                } else if (cm.getMeso() < 1500000) {
                    cm.sendOk("進行當前項目需要支付1500000楓幣才可以進行，你沒有足夠的楓幣。");
                } else if (cm.getSpace(1) < 2) {
                    cm.sendOk("背包裝備欄有2個空間才可以領取。");
                } else if (cm.getBossLog("影武面巾", 1) < 1) {
                    cm.gainMeso(-1500000);
                    cm.setBossLog("影武面巾", 1);
                    cm.gainItem(1012191, 1);
                    cm.sendOk("領取成功,祝您遊戲愉快。");
                } else {
                    cm.sendOk("您已經領取過了。");
                }
                status = -1;
            } else if (selection == 3) {
                cm.dispose();
                cm.openNpc(9010060, 2);

            } else if (selection == 4) {
                cm.dispose();
                cm.sendOk("正在開發此項目。");
            }
        } else if (status == 2) {
            if (beauty == 1) {
                var zak = 3 - cm.getBossLog("ZAK");
                zyms += "#L10##b重置普通殘暴炎魔挑戰次數#l\r\n";
                zyms += "#L11##b重置進階殘暴炎魔挑戰次數#l\r\n";
                zyms += "#L12##b重置普通黑龍挑戰次數#l\r\n";
                zyms += "#L13##b重置進階黑龍挑戰次數#l\r\n";
                cm.sendSimple(zyms);


            }
            status = -1;
        } else {
            cm.dispose();
        }

    }
}

