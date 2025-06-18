var status = 0;
var minLevel = 45;
var maxLevel = 275;
var minPartySize = 1;
var maxPartySize = 1;
var maxPlay = 5;

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
            cm.sendSimple("#e<挑戰任務：納希沙漠競技場>#n\r\n在進入就是納希沙漠的競技場了，你想挑戰自己嗎？如果你想挑戰的話請選出你們的隊長，然後和我談話……。\r\n\r\n每天可完成#r"+maxPlay+"#k次，您今天已經參與了#r"+cm.getPQLog("納希沙漠競技場")+"次#k\r\n#b#L0#我想執行組隊任務。#l\r\n#L1#我想聽一下說明。#l")
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getPQLog("納希沙漠競技場") >= maxPlay) {
                    cm.sendOk("今天你已經參與了"+maxPlay+"次，不能再參與該副本了！請明天趕早~");
                    return;
                }
                if (cm.getParty() == null) { // 沒有組隊
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
                        var em = cm.getEventManager("AliantSystem");
                        if (em == null) {
                            cm.sendOk("此任務正在建設當中。");
                        } else {
                            if (cm.getPlayerCount(980010101) == 0) {
                                em.startInstance(cm.getParty(), cm.getMap());
                                cm.worldMessage("[組隊任務] " + cm.getChar().getName() + "  帶領著他的隊伍進入了納希沙漠競技場！");
                                cm.setPQLog("納希沙漠競技場");
                                cm.dispose();
                                return;
                            } else {
                                cm.sendOk("目前該頻道已經有人在競技場，請換個頻道重新進入。");
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
                cm.sendOk("請確認你的組隊員：\r\n\r\n#b1、組隊員必須要" + minPartySize + "人以上，" + maxPartySize + "人以下。\r\n2、組隊員等級必須要在" + minLevel + "級以上。\r\n\r\n（#r如果仍然錯誤, 重新下線,再登陸 或者請重新組隊。#k#b）");
                cm.dispose();
            } else if (selection == 2) {
                cm.warp(910000000, 0)
                cm.sendOk("難道你不想挑戰一下自己嗎？？")
                cm.dispose();
            }
        }
    }
}