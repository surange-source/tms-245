/*
 * 粉紅色是不是變得太強了呢？
 * 天使破壞者3轉
 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 9) {
            qm.sendNext("剛剛那個正義勇士跑哪裡去了？");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNextS("#p3000018#，最近我使用技能時，粉紅色光芒似乎更強烈了呢。", 2);
    } else if (status == 1) {
        qm.sendNextPrev("那是當然。我激活這股力量時，它就變成了我最喜歡的顏色。這種現象說明你已經逐漸能熟練運用我的力量了。");
    } else if (status == 2) {
        qm.sendNextPrevS("粉紅色沒什麼不好……可這似乎有點太粉了吧。", 2)
    } else if (status == 3) {
        qm.sendNextPrev("那就放棄咯，放棄的話就沒煩惱了。");
    } else if (status == 4) {
        qm.sendNextPrevS("沒辦法嗎？", 2)
    } else if (status == 5) {
        qm.sendNextPrev("先不說這個，看來你已經能感覺到自己越來越能得心應手地控制這股力量。是時候再次提升你能力值的極限了。");
    } else if (status == 6) {
        qm.sendNextPrevS("你說的是之前提過的靈魂的默契嗎？", 2)
    } else if (status == 7) {
        qm.sendNextPrev("對，怎麼樣？你會成為真正的粉色天使。");
    } else if (status == 8) {
        qm.sendNextPrevS("這個嘛，我怎麼想都覺得不太好額……", 2)
    } else if (status == 9) {
        qm.askAcceptDeclineNoESC("你應該摒棄偏見。一句話，你想變強吧？");
    } else if (status == 10) {
        if (qm.getJob() == 6510) {
            qm.changeJob(6511);
        }
        if (!qm.haveItem(1142497, 1)) {
            qm.gainItem(1142497, 1);
        }
        qm.forceCompleteQuest();
        qm.sendNextS("哇啊！我好像變強了呢！", 2);
        qm.dispose();
    }
}
