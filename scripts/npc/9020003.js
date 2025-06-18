var status = 0;
var minLevel = 50; // GMS = 50 
var maxLevel = 275; // GMS = 200? recommended 50 - 69
var minPlayers = 3; // GMS = 3
var maxPlayers = 6; // GMS = 4 || but 6 makes it better :p
var open = true; //open or not
var PQLog = '陷入危險的坎特';
var maxenter = 10;
var sel = -1;
function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (status >= 1 && mode == 0) {
        cm.sendOk("讓你的朋友加入你的隊伍. 你也可以使用組隊搜索功能來搜索隊伍."); // gms has spelling mistakes.. 
        cm.dispose();
        return;
    }
    if (mode == 0 && status == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        if (cm.getPlayer().getMapId() != 910002000 && cm.getPlayer().getMapId() != 923040000) { // not in pq lobby
            cm.sendSimple("你真的想離開這裡麼?#b\r\n#L0#是的! 讓我離開這裡.#l");
        } else if (cm.getPlayer().getMapId() == 923040000 || cm.getPlayer().getMapId() == 910002000) {
            cm.sendSimple("#e<組隊任務：陷入危險的坎特>#n\r\n\r\n不好了！！坎特好像陷入危險了。他說要親自去調查海洋生物的異常行動，可是出去後就沒回來，肯定是出事了。我得把坎特找回來。請你幫幫忙！ \r\n\r\n#b#L0#我去找坎特。#l\r\n#L1#我想要#t1022175#。#k\r\n#b#L2#請詳細地說說是怎麼回事吧。#l\r\n#L3#我想知道今天的剩餘挑戰次數。#l");
        } else {
            cm.dispose();
        }
    } else if (status == 1) {
        if (cm.getPlayer().getMapId() != 910002000 && cm.getPlayer().getMapId() != 923040000 && selection == 0) {
            cm.warp(923040000, 0);
            cm.dispose();
        } else if (selection == 0) {
            if (cm.getPlayer().getMapId() == 910002000) {
                cm.saveLocation("MULUNG_TC");
                cm.warp(923040000, 0);
                cm.dispose();
            } else if (cm.getParty() == null) { // No Party
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
                var inMap = 0;
                var em = cm.getEventManager("Kenta");
                if (em == null || open == false) {
                    cm.sendSimple("This PQ is not currently available.");
                    cm.dispose();
                } else {
                    var prop = em.getProperty("state");
                    if (prop == null || prop.equals("0")) {
                        cm.gainMembersPQ(PQLog, 1);
                        em.startInstance(cm.getParty(), cm.getMap(), 170);
                    } else {
                        cm.sendSimple("已經有隊伍在進行了,請換其他頻道嘗試。");
                    }
                    cm.removeAll(4001453);
                    cm.dispose();
                }
            }
        } else if (selection == 1) {
            sel = selection;
            cm.sendNext("看樣子你對#i1022175:# #t1022175#挺感興趣……#t1022175#是坎特為那些協助自己進行海洋生物調查的人準備的謝禮。如果你搜集來研究所需的#b10個#t4001535##k，我就給你。你找到坎特後，和他一起消滅皮亞奴斯，就可以獲得#t4001535#。搜集100個比較吃力的話，用#b5個#t4001535##k也可以交換到寵物裝備卷軸，請你去幫助坎特吧。");
        } else if (selection == 2) {
            sel = selection;
            cm.sendNext("坎特覺得光用冒險家他們搜集到的樣本進行研究還不夠，說要直接去對海洋生物的異常行為進行調查，之後去了危海。他出去之後就一直沒有聯繫，也沒有回來。一定是出了什麼事。");
        } else if (selection == 3) {
            var pqtry = maxenter - cm.getPQLog(PQLog);
            cm.sendOk("今天剩餘挑戰次數是" + pqtry + "次.");
            cm.dispose();
        }
    } else if (status == 2) {
        if (sel == 1) {
            cm.sendNext("現在不是進行那種研究的時候。坎特一直沒有聯繫，一定是遇到了什麼危險！請你找到他，幫幫他！");
        } else if (sel == 2) {
            cm.sendNext("請你去找到坎特！一定要小心。那裡很危險。我能拜託你幾件事嗎？\r\n\r\n1. 在去尋找坎特的路上如果遇到了危險的海洋生物，請你把它們消滅掉。\r\n2. 坎特出去很久了，準備的氧氣可能不夠。請你幫他搜集一些空氣玲。\r\n3. 發現坎特之後，請你保護他，不要讓凶暴的海洋生物傷害他。\r\n4. 坎特如果想繼續進行調查，請你幫助他完成調查，安全地回到這裡。");
        }
        cm.dispose();
    } else if (mode == 0) {
        cm.dispose();
    }
}
