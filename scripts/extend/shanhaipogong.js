var status = 0;
var typed=0;
var random1 = java.lang.Math.floor(Math.random() * 1000 + 1);
var random2 = java.lang.Math.floor(Math.random() * 3000 + 1);

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
            cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，我是傷害上限突破系統:\r\n#r#L1##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#傷害上限突破簡介#l\r\n\r\n   #k#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#樂豆點：#r"+cm.getNX(1)+"#k 點  #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#楓點：#r"+cm.getNX(2)+"#k 點 \r\n   #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#今天在線：#r"+cm.getGamePoints()+"#k 分鐘#b\r\n\r\n#fUI/UIWindow2.img/QuestGuide/Button/WorldMapQuestToggle/normal/0#\r\n#L2##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[武器]傷害上限突破-模式(1) (#k目前狀態：#r火爆內容#b)#l\r\n#L3##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[武器]傷害上限突破-模式(2) (#k目前狀態：#r火爆內容#b)#l");
        } else if (status == 1) {
            if (selection == 1) {
            cm.sendOk("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好,我是傷害上限突破系統簡介:\r\n  使用道具: 當前職業對應等級武器 \r\n  使用武器: 任何武器都可以傷害上限突破 \r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#通過日常活動任務有概率獲得.\r\n\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：每把武器最多追加1000萬傷害,超過後不予計算.");
                        cm.dispose();
            } else if (selection == 2) {
            if(cm.getPQLog("火種突破",1) <= 10000000){
            if(cm.haveItem(4033356, 5)){
            if (cm.changeLimitBreak(random1)) {
            for(var i = 0; i < random1; i++){
                cm.setPQLog("火種突破",1);
            }
                cm.gainItem(4033356,-5);
                    cm.sendOk("#b傷害上限突破成功.\r\n\r\n本次追加傷害為：#r"+ random1 +"#b.");
                cm.worldSpouseMessage(0x20,"[傷害突破] 玩家 "+ cm.getChar().getName() +" 使用 正義火種1 讓武器傷害上限突破成功 本次追加 "+ random1 +" 傷害值 。");
            }else{
                    cm.sendOk("#b突破失敗.\r\n系統為檢測到角色身上裝備武器.");
            }
                    cm.dispose();
            }else{
                    cm.sendOk("#b突破失敗.\r\n需要 5個 正義火種1 才可以突破.");
                    cm.dispose();
            }
            }else{
                    cm.sendOk("#b突破失敗.\r\n武器最高額外突破1000萬傷害.");
                    cm.dispose();
            }
            } else if (selection == 3) {
            if(cm.getPQLog("樂豆點突破1",1) <= 1000000){
            if(cm.haveItem(4000463, 5)){
            if (cm.changeLimitBreak(200000)) {
                cm.setPQLog("樂豆點突破1",1);
                cm.gainItem(4000463,-5);
                    cm.sendOk("#b傷害上限突破成功.\r\n\r\n本次追加傷害為：#r200000#b.");
                cm.worldSpouseMessage(0x20,"[傷害突破] 玩家 "+ cm.getChar().getName() +" 使用 中介幣 讓武器傷害上限突破成功 本次追加 200000 傷害值。");
            }else{
                    cm.sendOk("#b突破失敗.\r\n系統為檢測到角色身上裝備武器.");
            }
                    cm.dispose();
            }else{
                    cm.sendOk("#b突破失敗.\r\n需要 5個 中介幣 才可以突破.");
                    cm.dispose();
            }
            }else{
                    cm.sendOk("#b突破失敗.\r\n武器最高額外突破1000萬傷害.");
                    cm.dispose();
            }
            }
       }
      }
}