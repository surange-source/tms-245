var points;
var count = 5;
var PQLog = "BOSS競技";
function start() {
    var record = cm.getEventManager("bossQuest");
    points = record == null ? "0" : record;
    var pqtry = count - cm.getPQLog(PQLog);
    cm.sendSimple("這裡可以進行BOSS對抗!當前還能進行：#r" + pqtry + "#k次，請選擇難度: \r\n\r\n #b#L0# #v03994115##l #L1# #v03994116##l #L2# #v03994117##l #L28# #v03994118##l");
}

function action(mode, type, selection) {
    if (mode == 1) {
        switch (selection) {
            case 0:
                if (cm.getParty() != null) {
                    if (cm.getDisconnected("BossQuestEASY") != null) {
                        cm.getDisconnected("BossQuestEASY").registerPlayer(cm.getPlayer());
                    } else if (!cm.isAllPartyMembersAllowedPQ(PQLog, 5)) {
                        cm.sendOk("你的隊員#r#e \"" + cm.getNotAllowedPQMemberName(PQLog, count) + "\" #k#n次數已經達到上限了。");
                        cm.dispose();
                    } else if (cm.isLeader()) {
                        var party = cm.getPlayer().getParty().getMembers();
                        var mapId = cm.getPlayer().getMapId();
                        var next = true;
                        var it = party.iterator();
                        while (it.hasNext()) {
                            var cPlayer = it.next();
                            var ccPlayer = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
                            if (ccPlayer == null || ccPlayer.getLevel() < 70) {
                                next = false;
                                break;
                            }
                        }
                        if (next) {
                            var q = cm.getEventManager("BossQuestEASY");
                            if (q == null) {
                                cm.sendOk("項目正在建設中!");
                            } else {
                                q.startInstance(cm.getParty(), cm.getMap());
                                cm.gainMembersPQ(PQLog, 1);
                            }
                        } else {
                            cm.sendOk("所有隊員必須在70級以上.");
                        }
                    } else {
                        cm.sendOk("我只跟隊長對話!.");
                    }
                } else {
                    cm.sendOk("你並沒有組隊.");
                }
                break;
            case 1:
                if (cm.getParty() != null) {
                    if (cm.getDisconnected("BossQuestMed") != null) {
                        cm.getDisconnected("BossQuestMed").registerPlayer(cm.getPlayer());
                    } else if (!cm.isAllPartyMembersAllowedPQ(PQLog, 5)) {
                        cm.sendOk("你的隊員#r#e \"" + cm.getNotAllowedPQMemberName(PQLog, count) + "\" #k#n次數已經達到上限了。");
                        cm.dispose();
                    } else if (cm.isLeader()) {
                        var party = cm.getPlayer().getParty().getMembers();
                        var mapId = cm.getPlayer().getMapId();
                        var next = true;
                        var it = party.iterator();
                        while (it.hasNext()) {
                            var cPlayer = it.next();
                            var ccPlayer = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
                            if (ccPlayer == null || ccPlayer.getLevel() < 100) {
                                next = false;
                                break;
                            }
                        }
                        if (next) {
                            var q = cm.getEventManager("BossQuestMed");
                            if (q == null) {
                                cm.sendOk("項目正在建設中");
                            } else {
                                q.startInstance(cm.getParty(), cm.getMap());
                                cm.gainMembersPQ(PQLog, 1);
                            }
                        } else {
                            cm.sendOk("所有隊員必須在100級以上.");
                        }
                    } else {
                        cm.sendOk("我只跟隊長對話.");
                    }
                } else {
                    cm.sendOk("請創建一個隊伍.");
                }
                break;
            case 2:
                if (cm.getParty() != null) {
                    if (cm.getDisconnected("BossQuestHARD") != null) {
                        cm.getDisconnected("BossQuestHARD").registerPlayer(cm.getPlayer());
                    } else if (!cm.isAllPartyMembersAllowedPQ(PQLog, 5)) {
                        cm.sendOk("你的隊員#r#e \"" + cm.getNotAllowedPQMemberName(PQLog, count) + "\" #k#n次數已經達到上限了。");
                        cm.dispose();
                    } else if (cm.isLeader()) {
                        var party = cm.getPlayer().getParty().getMembers();
                        var mapId = cm.getPlayer().getMapId();
                        var next = true;
                        var it = party.iterator();
                        while (it.hasNext()) {
                            var cPlayer = it.next();
                            var ccPlayer = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
                            if (ccPlayer == null || ccPlayer.getLevel() < 120) {
                                next = false;
                                break;
                            }
                        }
                        if (next) {
                            var q = cm.getEventManager("BossQuestHARD");
                            if (q == null) {
                                cm.sendOk("項目正在建設中");
                            } else {
                                q.startInstance(cm.getParty(), cm.getMap());
                                cm.gainMembersPQ(PQLog, 1);
                            }
                        } else {
                            cm.sendOk("所有隊員必須在120級以上.");
                        }
                    } else {
                        cm.sendOk("我只跟隊長對話.");
                    }
                } else {
                    cm.sendOk("請創建一個隊伍.");
                }
                break;
            case 28:
                if (cm.getParty() != null) {
                    if (cm.getDisconnected("BossQuestHELL") != null) {
                        cm.getDisconnected("BossQuestHELL").registerPlayer(cm.getPlayer());
                    } else if (!cm.isAllPartyMembersAllowedPQ(PQLog, 5)) {
                        cm.sendOk("你的隊員#r#e \"" + cm.getNotAllowedPQMemberName(PQLog, count) + "\" #k#n次數已經達到上限了。");
                        cm.dispose();
                    } else if (cm.isLeader()) {
                        var party = cm.getPlayer().getParty().getMembers();
                        var mapId = cm.getPlayer().getMapId();
                        var next = true;
                        var it = party.iterator();
                        while (it.hasNext()) {
                            var cPlayer = it.next();
                            var ccPlayer = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
                            if (ccPlayer == null || ccPlayer.getLevel() < 160) {
                                next = false;
                                break;
                            }
                        }
                        if (next) {
                            var q = cm.getEventManager("BossQuestHELL");
                            if (q == null) {
                                cm.sendOk("項目正在建設中");
                            } else {
                                q.startInstance(cm.getParty(), cm.getMap());
                                cm.gainMembersPQ(PQLog, 1);
                            }
                        } else {
                            cm.sendOk("所有隊員必須在160級以上.");
                        }
                    } else {
                        cm.sendOk("我只跟隊長對話.");
                    }
                } else {
                    cm.sendOk("請創建一個隊伍.");
                }
                break;
            case 3:
                cm.sendOk("#b當前擁有的點數: " + points);
                break;
        }
    }
    cm.dispose();
}
