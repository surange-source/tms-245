/* 阿杜比斯
 * 地點: 殘暴炎魔門口 (211042300)
 */
var status = -1;
var select = -1;
var zakumMode = -1;

function start() {
    if (cm.getPlayer().getLevel() >= 50) {
        cm.sendSimple("哦......很好。看來你們已經完全具備了資格。你們打算做什麼呢? \r\n#b#L0#去調查廢礦洞穴。#l\r\n#b#L1#探察殘暴炎魔副本。#l\r\n#b#L2#領取要獻給殘暴炎魔的祭品。#l\r\n#b#L3#移動到冰峰雪域。#l");
    } else {
        cm.sendOk("按照你目前的情況，你還不能滿足進行這項任務的能力，當你變的強大的時候，再來找我吧！");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status < 1) {
            cm.dispose();
            return;
        } else if (status == 3) {
            if (zakumMode == 1) {
                cm.sendOk("那好吧......不過你得明白, 沒有#b#t4001017##k的話, 是無法見到BOSS的。");
                cm.dispose();
                return;
            }
        }
        status--;
    }

    if (status == 0) {
        if (select == -1)
            select = selection;
        if (select == 0) {
            if (cm.getParty() == null) { 
                cm.sendNext("你沒有處於組隊狀態啊。你必須組成組隊才能進行挑戰。");
                cm.safeDispose();
                return;
            } else if (!cm.isLeader()) {
                cm.sendNext("你不是組隊長，請讓你的組隊長和我談話。");
                cm.safeDispose();
                return;
            } else {
                var party = cm.getParty().getMembers();
                mapId = cm.getMapId();
                var next = true;
                for (var i = 0; i < party.size(); i++) {
                    if ((party.get(i).getLevel() < 50) || (party.get(i).getMapid() != mapId)) {
                        next = false;
                    }
                }
                if (next) {
                    var em = cm.getEventManager("ZakumPQ");
                    if (em == null) {
                        cm.sendOk("我不能讓你進入這個未知的世界，因為管理員還沒有準備好開放。");
                    } else {
                        var prop = em.getProperty("state");
                        if (prop.equals("0") || prop == null) {
                            em.startInstance(cm.getParty(), cm.getMap());
                        } else {
                            cm.sendOk("另一個組隊已經開始了調查任務，請稍後再來。");
                        }
                    }
                    cm.dispose();
                } else {
                    cm.sendNext("請確保你所有組隊員都達到50級以上。");
                    cm.dispose();
                }
            }
        } else if (select == 1) {
            cm.sendNext("很好!現在開始，你們將會移動到充滿許多艱難險阻的地圖。祝你們好運!!");
        } else if (select == 2) {
            cm.sendSimple("你需要把祭品獻給哪個殘暴炎魔呢? \r\n#b#L0#簡單殘暴炎魔#l\r\n#L1#普通/進階殘暴炎魔#l");
        } else if (select == 3) {
            cm.sendNext("那麼, 讓我來送你去冰峰雪域吧。");
        }
    } else if (status == 1) {
        if (select == 1) {
            cm.warp(280020000, 0); 
            cm.dispose();
        } else if (select == 2) {
            if (zakumMode == -1)
                zakumMode = selection;
            if (zakumMode == 0) {
                if (cm.haveItem(4001796)) {
                    cm.sendOk("你已經擁有要獻給簡單殘暴炎魔的祭品#b#t4001796##k了啊......等你用完了再來告訴我吧。");
                    cm.dispose();
                } else {
                    cm.sendNext("必須有需要獻給簡單殘暴炎魔的祭品才行啊......");
                }
            } else if (zakumMode == 1) {
                if (cm.haveItem(4001017)) {
                    cm.sendOk("你已經擁有要獻給普通/進階殘暴炎魔的祭品#b#t4001017##k了啊......等你用完了再來告訴我吧。");
                    cm.dispose();
                } else {
                    cm.sendNext("必須有需要獻給普通/進階殘暴炎魔的祭品才行啊......");
                }
            }
        } else if (select == 3) {
            cm.sendNextPrev("如過你想再次來到這裡，那就請和冰峰雪域的長老對話吧。");
        }
    } else if (status == 2) {
        if (select == 2) {
            if (zakumMode == 0) {
                cm.sendNextPrev("不過, 我有很多在召喚殘暴炎魔時所需的祭品--#b#t4001796##k, 所以就給你一些吧。");
            } else if (zakumMode == 1) {
                cm.sendNextPrev("不過, 我有很多可在召喚普通/進階殘暴炎魔時使用的祭品--#b#t4001017##k, 所以就給你一些吧。");
            }
        } else if (select == 3) {
            cm.warp(211000000);
            cm.dispose();
        }
    } else if (status == 3) {
        if (select == 2) {
            if (zakumMode == 0) {
                cm.sendNextPrev("你把這個放入簡單殘暴炎魔的祭壇中, 就可以了。");
            } else if (zakumMode == 1) {
                cm.sendNextPrev("把這個放入殘暴炎魔的祭壇中, 就可以了。");
            }
        }
    } else if (status == 4) {
        if (select == 2) {
            if (zakumMode == 0) {
                cm.gainItem(4001796, 1);
                cm.dispose();
            } else if (zakumMode == 1) {
                cm.gainItem(4001017, 1);
                cm.dispose();
            }
        }
    }
}
