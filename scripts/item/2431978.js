/*
    活躍度禮盒 2階
*/

var status;
var maxtimes = 2;
var reward = Array(
                    Array(2100900, 1, 3, 50),        // 疑問的召喚包
                    Array(2003525, 1, 3, 60),        // 最上等英雄秘藥
                    Array(2003528, 1, 3, 70),        // 最上等祝福秘藥
                    Array(2049307, 2, 5, 85),        // 裝備強化卷軸
                    Array(2048305, 2, 5, 100)        // 附加潛能附加卷軸
                    );

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode <= 0) {
        im.dispose();
        return;
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
    }

    if (status == 0) {
        if (im.getSpace(2) < maxtimes) {
            im.sendOk("消耗欄空間不足，請整理後再打開");
            im.dispose();
            return;
        }
        var togain = new Array();
        for (; maxtimes > 0; maxtimes--) {
            var chance = Math.floor(Math.random() * 999999);
            for (var i in reward) {
                if (Math.floor(chance / 999999 * 100) < reward[i][3] && !contains(togain, reward[i][0])) {
                    var quantity = Math.floor(Math.random() * (reward[i][2] - reward[i][1]) + reward[i][1]);
                    togain.push(new Array(reward[i][0], quantity));
                    break;
                }
            }
        }
        im.gainItem(2431978, -1);

        for (var item in togain) {
            im.gainItem(togain[item][0], togain[item][1]);
        }
        im.dispose();
    }
}

function contains(togain, itemid) {
    for (var i in togain) {
        if (togain[i][0] == itemid) {
            return true;
        }
    }
    return false;
}