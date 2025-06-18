var status = 0;
var selStr;
var sel;
var selitem;
var aaa = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var bbb = "#fUI/UIWindow.img/Shop/meso#";
var vvv = "#fUI/UIWindow2.img/ValuePack/button/complete/0#";//領取完成

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
            selStr = "#r#e<家園保衛戰>#n#k.\r\n強大的黑魔法師來襲，請火速消滅它們!#b\r\n你目前擁有： #r" + cm.getPlayer().getCSPoints(1) + "#k #b樂豆點  進入一次扣除 #r500#k #b樂豆點\r\n#r簡單組隊模式：副本總時間 5 分鐘\r\n"; //\r\n#r困難單人模式：副本總時間 10 分鐘
            selStr+="#L2#" + aaa + " 什麼是家園保衛戰？#l\r\n";
            selStr+="#L3#" + aaa + " #r#z4310091##k#b抽取稀有椅子（每週更新）#l\r\n";
            selStr+="#L5#" + aaa + " #r#z4310091##k#b抽取高級裝備（每週更新）#b#l\r\n";
            selStr+="#L1#" + aaa + " 簡單模式（掉落#z4310091#）（扣3000楓點）#l\r\n";
            //selStr+="#L4#" + aaa + " 困難模式（掉落#z4310091#）（扣500樂豆點）#l\r\n";
            selStr+="#L7#" + aaa + " 簡單模式（組隊模式）（扣隊長5000楓點）#l\r\n";
            //selStr+="#L8#" + aaa + " 困難模式（組隊模式）（扣隊長1000樂豆點）#l";
            cm.sendSimple(selStr);
    } else if (status == 1) {
        sel=selection;
        if(sel==1){
              if (cm.getParty() == null) { // No Party
                    cm.sendOk("需要先#b開啟#k一個組隊,而且只能是你一個人~.zzzZZZZZ..");
                    cm.dispose();
                    return;
                } else if (!cm.isLeader()) { // Not Party Leader
                    cm.sendOk("請叫隊長跟我說話.");
                    cm.dispose();
                    return;
                } else if (cm.getMap(746000015).getCharactersSize() > 0) { // Not Party Leader
                    cm.sendOk("有人在挑戰此副本，請稍等一會，或者換其它線嘗試一下！..");
                    cm.dispose();
                    return;
                } else if (cm.getPlayer().getCSPoints(2) < 3000) { // Not Party Leader
                    cm.sendOk("你的楓點不足3000點，請足夠後再來");
                    cm.dispose();
                    return;
                } else {
                    var party = cm.getParty().getMembers();
                    if (party.size() > 1) {
                        cm.sendOk("#r對不起,為了徹底的測試你的能力,只能一人前往..");
                        cm.dispose();
                        return;
                    }
                    var em = cm.getEventManager("jysw");
                    if (em == null) {
                        cm.sendOk("暫未開放.");
                        cm.dispose();
                        return;
                    } else {
            em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 120);
                    cm.gainNX(2, -3000); //扣除樂豆點
                    cm.worldSpouseMessage(0x09, "『守衛家園』" + " : " + "玩家<" + cm.getChar().getName() + ">進入了守護地圖開始保護家園");
                        cm.dispose();
                    }
}
        } else if(sel==4){
              if (cm.getParty() == null) { // No Party
                    cm.sendOk("需要先#b開啟#k一個組隊,而且只能是你一個人~.zzzZZZZZ..");
                    cm.dispose();
                    return;
                } else if (!cm.isLeader()) { // Not Party Leader
                    cm.sendOk("請叫隊長跟我說話.");
                    cm.dispose();
                    return;
                } else if (cm.getMap(746000015).getCharactersSize() > 0) { // Not Party Leader
                    cm.sendOk("有人在挑戰此副本，請稍等一會，或者換其它線嘗試一下！..");
                    cm.dispose();
                    return;
                } else if (cm.getPlayer().getCSPoints(1) < 500) { // Not Party Leader
                    cm.sendOk("你的樂豆點不足500點，請足夠後再來");
                    cm.dispose();
                    return;
                } else {
                    var party = cm.getParty().getMembers();
                    if (party.size() > 1) {
                        cm.sendOk("#r對不起,為了徹底的測試你的能力,只能一人前往..");
                        cm.dispose();
                        return;
                    }
                    var em = cm.getEventManager("jysw1");
                    if (em == null) {
                        cm.sendOk("#e#b你的等級不足150級.");
                        cm.dispose();
                        return;
                    } else {
            em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 120);
            cm.gainNX(1, -500);
                    cm.worldSpouseMessage(0x09, "『守衛家園』" + " : " + "玩家<" + cm.getChar().getName() + ">進入了守護地圖開始保護家園");
                        cm.dispose();
                    }
}
        } else if(sel==7){
              if (cm.getParty() == null) { // No Party
                    cm.sendOk("需要先#b開啟#k一個組隊");
                    cm.dispose();
                    return;
                } else if (!cm.isLeader()) { // Not Party Leader
                    cm.sendOk("請叫隊長跟我說話.");
                    cm.dispose();
                    return;
                } else if (cm.getMap(746000015).getCharactersSize() > 0) { // Not Party Leader
                    cm.sendOk("有人在挑戰此副本，請稍等一會，或者換其它線嘗試一下！..");
                    cm.dispose();
                    return;
                } else if (cm.getPlayer().getCSPoints(2) < 5000) { // Not Party Leader
                    cm.sendOk("你的楓點不足5000，請足夠後再來");
                    cm.dispose();
                    return;
                } else {
                    var party = cm.getParty().getMembers();
                    if (party.size() < 2) {
                        cm.sendOk("#r對不起,組隊必須2人以上，或者選擇單人模式");
                        cm.dispose();
                        return;
                    }
                    var em = cm.getEventManager("jysw");
                    if (em == null) {
                        cm.sendOk("#e#b你的等級不足150級.");
                        cm.dispose();
                        return;
                    } else {
            em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 120);
                    cm.gainNX(2, -5000); //扣除樂豆點
                    cm.channelMessage(0x09,"『守衛家園』" + " : " + "玩家<" + cm.getChar().getName() + ">進入了聖地開始保護聖龍[組隊模式]");
                        cm.dispose();
                    }
}
        } else if(sel==8){
              if (cm.getParty() == null) { // No Party
                    cm.sendOk("需要先#b開啟#k一個組隊");
                    cm.dispose();
                    return;
                } else if (!cm.isLeader()) { // Not Party Leader
                    cm.sendOk("請叫隊長跟我說話.");
                    cm.dispose();
                    return;
                } else if (cm.getMap(746000015).getCharactersSize() > 0) { // Not Party Leader
                    cm.sendOk("有人在挑戰此副本，請稍等一會，或者換其它線嘗試一下！..");
                    cm.dispose();
                    return;
                } else if (cm.getPlayer().getCSPoints(1) < 1000) { // Not Party Leader
                    cm.sendOk("你的樂豆點不足1000，請足夠後再來");
                    cm.dispose();
                    return;
                } else {
                    var party = cm.getParty().getMembers();
                    if (party.size() < 2) {
                        cm.sendOk("#r對不起,組隊必須2人以上，或者選擇單人模式");
                        cm.dispose();
                        return;
                    }
                    var em = cm.getEventManager("jysw1");
                    if (em == null) {
                        cm.sendOk("#e#b你的等級不足150級.");
                        cm.dispose();
                        return;
                    } else {
            em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 120);
            cm.gainNX(1, -1000);
                    cm.worldSpouseMessage(0x09, "『守衛家園』" + " : " + "玩家<" + cm.getChar().getName() + ">進入了聖地開始保護聖龍[組隊模式]");
                        cm.dispose();
                    }
}
        } else if (sel==3){
            cm.dispose();
                          cm.openNpc(9900003,"yizi701");  
        } else if (sel==5){
            cm.dispose();
                          cm.openNpc(9900003,"choujiang702");                        
        } else if (sel==2){
            cm.sendOkS("#r#e<守衛家園>\r\n#r#e副本特色：#k#n進入後，每次15秒刷新一批怪物，請迅速消滅\r\n#r#e挑戰失敗條件：#k#n地圖怪物總數量超過100只。\r\n#e#r挑戰待遇：#k#n殺死怪物後，有機率掉落#v4310091##z4310091#\r\n#r#e進入條件#k#n：樂豆點，或者楓點",2);
            cm.dispose();
        } else if (sel==6){
            cm.sendOkS("#e#b你的等級不足150級",2);
            cm.dispose();
     }
}
}
