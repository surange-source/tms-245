var status = 0;
var typed=0;

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
            cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，想選擇什麼樣的一鍵潛能:\r\n#r#L1##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#免費一鍵潛能簡介#l\r\n\r\n #k  #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#今天在線：#r"+cm.getGamePoints()+"#k 分鐘#b\r\n\r\n#fUI/UIWindow2.img/QuestGuide/Button/WorldMapQuestToggle/normal/0#\r\n#L2##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[一鍵潛能]裝備潛能第1條屬性  (#r火爆內容#b)#v3994417##l\r\n#L3##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[一鍵潛能]裝備潛能第2條屬性  (#r火爆內容#b)#v3994418##l\r\n#L4##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[一鍵潛能]裝備潛能第3條屬性  (#r火爆內容#b)#v3994419##l\r\n#L5##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[一鍵潛能]附加潛能第1條屬性  (#r火爆內容#b)#v3994420##l\r\n#L6##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[一鍵潛能]附加潛能第2條屬性  (#r火爆內容#b)#v3994421##l\r\n#L7##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[一鍵潛能]附加潛能第3條屬性  (#r火爆內容#b)#v3994422##l");
        } else if (status == 1) {
            if (selection == 1) {
            cm.sendOk("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好,歡迎來到免費一鍵潛能簡介:\r\n  免費一鍵潛能 能直接修改裝備潛能1,2,3 附加潛能1,2,3條\r\n  屬性\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##b通過活動專欄獲得機會.\r\n\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：免費一鍵潛能活動限時開放.");
                        cm.dispose();
            } else if (selection == 2) {
            typed=3;
                        cm.dispose();
                cm.openNpc(9900003,1002);
            } else if (selection == 3) {
            typed=4;
            cm.dispose();
                cm.openNpc(9900003,1003);
            } else if (selection == 4) {
            typed=5;
            cm.dispose();
                cm.openNpc(9900003,1004);
            } else if (selection == 5) {
            typed=6;
            cm.dispose();
                cm.openNpc(9900003,1005);
            } else if (selection == 6) {
            typed=6;
            cm.dispose();
                cm.openNpc(9900003,1006);
            } else if (selection == 7) {
            typed=6;
            cm.dispose();
                cm.openNpc(9900003,1007);
            }
       }
      }
}