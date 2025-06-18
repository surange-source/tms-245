var status = 0;

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
            cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好!想選擇什麼樣的系列任務:\r\n#r#L1##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#系列任務簡介#l\r\n\r\n   #k#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#里程：#r"+cm.getPlayerPoints()+"#k 點  #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#活力值：#r"+cm.getPlayerEnergy()+"#k 點 \r\n   #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#今天在線：#r"+cm.getOnlineTime()+"#k 分鐘#b\r\n\r\n#fUI/UIWindow2.img/QuestGuide/Button/WorldMapQuestToggle/normal/0#\r\n#L2##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[系列-神木村]闇黑龍王洞穴#l");
        } else if (status == 1) {
            if (selection == 1) {
            cm.sendOk("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好,歡迎來到系列任務簡介:\r\n  通過系列任務活動可以獲得大量遊戲道具,在這裡讓\r\n  你總是意想不到的意外,任務簡單-困難模式有趣有樂.殺\r\n  戮 挑戰 冒險 極品 這裡的任務應有盡有,趕快行動起來吧!\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/basic#\r\n#v3010070#椅子 #v2049134#卷軸 #v5062002#方塊  #v1332225#裝備 #v1102453#點裝\r\n\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：所有系列任務24點重置。\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：系列任務每天輪換,更新不同的系列副本。");
                        cm.dispose();
            } else if (selection == 2) {
                cm.dispose();
                cm.openNpc(2400022,"shenmu4"); //闇黑龍王洞穴
            }
       }
      }
}