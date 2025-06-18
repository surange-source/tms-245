var status = 0;
var minLevel = 180;
var maxLevel = 275;
var minPartySize = 1;
var maxPartySize = 1;

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
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendSimple("#e#d<金豬保衛戰>#n\r\n#k唉……最近有好多殘暴的野豬來我的養豬場搗亂，你能幫我趕走它們嗎？\r\n#b#L0#開始挑戰#l\r\n#L1#副本介紹#l\r\n")
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getPQLog("保衛金豬")>=2) {
                    cm.sendOk("您今日的次數已經使用完了，無法再進入副本。");
                    cm.dispose();
                } else if (cm.getParty() == null) { // 沒有組隊
                    cm.sendOk("請組隊後和我談話。");
                    cm.dispose();
                } else if (!cm.isLeader()) { // 不是隊長
                    cm.sendOk("請叫隊長和我談話。");
                    cm.dispose();
                } else {
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
                        var em = cm.getEventManager("Yzc");
                        if (em == null) {
                            cm.sendOk("此任務正在建設當中。");
                        } else {
                            if (cm.getPlayerCount(866010454) == 0) {
                                em.startInstance(cm.getParty(), cm.getMap());
                                cm.setPQLog("保衛金豬");
                                cm.worldSpouseMessage(0x15, "『保衛金豬』：玩家 " + cm.getChar().getName() + " 受蔣老闆之托，開始清掃野豬。");
                                cm.dispose();
                                return;
                            } else {
                                cm.sendOk("目前該頻道已經有人在副本當中，請換個頻道重新進入。");
                                cm.dispose();
                            }
                        }
                        cm.dispose();
                    } else {
                        cm.sendOk("請確認你的組隊員：\r\n\r\n#b1、組隊員必須要" + minPartySize + "人以上，" + maxPartySize + "人以下。\r\n2、組隊員等級必須要在" + minLevel + "級以上。\r\n\r\n（#r如果仍然錯誤, 重新下線,再登陸 或者請重新組隊。#k#b）");
                        cm.dispose();
                    }
                } //判斷組隊
            } else if (selection == 1) {
                cm.sendOk("在金豬保衛戰中，你需要消滅入侵的#b殘暴野豬#k，保護#b金豬#k不受到傷害，如果你不小心打死了#b金豬#k則任務失敗。在副本限定的#r10分鐘#k內，消滅的野豬越多，獎勵也會越多。");
                cm.dispose();
            } else if (selection == 2) {
                cm.warp(910000000, 0)
                cm.sendOk("難道你不想挑戰一下自己嗎？？")
                cm.dispose();
            }
        }
    }
}