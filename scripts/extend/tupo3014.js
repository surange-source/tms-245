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
            cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，我是傷害上限突破系統:\r\n#r#L1##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#傷害上限突破簡介#l\r\n\r\n   #k#e隨機突破#n：#r需要1個#k #v4000463#  #k#e固定突破#n：#r需要10個#k #v4000463# \r\n #b\r\n#fUI/UIWindow2.img/QuestGuide/Button/WorldMapQuestToggle/normal/0#\r\n#L2##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[武器]傷害上限突破-隨機突破 (#k目前狀態：#r火爆內容#b)#l\r\n#L3##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[武器]傷害上限突破-固定突破 (#k目前狀態：#r火爆內容#b)#l");
        } else if (status == 1) {
            if (selection == 1) {
            cm.sendOk("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好,我是傷害上限突破系統簡介:\r\n  使用道具: 當前職業對應等級武器 \r\n  使用武器: 任何武器都可以傷害上限突破 \r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#通過日常活動任務有概率獲得.\r\n\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：每把武器最多追加1E傷害,超過後不予計算.");
                        cm.dispose();
            } else if (selection == 2) {
            if(cm.getPQLog("隨機突破",1) <= 100000000){
            if(cm.haveItem(4000463, 1)){
            if (cm.changeLimitBreak(random1)) {
            for(var i = 0; i < random1; i++){
                cm.setPQLog("隨機突破",1);
            }
                cm.gainItem(4000463,-1);
                    cm.sendOk("#b傷害上限突破成功.\r\n\r\n本次追加傷害為：#r"+ random1 +"#b.");
                cm.worldSpouseMessage(0x20,"[傷害突破] 玩家 "+ cm.getChar().getName() +" 使用 隨機突破 讓武器傷害上限突破成功 本次追加 "+ random1 +" 傷害值 。");
            }else{
                    cm.sendOk("#b突破失敗.\r\n系統為檢測到角色身上裝備武器.");
            }
                    cm.dispose();
            }else{
                    cm.sendOk("#b突破失敗.\r\n需要 1個 黃金楓葉#v4000463# 才可以突破.");
                    cm.dispose();
            }
            }else{
                    cm.sendOk("#b突破失敗.\r\n武器最高額外突破1E傷害.");
                    cm.dispose();
            }
            } else if (selection == 3) {
            if(cm.getPQLog("固定突破",1) <= 200000){
            if(cm.haveItem(4000463, 10)){
            if (cm.changeLimitBreak(200000)) {
                cm.setPQLog("固定突破",1);
                cm.gainItem(4000463,-10);
                    cm.sendOk("#b傷害上限突破成功.\r\n\r\n本次追加傷害為：#r1000000#b.");
                cm.worldSpouseMessage(0x20,"[傷害突破] 玩家 "+ cm.getChar().getName() +" 使用 固定突破 讓武器傷害上限突破成功 本次追加 20萬 傷害值。");
            }else{
                    cm.sendOk("#b突破失敗.\r\n系統為檢測到角色身上裝備武器.");
            }
                    cm.dispose();
            }else{
                    cm.sendOk("#b突破失敗.\r\n需要 10個 黃金楓葉#v4000463# 才可以突破.");
                    cm.dispose();
            }
            }else{
                    cm.sendOk("#b突破失敗.\r\n武器最高額外突破1E傷害.");
                    cm.dispose();
            }
            }
       }
      }
}