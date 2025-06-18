/*
 
 */

var status = -1;

function action(mode, type, selection) {
        status++;

    if (status == 0) {
        ms.spawnNPCRequestController(2159385, 41, 58);
        ms.spawnNPCRequestController(2159386, -248, 58);
        ms.spawnNPCRequestController(2159384, -50,58);
        ms.spawnNPCRequestController(2159387, -340, 58);
        ms.spawnNPCRequestController(2159388, 121, 58);
        ms.spawnNPCRequestController(2159381, -171,58);
    ms.setInGameCurNodeEventEnd(true);
    ms.EnableUI(1);
    ms.DisableUI(true);
        ms.setForcedInput(0);
        ms.setDelay(30);
    } else if (status == 1) {
        ms.setForcedInput(1);
        ms.setDelay(30);
    } else if (status == 2) {
        ms.setForcedInput(0);
        ms.sendSelfTalk(1, 2159385, "吉格蒙特！還好你沒事。你不知道我有多擔心。");
    } else if (status == 3) {
        ms.sendSelfTalk(1, 2159384, "謝謝你，貝爾。");
    } else if (status == 4) {
        ms.sendSelfTalk(1, 2159388, "但是……這傢伙是誰？從剛才的情況看，好像不是敵人，所以也把他帶來了。");
    } else if (status == 5) {
        ms.sendSelfTalk(1, 2159386, "應該是格裡梅爾的部下。剛見到的時候，他還想攻擊吉格蒙特。……這段時間到底發生了什麼事？剛才的情況真是讓人看不懂。");
    } else if (status == 6) {
        ms.sendSelfTalk(1, 2159384, "我也搞不太清楚，但他不是個壞人。他是我的救命恩人。不僅如此，他好像失去了記憶，被關在格裡梅爾的研究所裡。");
    } else if (status == 7) {
        ms.sendSelfTalk(1, 2159387, "話雖這麼說，但之前你不也看見了嗎？我看這個人好像受到了格裡梅爾的操縱。讓他進入秘密廣場真的沒關係嗎？要是他再次受到操縱，那該怎麼辦？");
    } else if (status == 8) {
        ms.sendDirectionEffectPlay("Effect/Direction12.img/effect/story/BalloonMsg0/1", 1200, 0, -120, 0, 0);
        ms.setDelay(1200);
    } else if (status == 9) {
        ms.sendSelfTalk(1, 2159380, "那個裝置，我應該可以拆除……");
    } else if (status == 10) {
        ms.sendDirectionEffectPlay("Effect/Direction12.img/effect/story/BalloonMsg1/1", 1200, 0, -120, 0, 0);
        ms.sendDirectionEffectPlay("Effect/Direction12.img/effect/story/BalloonMsg1/1", 1200, 0, -120, 0, 0);
        ms.sendDirectionEffectPlay("Effect/Direction12.img/effect/story/BalloonMsg1/1", 1200, 0, -120, 0, 0);
        ms.sendDirectionEffectPlay("Effect/Direction12.img/effect/story/BalloonMsg1/1", 1200, 0, -120, 0, 0);
        ms.sendDirectionEffectPlay("Effect/Direction12.img/effect/story/BalloonMsg1/1", 1200, 0, -120, 0, 0);
        ms.sendDirectionEffectPlay("Effect/Direction12.img/effect/story/BalloonMsg1/1", 1200, 0, -120, 0, 0);
        ms.setDelay(1200);
    } else if (status == 11) {
        ms.sendSelfTalk(1, 2159388, "那就馬上拆除。總不能把那種危險的東西一直帶在身上。");
    } else if (status == 12) {
        ms.sendSelfTalk(1, 2159380, "但是這好像不是單純用於操縱的裝置……好像還包含有戰鬥系統。如果把它拆掉，系統就會失效，#h0#你會變得比現在弱得多。格裡梅爾隨時可能派出追蹤者，那樣做太危險了。");
    } else if (status == 13) {
        ms.sendSelfTalk(3, 2159380, "沒關係，魯提。能拆掉的話，就拆掉吧。");
    } else if (status == 14) {
        ms.sendSelfTalk(1, 2159380, "真的？你不後悔？");
    } else if (status == 15) {
        ms.sendSelfTalk(3, 2159380, "系統只要慢慢修復就行，雖然會花費一點時間……。但是如果被操縱，那就完蛋了。所以帶著那種裝置反而更危險。我不想再被人操縱了。");
    } else if (status == 16) {
        ms.sendSelfTalk(1, 2159380, "既然你這麼說，明白了，我馬上幫你拆除。");
    } else if (status == 17) {
        ms.sendSelfTalk(1, 2159380, "好的，拆掉了。剛開始會不太熟悉，可能會感覺有點困難。");
    } else {
        while (ms.getLevel() < 10) {
            ms.getLevelup();
        }
    ms.teachSkill(30021238, -1, -1);
        ms.EnableUI(0);
    ms.DisableUI(false);
        ms.dispose();
        ms.warp(310010000, 0);
        ms.enableActions();
    }
}

