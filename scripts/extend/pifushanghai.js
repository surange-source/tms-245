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
        var selStr = "#e#b#L1#獨特煙花皮膚30萬樂豆點  #e#b#L3#獨特棉花皮膚30萬樂豆點\r\n"+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+"\r\n#k#L2#   #v2431867#     購買傷害皮膚禮包5W樂豆點#l   \r\n"+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+"\r\n       打開可隨機獲得以下任意一個傷害皮膚\r\n#v2431966##v2431967##v2432131##v2432153##v2432154##v2432207##v2432354##v2432355##v2432465##v2432479##v2432526##v2432532##v2432592##v2432640##v2432710##v2432836##v2432973##v2433063##v2432591##v2432695##v2432748##v2432749##v2432804##v2433112##v2433113##v2433038##v2433197##v2433182##v2433183#";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 1:
            if (cm.getPlayer().getCSPoints(1) >= 300000) {
        cm.gainNX(1, -300000);
                //cm.changeDamageSkin(1023);
                cm.gainItem(2433588,1);
                cm.sendOk("購買成功,已應用到你的傷害皮膚,打怪可看到\r\n祝你遊戲愉快!");
            } else {
                cm.sendOk("你沒有樂豆點或不足,我不能與你兌換");
            }
            break;
        case 2:
            if (cm.getPlayer().getCSPoints(1) >= 40000) {
        cm.gainNX(1, -40000);
                cm.gainItem(2431867,1);
                cm.sendOk("購買成功\r\n祝你遊戲愉快!");
            } else {
                cm.sendOk("你沒有樂豆點或不足,我不能與你兌換");
            }
            break;
            case 3:
            if (cm.getPlayer().getCSPoints(1) >= 300000) {
        cm.gainNX(1, -300000);
               // cm.changeDamageSkin(1022);
                cm.gainItem(2433588,1);  //未找到
                cm.sendOk("購買成功,已應用到你的傷害皮膚,打怪可看到\r\n祝你遊戲愉快!");
            } else {
                cm.sendOk("你沒有樂豆點或不足,我不能與你兌換");
            }
            break;
        }
        cm.dispose();
    }
}