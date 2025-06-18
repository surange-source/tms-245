/* 
 * 傑恩 NPC (9020005)
 */
var status = 0;
var minLevel = 100;
var maxLevel = 275;
var minPlayers = 2; // GMS = 3
var maxPlayers = 6; // GMS = 4
var open = true;//open or not
var maxenter = 10;
var PQLog = '逃脫';

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
        if (cm.getMapId() == 910002000 || cm.getMapId() == 921160000) {
            cm.sendSimple("#e<組隊任務: 逃脫>#n\r\n\r\n   雖說想就這樣立刻逃跑，但是……我無法拒絕他的囑托。在這座城裡，被關在空中監獄的人們正在尋找幫他們逃離監獄的人。 \r\n\r\n#b#L0#我要去幫助被關在城堡裡的冒險家！#l\r\n#L1#請告訴我一些關於城堡監獄的信息。#l\r\n#L2#告訴我一些關於#t4001534#的信息。#l\r\n#L3##b我想要知道今天剩餘的挑戰次數。#l");
        } else {
            cm.sendYesNo("#e<組隊任務: 逃脫>#n\r\n\r\n你想要就此放棄了嗎?");
        }
    } else if (status == 1) {
        if (cm.getMapId() == 910002000 && selection == 0) {
            cm.sendNext("你比看上去要勇敢啊。我會告訴你去空中監獄的路，跟我來吧。");
        } else if (cm.getMapId() != 921160000 && cm.getMapId() != 910002000) {
            cm.removeAll(4001528);
            cm.warp(921160000, 0);
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
                    var em = cm.getEventManager("Prison");
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
            cm.sendNext("這座城裡有一個隱藏著的塔。有很多人被關在塔內的空中監獄中。我得救出他們…… \r\n - #e等級#n : 120 以上#r( 推薦等級 : 120 ~ 200 )#k \r\n - #e限定時間#n : 20分鐘\r\n - #e參加人員#n : 3~6名\r\n - #e獲得道具#n :\r\n#i1132094:# #t1132094#\r\n#i1132095:# #t1132095#\r\n#i1132096:# #t1132096#\r\n#i1132097:# #t1132097#\r\n#i1132098:# #t1132098#");
        } else if (selection == 2) {
            cm.sendOk("#r#t4001534##k就在隱藏的塔中的看守身上。搜集#b5個#k交給我，我會送你一份小禮物。搜集5個鑰匙，意味著你為囚禁在城裡的人們提供了幫助。\r\n#i1132094:# #b#t1132094#, \r\n#i1132095:# #b#t1132095#,\r\n#i1132096:# #b#t1132096#, \r\n#i1132097:# #b#t1132097#, \r\n#i1132098:# #b#t1132098##k");
            cm.dispose();
        } else if (selection == 3) {
            var pqtry = maxenter - cm.getPQLog(PQLog);
            cm.sendOk("今天剩餘挑戰次數是" + pqtry + "次.");
            cm.dispose();
        }
    } else if (status == 2) {
        if (cm.getMapId() == 910002000) {
            cm.saveLocation("MULUNG_TC"); // not sure if correct..?
            cm.warp(921160000);
        } else {
            cm.sendOk("如果你進入監獄的話，你必須得記住以下幾點。\r\n1. 得躲開障礙物，逃出那座塔。 \r\n2. 得消滅地圖裡所有的警衛。\r\n3. 得逃出為了防止別人接近而設置的迷宮。\r\n4. 得消滅所有守門的警衛。\r\n5. 得通過通往空中監獄的最後障礙物。\r\n6. 得消滅警衛，找到鑰匙，打開監獄門。\r\n7. 得找到教導官阿尼，讓被囚禁的人們重新獲得自由。");
        }
        cm.dispose();
    } else if (mode == 0) {
        cm.dispose();
    }
}