

var status = 0;
var minLevel = 50; // GMS = 50 
var maxLevel = 275; // GMS = 200? recommended 50 - 69
var minPlayers = 1; // GMS = 3
var maxPlayers = 6; // GMS = 4 || but 6 makes it better :p
var open = true;//open or not
var PQLog = '女神的痕跡';
var maxenter = 10;

function start() {
    status = -1;
    cm.sendSimple("#e <組隊任務: 女神的痕跡>#n \r\n你好,我是溫莉. 如果你想探索女神塔請告訴我。哦對了，如果你的組隊裡有劍士，魔法師，弓箭手，盜賊，海盜，我將給予你溫莉的祝福.#b\r\n#L1#申請入場.#l\r\n#L2#我想聽聽說明.#l\r\n#L5#尋找組隊.#l\r\n#L6#查看剩餘次數.#l#k");
}
function action(mode, type, selection) {
    if (status >= 1 && mode == 0) {
        cm.sendOk("有什麼需要請在來找我.."); // gms has spelling mistakes.. 
        cm.dispose();
        return;
    }
    if (mode == 0 && status == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1)
        status++;
    else
        status--;

    if (status == 0 && cm.getPlayer().getMapId() == 910002000) {
        cm.sendYesNo("#e <組隊任務: 女神的痕跡>#n \r\n 是否現在就進去雅典娜禁地入口?。#b\r\n#L0#我要離開這裡.");
    } else {
        if (selection == 0) {
            cm.warp(933030000, 0);
            cm.dispose();
        } else if (selection == 1) {
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
                // Check if all party members are over lvl 50
                var party = cm.getParty().getMembers();
                var next = true;
                if (!cm.isAdmin() && (party.size() > maxPlayers || party.size() < minPlayers)) {
                    next = false;
                }
                if (next) {
                    var em = cm.getEventManager("OrbisPQ");
                    if (em == null || open == false) {
                        cm.sendSimple("當前組隊副本未開放.");
                        cm.dispose();
                    } else {
                        var prop = em.getProperty("state");
                        if (prop == null || prop.equals("0")) {
                            em.startInstance(cm.getParty(), cm.getMap(), 70);
                        } else {
                            cm.sendSimple("已經有隊伍在裡面了,請稍等或者更換頻道再試.");
                        }
                        for (var i = 4001044; i < 4001064; i++) {
                            cm.removeAll(i);
                        }
                        cm.setPQLog(PQLog);
                        cm.dispose();
                    }
                } else {
                    cm.sendYesNo("該任務需要有 " + minPlayers + " - " + maxPlayers + " 人的隊伍. 請您組好隊員後再試.");
                }
            }
        } else if (selection == 2) {
            cm.sendOk("#e <組隊任務: 女神的痕跡>#n \r\n After a heavy rainfall on El Nath Mountains, a new cloud path opened behind the #bStatue of Goddess Minerva#k at the top of Orbis Tower. When a giant cloud far away split open, a mysterious tower appeared. It's the tower of #bGoddess Minerva#k, who ruled Orbis a long time ago. Would you like to begin your adventure at this legendary tower where Goddess Minerva is said to be trapped?\r\n #e - Level:#n 70 or higher #r (Recommended Level: 70 - 119)#k \r\n #e - Time Limit:#n 20 min \r\n #e - Players:#n 3 - 6 \r\n #e - Reward:#n \r\n#v1082232:# Goddess Wristband #b \r\n(Can be traded for 15 Feathers of Goddess.)#k \r\n#v1072455:# Goddess Shoes#b \r\n(Can be traded for 10 Feathers of Goddess.)#k \r\n#v1082322:# Minvera's Bracelet#b \r\n(Can be traded for 30 Feathers of Goddess and 1 Goddess Wristband.)#k \r\n#v1072534:# Minvera's Shoes#b \r\n(Can be traded for 20 Feathers of Goddess and 1 Goddess Shoes.).");
            cm.dispose();
        } else if (selection == 5) {
            cm.sendOk("快捷尋找組隊按熱鍵「O」趕快加入組隊來挑戰組隊任務吧。");
            cm.dispose();
        } else if (selection == 6) {
            var pqtry = maxenter - cm.getPQLog(PQLog);
            cm.sendOk("今天還能進行 " + pqtry + " 次.");
            cm.dispose();
        }else {
             cm.dispose();
        }
    }
}
