/*
            Resonance
    NPC Name:     Minister of Home Affairs
    Map(s):     Mushroom Castle: Corner of Mushroom Forest(106020000)
    Description:     Quest -  越過城牆(2)
*/



var status = -1;

function start(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (type == 1 && mode == 0) {
            status -= 2;
        } else {
            qm.sendNext("我們需要你的幫助。");
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        qm.sendYesNo("就像我剛才告訴你的一樣，剛剛打破的障礙不值得慶祝，這是因為企鵝王國禁止讓所有人進入城堡，嗯。。得找出另外一種潛入方式。");
    } else if (status == 1) {
        qm.sendNext("路過蘑菇森林，當你到屏障的時候，就可以走進城牆了，祝你好運。");
    } else if (status == 2) {
        qm.forceStartQuest();
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
        qm.sendOk("嗯。。可能他們已經關閉大門。");
    } else if (status == 1) {
        qm.gainExp(11000);
        qm.sendOk("幹得好，太謝謝你了。");
        qm.forceCompleteQuest();
        qm.dispose();
    }
}
