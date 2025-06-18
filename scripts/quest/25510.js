/*
 * 尋找第3條路
 * 夜光2轉
 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNextNoESC("夜光法師，我知道這樣做很突兀，但請你集中精力相信我。我要喚醒夜光法師身上的光之力量，引導出你體內的黑暗力量。如果成功的話，夜光法師就不用再被黑暗力量束縛了。");
    } else if (status == 1) {
        qm.PlayerToNpc("(感覺飛魚丸的聲音好像緩緩的包裹住了我體內的黑暗力量。)");
    } else if (status == 2) {
        qm.PlayerToNpc("黑暗力量不再侵蝕我的靈魂了呢。這都是你的功勞。");
    } else if (status == 3) {
        qm.sendNextPrevS("過獎了。這一切都要歸功於夜光法師你想要戰勝黑暗力量的堅強意志。我只是在旁邊幫了點小忙而已。這個你應該知道，是能夠自由出入希利尼提的極光三稜鏡。收下吧。", 1);
    } else if (status == 4) {
        if (qm.getJob() == 2700) {
            qm.changeJob(2710);
        }
        if (!qm.haveItem(2430874, 1)) {
            qm.gainItem(2430874, 1);
        }
        qm.forceCompleteQuest();
        qm.dispose();
    }
}
