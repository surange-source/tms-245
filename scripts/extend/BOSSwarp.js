/*  This is mada by Kent    
 *  This source is made by Funms Team
 *  @Author Kent 
 */

var a = 0;
var selects;
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var BossList = Array(
Array(0, "巴洛古", 65, 105100100, 0, true),
Array(1, "炎魔", 50, 211042300, 1, true),
Array(14, "烏勒斯", 100, 970072200, 0, true),
Array(10, "梅格耐斯", 115, 401053002, 2, true),
Array(3, "希拉", 120, 262000000, 0, true),
Array(21, "卡翁", 180, 221030900, 0, true),
Array(22, "拉圖斯", 115, 220080000, 0, true),
Array(4, "比艾樂", 125, 105200000, 0, true),
Array(5, "斑斑", 125, 105200000, 0, true),
Array(6, "血腥皇后", 125, 105200000, 0, true),
Array(7, "貝倫", 125, 105200000, 0, true),
Array(8, "凡雷恩", 125, 211070000, 0, true),
Array(2, "闇黑龍王", 130, 240040700, 0, true),
Array(9, "阿卡伊農", 140, 272000000, 0, true),
Array(11, "皮卡啾", 160, 270040000, 0, true),
Array(12, "西格諾斯", 140, 271040000, 0, true),
Array(13, "史烏", 190, 350060300, 0, true),
Array(15, "戴米安", 190, 105300303, 0, true),
Array(29, "守護天使綠水靈", 190, 160000000, 0, false),
Array(19, "露希妲", 220, 450003600 /*450004000*/, 0, true),
Array(23, "威爾", 235, 450007240, 0, true),
Array(26, "戴斯克", 245, 450009301, 0, true),
Array(24, "真‧希拉", 250, 450011990, 0, true),
Array(27, "頓凱爾", 255, 450012200, 0, true),
Array(25, "黑魔法師", 255, 450012500, 0, true),
Array(28, "受選的賽蓮", 265, 410000670, 0, false),
Array(17, "森蘭丸", 120, 807300100, 0, true),
Array(18, "濃姬", 140, 811000999, 0, true),
Array(16, "培羅德", 180, 863010000, 0, true),
Array(-1, "艾畢奈亞", 115, 300030300, 0, true),
Array(-1, "六手邪神", 140, 252030000, 0, true),
Array(-1, "天狗", 160, 800026000, 0, true),
Array(-1, "桃樂絲", 210, 992000000, 0, true)
);

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
            var text = head + "為了更方便的遊戲，在這裡可以傳送到BOSS的傳送點。\r\n";
            for (var i = 0; i < BossList.length; i++) {
                var allow = BossList[i][5] && cm.getLevel() >= BossList[i][2];
                text += "#L" + i + "# ";
                if (BossList[i][0] >= 0) {
                    text += "#fUI/UIWindow2.img/UserList/Main/Boss/BossList/" + BossList[i][0] + "/Icon/" + (allow ? "normal" : "disabled") + "/0#";
                }
                if (!allow) {
                    text += "#fcFF808080#";
                } else {
                    text += "#e";
                }
                text += BossList[i][1] + " Lv." + BossList[i][2];
                if (!allow) {
                    text += "#k";
                } else {
                    text += "#n";
                }
                text += "\r\n";
            }
            cm.sendSimple(text);
        } else if (a == 1) {
            selects = selection;
            if (!BossList[selects][5]) {
                cm.sendOk("這個副本暫時未開放，敬請期待。");
                a -= 2;
                return;
            }
            if (BossList[selects][3] == cm.getMapId()) {
                cm.sendOk("你已經在目標地圖。");
                a -= 2;
                return;
            }
            if (cm.getLevel() < BossList[selects][2]) {
                cm.sendOk("確認等級是否能進入。");
                a -= 2;
                return;
            }
            cm.sendYesNo(head + "你現在想出發到" + BossList[selects][1] + "嗎？");
        } else if (a == 2) {
            if (BossList[selects][0] >= 0 || 992000000 == BossList[selects][3]) {
                cm.saveLocation("BPReturn");
            }
            cm.warp(BossList[selects][3], BossList[selects][4]);
            cm.dispose();
        }
    }
}