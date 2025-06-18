var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    if (cm.getMapId() != 700000100) {
        cm.sendOk("如果你想結婚,請告訴我.");
        cm.dispose();
        return;
    }
    if (status == 0) {
        cm.sendYesNo("你想開始結婚儀式嗎?");
    } else if (status == 1) {
        var marr = cm.getQuestRecord(160001);
        var data = marr.getCustomData();
        if (data == null) {
            marr.setCustomData("0");
            data = "0";
        }
        if (data.equals("0")) {
            if (!cm.getParty().getMembers().size() == 2) { //判斷組隊成員是否達到2人。
                cm.sendNext("組隊人員不能超過兩個人。不是你們兩個人結婚嗎？");
                cm.dispose();
            } else if (!cm.isLeader()) { // 不是隊長
                cm.sendOk("你想結婚嗎？那就請你的組隊長和我講話吧…");
                cm.dispose();
            } else if (cm.getPlayer().getMarriageId() > 0) { //查看玩家是否已經結婚。
                cm.sendNext("你已經結婚了吧… 結婚的話是不能再結婚的。");
                cm.dispose();
            } else if (cm.MarrageChecking() == 3) { //檢測組隊中是否已經結婚
                cm.sendNext("你的組隊中，已經有人結過婚了。\r\n請檢查後再試。");
                cm.dispose();
            } else if (cm.allMembersHere() == false) { //檢測是否在同1地圖
                cm.sendNext("請確保您的伴侶和您在同一地圖。");
                cm.dispose();
            } else if (cm.MarrageChecking() == 4) {
                cm.sendNext("我不支持同性結婚。所以不讓你們進去");
                cm.dispose();
            } else if (cm.MarrageChecking() == 5) {
                cm.sendNext("男士:#b#b#t1050121##k或#b#b#t1050122##k或#b#b#t1050113##k，女士:#b#t1051129##k或#b#t1051130##k或#b#t1051114##k。其中#b#t1050121##k，#b#t1051129##k，#b#t1050113##k，#b#t1051114##k,這些道具在冒險商城可以購買，#b#t1050122##k和#b#t1051130##k是在那邊那位紅線女那裡賣。\r\n\r\n#b請穿上禮服後再和我對話。");
                cm.dispose();
            } else if (cm.MarrageChecking() == 6) {
                cm.sendNext("組隊成員中有人沒有結婚戒指。");
                cm.dispose();
            } else {
                var chr = cm.getMap().getCharacterById(cm.getPartyFormID());
                if (chr == null) {
                    cm.sendOk("請確定你的伴侶是在同一地圖.");
                    cm.dispose();
                    return;
                }
                marr.setCustomData("2_");
                cm.setCustomData(chr, 160001, "2_");
                cm.doWeddingEffect(chr);
            }
        } else if (data.equals("2_") || data.equals("2")) {
            if (cm.getPlayer().getMarriageId() <= 0) {
                cm.sendOk("請確認你的伴侶同意開始結婚儀式.");
                cm.dispose();
                return;
            }
            var chr = cm.getMap().getCharacterById(cm.getPlayer().getMarriageId());
            if (chr == null) {
                cm.sendOk("請確定你的伴侶是在同一地圖.");
                cm.dispose();
                return;
            }
            cm.setCustomData(160001, "3");
            cm.setCustomData(chr, 160001, "3");
            var dat = parseInt(cm.getQuestRecord(160002).getCustomData());
            if (dat > 10) {
                cm.warpMap(700000200, 0);
            } else {
                cm.setCustomData(chr, 160002, "0");
                cm.setCustomData(160002, "0");
                cm.warpMap(700000300, 0);
            }
        } else {
            cm.sendOk("你們開始結婚啦!");
        }
        cm.dispose();
    }
}
