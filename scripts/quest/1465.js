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
            qm.sendNext("不過，這些石頭還沒有完全屬於你。\r\n如果你想把它們變成自己的，必須在上面記錄下你所擁有的力量。\r\n\r\n#b(請激活女神之神秘石，狩獵等級範圍怪。激活後的2小時內，狩獵經驗值將被記錄在神秘石上。該經驗值在5次轉職之後，可以通過經驗值藥水再獲得一次。)#k");
        } else if (status == 1) {
            qm.sendNextPrev("請不要忘記，3個神秘石全部都要激活。");
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
            qm.sendNext("現在你已經做好獲得新力量的準備啦…好了，請把激活的神秘石交給我吧。我會使用它，喚醒你潛在的力量。\r\n\r\n#b(如果點擊確認，即可完成5次轉職)");
        } else if (status == 1) {
            qm.removeItem(2435734);
            qm.removeItem(2435735);
            qm.removeItem(2435736);
            qm.show5thJobEffect();
            qm.forceCompleteQuest();
            qm.dispose();
        }
    }
}
