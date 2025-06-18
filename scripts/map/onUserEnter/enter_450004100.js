/*
 Made by Wubin
 */

function start(){
    ms.setInGameDirectionMode(true, false, false, false);
    ms.setLayerBlind(true, 255, 0);
    ms.playSpineScreen(true, false, true, 0, "Map/Effect3.img/BossLucid/Lucid/lusi", "animation", "", false, 0, 0, 0, 0, null);
    ms.playFieldSound("Sound/SoundEff.img/ArcaneRiver/lucid_spine", 200);
    ms.setDelay(10000);
}

function action(mode, type, selection) {
    ms.sendDirectionEvent("UNK_226_5", 700);
    ms.setInGameDirectionMode(false, true, false, false);
    ms.setLayerBlind(false, 255, 0);
    ms.dispose();
    ms.warp(450004150);
    return;
}