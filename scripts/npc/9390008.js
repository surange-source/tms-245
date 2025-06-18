var status = 0;
var minLevel = 200;
var maxLevel = 275;
var minPartySize = 1;
var maxPartySize = 6;
var maxenter = 10;
var PQLog = "外星訪客";
var sel = -1;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var mapid = cm.getMapId();
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (mapid == 861000001) {
            onExit(mode, type, selection);
        } else if (mapid == 861000000) {
            onStart(mode, type, selection);
        } else {
            onEvent(mode, type, selection);
        }
    }
}


function onEvent(mode, type, selection) {
    if (status == 0) {
        cm.sendSimple("想#b和全部隊友一起#k放棄抵禦外星人的攻擊並退出嗎？\r\n\r\n#b#L0#退出。#l");
    } else if (status == 1) {
        cm.warpParty(861000000, 0);
        cm.dispose();
    }
}

function onExit(mode, type, selection) {
    if (status == 0) {
        cm.sendSimple("聽別的冒險家說偶爾還會出現'稀有的'BOSS…#b\r\n#L1# 要從這裡出去。#l");
    } else if (status == 1) {
        cm.warp(861000000);
        cm.dispose();
    }
}
function onStart(mode, type, selection) {
    if (status == 0) {
        cm.sendSimple("這宇宙飛船內部存在奇怪的磁場！參與實驗的冒險家太少了…\r\n\r\n#b#L0# 詢問事件#l\r\n#e#L1# 進入宇宙飛船內部。#l#n\r\n#L2# 尋找組隊成員。#l#n\r\n#L3# 查看今天剩餘的入場次數。.#l\r\n");
    } else if (status == 1) {
        sel = selection;
        switch (sel) {
            case 0:
                cm.sendNext("一天晚上，聽到奇怪的聲音後打開窗戶一看，有巨大的火球從天而降！！");
                break;
            case 1: //
                cm.sendSimple("好的……準備好了的話，就進入那道光！\r\n\r\n#b#L1#進入宇宙船#l");
                break;
            case 2:
                cm.sendOk("請向周圍的朋友們請求組隊。使用尋找組隊(快捷鍵O)功能，可以在任何時間任何地點尋找組隊。敬請參考。");
                cm.dispose();
                break;
            case 3:
                var pqtry = maxenter - cm.getPQLog(PQLog);
                if (pqtry <= maxenter) {
                    cm.sendOk("今天還能進行 " + pqtry + " 次.");
                    cm.dispose();
                }
                cm.dispose();
                break;
        }
    } else if (status == 2) {
        if (sel == 0) {
            cm.sendNext("趕到這裡後發現那個巨大的火球是宇宙飛船…還發現裡面有數量龐大的生命體。而且，還發現很可怕的傢伙。如果找不到那傢伙，說不定楓之谷世界會有大事情。 ");
        } else {
            cm.sendNext("1. 必須在限定時間內消滅掉180個怪物或BOSS。\r\n2. 5個關卡必須#b#e「全部完成」#k#n，才能在出口處獲得「大量的額外經驗值」。\r\n\r\n這兩點一定要記住！");
        }
    } else if (status == 3) {
        if (sel == 0) {
            cm.sendNext("所以我在找願意進入宇宙飛船內部的最強冒險家，幫助我尋找那傢伙的痕跡。");
        } else {

            if (cm.getParty() == null) { // 沒有組隊
                cm.sendOk("需要有一個隊伍在可以入場。");
                cm.dispose();
            } else if (!cm.isLeader()) { // 不是隊長
                cm.sendOk("隊長必須在這裡。請讓他和我說話。");
                cm.dispose();
            } else if (!cm.allMembersHere()) {
                cm.sendOk("你的組隊部分成員不在當前地圖,請召集他們過來後在嘗試。"); //判斷組隊成員是否在一張地圖..
                cm.dispose();
            } else if (!cm.isAllPartyMembersAllowedLevel(minLevel, maxLevel)) {
                cm.sendNext("組隊成員等級 " + minLevel + " 以上 " + maxLevel + " 以下才可以入場。");
                cm.dispose();
            } else if (!cm.isAllPartyMembersAllowedPQ(PQLog, maxenter)) {
                cm.sendNext("你的隊員#r#e \"" + cm.getNotAllowedPQMemberName(PQLog, maxenter) + "\" #k#n次數已經達到上限了。");
                cm.dispose();
            } else {
                var party = cm.getParty().getMembers();
                var next = true;
                if (!cm.isAdmin() && (party.size() > maxPartySize || party.size() < minPartySize)) {
                    next = false;
                }
                if (next) {
                    var em = cm.getEventManager("Visitors");
                    if (em == null) {
                        cm.sendOk("此任務正在建設當中。");
                    } else {
                        var prop = em.getProperty("state");
                        if (prop.equals("0") || prop == null) {
                            cm.dispose();
                            em.startInstance(cm.getParty(), cm.getMap(), 209);
                            cm.gainMembersPQ(PQLog, 1);
                            return;
                        } else {
                            cm.sendOk("外星訪客任務裡面已經有人了，請稍等！");
                        }
                    }
                } else {
                    cm.sendYesNo("你需要有一個 " + minPartySize + " - " + maxPartySize + " 人的隊伍. 請您組好隊員後再試.");
                }
                cm.dispose();
            } //判斷組隊
        }
    } else if (status == 4) {
        if (sel == 0) {
            cm.sendNext("方法很簡單。\r\n在5個房間各在5分鐘內#打敗#b#e'180只外星訪問者'#k#n就行了。\r\n當然，如果有BOSS出現，#b#e只打敗BOSS#k#n就可以了。如果能非常成功地調查宇宙船內部，就給你'驚人的經驗值'。\r\n你…要幫我嗎？");
        } else {

        }
    } else if (status == 5) {
        cm.sendOk("但，要記住宇宙飛船每天只能探索" + maxenter + "次。");
        cm.dispose();
    }
}

