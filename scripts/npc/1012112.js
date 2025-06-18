/*
 *  @名稱：    達爾利
 *  @地圖：    
 *  @功能：    月妙組隊任務
 *  @作者：    彩虹工作室
 *  @時間：    2016年12月30日
 */
var status = 0;
var minLevel = 30;
var maxLevel = 275;
var minPlayers = 1; //3
var maxPlayers = 6;
var open = true;//open or not
var PQLog = '月妙的年糕';
var maxenter = 100;

function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (status >= 1 && mode == 0) {
        //cm.sendOk("Ask your friends to join your party. You can use the Party Search funtion (hotkey O) to find a party anywhere, anytime."); // gms has spelling mistakes.. 
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

    if (status == 0) {
        if (cm.getPlayer().getMapId() != 933000000) { // not in pq lobby
            cm.sendSimple("#e <組隊任務: 月妙的年糕>#n \r\n  你想和隊員們一起努力，完成任務嗎？這裡面有很多如果不同心協力就無法解決的障礙……如果想挑戰的話，請讓#b所屬組隊的隊長#k來和我說話。#b\r\n#L0#去往組隊任務綜合入場.");
        } else if (cm.getPlayer().getMapId() == 933000000) {
            cm.sendSimple("#e<組隊任務: 月妙的年糕>#n \r\n 你好, 我是達爾利! 你去過迎月花山丘嗎? 那裡可是個美麗的地方. 直到怪物進來....? \r\n #b#L1# 進入迎月花山丘.#l \r\n #b#L4# 我要兌換年糕帽子.#l \r\n #L3# 告訴我關於迎月花丘的信息.#l \r\n #L5# 我想知道今天剩餘的挑戰次數?#l");
        } else {
            cm.dispose();
        }
    } else if (status == 1) {
        if (selection == 0) {
            cm.saveLocation("MULUNG_TC");
            cm.warp(933000000, 0);
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
                var party = cm.getParty().getMembers();
                var next = true;
                if (!cm.isAdmin() && (party.size() > maxPlayers || party.size() < minPlayers)) {
                    next = false;
                }
                if (next) {
                    var em = cm.getEventManager("HenesysPQ");
                    if (em == null || open == false) {
                        cm.sendSimple("當前組隊任務未加載,請報告管理員.");
                    } else {
                        var prop = em.getProperty("state");
                        if (prop == null || prop.equals("0")) {
                            em.startInstance(cm.getParty(), cm.getMap(), 70);
                        } else {
                            cm.sendSimple("月妙的年糕裡面已經有人了，請稍等！或者更換頻道!"); // may not be a gms copy.. dont have 6 computers to test party inside and party to enter : (
                        }
                        cm.removeAll(4001453);
                        cm.setPQLog(PQLog);
                    }
                    cm.dispose();
                } else {
                    cm.sendYesNo("你需要有一個 " + minPlayers + " - " + maxPlayers + " 人的隊伍.並且等級在" + minLevel + "~" + maxLevel + "範圍,\r\n那麼請讓你的組隊長和我對話吧!");
                    cm.dispose();
                }
            }
        } else if (selection == 3) {
            cm.sendOk("#e <組隊任務: 月妙的年糕>#n \r\n A mysterious Moon Bunny that only appears in #b#m933001000##k durning full moons. #b#p1012112##k of #b#m100000200##k is looking for Maplers to find #rMoon Bunny's Rice Cake#k for #b#p1012114##k. If you want to meet the Moon Bunny, plant Primrose Seeds in the designated locations and summon forth a full moon. Protect the Moon Bunny from wild animals until all #r10 Rice Cakes#k are made.\r\n #e - Level:#n 10 or above #r (Recommended Level: 10 - 20)#k \r\n #e - Time Limit:#n 10 min \r\n #e - Number of Participants:#n 3 to 6 \r\n #e - Reward:#n #i1003266:# Rice Cake Topper #b \r\n(obtained by giving Tory 100 Rice Cakes)#k \r\n #e - Items:#n #i1002798:# A Rice Cake on Top of My Head #b \r\n(obtained by giving Tory 10 Rice Cakes).");
            cm.dispose();
        } else if (selection == 4) {
            cm.sendOk("喲! 你帶來月妙製作的年糕給我呀? 好的,我給你準備了一些特殊的禮物. 那麼你想給我多少年糕呢?#b\r\n#L10#月妙的年糕 x10 - 頭頂年糕#l\r\n#L11#月妙的年糕 x100 - 飄在頭頂的石頭");
        } else if (selection == 5) {
            var pqtry = maxenter - cm.getPQLog(PQLog);
            cm.sendOk("今天剩餘挑戰次數是" + pqtry + "次.");
            cm.dispose();
        }
    } else if (status == 2) {
        if (selection == 10) {
            if (!cm.canHold(1002798, 1)) {
                cm.sendOk("請整理你的背包空間.");
            } else if (cm.haveItem(4001101, 10)) {
                cm.gainItem(1002798, 1);
                cm.gainItem(4001101, -10);
                cm.sendOk("已經兌換好叻!");
                cm.dispose();
            } else {
                cm.sendOk("你需要更多的年糕.");
                cm.dispose();
            }
        } else if (selection == 11) {
            if (!cm.canHold(1003266, 1)) {
                cm.sendOk("請整理你的背包空間.");
            } else if (cm.haveItem(4001101, 100)) {
                cm.gainItem(1003266, 1);
                cm.gainItem(4001101, -100);
                cm.sendOk("已經兌換好叻!");
                cm.dispose();
            } else {
                cm.sendOk("你需要更多的年糕");
                cm.dispose();
            }
        }
        if (mode == 0) {
            cm.dispose();
        }
    }
}
