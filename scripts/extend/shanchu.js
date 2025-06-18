var status = 0;
var eff ="#fUI/UIWindow/Quest/icon6/7#";

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
            var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，需要清除次數嗎？#b\r\n#L2#" + eff + "進階殘暴炎魔(3000樂豆點)-您今天已經用了[#r" + cm.getPlayer().getPQLog("進階殘暴炎魔") + "#b]次\r\n#L3#" + eff + "進階黑龍(1W樂豆點)-您今天已經用了[#r" + cm.getPlayer().getPQLog("進階黑龍") + "#b]次\r\n#L4#" + eff + "獅子王·班雷昂(1W樂豆點)-您今天已經用了[#r" + cm.getPlayer().getPQLog("獅子王") + "#b]次\r\n#L5#" + eff + "寵物兒·皮卡啾(1W樂豆點)-您今天已經用了[#r" + cm.getPlayer().getPQLog("皮卡啾") + "#b]次\r\n#L6#" + eff + "騎士團·西格諾斯女皇(2W樂豆點)-您今天已經用了[#r" + cm.getPlayer().getPQLog("西格諾斯") + "#b]次\r\n#L7#" + eff + "用#v4310015#重置BOSS挑戰次數(進階[殘暴炎魔/黑龍/皮卡啾])";
         cm.sendSimple(selStr);
    } else if (status == 1) {
      switch (selection) {
        case 0:
           if (cm.getPlayer().getCSPoints(1)>=3000 && cm.getPQLog("普通殘暴炎魔") > 1) {
            cm.gainNX(-3000/5);
                    cm.resetPQLog("普通殘暴炎魔");
                    cm.sendOk("溫馨提示：#b\r\n副本重置成功，勇士行動起來吧！");
            cm.dispose();
                } else {
                    cm.sendOk("溫馨提示：#b\r\n副本重置失敗，樂豆點剩餘不足(3000)或你還剩餘次數.");
                    cm.dispose();
                }
                    break;
        case 1:
           if (cm.getPlayer().getCSPoints(1)>=3000 && cm.getPQLog("普通黑龍") > 1) {
            cm.gainNX(-3000/5);
                    cm.resetPQLog("普通黑龍");
                    cm.sendOk("溫馨提示：#b\r\n副本重置成功，勇士行動起來吧！");
            cm.dispose();
                } else {
                    cm.sendOk("溫馨提示：#b\r\n副本重置失敗，樂豆點剩餘不足(3000)或你還剩餘次數.");
                    cm.dispose();
                }
                    break;
        case 2:
           if (cm.getPlayer().getCSPoints(1)>=10000 && cm.getPQLog("進階殘暴炎魔") > 1) {
            cm.gainNX(-10000/5);
                    cm.resetPQLog("進階殘暴炎魔");
                    cm.sendOk("溫馨提示：#b\r\n副本重置成功，勇士行動起來吧！");
            cm.dispose();
                } else {
                    cm.sendOk("溫馨提示：#b\r\n副本重置失敗，樂豆點剩餘不足(1W)或你還剩餘次數.");
                    cm.dispose();
                }
                    break;
        case 3:
           if (cm.getPlayer().getCSPoints(1)>=10000 && cm.getPQLog("進階黑龍") > 1) {
            cm.gainNX(-10000/5);
                    cm.resetPQLog("進階黑龍");
                    cm.sendOk("溫馨提示：#b\r\n副本重置成功，勇士行動起來吧！");
            cm.dispose();
                } else {
                    cm.sendOk("溫馨提示：#b\r\n副本重置失敗，樂豆點剩餘不足(1W)或你還剩餘次數.");
                    cm.dispose();
                }
                    break;
        case 4:
           if (cm.getPlayer().getCSPoints(1)>=10000 && cm.getPQLog("獅子王") > 1) {
            cm.gainNX(-10000/5);
                    cm.resetPQLog("獅子王");
                    cm.sendOk("溫馨提示：#b\r\n副本重置成功，勇士行動起來吧！");
            cm.dispose();
                } else {
                    cm.sendOk("溫馨提示：#b\r\n副本重置失敗，樂豆點剩餘不足(1W)或你還剩餘次數.");
                    cm.dispose();
                }
                    break;
        case 5:
           if (cm.getPlayer().getCSPoints(1)>=10000 && cm.getPQLog("皮卡啾") > 1) {
            cm.gainNX(-10000/5);
                    cm.resetPQLog("皮卡啾");
                    cm.sendOk("溫馨提示：#b\r\n副本重置成功，勇士行動起來吧！");
            cm.dispose();
                } else {
                    cm.sendOk("溫馨提示：#b\r\n副本重置失敗，樂豆點剩餘不足(1W)或你還剩餘次數.");
                    cm.dispose();
                }
                    break;
        case 6:
           if (cm.getPlayer().getCSPoints(1)>=20000 && cm.getPQLog("西格諾斯") >= 1) {
            cm.gainNX(-20000/5);
                    cm.resetPQLog("西格諾斯");
                    cm.sendOk("溫馨提示：#b\r\n副本重置成功，勇士行動起來吧！");
            cm.dispose();
                } else {
                    cm.sendOk("溫馨提示：#b\r\n副本重置失敗，樂豆點剩餘不足(2W)或你還剩餘次數.");
                    cm.dispose();
                }
                    break;
        case 7:
    if( cm.haveItem(4000243,1) && cm.haveItem(4000235,1) && (cm.getPQLog("進階殘暴炎魔") > 1 || cm.getPQLog("進階黑龍") > 1 || cm.getPQLog("皮卡啾") > 1)){
                    cm.resetPQLog("進階殘暴炎魔");
                    cm.resetPQLog("進階黑龍");
                    cm.resetPQLog("皮卡啾");
            cm.gainItem(4310015,-10);
        cm.sendOk("重置成功.祝你遊戲愉快!");
        cm.dispose();
} else {
        cm.sendOk("你沒有帶來鬥神證物(怪物嘉年華獲得)\r\n或你的挑戰次數還沒有使用完哦");
        cm.dispose();
}
            break;
        }
    }
}