var status = -1;
var chs = -1;
var non_difficulty;

var isOpen;
var aEventScriptName;
var aPQLogName;
var sEventName;
var aEventMode;
var aPractice;
var nStartMap;
var aMinLevel;
var aMaxLevel;
var nMobLevel;
var aMaxEnter;
var aRefreshDayOfWeek;
var nMinPlayers;
var nMaxPlayers;
var nQuest;
var nSpeak;

var practiceMaxEnter = 5;

function start() {
    if ("undefined" != typeof EventConfig) {
        isOpen = EventConfig.Open;
        aEventScriptName = EventConfig.EventScriptName;
        aPQLogName = EventConfig.PQLogName;
        sEventName = EventConfig.EventName;
        aEventMode = EventConfig.EventMode;
        aPractice = EventConfig.Practice;
        nStartMap = EventConfig.StartMap;
        aMinLevel = EventConfig.MinLevel;
        aMaxLevel = EventConfig.MaxLevel;
        nMobLevel = EventConfig.Moblevel == null ? 300 : EventConfig.Moblevel;
        aMaxEnter = EventConfig.MaxEnter;
        aRefreshDayOfWeek = EventConfig.RefreshDayOfWeek;
        nMinPlayers = EventConfig.MinPlayers;
        nMaxPlayers = EventConfig.MaxPlayers;
        nQuest = EventConfig.QuestID == null ? 0 : EventConfig.QuestID;
        nSpeak = EventConfig.Speak == null ? "" : EventConfig.Speak;
    } else {
        isOpen = Open;
        aEventScriptName = EventScriptName;
        aPQLogName = PQLogName;
        sEventName = EventName;
        aEventMode = "undefined" == typeof EventMode ? null : EventMode;
        aPractice = "undefined" == typeof Practice ? null : Practice;
        nStartMap = StartMap;
        aMinLevel = MinLevel;
        aMaxLevel = MaxLevel;
        nMobLevel = "undefined" == typeof Moblevel ? 300 : Moblevel;
        aMaxEnter = MaxEnter;
        aRefreshDayOfWeek = RefreshDayOfWeek;
        nMinPlayers = MinPlayers;
        nMaxPlayers = MaxPlayers;
        nQuest = "undefined" == typeof QuestID ? 0 : QuestID;
    }

    if (aEventScriptName.length != aPQLogName.length && aPQLogName.length == 1) {
        non_difficulty = true;
    } else {
        non_difficulty = false;
    }
    if (cm.getMapId() == nStartMap) {
        var text = "";
        for (var i = 0; i < aEventScriptName.length; i++) {
            text += "\r\n#L" + i + "#挑戰 " + sEventName;
            if (aEventMode != null) {
                text += "(#b" + aEventMode[i] + "模式#k)";
            }
            text += "#l";
        }
        if (aPractice != null) {
            for (var i = 0; i < aEventScriptName.length; i++) {
                if (aPractice[i]) {
                    text += "\r\n#L" + (i + aEventScriptName.length) + "#挑戰 " + sEventName + "(#b" + (aEventMode == null ? "" : aEventMode[i]) + "練習模式#k)#l";
                }
            }
        }
        askMenu("#e<Boss - " + sEventName + ">#n\r\n\r\n#b#h0# #k要前往打到" + sEventName + "嗎？" + text);
    } else {
        askYesNo("#e<Boss - " + sEventName + ">#n\r\n\r\n你現在確定放棄任務,從這裡出去?");
    }
}

