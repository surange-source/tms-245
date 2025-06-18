/*
    任務 - 未來的新葉城
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.sendOk("嘖嘖，看你那麼膽小！你這樣怎麼能擺脫外星人的魔掌呢？");
            qm.safeDispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendYesNo("已經沒有怪物了嗎？");
    } else if (status == 1) {
        qm.PlayerToNpc("這是哪裡啊？那些怪物到底是……");
    } else if (status == 2) {
        qm.sendNextPrev("這裡是新葉城，你剛才通過的那扇門，就是那些外星人為了回到過去的新葉城，而設置的時間門！");
    } else if (status == 3) {
        qm.PlayerToNpc("那這裡就是未來的新葉城？！這到底是怎麼回事呢？");
    } else if (status == 4) {
        qm.sendNextPrev("新葉城原來是一個很平靜的村莊，可突然有一天，那些外星人闖了進來，村莊就變成了現在這個樣子……");
    } else if (status == 5) {
        qm.PlayerToNpc("可惡的外星人……他們到底為什麼要這麼做……");
    } else if (status == 6) {
        qm.sendNext("外星人知道了新葉城的地下埋藏著它們所需要的礦物，而且埋藏量極大，所以他們就闖進了這裡！我們冒險勇者們曾經也為了保護村莊而戰鬥，但我們的人數太少……以至於變成現在的這個樣子");
    } else if (status == 7) {
        qm.sendNext("你看上去很厲害，能不能幫我們");
    } else if (status == 8) {
        qm.forceStartQuest();
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.dispose();
}
