var status = -1;

function start(mode, type, selection) {
    if (mode != 1 && status == 3)
        status++;
    status++;

    if (status == 0) {
        qm.sendNextS("麥加說的那個人就是你？#h0#……嗯，據她說，你是個很有天賦的小孩……喂，你想成為盜賊嗎？你知道盜賊嗎？",1);
    } else if (status == 1) {
        qm.sendNextS("有些人覺得盜賊是些偷偷摸摸的小偷，但其實不是這樣的。楓之谷世界的盜賊是在黑暗中用鋒利的短劍和飛鏢戰鬥的人。可能有一點不是那麼堂堂正正，但是這就是盜賊的本質，沒有必要否定。",1);
    } else if (status == 2) {
        qm.sendNextS("盜賊是可以用快速強力技能攻擊敵人的職業。雖然你體力較弱，但因為行動快速，所以可以輕鬆地躲避怪物。因為運氣很強，所以擅長爆擊。",1);
    } else if (status == 3) {
        qm.sendYesNo("怎麼樣？你想一起踏上盜賊之路嗎？如果你決定選擇盜賊之路，我就使用轉職官的特權，邀請你到#b廢都的廢都酒吧#k去……那是個隱秘的地方，你應該感到榮幸。#r但是如果更喜歡其他職業的話，你可以拒絕。我會為你推薦盜賊之外的其他道路#k。");
    } else if (status == 4) {
        qm.warp(103000003);
        qm.forceStartQuest();
        qm.dispose();
    } else if (status == 5) {
        qm.sendSimple("你不喜歡盜賊之路嗎？不喜歡的話，我也不想勉強。那你想選擇什麼職業呢？\r\n#b#L1#劍士#l \r\n#b#L2#魔法師#l \r\n#b#L3#弓箭手#l \r\n#b#L5#海盜#l");
    } else if (status == 6) {
        if (selection == 1) {
            qm.sendNextS("你想選擇劍士嗎？雖然很遺憾，但是沒辦法。武術教練會聯繫你的。你可以留意#b左側的任務提示#k。",1);
        } else if (selection == 2) {
            qm.sendNextS("你想走魔法師之路嗎？雖然很遺憾，但我尊重你的選擇。#b漢斯#k會聯繫你的。你可以通過#b左側的任務提示#k查看。",1);
        } else if (selection == 3) {
            qm.sendNextS("你想選擇弓箭手嗎？雖然很遺憾，不過沒辦法。赫麗娜會和你聯繫的。你可以通過#b左側的任務提示#k查看。",1);
        } else if (selection == 5) {
            qm.sendNextS("你選擇海盜嗎？嗯……那也不錯。凱琳很快就會和你聯繫。注意#b左側的任務提示#k。",1);
        }
        if (selection > 0 && selection < 6)
            qm.forceStartQuest(1406, selection);
        qm.dispose();
    }
}

function end(mode, type, selection) {
    status++;
    if (status == 0) {
        qm.sendYesNo("很高興能在這裡見到你……我來把你變成盜賊吧。做好心理準備了嗎？臨陣退縮的人，不配成為盜賊。");
    } else if (status == 1) {
        if (mode == 1) {
            qm.sendNextS("成為盜賊的你已然變得更強。並且你也有了作為盜賊可使用的技能, 那就趕緊拿出來試一試吧。",1);
            qm.resetStats(4, 4, 4, 25);
            qm.expandInventory(1, 4);
            qm.expandInventory(2, 4);
            qm.expandInventory(3, 4);
            qm.expandInventory(4, 4);
            qm.changeJob(400);
            //qm.gainSp(3);
            qm.gainItem(1332063,1);
            qm.gainItem(1472000,1);
            qm.gainItem(1472063,1);
            qm.gainItem(2070008, 800);
            qm.gainItem(2070008, 800);
            qm.gainItem(2070008, 800);
            qm.gainItem(1142107,1);
            qm.forceCompleteQuest();
        } else {
            qm.sendNextS("哎呀……沒想到你這麼膽小。難道你失去成為盜賊的自信了嗎？",1);
            status = -1;
            qm.dispose();
        }
    } else if (status == 2) {
        qm.sendNextS("另外, 你的能力值也得進行適當修改, 以便更加適合盜賊的特點。顯然對于盜賊而言, LUK才是核心屬性, 而DEX為補助屬性。若不清楚的話, 不妨使用#b自動分配#k也好。",1);
    } else if (status == 3) {
        qm.sendNextS("為了紀念你已成為盜賊, 我還將適當給你增加背包空間。你可以收集更多的武器和防具, 讓自己變得更加強大。",1);
    } else if (status == 4) {
        qm.sendNextS("對了，有一點需要注意。雖然新手的時候沒關係，但是成為盜賊的瞬間開始，必須小心不要死掉……萬一死了的話，之前積累的經驗值可能會受到損失……",1);
    } else if (status == 5) {
        qm.sendNextS("我能教你的只有這些……我送了你一些裝備，現在你去鍛煉自己，讓自己變得更強吧。",1);
        status = -1;
        qm.dispose();
    }
}
