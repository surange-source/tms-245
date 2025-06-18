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
        selStr += "#r#L11##s80001347# 石像鬼騎寵#l";
        
        im.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {

        case 11:
                im.dispose();
            im.teachSkill(80001347 ,  1, 1);
                        im.gainItem(2432030, -1);
                        //im.sendOk("恭喜您獲得騎寵技能30天.");
                        im.playerMessage(1, "恭喜您獲得石像鬼騎寵技能30天！");
                        im.worldSpouseMessage(0x01, "『購買騎寵』" + " : " + "玩家 " + im.getChar().getName() + " 成功學習了【石像鬼騎寵】技能！");
            break;

        }
    } else if (status == 2) {
        if (typed == 14) {
            im.worldSpouseMessage(0x07, "[世界]"+im.getPlayer().getMedalText()+im.getChar().getName()+" : "+im.getText());
            im.gainMeso(-100000);
            //im.dispose();
        }
        im.dispose();
    }
}
