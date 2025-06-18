var status = -1;

function start(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (type == 1 && mode == 0) {
            status -= 2;
        } else {
            qm.sendNext("你，不願意去嗎？你想看到哥哥我被狗咬嗎？快重新和我說話，接受任務！");
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        qm.sendNext("一大早就來開玩笑，哈哈哈。別亂說了，快去給#p1013102#餵飯吧。");
    } else if (status == 1) {
        qm.PlayerToNpc("#b嗯？那不是#p1013101#的事情嗎？");
    } else if (status == 2) {
        qm.sendYesNo("你這傢伙！快去餵呀！！ #p1013102#有多討厭我，你也知道。哥哥我去的話，它一定會咬我的。獵犬喜歡你，你去給它送飯。");
    } else if (status == 3) {
        qm.gainItem(4032447, 1);
        qm.sendNext("你快到#b左邊#k去給 #b#p1013102##k 餵飼料。那個傢伙好像肚子餓了，從剛才開始就一直在叫。");
        qm.forceStartQuest();
    } else if (status == 4) {
        qm.sendPrev("給#p1013102#喂完食之後，趕快回來。");
        qm.dispose();
    }
}

function end(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (type == 1 && mode == 0) {
            status -= 2;
        } else {
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        qm.sendNext("#b(You place food in Bulldog's bowl.)#k");
    } else if (status == 1) {
        qm.sendOk("#b(Bulldog is totally sweet. Utah is just a coward.)#k\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 35 exp");
    } else if (status == 2) {
        qm.forceCompleteQuest();
        qm.gainItem(4032447, -1);
        qm.gainExp(35);
        qm.sendOk("#b(Looks like Bulldog has finished eating. Return to Utah and let him know.)#k");
        qm.dispose();
    }
}
