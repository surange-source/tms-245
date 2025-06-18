var status = 0;
var Q= "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var ca = java.util.Calendar.getInstance();
//var day = ca.get(java.util.Calendar.DATE);//獲取日
var time = new Date();
var day = time.getDay();
var typeEvent = "#g活動開啟中#k";
var List = Array(
            Array(Q+"[系列]【週一】弓箭手村(#d90~200級#k)",1,300),
            Array(Q+"[系列]【週二】納希沙漠(#d100~180級#k)",2,200),
            Array(Q+"[系列]【週三】武陵(#d110~210級#k)",3,400),
            Array(Q+"[系列]【週四】埃德爾斯坦(#d170~210級#k)",4,700),
            Array(Q+"[系列]【週五】馬加提亞(#d160~220級#k)",5,600),
            Array(Q+"[系列]【週六】玩具城(#d170~230級#k)",6,800),
            Array(Q+"[系列]【周天】神木村(#d200~240級#k)",7,100),//事件名稱、開始事件日期（周幾例如:0為週日）、打開特殊NPC的名字
            Array(Q+"[系列]【周天】時間神殿(#d210~250級#k)",7,900)
);
var ItemList = Array(
                    Array(1152120,1,2),
                    Array(1132211,1,8),
                    Array(1152121,1,3),
                    Array(1132212,1,10),
                    Array(1152122,1,5),
                    Array(1132213,1,15),
                    Array(1152123,1,10),
                    Array(1132214,1,20),
                    Array(1152124,1,30),
                    Array(1132215,1,30));
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
            var S = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
            var txt = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好!想選擇什麼樣的日常任務:\r\n   #k"+S+"目前里程：#r"+cm.getPlayerPoints()+"#k 點   "+S+"黑幣持有量:#r "+cm.getItemQuantity(4032766)+" #k個\r\n#r#L999#[系列任務簡介]#l  #r#L998#[黑幣兌換道具]#l  #r#L997#[領取黑幣]#l\r\n\r\n#fUI/UIWindow2.img/QuestGuide/Button/WorldMapQuestToggle/normal/0#\r\n";
            //cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好!想選擇什麼樣的日常任務:\r\n#r#L1##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#系列任務簡介#l\r\n\r\n   #k#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#里程：#r"+cm.getPlayerPoints()+"#k 點  #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#活力值：#r"+cm.getPlayerEnergy()+"#k 點 \r\n   #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#今天在線：#r"+cm.getGamePoints()+"#k 分鐘#b\r\n\r\n#fUI/UIWindow2.img/QuestGuide/Button/WorldMapQuestToggle/normal/0#\r\n#L2##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[系列]神木村       (#k目前狀態： "+typeEvent1+")#l\r\n#L3##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[系列]納希沙漠     (#k目前狀態： "+typeEvent2+")#l\r\n#L4##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[系列]弓箭手村       (#k目前狀態： "+typeEvent3+")#l\r\n#L5##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[系列]武陵         (#k目前狀態： "+typeEvent4+")#l\r\n#L6##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[系列]埃德爾斯坦   (#k目前狀態： "+typeEvent5+")#l\r\n#L7##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[系列]馬加提亞     (#k目前狀態： "+typeEvent6+")#l\r\n#L8##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[系列]玩具城       (#k目前狀態： "+typeEvent7+")#l\r\n#L9##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[系列]時間神殿     (#k目前狀態： "+typeEvent8+")#l");
            for (var i =0;i<List.length ;i++ ){
                if (cm.getPlayer().isGm()){
                    typeEvent = "#g活動進行中#k";
                }else{
                for (var a =0;a<List[i][1].length ;a++ ){
                    if (day==List[i][1][a]){
                        typeEvent = "#g活動進行中#k";
                        break;
                    }else{
                        typeEvent = "#r活動關閉中#k";
                    }
                }
                }
                txt += "#L"+i+"##b"+List[i][0]+"#k  (#k狀態："+typeEvent+")#l\r\n";
            }
            cm.sendSimple(txt);
        
        } else if (status == 1) {
            if (selection == 999) {
                cm.sendOk("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好,歡迎來到系列任務簡介:\r\n  通過系列任務活動可以獲得大量遊戲道具,在這裡讓\r\n  你總是意想不到的意外,任務簡單-困難模式有趣有樂.殺\r\n  戮 挑戰 冒險 極品 這裡的任務應有盡有,趕快行動起來吧!\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/basic#\r\n#v3010070#椅子 #v2049134#卷軸 #v5062002#方塊  #v1332225#裝備 #v1102453#點裝\r\n\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：所有系列任務24點重置。\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：系列任務每週輪換,更新不同的系列副本。\r\n"+Q+"註：每個帳號每天通關5次後獲得一個黑幣");
                cm.dispose();
            }else if(selection == 998){
                var TXT = "以下是可兌換物品\r\n"
                for (var i = 0;i<ItemList.length ;i++ ){
                    TXT += "#L"+i+"##v"+ItemList[i][0]+"##z"+ItemList[i][0]+"# #rX"+ItemList[i][1]+"#k需要黑幣[#r"+ItemList[i][2]+"#k]個\r\n"
                }
                cm.sendSimple(TXT);
            }else if(selection == 997){
                if(cm.getEventCount("亂入得黑幣")==5&&cm.getEventCount("已經亂入得黑幣")==0){
                    if(cm.canHold(4032766,1)){
                        cm.setEventCount("已經亂入得黑幣");
                        cm.gainItem(4032766,1);
                        cm.worldSpouseMessage(0x20,"『亂入副本』" + ":" + "恭喜玩家 " + cm.getChar().getName() + " 換取1個黑幣");
                        cm.dispose();
                    }else{
                        cm.sendOk("請確認背包有空格");
                        cm.dispose();
                    }
                }else{
                    cm.sendOk("當前次數:#r["+cm.getEventCount("亂入得黑幣")+"] #k 還差 #r["+(5-cm.getEventCount("亂入得黑幣"))+"]#k才能兌換一個黑幣,一天一次兌換黑幣哦");
                }
                cm.dispose();
            }else{
                if (cm.getPlayer().isGm()){
                    typeEvent = "#g活動進行中#k";
                }else{
                    if (day==List[selection][1]){
                        typeEvent = true;
                    }else{
                        typeEvent = false;
                    }
                }
                if (typeEvent){
                    cm.dispose();
                    cm.openNpc(2400022,List[selection][2]); 
                    return;
                }else{
                    cm.sendOk("#b"+List[selection][0]+"\r\n#r活動開啟日期為每週周 "+List[selection][1]+" 開放。");
                    cm.dispose();
                }
            }
        } else if (status == 2) {
            if(cm.haveItem(4032766,ItemList[selection][2])){
                if(cm.canHold(ItemList[selection][0],ItemList[selection][1])){
                cm.gainItem(ItemList[selection][0],ItemList[selection][1]);
                cm.gainItem(4032766,-ItemList[selection][2]);
                cm.sendOk("兌換成功");
                cm.worldSpouseMessage(0x20,"『亂入副本』" + ":" + "恭喜玩家 " + cm.getChar().getName() + " 在瑞恩處兌換了 "+cm.getItemName(ItemList[selection][0])+" 又添神裝!");
                cm.dispose();
                }else{
                        cm.sendOk("請確認背包有空格");
                        cm.dispose();
                    }
            }else{
                cm.sendOk("你還差"+(ItemList[selection][2]-cm.getItemQuantity(4032766))+"個幣才能兌換");
                cm.dispose();
            }
        }
     }
}