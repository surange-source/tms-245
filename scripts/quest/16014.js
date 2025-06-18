var status = -1;
var select = -1;

function start(mode, type, selection) {
    if (qm.getLevel() < 60) {
        qm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else if (status != 1) {
        status--;
    }

    var i = -1;
    if (status == i++) {
        qm.dispose();
    } else if (status == i++) {
        qm.sendSimple("今天真是屠龍的好日子啊！\r\n有哪些#b楓葉聯盟#k業務需要幫忙嗎？\r\n\r\n#L0##b<確認我的楓葉聯盟情報。>#l\r\n#L1##b<提升楓葉聯盟等級。>#l\r\n#L2##b<聽取楓葉聯盟的說明。>#k#l\r\n#L3##b<一週獲得硬幣排行>#k#l");
    } else {
        if (select == -1) {
            select = selection;
        }
        switch (select) {
            case 0:
                select_0Func(mode, type, selection);
                break;
            case 1:
                select_1Func(mode, type, selection);
                break;
            case 2:
                qm.dispose();
                qm.openNpc(qm.getNpc(), "RunScript_19");
                break;
            case 3:
                select_3Func(mode, type, selection);
                break;
            default:
                qm.dispose();
                break;
        }
    }
}

var status_1 = -1;
function select_0Func(mode, type, selection) {
    if (mode == 1) {
        status_1++;
    } else {
        status_1--;
    }

    var i = -1;
    if (status_1 == i++) {
        qm.dispose();
    } else if (status_1 == i++) {
        var rank = qm.getMapleUnionRank();
        if (rank == null) {
            qm.sendOk("發生未知錯誤");
            qm.dispose();
            return;
        }
        qm.sendNext("我來提供勇士您的#e楓之谷聯盟#n資訊好嗎？\r\n\r\n#e楓之谷聯盟階級： #n#b#e<" + rank + ">#n#k\r\n#e聯盟等級： #n#b#e<" + qm.getMapleUnionLevel() + ">#n#k\r\n#e持有聯盟角色： #n#b#e<" + qm.getPlayer().getMapleUnion().getAllUnions().size() + ">#n#k\r\n#e攻擊隊員：#n#b#e<" + qm.getPlayer().getMapleUnion().getFightingUnions().size() + " / " + rank.getAttackerCount() + "名>#n#k");
    } else {
        qm.dispose();
    }
}

var needCoin = [
    [101, 0],
    [102, 120],
    [103, 140],
    [104, 150],
    [105, 160],
    [201, 170],
    [202, 430],
    [203, 450],
    [204, 470],
    [205, 490],
    [301, 510],
    [302, 930],
    [303, 960],
    [304, 1000],
    [305, 1030],
    [401, 1060],
    [402, 2200],
    [403, 2300],
    [404, 2350],
    [405, 2400]
];

function select_1Func(mode, type, selection) {
    if (mode == 1) {
        status_1++;
    } else {
        qm.dispose();
        return;
    }

    var i = -1;
    if (status_1 == i++) {
        qm.dispose();
    } else if (status_1 == i++) {
        var currentRank = qm.getMapleUnionRank();
        var nextRank = qm.getNextMapleUnionRank();
        var nextStatus = nextRank.getRank() * 100 + nextRank.getSubRank();
        var nextNeedCoin = 0;
        for each (n in needCoin) {
            if (n[0] == nextStatus) {
                nextNeedCoin = n[1];
                break;
            }
        }
        if (currentRank == null || nextNeedCoin <= 0) {
            qm.sendOk("發生未知錯誤");
            qm.dispose();
            return;
        } else if (nextRank == null) {
            qm.sendOk("聯盟等級已經升級到最高");
            qm.dispose();
            return;
        }
        qm.sendYesNo("#e你想要使楓之谷#n聯盟升級 嗎？\r\n\r\n#e目前等級：#n#b#e<" + currentRank + ">#n#k\r\n#e下個等級：#n#b#e<" + nextRank + ">#n#k\r\n#e升級時可投入的攻擊隊員增加:#n #b#e<" + currentRank.getAttackerCount() + "→" + nextRank.getAttackerCount() + " 名>#n#k\r\n\r\n要升級的話必須達成以下條件。\r\n\r\n#e<聯盟等級> #r#e" + nextRank.getLevel() + " 以上#n#k #n\r\n#e<發送硬幣> #b#e#t4310229# " + nextNeedCoin + "個#n#k\r\n\r\n現在要#e升級#n楓葉聯盟嗎？");
    } else if (status_1 == i++) {
        var currentLevel = qm.getMapleUnionLevel();
        var nextRank = qm.getNextMapleUnionRank();
        var point = qm.getQuestPoint(500629);
        if (nextRank == null) {
            qm.sendOk("發生未知錯誤");
            qm.dispose();
            return;
        }
        var nextStatus = nextRank.getRank() * 100 + nextRank.getSubRank();
        var nextNeedCoin = 0;
        for each (n in needCoin) {
            if (n[0] == nextStatus) {
                nextNeedCoin = n[1];
                break;
            }
        }
        if (nextNeedCoin <= 0) {
            qm.sendOk("發生未知錯誤");
            qm.dispose();
            return;
        }
        if (currentLevel < nextRank.getLevel()) {
            qm.sendOk("目前#r聯盟等級不足#k呢！\r\n想要升級的話#r需要更高的聯盟等級#k~\r\n\r\n#e目前聯盟等級：#n#r" + currentLevel + "#k\r\n#e必備聯盟等級:#n#b" + nextRank.getLevel() + "#k");
        } else if (point < nextNeedCoin) {
            qm.sendOk("目前#r聯盟硬幣不足#k呢！\r\n想要升級的話#r需要更多的聯盟硬幣#k~\r\n\r\n#e目前聯盟硬幣：#n#r" + point + "#k\r\n#e所需聯盟硬幣:#n#b" + nextNeedCoin + "#k");
        } else {
            qm.gainWorldShareQuestPoint(500629, -nextNeedCoin);
            //qm.updateWorldShareInfo(18771, "cRank", "202");
            qm.updateWorldShareInfo(18771, "rank", nextStatus);
            qm.getPlayer().getMapleUnion().setState(nextStatus);
            qm.getPlayer().getMapleUnion().update();
            qm.sendNext("啪啪啪！\r\n#e楓之谷聯盟等級#n上升了！現在可以和更多的攻擊隊員一起快速成長！\r\n\r\n#e新等級：#n#b#e<" + nextRank + ">#n#k\r\n#e可投入的攻擊隊員:#n #b#e" + nextRank.getAttackerCount() + "#n#k\r\n\r\n那就一直成長到下個等級吧！");
        }
    } else {
        qm.dispose();
    }
}

function select_3Func(mode, type, selection) {
    if (mode == 1) {
        status_1++;
    } else {
        status_1--;
    }

    var i = -1;
    if (status_1 == i++) {
        qm.dispose();
    } else if (status_1 == i++) {
        qm.sendOk("您還沒有已登錄的每週硬幣獲得排名耶？\r\n透過聯盟團戰獲得硬幣後即可確認排名。");
    } else {
        qm.dispose();
    }
}