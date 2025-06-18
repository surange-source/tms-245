/*
    任務: 佈雷茲制動器！
    描述: #o9400295#還活著……！為了阻止他必須趕到2102年的核心商業區，我需要詢問曾經去過商貿中心的#p9120033#，學了通往商貿中心的路。難免會有一場激戰…必須下定決心。
*/
var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        }
        if (status == 0) {
            qm.sendNext("Okay, so you are going to the battle as well. Thanks... Just letting you know, the enemy is probably more powerful than anything you've ever faced, Are you ready?");
        } else if (status == 1) {
            qm.warp(802000800, 0);
            qm.forceStartQuest();
            qm.dispose();
        }
    }
}

function end(mode, type, selection) {
}
