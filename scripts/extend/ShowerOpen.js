/*  創新型副本  
 *  組隊任務副本
 *  功能：玩家進行答題、保護MOB、跳跳、消滅BOSS
 *  作者：AND 3812049
 */
var status = 0;
//限制等級
var minLevel = 100; //最低等級
var maxLevel = 275;//最高等級


//限制人數
var minPlayers = 1;
var maxPlayers = 6;

//怪物最大等級設置
var moblevel = 220;

//副本開關 開啟、true 關閉、false
var open = true;

//組隊log記錄
var PQ = 'Shower楓幣';


//配置文件名稱
var eventname = "Shower";


//設置每日次數
var maxenter = 999;

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

    if (status == 0) {
        var em = cm.getEventManager(eventname);
        var prop = em.getProperty("state");
        if (prop == null || prop.equals("0")) {
            var vipstr = "#r副本空閒#k";
        } else {
            var vipstr = "#b已經開啟#k";
        }
                var pqtry = maxenter - cm.getPQLog(PQ);
                var rwpz = "";
                rwpz += "#e推薦等級：200 - 250";
                rwpz += "        推薦人數：1 - 1  \r\n#b已進行普通模式：" + cm.getPQLog(PQ) + " 次       剩餘挑戰次數：" + pqtry + " 次#k";
                rwpz += "\r\n普通模式狀態：" + vipstr + "        #n";
                var zyms = "";
                zyms = "#e<組隊 - 保護長老>#n\r\n#b#h0# \n\#k你現在想挑戰這個副本嗎?\r\n" + rwpz + "\r\n";
                zyms += "#L1##b是的,我們現在就去#l\r\n\r\n";
                cm.sendSimple(zyms);

    } else if (status == 1) {
        if (selection == 1) {
            if (cm.getParty() == null) { //判斷組隊
                cm.sendOk("你沒有創建組隊,無法入場。");
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
                            em.startInstance(cm.getParty(), cm.getMap(),198);
                        } else {
                            cm.sendSimple("已經有隊伍在進行了,請換其他頻道嘗試。");
                        }

                        cm.setPQLog(PQ);
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("組隊成員 " + minPlayers + " 人以上 " + maxPlayers + "人 以下 所有成員等級 " + minLevel + " 以上 " + maxLevel + " 以下才可以入場。");
                    cm.dispose();
                }
            }
        } else if (selection == 2) {
            cm.warp(211061001, 0);
            cm.dispose();
        }






    } else if (mode == 0) {
        cm.dispose();
    }
}
