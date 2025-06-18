var status = -1;
var PQLog = "困難史烏";
var EventName = "BossSiwu_HARD";
var minLevel = 190;
var maxLevel = 275;


function start() {
    if (cm.getPlayer().getMapId() == 551030200) {
        cm.sendYesNo("你想出去了嗎?");
        status = 1;
        return;
    }
    if (cm.getPlayer().getLevel() < 190) {
        cm.sendOk("參與史烏遠征隊需要達到190級.");
        cm.dispose();
        return;
    }
    if (cm.getPlayer().getClient().getChannel() != 1 && cm.getPlayer().getClient().getChannel() != 2 && cm.getPlayer().getClient().getChannel() != 3 && cm.getPlayer().getClient().getChannel() != 4) {
        cm.sendOk("只能在頻道1,2,3,4 進行.");
        cm.dispose();
        return;
    }
    var em = cm.getEventManager(EventName);

    if (em == null) {
        cm.sendOk("該副本未正常運行,如有疑問請聯繫管理員.");
        cm.dispose();
        return;
    }
    var eim_status = em.getProperty("state");
    var marr = cm.getQuestRecord(160108);
    var data = marr.getCustomData();
    if (data == null) {
        marr.setCustomData("0");
        data = "0";
    }
    var time = parseInt(data);
    if (eim_status == null || eim_status.equals("0")) {
        var squadAvailability = cm.getSquadAvailability(EventName);
        if (squadAvailability == -1) {
            status = 0;
            if (time + (3 * 3600000) >= cm.getCurrentTime() && !cm.getPlayer().isGm()) {
                cm.sendOk("你在3小時內已經參加過這個遠征隊了. 重置時間: " + cm.getReadableMillis(cm.getCurrentTime(), time + (3 * 360000)));
                cm.dispose();
                return;
            }
            cm.sendYesNo("你有興趣成為遠征隊長嗎?");

        } else if (squadAvailability == 1) {
            if (time + (3 * 3600000) >= cm.getCurrentTime() && !cm.getPlayer().isGm()) {
                cm.sendOk("你在3小時內已經參加過這個遠征隊了. 重置時間: " + cm.getReadableMillis(cm.getCurrentTime(), time + (3 * 360000)));
                cm.dispose();
                return;
            }
            // -1 = Cancelled, 0 = not, 1 = true
            var type = cm.isSquadLeader(EventName);
            if (type == -1) {
                cm.sendOk("遠征隊已經結束,請重新申請.");
                cm.dispose();
            } else if (type == 0) {
                var memberType = cm.isSquadMember(EventName);
                if (memberType == 2) {
                    cm.sendOk("你被禁止參加遠征隊.");
                    cm.dispose();
                } else if (memberType == 1) {
                    status = 5;
                    cm.sendSimple("你想要做什麼呢? \r\n#b#L2#查看成員#l\r\n#b#L1#退出遠征隊#l");
                } else if (memberType == -1) {
                    cm.sendOk("遠征隊已經結束,請重新申請.");
                    cm.dispose();
                } else {
                    status = 5;
                    cm.sendSimple("你想要做什麼呢? \r\n#b#L0#加入遠征隊#l\r\n#b#L2#查看成員列表#l");
                }
            } else { // Is leader
                status = 10;
                cm.sendSimple("你想要做什麼呢,遠征隊長? \r\n#b#L0#查看成員列表#l \r\n#b#L1#踢掉成員#l \r\n#b#L2#黑名單管理#l \r\n#r#L3#選擇遠征隊入場#l");
                // TODO viewing!
            }
        } else {
            var eim = cm.getDisconnected(EventName);
            if (eim == null) {
                var squd = cm.getSquad(EventName);
                if (squd != null) {
                    if (time + (3 * 3600000) >= cm.getCurrentTime() && !cm.getPlayer().isGm()) {
                        cm.sendOk("你在3小時內已經參加過這個遠征隊了. 重置時間: " + cm.getReadableMillis(cm.getCurrentTime(), time + (3 * 360000)));
                        cm.dispose();
                        return;
                    }
                    cm.sendYesNo("遠征隊已經開始對抗強大的怪物了.\r\n" + squd.getNextPlayer());
                    status = 3;
                } else {
                    cm.sendOk("遠征隊已經開始對抗強大的怪物了.");
                    cm.safeDispose();
                }
            } else {
                cm.sendYesNo("你回來了?. 你想再次回到遠征隊的戰場嗎?\r\n#b#L0#是的,我想再次回到戰場#l\r\n#b#L1#讓我考慮一下#l");
                status = 2;
            }
        }
    } else {
        var eim = cm.getDisconnected(EventName);
        if (eim == null) {
            var squd = cm.getSquad(EventName);
            if (squd != null) {
                if (time + (3 * 3600000) >= cm.getCurrentTime() && !cm.getPlayer().isGm()) {
                    cm.sendOk("你在3小時內已經參加過這個遠征隊了. 重置時間: " + cm.getReadableMillis(cm.getCurrentTime(), time + (3 * 360000)));
                    cm.dispose();
                    return;
                }
                cm.sendYesNo("遠征隊已經開始對抗強大的怪物了.\r\n" + squd.getNextPlayer());
                status = 3;
            } else {
                cm.sendOk("遠征隊已經開始對抗強大的怪物了.");
                cm.safeDispose();
            }
        } else {
            cm.sendSimple("你回來了?. 你想再次回到遠征隊的戰場嗎?\r\n#b#L0#是的,我想再次回到戰場#l\r\n#b#L1#讓我考慮一下#l");
            status = 2;
        }
    }
}

