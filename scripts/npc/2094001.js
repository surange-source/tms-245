var status = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else
        status--;
    if (status == 0) {
        cm.removeAll(4001117);
        cm.removeAll(4001120);
        cm.removeAll(4001121);
        cm.removeAll(4001122);
        cm.sendSimple("#b#L0#帶我離開這裡.#l\r\n#L1#交換海盜帽子.#l#k");
    } else if (status == 1) {
        if (selection == 0) {
//            var maple = Math.floor(Math.random() * 10) + 20;
            if (!cm.canHold(4001455, 1)) {//|| !cm.canHold(4001126, maple)
                cm.sendOk("請清理背包空間.");
                cm.dispose();
                return;
            }
            /*if (!cm.canHold(4001713, 1)) {
             cm.sendOk("請清理其他空間!");
             cm.dispose();
             return;
             }
             cm.gainItem(4001713, 1);*/
            cm.gainItem(4001455, 1);
//            cm.gainItem(4001126, maple);
            cm.setEventCount("Pirate");
            if (cm.getEventCount("Pirate") <= 10) {
                cm.gainNX(2, 1000);
            } else {
                cm.playerMessage(-5, "當天帳號在此副本已經額外獲得10次楓點獎勵,次數已經用完。");
            }
            cm.addTrait("will", 15);
            cm.gainExp_PQ(120, 2.0);
            cm.gainPlayerPoints(Math.floor(Math.random() * 40) +10);
            cm.getPlayer().endPartyQuest(1204);
            cm.warp(251010404, 0);
        } else { //TODO JUMP
            if (cm.haveItem(cm.isGMS() ? 1003267 : 1002573, 1)) {
                cm.sendOk("You have the best hat.");
            } else if (cm.haveItem(1002573, 1)) {
                if (cm.haveItem(4001455, 20)) {
                    if (cm.canHold(1003267, 1)) {
                        cm.gainItem(1002573, -1);
                        cm.gainItem(4001455, -20);
                        cm.gainItem(1003267, 1);
                        cm.sendOk("我已經把帽子給你了.");
                    } else {
                        cm.sendOk("請騰出空間.");
                    }
                } else {
                    cm.sendOk("你需要20個海盜PQ才能得到下一個帽子.");
                }
            } else if (cm.haveItem(1002572, 1)) {
                if (cm.haveItem(4001455, 20)) {
                    if (cm.canHold(1002573, 1)) {
                        cm.gainItem(1002572, -1);
                        cm.gainItem(4001455, -20);
                        cm.gainItem(1002573, 1);
                        cm.sendOk("我已經把帽子給你了.");
                    } else {
                        cm.sendOk("請騰出空間.");
                    }
                } else {
                    cm.sendOk("你需要20個海盜PQ才能得到下一個帽子.");
                }
            } else {
                if (cm.haveItem(4001455, 20)) {
                    if (cm.canHold(1002572, 1)) {
                        cm.gainItem(4001455, -20);
                        cm.gainItem(1002572, 1);
                        cm.sendOk("I have given you the hat.");
                    } else {
                        cm.sendOk("Please make room.");
                    }
                } else {
                    cm.sendOk("你需要20個海盜PQ才能得到下一個帽子.");
                }
            }
        }
        cm.dispose();
    }
}
