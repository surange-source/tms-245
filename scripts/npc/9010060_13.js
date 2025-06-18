/*
 活躍系統
 */

var status = 0;
var typed = 0;

function start() {
    status = -1;
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
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，想選擇什麼樣的活力值兌換:\r\n#r#L1##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#活力值兌換簡介#l\r\n\r\n   #k#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#里程：#r" + cm.getPlayerPoints() + "#k 點  #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#活力值：#r" + cm.getPlayerEnergy() + "#k 點 \r\n   #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#今天在線：#r" + cm.getGamePoints() + "#k 分鐘#b\r\n\r\n#fUI/UIWindow2.img/QuestGuide/Button/WorldMapQuestToggle/normal/0#\r\n#L2##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[活力值]兌換卷軸        (#k目前狀態： #r推薦內容#b)#l\r\n#L3##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[活力值]兌換飾品        (#k目前狀態： #r推薦內容#b)#l\r\n#L4##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[活力值]兌換裝備        (#k目前狀態： #r推薦內容#b)#l\r\n#L5##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[活力值]兌換副手        (#k目前狀態： #r推薦內容#b)#l");
        } else if (status == 1) {
            if (selection == 1) {
                cm.sendOk("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好,歡迎來到活力值簡介:\r\n  活力值可以兌換 武器 飾品 卷軸 副手 心動了嗎?\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#通過天天日常[組隊]任務.\r\n\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：活力值通過[日常]組隊任務快速獲得.");
                cm.dispose();
            } else if (selection == 2) {
                typed = 3;
                cm.dispose();
                cm.openNpc(9900001, 201);
            } else if (selection == 3) {
                typed = 4;
                cm.dispose();
                cm.openNpc(9900001, 204);
            } else if (selection == 4) {
                typed = 5;
                cm.dispose();
                cm.openNpc(9900001, 203);
            } else if (selection == 5) {
                typed = 6;
                cm.dispose();
                cm.openNpc(9900001, 202);
            }
        }
    }
}
