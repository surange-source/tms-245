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
            qm.sendNext("你剛開始接觸新力量，最好先明白一些事。");
        } else if (status == 1) {
            qm.sendNextPrev("首先，你擁有極高的天分，想要好好利用這力量，應該不算難事。");
        } else if (status == 2) {
            qm.sendNextPrev("不過，如果你熟知一些基本的東西，應該更有助於你控制力量。所以，我想對此給你說明下，希望你能記好。");
        } else if (status == 3) {
            qm.sendNextPrev("新力量可以通過名為V矩陣的精神體系來控制。如果你打開#b技能欄#k，應該能看到#b'V'標籤已經激活#k，你可以按下#bV矩陣按鈕#k，對力量進行整理。");
        } else if (status == 4) {
            qm.sendNextPrev("如果你使用過核心寶石，應該已經獲得新技能的核心了。你可以通過在V矩陣中#b雙擊核心#k，或者#b將其拖拽到空白欄位上#k，以便在#b'V'標籤中查看新技能#k。");
        } else if (status == 5) {
            qm.sendNextPrev("與之相反，如果你在欄位中拿掉核心，那麼'V'標籤中的技能也會隨之消失。");
        } else if (status == 6) {
            qm.sendNextPrev("總之，當你前往神秘河畔時，你的新技能應該會幫你很多忙。");
        } else if (status == 7) {
            qm.sendNextPrev("此外，如果你以後獲得新的核心寶石，除了技能核心之外，你還能得到#b強化核心#k或#b特殊核心#k等。只要把強化核心裝備在V矩陣上，你所擁有的技能就會變得更強大。");
        } else if (status == 8) {
            qm.sendNextPrev("如果把特殊核心裝備在V矩陣上，技能不會發生變化，但當你處於特殊情況時，它將發出神秘力量，為你提供幫助。");
        } else if (status == 9) {
            qm.sendNextPrev("不過，特殊核心將會消耗大量的艾爾達斯，隨著時間流逝，特殊核心可能也會消失。");
        } else if (status == 10) {
            qm.sendNextPrev("你也可以通過消耗技能核心和強化核心來進行強化，不過這項工作不是誰都能勝任的，你必須找到擁有#b'V核心大師'#k稱號的人。");
        } else if (status == 11) {
            qm.sendNextPrev("你只要把核心拿給V核心大師看，然後鼠標右鍵點擊強化之後，選擇需要消耗的材料就行了。");
        } else if (status == 12) {
            qm.sendNextPrev("最後，通過裝備核心獲得的技能和能力，不適用增益持續時間增加效果，並具有冷卻時間，這點請你注意。");
        } else if (status == 13) {
            qm.sendNextPrev("說明到這裡，憑你的智慧，應該已經明白了吧。接下來你可以親自操控你的力量了。繼續向前進吧。");
        } else {
            qm.forceCompleteQuest();
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
            qm.dispose();
        }
    }
}
