/* 奇怪的流浪者 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 3) {
            qm.sendNext("不管怎樣，這件事都必須處理……");
            qm.dispose();
            return;
        } else if (status == 6) {
            qm.sendNextS("(還沒做好心理準備。準備好了之後，就按一下按鈕吧。)", 2);
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("不管怎樣，這件事都必須處理……");
    } else if (status == 1) {
        qm.sendNextPrevS("(好像有人突然經過，撞到了我的肩。)", 2);
    } else if (status == 2) {
        qm.sendNextPrevS("你是誰？", 2);
    } else if (status == 3) {
        qm.askAcceptDecline("……\r\n\r\n(那個男人裝作沒聽見我的話，很快地消失了。在他身後，好像掉落了一樣發光的東西。要撿起來看看嗎？)");
    } else if (status == 4) {
        qm.sendNextS("(走近一看，發光的東西不是別的，是一塊陳舊的懷表。撿起來仔細一看，除了時針不在轉動之外，好像沒什麼特別的地方。)", 2);
    } else if (status == 5) {
        qm.sendNextPrevS("按一下上面的按鈕的話，懷表說不定會重新轉動起來……", 2);
    } else if (status == 6) {
        qm.sendYesNoS("你想按一下按鈕，讓懷表重新轉動起來嗎？\r\n\r\n#b(按#r是#b的話，立即移動到塔拉森林。)#k", 4)
    } else if (status == 7) {
        qm.sendPlayerToNpc("好的，決定了。按一下按鈕吧。");
    qm.forceStartQuest();
        qm.warp(240070000);
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.forceCompleteQuest();
    qm.dispose();
}
