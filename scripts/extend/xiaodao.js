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
            cm.sendYesNo("#d女皇西格諾斯手下部下眾多,如今需要勇敢的冒險家前往消滅他們,眾多將領等待消滅，共 #r20#k #d波怪物。#k\r\n#e#d評分 #bB#k#n #r(每人將獲得 1 個#t2431716# 1 個#t5062002#)\r\n#e#d評分 #bA#k#n #r(每人將獲得 3 個#t2431716# 3 個#t5062002#)\r\n#e#d評分 #bF#k#n #r(每人將獲得 5 個#t2431716# 5 個#t5062002#)\r\n#e#d評分 #bS#k#n#r (每人將獲得 10 個#t2431716# 10 個#t5062002#)\r\n#r#e注意事項#k#n：該副本怪物血量較多，建議多人組隊消滅。\r\n#e#r副本要求#k#n：#b建議180級以上，自身HP大於10萬。#k\r\n#r#e副本提示#n#k：如果中途掉線都是可以重新開始不算次數的\r\n如果你今天領取過獎勵後,再進入是不能再領取獎勵的");
        } else if (status == 1) {
         if (cm.getLevel() <= 179) {
cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list1#\r\n\r\n你好像還不具備以下條件。我不能送你們進入。\r\n\r\n\r\n- #e等級需求#n：180級以上");
cm.dispose();
}
/*else if (cm.getHour() != 12 && cm.getHour() != 13 && cm.getHour() != 14 &&cm.getHour() != 20 && cm.getHour() != 22 &&cm.getHour() != 21){
cm.sendOk("時間沒到,小試牛刀場地暫未準備好。"); 
cm.dispose();
}*/
else if (cm.getParty() == null) {
cm.sendOk("#e#r你好像還沒有一個隊伍,我是不能送你進去的."); 
cm.dispose();
}
else if(!cm.isLeader()){
cm.sendOk("#e#r請隊長來跟我談話.");
cm.dispose();
}
 else if (cm.getMap(940021000).getCharactersSize() > 0) { // Not Party Leader
cm.sendOk("有人在挑戰此副本，請稍等一會，或者換其它線嘗試一下！..");
cm.dispose();
}
else if (cm.getParty().getMembers().size() < 1){
cm.sendOk("至少有 #r3#k 名隊員"); 
cm.dispose();
}
else if (cm.getPQLog("szsl") >= 1){
cm.sendOk("您已經進入過。"); 
cm.dispose();
}
else if (cm.getEventCount("szsl") >= 1){
cm.sendOk("您已經進入過。"); 
cm.dispose();
}else{
var em = cm.getEventManager("szsl");
if (em == null) {
cm.sendOk("出錯啦,請聯繫GM.");
cm.dispose();
}else{
var party = cm.getParty().getMembers();//獲取整個隊伍角色信息
var it = party.iterator();
var next = true;
em.startInstance(cm.getParty(), cm.getChar().getMap());
}
cm.worldSpouseMessage(0x19, "『小試牛刀』" + " : " + "恭喜" + cm.getChar().getName() + ",和他的隊友開始了小試牛刀，祝他取得好的成績");
//cm.sendServerNotice(7, "『神之試練』" + " : " + "玩家 " + cm.getChar().getName() + " 和他的隊友開始了神之試煉，祝他取得好的成績");
cm.dispose(); 
                }
        }
    }
}
