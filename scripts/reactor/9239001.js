/*  
 *  
 *  功能：組隊任務：陷入危機的坎特
 *  反應堆腳本
 * 
 */

function act() {
    var em = rm.getEventManager("Kenta");
    var eim = rm.getEventInstance();
    rm.getReactor().setDelay(200000);
    if (em != null && eim != null && rm.getPlayer().getParty() != null) {
        var value;
        if (rm.getPosition().distanceSq(new java.awt.Point(-403, 257)) < 2000) {//cave 1
            value = parseInt(eim.getProperty("cave1")) + 1;
            if (value <= 3) {
                rm.setSrcPos();
                rm.delayedDestroyReactor(100);
                eim.setProperty("cave1", String(value));
                rm.showPQEffect(3, "cave1", eim.getProperty("cave1"));
            }
        } else if (rm.getPosition().distanceSq(new java.awt.Point(-639, 959)) < 2000) { //cave 2
            value = parseInt(eim.getProperty("cave2")) + 1;
            if (value <= 3) {
                rm.setSrcPos();
                rm.delayedDestroyReactor(100);
                eim.setProperty("cave2", String(value));
                rm.showPQEffect(3, "cave2", eim.getProperty("cave2"));
            }
        } else if (rm.getPosition().distanceSq(new java.awt.Point(107, 1776)) < 2000) { //cave 3
            value = parseInt(eim.getProperty("cave3")) + 1;
            if (value <= 3) {
                rm.setSrcPos();
                rm.delayedDestroyReactor(100);
                eim.setProperty("cave3", String(value));
                rm.showPQEffect(3, "cave3", eim.getProperty("cave3"));
            }
        } else if (rm.getPosition().distanceSq(new java.awt.Point(535, 1065)) < 2000) { //case 4
            value = parseInt(eim.getProperty("cave4")) + 1;
            if (value <= 3) {
                rm.setSrcPos();
                rm.delayedDestroyReactor(100);
                eim.setProperty("cave4", String(value));
                rm.showPQEffect(3, "cave4", eim.getProperty("cave4"));
            }
        }
        var vv = 0;

        for (i = 1; i < 4; i++) {
            if (eim.getProperty("cave" + i).equals("3")) {
                vv++;
            }
        }
        if (vv >= 2) {
            em.setProperty("state", "3");
            eim.getMapInstance(1).setSpawns(false);
            rm.showEffect(true, "aswan/clear");
            rm.playSound(true, "Party1/Clear");
            rm.getMap().startMapEffect("我在探索的時候發現了一個洞窟。在怪物們再次出現之前，我們先去那裡吧。", 5120052);
        }

    }
}
