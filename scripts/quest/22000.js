var status = -1;

function start(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (type == 1 && mode == 0) {
            status -= 2;
        } else {
            qm.sendNext("嗯？不想告 尤塔 嗎？真是，兄弟之間應該好好相處嘛。");
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        qm.sendNext("醒了嗎，小不點？");
    } else if (status == 1) {
        qm.PlayerToNpc("#b嗯……媽媽也醒了嗎？#k");
    } else if (status == 2) {
        qm.sendNextPrev("嗯……但是你怎麼好像沒睡著呢？昨天晚上打了一夜的雷。所以才沒睡好嗎？");
    } else if (status == 3) {
        qm.PlayerToNpc("#b不，不是因為那個，是因為做了一個奇怪的夢。#k");
    } else if (status == 4) {
        qm.sendNextPrev("奇怪的夢，夢見什麼呢？");
    } else if (status == 5) {
        qm.PlayerToNpc("#b嗯……#k");
    } else if (status == 6) {
        qm.PlayerToNpc("#b(說明夢見在迷霧中遇到龍的事情。)");
    } else if (status == 7) {
        qm.sendYesNo("呵呵呵呵，龍？怎麼會夢到這個呢？沒被吃掉，真是太好了。你做了個有趣的夢，去告訴 尤塔 吧。他一定會很高興的。");
    } else if (status == 8) {
        qm.forceStartQuest();
        qm.sendNext("#b尤塔#k 去 #b前院#k 給獵犬餵飯了。從家裡出去就能見到他了。");
    } else if (status == 9) {
        qm.evanTutorial("UI/tutorial/evan/1/0", 1);
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
        qm.sendNext("哦，起來啦，小不點？大清早的，怎麼這麼大的黑眼圈啊？晚上沒睡好嗎？什麼？做了奇怪的夢？什麼夢啊？嗯？夢見遇到了龍？");
    } else if (status == 1) {
        qm.sendNextPrev("哈哈哈哈～龍？不得了。居然夢到了龍！但是夢裡有狗嗎？哈哈哈哈～\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 20 exp");
    } else if (status == 2) {
        qm.gainExp(20);
        qm.evanTutorial("UI/tutorial/evan/2/0", 1);
        qm.forceCompleteQuest();
        qm.dispose();
    }
}
