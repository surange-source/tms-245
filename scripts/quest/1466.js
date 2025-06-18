/* 
 5th Job Quests.
 Made by Kent
 */
var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.sendOk("如果你準備好了，請重新跟我對話吧。");
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            qm.sendNext("請稍等下。在你出發前往<神秘河畔>之前，我有話要對你說。");
        } else if (status == 1) {
            qm.askMenu("你還記得這裡的一位名叫#b卡奧#k的神官嗎？\r\n\r\n#b#L0#記得#l");
        } else if (status == 2) {
            qm.sendNextPrev("#fNpc/3003131.img/stand/0#\r\n那個孩子最終還是沒能查清楚自己的真實身份。之前為了查出自己的真實身份，他付出了很多努力，不惜做任何事情。");
        } else if (status == 3) {
            qm.askMenu("我們神官隨著艾爾達斯的異常流動，前往現在之門另一邊時，那個孩子也一起消失了。\r\n我試圖想挽留那個孩子，可是已經太遲了。\r\n\r\n#b#L0#我這就去現在之門的另一邊找他#l");
        } else if (status == 4) {
            qm.askMenu("請等一下。神秘河畔的怪物出生在艾爾達斯密度極高的河水中...\r\n\r\n你必須擁有#e<神秘力量>#n，才能發揮出所有的力量。\r\n\r\n#b#L0#<神秘力量>？#l");
        } else if (status == 5) {
            qm.sendNextPrev("百聞不如一見，請你先去試著狩獵那個地方的怪物吧。在那之後，我會重新去找你的。\r\n\r\n#b(前往現在之門另一邊的神秘河畔，試著狩獵第一個見到的怪物，然後再獲得旁觀者的幫助吧。)#k");
        } else {
            qm.forceStartQuest();
            qm.dispose();
        }
    }
}

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;

        if (status == 0) {
            qm.sendNext("現在你已經做好獲得新力量的準備啦…");
        } else if (status == 1) {
            //cm.updateOneInfo(1477, "count", "200");
            //qm.show5thJobEffect();
            qm.gainItem(1712000, 1);
            qm.forceCompleteQuest();
            qm.dispose();
        }
    }
}
