var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 1) {
            qm.sendNext("對於英雄大人而言肯定是有幫助的。請你一定收下。");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendSimple("英、英雄大人……我一直都很想見你。 \r\n#b#L0#（做靦腆狀。）#l");
    } else if (status == 1) {
        qm.askAcceptDecline("我從很久以前就想送英雄大人一件禮物……既然今天遇見了英雄，不知英雄能否賞臉收下我這份薄禮？");
    } else if (status == 2) {
        qm.forceStartQuest();
        qm.sendNextS("製作禮物的材料放在這附近的箱子裡了。勞煩英雄大人找到這個箱子，把#b#t4032309##k和#b#t4032310##k帶來給我。然後我就能立刻把禮物做好。", 1);
    } else if (status == 3) {
        qm.summonMsg(18);
        qm.dispose();
    }
}

function end(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.sendNext("What? You don't want the potion?");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("材料都拿來了嗎？請稍等。這麼混合一樣…… \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v3010062# 1個 #t3010062#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 95 exp");
    } else if (status == 1) {
        if (qm.getQuestStatus(21013) == 1) {
            qm.gainItem(3010062, 1);
            qm.gainExp(95);
            qm.forceCompleteQuest();
        }
        qm.sendNextPrevS("好了，椅子做好了！嘿嘿！就算是英雄肯定也會有需要歇歇的時候，所以我一直想送你一把椅子。", 1);
    } else if (status == 2) {
        qm.sendNextPrevS("我想就算是英雄也不能永遠活力充沛，肯定也有疲勞、睏倦的時候。但真正的英雄是能夠克服萬難取得最後勝利的。", 1);
    } else if (status == 3) {
        qm.summonMsg(19);
        qm.dispose();
    }
}
