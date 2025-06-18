/*
 *  @名稱：    簡
 *  @地圖：    維多利亞港
 *  @功能：    系統任務
 *  @作者：    彩虹工作室
 *  @時間：    2016年12月30日
 */

var status = 0;
var amount = -1;
var item;
var cost;
var rec;
var recName;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status <= 2 && mode == 0) {
        cm.dispose();
        return;
    } else if (status >= 3 && mode == 0) {
        cm.sendNext("如果下次還有需要在來找我吧。");
        cm.dispose();
        return;
    }
    if (mode == 1)
        status++;
    else
        status--;
    if (status == 0) {
        if (cm.getQuestStatus(2013) == 2) {
            cm.sendNext("謝謝你能夠幫助我,我可以低價出售你一些東西。");
        } else {
            if (cm.getQuestStatus(2010) == 2)
                cm.sendNext("如果你能幫助我說服父親讓我去冒險,我可以低價出售一些藥品作為補償。");
            else
                cm.sendOk("我的夢想是到處旅行，就像你一樣。然而我的父親，不允許我這樣做！因為他認為這是很危險的。但是，如果我給他一些證明，他就會讓我去,你能幫幫我嗎?");
            cm.dispose();
        }
    } else if (status == 1) {
        var selStr = "#b你想從我這裡購買什麼：";
        var items = new Array(2000002, 2022003, 2022000, 2001000);
        var costs = new Array(310, 1060, 1600, 3120);
        for (var i = 0; i < items.length; i++) {
            selStr += "\r\n#L" + i + "##z" + items[i] + "# (售價 : " + costs[i] + " 楓幣)#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 2) {
        var itemSet = new Array(2000002, 2022003, 2022000, 2001000);
        var costSet = new Array(310, 1060, 1600, 3120);
        var recHpMp = new Array(300, 1000, 800, 1000);
        var recNames = new Array("HP", "HP", "MP", "HP & MP");
        item = itemSet[selection];
        cost = costSet[selection];
        rec = recHpMp[selection];
        recName = recNames[selection];
        cm.sendGetNumber("#b#t" + item + "##k? #t" + item + "# 回復 " + rec + " " + recName + "選擇你想要購買的數量吧。", 1, 1, 100);
    } else if (status == 3) {
        cm.sendYesNo("Will you purchase #r" + selection + "#k #b#t" + item + "#(s)#k? #t" + item + "# costs " + cost + " mesos for one, so the total comes out to be #r" + cost * selection + "#k mesos.");
        amount = selection;
    } else if (status == 4) {
        if (cm.getMeso() < cost * amount || !cm.canHold(item)) {
            cm.sendNext("請確認你有#r" + cost * amount + "#k 楓幣，並確認背包空間是否足夠.");
        } else {
            cm.gainMeso(-cost * amount);
            cm.gainItem(item, amount);
            cm.sendNext("購買好了,趕快檢查你的背包吧。");
        }
        cm.dispose();
    }
}
