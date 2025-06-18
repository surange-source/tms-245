var status = -1;

function action(mode, type, selection) {
    if (mode >= 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        ms.setInGameCurNodeEventEnd(true);
        ms.EnableUI(1, false);
        ms.removeAdditionalEffect();
        ms.setVansheeMode(1);
        //FieldEffect 10 01 FF 00 00 00 00 00 00 00 00 00 00 00
        ms.setCameraZoom(0, 2500, 0, 0, 0);
        ms.setInGameCurNodeEventEnd(true);
    } else if (status == 1) {
        ms.setDelay(1500);
    } else if (status == 2) {
        ms.sendNextNoESC("你能聽到嗎…聽到了嗎？", 1540940);
    } else if (status == 3) {
        ms.sendNextSNoESC("這個聲音是…？");
    } else if (status == 4) {
        ms.setCameraZoom(8000, 1000, 8000, 0, 0);
        //LP_FieldEffect 10 00 00 00 00 00 00 00 00 00 70 17 00 00
        ms.setDelay(1000);
    } else if (status == 5) {
        //LP_FieldEffect  Sound/SoundEff.img/blackHeaven/toaird
        //05 24 00 53 6F 75 6E 64 2F 53 6F 75 6E 64 45 66 66 2E 69 6D 67 2F 62 6C 61 63 6B 48 65 61 76 65 6E 2F 74 6F 61 69 72 64 00 00 00
        ms.setDelay(5400);
    } else if (status == 6) {
        ms.sendNextPrevNoESC("啊，真是太好了。你能聽到我們的聲音啊。", 1540940);
    } else if (status == 7) {
        ms.askMenuNoESC("啊…我們剩下的時間已經不多了。你還有什麼問題要問我們嗎？\r\n\r\n#L0# #b黑魔法師為什麼要把你們帶走？#l\r\n#L1# 所謂的艾爾達斯是？#l\r\n#L2# 為了得到你們的力量，我該怎麼做呢？#l\r\n#L3# 我沒有其他問題了。#l", 1540940);
    } else if (status == 8) {
        if (selection == 0) {
            status = 6;
            ms.sendNextNoESC("黑魔法師打算利用我們，創造#r新世界#k。不知道從何時開始，我們艾爾達斯就被未知的力量牽引，像江水一樣流入更高的次元…如果繼續這樣下去，我們會逐漸消失，最終#b這個世界將會消亡#k。", 1540940);
        } else if (selection == 1) {
            status = 6;
            ms.sendNextNoESC("從遠古時期開始，我們就是構成這個世界的最純粹的能量…所有生命和物質都從艾爾達斯中誕生，並返回到艾爾達斯。如果沒有我們，這個世界會逐漸變得面目全非。", 1540940);
        } else if (selection == 2) {
            status = 6;
            ms.sendNextNoESC("你已經足夠強大，做好了接受我們力量的準備。現在你只要獲得#b女神#k的一點幫助就行了。", 1540940);
        } else if (selection == 3) {
            ms.sendNextNoESC("我們現在又要分散，流入某個未知的地方了... 那是我們的宿命。", 1540940);
        }
    } else if (status == 9) {
        ms.sendNextPrevNoESC("請記住，這個世界的命運就掌握在你的手中...", 1540940);
    } else if (status == 10) {
        //LP_FieldEffect  10 01 FF 00 00 00 00 00 00 00 F4 01 00 00
        ms.setDelay(500);
    } else if (status == 11) {
        ms.sendNextSNoESC("剛剛我看到的究竟是什麼呢？再次和#b旁觀者#k對話吧。");
    } else if (status == 12) {
        ms.setDelay(500);
    } else if (status == 13) {
        ms.setVansheeMode(0);
        ms.EnableUI(0, false);
        ms.warp(270010111);
        ms.setCustomData(1460, "1");
        ms.dispose();
    }
}
