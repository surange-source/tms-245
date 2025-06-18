var status = 0;

var eff = "#fEffect/CharacterEff/1112905/0/1#"; //

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        var selStr = ""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+"\r\n#k#L2#   #v2431724#     購買漫威勇士箱40W樂豆點#l   \r\n"+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+"\r\n       打開可隨機獲得以下任意一個道具\r\n#v3015100##v3015109##v3015143##v3015144##v3015142##v3015178##v3015181##v3015183##v3015193##v3015197##v3015211##v1052953##v1073078##v1702598##v1662054##v1672067#";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 1:
            if (cm.getPlayer().getCSPoints(1) >= 200000) {
        cm.gainNX(1, -200000);
                cm.changeDamageSkin(1023);
                cm.sendOk("購買成功,已應用到你的傷害皮膚,打怪可看到\r\n祝你遊戲愉快!");
            } else {
                cm.sendOk("你沒有樂豆點或不足,我不能與你兌換");
            }
            break;
        case 2:
            if (cm.getPlayer().getCSPoints(1) >= 400000) {
        cm.gainNX(1, -400000);
                cm.gainItem(2431724,1);
                cm.spouseMessage(0x26,"『土豪公告』 "+ cm.getChar().getName() +"  在市場購買漫威勇士箱，大家快來打劫他(她)~!");
                cm.sendOk("購買成功\r\n祝你遊戲愉快!");
            } else {
                cm.sendOk("你沒有樂豆點或不足,我不能與你兌換");
            }
            break;
            case 3:
            if (cm.getPlayer().getCSPoints(1) >= 300000) {
        cm.gainNX(1, -300000);
                cm.changeDamageSkin(1022);
                cm.sendOk("購買成功,已應用到你的傷害皮膚,打怪可看到\r\n祝你遊戲愉快!");
            } else {
                cm.sendOk("你沒有樂豆點或不足,我不能與你兌換");
            }
            break;
        }
        cm.dispose();
    }
}