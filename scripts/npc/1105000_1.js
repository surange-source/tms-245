/*
    創建終極冒險家
*/
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        if (!cm.isQuestFinished(20616)) {
            cm.forceCompleteQuest(20616);
        }
        if (cm.isQuestFinished(20734)) {
            cm.sendNext("對不起，該角色已經創建過終極冒險家。");
            cm.dispose();
        } else if (cm.getJob() == 1112 || cm.getJob() == 1212 || cm.getJob() == 1312 || cm.getJob() == 1412 || cm.getJob() == 1512) {
            cm.sendNext("您好，騎士團長。現在楓之谷世界面臨非常危險的情況。要想防止黑魔法師侵犯這裡，需要更多的兵力。為了讓士兵們變得更強，我決定和冒險家長老們合力，培養出了比冒險家更強的終極冒險家。");
        } else {
            cm.sendNext("對不起，只有四轉的騎士團職業才能創建終極冒險家。");
            cm.dispose();
        }
    } else if (status == 1) {
        cm.sendYesNo("終極冒險家一出生就是50級，並且擁有特殊的技能。怎麼樣？您將以終極冒險家的面貌獲得重生嗎？");
    } else if (status == 2) {
        if (!cm.getClient().canMakeCharacter(cm.getPlayer().getWorld())) {
            cm.sendOk("您的角色欄不足，無法創建更多的角色。");
        } else {
            cm.sendUltimateExplorer();
        }
        cm.dispose();
    }
}
