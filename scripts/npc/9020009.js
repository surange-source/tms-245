/*
 * 新版次元入侵InvasionEvent
 * 2016年7月2日 09:28:08
 * TODO:
 * 副本次元手套兌換
 * 副本段位獎勵兌換
 */
var ee = "#fEffect/CharacterEff/1051296/1/0#";
var pointsId = 167200;
var status;
var minLevel = 150; //最低等級
var maxLevel = 275;//最高等級
var channel = 1; //設置可以執行的頻道
//限制人數
var minPlayers = 1;
var maxPlayers = 6;
//怪物最大等級設置
var moblevel = 255;
//副本開關 開啟、true 關閉、false
var open = true;
//組隊log記錄
var PQ = '次元入侵';
//開始地圖
var startmap = 940020000;
//配置文件名稱
var eventname = "InvasionEvent";
var em, vipstr;

//設置每日次數
var maxenter = 10;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0) {
        cm.dispose();
        return;
    } else if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {

        if (open) {
            vipstr = "#r開放中#b";
        } else {
            vipstr = "#r未開啟#b";
        }
        var p = new Points();
        var points = p.getEventPoints(pointsId, cm.getPlayer().getId());//目前積分
        var Ranking = RankingName(points);
        var text = "#d從楓之谷世界入侵格蘭蒂斯，次元入侵的罪魁禍首是誰呢？#k\r\n\r\n#b- #e當前段位：#n#r[" + Ranking + "] (" + points + ") #e#b分。#n\r\n#b"
        text += "#L0#" + ee + " 進入次元入侵（狀態：#e" + vipstr + "#n）。#l\r\n";
        text += "#L1#" + ee + " #d利用碎片兌換次元手套。#l\r\n"
        text += "#L5#" + ee + " #r各段位獎勵預覽。#l\r\n"
        text += "#L3#" + ee + " #d領取段位首次獎勵。#l\r\n"
        text += "#L2#" + ee + " 聽取有關次元入侵的說明。#l\r\n"
        text += "#L4#" + ee + " #r全服玩家段位排位榜。#l\r\n"

        cm.sendSimple(text);
    } else if (status == 1) {
        if (selection == 0) {
            em = cm.getEventManager(eventname);
            if (em == null) {
                cm.sendOk("配置文件不存在,請聯繫管理員。");
                cm.dispose();
                return;
            }
            if (cm.getPlayer().getMapId() != startmap) { //傳送
                cm.sendSimple("#e<副本 - " + PQ + ">#n\r\n你現在確定放棄任務,從這裡出去?\r\n#L2##b是的,現在就出去#l");
            } else {
                var pqtry = maxenter - cm.getPQLog(PQ);
                var rwpz = "";
                rwpz += "#e推薦等級：" + minLevel + " - " + maxLevel + "";
                rwpz += "        推薦人數：" + minPlayers + " - " + maxPlayers + "  \r\n#b已進行普通模式：" + cm.getPQLog(PQ) + " 次       剩餘挑戰次數：" + pqtry + " 次#k";
                rwpz += "\r\n普通模式狀態：" + vipstr + "        #n";
                var zyms = "";
                zyms = "#e<副本 - " + PQ + ">#n\r\n#b#h0# \n\#k你想挑戰次元入侵副本嗎？\r\n" + rwpz + "\r\n";
                zyms += "#L1##b是的,我們現在就去！#l\r\n\r\n";
                cm.sendSimple(zyms);
            }
        } else if (selection == 1) {//利用次元碎片換手套
            cm.dispose();
            cm.openNpc(9020009, "shoutaoduihuan");
        } else if (selection == 4) {//全服排名
            Ranking1();
            cm.dispose();
            //cm.openNpc(0);
        } else if (selection == 5) {//排位獎勵瀏覽  Ⅴ  Ⅳ   Ⅲ   Ⅱ  Ⅰ  
            cm.sendOk("- #e#d排位獎勵如下：#n#k\r\n\r\n#g【最強王者榮耀】 #b可領取 #r#t1142742# #bx 1\r\n#g【超凡大師】 #b可領取 #r#t2431412# #bx 1\r\n#r【鑽石Ⅰ】 #b可領取 #r#t1032219# #bx 1\r\n#r【鑽石Ⅱ】 #b可領取 #r150級防具箱 #bx 1\r\n#r【鑽石Ⅲ】 #b可領取 #r150級防具箱 #bx 1\r\n#r【鑽石Ⅳ】 #b可領取 #r150級防具箱 #bx 1\r\n#r【鑽石Ⅴ】 #b可領取 #r頂級卷軸隨機箱 #bx 10\r\n#r【白金Ⅰ】 #b可領取 #r#t5062024# #bx 100\r\n#r【白金Ⅱ】 #b可領取 #r#t5062500# #bx 100\r\n#r【白金Ⅲ】 #b可領取 #r#t5062010# #bx 100\r\n#r【白金Ⅳ】 #b可領取 #r#t5062009# #bx 100\r\n#r【白金Ⅴ】 #b可領取 #r#t2430682# #bx 5\r\n#r【黃金Ⅰ】 #b可領取 #r#t5062024# #bx 50\r\n#r【黃金Ⅱ】 #b可領取 #r#t5062500# #bx 50\r\n#r【黃金Ⅲ】 #b可領取 #r#t5062010# #bx 50\r\n#r【黃金Ⅳ】 #b可領取 #r#t5062009# #bx 50\r\n#r【黃金Ⅴ】 #b可領取 #r#t2049124# #bx 10\r\n#r【白銀Ⅰ】 #b可領取 #r#t5062024# #bx 30\r\n#r【白銀Ⅱ】 #b可領取 #r#t5062500# #bx 30\r\n#r【白銀Ⅲ】 #b可領取 #r#t5062010# #bx 30\r\n#r【白銀Ⅳ】 #b可領取 #r#t5062009# #bx 30\r\n#r【白銀Ⅴ】 #b可領取 #r#t2049124# #bx 5\r\n#r【青銅Ⅰ】 #b可領取 #r#t5062024# #bx 20\r\n#r【青銅Ⅱ】 #b可領取 #r#t5062500# #bx 10\r\n#r【青銅Ⅲ】 #b可領取 #r#t5062010# #bx 10\r\n#r【青銅Ⅳ】 #b可領取 #r#t5062009# #bx 10\r\n#r【青銅Ⅴ】 #b可領取 #r#t5062002# #bx 10\r\n");
            cm.dispose();
        } else if (selection == 2) {
            cm.sendOk("- #e#d副本介紹#n#k\r\n#b副本開啟後勝利獲得5點積分，遊戲死亡則通關失敗，失敗則扣分掉段位並退出副本。副本通關後會隨機贈送#r次元手套A、B、C、D碎片#b，碎片可以兌換次元手套等高級獎勵。副本可以1-6人組隊進入。副本每日3次。並且段位按照全服排名制全服列出。\r\n- #e#d段位介紹#n#k\r\n#r目前分別為：戰力5渣渣(0-10)、青銅(11-120)、白銀(121-220)、黃金(221-400)、白金(401-650)、鑽石(651-1100)、超凡大師(1101-1500)、最強王者榮耀(1500以上)。各分段可以領取不同的獎勵。最強王者榮耀可以獲得#b#t1142742##r一個。");
            cm.dispose();
        } else {
            var p = new Points();
            var points = p.getEventPoints(pointsId, cm.getPlayer().getId());//目前積分
            var Ranking = RankingReward(points)[1];//得到獎勵id
            var MissonId = pointsId + RankingReward(points)[0];//得到任務id
            var qty = RankingReward(points)[2];//得到數量
            switch (Ranking) {
                case 0:
                    cm.sendOk("對不起，目前沒有該段位可以領取。");
                    cm.dispose();
                    break;
                default:
                    if (p.getEventPoints(MissonId, cm.getPlayer().getId()) >= 1) {
                        cm.sendOk("每人每個段位只能領取一次、");
                        cm.dispose();
                        return;
                    }
                    p.setEventPoints(MissonId, cm.getPlayer().getId(), 1);
                    cm.gainItem(Ranking, qty);
                    cm.sendOk("恭喜你獲得了該段位的獎勵。\r\n#i" + Ranking + "# #t" + Ranking + "# x " + qty + "");
                    cm.dispose();
                    return;
                    break;
            }

        }
    } else if (status == 2) {
        if (!cm.getPlayer().getClient().getChannel() == channel) {
            cm.sendOk("當前副本只能在" + channel + "頻道進行。");
            cm.dispose();
            return;
        }
        if (cm.getParty() == null) { //判斷組隊
            cm.sendOk("你沒有創建組隊,無法入場。");
            cm.dispose();
        } else if (!cm.isLeader()) { // 判斷組隊隊長
            cm.sendOk("請你們團隊的隊長和我對話。");
            cm.dispose();
        } else {
            var party = cm.getParty().getMembers();
            var mapId = cm.getPlayer().getMapId();
            var next = true;
            var levelValid = 0;
            var inMap = 0;
            var it = party.iterator();
            var idx = Array();
            while (it.hasNext()) {
                var cPlayer = it.next();
                if ((cPlayer.getLevel() >= minLevel) && (cPlayer.getLevel() <= maxLevel)) {
                    levelValid += 1;
                } else {
                    next = false;
                }
                if (cPlayer.getMapid() == mapId) {
                    inMap += 1;
                }
                idx.push(cPlayer.getId());
            }
            if (getPartyBossLog(idx) >= maxenter) {
                cm.sendOk("隊伍中有玩家已經參與過該副本" + maxenter + "次，無法再進入，請踢出該玩家。");
                cm.dispose();
                return;
            }
            if (next) {
                var em = cm.getEventManager(eventname);
                if (em == null || open == false) {
                    cm.sendSimple("配置文件不存在,請聯繫管理員。");
                } else {
                    var prop = em.getProperty("state");
                    if (prop == null || prop.equals("0")) {
                        cm.setPQLog(PQ);
                        em.startInstance(cm.getParty(), cm.getMap(), "+ moblevel +");
                    } else {
                        cm.sendSimple("已經有隊伍在進行了,請換其他頻道嘗試。");
                    }
                    cm.dispose();
                }
            } else {
                cm.sendOk("組隊成員 " + minPlayers + " 人以上 " + maxPlayers + "人 以下 所有成員等級 " + minLevel + " 以上 " + maxLevel + " 以下才可以入場。");
                cm.dispose();
            }
        }
    }
}

