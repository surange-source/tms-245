/* 飛上藍天 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 2) {
            qm.sendOk("你難道不覺得每個人都有飛翔的願望嗎？");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("你好，冒險家。今天我聯繫你，是有事情想告訴你。");
    } else if (status == 1) {
        qm.sendNextPrev("今天的天氣格外晴朗。真想在天空中飛行……要是能在天上飛，那該有多好？");
    } else if (status == 2) {
        qm.sendYesNo("為什麼突然說這些？呵呵，如果有可以在天上飛的方法，你感興趣嗎？");
    } else if (status == 3) {
        qm.sendNext("在天上飛非常簡單。只要有#b飛機#k，誰都可以在天上飛。在哪裡能找到飛機？聽說從飛行員位置上退休下來的#b教官奧斌#k在出租飛機。");
    } else if (status == 4) {
        qm.sendNextPrev("在#b維多利亞島、聖地、埃德爾斯坦、玩具城、納希沙漠、武陵、神木村#k的升降場可以見到教官奧斌，你去見見他吧。");
        qm.forceCompleteQuest();
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.dispose();
}
