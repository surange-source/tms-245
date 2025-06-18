/*  This is mada by Kent    
 *  This source is made by Funms Team
 *  @Author Kent 
 */

//副本開關 開啟、true 關閉、false
var open = true;
//配置文件名稱
var PQname = ["NewEvent1"];
//等級限制
var minLevel = [160, 170];
var maxLevel = [275, 275];
//次數限制
var maxenter = [2];
//記錄次數名稱
var PQLog = ["米納爾西部森林"];
var status = -1;
//限制人數
var minPlayers = 1;
var maxPlayers = 6;
//怪物最大等級設置
var moblevel = 255;
var chs;


function start() {
    var text = "";
    for (var i = 0; i < PQname.length; i++) {
        text += "\r\n#b#L" + i + "#挑戰 " + PQLog[i] + "#l#k         ";
    }
    cm.sendSimple("#e<Boss - 神木村:" + PQLog[0] + ">#n\r\n\r\n#b#h0# \n\#k你現在想和隊友一起挑戰這個怪物副本嗎?\r\n" + text);
}
function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }

    if (status == 0) {
        var em = cm.getEventManager(PQname[selection]);
        if (em == null || open == false) {
            cm.sendOk("配置文件不存在,請聯繫管理員。");
            cm.dispose();
            return;
        }
        chs = selection;
        var prop = em.getProperty("state");
        var rwpz = "#e<Boss - 西部森林:" + PQLog[0] + ">#n\r\n#k\r\n#e#r";
        rwpz += "#n#k副本狀態：" + (prop == null || prop.equals("0") ? "#r空閒#k" : "#b開啟#k") + "";
        rwpz += "\r\n#e推薦人數：" + minPlayers + " - " + maxPlayers + "#n#e    推薦等級：" + minLevel[selection] + " - " + maxLevel[selection] + "#n";
        rwpz += "\r\n#e#r" + PQLog[selection] + "#n#k當前已進行：#r#e" + cm.getPQLog(PQLog[selection]) + "#n#k 次";
        rwpz += "    剩餘挑戰次數：#r#e" + (maxenter[selection] - cm.getPQLog(PQLog[selection])) + "#n#k 次#n#k\r\n\r\n";
        cm.sendYesNo(rwpz + "           #b#h0# \n\#k#e是否現在就進入？#n");
    } else if (status == 1) {
        if (cm.getParty() == null) { //判斷組隊
            cm.sendYesNo("你並沒有組隊，請創建組建一個隊伍在來吧。");
        } else if (!cm.isLeader()) { // 判斷組隊隊長
            cm.sendOk("請讓你們的組隊長和我對話。");
        } else if (!cm.isAllPartyMembersAllowedLevel(minLevel[chs], maxLevel[chs])) {
            cm.sendNext("組隊成員等級 " + minLevel[chs] + " 以上 " + maxLevel[chs] + " 以下才可以入場。");
        } else if (!cm.isAllPartyMembersAllowedPQ(PQLog[chs], maxenter[chs])) {
            cm.sendNext("你的隊員#r#e \"" + cm.getNotAllowedPQMemberName(PQLog[chs], maxenter[chs]) + "\" #k#n次數已經達到上限了。");
        } else if (!cm.allMembersHere()) {
            cm.sendOk("你的組隊部分成員不在當前地圖,請召集他們過來後在嘗試。"); //判斷組隊成員是否在一張地圖..
        } else {
            var em = cm.getEventManager(PQname[chs]);
            if (em == null || open == false) {
                cm.sendSimple("配置文件不存在,請聯繫管理員。");
            } else {
                var prop = em.getProperty("state");
                if (prop == null || prop.equals("0")) {
                    em.startInstance(cm.getParty(), cm.getMap(), 255);
                    cm.gainMembersPQ(PQLog[chs], 1);
                } else {
                    cm.sendOk("已經有隊伍在進行了,請換其他頻道嘗試。");
                }
            }
        }
        cm.dispose();
    } else {
        cm.dispose();
    }
}
