var status = -1;

function start(mode, type, selection) {
    if (mode == 0) {
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            qm.sendNext("您好。楓之谷的勇士大人。今日也託您的福，楓之谷世界依舊維持著和平呢");
        } else if (status == 1) {
            qm.askAcceptDecline("為了像您一樣的勇士，我想介紹一些可以幫的上您的新同伴，可以嗎？");
        } else if (status == 2) {
            qm.sendNext("很久以前，在楓之谷世界上，有一群隨著勇士們一起奮戰的夥伴。而其中有部分勇士透過與特定怪物的情感交流來成為生死與共的同伴。");
        } else if (status == 3) {
            qm.sendNext("大家都把這些夥伴稱為 #b萌獸#k。雖然有一陣子沒有萌獸繼續與勇士們一起冒險了，但我感覺到您身上有一些特別的氣息。如果是您的話 ，說不定能召喚萌獸呢。");
        } else if (status == 4) {
            qm.sendNext("#i3801009#\r\n 召喚萌獸的方法是與怪物戰鬥後獲得'萌獸卡牌包 '，使用相關道具時會出現怪物卡片。只要點擊使用卡片，相關卡片會登錄在萌獸圖鑒裡，這時就能在圖鑒上召喚相關萌獸。");
        } else if (status == 5) {
            qm.sendNext("萌獸圖鑑可隨時透過左側的 #b遊戲內容提醒圖示#k #i3801007##i3801008# 來開啟。");
        } else if (status == 6) {
            qm.forceStartQuest();
            qm.forceCompleteQuest();
            qm.dispose();
        }
    }
}

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        qm.dispose();
    }
}