var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    var i = -1;
    if (status == i++) {
        qm.dispose();
    } else if (status == i++) {
        qm.sendNext("你好#b勇士#k！很高興見到你～\r\n你已經超過60等級啦？");
    } else if (status == i++) {
        qm.sendNextPrevS("您是哪位啊？", false);
    } else if (status == i++) {
        qm.sendNextPrev("我是#b#e會計小姐#n#k。\r\n\r\n為了幫助超過#r60等級#k的楓之谷世界勇士成長，正在進行許多#r新的企劃#k。");
    } else if (status == i++) {
        qm.sendNextPrev("這個企劃將會給予勇士#e#r很棒的獎勵#k#n，\r\n要聽聽看我的說明嗎？");
    } else if (status == i++) {
        qm.sendNextPrev("我嚇了一大跳，愣在那裡一動都不敢動...\r\n就在那個時後！不知道是從哪冒出來的，無數勇士蜂湧而出。接著他們聯手，一下子就把#r巨龍#k消滅掉了！");
    } else if (status == i++) {
        qm.sendNextPrev("然後那些勇士一起平分從龍身上得到的#b大量戰利品#k。勇士當中有些人看起來很強，當然也有些看起來不怎樣。");
    } else if (status == i++) {
        qm.sendNextPrev("看見那樣貌的瞬間我領悟到，\r\n為什麼我們無法繼續成長！");
    } else if (status == i++) {
        qm.sendNextPrev("#e那是因為#n\r\n我們一直是孤軍奮戰。就算再強的勇士，也很難獨自打倒體型那麼大的猛龍。但因為他們#b彼此合作#k才能輕鬆消滅巨龍。");
    } else if (status == i++) {
        qm.sendNextPrev("我認為楓之谷的勇士如果想#r變得更強#k，這種#b合作精神#k是不可或缺的。\r\n所以我決定勇敢放棄以前的工作，開始#b嶄新的計劃。");
    } else if (status == i++) {
        qm.sendNextPrev("那個企劃的名稱正是#b#e<楓之谷聯盟>#n#k！\r\n\r\n對於#r獨自成長#k感到受限的勇士們，教導幫助你們#b合作的力量#k以更快的速度成長。");
    } else if (status == i++) {
        qm.sendNextPrev("勇士！ \r\n你要與我一起創造強大的#b#e<楓之谷聯盟>#k#n嗎？");
    } else if (status == i++) {
        qm.sendNextPrev("請稍等一下。\r\n我會趕緊準備創立<楓之谷聯盟>之後再來！");
    } else {
        qm.forceCompleteQuest(true);
        qm.dispose();
    }
}