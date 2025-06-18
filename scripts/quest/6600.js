/* 傳授海盜祝福鏈接技能 */

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
        qm.sendYesNo("可以將連鎖技能#b#e海盜祝福#n#k傳授給賬號內的其他角色。現在要指定被傳授的角色嗎？");
    } else if (status == 1) {
        if (qm.hasSkill(110)) { //0000110 - 海盜祝福 - [種族特性技能]強化重砲指揮官特有的堅韌，永久提高各種屬性。
            qm.sendLinkSkillWindow(110);
            qm.forceCompleteQuest();
        }
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.forceCompleteQuest();
    qm.dispose();
}
