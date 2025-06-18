/*
 *天天愛養成
 */
var status = 0; 
var cwzt = "";
var cwjd = "";

function start() { 
    status = -1; 
    action(1, 0, 0); 
} 

function action(mode, type, selection) { 

    if(cm.getPQLog("寵物總計成長值",1) >=0 && cm.getPQLog("寵物總計成長值",1) <= 100){
    cwjd = "第1階段(孵化期)";
    cwzt = "#fUI/UIWindow2.img/raise/18/0#";
    } else if(cm.getPQLog("寵物總計成長值",1) >=101 && cm.getPQLog("寵物總計成長值",1) <= 200){
    cwjd = "第2階段(破殼期)";
    cwzt = "#fUI/UIWindow2.img/raise/18/1#";
    } else if(cm.getPQLog("寵物總計成長值",1) >=201 && cm.getPQLog("寵物總計成長值",1) <= 300){
    cwjd = "第3階段(幼崽期)";
    cwzt = "#fUI/UIWindow2.img/raise/18/2#";
    } else if(cm.getPQLog("寵物總計成長值",1) >=301 && cm.getPQLog("寵物總計成長值",1) <= 400){
    cwjd = "第4階段(幼年期)";
    cwzt = "#fUI/UIWindow2.img/raise/18/3#";
    } else if(cm.getPQLog("寵物總計成長值",1) >=401 && cm.getPQLog("寵物總計成長值",1) <= 500){
    cwjd = "5第階段(成長期)";
    cwzt = "#fUI/UIWindow2.img/raise/19/1#";
    } else if(cm.getPQLog("寵物總計成長值",1) >=501 && cm.getPQLog("寵物總計成長值",1) <= 600){
    cwjd = "第6階段(成熟期)";
    cwzt = "#fUI/UIWindow2.img/raise/19/2#";
    } else {
    cwjd = "第7階段(完全體)";
    cwzt = "#fUI/UIWindow2.img/raise/19/3#";
    }

    if (mode == -1) { 
        cm.dispose(); 
    } else if (mode == 0) { 
        cm.dispose(); 
    } else { 
        if (mode == 1) 
            status++; 
        else 
            status--; 
        if (status == 0) { 
        abb = 1;
        cm.sendGetText("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好,[養成]小夥伴的養成:\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#小夥伴成長狀態："+ cwzt +" "+ cwjd +"\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#1個中介幣=1點成長值\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#目前小夥伴成長值：(#r"+cm.getPQLog("寵物總計成長值",1)+" #k/#r 800#k) 點\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：請輸入飼養小夥伴成長值點數(總值超過800後果自負)：");
        } else if (status == 1) { 
    if(cm.getText() < 1 || cm.getText() > 800){
        cm.playerMessage(1,"輸入的數字不能小於1或大於800。");
        cm.dispose();
    } else {
        cm.sendYesNo("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好,[養成]小夥伴的養成:\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#使用#r" + cm.getText() + "#k中介\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/reward#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#飼養#r" + cm.getText() + "#k點成長值"); 
        }
        } else if (status == 2) { 
    if(cm.getPQLog("寵物總計成長值",1) < 800){
    if (cm.haveItem(4000463,cm.getText())) { 
       cm.gainItem(4000463, -cm.getText());
    for(var i = 1; i <= cm.getText(); i++){
       cm.setPQLog("寵物總計成長值",1);
    }
       cm.worldSpouseMessage(0x14,"[小夥伴養成] 玩家 "+ cm.getChar().getName() +" 為他(她)的小夥伴飼養了 "+ cm.getText() +" 點成長值.(草泥馬)高興的嗷嗷叫!");
           cm.sendOk("飼養成功,請注意查看.");
           cm.dispose();
        } else {
           cm.sendOk("您沒有足夠的中介幣,請多加努力.");
           cm.dispose();
     }
    } else {
       cm.sendOk("小夥伴已經養成完全體滿成長值狀態,無法繼續成長。\r\n#r已經可以使用#b [養成]小夥伴的奇葩威力 #r它會給你帶來驚喜。");
           cm.dispose();
    }
      } 
   }
}