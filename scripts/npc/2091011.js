var status = -1;
var select = -1;
var enterLimit = 3;

function start() {
    cm.sendSimple("我們的師傅在武陵內是最強的人。你想要挑戰他？之後可不要後悔。\r\n#b#L0# 要挑戰武陵道場。#l\r\n#L1# 武陵道場是什麼？#l\r\n#L2# 想要確認武陵道場內可獲得的獎勵。#l\r\n#L3# 想要確認今天剩餘的挑戰次數。#l\r\n#L4# 想要進入武陵身心修練館。#l\r\n#L5# 想要領取武陵道場清算點數。#l\r\n#L6# 想要領取武陵道場排名獎勵。#l\r\n");
}

function action(mode, type, selection) {
    if (select == -1) {
        select = selection;
    }
    switch (select) {
        case 0:
            action_0(mode, type, selection);
            break;
        case 1:
            action_1(mode, type, selection);
            break;
        case 2:
            action_2(mode, type, selection);
            break;
        case 3:
            action_3(mode, type, selection);
            break;
        case 4:
            action_4(mode, type, selection);
            break;
        case 5:
            action_5(mode, type, selection);
            break;
        case 6:
            action_6(mode, type, selection);
            break;
        default:
            cm.dispose();
            break;
    }
}

function action_0(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    var i = -1;
    if (status == i++) {
        cm.sendOk("還真是優柔寡斷呢。\r\n這裡不是那麼好對付的地方。慎重考慮後再入場！");
        status -= 2;
    } else if (status == i++) {
        if (cm.getParty() != null) {
            cm.sendOk("無法以隊伍進場！自己來挑戰吧！難不成是膽小鬼嗎？");
            status -= 3;
        } else {
            cm.askYesNo("進入武陵道場的同時，目前所套用的\r\n#fs16##b#e所有Buff效果解除，且靈魂球將初始化#k#fs12##n。\r\n\r\n即使如此你還是真的想要挑戰嗎？");
        }
    } else if (status == i++) {
        if (cm.getLevel() < 105) {
            cm.sendOk("要挑戰武陵道場等級必須要達到#r105#k級");
        } else if (cm.getPQLog("dojang") >= enterLimit) {
            cm.sendOk("武陵道場一天只能參加" + normLimit + "次");
        } else if (!cm.start_DojoAgent()) {
            cm.sendOk("當前頻道挑戰人數已滿，請更換頻道再試。");
        } else {
            cm.setPQLog("dojang");
            cm.dispose();
        }
    } else {
        cm.dispose();
    }
}

