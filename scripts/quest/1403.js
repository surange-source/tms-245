var status = -1;

function start(mode, type, selection) {
    if (mode != 1 && status == 2)
        status++;
    status++;

    if (status == 0) {
        qm.sendNextS("你好，#h0#……我經常聽麥加提起你的名字。聽說你對弓箭手很感興趣。我是弓箭手轉職官赫麗娜。見到你很高興……",1);
    } else if (status == 1) {
        qm.sendNextS("你對弓箭手的瞭解有多少呢？弓箭手是使用弓或弩，在遠距離攻擊敵人的職業……雖然移動速度相對較慢，但銳利的箭矢從來不會射偏，每一發都非常具有威脅。",1);
    } else if (status == 2) {
        qm.sendYesNo("如果你真的想成為弓箭手，我就用轉職官的特權，邀請你到#b弓箭手村的弓箭手培訓中心#k來。#r如果你想選擇其他職業，可以拒絕。我會幫助你走上其他道路的#k……你想成為弓箭手嗎？");
    } else if (status == 3) {
        qm.warp(100000201);
        qm.forceStartQuest();
        qm.dispose();
    } else if (status == 4) {
        qm.sendSimple("你想選擇其他職業啊……雖然不無遺憾，但這是你自己的選擇……那在弓箭手之外，你想選擇哪條道路呢？\r\n#b#L1#劍士#l \r\n#b#L2#魔法師#l \r\n#b#L4#盜賊#l \r\n#b#L5#海盜#l");
    } else if (status == 5) {
        if (selection == 1) {
            qm.sendNextS("你想選擇劍士嗎？雖然很遺憾，但是沒辦法。武術教練會聯繫你的。你可以留意#b左側的任務提示#k。",1);
        } else if (selection == 2) {
            qm.sendNextS("魔法師……你想和擁有驚人魔法力量的人成為同伴嗎？漢斯馬上會聯繫你的。你只要看一下#b左側的任務提示#k就行。",1);
        } else if (selection == 4) {
            qm.sendNextS("你想選擇盜賊嗎？雖然很遺憾，不過沒辦法。達克魯會和你聯繫的。你可以通過#b左側的任務提示#k查看。",1);
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
        qm.sendYesNo("很高興能在這裡見到你……我來把你變成弓箭手吧。做好心理準備了嗎？臨陣退縮的人，不配成為弓箭手。");
    } else if (status == 1) {
        if (mode == 1) {
            qm.sendNextS("成為弓箭手的你已然變得更強。並且你也有了作為弓箭手可使用的技能, 那就趕緊拿出來試一試吧。",1);
            qm.resetStats(4, 25, 4, 4);
            qm.expandInventory(1, 4);
            qm.expandInventory(2, 4);
            qm.expandInventory(3, 4);
            qm.expandInventory(4, 4);
            qm.changeJob(300);
            //qm.gainSp(3);
            qm.gainItem(1452091,1);
            qm.gainItem(2060000,5000);
            qm.gainItem(1142107,1);
            qm.forceCompleteQuest();
        } else {
            qm.sendNextS("哎呀……沒想到你這麼膽小。難道你失去成為弓箭手的自信了嗎？",1);
            status = -1;
            qm.dispose();
        }
    } else if (status == 2) {
        qm.sendNextS("另外, 你的能力值也得進行適當修改, 以便更加適合弓箭手的特點。顯然對於弓箭手而言, DEX才是核心屬性, 而STR為補助屬性。若不清楚的話, 不妨使用#b自動分配#k也好。",1);
    } else if (status == 3) {
        qm.sendNextS("為了紀念你已成為弓箭手, 我還將適當給你增加背包空間。你可以收集更多的武器和防具, 讓自己變得更加強大。",1);
    } else if (status == 4) {
        qm.sendNextS("對了，有一點需要注意。雖然新手的時候沒關係，但是成為弓箭手的瞬間開始，必須小心不要死掉……萬一死了的話，之前積累的經驗值可能會受到損失……",1);
    } else if (status == 5) {
        qm.sendNextS("我能教你的只有這些……我送了你一把弓和一些箭，現在你去鍛煉自己，讓自己變得更強吧。",1);
        status = -1;
        qm.dispose();
    }
}
