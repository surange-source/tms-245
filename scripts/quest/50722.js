/*
    任務: 在天空中飛吧！
    描述: 瑪塔塔說要想學習#b飛行騎乘#k技能，需要#b古代龍的翼鱗#k。\n#b古代龍的翼鱗#k可以從#b神木村#k的#b村長塔塔曼#k那裡獲得。
    需要: 學會了飛行騎乘技能。
*/
var status = -1;

function start(mode, type, selection) {
    qm.sendOk("Go to #bChief Tatamo#k in Leafre and bring back a Ancient Dragon Wing Scale.");
    qm.forceStartQuest();
    qm.dispose();
}

function end(mode, type, selection) {
    status++;
    if (status == 0) {
        if (qm.haveItem(4032969, 1)) {
            qm.sendNext("Great! Please wait till I mix these ingredients together...");
        } else {
            qm.sendOk("Please go to #bChief Tatamo#k of Leafre and bring back an Ancient Dragon Wing Scale.");
            qm.forceStartQuest();
            qm.dispose();
        }
    } else {
        qm.teachSkill(80001089, 1, 0); // Maker
        qm.removeAll(4032969);
        qm.sendOk("There we go! You have learned the Soaring skill and will be able to fly, using great amounts of MP.");
        qm.forceCompleteQuest();
        qm.dispose();
    }
}