function RankingName(points) {
    if (points >= 0 && points <= 10) {
        return "戰鬥力5的渣渣";
    }
    if (points >= 11 && points <= 30) {
        return "青銅Ⅴ";
    }
    if (points >= 31 && points <= 50) {
        return "青銅Ⅳ";
    }
    if (points >= 51 && points <= 80) {
        return "青銅Ⅲ";
    }
    if (points >= 81 && points <= 100) {
        return "青銅Ⅱ";
    }
    if (points >= 101 && points <= 120) {
        return "青銅Ⅰ";
    }
    if (points >= 121 && points <= 140) {
        return "白銀Ⅴ";
    }
    if (points >= 141 && points <= 160) {
        return "白銀Ⅳ";
    }
    if (points >= 161 && points <= 180) {
        return "白銀Ⅲ";
    }
    if (points >= 181 && points <= 200) {
        return "白銀Ⅱ";
    }
    if (points >= 201 && points <= 220) {
        return "白銀Ⅰ";
    }
    if (points >= 231 && points <= 260) {
        return "黃金Ⅴ";
    }
    if (points >= 261 && points <= 290) {
        return "黃金Ⅳ";
    }
    if (points >= 291 && points <= 320) {
        return "黃金Ⅲ";
    }
    if (points >= 321 && points <= 350) {
        return "黃金Ⅱ";
    }
    if (points >= 351 && points <= 400) {
        return "黃金Ⅰ";
    }
    if (points >= 401 && points <= 450) {
        return "白金Ⅴ";
    }
    if (points >= 451 && points <= 500) {
        return "白金Ⅳ";
    }
    if (points >= 501 && points <= 550) {
        return "白金Ⅲ";
    }
    if (points >= 551 && points <= 600) {
        return "白金Ⅱ";
    }
    if (points >= 601 && points <= 650) {
        return "白金Ⅰ";
    }
    if (points >= 651 && points <= 700) {
        return "鑽石Ⅴ";
    }
    if (points >= 701 && points <= 800) {
        return "鑽石Ⅳ";
    }
    if (points >= 801 && points <= 900) {
        return "鑽石Ⅲ";
    }
    if (points >= 901 && points <= 1000) {
        return "鑽石Ⅱ";
    }
    if (points >= 1001 && points <= 1100) {
        return "鑽石Ⅰ";
    }
    if (points >= 1101 && points <= 1499) {
        return "超凡大師";
    }
    if (points >= 1500) {
        return "最強王者榮耀";
    }
}

