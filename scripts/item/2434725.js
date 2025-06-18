var itemids = new Array(
    3700345, // MVP 銀
    5044018, // MVP瞬間移動世界地圖
    1115100, // MVP名牌戒指(銀)
    1115012, // MVP聊天戒指(銀)
    3130000 // MVP特殊傷害字型
);

function start() {
    if (!im.getPlayer().isSilverMvp()) {
        im.sendOk("很抱歉，你還未達成#eMVP銀#n等級，無法使用特殊包。");
        im.dispose();
    } else {
        var menu = "";
        if (im.getWorldShareInfo(242, "r2") != "1") {
            menu += "\r\n#L2##b立即獲得#i3801533#銀牌等級達成紅利120楓葉點數 #l";
        } else if (im.getWorldShareInfo(242, "r1") != "1") {
            menu += "\r\n#L1##b立即獲得維持#i3801533#等級紅利20楓葉點數 #l";
        }
        for (var i = 0; i < itemids.length; i++) {
            var rewarded = im.getWorldShareInfo(90, "r" + (i+3));
            if (rewarded != "1") {
                menu += "\r\n#L" + (i+3) + "#  #i" + itemids[i] + ":# #b#t" + itemids[i] + ":##l";
            }
        }
        if (menu == "" || (im.getWorldShareInfo(90, "1") == "1" && im.getWorldShareInfo(242, "r1") == "1" && im.getWorldShareInfo(242, "r2") == "1")) {
            im.used();
            im.sendOk("MVP 銀特殊包全部禮物已經完成配發。");
            im.dispose();
        } else {
            im.updateWorldShareInfo(90, "1", "0");
            im.sendSimple("恭喜達成#eMVP銀#n等級～！\r\n請確認下列禮物！\r\n\r\n   #e[禮物目錄]#n#b" + menu + "#k");
        }
    }
}

function action(mode, type, selection) {
    if (selection < 3) {
        var item = "";
        switch (selection) {
            case 1:
                if (im.getWorldShareInfo(242, "r1") != "1") {
                    im.gainNX(2, 20);
                    im.updateWorldShareInfo(242, "r1", "1");
                    im.updateWorldShareInfo(242, "r2", "1");
                    item = "#b#e維持#ii3801533#等級紅利楓葉點數#n#k";
                }
                break;
            case 2:
                if (im.getWorldShareInfo(242, "r2") != "1") {
                    im.gainNX(2, 120);
                    im.updateWorldShareInfo(242, "r1", "1");
                    im.updateWorldShareInfo(242, "r2", "1");
                    item = "#b#e#ii3801533#等級達成紅利楓葉點數#n#k";
                }
                break;
        }
        if (item == "") {
            im.sendOk("發生未知錯誤.");
        } else {
            im.sendOk("已發送禮物。\r\n\r\n#e<獲得的禮物>#b\r\n" + item);
        }
    } else if (selection < 3 || selection > itemids.length + 2) {
        im.sendOk("發生未知錯誤.");
        im.dispose();
        return;
    } else {
        var rewarded = im.getWorldShareInfo(90, "r" + selection);
        im.topMsg(rewarded);
        if (rewarded != "1") {
            var index = selection - 3;
            if (!im.canHold(itemids[index])) {
                im.sendOk("請將欄位空出一格。");
            } else {
                im.gainItemMonthly(itemids[index], 1);
                im.sendOk("已完成禮物配發請確認背包。\r\n\r\n#e<獲得禮物>#b\r\n#i" + itemids[index] + ":# #t" + itemids[index] + "#");
                im.updateWorldShareInfo(90, "r" + selection, "1");
                var menu = "";
                for (var i = 3; i <= itemids.length + 2; i++) {
                    var rewarded = im.getWorldShareInfo(90, "r" + i);
                    if (rewarded != "1") {
                        menu += "0";
                    }
                }
                if (menu == "") {
                    im.updateWorldShareInfo(90, "1", "1");
                }
            }
        } else {
            im.sendOk("你已經領取過這個道具。");
        }
    }
    if (im.getWorldShareInfo(90, "1") == "1" && im.getWorldShareInfo(242, "r1") == "1" && im.getWorldShareInfo(242, "r2") == "1") {
        im.used();
    }
    im.dispose();
}