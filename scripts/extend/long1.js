var status = -1;
var maxHorntail = 4;

function start() {
    if (cm.getPlayer().getLevel() < 80) {
        cm.sendOk("你的等級小於80級，不能挑戰闇黑龍王。");
        cm.dispose();
        return;
    }
    if (cm.getPlayer().getClient().getChannel() != 1 && cm.getPlayer().getClient().getChannel() != 2) {
        cm.sendOk("闇黑龍王只能在1、2頻道召喚。");
        cm.dispose();
        return;
    }
    var em = cm.getEventManager("HorntailBattle");
    if (em == null) {
        cm.sendOk("腳本錯誤,請聯繫管理員.");
        cm.dispose();
        return;
    }
    var prop = em.getProperty("state");
    var data = cm.getPQLog("普通黑龍");
    if (prop == null || prop.equals("0")) {
        var squadAvailability = cm.getSquadAvailability("Horntail");
        if (squadAvailability == -1) {
            status = 0;
            if (data >= maxHorntail && !cm.getPlayer().isGm()) {
                cm.sendOk("您今天挑戰闇黑龍王的次數已經用完，請明天在來挑戰吧！");
                cm.dispose();
                return;
            }
            cm.sendYesNo("你要成為闇黑龍王遠征隊隊長嗎?");
        } else if (squadAvailability == 1) {
            if (data >= maxHorntail && !cm.getPlayer().isGm()) {
                cm.sendOk("您今天挑戰闇黑龍王的次數已經用完，請明天在來挑戰吧！");
                cm.dispose();
                return;
            }
            // -1 = Cancelled, 0 = not, 1 = true
            var type = cm.isSquadLeader("Horntail");
            if (type == -1) {
                cm.sendOk("已經結束了申請。");
                cm.dispose();
            } else if (type == 0) {
                var memberType = cm.isSquadMember("Horntail");
                if (memberType == 2) {
                    cm.sendOk("你已經在遠征隊制裁小組.不能進行遠征任務.");
                    cm.dispose();
                } else if (memberType == 1) {
                    status = 5;
                    cm.sendSimple("你想做什麼? \r\n#b#L0#查看遠征隊成員#l \r\n#b#L1#加入遠征隊#l \r\n#b#L2#退出遠征隊#l");
                } else if (memberType == -1) {
                    cm.sendOk("5分鐘結束遠征隊已經自動註銷.請重新註冊");
                    cm.dispose();
                } else {
                    status = 5;
                    cm.sendSimple("你想做什麼? \r\n#b#L0#查看遠征隊成員#l \r\n#b#L1#加入遠征隊#l \r\n#b#L2#退出遠征隊#l");
                }
            } else { // Is leader
                status = 10;
                cm.sendSimple("遠征隊操作: \r\n#b#L0#查看遠征隊成員#l \r\n#b#L1#逐出遠征隊成員#l \r\n#b#L2#查看申請名單#l \r\n#r#L3#開始遠征任務#l");
                // TODO viewing!
            }
        } else {
            var eim = cm.getDisconnected("HorntailBattle");
            if (eim == null) {
                var squd = cm.getSquad("Horntail");
                if (squd != null) {
                    if (data >= maxHorntail && !cm.getPlayer().isGm()) {
                        cm.sendOk("您今天挑戰闇黑龍王的次數已經用完，請明天在來挑戰吧！");
                        cm.dispose();
                        return;
                    }
                    cm.sendYesNo("遠征隊的挑戰已經開始.\r\n" + squd.getNextPlayer());
                    status = 3;
                } else {
                    cm.sendOk("遠征隊的挑戰已經開始.");
                    cm.safeDispose();
                }
            } else {
                cm.sendYesNo("你要繼續進行遠征任務嗎？");
                status = 1;
            }
        }
    } else {
        var eim = cm.getDisconnected("HorntailBattle");
        if (eim == null) {
            var squd = cm.getSquad("Horntail");
            if (squd != null) {
                if (data >= maxHorntail && !cm.getPlayer().isGm()) {
                    cm.sendOk("您今天挑戰闇黑龍王的次數已經用完，請明天在來挑戰吧！");
                    cm.dispose();
                    return;
                }
                cm.sendYesNo("遠征隊的挑戰已經開始.\r\n" + squd.getNextPlayer());
                status = 3;
            } else {
                cm.sendOk("遠征隊的挑戰已經開始.");
                cm.safeDispose();
            }
        } else {
            cm.sendYesNo("你要繼續進行遠征任務嗎？");
            status = 1;
        }
    }
}

