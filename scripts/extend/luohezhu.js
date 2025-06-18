var status = 0;
var minLevel = 180;
var maxLevel = 275;
var minPartySize = 1;
var maxPartySize = 6;

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
    cm.removeAll(4001130);
    cm.removeAll(4001131);
    cm.removeAll(4001132);
    cm.removeAll(4001133);
    cm.removeAll(4001134);
    cm.removeAll(4001135);
            cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，[日常]拯救羅和朱組隊任務:\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r1,2,3線可挑戰。\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r所屬隊長與我對話執行。\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#組隊員等級必須要在" + minLevel + "級以上。\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#組隊員必須要" + minPartySize + "人以上，" + maxPartySize + "人以下。#b\r\n\r\n#fUI/UIWindow2.img/QuestGuide/Button/WorldMapQuestToggle/normal/0#\r\n#L0##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[執行]拯救羅和朱#l")
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getParty() == null) { // 沒有組隊
                    cm.sendOk("請組隊後和我談話。");
                    cm.dispose();
                } else if (!cm.isLeader()) { // 不是隊長
                    cm.sendOk("隊長必須在這裡。請讓他和我說話。");
                    cm.dispose();
                    } else  {
        if (cm.getEventCount("羅朱1") < 1){
        if (cm.checkPartyEventCount("羅朱1")){
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
                        var em = cm.getEventManager("ZChaosPQ3");
                        if (em == null) {
                            cm.sendOk("此任務正在建設當中。");
                        } else {
                            var prop = em.getProperty("state");
                            if (prop.equals("0") || prop == null) {
                                em.startInstance(cm.getParty(), cm.getMap(), 198);
                                cm.dispose();
                                return;
                            } else {
                                cm.sendOk("[日常]拯救羅和朱任務裡面已經有人了，請稍等！");
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
            cm.sendOk("對不起，該帳號每天只能進入1次。");
            cm.dispose();
            }
        } //判斷組隊
            } else if (selection == 1) {
                cm.sendOk("請確認你的組隊員：\r\n\r\n#b1、組隊員必須要" + minPartySize + "人以上，" + maxPartySize + "人以下。\r\n2、組隊員等級必須要在" + minLevel + "級以上。\r\n\r\n（#r如果仍然錯誤, 重新下線,再登陸 或者請重新組隊。#k#b）");
                cm.dispose();
            }
        }
         } else {
                cm.dispose();
                cm.sendOk("只有在1,2,3頻道才可以參加[日常]拯救羅和朱任務。");
    }
    }
}