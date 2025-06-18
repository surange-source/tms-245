/* 傳授穿透連接技能 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.sendNext("點擊畫面左側的相關圖標，可以隨時指定被傳授的角色。");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendYesNo("可以將連鎖技能#b#e穿透#n#k傳授給賬號內的其他角色。現在要指定被傳授的角色嗎？");
    } else if (status == 1) {
        if (qm.hasSkill(20040218)) { //20040218 - 穿透 - 用穿透一切阻礙的光之力量，無視敵人的部分防禦力。
            qm.sendLinkSkillWindow(20040218);
            qm.forceCompleteQuest();
        }
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.forceCompleteQuest();
    qm.dispose();
}
