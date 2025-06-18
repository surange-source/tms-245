var status = 0;
var section = 0;
var PQLog = "奈特金字塔";
var maxenter = 5;
//questid 29932, infoquest 7760
function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 99 || status <= 1) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 1) {
        if (cm.getMapId() >= 926020001 && cm.getMapId() <= 926020004) {
            var itemid = 4001321 + (cm.getMapId() % 10);
            if (!cm.canHold(itemid)) {
                cm.sendOk("請確認背包其他欄有足夠空間.");
            } else {
                cm.gainItem(itemid, 1);
                cm.warp(cm.getMapId() - 10000, 0);
            }
            cm.dispose();
        } else if (cm.getMapId() >= 926010001 && cm.getMapId() <= 926010004) {
            cm.warp(926010000, 0);
            cm.dispose();
        } else if (cm.getMapId() >= 926010100 && cm.getMapId() <= 926013504) {
            cm.sendYesNo("你想要離開這裡了嗎?");
            status = 99;
        } else {
            cm.sendSimple("我是守護奈特神的金字塔的杜阿特。\r\n\r\n#b#L0#聽取金字塔的介紹。#l\r\n#e#L1#進入金字塔。#l#n\r\n#L2#尋找組隊。#l\r\n#L3#用<奈特的綠寶石>交換其他物品。#l\r\n#L4#查看今日剩餘挑戰次數。#l\r\n");
        }
    } else if (status == 2) {
        section = selection;
        if (selection == 0) {
            cm.sendNext("這裡就是混沌與復仇之神奈特的金字塔。儘管很長時間以來它都隱藏在沙漠深處，但奈特神的意志已然來到了人間。如果不想對將來未知的混沌和死亡感到害怕的話，最好來金字塔挑戰下奈特神的試煉。");
        } else if (selection == 1) {
            cm.sendSimple("你這個無知的傻瓜，那麼請選擇吧！\r\n#L0# #v3994115# #l#L1# #v3994116# #l#L2# #v3994117# #l#L3# #v3994118# #l");
        } else if (selection == 2) {
            //cm.sendSimple("What gem have you brought?\r\n#L0##i4001322##t4001322##l\r\n#L1##i4001323##t4001323##l\r\n#L2##i4001324##t4001324##l\r\n#L3##i4001325##t4001325##l");
            cm.sendNext("打開組隊界面尋找找一個隊伍吧");
            cm.dispose();
        } else if (selection == 3) {
            cm.sendSimple("通過奈特神的考驗，搜集到#e#b#t4001623:##k#n之後，可以交換為其他道具。你想要什麼道具呢？\r\n#b\r\n#L0# #i1132013:# #t1132013# #r(需要#t4001623#40個)#b#l\r\n#L1# #i1072619:# #t1072619# #r(需要#t4001623#40個)#b#l\r\n#L2# #i1112682:# #t1112682# #r(需要#t4001623#40個)#b#l");
        } else if (selection == 4) {
             cm.sendOk("今天剩餘挑戰次數是" + (maxenter - cm.getPQLog(PQLog)) + "次。");
            cm.dispose();
        } else if (selection == 5) {
            var record = cm.getQuestRecord(7760);
            var data = record.getCustomData();
            if (data == null) {
                record.setCustomData("0");
                data = record.getCustomData();
            }
            var mons = parseInt(data);
            if (mons < 50000) {
                cm.sendOk("Please defeat at least 50,000 monsters in the Pyramid and look for me again. Kills : " + mons);
            } else if (cm.canHold(1142142) && !cm.haveItem(1142142)) {
                cm.gainItem(1142142, 1);
                cm.forceStartQuest(29932);
                cm.forceCompleteQuest(29932);
            } else {
                cm.sendOk("Please make room.");
            }
            cm.dispose();
        }
    } else if (status == 3) {
        if (section == 0) {
            cm.sendNext("當你進入金字塔的瞬間，奈特神的試煉就已經開始了。你必須阻止不斷湧現的怪物到達#b#e方尖碑#n#k。從金字塔裡獲得的點數可以用來購買#b眼睛道具#k。");
        } else if (section == 1) {
            var cont_ = false;
            if (selection == 0) { //easy; 40-60
                if (cm.getPlayer().getLevel() < 40) {
                    cm.sendOk("你的等級必須在40以上.");
                } else if (cm.getPlayer().getLevel() > 60) {
                    cm.sendOk("你的等級必須在60以下.");
                } else {
                    cont_ = true;
                }
            } else if (selection == 1) { //normal; 60-80
                if (cm.getPlayer().getLevel() < 60) {
                    cm.sendOk("你的等級必須在60以上.");
                } else if (cm.getPlayer().getLevel() > 80) {
                    cm.sendOk("你的等級必須在80以下.");
                } else {
                    cont_ = true;
                }
            } else if (selection == 2) { //hard; 80-100
                if (cm.getPlayer().getLevel() < 80) {
                    cm.sendOk("你的等級必須在80以上.");
                } else if (cm.getPlayer().getLevel() > 100) {
                    cm.sendOk("你的等級必須在100以下.");
                } else {
                    cont_ = true;
                }
            } else if (selection == 3) { //hell; 61+
                if (cm.getPlayer().getLevel() < 100) {
                    cm.sendOk("你的等級必須在100以上.");
                } else {
                    cont_ = true;
                }
            }
            if (cont_ && cm.isLeader()) {//todo
                if (!cm.isAllPartyMembersAllowedPQ(PQLog, maxenter)) {
                    cm.sendNext("你的隊員#r#e \"" + cm.getNotAllowedPQMemberName(PQLog, maxenter) + "\" #k#n次數已經達到上限了。");
                } else if (!cm.start_PyramidSubway(selection)) {
                    cm.sendOk("奈特神的金字塔當前進行的人數已滿.");
                } else {
                    cm.gainMembersPQ(PQLog, 1);
                }

            } else if (cont_ && !cm.isLeader()) {
                cm.sendOk("需要組成一個隊伍!");
            }
            cm.dispose(); //todo
        } else if (section == 3) {
            var itemid = 4001623;
            var bounse = 0;
            if (selection == 0) {
                bounse = 1132013;
            } else if (selection == 1) {
                bounse = 1072619;
            } else {
                bounse = 1112682;
            }
            if (!cm.haveItem(itemid, 40)) {
                cm.sendOk("奈特的綠寶石差得太多了。想獲得#b#i" + bounse + ":##t" + bounse + "##k的話，至少需要40個。");
            } else {
                cm.gainItem(bounse, 1);
                cm.gainItem(itemid, -40);
            }
            cm.dispose(); //todo
        }
    } else if (status == 4) {
        if (section == 0) {
            cm.sendNext("通過奈特的試煉的人會得到無上的榮耀，在試煉前倒下的人就只好自求多福了。我對你的提醒就到這裡了。剩下的就全憑你自己的實力了。");
            cm.dispose();
        }
    } else if (status == 100) {
        cm.warp(926010000, 0);
        cm.dispose();
    }
}
