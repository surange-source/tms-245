var status = 0;
var z = "#fUI/UIWindow/Quest/icon5/1#";//"+z+"//美化

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
        var selStr = "#e#r#fEffect/ItemEff/1112811/0/0##fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k\r\n\r\n- #e#r新手裝備禮包#k#n\r\n";
        selStr += "#d請選擇您需要的裝備：(PS:慎重選擇)#k\r\n";
        selStr += "#r#L0#"+z+" 選擇劍士型裝備#l      #L1#"+z+" 選擇法師型裝備#l\r\n";
        selStr += "#r#L2#"+z+" 選擇弓手型裝備#l      #L3#"+z+" 選擇盜賊型裝備#l\r\n";
        selStr += "#r#L4#"+z+" 選擇海盜型裝備#l      #L5#"+z+" 選擇傑諾/幻影裝備#l\r\n";
        selStr += "\r\n\r\n#fEffect/ItemEff/1112811/0/0##fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k";
        im.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
           if (im.getLevel() >= 120 && im.getPlayerPoints() > 100) { //劍士
        im.gainItem(2431676, -1);
        im.gainItem(1002776,1);
        im.gainItem(1102172,1);
        im.gainItem(1082234,1);
        im.gainItem(1052155,1);
        im.gainItem(1072355,1);
        im.sendOk("恭喜您領取劍士120永恆裝備.");
        im.worldSpouseMessage(0x20,"『成長禮包』 ：玩家 "+ im.getChar().getName() +" 在成長禮包裡領取裝備。");
        im.dispose();
            } else {
                im.sendOk("失敗：\r\n\r\n#r1). 您的等級不夠120級.無法領取.\r\n2). 您當前在線積分不足100點。請去市場掛機");
                im.dispose();
            }
            break;
        case 1:
           if (im.getLevel() >= 120 && im.getPlayerPoints() > 100) { //法師
        im.gainItem(2431676, -1);
        im.gainItem(1002777,1);
        im.gainItem(1102172,1);
        im.gainItem(1082235,1);
        im.gainItem(1052156,1);
        im.gainItem(1072356,1);
        im.sendOk("恭喜您領取法師120永恆裝備.");
        im.worldSpouseMessage(0x20,"『成長禮包』 ：玩家 "+ im.getChar().getName() +" 在成長禮包裡領取裝備。");
        im.dispose();
            } else {
                im.sendOk("失敗：\r\n\r\n#r1). 您的等級不夠120級.無法領取.\r\n2). 您當前在線積分不足100點。請去市場掛機");
                im.dispose();
            }
            break;
        case 2:
           if (im.getLevel() >= 120 && im.getPlayerPoints() > 100) { //弓手
        im.gainItem(2431676, -1);
        im.gainItem(1002778,1);
        im.gainItem(1102172,1);
        im.gainItem(1082236,1);
        im.gainItem(1052157,1);
        im.gainItem(1072357,1);
        im.sendOk("恭喜您領取弓手120永恆裝備.");
        im.worldSpouseMessage(0x20,"『成長禮包』 ：玩家 "+ im.getChar().getName() +" 在成長禮包裡領取裝備。");
        im.dispose();
            } else {
                im.sendOk("失敗：\r\n\r\n#r1). 您的等級不夠120級.無法領取.\r\n2). 您當前在線積分不足100點。請去市場掛機");
                im.dispose();
            }
            break;
        case 3:
           if (im.getLevel() >= 120 && im.getPlayerPoints() > 100) { //盜賊
        im.gainItem(2431676, -1);
        im.gainItem(1002779,1);
        im.gainItem(1102172,1);
        im.gainItem(1082237,1);
        im.gainItem(1052158,1);
        im.gainItem(1072358,1);
        im.sendOk("恭喜您領取弓手120永恆裝備.");
        im.worldSpouseMessage(0x20,"『成長禮包』 ：玩家 "+ im.getChar().getName() +" 在成長禮包裡領取裝備。");
        im.dispose();
            } else {
                im.sendOk("失敗：\r\n\r\n#r1). 您的等級不夠120級.無法領取.\r\n2). 您當前在線積分不足100點。請去市場掛機");
                im.dispose();
            }
            break;
        case 4:
           if (im.getLevel() >= 120 && im.getPlayerPoints() > 100) { //海盜
        im.gainItem(2431676, -1);
        im.gainItem(1002780,1);
        im.gainItem(1102172,1);
        im.gainItem(1082238,1);
        im.gainItem(1052159,1);
        im.gainItem(1072359,1);
        im.sendOk("恭喜您領取弓手120永恆裝備.");
        im.worldSpouseMessage(0x20,"『成長禮包』 ：玩家 "+ im.getChar().getName() +" 在成長禮包裡領取裝備。");
        im.dispose();
            } else {
                im.sendOk("失敗：\r\n\r\n#r1). 您的等級不夠120級.無法領取.\r\n2). 您當前在線積分不足100點。請去市場掛機");
                im.dispose();
            }
            break;
        case 5:
           if (im.getLevel() >= 120 && im.getPlayerPoints() > 100) { //盜賊
        im.gainItem(2431676, -1);
        im.gainItem(1002779,1);
        im.gainItem(1102172,1);
        im.gainItem(1082237,1);
        im.gainItem(1052158,1);
        im.gainItem(1072358,1);
        im.sendOk("恭喜您領取弓手120永恆裝備.");
        im.worldSpouseMessage(0x20,"『成長禮包』 ：玩家 "+ im.getChar().getName() +" 在成長禮包裡領取裝備。");
        im.dispose();
            } else {
                im.sendOk("失敗：\r\n\r\n#r1). 您的等級不夠120級.無法領取.\r\n2). 您當前在線積分不足100點。請去市場掛機");
                im.dispose();
            }
            break;
        }
    }
}
