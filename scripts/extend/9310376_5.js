/* 絕版樂豆點商店 衣服*/

var status = -1;
var itemList = Array(
Array(1042158, 5000),
Array(1052225, 5000),
Array(1052306, 5000),
Array(1042188, 5000),
Array(1052901, 5000),
Array(1042092, 5000),
Array(1042153, 5000),
Array(1042036, 5000),
Array(1042037, 5000),
Array(1042357, 5000),
Array(1052916, 5000),
Array(1042349, 5000),
Array(1052626, 5000),
Array(1051414, 5000),
Array(1051385, 5000),
Array(1050314, 5000),
Array(1042330, 5000),
Array(1052605, 5000),
Array(1042314, 5000),
Array(1042320, 5000),
Array(1041114, 5000),
Array(1042278, 5000),
Array(1052709, 5000),
Array(1052657, 5000),
Array(1051366, 5000),
Array(1052727, 4500),
Array(1050310, 4500),
Array(1042159, 5000),
Array(1042285, 5000),
Array(1042275, 5000),
Array(1052656, 5000),
Array(1051366, 4000),
Array(1052550, 4000),
Array(1042240, 4000),
Array(1042315, 4000),
Array(1050319, 4000),
Array(1042316, 4000),
Array(1051390, 4000),
Array(1051392, 4000),
Array(1050299, 5000),
Array(1052782, 5000),
Array(1052781, 5000),
Array(1042214, 5000),
Array(1042311, 4000),
Array(1042321, 4000),
Array(1042312, 4000),
Array(1042313, 4000),
Array(1050152, 1000), //水兵服(男)
Array(1051180, 1000), //水兵服(女)
Array(1042104, 1000), //小綠葉T恤
Array(1042105, 1000), //小紅葉T恤
Array(1052224, 1000), //草莓baby裝
Array(1042142, 3000), //彩虹條背心
Array(1041142, 2000), //巨星蛋糕吊帶
Array(1052200, 1000), //羅麗粉色娃娃套服
Array(1052061, 2000), //巴西足球服No.9
Array(1052059, 2000), //法國足球服No.14
Array(1051131, 3000), //聖誕女孩子服
Array(1051152, 1000), //玫瑰紅晚宴裙
Array(1050210, 1000),
Array(1051280, 1000),
Array(1052426, 1000),
Array(1051278, 1000),
Array(1050229, 1000),
Array(1050227, 1000),
Array(1051235, 1000),
Array(1052201, 1000),
Array(1050232, 1000),
Array(1051282, 1000),
Array(1052425, 1000),
Array(1052412, 1000),
Array(1052455, 1000),
Array(1052503, 1000),
Array(1051261, 1000),
Array(1050230, 1000),
Array(1050231, 1000),
Array(1051149, 1000),
Array(1051192, 1000),
Array(1051255, 1000),
Array(1051256, 1000),
Array(1042238, 1500),
Array(1040192, 1500),
Array(1041194, 1500),
Array(1042265, 1500),
Array(1042241, 1500),
Array(1052593, 1500),
Array(1052536, 1500),
Array(1050312, 1500),
Array(1042236, 1500),
Array(1042240, 1500),
Array(1052661, 1500),
Array(1042277, 1500),
Array(1042204, 1500),
Array(1042198, 1500),
Array(1050119, 1500),
Array(1042263, 1500)
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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，請選擇您希望購買的道具：";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1]  + "#k樂豆點#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("您是否購買#i" + selectedItem + ":# #b#t" + selectedItem + "##k 需要 #r" + selectedCost + "#k 樂豆點？");
        } else {
            cm.sendOk("出現錯誤...");
            cm.dispose();
        }
    } else if (status == 2) {
        if (selectedCost <= 0 || selectedItem <= 0) {
            cm.sendOk("購買道具出現錯誤...");
            cm.dispose();
            return;
        }
        if (cm.getPlayer().getCSPoints(1) >= selectedCost) {
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "樂豆點商店", 3, true);
            if (gachaponItem != -1) {
                cm.gainNX( - selectedCost );
                cm.sendOk("恭喜您成功購買#i" + selectedItem + ":# #b#t" + selectedItem + "##k。");
            } else {
                cm.sendOk("購買失敗，請您確認在背包所有欄目窗口中是否有一格以上的空間。");
            }
        } else {
            cm.sendOk("您沒有那麼多樂豆點。\r\n\r\n購買#i" + selectedItem + ":# #b#t" + selectedItem + "##k 需要 #r" + selectedCost + "#k 樂豆點。");
        }
        cm.dispose();
    }
}