/*
 Red Sign - 101st Floor Eos Tower (221024500)
 */


var status = 0;
var minLevel = 200;
var maxLevel = 275;
var minPlayers = 3; // GMS = 3
var maxPlayers = 6; // GMS = 4
var next = true;//next or not
var maxenter = 10;
var PQLog = '玩具城組隊任務';

function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (status >= 1 && mode == 0) {
        cm.sendOk("讓你你的朋友加入你的隊伍. 你也可以使用組隊搜索功能來搜索隊伍."); // gms has spelling mistakes.. 
        cm.dispose();
        return;
    }
    if (mode == 1)
        status++;
    else
        status--;

    if (status == 0) {
        if (cm.getMapId() == 910002000 || cm.getMapId() == 221023300) {
            cm.sendSimple("#e<組隊任務：玩具城組隊任務>#n\r\n\r\n從這裡往上到處都是很危險的東西，你不能繼續往上走了。你想和隊員們一起齊心協力，完成任務嗎？如果想挑戰的話，就通過#b所屬組隊的隊長#k來和我說話。\r\n#b#L1#我想參加組隊任務。#l\r\n#L2#我想尋找組隊。#l\r\n#L4#我想領取#t1022073#。#l#l\r\n#L3#我想聽聽說明。#l\r\n#L5#我想知道今天的剩餘挑戰次數。#l");
        } else {
            cm.dispose();
        }
    } else if (status == 1) {
        if (cm.getMapId() == 910002000 && selection == 1) {
            cm.sendNext("如果你要挑戰一下，我就會指引你到達塔的頂端……");
        } else if (selection == 1) {
            if (cm.getParty() == null) { // No Party
                cm.sendYesNo("要進入這個任務之前必須先組隊. 你想現在就搜索隊伍嗎?");
            } else if (!cm.isLeader()) { // Not Party Leader
                cm.sendOk("請讓隊長跟我對話.");
            } else if (!cm.isAllPartyMembersAllowedLevel(minLevel, maxLevel)) {
                cm.sendNext("組隊成員等級 " + minLevel + " 以上 " + maxLevel + " 以下才可以入場。");
            } else if (!cm.isAllPartyMembersAllowedPQ(PQLog, maxenter)) {
                cm.sendNext("你的隊員#r#e \"" + cm.getNotAllowedPQMemberName(PQLog, maxenter) + "\" #k#n次數已經達到上限了。");
            } else if (!cm.allMembersHere()) {
                cm.sendOk("請確認隊員是否都在當前地圖."); // check if working..
            } else {
                var party = cm.getParty().getMembers();
                var next = true;
                if (!cm.isAdmin() && (party.size() > maxPlayers || party.size() < minPlayers)) {
                    next = false;
                }
                if (next) {
                    var em = cm.getEventManager("LudiPQ");
                    if (em == null || next == false) {
                        cm.sendSimple("當前組隊任務不可用.");
                    } else {
                        var prop = em.getProperty("state");
                        if (prop == null || prop.equals("0")) {
                            em.startInstance(cm.getParty(), cm.getMap(), 170);
                        } else {
                            cm.sendSimple("當前已經有人在裡面了. 請稍等或切換到其他頻道.");
                        }
                        cm.removeAll(4001022);
                        cm.removeAll(4001023);
                        cm.gainMembersPQ(PQLog, 1);
                    }
                } else {
                    cm.sendYesNo("你需要有一個 " + minPlayers + " - " + maxPlayers + " 人的隊伍. 請您組好隊員後再試.");
                }
            }
            cm.dispose();
        } else if (selection == 2) {
            cm.sendOk("請向周圍的朋友們請求組隊。使用尋找組隊(快捷鍵O)功能，可以在任何時間任何地點尋找組隊。敬請參考。");
            cm.dispose();
        } else if (selection == 3) {
            cm.sendOk("#e<組隊任務：次元裂縫>#n\r\n#b#m220000000##k出現了次元裂縫！為了阻止入侵的怪物，我們迫切需要冒險家們自發的幫助。請和可以信賴的同伴一起，拯救#m220000000#！.必須消滅怪物，解決各種難關，戰勝#r#o9300012##k。\r\n  - #e等級#n：50級以上#r(推薦等級 50～69 )#k \r\n  - #e限制時間#n：20分鐘\r\n  - #e參加人數#n：3～6人\r\n  - #e獲得物品#n：#i1022073:# #t1022073# #b(每幫助5次時獲得)#k                         各種消耗、其他、裝備物品");
            cm.dispose();
        } else if (selection == 4) {
            if (!cm.canHold(1022073, 1)) {
                cm.sendOk("請確認你的背包有足夠空間!");
            } else if (cm.haveItem(4033039, 35)) {
                cm.gainItem(4033039, -35);
                cm.gainItem(1022073, 1);
                cm.sendOk("Here you go. Enjoy!");
            } else {
                cm.sendOk("你每幫助我5次，我就會給你1個#i1022073:##b#t1022073##k。你只要再幫我#b5次#k，就可以獲得#b#t1022073##k了。");
            }
            cm.dispose();
        } else if (selection == 5) {
            var pqtry = maxenter - cm.getPQLog(PQLog);
            cm.sendOk("今天剩餘挑戰次數是" + pqtry + "次.");
            cm.dispose();
        }
    } else if (status == 2) {
        cm.saveLocation("MULUNG_TC"); // not sure if correct..?
        cm.warp(221023300);
        cm.dispose();
    } else if (mode == 0) {
        cm.dispose();
    }
}
