var status = 0;
var z = "#fUI/UIWindow/Quest/icon5/1#";//"+z+"//美化
var typed = 0;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        im.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        var selStr = "\r\n\r\n";
        selStr += "#b您可以將我放置在鍵盤快捷鍵上使用#k\r\n";
        selStr += "#r#L11##s80002227# 火焰鳥騎寵#l\r\n";
        selStr += "#r#L12##s80011424# 露希妲蝴蝶騎寵(永久)#l\r\n";
        selStr += "#r#L13##s80001810# 小烏勒斯騎寵(永久)#l\r\n";
        selStr += "#r#L14##s80001017# 變形金剛騎寵#l\r\n";
        selStr += "#r#L15##s80011406# 幽靈獵人騎寵#l\r\n";
        selStr += "#r#L16##s80011398# 暗·鬼狐騎寵#l\r\n";
        selStr += "#r#L17##s80002219# 雲飄飄騎寵#l\r\n";
        selStr += "#r#L18##s80001993# 月光星空雲朵騎寵#l\r\n";
        selStr += "#r#L19##s80001784# 衝浪板騎寵#l\r\n";
        selStr += "#r#L20##s80001244# 雪花騎寵#l\r\n";
        selStr += "#r#L21##s80001933# 蓋奧勒克騎寵#l\r\n";

        
        im.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 11:
                im.dispose();
            im.teachSkill(80002227 ,  1, 1);
                        im.gainItem(2435986, -1);
                        im.playerMessage(1, "恭喜您獲得火焰鳥騎寵（永久）！");
                        im.worldSpouseMessage(0x01, "『絕版騎寵』" + " : " + "玩家 " + im.getChar().getName() + " 成功學習了神秘騎寵技能！");
            break;
        case 12:
                im.dispose();
            im.teachSkill(80011424 ,  1, 1);
                        im.gainItem(2435986, -1);
                        im.playerMessage(1, "恭喜您獲得露希妲蝴蝶騎寵(永久)！");
                        im.worldSpouseMessage(0x01, "『絕版騎寵』" + " : " + "玩家 " + im.getChar().getName() + " 成功學習了神秘騎寵技能！");
            break;
        case 13:
                im.dispose();
            im.teachSkill(80001810,  1, 1);
                        im.gainItem(2435986, -1);
                        im.playerMessage(1, "恭喜您獲得小烏勒斯騎寵(永久)！");
                        im.worldSpouseMessage(0x01, "『絕版騎寵』" + " : " + "玩家 " + im.getChar().getName() + " 成功學習了神秘騎寵技能！");
            break;
        case 14:
                im.dispose();
            im.teachSkill(80001017,  1, 1);
                        im.gainItem(2435986, -1);
                        im.playerMessage(1, "恭喜您獲得變形金剛騎寵！");
                        im.worldSpouseMessage(0x01, "『絕版騎寵』" + " : " + "玩家 " + im.getChar().getName() + " 成功學習了神秘騎寵技能！");
            break;


        }
    } else if (status == 2) {
        if (typed == 14) {
            im.worldSpouseMessage(0x07, "[世界]"+im.getPlayer().getMedalText()+im.getChar().getName()+" : "+im.getText());
        }
        im.dispose();
    }
}
