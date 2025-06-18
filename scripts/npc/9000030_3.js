/* 黃色禮物盒特殊兌換 */

var status = -1;
var itemId = 4031505; //黃色禮物盒 - 裝有聖誕節禮物的黃色的禮物盒
var itemList = Array(
Array(2049116, 1), //強化混沌卷軸
Array(5064000, 1), //防爆卷軸
Array(5064100, 1), //保護卷軸
Array(5064300, 1), //卷軸防護卷軸
Array(2511041, 1), //旭日腰帶製作配方    130級
Array(2511058, 1), //旭日吊墜製作配方    130級
Array(2511080, 1), //旭日戒指製作配方    130級
Array(2511102, 1), //旭日耳環製作配方    130級
Array(2511113, 1), //無雙耳環製作配方    130級
Array(2511114, 1), //無雙吊墜製作配方    130級
Array(1202000, 1), //冰凍殭屍-圖騰
Array(1202001, 1), //火焰殭屍-圖騰
Array(1202002, 1), //中毒殭屍-圖騰
Array(1202003, 1), //觸電殭屍-圖騰
Array(1402063, 1), //櫻花傘
Array(1442039, 1), //凍凍魚
Array(1092022, 1), //調色板盾牌
Array(1322051, 1), //七夕
Array(1402044, 1), //南瓜燈籠
Array(1432039, 1), //釣魚竿
Array(1332053, 1), //野外燒烤串
Array(1432037, 1), //楓葉大將旗
Array(1302061, 1), //蔓籐鞭子
Array(1432046, 1), //聖誕樹手杖
Array(1302087, 1), //火炬
Array(1402029, 1), //鬼刺狼牙棒
Array(1372033, 1), //聖賢短杖
Array(1332032, 1), //聖誕樹
Array(1432013, 1), //南瓜槍
Array(1422011, 1), //酒瓶
Array(1302128, 1), //火柴
Array(1302129, 1), //叉子
Array(1302035, 1), //楓葉旗
Array(1302058, 1), //楓之谷傘
Array(1302067, 1), //楓葉慶典旗
Array(1302080, 1), //七彩霓虹燈泡
Array(1432015, 1), //紅色滑雪板
Array(1432016, 1), //橙色滑雪板
Array(1432017, 1), //綠色滑雪板
Array(1432018, 1), //藍色滑雪板
Array(1003011, 1), //月餅帽（新）
Array(1422030, 1), //粉紅海豹抱枕
Array(1422031, 1), //藍色海豹抱枕
Array(1302024, 1), //廢報紙卷
Array(1302037, 1)  //小號
);
var selectedItem = -1;
var selectedCost = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status >= 0) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        var selStr = "請選擇您要兌換的道具：\r\n";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1] + "#k 個#v" + itemId + "##l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("您是否兌換#i" + selectedItem + ":# #b#t" + selectedItem + "##k 需要 #r" + selectedCost + "#k 個#v" + itemId + "##l？");
        } else {
            cm.sendOk("出現錯誤...");
            cm.dispose();
        }
    } else if (status == 2) {
        if (selectedItem <= 0 || selectedCost <= 0) {
            cm.sendOk("購買道具出現錯誤...");
            cm.dispose();
            return;
        }
        if (cm.haveItem(itemId, selectedCost)) {
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "黃色禮物盒", 3);
            if (gachaponItem != -1) {
                cm.gainItem(itemId, -selectedCost);
                cm.sendOk("恭喜您成功兌換#i" + selectedItem + ":# #b#t" + selectedItem + "##k。");
            } else {
                cm.sendOk("兌換獎勵失敗，請您確認在背包所有欄目窗口中是否有一格以上的空間。");
            }
        } else {
            cm.sendOk("您沒有這麼多物品。\r\n\r\n兌換#i" + selectedItem + ":# #b#t" + selectedItem + "##k 需要 #r" + selectedCost + "#k 個#v" + itemId + "##l。");
        }
        cm.dispose();
    }
}
