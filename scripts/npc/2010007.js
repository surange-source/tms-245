
var status = -1;
var isGuilded;
var sel;

function start() {
    if (cm.getPlayerStat("GID") > 0) {
        isGuilded = true;
    } else {
        isGuilded = false;
    }
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (isGuilded == true) {
        guilded(mode, type, selection);
    } else {
        nonGuild(mode, type, selection);
    }
}


function guilded(mode, type, selection) {
    if (mode == 0 && status == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        if (status == 1 && sel == 1) {
            cm.sendNext("好的，你再好好想想。好不容易培養起來的公會，怎麼能隨便解散呢……");
            cm.dispose();
            return;
        } else if (status == 2) {
            if (sel == 0) {
                cm.sendNext("手續費負擔很重嗎？只要花一點時間，GP很快就能搜集到。別太擔心。好了，請你以後再來找我吧。");
            } else if (sel == 2) {
                cm.sendNext("聽到是培訓，就害怕了嗎？沒有你想像的那麼可怕。如果你改變了注意，就再來找我。");
            }
            cm.dispose();
            return;
        }
        selection = sel;
        status--;
    }

    if (status == 0) {
        cm.sendSimple("我能幫你什麼嗎？\r\n#b#L0#我想增加公會人數#l\r\n#L1#我想解散公會#l"/*\r\n#L2#我想瞭解有關公會系統的詳細說明#l"*/);
    } else if (status == 1) {
        sel = selection;
        if (sel == 2) {
            cm.sendNext("你想瞭解更多有關公會的內容？如果是那樣的話，公會負責人蕾雅會為你介紹的。");
        } else {
            if (cm.getPlayerStat("GID") <= 0 || cm.getPlayerStat("GRANK") != 1) {
                cm.sendOk("你不是公會的公會長！！這是只有公會的公會長才可以決定的工作。");
                cm.dispose();
            } else {
                if (sel == 0) {
                    cm.sendNext("你是想增加公會人數嗎？嗯，看來你的公會成長了不少～你也知道，要想增加公會人數，必須在公會本部重新登記。當然，使用楓幣作為手續費。此外，公會成員最多可以增加到200個。");
                } else if (sel == 1) {
                    cm.sendYesNo("你真的要解散公會嗎？哎呀……哎呀……解散之後，你的公會就會被永久刪除。很多公會特權也會一起消失。你真的要解散嗎？");
                }
            }
        }
    } else if (status == 2) {
        if (sel == 0) {
            cm.sendYesNo("當前的公會最大人數是#b" + cm.getGuildCapacity() + "人#k，增加#b5人#k所需的手續費是#b100萬楓幣#k。怎麼樣？你想增加公會人數嗎？");
        } else if (sel == 1) {
            cm.disbandGuild();
            cm.dispose();
        } else if (sel == 2) {
            cm.sendYesNo("怎麼樣？你想抽點時間，接受公會集中培訓嗎？\r\n#r(點擊接受時，移動到聽取說明的場所。)#k");
        }
    } else if (status == 3) {
        if (sel == 0) {
            //cm.sendNext("增加公會人數所需的GP好像不夠。GP可以在公會窗口中確認。我再說一遍，增加公會人數所需要的手續費是#bGP 1萬#k。");
            cm.increaseGuildCapacity(false);
            cm.dispose();
        } else if (sel == 2) {
            cm.dispose();
        }
    }
}


function nonGuild(mode, type, selection) {
    if (mode == 0 && status == 1) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        if (status == 2 && sel == 2) {
            cm.sendNext("你覺得還不是時候嗎？如果你想創建公會，可以再來找我。");
            cm.dispose();
        } else if (status == 3 && sel == 3) {
            cm.sendNext("聽到是培訓，就害怕了嗎？沒有你想像的那麼可怕。如果你改變了注意，就再來找我。");
            cm.dispose();
        }
        selection = sel;
        status--;
    }

    if (status == 0) {
        cm.sendNext("你……是因為對公會感興趣，才會來找我的嗎？");
    } else if (status == 1) {
        cm.sendSimple("你想要幹什麼呢？快告訴我吧。\r\n\r\n#b#L0#請告訴我公會是什麼#l\r\n#L1#怎麼才能創建公會呢？#l\r\n#L2#我想創建公會#l\r\n#L3#我想瞭解有關公會系統的詳細說明#l");
    } else if (status == 2) {
        sel = selection;
        if (sel == 0) {
            cm.sendNext("公會……你可以把它理解成一個小的組織。是擁有相同理想的人為了同一個目的而聚集在一起成立的組織。 但是公會是經過公會總部的正式登記，是經過認可的組織。");
        } else if (sel == 1) {
            cm.sendNext("要想創建公會，至少必須達到100級。");
        } else if (sel == 2) {
            cm.sendYesNo("哦！你是來創建公會的嗎……要想創建公會，需要500萬楓幣。我相信你一定已經準備好了。好的～你想創建公會嗎？");
        } else if (sel == 3) {
            cm.sendNext("你想瞭解更多有關公會的內容？如果是那樣的話，公會負責人蕾雅會為你介紹的。");
        }
    } else if (status == 3) {
        if (sel == 0) {
            cm.sendNextPrev("通過公會活動，可以獲得很多優惠。比如，可以獲得公會技能，以及公會專用物品。");
        } else if (sel == 1) {
            cm.sendNextPrev("此外還需要500萬楓幣。這是註冊公會所需的手續費。");
        } else if (sel == 2) {
            if (cm.getPlayerStat("LVL") < 100) {
                cm.sendNext("喂，你的等級還太低，好像還沒辦法成為公會管理員。要想創建公會，至少必須達到100級。等你升到100級之後，再重新嘗試吧。");
                cm.dispose();
            } else if (cm.getMeso() < 5000000) {
                cm.sendNext("哎呀，手續費好像不夠。你帶夠錢了嗎？請再確認一下。要想創建公會，手續費是必須的。");
                cm.dispose();
            } else {
                cm.sendNext("請輸入公會名稱。");
            }
        } else if (sel == 3) {
            cm.sendYesNo("怎麼樣？你想抽點時間，接受公會集中培訓嗎？\r\n#r(點擊接受時，移動到聽取說明的場所。)#k");
        }
    } else if (status == 4) {
        if (sel == 0) {
            cm.dispose();
        } else if (sel == 1) {
            cm.sendNextPrev("好了……如果你想註冊公會，就來找我吧～\r\n啊！當然，如果你已經加入了其他公會，那就不行了！！");
        } else if (sel == 2) {
            cm.inputGuildName();
            cm.dispose();
        } else if (sel == 3) {
            cm.dispose();
        }
    } else if (status == 5) {
        if (sel == 1) {
            cm.dispose();
        }
    }
}
