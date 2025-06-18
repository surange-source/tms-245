/*
    活躍度禮盒 1階
*/

var status;
var reward = Array(
                    Array(2001505, 10, 100),    // 超級藥水
                    Array(2001556, 10, 50),        // 包治百病藥
                    Array(5062000, 1, 5),        // 神奇方塊
                    Array(5062002, 1, 5),           // 高級神奇方塊
                    Array(5064000, 1, 2),           // 防暴捲軸
                    Array(2003524, 1, 5),        // 上等英雄秘藥 - 利用煉金術的最尖端技術製作而成的神秘藥水。使用後，在2小時內攻擊力和魔法攻擊力增加18
                    Array(2003527, 1, 5)        // 上等祝福秘藥 - 利用煉金術的最尖端技術製作而成的神秘藥水。使用後，在2小時內力量、敏捷、智力、運氣各增加40，移動速度和跳躍力提高到最大值。
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
        if (!im.haveSpace(2)) {
            im.sendOk("消耗欄空間不足，請整理後再打開");
            im.dispose();
            return;
        }
        var index = Math.floor(Math.random() * reward.length);
        var quantity = Math.floor(Math.random() * reward[index][2] + reward[index][1]);
        im.gainItem(2431977, -1);
        im.gainItem(reward[index][0], quantity);
        im.dispose();
    }
}