function RankingReward(points) {
    if (points >= 0 && points <= 10) {
        return Array(0, 0, 0);
    }
    if (points >= 11 && points <= 30) {
        return Array(1, 5062002, 10);
    }
    if (points >= 31 && points <= 50) {
        return Array(2, 5062009, 10);
    }
    if (points >= 51 && points <= 80) {
        return Array(3, 5062010, 10);
    }
    if (points >= 81 && points <= 100) {
        return Array(4, 5062500, 10);
    }
    if (points >= 101 && points <= 120) {
        return Array(5, 5062024, 20);
    }
    if (points >= 121 && points <= 140) {
        return Array(6, 2049124, 5);
    }
    if (points >= 141 && points <= 160) {
        return Array(7, 5062009, 30);
    }
    if (points >= 161 && points <= 180) {
        return Array(8, 5062010, 30);
    }
    if (points >= 181 && points <= 200) {
        return Array(9, 5062500, 30);
    }
    if (points >= 201 && points <= 220) {
        return Array(10, 5062024, 30);
    }
    if (points >= 231 && points <= 260) {
        return Array(11, 2049124, 10);
    }
    if (points >= 261 && points <= 290) {
        return Array(12, 5062009, 50);
    }
    if (points >= 291 && points <= 320) {
        return Array(13, 5062010, 50);
    }
    if (points >= 321 && points <= 350) {
        return Array(14, 5062500, 50);
    }
    if (points >= 351 && points <= 400) {
        return Array(15, 5062024, 50);
    }
    if (points >= 401 && points <= 450) {
        return Array(16, 2430682, 5);
    }
    if (points >= 451 && points <= 500) {
        return Array(17, 5062009, 100);
    }
    if (points >= 501 && points <= 550) {
        return Array(18, 5062010, 100);
    }
    if (points >= 551 && points <= 600) {
        return Array(19, 5062500, 100);
    }
    if (points >= 601 && points <= 650) {
        return Array(20, 5062024, 100);
    }
    if (points >= 651 && points <= 700) {
        return Array(21, 4000000, 100);//找不到
    }
    if (points >= 701 && points <= 800) {
        return Array(22, 4000000, 100);//找不到
    }
    if (points >= 801 && points <= 900) {
        return Array(23, 4000000, 100);//找不到
    }
    if (points >= 901 && points <= 1000) {
        return Array(24, 4000000, 100);//找不到
    }
    if (points >= 1001 && points <= 1100) {
        return Array(25, 1032219, 1);
    }
    if (points >= 1101 && points <= 1499) {
        return Array(26, 2431412, 1);
    }
    if (points >= 1500) {
        return Array(27, 1142742, 1);
    }
}



