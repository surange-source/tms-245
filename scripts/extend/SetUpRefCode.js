var RewardItems = {
    0:{
        // 女僕機器人交換券
        ItemID:2430879,
        Amount:1
    },
    1:{
        // 經驗值2倍券
        ItemID:2450159,
        Amount:20
    },
    2:{
        // 超級藥水
        ItemID:2000005,
        Amount:100
    }
};
var mileageAmount = 1000;

var status = -1;
var ask = null;
var upCode = 0;
function start() {
    if (ask == null) {
        ask = cm.getWorldShareInfo(999999, "AskRefCode") != 1;
        if (cm.getClient().getUpId() > 0) {
            ask = false;
        }
    }
    if (ask) {
        var msg = "";
        for each (item in RewardItems) {
            msg += "\r\n#v" + item.ItemID + ":# #t" + item.ItemID + ":#" + item.Amount + "個";
        }
        cm.askYesNoNoESC("你好，歡迎來到" + cm.getServerName() + "，是否需要輸入邀請碼？\r\n\r\n#e受邀請的人能獲得#n\r\n#b#v1202193# #t1202193#(30天，僅可在帳號內交換)" + msg + "\r\n#v2431872# #t2431872#" + mileageAmount + "點");
    } else {
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    var i = -3;
    if (status == i++) {
        cm.updateWorldShareInfo(999999, "AskRefCode", "1");
        cm.dispose();
    } else if (status == i++) {
        cm.askYesNoNoESC("#fs25##fn明細體#不輸入的話，之後將#e#r不能再領取邀請獎勵#n#k了，請確認是否需要輸入邀請碼？");
        cm.getPlayer().dropMessage(1, "請看清楚再選擇。");
    } else if (status == i++) {
        status = -1;
        start();
    } else if (status == i++) {
        cm.askTextNoESC("請輸入邀請碼：", 6, 6);
    } else if (status == i++) {
        cm.sendNextPrevNoESC("你輸入的邀請碼是[#b#e" + cm.getText() + "#k#n]，請確認。");
    } else if (status == i++) {
        var result = cm.getClient().setUpRefCode(cm.getText());
        if (true) {
            // 輪迴碑石獎勵
            var equip = cm.getEquip(1202193);
            // equip.setExpiration(java.lang.System.currentTimeMillis() + 30 * 24 * 60 * 60 * 1000);
            // equip.setGMLog("設定邀請碼腳本獲得 地圖: " + cm.getMapId() + " 時間: " + new java.text.SimpleDateFormat("yyyy年MM月dd日HH時mm分ss秒").format(new java.util.Date()));
            var ii = cm.getItemInfo();
            var ret = 0x1400;
            if (!ii.isTradeBlock(1202193)) {
                ret |= 0x8;
            }
            if (!ii.isCash(1202193)) {
                ret |= 0x10;
            }
            equip.setAttribute(ret);
            cm.addByItem(equip);

            // 道具獎勵
            for each (item in RewardItems) {
                cm.gainItem(item.ItemID, item.Amount);
            }

            cm.getPlayer().modifyMileage(mileageAmount);
            status = -2;
            action(0, 0, 0);
        } else {
            cm.askMenuNoESC("輸入的邀請碼不存在，請重新再試。\r\n#b#L0#取消輸入邀請碼#l\r\n#L1#重新嘗試#l");
        }
    } else if (status == i++) {
        if (selection == 0) {
            status = -3;
            action(1, 0, 0);
        } else {
            status = -1;
            action(1, 0, 0);
        }
    } else {
        cm.dispose();
    }
}