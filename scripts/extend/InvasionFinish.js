var status;
var pointsId = 167200;
var winPoint = 5;//任務全部通過獎勵的段位點。
var p;
/*
 * 戰鬥力5的渣渣：10點
 青銅Ⅴ：30點
 青銅Ⅳ
 青銅Ⅲ
 青銅Ⅱ
 黃金：80點
 白金：100點
 鑽石：120點
 超凡大師：180點
 最強王者：200點
 */

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
        p = new Points();
        var points = p.getEventPoints(pointsId, cm.getPlayer().getId());//目前積分
        var Ranking = RankingName(points);
        cm.sendNext("#b段位：#r" + Ranking + "（" + points + "） #b分。\r\n完成任務獲取點數 + #r" + winPoint + "#b。現在傳送出去。");
    } else if (status == 1) {
        p.setEventPoints(pointsId, cm.getPlayer().getId(), winPoint);
        var points = p.getEventPoints(pointsId, cm.getPlayer().getId());//目前積分
        var Ranking = RankingName(points);
        cm.warp(940020000, 0);

        cm.sendOk("- #e#d完成任務#n#k\r\n\r\n#b獲得了 #r" + winPoint + " #b段位點。\r\n目前情況：\r\n段位：#r" + Ranking + "（" + points + "） #b分。");
        cm.dispose();
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
