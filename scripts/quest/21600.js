var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            qm.sendNext("已經50級了啊。很快嘛。但是走起路來是不是就感覺慢很多了呢？站神的騎寵狼神原來是狂狼勇士專用的坐騎。");
        } else if (status == 1) {
            qm.sendYesNo("如果你想要回曾經離開的狼神。那麼得先幫個忙。這樣吧，你先去找#b納努科#k吧。他會告訴你怎麼做的。怎麼樣？願意去嗎？");
        } else if (status == 2) {
            qm.forceStartQuest();
            qm.sendNext("好的。那麼就要麻煩你跑一趟了。關於一些事情他會詳細告訴你。");
        } else if (status == 3) {
            qm.dispose();
        }
    }
}