var Points = function() {
    this.DelEventPoints = function(Eventid, charid) {
        var delectData = cm.getConnection().prepareStatement("delete from EventTimes where eventid = " + Eventid + " and cid = " + charid + "");
        delectData.executeUpdate(); //刪除數據
    }

    this.DelEventPoints = function(Eventid, charid) {
        var delectData = cm.getConnection().prepareStatement("delete from EventTimes where eventid = " + Eventid + " and cid = " + charid + "");
        delectData.executeUpdate(); //刪除數據
    }

    this.getEventTimes = function(Eventid, charid) {//通過eventid來得到參與這個活動的次數
        var i = 0;
        var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // 查詢數據
        while (Times.next()) {
            i = Times.getString("times");//得到次數
        }
        return parseInt(i);
    }

    this.getEventPoints = function(Eventid, charid) {//通過eventid來得到參與這個活動的點數
        var i = 0;
        var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // 查詢數據
        while (Times.next()) {
            i = Times.getString("points");//得到點數
        }
        return parseInt(i);
    }

    this.setEventPoints = function(Eventid, charid, points) {//通過eventid來給予參與這個活動的點數
        var i = 0;
        var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // 查詢數據
        while (Times.next()) {
            i++;
        }
        if (i == 0) {//insert
            var insert = cm.getConnection().prepareStatement("INSERT INTO EventTimes VALUES(?,?,?,?,?,?,?)"); // 載入數據
            insert.setString(1, null); //載入記錄ID
            insert.setString(2, Eventid); //載入活動ID
            insert.setString(3, cm.getPlayer().getId());//cid
            insert.setString(4, cm.getPlayer().getName());//cname
            insert.setString(5, points);//points 點數
            insert.setString(6, this.getEventTimes(1, charid));//times 次數
            insert.setString(7, null);//
            insert.executeUpdate(); //更新
        } else {//update
            var update = cm.getConnection().prepareStatement("update EventTimes set points = ? where eventid = " + Eventid + " and cid = " + charid + "");//更新為已使用
            update.setString(1, this.getEventPoints(Eventid, charid) + points);
            update.executeUpdate();
        }
    }

    this.setEventTimes = function(Eventid, charid, times) {//通過eventid來設置參與這個活動的次數
        var i = 0;
        var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // 查詢數據
        while (Times.next()) {
            i++;
        }
        if (i == 0) {//insert
            var insert = cm.getConnection().prepareStatement("INSERT INTO EventTimes VALUES(?,?,?,?,?,?,?)"); // 載入數據
            insert.setString(1, null); //載入記錄ID
            insert.setString(2, Eventid); //載入活動ID
            insert.setString(3, cm.getPlayer().getId());//cid
            insert.setString(4, cm.getPlayer().getName());//cname
            insert.setString(5, this.getEventPoints(2, charid));//points 點數
            insert.setString(6, times);//times 次數
            insert.setString(7, null);//
            insert.executeUpdate(); //更新
        } else {//update
            var update = cm.getConnection().prepareStatement("update EventTimes set times = ? where eventid = " + Eventid + " and cid = " + charid + "");//更新為已使用
            update.setString(1, this.getEventTimes(Eventid, charid) + times);
            update.executeUpdate();
        }
    }
}


