var status = 0;
var minLevel = 120;
var maxLevel = 275;
var minPlayers = 1; // GMS = 3
var maxPlayers = 6; // GMS = 4
var count = 8;
var PQLog = "海盜船組隊任務";
var sel = -1;
var questID = 1204;
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
            cm.removeAll(4001117);
            cm.removeAll(4001260);
            cm.removeAll(4001120);
            cm.removeAll(4001121);
            cm.removeAll(4001122);
            cm.sendSimple("#e<組隊任務：海盜船組隊任務>#n\r\n你想要幹什麼呢？\r\n#b#L0#我想執行組隊任務。#l\r\n#L1#我想尋找一起遊戲的隊員。#l\r\n#L2#我想聽聽說明。#l\r\n#L3#我想領取海盜帽。#l\r\n#L4#我想知道今天的剩餘挑戰次數。#l");
        } else if (status == 1) {
            sel = selection;
            if (cm.getMapId() == 910002000 && selection == 0) {
                cm.sendNext("如果你要挑戰一下，我就會指引你到港口……");
            } else if (selection == 0) {
                if (cm.getParty() == null) { // 沒有組隊
                    cm.sendOk("請組隊後和我談話。");
                    cm.dispose();
                } else if (!cm.isLeader()) { // 不是隊長
                    cm.sendOk("隊長必須在這裡。請讓他和我說話。");
                    cm.dispose();
                } else if (!cm.allMembersHere()) {
                    cm.sendOk("你的組隊部分成員不在當前地圖,請召集他們過來後在嘗試。"); //判斷組隊成員是否在一張地圖..
                    cm.dispose();
                } else if (!cm.isAllPartyMembersAllowedPQ(PQLog, count)) {
                    cm.sendOk("你的隊員#r#e \"" + cm.getNotAllowedPQMemberName(PQLog, count) + "\" #k#n次數已經達到上限了。");
                    cm.dispose();
               /* } else if (!cm.isAllPartyMembersNotCoolDown(questID, 1300000)) {//判斷組隊成員是否l冷卻..
                    cm.sendOk("你的隊員#r#e \"" + cm.getIsInCoolDownMemberName(questID, 1300000) + "\" #k#n目前處於等待重置時間狀態。");
                    cm.dispose();*/
                } else {
                    var party = cm.getParty().getMembers();
                    var next = true;
                    if (!cm.isAdmin() && (party.size() > maxPlayers || party.size() < minPlayers)) {
                        next = false;
                    }
                    if (next) {
                        var em = cm.getEventManager("Pirate");
                        if (em == null) {
                            cm.sendOk("此任務正在建設當中。");
                        } else {
                            var prop = em.getProperty("state");
                            if (prop.equals("0") || prop == null) {
                                em.startInstance(cm.getParty(), cm.getMap(), 180, questID);
                                cm.gainMembersPQ(PQLog, 1);
                                cm.dispose();
                                return;
                            } else {
                                cm.sendOk("海盜船組隊任務裡面已經有人了，請稍等！");
                            }
                        }
                        cm.dispose();
                    } else {
                        cm.sendYesNo("你需要有一個 " + minPlayers + " - " + maxPlayers + " 人的隊伍. 請您組好隊員後再試.");
                        cm.dispose();
                    }
                }
            } else if (selection == 1) {
                //cm.sendYesNo("你需要有一個 " + minPlayers + " - " + maxPlayers + " 人的隊伍.並且等級在" + minLevel + "~" + maxLevel + "範圍,\r\n那麼請讓你的組隊長和我對話吧!");
                cm.dispose();
            } else if (selection == 2) {
                cm.sendNext("桔梗精們所在的#b#m251000000##k遭到了#r海盜#o9300119##k的襲擊。桔梗精大王--#b#p2094001##k被綁架了。請你和同伴們前往海盜船，擊退#o9300119#吧。拜託你了。\r\n - #e等級#n : 120級以上#r ( 推薦等級: 120 ~ 149 )#k \r\n - #e參加人員#n : 2 ~ 6名\r\n - #e最終獎勵#n : #b#i01003856# #t01003856##k");
                cm.dispose();
            } else if (selection == 3) {
                cm.sendSimple("感謝你消滅了#b老海盜#k並救出了#b無恙#k。作為報答，如果你能帶來帽子碎片，我就為你製成#b海盜船長帽#k。你需要什麼樣的帽子呢？#b\r\n#L0##i1003856:##t1003856#\r\n#r(需要30個#t4001455#)#l#b\r\n#L1##i1003857:##t1003857#\r\n#r(#t1003856:# 1個, 需要60個#t4001455#)#l#b\r\n#L2##i1003858:##t1003858#\r\n#r(#t1003857:# 1個, 需要90個#t4001455#)#l\r\n");
            } else if (selection == 4) {
                var pqtry = count - cm.getPQLog(PQLog);
                cm.sendOk("今天剩餘挑戰次數是" + pqtry + "次.");
                cm.dispose();
            }
        } else if (status == 2) {
            if (sel == 0) {
                cm.saveLocation("MULUNG_TC"); // not sure if correct..?
                cm.warp(251010404);
            } else {
                var itemid;
                var cost = 5;
                var need = 0;
                switch (selection) {
                    case 0:
                        cost = 30;
                        itemid = 1003856;
                        break;
                    case 1:
                        cost = 60;
                        itemid = 1003857;
                        need = 1003856;
                        break;
                    case 2:
                        cost = 90;
                        need = 1003857;
                        itemid = 1003858;
                        break;
                }
                if (cm.haveItem(4001455, cost) && (need == 0 || cm.haveItem(need, 1))) {
                    if (cm.canHold(itemid)) {
                        cm.gainItem(itemid, 1);
                        if (need > 0) {
                            cm.gainItem(need, -1);
                        }
                        cm.gainItem(4001455, -cost);
                    } else {
                        cm.sendOk("請整理你的背包");
                    }
                } else {
                    cm.sendOk("要想獲得#b#t" + itemid + "##k的話，需要#b" + cost + "個#t4001455##k。你快去搜集吧。消滅老海盜後，就可以弄到。");
                }
            }
            cm.dispose();
        }
    }
}
