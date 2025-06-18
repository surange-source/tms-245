/*
 *  @名稱：    達克魯
 *  @地圖：    彩虹島 - 選擇之岔路
 *  @功能：    職業體驗
 *  @作者：    彩虹工作室
 *  @時間：    2016年12月30日
 */

var status = -1;

function start() {
    if (cm.getMapId() != 1020000 && cm.getMapId() != 4000026) {
        cm.dispose();
        return
    }
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 1) {
            cm.sendNext("如果想當盜賊，請再來找我吧。");
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        cm.sendNext("盜賊是具有運氣和一定敏捷性和力量的職業，在戰場上經常使用突襲對方或藏身的特殊技能。具有相當高的機動性和迴避率的盜賊，具有各種技術，操作起來非常有趣。");
    } else if (status == 1) {
        cm.sendYesNo("怎麼樣，要想體驗盜賊嗎？");
    } else if (status == 2) {
        cm.warp(1020400, 0); // Effect/Direction3.img/rouge/Scene00
        cm.dispose();
    }
}
