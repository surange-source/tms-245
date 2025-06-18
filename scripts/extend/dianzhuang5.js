/* 絕版樂豆點商店 衣服*/

var status = -1;
var itemList = Array(

Array(1051434, 55000),
Array(1050364, 55000),

Array(1052950, 100000),
Array(1052951, 100000),
Array(1042350, 100000),
Array(1040194, 100000),
Array(1041196, 100000),
//======================
Array(1042164, 100000),
Array(1042204, 55000),
Array(1042198, 55000),
Array(1052626, 50000),
Array(1051414, 50000),
Array(1051385, 50000),
Array(1050314, 50000),
Array(1042330, 50000),
Array(1052605, 50000),
Array(1042314, 50000),
Array(1042320, 50000),
Array(1041114, 50000),
Array(1042278, 50000),
Array(1052709, 50000),
Array(1052657, 50000),
Array(1051366, 50000),
Array(1052727, 45000),
Array(1050310, 45000),
Array(1042159, 50000),
Array(1042285, 50000),
Array(1042275, 50000),
Array(1052656, 50000),
Array(1051366, 40000),
//Array(1052550, 40000),
Array(1042240, 40000),
Array(1042315, 40000),
Array(1050319, 40000),
Array(1042316, 40000),
Array(1051390, 40000),
Array(1051392, 40000),
Array(1050299, 50000),
Array(1052782, 50000),
Array(1052781, 50000),
Array(1042214, 50000),
Array(1042311, 40000),
Array(1042321, 40000),
Array(1042312, 40000),
Array(1042313, 40000),
Array(1050152, 40000), //水兵服(男)
Array(1051180, 40000), //水兵服(女)
Array(1042104, 40000), //小綠葉T恤
Array(1042105, 50000), //小紅葉T恤
Array(1052224, 50000), //草莓baby裝
Array(1042142, 50000), //彩虹條背心
Array(1041142, 50000), //巨星蛋糕吊帶
Array(1052200, 50000), //羅麗粉色娃娃套服
Array(1052061, 50000), //巴西足球服No.9
Array(1052059, 50000), //法國足球服No.14
Array(1051131, 50000), //聖誕女孩子服
Array(1051152, 50000), //玫瑰紅晚宴裙
Array(1050210, 40000),
Array(1051280, 40000),
Array(1052426, 40000),
Array(1051278, 40000),
Array(1050229, 40000),
Array(1050227, 30000),
Array(1051235, 30000),
Array(1052201, 30000),
Array(1050232, 30000),
Array(1051282, 30000),
Array(1052425, 30000),
Array(1052412, 30000),
Array(1052455, 30000),
Array(1052503, 30000),
Array(1051261, 30000),
Array(1050230, 30000),
Array(1050231, 30000),
Array(1051149, 30000),
Array(1051192, 30000),
Array(1051255, 30000),
Array(1051256, 30000),
Array(1042238, 35000),
Array(1040192, 35000),
Array(1041194, 35000),
Array(1042265, 35000),
//Array(1042241, 35000),
Array(1052593, 35000),
//Array(1052536, 35000),
Array(1050312, 35000),
Array(1042236, 35000),
Array(1042240, 35000),
//Array(1052661, 35000),
Array(1042277, 35000),
Array(1050119, 35000),
Array(1042263, 35000)
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
        if (cm.haveItem(4220098,1)){
            selectedCost = 1 ;
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