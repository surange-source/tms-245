/*
    NPC Name:         The Forgotten Temple Manager
    Map(s):         Deep in the Shrine - Forgotten Twilight
    Description:         皮卡啾遠征
*/
var status = -1;
var maxCount = 5;

function start() {
    if (cm.getPlayer().getLevel() < 120) {
        cm.sendOk("你的等級小於120,不能挑戰皮卡啾!");
        cm.dispose();
        return;
    }
    if (cm.getPlayer().getClient().getChannel() != 1) {
        cm.sendOk("挑戰皮卡啾請到1頻道!");
        cm.dispose();
        return;
    }
    var em = cm.getEventManager("PinkBeanBattle");
    if (em == null) {
        cm.sendOk("腳本錯誤，請聯繫管理員。");
        cm.dispose();
        return;
    }
    var eim_status = em.getProperty("state");
    var data = cm.getPQLog("皮卡啾");
    if (eim_status == null || eim_status.equals("0")) {
        var squadAvailability = cm.getSquadAvailability("PinkBean"); //獲取遠征隊伍的狀態 -1返回會有
        if (squadAvailability == -1) {
            status = 0;
            if (data >= maxCount && !cm.getPlayer().isGm()) {
                cm.sendOk("您今天挑皮卡啾的次數已經用完，請明天在來挑戰吧！");
                cm.dispose();
                return;
            }
            cm.sendYesNo("你要成為皮卡啾遠征隊隊長嗎?");
        } else if (squadAvailability == 1) {
            if (data >= maxCount && !cm.getPlayer().isGm()) {
                cm.sendOk("您今天挑皮卡啾的次數已經用完，請明天在來挑戰吧！");
                cm.dispose();
                return;
            }
            // -1 = Cancelled, 0 = not, 1 = true
            var type = cm.isSquadLeader("PinkBean");
            if (type == -1) {
                cm.sendOk("已經結束了申請。");
                cm.dispose();
            } else if (type == 0) {
                var memberType = cm.isSquadMember("PinkBean");
                if (memberType == 2) {
                    cm.sendOk("你在遠征隊制裁名單不能進行遠征任務.");
                    cm.dispose();
                } else if (memberType == 1) {
                    status = 5;
                    cm.sendSimple("你想做什麼? \r\n#b#L0#加入遠征隊#l \r\n#b#L1#退出遠征隊#l \r\n#b#L2#查看遠征隊成員#l");
                } else if (memberType == -1) {
                    cm.sendOk("你已經是遠征隊成員了.");
                    cm.dispose();
                } else {
                    status = 5;
                    cm.sendSimple("你想做什麼? \r\n#b#L0#加入遠征隊#l \r\n#b#L1#退出遠征隊#l \r\n#b#L2#查看遠征隊成員#l");
                }
            } else {
                status = 10;
                cm.sendSimple("你想做什麼? \r\n#b#L0#查看遠征隊#l \r\n#b#L1#制裁遠征隊成員#l \r\n#b#L2#管理制裁名單#l \r\n#r#L3#開始遠征任務#l");
            }
        } else {
            var eim = cm.getDisconnected("PinkBeanBattle");
            if (eim == null) {
                var squd = cm.getSquad("PinkBean");
                if (squd != null) {
                    if (data >= maxCount && !cm.getPlayer().isGm()) {
                        cm.sendOk("您今天挑皮卡啾的次數已經用完，請明天在來挑戰吧！");
                        cm.dispose();
                        return;
                    }
                    cm.sendYesNo("遠征隊的挑戰已經開始。\r\n" + squd.getNextPlayer());
                    status = 3;
                } else {
                    cm.sendOk("遠征隊的挑戰已經開始。");
                    cm.safeDispose();
                }
            } else {
                cm.sendYesNo("你要繼續進行遠征任務嗎？");
                status = 2;
            }
        }
    } else {
        var eim = cm.getDisconnected("PinkBeanBattle");
        if (eim == null) {
            var squd = cm.getSquad("PinkBean");
            if (squd != null) {
                if (data >= maxCount && !cm.getPlayer().isGm()) {
                    cm.sendOk("您今天挑皮卡啾的次數已經用完，請明天在來挑戰吧！");
                    cm.dispose();
                    return;
                }
                cm.sendYesNo("遠征隊的挑戰已經開始。\r\n" + squd.getNextPlayer());
                status = 3;
            } else {
                cm.sendOk("遠征隊的挑戰已經開始。");
                cm.safeDispose();
            }
        } else {
            cm.sendYesNo("你要繼續進行遠征任務嗎?");
            status = 2;
        }
    }
}

