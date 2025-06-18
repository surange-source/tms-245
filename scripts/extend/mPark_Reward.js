var status = -1;
var today;
var rewardArr = [2434745, 2434746, 2434747, 2434748, 2434749, 2434750, 2434751];
var str;
function start() {
    today = new Date().getDay();
    if (!cm.canHold(rewardArr[today])) {
        cm.sendNext("道具欄不足。");
        cm.dispose();
        return;
    }
    var date = new java.text.SimpleDateFormat("yy/MM/dd").format(new java.util.Date());
    var sDate = cm.getWorldShareInfo(18805, "date");
    if (sDate != date) {
        cm.updateWorldShareInfo(18805, "count", "0");
        cm.updateWorldShareInfo(18805, "Td", date);
        cm.updateWorldShareInfo(18805, "date", date);
    }
    var nCount = cm.getWorldShareInfo(18805, "count");
    if (nCount == null || nCount.isEmpty()) {
        nCount = 0;
    } else {
        nCount = parseInt(nCount)
    }
    nCount++;
    if (nCount > 7) {
        cm.sendNext("剩餘次數不足。");
        cm.dispose();
        cm.warp(951000000, 0);
        return;
    }
    var toUse = "已經使用今天的免費過關次數 1次了。";
    if (nCount > 2) {
        if (cm.haveItem(4001864)) {
            cm.gainItem(4001864, -1);
            toUse = "已經使用#t" + 4001864 + "# 1個了。";
        } else if (cm.getNX(2) >= 10) {
            cm.gainNX(2, -10);
            toUse = "已經使用10新楓之谷點數。";
        } else {
            cm.sendNext("楓葉點數不足。");
            cm.dispose();
            cm.warp(951000000, 0);
            return;
        }
    }
    cm.gainItem(rewardArr[today], 1);
    var exp = cm.getQuestInfo(15180, "exp");
    if (exp == null || exp.isEmpty()) {
        exp = 0;
    } else {
        exp = parseInt(exp)
    }
    if (exp > 0) {
        cm.gainExp(exp);
        if (today == 0) {
            var addExp = parseInt(50 / 100 * exp);
            if (addExp > 0) {
                cm.gainExp(addExp);
                exp += addExp;
            }
        }
    }
    cm.updateOneQuestInfo(15180, "exp", "0");
    cm.updateWorldShareInfo(18805, "count", nCount.toString());
    var tNum = cm.getQuestInfo(15179, today.toString());
    if (tNum == null || tNum.isEmpty()) {
        tNum = 0;
    } else {
        tNum = parseInt(tNum)
    }
    tNum++;
    cm.updateOneQuestInfo(15179, today.toString(), tNum.toString());
    var sExp = "";
    var i = exp;
    while (i > 0) {
        var n = parseInt(i % 1000);
        if (parseInt(i / 1000) > 0) {
            if (n < 10) {
                n = "00" + n;
            } else if (n < 100) {
                n = "0" + n;
            } else {
                n = n.toString();
            }
        }
        sExp = n + "," + sExp;
        i = parseInt(i / 1000);
    }
    str = "\r\n在怪物公園玩得開心嗎？這裡有獎勵，呵呵。\r\n\r\n#b#e每日獎勵：#i" + rewardArr[today] + ":# #t" + rewardArr[today] + ":# 1個\r\n經驗值獎勵： " + (sExp != "" ? sExp.substring(0, sExp.length - 1) : exp) + "\r\n" + toUse;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    var i = 0;
    if (status == i++) {
        cm.sendNextNoESC(str);
    } else if (status == i++) {
        cm.sendNextPrevNoESC("那麼下次再使用吧～");
    } else {
        cm.dispose();
        cm.warp(951000000, 0);
    }
}