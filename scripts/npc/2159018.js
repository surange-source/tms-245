/*
 *    組隊任務：冰騎士的詛咒
 */

var status = -1;
var minLevel = 30;
var maxLevel = 275;
var maxenter = 10;
var PQLog = "冰騎士的詛咒";
var minPartySize = 1;
var maxPartySize = 6;

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
        cm.sendSimple("#e<組隊任務：冰騎士的詛咒>#n\r\n等等，噓……！安靜！小心別被冰騎士發現。中了他的詛咒的話，就會變成和我的朋友一樣……我就單刀直入了。請你幫幫我的朋友，讓他能夠解開冰騎士的詛咒！！！\r\n#b#L0#我願意幫助你的朋友。#l\r\n#L1#我想知道到底發生了什麼事。#l\r\n#L2#我想擁有冰騎士的特殊物品。#l\r\n#L3#我想知道今天的剩餘挑戰次數。#l");
    } else if (status == 1) {
        if (selection == 0) {
            if (cm.getParty() == null) { // 沒有組隊
                cm.sendOk("請組隊後和我談話。");
            } else if (!cm.isLeader()) { // 不是隊長
                cm.sendOk("隊長必須在這裡。請讓他和我說話。");
            } else if (!cm.isAllPartyMembersAllowedLevel(minLevel, maxLevel)) {
                cm.sendNext("組隊成員等級 " + minLevel + " 以上 " + maxLevel + " 以下才可以入場。");
            } else if (!cm.isAllPartyMembersAllowedPQ(PQLog, maxenter)) {
                cm.sendNext("你的隊員#r#e \"" + cm.getNotAllowedPQMemberName(PQLog, maxenter) + "\" #k#n次數已經達到上限了。");
            } else if (!cm.allMembersHere()) {
                cm.sendOk("你的組隊部分成員不在當前地圖,請召集他們過來後在嘗試。"); //判斷組隊成員是否在一張地圖..
            } else {
                var em = cm.getEventManager("Iceman");
                if (em == null) {
                    cm.sendOk("當前伺服器未開啟此功能，請稍後在試...");
                } else {
                    var prop = em.getProperty("state");
                    if (prop.equals("0") || prop == null) {
                        em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 170);
                        cm.gainMembersPQ(PQLog, 1);
                    } else {
                        cm.sendOk("當前頻道已有玩家在進行任務中，請稍後在試。");
                    }
                }
            }
            cm.dispose();
        } else if (selection == 1) {
            cm.sendNext("我一直以為我是大人，其他的孩子都很幼稚。阿俊總是跟著我，他是個聽話的孩子。我們和往常一樣玩捉迷藏，阿俊在抓我的時候，被我嚇了一下。我覺得他很搞笑，就逗了他一下，但是……");
        } else if (selection == 2) {
            status = 2;
            cm.sendSimple("#b消滅冰騎士#k後，可以獲得#b#t4001529##k。聽說將那東西進行加工後，可以製作出特別道具。你去消滅冰騎士，解除詛咒，並帶回#t4001529#的話，我就幫你製作。\r\n#L0##i1152127:# #t1152127# - 20個#t4001529##l\r\n#L1##i1072819:# #t1072819# - 10個#t4001529##l\r\n#L2##i2041513:# #t2041513# - 10個#t4001529##l\r\n#L3##i2041514:# #t2041514# - 10個#t4001529##l");
        } else if (selection == 3) {
            cm.sendOk("今天剩餘挑戰次數是" + (maxenter - cm.getPQLog(PQLog)) + "次。");
            cm.dispose();
        }
    } else if (status == 2) {
        cm.sendNextPrev("阿俊說想變得勇敢，想成為所有人認可的勇敢的人。但是他卻被冰騎士騙了，變成了那副模樣。請幫幫我的朋友阿俊！要是不快點把詛咒解開的話，阿俊可能會和冰騎士一樣，失去人類的心。");
        cm.dispose();
    } else if (status == 3) {
        var itemid;
        var cost = 10;
        switch (selection) {
            case 0:
                cost = 20;
                itemid = 1152127;
                break;
            case 1:
                itemid = 1072819;
                break;
            case 2:
                itemid = 2041513;
                break;
            case 3:
                itemid = 2041514;
                break;
        }
        if (cm.haveItem(4001529, cost)) {
            if (cm.canHold(itemid)) {
                cm.gainItem(itemid, 1);
                cm.gainItem(4001529, -cost);
            } else {
                cm.sendOk("請確保背包有足夠的空間.");
            }
        } else {
            cm.sendOk("你確定#b#t4001529##k的數量沒錯？你可別想騙我。");
        }
        cm.dispose();
    }
}