function action(mode, type, selection) {
    switch (status) {
    case 0:
        if (mode == 1) {
            if (cm.registerSquad("PinkBean", 5, " 已經成為皮卡啾遠征隊隊長.請各位英雄在5分鐘內加入遠征隊.否則你將不能進入遠征任務.如果遠征隊5分鐘內沒有進入遠征任務.將會自動註銷遠征隊.")) {
                cm.sendOk("你已經成為了遠征隊隊長.請在5分鐘內召集遠征隊員參加遠征任務.否則將會自動註銷你的遠征隊.");
            } else {
                cm.sendOk("An error has occurred adding your squad.");
            }
        }
        cm.dispose();
        break;
    case 2:
        if (!cm.reAdd("PinkBeanBattle", "PinkBean")) {
            cm.sendOk("由於未知的錯誤，操作失敗。");
        }
        cm.safeDispose();
        break;
    case 3:
        if (mode == 1) {
            var squd = cm.getSquad("PinkBean");
            if (squd != null && !squd.getAllNextPlayer().contains(cm.getPlayer().getName())) {
                squd.setNextPlayer(cm.getPlayer().getName());
                cm.sendOk("副本已經有遠征隊在進行任務了...");
            }
        }
        cm.dispose();
        break;
    case 5:
        if (selection == 0) { // join
            var ba = cm.addMember("PinkBean", true);
            if (ba == 2) {
                cm.sendOk("遠征隊目前為滿員狀態.請稍後再試.");
            } else if (ba == 1) {
                cm.sendOk("你成功加入遠征隊.");
            } else {
                cm.sendOk("你已經是遠征隊成員了.");
            }
        } else if (selection == 1) { // withdraw
            var baa = cm.addMember("PinkBean", false);
            if (baa == 1) {
                cm.sendOk("你成功退出遠征隊.");
            } else {
                cm.sendOk("你已經是遠征隊成員.");
            }
        } else if (selection == 2) {
            if (!cm.getSquadList("PinkBean", 0)) {
                cm.sendOk("由於未知的錯誤，遠征隊拒絕你的操作。");
            }
        }
        cm.dispose();
        break;
    case 10:
        if (mode == 1) {
            if (selection == 0) {
                if (!cm.getSquadList("PinkBean", 0)) {
                    cm.sendOk("由於未知的錯誤，遠征隊拒絕你的操作。");
                }
                cm.dispose();
            } else if (selection == 1) {
                status = 11;
                if (!cm.getSquadList("PinkBean", 1)) {
                    cm.sendOk("由於未知的錯誤，遠征隊拒絕你的操作。");
                    cm.dispose();
                }
            } else if (selection == 2) {
                status = 12;
                if (!cm.getSquadList("PinkBean", 2)) {
                    cm.sendOk("由於未知的錯誤，遠征隊拒絕你的操作。");
                    cm.dispose();
                }
            } else if (selection == 3) { // get insode
                if (cm.getSquad("PinkBean") != null) {
                    var dd = cm.getEventManager("PinkBeanBattle");
                    dd.startInstance(cm.getSquad("PinkBean"), cm.getMap(), "皮卡啾",false);
                } else {
                    cm.sendOk("由於未知的錯誤，遠征隊拒絕你的操作。");
                }
                cm.dispose();
            }
        } else {
            cm.dispose();
        }
        break;
    case 11:
        cm.banMember("PinkBean", selection);
        cm.dispose();
        break;
    case 12:
        if (selection != -1) {
            cm.acceptMember("PinkBean", selection);
        }
        cm.dispose();
        break;
    }
}