var practice = false;
var pqLog;
function action(mode, type, selection) {
    if (status >= 0 && mode == 0) {
        cm.dispose();
        return;
    }
    mode == 1 ? status++ : status--;
    if (cm.getMapId() == nStartMap) {
        if (status == 0) {
            if (chs == -1) {
                chs = selection;
            }
            if (chs >= aEventScriptName.length) {
                cm.askYesNo("您已選擇進入練習模式。在練習模式中#b#e無法獲得經驗值和獎勵，#k#n無論是哪一種BOSS怪物的種類，#b#e一天只能使用" + practiceMaxEnter + "次#k#n。\r\n\r\n在練習模式中，死亡後復活時使用凍結加持也不會扣除。但是，必須擁有#b#e凍結加持器1個以上#k#n才能使用。\r\n\r\n你要進入嗎？", 0);
                practice = true;
                chs -= aEventScriptName.length;
                status--;
                return;
            }
            var em = cm.getEventManager(aEventScriptName[chs]);
            if (em == null || isOpen == false) {
                sendOk("副本暫未開啟，敬請期待。");
                cm.dispose();
                return;
            }
            pqLog = aPQLogName[non_difficulty ? 0 : chs];
            if (practice) {
                pqLog += "(練習模式)";
            }
            var prop = em.getProperty("state");
            var rwpz = "#e<Boss - " + sEventName + (practice ? "(練習模式)" : "") + ">#n\r\n#k\r\n#e#r";
            rwpz += "#n#k#e副本狀態：#n" + (prop == null || prop.equals("0") ? "#e#g空閒#n#k" : "#e#r開啟#n#k") + "";
            rwpz += "\r\n#e推薦人數：" + nMinPlayers + " - " + nMaxPlayers + "#n#e    推薦等級：" + aMinLevel[chs] + " - " + aMaxLevel[chs] + "#n";
            rwpz += "\r\n當前已進行：#r#e" + cm.getDayOfWeekPQLog(pqLog, practice ? 0 : aRefreshDayOfWeek[non_difficulty ? 0 : chs]) + "#n#k 次";
            rwpz += "    剩餘挑戰次數：#r#e" + ((practice ? practiceMaxEnter : aMaxEnter[non_difficulty ? 0 : chs]) - cm.getDayOfWeekPQLog(pqLog, practice ? 0 : aRefreshDayOfWeek[non_difficulty ? 0 : chs])) + "#n#k 次#n" + (non_difficulty ? "(與難易度無關)" : "") + "#k\r\n\r\n";
            askYesNo(rwpz + "           #b#h0# \n#k#e是否現在就進入？#n");
        } else if (status == 1) {
            if (cm.getParty() == null) { //判斷組隊
                sendNext("你並沒有組隊，請創建組建一個隊伍在來吧。");
            } else if (!cm.isLeader()) { // 判斷組隊隊長
                sendOk("請讓你們的組隊長和我對話。");
            } else if (!cm.isAllPartyMembersAllowedLevel(aMinLevel[chs], aMaxLevel[chs])) {
                sendNext("組隊成員等級 " + aMinLevel[chs] + " 以上 " + aMaxLevel[chs] + " 以下才可以入場。");
            } else if (!cm.isAllPartyMembersAllowedDayOfWeekPQ(pqLog, practice ? practiceMaxEnter : aMaxEnter[non_difficulty ? 0 : chs], practice ? 0 : aRefreshDayOfWeek[non_difficulty ? 0 : chs]) && cm.getPlayer().isIntern()==false ) {
                sendNext("你的隊員#r#e \"" + cm.getNotAllowedDayOfWeekPQMemberName(pqLog, practice ? practiceMaxEnter : aMaxEnter[non_difficulty ? 0 : chs], practice ? 0 : aRefreshDayOfWeek[non_difficulty ? 0 : chs]) + "\" #k#n次數已經達到上限了。");
            } else if (!cm.allMembersHere()) {
                sendOk("你的組隊部分成員不在當前地圖,請召集他們過來後在嘗試。"); //判斷組隊成員是否在一張地圖..
            } else {
                var em = cm.getEventManager(aEventScriptName[chs]);
                if (em == null || isOpen == false) {
                    sendOk("副本暫未開啟，敬請期待。");
                } else {
                    var prop = em.getProperty("state");
                    if (prop == null || prop.equals("0")) {
                        em.setProperty("practice", aPractice != null && practice ? "true" : "false" );
                        cm.gainMembersPQ(pqLog, 1);
                        cm.dispose();
                        em.startInstance(cm.getParty(), cm.getMap(), nMobLevel, nQuest);
                        return;
                    } else {
                        sendOk("已經有隊伍在進行了,請換其他頻道嘗試。");
                    }
                }
            }
            cm.dispose();
        } else {
            cm.dispose();
        }
    } else {
        if (status == 0) {
            cm.warp(nStartMap, 0);
        }
        cm.dispose();
    }
}

function askMenu(msg) {
    switch(nSpeak) {
        case "N":
            cm.askMenuA(msg, true);
            break;
        default:
            cm.askMenu(msg);
            break;
    }
}

function askYesNo(msg) {
    switch(nSpeak) {
        case "N":
            cm.askYesNoS(msg, false);
            break;
        default:
            cm.askYesNo(msg);
            break;
    }
}

function sendOk(msg) {
    switch(nSpeak) {
        case "N":
            cm.sendOkS(msg, false);
            break;
        default:
            cm.sendOk(msg);
            break;
    }
}

function sendNext(msg) {
    switch(nSpeak) {
        case "N":
            cm.sendNextS(msg, false);
            break;
        default:
            cm.sendNext(msg);
            break;
    }
}