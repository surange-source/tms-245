var status = 0;

var MIN_LEVEL = 125;
var MAX_LEVEL = 255;
var MIN_PARTY_SIZE = 2;
var MAX_PARTY_SIZE = 6;
var MAXENTER = 5;
var PQLOG = "GhostPark";
var EVENT_NAME = "GhostPark";
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0) {
        cm.dispose();
        return;
    } else if (mode == 1) {
        status++;
    } else {
        status--;
    }

    switch (status) {
        case 0:
            if (cm.getParty() == null) { // 沒有組隊
                cm.sendOkN("鬼魂公園只有#b組隊#k才可以入場, \r\n#b組隊#k後再來吧~");
                cm.dispose();
            } else if (!cm.isLeader()) {
                cm.sendOkN("鬼魂公園只有通過#b隊長#k才可以入場, \r\n讓#b隊長#k和我對話吧~");
                cm.dispose();
            } else if (!cm.isAllPartyMembersAllowedLevel(MIN_LEVEL, MAX_LEVEL)) {
                cm.sendNextN("組隊成員等級 " + MIN_LEVEL + " 以上 " + MAX_LEVEL + " 以下才可以入場。");
                cm.dispose();
            } else if (!cm.isAllPartyMembersAllowedPQ(PQLOG, MAXENTER)) {
                cm.sendNextN("你的隊員#r#e \"" + cm.getNotAllowedPQMemberName(PQLOG, MAXENTER) + "\" #k#n次數已經達到上限了。");
                cm.dispose();
            } else {
                var party = cm.getParty().getMembers();
                var next = true;
                if (!cm.isAdmin() && (party.size() > MAX_PARTY_SIZE || party.size() < MIN_PARTY_SIZE)) {
                    next = false;
                }
                if (next) {
                           var em = cm.getEventManager("GhostPark");
                            if (em == null) {
                                cm.sendOk("此任務正在建設當中。");
                                }
                            }
                } else {
                    cm.sendYesNoN("你需要有一個 " + MIN_PARTY_SIZE + " - " + MAX_PARTY_SIZE + " 人的隊伍. 請您組好隊員後再試.");
                    cm.dispose();
                }
            }
            break;
        case 1: //
            var st = cm.getText();
            if (!st.equals("-1")) {
                if (!cm.allMembersHere()) {
                    cm.sendOkN("你的組隊部分成員不在當前地圖,請召集他們過來後在嘗試。"); //判斷組隊成員是否在一張地圖..
                    cm.dispose();
                } else {
                    var em = cm.getEventManager(EVENT_NAME);
                    if (em == null) {
                        cm.sendOk("此任務正在建設當中。");
                    } else {
                        cm.dispose();
                        //cm.updatePartyInfoQuest(30200, "count=0;date=16/04/06;cLevel=0000000;Tcount=1;set=1;clear=0;failed=0");
                        cm.updatePartyOneInfo(30200, "cLevel", st);
                        em.setProperty("PID" + cm.getPlayer().getId(), st);
                        em.startInstance_Party(cm.getPlayer().getId(), cm.getPlayer(), 170);
                        cm.gainMembersPQ(PQLOG, 1);
                        return;
                    }
                }
            } else {
                cm.dispose();
            }
            break;
        case 2:
            break;
        case 3:
            cm.dispose();
            break;
    }
}
