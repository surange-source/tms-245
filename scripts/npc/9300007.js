/*
 紅鸞店 - 守衛兵 天長
 */

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status >= 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        cm.sendSimple("這裡結婚的紅鸞宮門口。你想做什麼？\r\n#b#L0#我想進去紅鸞宮。#l\r\n#L1#請告訴我關於結婚的信息。#l\r\n#L2#我是賀客。我想去宴客堂。#l\r\n#L3#請告訴我關於離婚的說明。#l\r\n#L4#我想進去孤星殿。#l\r\n#L5#我想回家。#l");
    } else if (status == 1) {
        if (selection == 0) { //我想進去紅鸞宮
            if (cm.getParty() == null || !cm.isLeader()) {
                cm.sendOk("只有組隊長來跟我說才可以允許讓你們進去。你們倆中隊長來跟我說吧。");
                cm.dispose();
                return;
            } else {
                cm.sendYesNo("哦……你想進去紅鸞殿嗎？結婚乃人生大事，要進去必須要滿足幾個條件，如果你想聽你要滿足的條件。我願給你說明。");
            }
        } else if (selection == 1) { //請告訴我關於結婚的信息。
            status = 3;
            cm.sendNext("結婚是二個人的事，你想結婚就先要找一個對象吧？你一個人怎麼能結婚？");
        } else if (selection == 2) { //我是賀客。我想去宴客堂。
            status = 9;
            cm.sendNext("你要去宴客堂嗎？要去宴客堂必須有#v4212002#(1個)，才可以進去。");
        } else if (selection == 3) { //請告訴我關於離婚的說明。
            status = 11;
            cm.sendNext("你想離婚嗎？你再想想吧。");
        } else if (selection == 4) { //我想進去孤星殿。
            status = 14;
            cm.sendNext("你想去孤星殿嗎？要進去你一定要有結婚戒指和離婚手續費。");
        } else if (selection == 5) { //我想進去孤星殿。
            status = 15;
            cm.sendNext("你想回去嗎？你這次下去再次上來的時候還要付費。");
        }
    } else if (status == 2) {
        cm.sendNext("好！我看看你是否滿足結婚的條件後，就送你到宮殿裡。");
    } else if (status == 3) {
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
            var maps = Array(700000100, 700000200, 700000300);
            for (var i = 0; i < maps.length; i++) {
                if (cm.getMap(maps[i]).getCharactersSize() > 0) {
                    cm.sendNext("結婚地圖現在有別的玩家正在舉行婚禮，請稍後在試。");
                    cm.dispose();
                    return;
                }
            }
            cm.warpParty(700000100);
            cm.dispose();
            //cm.worldMessage(5, "<頻道 " + cm.getClient().getChannel() + "> " + cm.getPlayer().getName() + " 和 " + chr.getName() + " 的婚禮即將開始。");
        }
        cm.dispose();
    } else if (status == 4) {
        cm.sendNextPrev("兩位來我這裡後你們一定要給我能證明兩位是真正戀人的標誌，就是戀人戒指。同時兩位必須戴好戀人戒指，才能進去結婚。");
    } else if (status == 5) {
        cm.sendNextPrev("要結婚還需要滿足另外條件，第一個是兩位應該組隊，組隊後請隊長來跟我說，就能一起進去。");
    } else if (status == 6) {
        cm.sendNextPrev("第二個條件是你們應該穿好結婚禮服，想要進到神聖的紅鸞殿，一定要做好「結婚的準備」");
    } else if (status == 7) {
        cm.sendNextPrev("要穿的衣服是這樣。男士:#b#b#t1050121##k或#b#b#t1050122##k或#b#b#t1050113##k，女士:#b#t1051129##k或#b#t1051130##k或#b#t1051114##k。其中#b#t1050121##k，#b#t1051129##k，#b#t1050113##k，#b#t1051114##k,這些道具在冒險商城可以購買，#b#t1050122##k和#b#t1051130##k是在那邊那位紅線女那裡賣。");
    } else if (status == 8) {
        cm.sendNextPrev("另外你要結婚一定要付結婚登記費，要10萬楓幣。這是必須的哦。呵呵。");
    } else if (status == 9) {
        cm.sendNextPrev("這裡只能一對一對新人結婚，後面的戀人需要等待。所以你們進去結婚時，請務必在5分鐘之內辦完所有手續。");
        cm.dispose();
    } else if (status == 10) {
        if (cm.getMap(700000100).getCharactersSize() <= 0 && cm.getMap(700000200).getCharactersSize() <= 0) {
            cm.sendNext("結婚地圖現在沒有玩家進行結婚，請稍後在試。");
            cm.dispose();
             return;
        }
        if (cm.haveItem(4212002)) {
            cm.gainItem(4212002, -1);
            cm.warp(700000200);
            cm.sendNext("看來你帶來了#v4212002#(1個)，我已經將你送到宴客堂。");
            cm.dispose();
        } else {
            cm.sendNext("你好像沒有#v4212002#(1個)吧。沒有#v4212002#(1個)就進不去");
            cm.dispose();
        }
    } else if (status == 11) {
        cm.sendNextPrev("如果你堅持離婚，進去孤星殿可以進行離婚。在孤星殿有法海師傅，聽說他是月下老人的弟弟。");
    } else if (status == 12) {
        cm.sendNextPrev("但是要離婚請在背包放結婚戒指，而且要付更多的錢，因為離婚不是那麼容易的事情。離婚費要100萬楓幣。");
    } else if (status == 13) {
        cm.sendNextPrev("付給我100萬楓幣後進去孤星殿，法海師傅會幫你處理離婚事宜。提醒一下離婚後，結婚戒指會同時消失。");
        cm.dispose();
    } else if (status == 14) {
        //to do
    } else if (status == 15) {
        cm.warp(700000101);
        cm.dispose();
        //if (cm.haveItem(1112804)) { //結婚戒指
        //cm.warp(700000101)
        //cm.dispose();
        //} else {
        //cm.sendOk("你好像沒有結婚戒指吧。沒有戒指就進不去.")
        //cm.dispose();
        //}
    } else if (status == 16) {
        var returnMap = cm.getSavedLocation("MULUNG_TC");
        cm.clearSavedLocation("MULUNG_TC");
        if (returnMap < 0) {
            returnMap = 211000000;
        }
        var target = cm.getMap(returnMap);
        var portal = target.getPortal("unityPortal2");
        if (portal == null) {
            portal = target.getPortal(0);
        }
        if (cm.getMapId() != target) {
            cm.getPlayer().changeMap(target, portal);
        }
        cm.dispose();
    }
}
