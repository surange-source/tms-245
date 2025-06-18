/*
 * 最終覺醒凱撒！
 * 凱撒3轉
 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.sendPlayerOk("面臨著最終覺醒，覺得很緊張啊……");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendPlayerStart("諾巴精髓充滿了力量。要不要試試進行最終覺醒？據說如果最終覺醒成功，就能變身為凱撒的最終面貌……真的可以嗎？");
    } else if (status == 1) {
    if (qm.getJob() == 6110) {
        qm.changeJob(6111);
    }
        if (!qm.haveItem(1142486, 1)) {
            qm.gainItem(1142486, 1);
        }
    qm.forceCompleteQuest();
        qm.sendPlayerOk("成功了！現在你可以變身為凱撒的最終面貌。同時還可以使用更強力多樣的攻擊技能。");
        qm.dispose();
    }
}
