function enter(pi) {
    var em = pi.getEventManager("OrbisPQ");
    var eim = pi.getEventInstance();
    if (em != null && eim != null && pi.getPlayer().getParty() != null) {
        var warp = false;
        var mapid = 0;
        switch (pi.getMapId()) {
            case 933032000://女神之塔 - &lt;休息室>
                if (eim.getProperty("stage").equals("2")) {
                    warp = true;
                    mapid = 933032300;
                }
                break;
            case 933033000:// 女神之塔 - &lt;倉庫>
                if (eim.getProperty("stage2").equals("2")) {
                    warp = true;
                    mapid = 933032400;
                }
                //消滅了所有的獨角獅.請隊長和幫傭易克對話,執行下一階段>.
                break;
            case 933034000:// 女神之塔 - &lt;散步路>
                if (eim.getProperty("stage3").equals("2")) {
                    warp = true;
                    mapid = 933032500;
                }
                break;
            case 933035000:// 女神之塔 - &lt;向上通道>
                if (eim.getProperty("stage4").equals("2")) {
                    warp = true;
                    mapid = 933032700;
                }
                break;
            case 933036000://女神之塔 - &lt;中央塔>
                break;
            case 933037000:// 女神之塔 - &lt;庭園>
                if (eim.getProperty("stage5").equals("2")) {
                    warp = true;
                    mapid = 933032600;
                }
                //消滅了遠古精靈.請隊長去幫傭易克那裡領取生命草,移動到中央房間.
                break;
            case 933038000:// 女神之塔 - &lt;女神之祝福>
                break;
        }
        if (warp) {
            pi.warp(mapid, 0);
        } else {
            pi.playerMessage("請先完成當前階段的任務。");
        }
    }
}
