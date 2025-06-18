/*
 * 转生系统
 */

var status = -1;
var NeedLevels = [
    210,
    210,
    210,
    210,
    210,
    210,
    210,
    210,
    210,
    210,
    220,
    220,
    220,
    220,
    220,
    230,
    230,
    230,
    230,
    230,
    250,
    250,
    250,
    250,
    250,
    270,
    270,
    270,
    270,
    270,
];
var GlobalNeedItems = [
    {itemId: 4001832, count: 30000},
    {itemId: 4001126, count: 30000},
];
var NeedItems = [
    [{itemId: 4000019, count: 100}, {itemId: 4000000, count: 100}, {itemId: 4000016, count: 100},],
    [{itemId: 4000019, count: 500}, {itemId: 4000000, count: 500}, {itemId: 4000016, count: 500},],
    [{itemId: 4000001, count: 300}, {itemId: 4000002, count: 300},],
    [{itemId: 4000013, count: 300}, {itemId: 4000007, count: 300}, {itemId: 4000023, count: 300},],
    [{itemId: 4000115, count: 800},],
    [{itemId: 4000011, count: 800},],
    [{itemId: 4000035, count: 500}, {itemId: 4000036, count: 500},],
    [{itemId: 4000042, count: 800},],
    [{itemId: 4000073, count: 800},],
    [{itemId: 4000160, count: 800},],
    [{itemId: 4000061, count: 400}, {itemId: 4000060, count: 400}, {itemId: 4000059, count: 400}],
    [{itemId: 4000051, count: 500}, {itemId: 4000052, count: 500}],
    [{itemId: 4000069, count: 800}],
    [{itemId: 4000266, count: 500}, {itemId: 4000267, count: 500}],
    [{itemId: 4000270, count: 800}],
    [{itemId: 4000273, count: 500}, {itemId: 4000274, count: 500}],
    [{itemId: 4000456, count: 100}, {itemId: 4000451, count: 100}, {itemId: 4000446, count: 100}],
    [{itemId: 4000461, count: 10}, {itemId: 4000460, count: 10}, {itemId: 4000462, count: 10}, {
        itemId: 4032002,
        count: 1
    }],
    [{itemId: 4000175, count: 10}],
    [{itemId: 4032921, count: 400}, {itemId: 4000643, count: 400}, {itemId: 4000644, count: 400}],
    [{itemId: 4000645, count: 800}],
    [{itemId: 4000658, count: 200}, {itemId: 4000657, count: 200}, {itemId: 4000656, count: 200}, {
        itemId: 4000654,
        count: 200
    }, {itemId: 4000655, count: 200}],
    [{itemId: 4021019, count: 100}],
    [{itemId: 1002972, count: 1}],
    [{itemId: 4032357, count: 100}],
    [{itemId: 4001842, count: 100}],
    [{itemId: 4001868, count: 100}],
    [{itemId: 4001878, count: 100}, {itemId: 4001889, count: 10}],
    [{itemId: 4001890, count: 10}, {itemId: 4001879, count: 10}],
    [{itemId: 2591003, count: 10}],
];
for (var i in NeedItems) {
    var needItem = NeedItems[i];
    needItem.push.apply(needItem, GlobalNeedItems);
}

function start() {
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
    var reborns = cm.getReborns(); // 当前转生次数
    if (status == 0) {
        var text = "";
        if (cm.getLevel() < NeedLevels[reborns])
            text += "轉生需求等級：#r" + NeedLevels[reborns] + "#k\r\n";
        else
            text += "轉生需求等級：#b" + NeedLevels[reborns] + "#k\r\n";
        text += "轉生需求材料：\r\n";
        var needItem = NeedItems[reborns];
        for (var k in needItem) {
            if (cm.getItemQuantity(needItem[k].itemId) < needItem[k].count)
                text += showItem(needItem[k].itemId) + " (" + red(cm.getItemQuantity(needItem[k].itemId)) + "/" + needItem[k].count + ")\r\n";
            else
                text += showItem(needItem[k].itemId) + " (" + blue(cm.getItemQuantity(needItem[k].itemId)) + "/" + needItem[k].count + ")\r\n";
        }
        text += "要繼續吗？";
        cm.askYesNo(text);
    } else if (status == 1) {
        if (selection == 0) {
            cm.dispose();
            return
        }
        var str = "";
        if (cm.getPlayer().getLevel() < NeedLevels[reborns]) {
            str += "等级不夠，需要" + NeedLevels[reborns] + "級\r\n";
        }

        var needItem = NeedItems[reborns];
        for (var k in needItem) {
            if (!cm.haveItem(needItem[k].itemId, needItem[k].count)) {
                str += "道具不足 還需要 " + showItem(needItem[k].itemId) + " * " + red(needItem[k].count - cm.getItemQuantity(needItem[k].itemId)) + "\r\n";
            }
        }
        if (str != "") {
            cm.sendOk(str);
            cm.dispose();
            return;
        }


        //執行轉升
        for (var k in needItem) {
            cm.gainItem(needItem[k].itemId, -needItem[k].count)
        }
        var job = cm.getPlayer().getJob();
        /*
         * @param type 轉生類型 0-每轉+5屬性點 1-每轉+10屬性點 2-每轉+15屬性點 3-每轉+30屬性點
         * @param ap 轉生後給的屬性點 -1根據轉生類型給額外AP, 其他為傳遞的數值
         * @param clearSkill 是否重置技能
         * @param defaultStats 轉生重置後力量、智力、敏捷和幸運的數值
         * @param rebornStat 轉生重置後MaxHP和MaxMP的數值
         * doReborn(int type, int ap, boolean clearSkill, int defaultStats, int rebornStat)
         */
        cm.getPlayer().doReborn(0, 0, false, 4, 50);
        cm.getPlayer().changeJob(job);
        for (let i = 0; i < 10; i++) {
            cm.getPlayer().levelUp();
        }
        cm.getPlayer().dropMessage(1, "轉生成功")
        cm.getPlayer().giveRebornBuff()
        cm.dispose();
        return;
    } else {
        cm.dispose();
        return;
    }
}

function option(idx, msg) {
    return "#L" + idx + "#" + msg + "#l"
}

function showItem(itemId) {
    return "#v" + itemId + "##z" + itemId + "#"
}

function red(msg) {
    return "#r" + msg + "#k"
}

function blue(msg) {
    return "#b" + msg + "#k"
}

