var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (cm.getPlayer().getMapId() == 925100700) {
        cm.removeAll(4001117);
        cm.removeAll(4001120);
        cm.removeAll(4001121);
        cm.removeAll(4001122);
        cm.warp(251010404, 0);
        cm.dispose();
        return;
    }
    var em = cm.getEventManager("Pirate");
    var eim = cm.getEventInstance();
    if (em == null || eim == null) {
        cm.sendNext("配置文件出錯,請聯繫管理員。");
        cm.dispose();
        return;
    }
    if (!cm.isLeader()) {
        cm.sendNext("請你們的隊長和我說話。");
        cm.dispose();
        return;
    }
    switch (cm.getPlayer().getMapId()) {
        case 925100000:
            cm.sendNext("你和你的隊員即將進入海盜的船,打開箱子消滅所有怪物到右邊光圈即可進入下一關。");
            cm.dispose();
            break;
        case 925100100:
            var emp = eim.getProperty("stage2");
            if (emp == null) {
                eim.setProperty("stage2", "0");
                emp = "0";
            }
            if (emp.equals("0")) {
                if (cm.haveItem(4001120, 20)) {
                    cm.sendNext("非常好,現在抓緊時間收集20個#b#z4001121##k交給我吧。");
                    cm.removeAll(4001120);
                    eim.setProperty("stage2", "1");
                    eim.schedule("checkPQDone", 100);
                } else {
                    cm.sendNext("你和你的隊員即將進入海盜的船,現在你們必須收集20個#b#z4001120##k交給我,才可以開始下一個考驗。");
                }
            } else if (emp.equals("1")) {
                if (cm.haveItem(4001121, 20)) {
                    cm.sendNext("非常好,現在抓緊時間收集20個#b#z4001122##k交給我吧。");
                    cm.removeAll(4001121);
                    eim.setProperty("stage2", "2");
                    eim.schedule("checkPQDone", 100);
                } else {
                    cm.sendNext("你和你的隊員即將進入海盜的船,現在你們必須收集20個#b#z4001121##k交給我,才可以開始下一個考驗。");
                }
            } else if (emp.equals("2")) {
                if (cm.haveItem(4001122, 20)) {
                    cm.sendNext("非常好,抓緊時間前往下一階段吧!");
                    cm.removeAll(4001122);
                    eim.setProperty("stage2", "3");
                    eim.schedule("setDone", 100);
                } else {
                    cm.sendNext("你和你的隊員即將進入海盜的船,現在你們必須收集20個#b#z4001122##k交給我,才可以開始下一個考驗。");
                }
            } else {
                cm.sendNext("時間大門已經打開,你們可以前往下一關了,抓緊時間。");
            }
            cm.dispose();
            break;
        case 925100200:
            cm.sendNext("海盜船的襲擊,我們必須毀滅守衛第一。");
            cm.dispose();
            break;
        case 925100201:
            if (cm.getMap().getAllMonster().size() == 0) {
                cm.sendNext("Excellent.");
                if (eim.getProperty("stage2a").equals("0")) {
                    cm.getMap().setReactorState();
                    eim.setProperty("stage2a", "1");
                }
            } else {
                cm.sendNext("這些風鈴草都藏起來了. 我們必須解救他們.");
            }
            cm.dispose();
            break;
        case 925100301:
            if (cm.getMap().getAllMonster().size() == 0) {
                cm.sendNext("Excellent.");
                if (em.getProperty("stage3a").equals("0")) {
                    cm.getMap().setReactorState();
                    em.setProperty("stage3a", "1");
                }
            } else {
                cm.sendNext("這些風鈴草都藏起來了. 我們必須解救他們.");
            }
            cm.dispose();
            break;
        case 925100202:
        case 925100302:
            cm.sendNext("這些都是船長和克羅斯，他們把一生獻給了海盜。如你所見，殺了他們.");
            cm.dispose();
            break;
        case 925100400:
            cm.sendNext("消滅怪物收集骷髏鑰匙來關上所有的門,進入下一階段!");
            cm.dispose();
            break;
        case 925100500:
            if (cm.getMap().getAllMonster().size() == 0) {
                cm.warpParty(925100600);
            } else {
                cm.sendNext("請擊敗紅鼻子海盜團的船長老海盜！");
            }
            cm.dispose();
            break;
    }
}
