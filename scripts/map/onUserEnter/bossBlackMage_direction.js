
function start(){
    switch ( ms.getMapId() ){
        case 450013000:
            ms.setInGameDirectionMode(true, false, false, false);
            ms.setLayerBlind(true, 255, 0);
            ms.playSpineScreen(true, false, true, 0, "Effect/Direction20.img/bossBlackMage/start_spine/blasck_space", "animation", "", false, 0, 0, 0, 0, null);
            ms.playFieldSound("Sound/SoundEff.img/BM3/boss_start", 200);
            ms.setDelay(6000);
            break;
        case 450013200:
            ms.setInGameDirectionMode(true, false, false, false);
            ms.setLayerBlind(true, 255, 0);
            ms.playSpineScreen(true, false, true, 0, "Effect/Direction20.img/bossBlackMage/start2_spine/skeleton", "animation", "", false, 0, 0, 0, 0, null);
            ms.playFieldSound("Sound/SoundEff.img/BM3/boss_start2", 200);
            ms.setDelay(6000);
            break;
        case 450013400:
            ms.setInGameDirectionMode(true, false, false, false);
            ms.setLayerBlind(true, 255, 0);
            ms.playSpineScreen(true, false, true, 0, "Effect/Direction20.img/bossBlackMage/space/blasck_space", "animation", "", false, 0, 0, 0, 0, null);
            ms.playFieldSound("Sound/SoundEff.img/BM3/boss_start3", 200);
            ms.setDelay(6000);
            break;
        case 450013600:
            ms.setInGameDirectionMode(true, false, false, false);
            ms.setLayerBlind(true, 255, 0);
            ms.playSpineScreen(true, false, true, 0, "Effect/Direction20.img/bossBlackMage/start4_spine/black_Phase_3_4", "animation", "", false, 0, 0, 0, 0, null);
            ms.playFieldSound("Sound/SoundEff.img/BM3/boss_start4", 200);
            ms.setDelay(6000);
            break;
        default:
            ms.dispose();
    } 
}

function action(mode, type, selection) {
    ms.sendDirectionEvent("UNK_226_5", 700);
    ms.setInGameDirectionMode(false, true, false, false);
    ms.setLayerBlind(false, 255, 0);
    ms.dispose();
    switch ( ms.getMapId() ){
        case 450013000:            
            ms.warp(450013100);
            break;
        case 450013200:
            ms.warp(450013300);
            break;
        case 450013400:
            ms.warp(450013500);
            break;
        case 450013600:
            ms.warp(450013700);
            break;
        default:
            ms.dispose();
    } 
    return;
}
