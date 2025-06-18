/*
 
 */

var status = -1;

function action(mode, type, selection) {
    if (mode >= 1) {
        status++;
    } else {
        status--;
    }
    var em = ms.getEventManager("Kenta");
    var eim = ms.getEventInstance();
    if (em != null && eim != null) {
        var state = em.getProperty("Kenta");
        if (eim.getProperty("caveBreak").equals("0")) {
            if (status == 0) {
                ms.sendSceneUI();
                ms.EnableUI(1);
                ms.showPQEffect(3, "cave1", "0");
                ms.setDelay(100);
                ms.setInGameCurNodeEventEnd(true);
            } else if (status == 1) {
                ms.showScreenShaking(ms.getMapId(), false);
                ms.setDelay(2000);
            } else if (status == 2) {
                ms.showScreenShaking(ms.getMapId(), true);
                ms.topMsg("洞窟堵上了。我們必須找到上去的方法。如果裝滿水……能夠上去嗎？");
                ms.setDelay(1500);
            } else if (status == 3) {
                ms.sendSceneUI();
                ms.EnableUI(0);
                ms.startMapEffect("我們合力推一下石頭吧。在洞窟入口集合後，隊長請和我對話。", 5120052);
                ms.dispose();
            }
        } else if (eim.getProperty("caveBreak").equals("1")) {
            if (status == 0) {
                ms.showSetAction("start", "WaterLevelUp_WaterUp");
                ms.showSetAction("wait", "WaterLevelUp_Timing");
                ms.showSetAction("maxWater", "kenta_batAttack");
                ms.setInGameCurNodeEventEnd(true);
                ms.sendSceneUI();
                ms.EnableUI(1);
                ms.topMsg("我們必須同時推石頭！一！二！");
                ms.setInputUI(2);
            } else if (status == 1) {
                ms.sendSceneUI();
                ms.EnableUI(0);
                ms.showSetAction("timing", eim.getProperty("timing"));
                var c = parseInt(eim.getProperty("timing")) + 1;
                eim.setProperty("timing", String(c));
                ms.dispose();
            }
        }
    }
}
