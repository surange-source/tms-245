var status = 0;
var minLevel = 200;
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
        if (mode == 1) status++;
        else status--;
    if (cm.getPlayer().getClient().getChannel() == 1 || cm.getPlayer().getClient().getChannel() == 2 || cm.getPlayer().getClient().getChannel() == 3 || cm.getPlayer().getClient().getChannel() == 4) {
        if (cm.getMapId() == 540010001) {
        if (status == 0) {
            cm.sendSimple("#e#d[全民飛機大戰]#k#n:\r\n\r\n\r\n#b由馬來西亞國際航班[MH360]開往吉隆坡起航全程30分鐘，飛機上面有一個金蛋，消滅後會機率性掉落140、150裝備，以及必掉落大量方塊等等。在飛機上可以輸入 #e#r@mob#k#n#b 查看怪物血量，但是如果消滅不了請在最後1分鐘下飛機領取安慰獎勵。\r\n\r\n#r任務要求：\r\n\r\n1). 組隊員等級必須要在" + minLevel + "級以上。\r\n2). 組隊員必須要" + minPartySize + "人前往#b\r\n\r\n#L0#[MH360]飛機大作戰#l\r\n")
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getParty() == null) { // 沒有組隊
                    cm.sendOk("請組隊後和我談話。");
                    cm.dispose();
                } else if (cm.getParty().getMembers().size() < 1){
                    cm.sendOk("對不起，此次挑戰必須至少有1名隊員,且不能大於1個人."); 
                    cm.dispose();
                } else if (cm.getMap(540010101).getCharactersSize() > 0) {
                    cm.sendOk("本次航班已經飛走了，請等待下次班機。或者換線嘗試..");
                    cm.dispose();
                } else if (!cm.isLeader()) { // 不是隊長
                    cm.sendOk("隊長必須在這裡。請讓他和我說話。");
                    cm.dispose();
                    } else  {
        if (cm.getPQLog("航空") < 1 && cm.getEventCount("航空") < 1){
        if (cm.checkPartyEventCount("航空",1)){
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
                        var em = cm.getEventManager("ZChaosPQ2");
                        if (em == null) {
                            cm.sendOk("此任務正在建設當中。");
                        } else {
                            var prop = em.getProperty("state");
                            if (prop.equals("0") || prop == null) {
                                em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 198);
                                cm.setPQLog("航空");
                cm.setEventCount("航空");
                                cm.dispose();
                                return;
                            } else {
                                cm.sendOk("[全民飛機大戰]飛機上已經有人了，請稍等！");
                            }
                        }
                        cm.dispose();
                    } else {
                        cm.sendOk("請確認你的組隊員：\r\n\r\n#b1、組隊員必須要" + minPartySize + "人以上，" + maxPartySize + "人以下。\r\n2、組隊員等級必須要在" + minLevel + "級以上。\r\n\r\n（#r如果仍然錯誤, 重新下線,再登陸 或者請重新組隊。#k#b）");
                        cm.dispose();
                    }
                } else {
            cm.sendOk("請檢查隊伍中是否存在已完成次數#b隊員#k。");
            cm.dispose();
            }
                } else {
            cm.sendOk("對不起，該帳號每天只能進入1次。");
            cm.dispose();
            }
        } //判斷組隊
            } else if (selection == 1) {
                cm.sendOk("請確認你的組隊員：\r\n\r\n#b1、組隊員必須要" + minPartySize + "人以上，" + maxPartySize + "人以下。\r\n2、組隊員等級必須要在" + minLevel + "級以上。\r\n\r\n（#r如果仍然錯誤, 重新下線,再登陸 或者請重新組隊。#k#b）");
                cm.dispose();
            }
        }
    } else {
         var pt = cm.getEventManager("ZChaosPQ2");
         var times = pt.getInstance("ZChaosPQ2").getTimeLeft();
          if(times < (1000 * 60 * 2)){
        cm.warp(540010001);
        cm.gainItem(4310129, 100);
        cm.gainItem(5062009, 2);
        cm.gainItem(5062500, 2);
        cm.gainItem(5064000, 1);
        cm.setEventCount("航空");
        cm.worldSpouseMessage(0x20,"[全民飛機大戰] ：恭喜玩家 "+ cm.getChar().getName() +" 下飛機啦,獲得豪華禮包一個。");
        } else {
                cm.sendOk("你提前下機,無法得到任何獎勵哦!\r\n下飛機後可獲得#b#t5062009##kx2、#b#t5062500##kx2、#b#t5064000##kx1、#b#t4310129##kx100。\r\n#r註：副本時間小於2分鐘的時候可以點擊我完成任務返回地面.");
            }
        cm.dispose();
    }
         } else {
                cm.dispose();
                cm.sendOk("只有在1,2,3,4頻道才可以參加[MH360]飛機擊蛋任務。");
    }
    }
}