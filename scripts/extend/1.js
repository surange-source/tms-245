var status = 0;
var minLevel = 180;
var maxLevel = 275;
var minPartySize = 1;
var maxPartySize = 6;

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
    if (cm.getPlayer().getClient().getChannel() == 1 || cm.getPlayer().getClient().getChannel() == 2 || cm.getPlayer().getClient().getChannel() == 3) {
        if (status == 0) {
            cm.sendSimple("- #e#d關在城裡的冒險家#k#n:\r\n\r\n#b副本一共提供十二個關卡,每個關卡各有不同，有上樓，消滅怪物，找出口等等。完成後會解救出被綁架的NPC，同時瘋狂點擊該NPC會獲得獎勵。#k\r\n副本要求：\r\n#r1). 可在1,2,3線可挑戰。\r\n2). 組隊員等級必須要在" + minLevel + "級以上。\r\n3). 組隊員必須要" + minPartySize + "人以上，" + maxPartySize + "人以下。\r\n\r\n#L0#[執行]拯救被困在城裡的冒險家#l")
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getParty() == null) { // 沒有組隊
                    cm.sendOk("請組隊後和我談話。");
                    cm.dispose();
                } else if (!cm.isLeader()) { // 不是隊長
                    cm.sendOk("隊長必須在這裡。請讓他和我說話。");
                    cm.dispose();
                } else if (cm.getMap(921160100).getCharactersSize() || cm.getMap(921160200).getCharactersSize() || cm.getMap(921160300).getCharactersSize() || cm.getMap(921160310).getCharactersSize() || cm.getMap(921160320).getCharactersSize() || cm.getMap(921160330).getCharactersSize() || cm.getMap(921160340).getCharactersSize() || cm.getMap(921160350).getCharactersSize() || cm.getMap(921160400).getCharactersSize() || cm.getMap(921160500).getCharactersSize() || cm.getMap(921160600).getCharactersSize() || cm.getMap(921160700).getCharactersSize() > 0) {
                    cm.sendOk("本次森林保衛戰已經在進行中。請等待或者換線後嘗試..");
                    cm.dispose();
                    } else  {
        if (cm.getEventCount("解救1") < 1){
        //if (cm.checkPartyEventCount("海怪1")){
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
                            var prop = em.getProperty("state");
                            if (prop.equals("0") || prop == null) {
                                em.startInstance(cm.getParty(), cm.getMap(), 198);
                                cm.worldSpouseMessage(0x8, "[系統公告]　　玩家 " + cm.getChar().getName() + " 等級 " + cm.getChar().getLevel() + "　帶隊開始了逃脫任務!");
                                cm.setPartyEventCount("解救1");
                                cm.dispose();
                                return;
                            } else {
                                cm.sendOk("任務裡面已經有人了，請稍等！");
                            }
                        }
                        cm.dispose();
                    } else {
                        cm.sendOk("請確認你的組隊員：\r\n\r\n#b1、組隊員必須要" + minPartySize + "人以上，" + maxPartySize + "人以下。\r\n2、組隊員等級必須要在" + minLevel + "級以上。\r\n\r\n（#r如果仍然錯誤, 重新下線,再登陸 或者請重新組隊。#k#b）");
                        cm.dispose();
                    }
               // } else {
        //    cm.sendOk("請檢查隊伍中是否存在已完成次數#b隊員#k。");
        //    cm.dispose();
        //    }
                } else {
            cm.sendOk("對不起，該帳號每天只能進入1次。\r\n");
            cm.dispose();
            }
        } //判斷組隊
            } else if (selection == 1) {
                cm.sendOk("請確認你的組隊員：\r\n\r\n#b1、組隊員必須要" + minPartySize + "人以上，" + maxPartySize + "人以下。\r\n2、組隊員等級必須要在" + minLevel + "級以上。\r\n\r\n（#r如果仍然錯誤, 重新下線,再登陸 或者請重新組隊。#k#b）");
                cm.dispose();
            }
        }
         } else {
                cm.dispose();
                cm.sendOk("只有在1,2,3頻道才可以參加任務。");
    }
    }
}