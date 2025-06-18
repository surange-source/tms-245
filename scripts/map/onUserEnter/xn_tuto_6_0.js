/*
 
 */

var status = -1;

function action(mode, type, selection) {
        status++;

    if (status == 0) {
    ms.setInGameCurNodeEventEnd(true);
    ms.EnableUI(1);
        ms.setVansheeMode(1);
        ms.spawnNPCRequestController(2159386, 350,30);
        ms.setNPCSpecialAction(2159386, "summon");
        ms.spawnNPCRequestController(2159382, 250,30);
        ms.setNPCSpecialAction(2159382, "summon");
        ms.spawnNPCRequestController(2159385, 480,30);
        ms.setNPCSpecialAction(2159385, "summon");
        ms.spawnNPCRequestController(2159427, 50,30);
        ms.setNPCSpecialAction(2159427, "summon");
        ms.spawnNPCRequestController(2159427, 0,30);
        ms.setNPCSpecialAction(2159427, "summon");
        ms.sendDirectionCameraMove(0,150,200,22);
    } else if (status == 1) {
    ms.setInGameCurNodeEventEnd(true);
        ms.setDelay(2100);
    } else if (status == 2) {
        ms.setNPCSpecialAction(2159427, "die");
        ms.setDelay(120);
    } else if (status == 3) {
        ms.setNPCSpecialAction(2159427, "die");
        ms.setDelay(1500);
    } else if (status == 4) {
        ms.removeNPCRequestController(2159427);
        ms.setDelay(120);
    } else if (status == 5) {
        ms.removeNPCRequestController(2159427);
        ms.sendSelfTalk(1, 2159386, "那些傢伙，真是沒完沒了。");
    } else if (status == 6) {
        ms.sendSelfTalk(1, 2159382, "接到報告說發現了秘密研究所，所以想潛入進來看看。看來這條魚比想像的要大。");
    } else if (status == 7) {
        ms.sendSelfTalk(1, 2159385, "這裡的防禦這麼強，反倒讓人很想看看裡面到底藏著什麼東西？我一定要讓他們的狐狸尾巴露出來。");
    } else if (status == 8) {
        ms.sendSelfTalk(1, 2159382, "貝爾，這都什麼時候了，還說得這麼輕鬆……");
    } else if (status == 9) {
        ms.getNPCDirectionEffect(2159382, "Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 900, 0, -120);
        ms.setDelay(900);
    } else if (status == 10) {
        ms.removeNPCRequestController(2159382);
        ms.spawnNPCRequestController(2159382, 250,30);
        ms.setNPCSpecialAction(2159382, "summon");
        ms.getNPCDirectionEffect(2159382, "Effect/Direction12.img/effect/tuto/BalloonMsg2/12", 1200, 0, -120);
        ms.setNPCSpecialAction(2159382, "catched");
        ms.getNPCDirectionEffect(2159386, "Effect/Direction12.img/effect/tuto/BalloonMsg1/1", 900, 0, -120);
        ms.updateNPCSpecialAction(2159386, 1,30, 100);
        ms.setDelay(2160);
    } else if (status == 11) {
        ms.updateNPCSpecialAction(2159386, -1,2, 100);
        ms.removeNPCRequestController(2159382);
        ms.spawnNPCRequestController(2159383, 270,30);
        ms.setNPCSpecialAction(2159383, "summon");
        ms.setVansheeMode(0);
        ms.setForcedInput(2);
        ms.getNPCDirectionEffect(2159385, "Effect/Direction12.img/effect/tuto/BalloonMsg2/13", 900, 0, -120);
        ms.setDelay(300);
    } else if (status == 12) {
        ms.getNPCDirectionEffect(2159385, "Effect/Direction12.img/effect/tuto/BalloonMsg2/13", 900, 0, -120);
        ms.setDelay(900);
    } else if (status == 13) {
        ms.spawnNPCRequestController(2159377, -700, 30);
        ms.setNPCSpecialAction(2159377, "summon");
        ms.spawnNPCRequestController(2159378, -800, 30);
        ms.setNPCSpecialAction(2159378, "summon");
        ms.sendSelfTalk(3, 2159383, "按照命令，攻擊目標。");
    } else if (status == 14) {
        ms.getNPCDirectionEffect(2159383, "Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 900, 0, -120);
        ms.setDelay(810);
    } else if (status == 15) {
        ms.sendSelfTalk(1, 2159385, "離開吉格蒙特！");
    } else if (status == 16) {
        ms.setForcedAction(4, 0);
        ms.setDelay(2000);
    } else if (status == 17) {
        ms.sendDirectionEffectPlay("Effect/Direction12.img/effect/tuto/BalloonMsg1/1", 900, 0, -120, 0, 0);
        ms.setDelay(810);
    } else if (status == 18) {
        ms.sendSelfTalk(3, 2159385, "呃，頭……頭好痛。");
    } else if (status == 19) {
        ms.sendDirectionEffectPlay("Effect/Direction12.img/effect/tuto/memory/0", 3900, 0, -120, 0, 0);
        ms.setDelay(3900);
    } else if (status == 20) {
        ms.sendDirectionEffectPlay("Effect/Direction12.img/effect/tuto/BalloonMsg0/1", 900, 0, -120, 0, 0);
        ms.setDelay(810);
    } else if (status == 21) {
        ms.sendSelfTalk(3, 2159385, "剛才那是什麼？我想起了從沒見過的場面。心裡這種鬱悶的感覺是什麼……。");
    } else if (status == 22) {
        ms.getNPCDirectionEffect(2159383, "Effect/Direction12.img/effect/tuto/BalloonMsg0/2", 900, 0, -120);
        ms.setDelay(810);
    } else if (status == 23) {
        ms.updateNPCSpecialAction(2159377, 1,650, 100);
        ms.setDelay(150);
    } else if (status == 24) {
        ms.updateNPCSpecialAction(2159378, 1,650, 100);
        ms.sendDirectionCameraMove(0,200,-450,43);
    } else if (status == 25) {
        ms.setDelay(3251);
    } else if (status == 26) {
        ms.sendDirectionCameraMove(1,80);
    } else if (status == 27) {
        ms.setDelay(6823);
    } else if (status == 28) {
        ms.sendSelfTalk(1, 2159377, "嗯？你在幹什麼？快去抓住那個……不，先把剩下的傢伙全部抓回來！");
    } else if (status == 29) {
        ms.getNPCDirectionEffect(2159386, "Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 900, 0, -120);
        ms.setDelay(810);
    } else if (status == 30) {
        ms.sendSelfTalk(1, 2159386, "……貝爾！現在必須先逃走。");
    } else if (status == 31) {
        ms.sendSelfTalk(1, 2159385, "吉格蒙特怎麼辦？");
    } else if (status == 32) {
        ms.sendSelfTalk(1, 2159386, "光靠我們的力量不行！必須召集同伴們一起過來！哎呀！");
    } else if (status == 33) {
        ms.sendDirectionEffectPlay("Effect/Direction12.img/effect/tuto/smog", 0, 0, -120, 0, 0);
        ms.setDelay(1200);
    } else if (status == 34) {
        ms.sendDirectionEffectPlay("Effect/Direction12.img/effect/tuto/BalloonMsg2/14", 0, 0, -120, 0, 0);
        ms.setDelay(1200);
    } else if (status == 35) {
        ms.removeNPCRequestController(2159386);
        ms.removeNPCRequestController(2159385);
        ms.getNPCDirectionEffect(2159377, "Effect/Direction12.img/effect/tuto/BalloonMsg1/1", 1500, 0, -120);
        ms.setDelay(840);
    } else if (status == 36) {
        ms.sendDirectionEffectPlay("Effect/Direction12.img/effect/tuto/smogEnd",  0, 0, -120, 0, 0);
        ms.setDelay(1020);
    } else if (status == 37) {
        ms.sendSelfTalk(1, 2159377, "不能放過那些傢伙！");
    } else if (status == 38) {
        ms.sendSelfTalk(1, 2159377, "傑諾！抓住那個反抗者，別讓他逃走！綠寶石! 你和我去追那些傢伙！");
    } else if (status == 39) {
        ms.updateNPCSpecialAction(2159377, 1,600, 100);
        ms.updateNPCSpecialAction(2159378, 1,600, 100);
        ms.setDelay(1200);
    } else if (status == 40) {
        ms.sendDirectionEffectPlay("Effect/Direction12.img/effect/tuto/BalloonMsg0/0", 0, 0, -120, 0, 0);
        ms.sendSelfTalk(3, 2159377, "剛才那個，到底是什麼呢……。");
    } else {
    ms.setInGameCurNodeEventEnd(true);
        ms.removeNPCRequestController(2159383);
        ms.removeNPCRequestController(2159377);
        ms.removeNPCRequestController(2159378);
        ms.EnableUI(0);
        ms.dispose();
        ms.warp(931050950, 0);
        ms.enableActions();
    }
}

