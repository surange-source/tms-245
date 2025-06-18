var status = -1;

function start(mode, type, selection) {
    if (mode == 0) {
        qm.sendOk("如果你改變了注意，隨時告訴我哦。假日還長呢！");
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            qm.askAcceptDecline("你好，#b#h0##k，為了迎接長假，我們準備了一個小遊戲，你要參加嗎？");
        } else if (status == 1) {
            qm.sendNext("我來介紹讓5月的長假能夠更加歡樂的#r<假日桌游>#k吧。從現在開始到#b2016年5月15日#k，你可以在畫面左邊看到#i3994526# #r假日骰子圖標#k。");
        } else if (status == 2) {
            qm.sendNext("點擊骰子圖標就能進入遊戲。 在背包裝飾欄中可以投擲假日骰子。投擲骰子進行移動，就能獲得各種任務和禮物。");
        } else if (status == 3) {
            qm.sendNext("完成任務條件時，畫面左邊的骰子就會發光。點擊骰子打開<假日桌游>就能完成任務，如果背包已滿，無法完成任務，那麼在自己的位置點擊#r移動的對話框#k就能完成！");
        } else {
            qm.sendNext("請你好好享受假日桌游吧。下次通過畫面左邊的活動提示，#r每10分鐘就能獲得1個#k骰子。");
            qm.setQuestCustomData("endDate=20160525;cell=0;state=2;finish=0");
            qm.dispose();
        }
    }
}

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        qm.dispose();
    }
}