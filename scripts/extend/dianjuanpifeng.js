/* 絕版樂豆點商店披風 */

var status = -1;
var itemList = Array(
Array(1102143, 100000),
Array(1102150, 100000),
Array(1102151, 100000),
Array(1102154, 100000),
Array(1102160, 100000),
Array(1102215, 100000),
Array(1102250, 100000),
Array(1100004, 80000),
Array(1101000, 80000),
Array(1102199, 80000),
Array(1102508, 80000),
Array(1102868, 80000),
Array(1102929, 80000),
Array(1102932, 80000),
Array(1102933, 80000),
Array(1102963, 200000),
Array(1102766, 200000),
Array(1102723, 300000),
Array(1102724, 300000),
Array(1102466, 80000),
Array(1102900, 80000),
Array(1102812, 80000),
Array(1102572, 80000),
Array(1102309, 50000),
Array(1102308, 50000),
Array(1102307, 50000),
Array(1102757, 50000),
Array(1102709, 50000),
Array(1102699, 50000),
Array(5010101, 50000),
Array(1102376, 50000),
Array(1102548, 50000),
Array(1102587, 50000),
Array(1102511, 50000),
Array(1102683, 50000),
Array(1102705, 50000),
Array(1102550, 50000),
Array(1102620, 50000),
Array(1102583, 40000),
Array(1102676, 45000),
Array(1102644, 50000),
Array(1102726, 50000),
Array(1102142, 40000),
Array(1102697, 40000),
Array(1102688, 40000),
Array(1102669, 40000),
Array(1102225, 30000), //嫦娥披風
Array(1102217, 30000), //九尾披風
Array(1102157, 30000), //傀儡枷鎖
Array(1102503, 10000),
Array(1102380, 14000),
Array(1102385, 14000),
Array(1102386, 14000),
Array(1102238, 14000),
Array(1102245, 14000),
Array(1102285, 14000),
Array(1102286, 14000),
Array(1102287, 14000),
Array(1102270, 14000),
Array(1102273, 14000),
Array(1102288, 14000),
Array(1102253, 14000),
Array(1102298, 14000),
Array(1102299, 14000),
Array(1102297, 14000),
Array(1102319, 14000),
Array(1102272, 14000),
Array(1102323, 14000),
Array(1102324, 14000),
Array(1102349, 14000),
Array(1102325, 14000),
Array(1102326, 14000),
Array(1102338, 14000),
Array(1102350, 14000),
Array(1102374, 14000),
Array(1102353, 14000),
Array(1102357, 14000),
Array(1102593, 15000),
Array(1102564, 15000),
Array(1102615, 15000),
Array(1102453, 50000), 
Array(1102450, 50000), 
Array(1102451, 50000), 
Array(1102452, 50000), 
Array(1102511, 50000), 
Array(1102385, 50000), 
Array(1102386, 50000), 
Array(1102487, 50000)
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