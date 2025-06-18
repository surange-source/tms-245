/* 傳授精靈的祝福鏈接技能 */

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
        qm.sendYesNo("可以將連鎖技能#b#e精靈的祝福#n#k傳授給賬號內的其他角色。現在要指定被傳授的角色嗎？");
    } else if (status == 1) {
        if (qm.hasSkill(20021110)) { //20021110 - 精靈的祝福 - [種族特性技能]借助古代精靈的祝福，可以回到埃歐雷，永久性地提高經驗值獲得量。
            qm.sendLinkSkillWindow(20021110);
            qm.forceCompleteQuest();
        }
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.forceCompleteQuest();
    qm.dispose();
}
