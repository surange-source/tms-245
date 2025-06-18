var status;
var sel;

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
            cm.sendSimple("#r - 清理和滿技能功能 #k\r\n#L0# 清理技能 #L1# 加滿技能");  
        } else if (status == 1) {
            cm.playerMessage("當前選擇 " + selection);
            switch (selection) {
            case 0:
                cm.clearSkills();
                break;
            case 1:
                cm.clearSkills();
                cm.maxSkillsByJob();
         //cm.worldSpouseMessage(0x15,"[土豪]"+ cm.getChar().getName() +"  打開了滿技能NPC！");
                break;
            }
            cm.dispose();
        }
    }
}