function action_1(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    var i = 0;
    if (status == i++) {
        cm.sendNext("我們的師傅是武陵裡最強的人。\r\n師父所建立的地方就是這個#b武陵道場#k。");
    } else if (status == i++) {
        cm.sendNextPrev("武陵道場是79樓加上師傅的別樓為止#b#e共80樓#n#k的建築物。\r\n越強的人越能夠爬到更高的地方。\r\n當然依你的實力應該很難能撐到最後。");
    } else if (status == i++) {
        cm.sendNextPrev("除了師傅所在的80樓之外，各樓層由#r楓之谷的怪物#k們守著。詳細的情況我也不知道。\r\n只有師傅會知道。");
    } else if (status == i++) {
        cm.sendNextPrev("入場後在初始樓層內，你身上持有的#r所有加持效果會解除#k。全憑自己的力量來競爭才公平不是嗎？");
    } else if (status == i++) {
        cm.sendNextPrev("停留在初始樓層是你的自由，但\r\n#r計時器只會停止30秒#k，想要留下更好的紀錄，就快速準備前往1樓會比較好。");
    } else if (status == i++) {
        cm.sendNextPrev("#e1～9樓#n，#e11～19樓#n會出現#b一個ＢＯＳＳ#k。\r\n要通過到下一層樓的話，只要擊倒ＢＯＳＳ就可以了。");
    } else if (status == i++) {
        cm.sendNextPrev("#e21～29樓#n會出現#b１個ＢＯＳＳ#k與#b屬下５名#k。\r\n需要擊倒ＢＯＳＳ與屬下才能通過到下一層樓。");
    } else if (status == i++) {
        cm.sendNextPrev("#e31～39樓#n需要對付#b２個以上的ＢＯＳＳ#k。\r\n不會已經開始害怕發抖了吧？呵呵呵…");
    } else if (status == i++) {
        cm.sendNextPrev("#e41樓#n開始又變回只會出現#b１個ＢＯＳＳ#k，不用太過擔心。\r\n但究竟哪個比較容易還不好說呢。呵呵呵呵…");
    } else if (status == i++) {
        cm.sendNextPrev("除了師父所在的80樓以外，到70樓為止，會以\r\n#e10樓為單位#n出現#b楓之谷的知名ＢＯＳＳ#k。\r\n在這裡每#r15秒#k可以使用藥水。");
    } else if (status == i++) {
        cm.sendNextPrev("#e41樓之後#n開始也能每#r15秒#k使用藥水。你問為什麼？你自己親自進去看看就知道了。呵呵呵…");
    } else if (status == i++) {
        cm.sendNextPrev("你問每個樓層都有誰？那個你自己親自上去確認吧。\r\n你越強，就能知道越多不是嗎？呵呵呵…");
    } else if (status == i++) {
        cm.sendNextPrev("嗯，可以告訴你的是…\r\n#e74樓～79樓#n是由#b師傅的徒弟#k們守著。\r\n實力不足的話會很辛苦的。");
    } else if (status == i++) {
        cm.sendNextPrev("對了，武陵道場內部因為師父設下的結界，在\r\n楓之谷內可以發揮的力量，在這裡只能使用#b10分之1#k。\r\n進去之後不要過於慌張了。");
    } else if (status == i++) {
        cm.sendNextPrev("聽懂了的話就快點進去吧。\r\n很想大顯身手對吧？");
    } else {
        cm.dispose();
    }
}

var select_1 = -1;
function action_2(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    var i = 0;
    if (status == i++) {
        cm.sendSimple("武陵道場內可以獲得的獎勵有兩種。\r\n成為各個領域的#r前端排名者#k來獲得獎勵，\r\n或勤奮參加武陵道場，透過獲得的#r點數#k來交換物品。\r\n#b\r\n#L0#詢問排名者獎勵。#l\r\n#L1#詢問參與獎勵(點數)。#l");
    } else if (status == i++) {
        if (select_1 == -1) {
            select_1 = selection;
        }
        switch (select_1) {
            case 0:
                cm.sendNext("師傅會每週賜予#b前端排名者#k獎勵。\r\n強大的力量就是我們武陵道場的最高價值，當然得給予相應的獎勵不是嗎？");
                break;
            case 1:
                cm.sendNext("根據你的武陵道場參與度，會配發相應的點數給你。\r\n會用以下兩種基準來配發點數。\r\n\r\n- 每次挑戰時對比#b突破樓層數量#k，依比例配發點數\r\n- 依照自己所屬排名區間的#b上週整體排名百分比#k來配發獎勵\r\n\r\n");
                break;
            default:
                cm.dispose();
                break;
        }
    } else if (status == i++) {
        switch (select_1) {
            case 0:
                cm.sendNextPrev("為了更公平公正的競爭，根據等級，排名區間也會有所不同。\r\n好好確認你屬於哪個區間吧。\r\n\r\n#e- #b入門#k : 105 ~ 200級\r\n- #r達人#k : 201級以上#n");
                break;
            case 1:
                cm.sendNextPrev("依據樓層數為比例配發的點數來說，會以每1樓基本配發10點，每10樓額外配發100點的方式進行。");
                break;
            default:
                cm.dispose();
                break;
        }
    } else if (status == i++) {
        switch (select_1) {
            case 0:
                cm.sendNextPrev("雖然是很理所當然的事情，但根據排名區間的不同，獎勵也會不同。\r\n#b所有獎勵會以你目前所屬的排名區間為主來配發#k給你。\r\n你應該不會因為過去在排名者區間為前端排名者，任性來找我討獎勵吧？");
                break;
            case 1:
                cm.sendNextPrev("根據排名百分比配發的點數為了讓越往所屬在更強大的人的排名區間，還有達到更好成果，會大方配發的。");
                break;
            default:
                cm.dispose();
                break;
        }
    } else if (status == i++) {
        switch (select_1) {
            case 0:
                cm.sendNextPrev("獎勵品項的詳細內容可以透過\r\n#r武陵道場順位表的協助按鍵#k確認。");
                break;
            case 1:
                cm.sendNextPrev("根據排名百分比的點數會依據各個排名區間配發\r\n#b一定百分比內#k的點數，\r\n想要獲得點數的話，就變得更強大吧。呵呵呵..\r\n\r\n#e- #b入門#k : 前50%\r\n- #r達人#k : 前70%#n");
                break;
            default:
                cm.dispose();
                break;
        }
    } else if (status == i++) {
        switch (select_1) {
            case 1:
                cm.sendNextPrev("啊，另外點數最多只能持有#b50萬點#k，無法超過。記得養成定期使用的習慣。");
                break;
            default:
                cm.dispose();
                break;
        }
    } else {
        cm.dispose();
    }
}

