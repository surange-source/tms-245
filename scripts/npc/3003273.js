/*  This is mada by Kent    
 *  This source is made by Funms Team
 *  BOSS組隊副本 梅格耐斯[簡單]
 *  @Author Kent 
 */

var status = -1;
//副本開關 開啟、true 關閉、false
var open = true;
//配置文件名稱
var PQname = ["BOSSluxide"];
//記錄次數名稱
var PQLog = ["露希妲"];
//開始的地圖
var startmap = 450003600;
//等級限制
var minLevel = [220];
var maxLevel = [275];
//次數限制
var maxenter = [1];

//限制人數
var minPlayers = 4;
var maxPlayers = 6;
//怪物最大等級設置
var moblevel = 255;
var chs;


function start() {
    if (cm.getMapId() == startmap) {
        var text = "";
        for (var i = 0; i < PQname.length; i++) {
            text += "\r\n#b#L" + i + "#挑戰 " + PQLog[i] + "#l#k";
        }
        cm.sendSimple("#e<Boss - " + PQLog[0] + ">#n\r\n\r\n#b#h0# \n\#k你想和隊員們一起努力，完成任務嗎？這裡面有很多如果不同心協力就無法解決的障礙……。?\r\n" + text);
    } else {
        cm.sendYesNo("#e<Boss - " + PQLog[0] + ">#n\r\n\r\n你現在確定放棄任務,從這裡出去?\r\n");
    }
}
function action(mode, type, selection) {

    if (status >= 0 && mode == 0) {
        cm.dispose();
        return;
    }
    mode == 1 ? status++ : status--;
    if (cm.getMapId() == startmap) {
        if (status == 0) {
            var em = cm.getEventManager(PQname[selection]);
            if (em == null || open == false) {
                cm.sendOk("配置文件不存在,請聯繫管理員。");
                cm.dispose();
                return;
            }
            chs = selection;
            var prop = em.getProperty("state");
            var rwpz = "#e<Boss - " + PQLog[selection] + ">#n\r\n#k\r\n#e#r";
            rwpz += "#n#k#e副本狀態：#n" + (prop == null || prop.equals("0") ? "#e#g空閒#n#k" : "#e#r開啟#n#k") + "";
            rwpz += "\r\n#e推薦人數：" + minPlayers + " - " + maxPlayers + "#n#e    推薦等級：" + minLevel[selection] + " - " + maxLevel[selection] + "#n";
            rwpz += "\r\n當前已進行：#r#e" + cm.getPQLog(PQLog[selection]) + "#n#k 次";
            rwpz += "    剩餘挑戰次數：#r#e" + (maxenter[selection] - cm.getPQLog(PQLog[selection])) + "#n#k 次#n#k\r\n\r\n";
            cm.sendYesNo(rwpz + "           #b#h0# \n\#k#e是否現在就進入？#n");
        } else if (status == 1) {
            if (cm.getParty() == null) { //判斷組隊
                cm.sendOk("你並沒有組隊，請創建組建一個隊伍在來吧。");
                cm.dispose();
            } else if (!cm.isLeader()) { // 判斷組隊隊長
                cm.sendOk("請讓你們的組隊長和我對話。");
                cm.dispose();
            } else if (!cm.isAllPartyMembersAllowedLevel(minLevel[chs], maxLevel[chs])) {
                cm.sendOk("組隊成員等級 " + minLevel[chs] + " 以上 " + maxLevel[chs] + " 以下才可以入場。");
                cm.dispose();
            } else if (!cm.isAllPartyMembersAllowedPQ(PQLog[chs], maxenter[chs])) {
                cm.sendOk("你的隊員#r#e \"" + cm.getNotAllowedPQMemberName(PQLog[chs], maxenter[chs]) + "\" #k#n次數已經達到上限了。");
                cm.dispose();
            } else if (!cm.allMembersHere()) {
                cm.sendOk("你的組隊部分成員不在當前地圖,請召集他們過來後在嘗試。"); //判斷組隊成員是否在一張地圖..
                cm.dispose();
            } else {
                    var party = cm.getParty().getMembers();
                    var next = true;
                    if (!cm.isAdmin() && (party.size() > maxPlayers || party.size() < minPlayers)) {
                        next = false;
                    }
                    if (next) {
                var em = cm.getEventManager(PQname[chs]);
                if (em == null || open == false) {
                    cm.sendSimple("配置文件不存在,請聯繫管理員。");
                } else {                    
                    var prop = em.getProperty("state");
                    if (prop == null || prop.equals("0")) {
                        em.startInstance(cm.getParty(), cm.getMap(), 255);
                        cm.gainMembersPQ(PQLog[chs], 1);
                        cm.worldSpouseMessage(0x15, "『王者露希妲』 : " + cm.getChar().getName() + " 的敢死隊隊伍，氣勢洶洶的挑戰 "+PQLog[chs]+" 去了。");
                        cm.dispose();
                                                return;
                            } else {
                                cm.sendOk("露希妲副本任務裡面已經有人了，請稍等！");
                            }
                        }
                        cm.dispose();
                    } else {
                        cm.sendYesNo("你需要有一個 " + minPlayers + " - " + maxPlayers + " 人的隊伍. 請您組好隊員後再試.");
                        cm.dispose();
                    }
                }
}
}
}





































































