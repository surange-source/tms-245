/*
    活躍度禮盒 3階
*/

var status;
var maxtimes = 3;
var reward = Array(
                    Array(2431987, 1, 2, 20),        // 卷軸箱子
                    Array(2049300, 1, 2, 30),        // 高級裝備強化卷軸
                    Array(2048307, 1, 2, 40),        // 特殊附加潛能附加卷軸
                    Array(2046960, 1, 2, 55),        // 紅河的單手武器 攻擊力卷軸 10%
                    Array(2046961, 1, 2, 70),        // 紅河的單手武器 魔力卷軸 10%
                    Array(2616101, 1, 2, 85),        // 紅河的雙手武器 攻擊力卷軸 10%
                    Array(2616103, 1, 2, 100)        // 紅河的雙手武器 魔力卷軸 10%
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
        im.gainItem(2431979, -1);
        var message = "[活躍度禮包] : [" + im.getPlayer().getName() + "]從活躍度3階禮包中獲得";
        for (var item in togain) {
            message += "[" + im.getItemName(togain[item][0]) + togain[item][1] + "個] ";
            im.gainItem(togain[item][0], togain[item][1]);
        }
        im.showEffect(true, "Yut/goal");
        im.worldMessageYellow(message);
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