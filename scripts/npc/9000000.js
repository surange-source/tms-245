var quantities = Array(10, 8, 6, 5, 4, 3, 2, 1, 1, 1);
var prize1 = Array(1442047, 2000000, 2000001, 2000002, 2000003, 2000004, 2000005, 2430036, 2430037, 2430038, 2430039, 2430040); //1 day
var prize2 = Array(1442047, 4080100, 4080001, 4080002, 4080003, 4080004, 4080005, 4080006, 4080007, 4080008, 4080009, 4080010, 4080011);
var prize3 = Array(1442047, 1442048, 2022070);
var prize4 = Array(1442048, 2430082, 2430072); //7 day
var prize5 = Array(1442048, 2430091, 2430092, 2430093, 2430101, 2430102); //10 day
var prize6 = Array(1442048, 1442050, 2430073, 2430074, 2430075, 2430076, 2430077); //15 day
var prize7 = Array(1442050, 3010183, 3010182, 3010053, 2430080); //20 day
var prize8 = Array(1442050, 3010178, 3010177, 3010075, 1442049, 2430053, 2430054, 2430055, 2430056, 2430103, 2430136); //30 day
var prize9 = Array(1442049, 3010123, 3010175, 3010170, 3010172, 3010173, 2430201, 2430228, 2430229); //60 day
var prize10 = Array(1442049, 3010172, 3010171, 3010169, 3010168, 3010161, 2430117, 2430118, 2430119, 2430120, 2430137); //1 year
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.dispose();
            return;
        }    
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendNext("你好,我是#p" + cm.getNpc() + "#, 那個。。。如果你現在不忙的話，和我一起走，好嗎？我聽說這裡有人舉行了一個#r活動#k, 但是我不想自己一個人去那裡 ... 你想去看看嗎?");
        } else if (status == 1) {    
            cm.sendSimple("唔? 那麼你想...\r\n#L0##e1.#n#b 什麼樣的活動?#k#l\r\n#L1##e2.#n#b 請你給我說明一下。#k#l\r\n#L2##e3.#n#b 好！跟我一起走吧！#k#l\r\n#L3##e4.#n#b 將連勝證明書兌換成獎勵#k#l");
        } else if (status == 2) {
            if (selection == 0) {
                cm.sendNext("非常高興你能來，我們為你準備了許多有趣的活動！建議你查看活動說明以便瞭解活動規則。這些活動是由管理員開啟才能進行，否則將不能進入專用的活動地圖。有些活動是個人賽，有些需要團隊合作，還會有豐富的獎品等著你。祝你好運！在活動得到了冠軍，就有楓幣或道具等多種多樣的獎品。");
                cm.dispose();
            } else if (selection == 1) {
                cm.sendSimple("我們準備各種各樣的活動。先瞭解遊戲規吧。想瞭解的遊戲，請選擇~!\r\n#b#L0# 上樓上樓#l\r\n#L1# 向高地#l\r\n#L2# 雪球賽#l\r\n#L3# 椰子比賽#l\r\n#L4# 快速OX問答#l\r\n#L5# 尋找寶物#l\r\n#L6# 群羊牧場#l#k");
            } else if (selection == 2) {
                var marr = cm.getQuestRecord(160200);
                if (marr.getCustomData() == null) {
                    marr.setCustomData("0");
                }
                var dat = parseInt(marr.getCustomData());
                if (dat + 60 * 60 * 1000 >= cm.getCurrentTime() && !cm.getPlayer().isGm()) {
                    cm.sendNext("You've entered the event already in the past hour.");
                } else if (!cm.canHold()) {
                    cm.sendNext("請給你的背包留下足夠的恐懼");
                } else if (cm.getChannelServer().getEvent() > -1) {
                    cm.saveReturnLocation("EVENT");
                    cm.getPlayer().setChalkboard(null);
                    marr.setCustomData("" + cm.getCurrentTime());
                    cm.warp(cm.getChannelServer().getEvent(), cm.getChannelServer().getEvent() == 109080000 || cm.getChannelServer().getEvent() == 109080010 ? 0 : "join00");
                } else {
                    cm.sendNext("你沒有票, 或活動還沒開始，或已經帶著#t4031019#，或活動人數已滿，就無法參加活動。以後再來一起玩吧");
                }
                cm.dispose();
            } else if (selection == 3) {
                var selStr = "你想兌換哪個連勝證明書?";
                for (var i = 0; i < quantities.length; i++) {
                    selStr += "\r\n#b#L" + i + "##t" + (4031332 + i) + "# 兌換(需要" + quantities[i] + "個)#l";
                }
                cm.sendSimple(selStr);
                status = 9;
            }
        } else if (status == 3) {
            if (selection == 0) {
                cm.sendNext("#b[上樓上樓]是一種類似爬梯子遊戲的。#k方法是，爬上梯子後，在許多的入口當中，選擇其中一個，接著往下一階段移動。\r\n\r\n一共有3個階段，#r時間限制是6分鐘#k。在[上樓上樓]遊戲內#b不能使用跳躍，縮地大法，輕功，提高速度的藥水，道具等。#k其中有的入口，會使玩家移動到別地方。請你小心點兒。");
                cm.dispose();
            } else if (selection == 1) {
                cm.sendNext("#b[向高地]是一種障礙賽跑遊戲。#k與維多利亞島的沉睡森林和忍苦樹林差不多。只要在時間限制之內，克服所有的難關，到達終點，就會得到冠軍。\r\n\r\n遊戲有4個階段。#b時間限制是15分鐘#k。在[向高地]遊戲裡不能使用縮地大法和輕功。");
                cm.dispose();
            } else if (selection == 2) {
                cm.sendNext("#b[雪球賽]#k是分兩個隊伍進行的比賽#b把雪球送到最遠地方的隊就獲勝#k。如果在規定時間內沒有隊伍到終點，那麼雪球距離起點最遠的隊就獲勝。\r\n\r\n接近雪球後進行攻擊(默認：Ctrl鍵)雪球就會慢慢前進。遠距離攻擊和所有的技能攻擊都無效，只有近距離攻擊才有效。\r\n\r\n要是角色的身體接觸了雪球，他就被送到起點。如果攻擊位於起點的雪人，可以妨礙對方雪球的前進。大家需要好好商量誰打雪球，誰打雪人。");
                cm.dispose();
            } else if (selection == 3) {
                cm.sendNext("#b[椰子比賽]#k是分兩個隊伍進行的比賽#b在規定時間內獲取椰子最多的隊就獲勝#k。遊戲的#r時間限制是5分鐘#k。如果第一次結果是平局的話，需要加賽2分鐘。如果還沒有分出勝負，比賽就以平局結束。\r\n\r\n不能使用遠距離攻擊和技能攻擊，只有#r近距離攻擊才有效#k。要是你沒有近距離攻擊的武器，可以找活動地圖裡的NPC購買。不管角色的等級和武器的種類攻擊力都一樣。\r\n\r\n地圖的很多地方有障礙物和陷阱。如果角色死掉，該角色將離開活動地圖。椰子掉下的時候最後打的人就獲得椰子。只有掉下的椰子才計算分數，不掉下的或破壞的不算分數。地圖的下面有隱藏的跳轉點。你好好使用吧。");
                cm.dispose();
            } else if (selection == 4) {
                cm.sendNext("#b[快速OX問答]#k是判斷問題的答案對錯的遊戲。參加遊戲後，按M鍵可以打開小地圖，查看O和X的位置。答對所有問題即可獲勝。\r\n\r\n閱讀問題後，沿著梯子到達自己認為是正確答案的位置。必須在限定時間內做出選擇。如果未選中正確答案，或懸掛在梯子上，在記分時會自動按失敗處理。請一定要在畫面上的[回答正確]消失之後，再進行移動。");
                cm.dispose();
            } else if (selection == 5) {
                cm.sendNext("#b[尋找寶物]#k遊戲是在10分鐘之內從這裡找到隱藏的#b寶物文件#k。這裡處處有神秘的寶物箱。打破箱子會爆出來多樣的道具，其中重要的是寶物文件。\r\n\r\n打寶物箱的時候只能用一般攻擊。找到寶物文件後交給NPC，他會換給你惡魔卷軸。該NPC在這裡有，如果你願意，在維多利亞港的#b[貝干]#k也可以交換。\r\n\r\n在這個遊戲裡存在很多秘密傳送點。你在某個地方停下，按下#b↑鍵#k就可以到另一個地方。也有秘密梯和繩子，雖然什麼也看不見，你去試試吧。還有的寶物箱能讓你移動到別的地方。這樣你可以發現更多的寶物箱。\r\n\r\n請注意在尋找寶物的遊戲裡不能使用技能。");
                cm.dispose();
            } else if (selection == 6) {
                cm.sendNext("#b[群羊牧場]#k遊戲是分為羊陣營和狼陣營，在限定時間內看剩餘人數誰多誰少的遊戲。");
                cm.dispose();
            }
        } else if (status == 10) {
            if (selection < 0 || selection > quantities.length) {
                return;
            }
            var ite = 4031332 + selection;
            var quan = quantities[selection];
            var pri;
            switch(selection) {
                case 0:
                    pri = prize1;
                    break;
                case 1:
                    pri = prize2;
                    break;
                case 2:
                    pri = prize3;
                    break;
                case 3:
                    pri = prize4;
                    break;
                case 4:
                    pri = prize5;
                    break;
                case 5:
                    pri = prize6;
                    break;
                case 6:
                    pri = prize7;
                    break;
                case 7:
                    pri = prize8;
                    break;
                case 8:
                    pri = prize9;
                    break;
                case 9:
                    pri = prize10;
                    break;
                default:
                    cm.dispose();
                    return;
            }
            var rand = java.lang.Math.floor(java.lang.Math.random() * pri.length);
            if (!cm.haveItem(ite, quan)) {
                cm.sendOk("你需要#b" + quan + "#k個 #b#t" + ite + "##k 來兌換獎勵");
            } else if (cm.getInventory(1).getNextFreeSlot() <= -1 || cm.getInventory(2).getNextFreeSlot() <= -1 || cm.getInventory(3).getNextFreeSlot() <= -1 || cm.getInventory(4).getNextFreeSlot() <= -1 || cm.getInventory(6).getNextFreeSlot() <= -1) {
                cm.sendOk("你的背包空間不足");
            } else {
                cm.gainItem(pri[rand], 1);
                cm.gainItem(ite, -quan);
                cm.gainMeso(100000 * selection); //temporary prize lolol
            }
            cm.dispose();
        }
    }
}
