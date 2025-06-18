var status = -1;

function start(mode, type, selection) {
    if (mode == 0) {
        qm.sendNext("……我能理解. 對於我這種人你一定沒什麼興趣的. 即使世界發生變化. ");
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            qm.sendNext("喂, 你能聽見我說話嗎? \r\n\r\n你現在手裡拿著的東西叫做智能手機. 雖然這東西在這個世界是個稀罕物, 但在我之前生活的地方卻是非常常見呢.");
        } else if (status == 1) {
            qm.sendNext("對了, 你看見我的衣服了嗎? \r\n這是校服, 我之前所在的世界裡, 學生們都要穿這種衣服的. ");
        } else if (status == 2) {
            qm.sendNext("怎麼樣, 對這個新的世界是不是很感興趣呢?\r\n\r\n#b（如果接受, 則會移動到弓箭手村衣櫃落入的房子裡. ）#k");
        } else if (status == 3) {
            qm.sendNext("那麼, 請到弓箭手村衣櫃落入的房子來找到我吧.\r\n\r\n#e#b通過次元之鏡也可移動到那裡. #n#k");
        } else if (status == 4) {
            qm.forceStartQuest();
            qm.warp(100000004, 1);
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
        if (status == 0) {
            if (qm.getPlayerStat("HP") < 50) {
                qm.sendNext("嗨，你的HP還沒有完全恢復，使用我給你的蘋果來補充吧！快去試試!");
                qm.dispose();
            } else {
                qm.sendNext("消耗道具。。。怎麼樣？很簡單吧？可以在右下角設定#b快捷鍵#k，你還不知道吧？哈哈~");
            }
        } else if (status == 1) {
            qm.sendNextPrev("不錯！學得很好應該給你禮物。這些都是在旅途中必需的，謝謝我吧！危機的時候好好使用。");
        } else if (status == 2) {
            qm.sendNextPrev("我能教你的只有這些了。有點兒捨不得也沒辦法，到了要離別的時候。路上小心，一路順風啊！！！\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v2010000# 3 #t2010000#\r\n#v2010009# 3 #t2010009#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 10 exp");
        } else if (status == 3) {
            qm.gainExp(10);
            qm.gainItem(2010000, 3);
            qm.gainItem(2010009, 3);
            qm.forceCompleteQuest();
            qm.dispose();
        }
    }
}