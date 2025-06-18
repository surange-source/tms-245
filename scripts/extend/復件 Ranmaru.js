/*
Ranmaru 森蘭丸
 */


var status = 0;
//限制等級
var minLevel = 140; //最低等級
var maxLevel = 275;//最高等級
var minLevel1 = 180; //最低等級
var maxLevel1 = 275;//最高等級

//限制人數
var minPlayers = 1;
var maxPlayers = 1; 

//怪物最大等級設置
var moblevel = 255;

//副本開關 開啟、true 關閉、false
var open = true;

//組隊log記錄
var PQ = '森蘭丸';
var PQ1 = '進階森蘭丸';

//配置文件名稱
var eventname = "RanmaruBoss"; 
var eventname1 = "RanmaruJBoss";

//設置每日次數
var maxenter = 5;
var maxenter1 = 2;
function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) {

    if (status >= 1 && mode == 0) {
        cm.sendOk("快捷尋找組隊按熱鍵「O」趕快加入組隊來挑戰組隊任務吧。");  
        cm.dispose();
        return;
    }
    if (mode == 1)
        status++;
    else
        status--;

    if(cm.getMapId() == 807300100 || cm.getMapId() == 807300200){
    if (status == 0) {
        var em = cm.getEventManager(eventname);
        var em1 = cm.getEventManager(eventname1);
        var prop = em.getProperty("state");
        if (prop == null || prop.equals("0")) {
            var vipstr = "#r副本空閒#k";
        } else {
            var vipstr = "#b已經開啟#k";
        }
         var prop = em1.getProperty("state");
        if (prop == null || prop.equals("0")) {
            var vipstr1 = "#r副本空閒#k";
        } else {
            var vipstr1 = "#b已經開啟#k";
        }
        
            if (cm.getPlayer().getClient().getChannel() == 1) {
            var pqtry = maxenter - cm.getPQLog(PQ);
            var pqtry1 = maxenter1 - cm.getPQLog(PQ1);
            var rwpz = "";
            rwpz += "#e推薦等級：140 - 250";
            rwpz += "推薦人數：1 - 6  \r\n#b已進行普通模式：" + cm.getPQLog(PQ) + " 次       剩餘挑戰次數：" + pqtry + " 次#k";
            rwpz += "\r\n#r已進行進階模式：" + cm.getPQLog(PQ1) + " 次       #r剩餘挑戰次數：" + pqtry1 + " 次#n#k";
            rwpz += "\r\n普通模式狀態：" + vipstr + "        進階模式狀態：" + vipstr1+ "";
            var zyms = "";
            zyms = "#e<Boss - 森蘭丸>#n\r\n#b#h0# \n\#k你現在想和隊友一起挑戰這個BOSS副本嗎?\r\n" + rwpz + "\r\n";
            zyms += "   #L1##b是的,進行普通模式#l\r\n\r\n";
            zyms += "   #L2##b是的,進行進階模式#l\r\n";
            cm.sendSimple(zyms);
       } else {
            cm.sendOk("當前副本只能在1頻道進行。");
            cm.dispose();
        }
       
    } else if (status == 1) {
         if (selection == 1) {
            if (cm.getParty() == null) { //判斷組隊
                cm.sendOk("你沒有組隊是否創建一個組隊。");
                cm.dispose();
            } else if (!cm.isLeader()) { // 判斷組隊隊長
                cm.sendOk("請你們團隊的隊長和我對話。");
                cm.dispose();
            } else if (cm.getPQLog(PQ) >= maxenter) {
                cm.sendOk("你今天挑戰次數已經用完了,請明天在來吧!");
                cm.dispose();
            } else if (!cm.allMembersHere()) {
                cm.sendOk("你的組隊部分成員不在當前地圖,請召集他們過來後在嘗試。"); //判斷組隊成員是否在一張地圖..
                cm.dispose();
            } else {
                var party = cm.getParty().getMembers();
                var mapId = cm.getMapId();
                var next = true;
                var levelValid = 0;
                var inMap = 0;

                var it = party.iterator();
                while (it.hasNext()) {
                    var cPlayer = it.next();
                    if (cPlayer.getLevel() >= minLevel && cPlayer.getLevel() <= maxLevel) {
                        levelValid += 1;
                    } else {
                        //cm.sendOk("組隊成員 " + minPlayers + " 人以上 " + maxPlayers + "人 以下 所有成員等級 "+ minLevel +" 以上 "+ maxLevel +" 以下才可以入場。");
                        cm.dispose();
                        next = false;
                    }
                    if (cPlayer.getMapid() == mapId) {
                        inMap += 1;
                    }
                }
                if (party.size() > maxPlayers || inMap < minPlayers) {
                    next = false;
                }
                if (next) {
                    var em = cm.getEventManager(eventname);
                    if (em == null || open == false) {
                        cm.sendSimple("配置文件不存在,請聯繫管理員。");
                    } else {
                        var prop = em.getProperty("state");
                        if (prop == null || prop.equals("0")) {
                            cm.setPQLog(PQ);
                            em.startInstance(cm.getParty(), cm.getMap(),"+ moblevel +");
                        } else {
                            cm.sendSimple("已經有隊伍在進行了,請換其他頻道嘗試。");
                        }
                        cm.dispose();
                    }
                } else {
                    cm.sendYesNo("組隊成員 " + minPlayers + " 人以上 " + maxPlayers + "人 以下 所有成員等級 "+ minLevel +" 以上 "+ maxLevel +" 以下才可以入場。");
                }
            }

        } else if (selection == 2) {
            if (cm.getParty() == null) { //判斷組隊
                cm.sendOk("你沒有組隊是否創建一個組隊。");
                cm.dispose();
            } else if (!cm.isLeader()) { // 判斷組隊隊長
                cm.sendOk("請你們團隊的隊長和我對話。");
                cm.dispose();
            } else if (cm.getPQLog(PQ1) >= maxenter1) {
                cm.sendOk("你今天挑戰次數已經用完了,請明天在來吧!");
                cm.dispose();
            } else if (!cm.allMembersHere()) {
                cm.sendOk("你的組隊部分成員不在當前地圖,請召集他們過來後在嘗試。"); //判斷組隊成員是否在一張地圖..
                cm.dispose();
            } else {
                var party = cm.getParty().getMembers();
                var mapId = cm.getMapId();
                var next = true;
                var levelValid = 0;
                var inMap = 0;

                var it = party.iterator();
                while (it.hasNext()) {
                    var cPlayer = it.next();
                    if (cPlayer.getLevel() >= minLevel1 && cPlayer.getLevel() <= maxLevel1) {
                        levelValid += 1;
                    } else {
                        //cm.sendOk("組隊成員 " + minPlayers + " 人以上 " + maxPlayers + "人 以下 所有成員等級 "+ minLevel +" 以上 "+ maxLevel +" 以下才可以入場。");
                        cm.dispose();
                        next = false;
                    }
                    if (cPlayer.getMapid() == mapId) {
                        inMap += 1;
                    }
                }
                if (party.size() > maxPlayers || inMap < minPlayers) {
                    next = false;
                }
                if (next) {
                    var em = cm.getEventManager(eventname1);
                    if (em == null || open == false) {
                        cm.sendSimple("配置文件不存在,請聯繫管理員。");
                    } else {
                        var prop = em.getProperty("state");
                        if (prop == null || prop.equals("0")) {
                cm.setPQLog(PQ1);
                            em.startInstance(cm.getParty(), cm.getMap(), moblevel);
                        } else {
                            cm.sendSimple("已經有隊伍在進行了,請換其他頻道嘗試。");
                        }
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("組隊成員 " + minPlayers + " 人以上 " + maxPlayers + "人 以下 所有成員等級 "+ minLevel1 +" 以上 "+ maxLevel1 +" 以下才可以入場。");
                }
            }
        }
    } else if (status == 2) {
        cm.dispose();
    } else if (mode == 0) {
        cm.dispose();
    }
    } else {
        if (status == 0) {
        cm.sendYesNo("你想要離開這裡了麼?");
        } else if (status == 1) {
        cm.dispose();
        cm.warp(cm.getMapId() - 10);
        }
    } 
}
