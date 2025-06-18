/*
 * 突破諾巴精髓極限
 * 凱撒2轉
 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.sendPlayerOk("要是不考慮清楚就進行嘗試可能會毀壞諾巴精髓，你好好想清楚。");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendPlayerStart("是修煉的結果嗎？感覺諾巴精髓充滿力量。似乎能擴展一下諾巴精髓的極限值……不如試一試？");
    } else if (status == 1) {
        if (qm.getJob() == 6100) {
            qm.changeJob(6110);
        }
        if (!qm.haveItem(1142485, 1)) {
            qm.gainItem(1142485, 1);
        }
        qm.forceCompleteQuest();
        qm.dispose();
    }
}
