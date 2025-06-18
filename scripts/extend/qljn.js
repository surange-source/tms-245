var status;
var sel;
var eff = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            cm.sendSimple("#r - 滿技能功能\r\n #r#e注意：新職業劍豪、陰陽師請勿使用會錯亂!#n\r\n#d#e 提示：5000樂豆點技能全滿！#n #k\r\n\r\n\r\n#L1# " + eff + "加滿技能");
        } else if (status == 1) {
            cm.playerMessage("當前選擇 " + selection);
            switch (selection) {
            case 0:
                cm.clearSkills();
                   cm.sendOk("恭喜你，已經成功清理技能了.");
                break;
            case 1:
               // cm.clearSkills();
                cm.maxSkillsByJob();
             cm.gainNX(1, -5000);
          cm.sendOk("恭喜你，已經成功滿技能了.");
                break;
            }
            cm.dispose();
        }
    }
}