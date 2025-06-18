/*
 *    組隊任務：侏儒怪皇帝的復活
 */

var status = 0;
var minLevel = 150;
var maxLevel = 250;
var minPlayers = 2; // GMS = 3
var maxPlayers = 6; // GMS = 4
var open = true;//open or not
var maxenter = 10;
var PQLog = '侏儒怪皇帝的復活';
var sel = -1;

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
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
    }

    if (status == 0) {
        if (cm.getMapId() == 910002000 || cm.getMapId() == 211000002) {
            cm.sendSimple("#e<組隊任務：侏儒怪皇帝的復活>#n\r\n你們來了啊，#b#h0##k。你們找我有什麼事？呵呵呵#b\r\n#L0#我想去阻止侏儒怪皇帝萊格斯的復活。#l\r\n#L1#我想聽取說明。#l\r\n#L2#我想領取道具。#l\r\n#L3#我想知道剩餘的挑戰次數。#l");
        } else {
            cm.sendYesNo("#e<組隊任務：侏儒怪皇帝的復活>#n\r\n\r\n你想要就此放棄了嗎?");
        }
    } else if (status == 1) {
        sel = selection;
        if (cm.getMapId() == 910002000 && selection == 0) {
            cm.sendNext("我們還是到安靜的地方再談吧，跟我來。");
        } else if (cm.getMapId() != 211000002 && cm.getMapId() != 910002000) {
            cm.warp(211000002, 0);
            cm.dispose();
            return;
        } else if (selection == 0) {
            if (cm.getParty() == null) { // No Party
                cm.sendYesNo("要進入這個任務之前必須先組隊. 你想現在就搜索隊伍嗎?");
            } else if (!cm.isLeader()) { // Not Party Leader
                cm.sendOk("請讓隊長跟我對話.");
            } else if (!cm.isAllPartyMembersAllowedLevel(minLevel, maxLevel)) {
                cm.sendNext("組隊成員等級 " + minLevel + " 以上 " + maxLevel + " 以下才可以入場。");
            } else if (!cm.isAllPartyMembersAllowedPQ(PQLog, maxenter)) {
                cm.sendNext("你的隊員#r#e \"" + cm.getNotAllowedPQMemberName(PQLog, maxenter) + "\" #k#n次數已經達到上限了。");
            } else if (!cm.allMembersHere()) {
                cm.sendOk("請確認隊員是否都在當前地圖.");
            } else {
                var party = cm.getParty().getMembers();
                var next = true;
                if (!cm.isAdmin() && (party.size() > maxPlayers || party.size() < minPlayers)) {
                    next = false;
                }
                if (next) {
                    var em = cm.getEventManager("Rex");
                    if (em == null || open == false) {
                        cm.sendSimple("當前組隊任務不可用.");
                    } else {
                        var prop = em.getProperty("state");
                        if (prop == null || prop.equals("0")) {
                            em.startInstance(cm.getParty(), cm.getMap(), 170);
                        } else {
                            cm.sendSimple("當前已經有人在裡面了. 請稍等或切換到其他頻道.");
                        }
                        cm.removeFromParty(4001528);
                        cm.gainMembersPQ(PQLog, 1);
                    }
                } else {
                    cm.sendYesNo("你需要有一個 " + minPlayers + " - " + maxPlayers + " 人的隊伍. 請您組好隊員後再試.");
                }
            }
            cm.dispose();
        } else if (selection == 1) {
            cm.sendNext("距離侏儒怪皇帝#r#o9300281##k復活沒剩多少時間了。封印#r#o9300281##k的封印石的力量似乎正在逐漸減弱。只能前往#r#o9300281##k被封印的#b#m921120500##k去阻止他復活……如果你需要的話，我會把你帶到那裡去。但是，你要保護我，直到我安全離開那裡。\r\n - #e等級#n : 150以上#r( 推薦等級 : 150 ~ 200 )#k \r\n - #e限定時間#n : 20分鐘\r\n - #e參加人數#n : 2~6名r\r\n - #e獲得道具#n :\r\n#i1032102:# #t1032102#\r\n#i1032103:# #t1032103#\r\n#i1032104:# #t1032104#\r\n#i1902048:# #t1902048#");
            cm.dispose();
        } else if (selection == 2) {
            cm.sendSimple("你想要獲得什麼道具？我想要獲得#b\r\n#L0##i1032102:# #t1032102#。我想要獲得#l\r\n#L1##i1032103:# #t1032103#。我想要獲得#l\r\n#L2##i1032104:# #t1032104#。我想要獲得#l\r\n#L3##i1902048:# #t1902048#。#l");
        } else if (selection == 3) {
            var pqtry = maxenter - cm.getPQLog(PQLog);
            cm.sendOk("今天剩餘挑戰次數是" + pqtry + "次.");
            cm.dispose();
        }
    } else if (status == 2) {
        if (cm.getMapId() == 910002000 && sel != 2) {
            cm.saveLocation("MULUNG_TC"); // not sure if correct..?
            cm.warp(211000002);
        } else {
            var itemid;
            var cost = 5;
            switch (selection) {
                case 0:
                    itemid = 1032102;
                    break;
                case 1:
                    itemid = 1032103;
                    break;
                case 2:
                    itemid = 1032104;
                    break;
                case 3:
                    cost = 10;
                    itemid = 1902048;
                    break;
            }
            if (cm.haveItem(4001530, cost)) {
                if (cm.canHold(itemid)) {
                    cm.gainItem(itemid, 1);
                    cm.gainItem(4001530, -cost);
                } else {
                    cm.sendOk("請整理你的背包");
                }
            } else {
                cm.sendOk("要想獲得#b#t" + itemid + "##k的話，需要#b" + cost + "個#t4001530##k。你快去搜集吧。消滅萊格斯後，就可以弄到。");
            }
        }
        cm.dispose();
    } else if (mode == 0) {
        cm.dispose();
    }
}