function action_3(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    var i = 0;
    if (status == i++) {
        cm.sendNext("今天能參加武陵道場 " + (enterLimit - cm.getPQLog("dojang")) + "次。請牢記。");
    } else {
        cm.dispose();
    }
}

var Cards = [
    [30, 4001851],
    [60, 4001852],
    [180, 4001853],
    [360, 4001854],
    [540, 4001881],
    [720, 4001862],
    [1440, 4001882]
];
function action_4(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    var i = -1;
    if (status == i++) {
        cm.sendNext("嗯？什麼，就說隨你高興怎麼做了。");
        status -= 2;
    } else if (status == i++) {
        cm.askYesNo("武陵身心修練館已經決定也開放一般人進場了。\r\n但是，只有實力堅強又誠實的人才能進去。把拉歐大叔給你的護身符帶過來，依照護身符內的時間就能知道你進去待多久。\r\n\r\n要進場嗎？\r\n#b(身心修練館能在入場時依照角色的等級自動習得經驗值。");
    } else if (status == i++) {
        var tickets = new Array();
        var found = false;
        for each(card in Cards) {
            if (cm.haveItem(card[1])) {
                tickets.push(card[1]);
                found = true;
            } else {
                tickets.push(0);
            }
        }
        if (!found) {
            cm.sendOk("必須要有身心修練館入場用的護身符才能進入修練館，去跟我旁邊的拉歐大叔拿吧。");
            status = -3;
        } else {
            var menu = "";
            for(var n = 0; n < tickets.length; n++) {
                menu += "\r\n";
                if (tickets[n] > 0) {
                    menu += "#L" + n + "##b#t" + tickets[n] + "##l";
                }
            }
            cm.sendSimple("來，把身心修練館入場護符拿出來。" + menu);
        }
    } else if (status == i++) {
        if (selection < 0 || selection >= Cards.length) {
            cm.sendOk("發生未知錯誤。");
            status = -3;
            return;
        }
        var card = Cards[selection];
        if (!cm.haveItem(card[1])) {
            cm.sendOk("必須要有身心修練館入場用的護身符才能進入修練館。");
            status = -3;
            return;
        }
        cm.gainItem(card[1], -1);
        cm.forceStartQuest(3889, card[0].toString());
        cm.updateOneQuestInfo(3894, "initTime", card[0].toString());
        cm.dispose();
        cm.warp(925080000);
    } else {
        cm.dispose();
    }
}

function action_5(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    var i = 0;
    if (status == i++) {
        cm.updateOneQuestInfo(100472, "dojangRankJob", "0");
        cm.updateOneQuestInfo(100472, "dojangRank2", "0");
        cm.sendOk("什麼，你沒有挑戰武陵道場的紀錄？\r\n想要獲得獎勵的話，就去挑戰武陵道場再來。");
    } else {
        cm.dispose();
    }
}

function action_6(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    var i = 0;
    if (status == i++) {
        cm.updateOneQuestInfo(100472, "dojangRankJob", "0");
        cm.updateOneQuestInfo(100472, "dojangRank2", "0");
        cm.sendOk("什麼，你沒有挑戰武陵道場的紀錄？\r\n想要獲得獎勵的話，就去挑戰武陵道場再來。");
    } else {
        cm.dispose();
    }
}