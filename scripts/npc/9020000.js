/*
 廢棄都市組隊任務
 */
var status = 0;
var minLevel = 30;
var maxLevel = 275;
var minPlayers = 3; // GMS = 3
var maxPlayers = 6; // GMS = 4
var maxenter = 10;
var PQLog = "第一次同行";
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.sendOk("快捷尋找組隊按熱鍵「O」趕快加入組隊來挑戰組隊任務吧。");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;

        if (status == 0) {
            cm.removeAll(4001008);
            cm.removeAll(4001007);
            cm.sendSimple("#e<組隊任務：第一次同行>#n\r\n\r\n你想和隊員們一起努力，完成任務嗎？這裡面有很多如果不同心協力就無法解決的障礙……如果想挑戰的話，請讓#b所屬組隊的隊長#k來和我說話。\r\n#b#L0#我想執行組隊任務。#l\r\n#L1#我想聽一下說明。#l\r\n#L2#我想知道今天的剩餘挑戰次數。#l");
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getParty() == null) { // No Party
                    cm.sendOk("你沒有創建組隊,無法入場。");
                    cm.dispose();
                } else if (!cm.isLeader()) { // Not Party Leader
                    cm.sendOk("請你們團隊的隊長和我對話。");
                    cm.dispose();
                } else if (!cm.isAllPartyMembersAllowedLevel(minLevel, maxLevel)) {
                    cm.sendOk("在你或者隊員中存在" + minLevel + "級以下，" + maxLevel + "級以上的角色。請注意等級限制。");
                    cm.dispose();
                } else if (!cm.isAllPartyMembersAllowedPQ(PQLog, maxenter)) {
                    cm.sendOk("你的隊員#r#e \"" + cm.getNotAllowedPQMemberName(PQLog, maxenter) + "\" #k#n次數已經達到上限了。");
                    cm.dispose();
                } else if (!cm.allMembersHere()) {
                    cm.sendOk("你的組隊部分成員不在當前地圖,請召集他們過來後在嘗試。");
                    cm.dispose();
                } else {
                    var party = cm.getParty().getMembers();
                    var next = true;
                    if (!cm.isAdmin() && (party.size() > maxPlayers || party.size() < minPlayers)) {
                        next = false;
                    }
                    if (next) {
                        var em = cm.getEventManager("KerningPQ");
                        if (em == null) {
                            cm.sendOk("此任務正在建設當中。");
                        } else {
                            var prop = em.getProperty("state");
                            if (prop.equals("0") || prop == null) {
                                em.startInstance(cm.getParty(), cm.getMap(), 198);
                                cm.gainMembersPQ(PQLog, 1);
                                cm.dispose();
                                return;
                            } else {
                                cm.sendOk("組隊訓練場任務裡面已經有人了，請稍等！");
                            }
                        }
                        cm.dispose();
                    } else {
                        cm.sendYesNo("你需要有一個 " + minPlayers + " - " + maxPlayers + " 人的隊伍. 請您組好隊員後再試.");
                        cm.dispose();
                    }
                }
            } else if (selection == 1) {
                cm.sendYesNo("你需要有一個 " + minPlayers + " - " + maxPlayers + " 人的隊伍.並且等級在" + minLevel + "~" + maxLevel + "範圍,\r\n那麼請讓你的組隊長和我對話吧!");
                cm.dispose();
            } else if (selection == 2) {
                var pqtry = maxenter - cm.getPQLog(PQLog);
                cm.sendOk("今天剩餘挑戰次數是" + pqtry + "次.");
                cm.dispose();
            }
        }
    }
}
