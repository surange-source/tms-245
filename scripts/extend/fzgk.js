/*
 楓之高校
 */


var status = 0;
//限制等級
var minLevel = 120; //最低等級
var maxLevel = 275;//最高等級


//限制人數
var minPlayers = 1;
var maxPlayers = 1;

//怪物最大等級設置
var moblevel = 200;

//副本開關 開啟、true 關閉、false
var open = true;

//組隊log記錄
var PQ = '楓之高校';


//配置文件名稱
var eventname = "ZChaosPQ8";


//設置每日次數
var maxenter = 3;

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

        var bossLevel = "";

        if (cm.getPlayer().getClient().getChannel() == 1 || cm.getPlayer().getClient().getChannel() == 2) {
            bossLevel = " ";
        //} else if (cm.getPlayer().getClient().getChannel() == 3 || cm.getPlayer().getClient().getChannel() == 4){
        //    bossLevel = "困難模式";
        //    PQ="楓之高校困難"
        //    eventname = "ZChaosPQ9";
        } else {
            cm.sendOk("該副本只在1、2線進行。");
            cm.dispose();
            return ;
        }
            if (cm.getPlayer().getMapId() != 744000000) { //傳送
                cm.sendSimple("#e#v3991051##v3991051##v3991051##v3991051#<Boss - 楓之高校>#v3991050##v3991050##v3991050##v3991050##n\r\n你現在確定放棄任務,從這裡出去?\r\n#L2##b是的,現在就出去#l");


            } else {
                var pqtry = maxenter - cm.getPQLog;
                var rwpz = "";
                rwpz = "經驗指數：#r★★★★★#k\r\n";
                rwpz += "#e推薦等級：150 - 250";
                rwpz += "        推薦人數：1 - 3  \r\n#b已進行"+bossLevel+"：" + cm.getPQLog(PQ) + " 次       剩餘挑戰次數：" + pqtry + " 次#k";
                rwpz += "\r\n"+bossLevel+"狀態：" + vipstr + "        #n";
            //    rwpz += "\r\n1、2線為普通模式，3、4線為困難模式。";
                var zyms = "";
                zyms = "   #fUI/UIWindow2.img/StagedGachapon/Creature/0/normal/2#   #fUI/UIWindow2.img/Megaphone/0##fUI/UIWindow2.img/Megaphone/0##r <Boss - 楓之高校> #fUI/UIWindow2.img/Megaphone/0##fUI/UIWindow2.img/Megaphone/0#   #fUI/UIWindow2.img/StagedGachapon/Creature/0/normal/2##n\r\n#b#h0# \n\#k你現在想挑戰這個BOSS副本嗎?\r\n" + rwpz + "\r\n";
                zyms += "   #L1##b>>>>>>>>>>>>>是的,我們現在就去<<<<<<<<<<<<<<#l\r\n\r\n";
                cm.sendSimple(zyms);
            }

    } else if (status == 1) {
        if (selection == 1) {
            if (cm.getParty() == null) { //判斷組隊
                cm.sendOk("你沒有創建組隊,無法入場。");
                cm.dispose();
             /*} else if(cm.haveItem(4001834) < 1){
                cm.sendOk("你沒有#v4001834##z4001834#無法進入副本。");
                cm.dispose();*/
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
                        //cm.dispose();
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
                            em.startInstance(cm.getParty(), cm.getMap(), 255);
                        } else {
                            cm.sendSimple("已經有隊伍在進行了,請換其他頻道嘗試。");
                        }

                        cm.setPQLog;
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("組隊成員 " + minPlayers + " 人以上 " + maxPlayers + "人 以下 所有成員等級 " + minLevel + " 以上 " + maxLevel + " 以下才可以入場。");
                    cm.dispose();
                }
            }
        } else if (selection == 2) {
            cm.warp(744000000, 0);
            cm.dispose();
        }






    } else if (mode == 0) {
        cm.dispose();
    }
}