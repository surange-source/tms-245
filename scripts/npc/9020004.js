/*  
 *  
 *  功能：組隊任務：陷入危機的坎特
 *  
 */
var status = -1;
function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status <= 1) {
            cm.sendNext("好的,那請加油。");
            cm.safeDispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        var em = cm.getEventManager("Kenta");
        var eim = cm.getEventInstance();
        if (em != null && eim != null) {
            var state = em.getProperty("state");
            if (cm.getMapId() / 100 == 9230401) {
                if (state.equals("1") && eim.getProperty("KentaSave").equals("1")) {
                    cm.startMapEffect("我呼吸困難……請你消滅周邊的怪物，拿到10個空氣鈴。快……", 5120052);
                    eim.setProperty("KentaSave", "2");
                } else if (eim.getProperty("KentaSave").equals("2")) {
                    if (cm.haveItem(2430364, 10)) {
                        cm.gainItem(2430364, -10);
                        cm.startMapEffect("咻，真是差點就要出大事了。現在氧氣充足，我們快到安全的地方去吧。", 5120052);
                        cm.removeNpc(9020004);
                        var mob = em.getMonster(9300460);
                        cm.getPlayer().getEventInstance().registerMonster(mob);
                        eim.setProperty("HP", String(mob.getHp()));
                        cm.getMap().spawnMonsterOnGroundBelow(mob, new java.awt.Point(201, 1800));
                        cm.displayNode(mob);
                        eim.setProperty("KentaSave", "3");
                    } else {
                        cm.startMapEffect("呼吸越來越困難了。請快點過來。", 5120052);
                    }
                } else {
                    cm.startMapEffect("請幫幫我……請破壞受難船的殘骸，把我救出去吧。", 5120052);
                }
                cm.dispose();
            } else if (cm.getMapId() / 100 == 9230403) {
                if (eim.getProperty("caveBreak").equals("0") && cm.isLeader() && cm.checkPartyMemberNearby(new java.awt.Point(-39, 168))) {
                    eim.setProperty("caveBreak", "1");
                    cm.dispose();
                    cm.onUserEnter("kenta_caveEff");
                } else {
                    cm.sendOk("我們必須團結起來。所有隊員請到洞窟入口集合。");
                    cm.safeDispose();
                }
            } else if (cm.getMapId() / 100 == 9230404) {
                if (cm.getMap().getAllMonster().size() == 0) {
//                    var maple = Math.floor(Math.random() * 10) + 20;
                    if (!cm.canHold(4001535, 1)) {//|| !cm.canHold(4001126, maple)
                        cm.sendOk("請確認其他欄空間！");
                        cm.dispose();
                        return;
                    }
//                    cm.gainItem(4001713, 1);
                    cm.gainExp_PQ(200, 5);
                    cm.gainPQPoint();
//                    cm.gainItem(4001126, maple);
                    cm.gainItem(4001535, 1);
                    if (cm.getEventCount("Kenta") < 10) {
                        cm.setEventCount("Kenta");
                        cm.gainNX(2, 1000);
                    }
                    cm.addTrait("will", 26);
                    cm.addTrait("charm", 26);
                    cm.warp(923040000, 0);
                    cm.dispose();
                } else {
                    cm.sendSimple("海洋生物的狀態好像更加異常了。竟然變得這麼殘暴……你想回去了嗎？\r\n#b#L0#我想離開這裡……#l");
                }
            }
        }
    } else if (status == 1) {
        if (selection == 0) {
            cm.sendYesNo("你就這樣走了的話，我該怎麼辦呢？請再考慮一下。你真的要走嗎？");
        }
    } else if (status == 2) {
        cm.warp(923040000, 0);
        cm.dispose();
    }
}