function action(mode, type, selection) {
    switch (status) {
        case 0:
            if (mode == 1) {
                if (cm.registerSquad(EventName, 5, " 成為了遠征隊長. 如果你想加入遠征隊,請在現限定的時間內進行申請加入..")) {
                    cm.sendOk("你成為了遠征隊長. 在接下去的5分鐘內你可以添加你的遠征隊員..");
                } else {
                    cm.sendOk("建立遠征隊出現錯誤.");
                }
            }
            cm.dispose();
            break;
        case 1:
            if (mode == 1) {
                cm.warp(350060300, 0);
            }
            cm.dispose();
            break;
        case 2:
            if (selection == 0 && !cm.reAdd(EventName, EventName)) {
                cm.sendOk("出現錯誤,請重試.");
            }
            cm.safeDispose();
            break;
        case 3:
            if (mode == 1) {
                var squd = cm.getSquad(EventName);
                if (squd != null && !squd.getAllNextPlayer().contains(cm.getPlayer().getName())) {
                    squd.setNextPlayer(cm.getPlayer().getName());
                    cm.sendOk("You have reserved the spot.");
                }
            }
            cm.dispose();
            break;
        case 5:
            if (selection == 0) { // join
                var ba = cm.addMember(EventName, true);
                if (ba == 2) {
                    cm.sendOk("遠征隊人數已滿,請稍後再試!");
                } else if (ba == 1) {
                    cm.sendOk("成功加入遠征隊!");
                } else {
                    cm.sendOk("你已經是該遠征隊的成員.");
                }
            } else if (selection == 1) {// withdraw
                var baa = cm.addMember(EventName, false);
                if (baa == 1) {
                    cm.sendOk("你已經成功離開遠征隊!");
                } else {
                    cm.sendOk("你並不是遠征隊成員.");
                }
            } else if (selection == 2) {
                if (!cm.getSquadList(EventName, 0)) {
                    cm.sendOk("由於未知原因,遠征隊請求被拒絕.");
                }
            }
            cm.dispose();
            break;
        case 10:
            if (mode == 1) {
                if (selection == 0) {
                    if (!cm.getSquadList(EventName, 0)) {
                        cm.sendOk("由於未知原因,遠征隊請求被拒絕.");
                    }
                    cm.dispose();
                } else if (selection == 1) {
                    status = 11;
                    if (!cm.getSquadList(EventName, 1)) {
                        cm.sendOk("由於未知原因,遠征隊請求被拒絕.");
                        cm.dispose();
                    }
                } else if (selection == 2) {
                    status = 12;
                    if (!cm.getSquadList(EventName, 2)) {
                        cm.sendOk("由於未知原因,遠征隊請求被拒絕.");
                        cm.dispose();
                    }
                } else if (selection == 3) { // get insode
                    if (cm.getSquad(EventName) != null) {
                        var dd = cm.getEventManager(EventName);
                        dd.startInstance(cm.getSquad(EventName), cm.getMap(), 160108);
                    } else {
                        cm.sendOk("由於未知原因,遠征隊請求被拒絕.");
                    }
                    cm.dispose();
                }
            } else {
                cm.dispose();
            }
            break;
        case 11:
            cm.banMember(EventName, selection);
            cm.dispose();
            break;
        case 12:
            if (selection != -1) {
                cm.acceptMember(EventName, selection);
            }
            cm.dispose();
            break;
    }
}