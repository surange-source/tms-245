var status = -1;

function start(mode, type, selection) {
    if (mode != 1 && status == 2)
        status++;
    status++;

    if (status == 0) {
        qm.sendNextS("你好，#h0#哦，你就是麥加說的那個人啊。你好？聽說你對魔法師之路感興趣。那麼，我魔法師轉職官漢斯可以幫助你。",1);
    } else if (status == 1) {
        qm.sendNextS("相信你應該已經對魔法師有所瞭解了。那是以較高的智力為基礎，使用魔法的職業。雖然遠距離和近距離戰鬥都很出色，但體力稍微有點弱……但是魔法師創造出了很多魔法來克服這一缺點，不要太擔心。",1);
    } else if (status == 2) {
        qm.sendYesNo("你看上去好像充分具備成為魔法師的素質……你想成為魔法師嗎？接受的話，我就使用轉職官的特權，邀請你到#b魔法密林的魔法圖書館#k去。和我見個面，然後幫你轉職。#r但是就算拒絕，也不是沒有別的路可走。拒絕的話，我可以為你介紹魔法師以外的職業。#k");
    } else if (status == 3) {
        qm.warp(101000003);
        qm.forceStartQuest();
        qm.dispose();
    } else if (status == 4) {
        qm.sendSimple("你不喜歡魔法師之路嗎？很遺憾。但是我尊重你的選擇。那你想走哪條道路呢？\r\n#b#L1#劍士#l \r\n#b#L3#弓箭手#l \r\n#b#L4#盜賊#l \r\n#b#L5#海盜#l");
    } else if (status == 5) {
        if (selection == 1) {
            qm.sendNextS("你想選擇劍士嗎？雖然很遺憾，但是沒辦法。武術教練會聯繫你的。你可以留意#b左側的任務提示#k。",1);
        } else if (selection == 3) {
            qm.sendNextS("你想選擇弓箭手嗎？雖然很遺憾，不過沒辦法。赫麗娜會和你聯繫的。你可以通過#b左側的任務提示#k查看。",1);
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
        qm.sendYesNo("很高興能在這裡見到你……我來把你變成魔法師吧。做好心理準備了嗎？臨陣退縮的人，不配成為魔法師。");
    } else if (status == 1) {
        if (mode == 1) {
            qm.sendNextS("成為魔法師的你已然變得更強。並且你也有了作為魔法師可使用的技能, 那就趕緊拿出來試一試吧。",1);
            qm.resetStats(4, 4, 25, 4);
            qm.expandInventory(1, 4);
            qm.expandInventory(2, 4);
            qm.expandInventory(3, 4);
            qm.expandInventory(4, 4);
            qm.changeJob(200);
            //qm.gainSp(3);
            qm.gainItem(1372062,1);
            qm.gainItem(1142107,1);
            qm.forceCompleteQuest();
        } else {
            qm.sendNextS("哎呀……沒想到你這麼膽小。難道你失去成為魔法師的自信了嗎？",1);
            status = -1;
            qm.dispose();
        }
    } else if (status == 2) {
        qm.sendNextS("另外, 你的能力值也得進行適當修改, 以便更加適合魔法師的特點。顯然對於魔法師而言, INT才是核心屬性, 而LUK為補助屬性。若不清楚的話, 不妨使用#b自動分配#k也好。",1);
    } else if (status == 3) {
        qm.sendNextS("為了紀念你已成為魔法師, 我還將適當給你增加背包空間。你可以收集更多的武器和防具, 讓自己變得更加強大。",1);
    } else if (status == 4) {
        qm.sendNextS("對了，有一點需要注意。雖然新手的時候沒關係，但是成為魔法師的瞬間開始，必須小心不要死掉……萬一死了的話，之前積累的經驗值可能會受到損失……",1);
    } else if (status == 5) {
        qm.sendNextS("我能教你的只有這些……我送了你一把杖，現在你去鍛煉自己，讓自己變得更強吧。",1);
        status = -1;
        qm.dispose();
    }
}
