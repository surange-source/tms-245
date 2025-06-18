/* 
 5th Job Quests.
 Made by Kent
 */
var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.sendOk("考慮好後再來找我吧。");
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == 0) {
            qm.sendNext("經過漫長的旅程，你已經到達力量的巔峰…你在追求力量的同時，有沒有迷失前進的方向呢？");
        } else if (status == 1) {
            qm.sendYesNo("說不定你不僅能活用你的力量，還能趁此機會變得更強。\r\n如果你有意向，請來時間神殿找我吧。\r\n\r\n#b(如果接受的話，將移動到時間神殿進行#e5次轉職#n。)#k");
        } else if (status == 2) {
            if (qm.getMapId() != 270010111) {
                qm.forceStartQuest();
                qm.warp(270010111);
                qm.dispose();
            } else {
                qm.forceStartQuest();
                qm.dispose();
            }
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

        var cs = qm.getQuestCustomData();
        if (cs == null || cs.equals("0") || cs.equals("")) {
            if (status == 0) {
                qm.askMenu("#h #.....你的事跡我已經早有耳聞了\r\n\r\n我今天喊你來，是為了告訴你這個世界正在發生奇怪的事情。\r\n\r\n#L0##b奇怪的事情？#k#l");
            } else if (status == 1) {
                qm.askMenu("不知道你有沒有聽說過構成這個世界的能量--#e艾爾達斯？#n\r\n\r\n#L0##b艾爾達斯？#k#l");
            } else if (status == 2) {
                qm.askMenu("艾爾達斯不停地重複著誕生與消亡，構成並支撐著這個世界。不僅楓之谷世界，其他次元的世界中也充斥著艾爾達斯。從你剛剛踏上這個世界開始，無論是泥土和樹木，還是光明和黑暗中...都存在艾爾達斯\r\n\r\n#L0##b看來艾爾達斯真的很重要啊。#k#l");
            } else if (status == 3) {
                qm.askMenu("那是當然。如果沒有艾爾達斯，這個世界根本不會存在...不過，從不久前開始，我發現艾爾達斯正在逐漸消失。\r\n\r\n#L0##b艾爾達斯正在消失？#k#l");
            } else if (status == 4) {
                qm.sendNext("看來你還不太相信。除非親眼所見，不然確實令人難以置信。百聞不如一見，等你親眼看到了，你就明白了。");
            } else if (status == 5) {
                qm.askYesNo("如果你願意，我會引導你短暫觀察下艾文達的流動。好了，請閉上眼......\r\n\r\n#b(如果接受的話，請根據旁觀者的引導，集中精神。)#k");
            } else if (status == 6) {
                qm.dispose();
                qm.warp(450000200);
            }
        } else if (cs != null && cs.equals("1")) {
            if (status == 0) {
                qm.askMenu("怎麼樣，親眼看到艾爾達斯的流動後你有什麼感想？\r\n\r\n#b#L0#我和它進行了對話。");
            } else if (status == 1) {
                qm.sendNextPrev("！！這是真的嗎，你和艾爾達斯對話了？\r\n\r\n我終身都在觀察艾爾達斯的流動，但卻從未聽過它說話。");
            } else if (status == 2) {
                qm.askMenu("艾爾達斯願意和你對話……\r\n\r\n看來你比我想像中的還要強大。艾爾達斯希望能賦予你力量，讓你守護它們。\r\n\r\n#b#L0#我該怎麼做才能獲得更強的力量呢？");
            } else if (status == 3) {
                qm.sendNext("說不定#b女神#k們會知道方法。自古以來，一直是女神將艾爾達斯和人類聯繫在一起。\r\n\r\n你最好到我所說的地方，去見見女神們。");
                qm.forceCompleteQuest();
                qm.dispose();
            }
        }
    }
}