function state(pro) {
    switch (pro) {
        case "2":
        case "5":
        case "8":
        case "11":
            return 0;
            break;
        case "3":
        case "6":
        case "9":
        case "12":
            return 0;
            break;
        case "4":
            return 1;//證明過了一個關卡了
        case "7":
            return 2;//證明過了一個關卡了
        case "10":
            return 3;//證明過了一個關卡了
            break;
        case "13"://任務完成部分
            return 999;
            break;
    }
}

function Ranking1() {
    var Text = "排名如下：(1~10名次)\r\n\r\n#d"
    var RankDataBase = cm.getConnection().prepareStatement("SELECT * FROM eventtimes where eventid = " + pointsId + " ORDER BY points DESC LIMIT 10").executeQuery();
    var i = 1;
    while (RankDataBase.next()) {
        Text += "#fUI/UIToolTip.img/Item/Equip/Star/Star# 名次:" + i + "\r\n角色名:" + RankDataBase.getString("cName") + "\r\n段位:" + RankingName(RankDataBase.getInt("points")) + "\r\n"
        Text += "~~~~~~~~~~~~~~~~~~~\r\n"
        i++;
    }
    cm.sendOk(Text);
}

function getPartyBossLog(idx) {
    var idStr = "";
    for (var key in idx) {
        if (key == 0)
            idStr += idx[key];
        else
            idStr += "," + idx[key];
    }
    var sql = "SELECT max(count) as maxcount FROM pqlog where pqname = '次元入侵' and characterid in (" + idStr + ") and to_days(time) = to_days(now());";
    //java.lang.System.out.println(sql);
    var conn = cm.getConnection();
    var pstmt = conn.prepareStatement(sql);
    bosslogSql = pstmt.executeQuery();
    if (bosslogSql.next()) {
        return bosslogSql.getString("maxcount") * 1;
    }
    bosslogSql.close();
    pstmt.close();
    //conn.close();
    return 0;
}