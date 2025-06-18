var status = -1;

function start(mode, type, selection) {
    if (mode != 1 && status == 2)
        status++;
    status++;

    if (status == 0) {
        qm.sendNextS("你就是麥加推薦的那個人啊。聽說你想轉職成劍士……對嗎？我就是劍士轉職官武術教練。我可以為想要以劍士身份冒險的人提供幫助。",1);
    } else if (status == 1) {
        qm.sendNextS("你對劍士瞭解多少呢？劍士是以強大的力量和體力為基礎，揮舞近戰武器打倒敵人的職業。在最接近敵人的地方戰鬥的無畏的人。是不是很有魅力？",1);
    } else if (status == 2) {
        qm.sendYesNo("你好像充分擁有了資格。像你這樣的人想成為劍士，我隨時表示歡迎。你想成為劍士嗎？接受的話，我就使用轉職官的特權，邀請你到#b勇士部落的劍士聖殿#k去。#r但是就算拒絕，也不是沒有別的路可走。拒絕的話，我可以引導你走其他職業的道路#k。");
    } else if (status == 3) {
        qm.warp(102000003);
        qm.forceStartQuest();
        qm.dispose();
    } else if (status == 4) {
        qm.sendSimple("你不想走劍士之路嗎？不願意的話，我就不能勉強。那你就去選擇其他道路吧。除了劍士之外，還有四條道路可供選擇。\r\n#b#L2#魔法師#l \r\n#b#L3#弓箭手#l \r\n#b#L4#盜賊#l \r\n#b#L5#海盜#l");
    } else if (status == 5) {
        if (selection == 2) {
            qm.sendNextS("你想走魔法師之路嗎？雖然很遺憾，但我尊重你的選擇。#b漢斯#k會聯繫你的。你可以通過#b左側的任務提示#k查看。",1);
        } else if (selection == 3) {
            qm.sendNextS("你想走弓箭手之路嗎？雖然很遺憾，但我尊重你的選擇。#b赫麗娜#k會聯繫你的。你可以通過#b左側的任務提示#k查看。",1);
        } else if (selection == 4) {
            qm.sendNextS("你想走盜賊之路嗎？雖然很遺憾，但我尊重你的選擇。#b達克魯#k會聯繫你的。你可以通過#b左側的任務提示#k查看。",1);
        } else if (selection == 5) {
            qm.sendNextS("你想走海盜之路嗎？雖然很遺憾，但我尊重你的選擇。#b凱琳#k會聯繫你的。你可以通過#b左側的任務提示#k查看。",1);
        }
        if (selection > 0 && selection < 6)
            qm.forceStartQuest(1406, selection);
        qm.dispose();
    }
}

function end(mode, type, selection) {
    status++;
    if (status == 0) {
        qm.sendYesNo("很高興能在這裡見到你……我來把你變成劍士吧。做好心理準備了嗎？臨陣退縮的人，不配成為劍士。");
    } else if (status == 1) {
        if (mode == 1) {
            qm.sendNextS("成為劍士的你已然變得更強。並且你也有了作為劍士可使用的技能, 那就趕緊拿出來試一試吧。",1);
            qm.resetStats(25, 4, 4, 4);
            qm.expandInventory(1, 4);
            qm.expandInventory(2, 4);
            qm.expandInventory(3, 4);
            qm.expandInventory(4, 4);
            qm.changeJob(100);
            //qm.gainSp(3);
            qm.gainItem(1302150,1);
            qm.gainItem(1142107,1);
            qm.forceCompleteQuest();
        } else {
            qm.sendNextS("哎呀……沒想到你這麼膽小。難道你失去成為劍士的自信了嗎？",1);
            status = -1;
            qm.dispose();
        }
    } else if (status == 2) {
        qm.sendNextS("另外, 你的能力值也得進行適當修改, 以便更加適合劍士的特點。顯然對於劍士而言, STR才是核心屬性, 而DEX為補助屬性。若不清楚的話, 不妨使用#b自動分配#k也好。",1);
    } else if (status == 3) {
        qm.sendNextS("為了紀念你已成為劍士, 我還將適當給你增加背包空間。你可以收集更多的武器和防具, 讓自己變得更加強大。",1);
    } else if (status == 4) {
        qm.sendNextS("對了，有一點需要注意。雖然新手的時候沒關係，但是成為劍士的瞬間開始，必須小心不要死掉……萬一死了的話，之前積累的經驗值可能會受到損失……",1);
    } else if (status == 5) {
        qm.sendNextS("我能教你的只有這些……我送了你一把#b掃把#k，現在你去鍛煉自己，讓自己變得更強吧。",1);
        status = -1;
        qm.dispose();
    }
}
