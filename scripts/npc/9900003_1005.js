/* 洗裝備潛能 */

var status = -1;
var potList = Array(
Array(40603, "攻擊BOSS時傷害：+40%", 1),
Array(40292, "無視怪物40%的防禦率", 1),
Array(42051, "攻擊力：+12%", 1),
Array(60001, "總傷害：+12% (不能修改附加潛能)", 1),
Array(60002, "所有屬性：+20% (不能修改附加潛能)", 1),
Array(60007, "MaxHP : +10% (不能修改附加潛能)", 1),
Array(60008, "攻擊力/魔力：+10% (不能修改附加潛能)", 1),
Array(40055, "爆擊率 12%", 1));
var potId = -1; //潛能的ID
var depict = ""; //潛能的描述
var points = -1; //每次的價格
var potline = 4; //修改的潛能是第幾條
var oldEquip;
var newEquip;
var count = 1; //定義洗到那個屬性的次數
var slot = 1; //定義需要修改的裝備在背包的位置
var potline = 4; //定義需要修改的是第幾條潛能 [1-3] 為普通 [4-6] 為附加
var Nx = -1;

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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好!想選擇什麼樣的潛能:\r\n#k#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#擁有綠色蠟筆: #r" + cm.itemQuantity(3994420) + "#v3994420##k\r\n\r\n#fUI/UIWindow2.img/QuestGuide/Button/WorldMapQuestToggle/normal/0#";
        for (var i = 0; i < potList.length; i++) {
            selStr += "\r\n#L" + i + "##b#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#" + potList[i][1] + "#k  (消耗： #r" + potList[i][2] + "#k #k 綠色蠟筆)#l";
        }
        cm.sendSimple(selStr + " \r\n ");
    } else if (status == 1) {
        oldEquip = cm.getEquipBySlot(slot);
        if (oldEquip == null || oldEquip.getState(false) != 0x14) { //oldEquip.getState() != 0x14 檢測裝備普通潛能是否 SS
            cm.sendOk("出現錯誤: \r\n背包欄第1個位置的裝備為空 或者 裝備的潛能等級不為 SS");
            cm.dispose();
            return; //出現錯誤直接返回 不執行下面的操作 這個必須注意
        }
        var pot = potList[selection];
        if (pot != null) {
            potId = pot[0];
            depict = pot[1];
            points = pot[2];
            cm.sendYesNo("您是否要將#b裝備欄第一格裝備\r\n第一條附加潛能屬性(不會改變其它潛能屬性)#k\r\n一鍵洗潛能屬性為 #b" + depict + "#k？");
        } else {
            cm.sendOk("出現錯誤...");
            cm.dispose();
        }
    } else if (status == 2) {
    if(cm.itemQuantity(3994420) < 1) {
        cm.sendOk("請確認背包中是否存在#v3994420##t3994420#");
        cm.dispose();
        return;
    }
        if (potId <= 0 || depict == "" || points <= 0) {
            cm.sendOk("購買道具出現錯誤...");
            cm.dispose();
            return;
        }
            cm.sendYesNo("洗出潛能屬性為 #b" + depict + "#k 用了 #b" + count + "#k 次。\r\n本次保留該屬性需要:#r 1 #k 綠色蠟筆 是否保留該屬性？");
    } else if (status == 3) {
        newEquip = cm.getEquipBySlot(slot);
        if (oldEquip == newEquip) { //這個地方還需要檢測樂豆點數量
                if (cm.changePotential(slot, potline, potId, true)) { //[裝備位置] [潛能位置] [潛能ID] [是否公告]
                    //todo 扣樂豆點
            cm.gainItem(3994420,-1);
                    cm.sendOk("恭喜您成功洗出潛能屬性....");
            cm.getPlayer().saveToDB(false, false);
            cm.dispose();
            return;
                } else {
                    cm.sendOk("出現錯誤...");
            cm.dispose();
                }
        } else {
            cm.sendOk("出現錯誤...");
        cm.dispose();
        }
    }
}