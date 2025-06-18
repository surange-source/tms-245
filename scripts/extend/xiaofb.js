var status = 0;
var ca = java.util.Calendar.getInstance();
var day = ca.get(java.util.Calendar.DATE);//獲取日
var day1 = ca.get(java.util.Calendar.YEAR);//獲取日
var typeEvent1 = "";
var typeEvent2 = "";
var typeEvent3 = "";
var typeEvent4 = "";
var typeEvent5 = "";
var typeEvent6 = "";
var typeEvent7 = "";
var typeEvent8 = "";
var typeEvent9 = "";
var typeEventd = "";

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (cm.getEventCount("鏡世界副本") < 3) {
        typeEvent1 = "#g可以進入#k";
    } else {
        typeEvent1 = "#r次數用完#k";
    }
    if (cm.getEventCount("鏡世界副本") < 3) {
        typeEvent2 = "#g可以進入#k";
    } else {
        typeEvent2 = "#r次數用完#k";
    }
    if (cm.getEventCount("鏡世界副本") < 3) {
        typeEvent3 = "#g可以進入#k";
    } else {
        typeEvent3 = "#r次數用完#k";
    }
    if (cm.getEventCount("鏡世界副本") < 3) {
        typeEvent4 = "#g可以進入#k";
    } else {
        typeEvent4 = "#r次數用完#k";
    }
    if (cm.getEventCount("鏡世界副本") < 3) {
        typeEvent5 = "#g可以進入#k";
    } else {
        typeEvent5 = "#r次數用完#k";
    }
    if (cm.getEventCount("鏡世界副本") < 3) {
        typeEvent6 = "#g可以進入#k";
    } else {
        typeEvent6 = "#r次數用完#k";
    }
    if (cm.getEventCount("鏡世界副本") < 3) {
        typeEvent7 = "#g可以進入#k";
    } else {
        typeEvent7 = "#r次數用完#k";
    }
    if (cm.getEventCount("鏡世界副本") < 3) {
        typeEvent8 = "#g可以進入#k";
    } else {
        typeEvent8 = "#r次數用完#k";
    }
    if (cm.getEventCount("鏡世界副本") < 3) {
        typeEvent9 = "#g可以進入#k";
    } else {
        typeEvent9 = "#r次數用完#k";
    }
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
        var sycs = 14 - cm.getPQLog("鏡世界副本") + 1;
            cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好!想選擇什麼樣的日常任務:\r\n#r    目前無限次數#k   #k \r\n\r\n#fUI/UIWindow2.img/QuestGuide/Button/WorldMapQuestToggle/normal/0#[困難級-推薦後期]\r\n#L2##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[鏡世界]繼承者們  (#k目前狀態：超難，請不要去送死)#l\r\n#L8##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[鏡世界]軍長           (#k目前狀態： "+typeEvent7+")#l\r\n#L9##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[鏡世界]復仇者         (#k目前狀態： "+typeEvent8+")#l\r\n\r\n#fUI/UIWindow2.img/QuestGuide/Button/WorldMapQuestToggle/normal/0#[普通級-推薦單人]\r\n#L6##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[鏡世界]埃德爾斯坦   (#k目前狀態： "+typeEvent5+")#l\r\n#L3##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[鏡世界]納希沙漠     (#k目前狀態： "+typeEvent2+")#l\r\n#L4##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[鏡世界]弓箭手村       (#k目前狀態： "+typeEvent3+")#l\r\n#L5##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[鏡世界]武陵         (#k目前狀態： "+typeEvent4+")#l\r\n#L7##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[鏡世界]馬加提亞     (#k目前狀態： "+typeEvent6+")#l\r\n#l");
        } else if (status == 1) {
            if (selection == 1) {
            cm.sendOk("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好,歡迎來到系列任務簡介:\r\n  通過系列任務活動可以獲得大量遊戲道具,在這裡讓\r\n  你總是意想不到的意外,任務簡單-困難模式有趣有樂.殺\r\n  戮 挑戰 冒險 極品 這裡的任務應有盡有,趕快行動起來吧!\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/basic#\r\n#v3010070#椅子 #v2049134#卷軸 #v5062002#方塊  #v1332225#裝備 #v1102453#點裝\r\n\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：所有系列任務24點重置。\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：系列任務每天輪換,更新不同的系列副本。");
                        cm.dispose();
            } else if (selection == 2) {
            if (cm.getEventCount("鏡世界副本") < 3) {
                cm.dispose();
                cm.openNpc(2400022,"shenmu"); //神木村
            } else {
                cm.sendOk("#k您的次數已經用完，您今天已通關今日通關#r "+ cm.getPQLog("鏡世界副本") +"#k 次 ");
                cm.dispose();
            }
            } else if (selection == 3) {
            if (cm.getEventCount("鏡世界副本") < 3) {
                cm.dispose();
                cm.openNpc(2400022,200); //納希沙漠
            } else {
                cm.sendOk("#k您的次數已經用完，您今天已通關今日通關#r "+ cm.getPQLog("鏡世界副本") +"#k 次 ");
                cm.dispose();
            }
            } else if (selection == 4) {
            if (cm.getEventCount("鏡世界副本") < 3) {
                cm.dispose();
                cm.openNpc(2400022,300); //弓箭手村
            } else {
                cm.sendOk("#k您的次數已經用完，您今天已通關今日通關#r "+ cm.getPQLog("鏡世界副本") +"#k 次 ");
                cm.dispose();
            }
            } else if (selection == 5) {
            if (cm.getEventCount("鏡世界副本") < 3) {
                cm.dispose();
                cm.openNpc(2400022,400); //武陵
            } else {
                cm.sendOk("#k您的次數已經用完，您今天已通關今日通關#r "+ cm.getPQLog("鏡世界副本") +"#k 次 ");
                cm.dispose();
            }
            } else if (selection == 6) {
            if (cm.getEventCount("鏡世界副本") < 3) {
                cm.dispose();
                cm.openNpc(2400022,600); //埃德爾斯坦
            } else {
                cm.sendOk("#k您的次數已經用完，您今天已通關今日通關#r "+ cm.getPQLog("鏡世界副本") +"#k 次 ");
                cm.dispose();
            }
            } else if (selection == 7) {
            if (cm.getEventCount("鏡世界副本") < 3) {
                cm.dispose();
                cm.openNpc(2400022,700); //馬加提亞
            } else {
                cm.sendOk("#k您的次數已經用完，您今天已通關今日通關#r "+ cm.getPQLog("鏡世界副本") +"#k 次 ");
                cm.dispose();
            }
            } else if (selection == 8) {
            if (cm.getEventCount("鏡世界副本") < 3) {
                cm.dispose();
                cm.openNpc(2400022,800); //玩具城
            } else {
                cm.sendOk("#k您的次數已經用完，您今天已通關今日通關#r "+ cm.getPQLog("鏡世界副本") +"#k 次 ");
                cm.dispose();
            }
            } else if (selection == 9) {
            if (cm.getEventCount("鏡世界副本") < 3) {
                cm.dispose();
                cm.openNpc(2400022,900); //時間神殿
            } else {
                cm.sendOk("#k您的次數已經用完，您今天已通關今日通關#r "+ cm.getPQLog("鏡世界副本") +"#k 次 ");
                cm.dispose();
            }
            } else if (selection == 10) {
            if (cm.getEventCount("鏡世界副本") < 3) {
                cm.dispose();
                cm.openNpc(2400022,1100); //海上貿易
            } else {
                cm.sendOk("#k您的次數已經用完，您今天已通關今日通關#r "+ cm.getPQLog("鏡世界副本") +"#k 次 ");
                cm.dispose();
            }
            }
       }
      }
}