function action(mode, type, selection) {
    switch (status) {
    case 0:
        if (mode == 1) {
            if (cm.registerSquad("Horntail", 5, " 已被任命為闇黑龍王遠征隊隊長（普通）。請各位挑戰者在5分鐘內報名.")) {
                cm.sendOk("你已經被任命為闇黑龍王遠征隊隊長。在接下來的5分鐘內，您可以添加遠征隊成員.請盡快加好隊員.超過5分鐘後將會取消遠征隊隊長.");
            } else {
                cm.sendOk("如果你想申請遠征隊的話，那麼就來找我吧。");
            }
        }
        cm.dispose();
        break;
    case 1:
        if (!cm.reAdd("HorntailBattle", "Horntail")) {
            cm.sendOk("由於未知的錯誤，操作失敗。");
        }
        cm.safeDispose();
        break;
    case 3:
        if (mode == 1) {
            var squd = cm.getSquad("Horntail");
            if (squd != null && !squd.getAllNextPlayer().contains(cm.getPlayer().getName())) {
                squd.setNextPlayer(cm.getPlayer().getName());
                cm.sendOk("副本已經有遠征隊在進行任務了...");
            }
        }
        cm.dispose();
        break;
    case 5:
        if (selection == 0) {
            if (!cm.getSquadList("Horntail", 0)) {
                cm.sendOk("由於未知的錯誤，操作失敗。");
            }
        } else if (selection == 1) { // join
            var ba = cm.addMember("Horntail", true);
            if (ba == 2) {
                cm.sendOk("遠征隊員已經達到30名，請稍後再試。");
            } else if (ba == 1) {
                cm.sendOk("你加入了遠征隊.");
            } else {
                cm.sendOk("你已經是遠征隊成員了.");
            }
        } else { // withdraw
            var baa = cm.addMember("Horntail", false);
            if (baa == 1) {
                cm.sendOk("你成功退出了遠征隊.");
            } else {
                cm.sendOk("你還不是遠征隊成員.不能退出遠征隊.");
            }
        }
        cm.dispose();
        break;
    case 10:
        if (mode == 1) {
            if (selection == 0) {
                if (!cm.getSquadList("Horntail", 0)) {
                    cm.sendOk("由於未知的錯誤，遠征隊拒絕你的操作。");
                }
                cm.dispose();
            } else if (selection == 1) {
                status = 11;
                if (!cm.getSquadList("Horntail", 1)) {
                    cm.sendOk("由於未知的錯誤，遠征隊拒絕你的操作。");
                    cm.dispose();
                }
            } else if (selection == 2) {
                status = 12;
                if (!cm.getSquadList("Horntail", 2)) {
                    cm.sendOk("由於未知的錯誤，遠征隊拒絕你的操作。");
                    cm.dispose();
                }
            } else if (selection == 3) { // get insode
                if (cm.getSquad("Horntail") != null) {
                    var dd = cm.getEventManager("HorntailBattle");
                    dd.startInstance(cm.getSquad("Horntail"), cm.getMap(), "普通黑龍",false);
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
        cm.banMember("Horntail", selection);
        cm.dispose();
        break;
    case 12:
        if (selection != -1) {
            cm.acceptMember("Horntail", selection);
        }
        cm.dispose();
        break;
    default:
        cm.dispose();
        break;
    }
}