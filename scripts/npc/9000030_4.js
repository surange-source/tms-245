/* 綠色禮物盒特殊兌換 */

var status = -1;
var itemId = 4031506; //綠色禮物盒 - 裝有聖誕節禮物的綠色的禮物盒
var itemList = Array(
Array(1402037, 1), //龍背刃
//Array(1402014, 1), //溫度計
Array(1092049, 1), //熱情劍盾
Array(1022097, 1), //龍眼鏡 - 含有龍的力量的眼鏡。
Array(1152054, 1), //完成的護肩
Array(1202004, 1), //詛咒殭屍-圖騰
Array(2511118, 1), //烈日吊墜製作配方    130級
Array(2511119, 1), //烈日戒指製作配方    130級
Array(2511120, 1), //烈日腰帶製作配方    130級
Array(2511121, 1), //烈日耳環製作配方    130級
Array(2511122, 1), //烈日臉飾製作配方    130級
Array(2511123, 2), //白天使的祝福製作配方    90級
Array(2511112, 2), //西格諾斯的鑽石戒指製作配方    140級
//Array(2040807, 1), //手套攻擊詛咒卷軸 - 成功率100%，物理攻擊力+3
Array(2043003, 1), //單手劍攻擊必成卷 - 為單手劍增加攻擊力屬性。\n成功率：100%，物理攻擊力+5，力量+3，物理防禦力+10
Array(2043103, 1), //單手斧攻擊必成卷 - 為單手斧增加攻擊力屬性。\n成功率：100%，物理攻擊力+5，力量+3，物理防禦力+10
Array(2043203, 1), //單手棍攻擊必成卷 - 為單手棍增加攻擊力屬性。\n成功率：100%，物理攻擊力+5，力量+3，物理防禦力+10
//Array(2043303, 1), //短劍攻擊必成卷 - 為短劍增加攻擊力屬性。\n成功率：100%，物理攻擊力+5，運氣+3，物理防禦力+10
//Array(2043703, 1), //短杖攻擊必成卷 - 為短杖增加魔力屬性。\n成功率：100%，魔法攻擊力+5，智力+3，魔法防禦力+10
//Array(2043803, 1), //長杖攻擊必成卷 - 為長杖增加魔力屬性。\n成功率：100%，魔法攻擊力+5，智力+3，魔法防禦力+10
//Array(2044003, 1), //雙手劍攻擊必成卷 - 為雙手劍增加攻擊力屬性。\n成功率：100%，物理攻擊力+5，力量+3，物理防禦力+10
Array(2044019, 1), //雙手劍魔力必成卷 - 成功率:100%, 魔法攻擊力+5, 智力+3,魔法防禦力+1 
Array(2044203, 1), //雙手棍攻擊必成卷 - 為雙手棍增加攻擊力屬性。\n成功率：100%，物理攻擊力+5，力量+3，物理防禦力+10
//Array(2044303, 1), //槍攻擊必成卷 - 為槍增加攻擊力屬性。\n成功率：100%，物理攻擊力+5，力量+3，物理防禦力+10
Array(2044403, 1), //矛攻擊必成卷 - 為矛增加攻擊力屬性。\n成功率：100%，物理攻擊力+5，力量+3，物理防禦力+10
//Array(2044503, 1), //弓攻擊必成卷 - 為弓增加攻擊力屬性。\n成功率：100%，物理攻擊力+5，命中值+40，敏捷+1
Array(2044603, 1), //弩攻擊必成卷 - 為弩增加攻擊力屬性。\n成功率：100%，物理攻擊力+5，命中值+40，敏捷+1
//Array(2044703, 1), //拳套攻擊必成卷 - 為拳套增加攻擊力屬性。\n成功率：100%，物理攻擊力+5，命中值+40，運氣+1
Array(2044815, 1), //指虎攻擊必成卷 - 成功率:100%, 物理攻擊力+5, 力量+3, 物理防禦力+1
//Array(2044908, 1), //火槍攻擊必成卷 - 成功率:100%, 物理攻擊力+5, 命中值+60, 敏捷+1
//Array(2040303, 1), //耳環智力必成卷 - 為耳飾增加智力屬性。\n成功率：100%，魔法攻擊力+5，智力+3，魔法防禦力+10
Array(2040506, 1), //全身盔甲敏捷必成卷 - 為全身盔甲增加敏捷屬性。\n成功率：100%，敏捷+5，命中值+45，移動速度+1
Array(2040710, 1) //鞋子跳躍必成卷 - 成功率:100%, 跳躍力+5, 敏捷+3,移動速度+1 
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
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "綠色禮物盒", 3);
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
