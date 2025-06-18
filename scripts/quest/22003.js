var status = -1;

function start(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (type == 1 && mode == 0) {
            status -= 2;
        } else {
            qm.sendNext("不要覺得麻煩就不願意去。你是個好孩子，對吧？再來和我說話吧。");
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        qm.sendYesNo("去農場幹活的時候，#b爸爸#k忘了把便當帶過去了。你能去 #b#m100030300##k 給爸爸送#b便當#k嗎？");
    } else if (status == 1) {
        qm.forceStartQuest();
        qm.sendNext("呵呵，小不點果然是個好孩子～#b從家裡出去後，往左邊走。#k爸爸一定餓極了，你最好快點給他送過去。");
        if (!qm.haveItem(4032448)) {
            qm.gainItem(4032448, 1);
        }
    } else if (status == 3) {
        qm.sendNextPrev("如果不小心把便當弄丟了，就馬上回來。我再給你包一份。");
    } else if (status == 4) {
        qm.evanTutorial("UI/tutorial/evan/5/0", 1);
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.dispose();
}
