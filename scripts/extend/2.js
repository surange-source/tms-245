var status = 0;
var minLevel = 100;
var maxLevel = 275;
var minPartySize = 1;
var maxPartySize = 6;
var maxBloody = 1000;

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
        if (mode == 1) status++;
        else status--;
        if (status == 0) {
            cm.sendSimple("#e<魯塔比斯南部庭院大門入口 - 普通模式>#n\r\n你想和隊員們一起努力，完成任務嗎？這裡面有很多如果不同心協力就無法解決的障礙……如果想挑戰的話，請讓#b所屬組隊的隊長#k來和我說話。\r\n#b#L0#我想執行組隊任務。#l\r\n#L1#我想聽一下說明。#l")
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getParty() == null) { // 沒有組隊
                    cm.sendOk("請組隊後和我談話。");
                    cm.dispose();
                } else if (!cm.isLeader()) { // 不是隊長
                    cm.sendOk("隊長必須在這裡。請讓他和我說話。");
                    cm.dispose();
                    } else  {
        if (cm.getPQLog("普通血腥女皇") < maxBloody){
                    var party = cm.getParty().getMembers();
                    var mapId = cm.getPlayer().getMapId();
                    var next = true;
                    var levelValid = 0;
                    var inMap = 0;
                    var it = party.iterator();
                    while (it.hasNext()) {
                        var cPlayer = it.next();
                        if ((cPlayer.getLevel() >= minLevel) && (cPlayer.getLevel() <= maxLevel)) {
                            levelValid += 1;
                        } else {
                            next = false;
                        }
                        if (cPlayer.getMapid() == mapId) {
                            inMap += 1;
                        }
                    }
                    if (party.size() < minPartySize || party.size() > maxPartySize || inMap < minPartySize) {
                        next = false;
                    }
                    if (next) {
                        var em = cm.getEventManager("BloodyBoss");
                        if (em == null) {
                            cm.sendOk("此任務正在建設當中。");
                        } else {
                            var prop = em.getProperty("state");
                            if (prop.equals("0") || prop == null) {
                                em.startInstance(cm.getParty(), cm.getMap(), 100);
            cm.setPQLog("普通血腥女皇");
                                cm.dispose();
                                return;
                            } else {
                                cm.sendOk("魯塔比斯南部庭院大門入口 - 普通模式，裡面已經有人了，請稍等！");
                            }
                        }
                        cm.dispose();
                    } else {
                        cm.sendOk("請確認你的組隊員：\r\n\r\n#b1、組隊員必須要" + minPartySize + "人以上，" + maxPartySize + "人以下。\r\n2、組隊員等級必須要在" + minLevel + "級以上。\r\n\r\n（#r如果仍然錯誤, 重新下線,再登陸 或者請重新組隊。#k#b）");
                        cm.dispose();
                    }
                } else {
            cm.sendOk("對不起，一天只能進入2次。");
            cm.dispose();
            }
        } //判斷組隊
            } else if (selection == 1) {
                cm.sendOk("請確認你的組隊員：\r\n\r\n#b1、組隊員必須要" + minPartySize + "人以上，" + maxPartySize + "人以下。\r\n2、組隊員等級必須要在" + minLevel + "級以上。\r\n\r\n（#r如果仍然錯誤, 重新下線,再登陸 或者請重新組隊。#k#b）");
                cm.dispose();
            }
        }
    }
}