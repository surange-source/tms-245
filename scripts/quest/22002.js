var status = -1;

function start(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (type == 1 && mode == 0) {
            status -= 2;
        } else {
            qm.sendNext("嗯？幹嘛？你不想吃早飯了嗎？不吃東西可不好。如果你想吃飯的話，就再來找我。不快點說的話，就要被我吃掉了啊？");
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        qm.sendNext("給#p1013102#餵過飯了嗎？小不點你去吃早飯吧。今天的早飯是#t2022620#。我拿出來了，嘻嘻。事實上，如果你不去給#p1013102#餵食，我就不打算給你早飯吃。");
    } else if (status == 1) {
        qm.sendYesNo("來，給你#b三明治，吃完之後到媽媽那裡去一趟。#k她好像有話要跟你說。");
    } else if (status == 2) {
        qm.forceStartQuest();
        qm.PlayerToNpc("#b(有話要跟我說？先把#t2022620#吃了，然後到屋裡去看看吧。)#k");
        qm.gainItem(2022620, 1);
    } else if (status == 3) {
        qm.evanTutorial("UI/tutorial/evan/3/0", 1);
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
        qm.sendNext("早飯吃了嗎，小不點？你能幫媽媽做件事嗎？\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#i1003028# #t1003028# 1個  \r\n#i2022621# #t2022621# 5個 \r\n#i2022622# #t2022622# 5個 \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 60 exp");
    } else if (status == 1) {
        qm.forceCompleteQuest();
        qm.evanTutorial("UI/tutorial/evan/4/0", 1);
        qm.gainItem(1003028, 1);
        qm.gainItem(2022621, 5);
        qm.gainItem(2022622, 5);
        qm.gainExp(60);
        qm.dispose();
    }
}
