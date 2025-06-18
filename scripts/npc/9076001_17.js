var status = 0;
var minLevel = 180;
var maxLevel = 275;
var minPartySize = 1;
var maxPartySize = 6;
var XZ;
var name0 = "[系列時間神殿組隊任務";
var name = Array(
        Array("[執行]時間神殿-追憶之路","追憶之路","NewEvent30",100,210),//執行顯示的名字、事件記錄、事件腳本名稱、帳號次數、怪物等級
        Array("[執行]時間神殿-後悔之路","後悔之路","NewEvent31",100,170),
        Array("[執行]時間神殿-忘卻之路","忘卻之路","NewEvent32",100,170)
);
var Q = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
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
        if (mode == 1) status++;
        else status--;
    if (cm.getPlayer().getClient().getChannel() == 1 || cm.getPlayer().getClient().getChannel() == 2 || cm.getPlayer().getClient().getChannel() == 3) {
        if (status == 0) {
            var txt = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，"+ name0 +":\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r1,2,3線可挑戰。\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r所屬隊長與我對話執行。\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#組隊員等級必須要在" + minLevel + "級以上。\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#組隊員必須要" + minPartySize + "人以上，" + maxPartySize + "人以下。\r\n\r\n#fUI/UIWindow2.img/QuestGuide/Button/WorldMapQuestToggle/normal/0#\r\n";
            for (var i = 0;i<name.length ;i++ ){
                txt+= "#L"+i+"#"+Q+""+ name[i][0] +"#r["+name[i][4]+"]級 #b剩餘次數:#r"+(name[i][3]-cm.getEventCount(name[i][1]))+"#k#l\r\n"
            }
            cm.sendSimple(txt);
        } else if (status == 1) {
            XZ = selection;
            if (cm.haveItem(4000664,20)){
                var txt= "檢測到你有可以開啟BOSS亂入的道具 #v4000664#X20，是否使用？\r\n";
                    txt+= "#L999#是#l\r\n";
                    txt+= "#L998#否#l\r\n";
            }else{
                var txt= "系統沒有檢測到有開啟亂入BOSS證明 #v4000664#X20，請點擊下一步開始。（無證明會有5%幾率出現亂入）";
            }
            cm.sendSimple(txt);
        } else if (status == 2) {
                if (cm.getParty() == null) { // 沒有組隊
                    cm.sendOk("請組隊後和我談話。");
                    cm.dispose();
                } else if (!cm.isLeader()) { // 不是隊長
                    cm.sendOk("隊長必須在這裡。請讓他和我說話。");
                    cm.dispose();
                } else  {
        if (cm.getEventCount(name[XZ][1]) < name[XZ][3]){
        if (cm.checkPartyEventCount(name[XZ][1],name[XZ][3])){
                    var party = cm.getParty().getMembers();
                    var mapId = cm.getPlayer().getMapId();
                    var next = true;
                    var levelValid = 0;
                    var inMap = 0;
                    var it = party.iterator();
                    while (it.hasNext()) {
                        var cPlayer = it.next();
                        if ((cPlayer.getLevel() >= minLevel) && (cPlayer.getLevel() <= maxLevel)) {
                            levelValid += 1;
                        } else {
                            next = false;
                        }
                        if (cPlayer.getMapid() == mapId) {
                            inMap += 1;
                        }
                    }
                    if (party.size() < minPartySize || party.size() > maxPartySize || inMap < minPartySize) {
                        next = false;
                    }
                    if (next) {
                        var em = cm.getEventManager(name[XZ][2]);
                        if (em == null) {
                            cm.sendOk("此任務正在建設當中。");
                        } else {
                            var prop = em.getProperty("state");
                            if (prop.equals("0") || prop == null) {
                                if (selection==999){
                                    em.setProperty("leader","true");
                                    cm.gainItem(4000664,-20);
                                }
                                em.startInstance(cm.getParty(), cm.getMap(), name[XZ][4]);
                                cm.setPartyEventCount(name[XZ][1]);
                                cm.dispose();
                                return;
                            } else {
                                cm.sendOk(""+ name[XZ][0] +"任務裡面已經有人了，請稍等！");
                            }
                        }
                        cm.dispose();
                    } else {
                        cm.sendOk("請確認你的組隊員：\r\n\r\n#b1、組隊員必須要" + minPartySize + "人以上，" + maxPartySize + "人以下。\r\n2、組隊員等級必須要在" + minLevel + "級以上。\r\n\r\n（#r如果仍然錯誤, 重新下線,再登陸 或者請重新組隊。#k#b）");
                        cm.dispose();
                    }
                } else {
            cm.sendOk("請檢查隊伍中是否存在已完成次數#b隊員#k。");
            cm.dispose();
            }
                } else {
            cm.sendOk("對不起，該帳號每天只能進入"+name[XZ][3]+"次。\r\n");
            cm.dispose();
            }
        } //判斷組隊
        }
         } else {
                cm.dispose();
                cm.sendOk("只有在1,2,3頻道才可以參加"+ name[XZ][0] +"。");
    }
    }
}