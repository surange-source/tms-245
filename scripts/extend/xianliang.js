/*
 * 等級限量獎品
 * 2016年6月29日 09:53:27
 * id,level,itemid,qty,used,count - LevelReward
 * id,charname,itemid,date; -LevelRewardRecord
 */

var status;
var acc;
var aa = "#fEffect/CharacterEff/1051296/1/0#";
var level;
var Level = Array(220, 225, 230, 235, 240, 245, 250);
var time = new Date();
var Year = time.getFullYear();
var month = time.getMonth() + 1; //獲取當前月份(0-11,0代表1月)
var dates = time.getDate(); //獲取當前日(1-31)

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
        var text = "#b親，伺服器為您準備了沖級大禮包，等級達到220級後每5級可領取一份，但是數量有限，先到先拿，每個等級送的#e#r歡樂時刻寶箱#k#n#b都是不同的獎勵的。等級達到了240以後每5級可以獲得一個豐厚的獎品。因此隨著等級越高，數量越有限。#r\r\n#b"
        text += log();
        for (var i = 0; i < Level.length; i++) {
            text += "#L" + Level[i] + "#" + aa + " #d" + Level[i] + "級限量獎勵 （剩餘：#r" + new ac(Level[i]).getRemainCount() + " #d個）#k#l\r\n";
        }
        cm.sendSimple(text);
    } else if (status == 1) {
        acc = new ac(selection);
        if (!acc.Exist()) {
            cm.sendOk(selection + "級限量禮包，對不起，您查找的數據管理員暫未添加，請稍候再試。");
            cm.dispose();
            return;
        }

        if (acc.getRemainCount() == 0) {
            cm.sendOk("對不起，您領取的獎勵已經被搶光了。");
            cm.dispose();
            return;
        }
        level = selection;
        var text = "#e#d該等級獎勵的物品如下：#n#k\r\n\r\n";
        text += "#b#i" + acc.getItemId() + "# #t" + acc.getItemId() + "# x " + "#r" + acc.getQty() + " #b個。\r\n\r\n";
        text += "（當前已領取：#r" + acc.getUsed() + " #b個,剩餘: #r" + acc.getRemainCount() + " #b個）\r\n\r\n";
        text += "- #d#e管理提示：#n#r點擊下一步領取獎品。#k"
        cm.sendNext(text);
    } else if (status == 2) {
        if (getEventPoints(parseInt("16629" + level), cm.getPlayer().getId())) {
            cm.sendOk(getEventPoints(parseInt("16629" + level), cm.getPlayer().getId()) + "每個獎勵一個玩家只能領取一次。");
            cm.dispose();
            return;
        }
        if (cm.getPlayer().getLevel() < level) {
            cm.sendOk("您的等級不足夠領取獎勵，請重試。");
            cm.dispose();
            return;
        }
        if (cm.getSpace(2) < 1) {
            cm.sendOk("您的消耗欄不足一個空格，請檢查。");
            cm.dispose();
            return;
        }
        cm.gainItem(acc.getItemId(), acc.getQty());
        cm.sendOk("成功領取了 #r"+level+"#k 級的限量禮包。");
        UpdateLog(acc.getItemId());
        acc.updateUsed();//更新used
        setEventPoints(parseInt("16629" + level), cm.getPlayer().getId(), 1);
        //記錄部分
        cm.dispose();
    }
}
function log() {
    var log = cm.getConnection().prepareStatement("SELECT * FROM LevelRewardRecord ORDER BY id desc LIMIT 5").executeQuery();
    var text = ""
    var i = 1;
    /*text += "#d#e近期領取獎勵清單（最近5條）#k\r\n---------------------------------------------\r\n"
    while (log.next()) {
        text += "#fUI/UIToolTip.img/Item/Equip/Star/Star# #r" + log.getString("charname") + "#k 在 #b" + log.getString("date") + "#k 領取了 #v" + log.getString("itemid") + "#。"
        text += "\r\n"
        i++;
    }*/
    text += "-----------------------------------------------------\r\n";
    return text;
}
function UpdateLog(itemid) {
    try {
        var insert = cm.getConnection().prepareStatement("INSERT INTO LevelRewardRecord (id,charname,itemid,date) VALUES(?,?,?,?)"); // 載入數據
        insert.setString(1, null); //載入記錄ID
        insert.setString(2, cm.getPlayer().getName());
        insert.setString(3, itemid);
        insert.setString(4, Year + "-" + month + "-" + dates);//自動載入時間
        insert.executeUpdate(); //更新
        insert.close();
    } catch (e) {
        cm.sendOk(e);
        cm.dispose();
    }
}
function ac(selection) {
    var i = 0;
    this.Exist = function() {
        var count = cm.getConnection().prepareStatement("SELECT * FROM LevelReward where level = " + selection + "").executeQuery(); // 查詢數據
        if (count.next()) {
            return true;
        }
        return false;
    }
    this.getRemainCount = function() {
        var count = cm.getConnection().prepareStatement("SELECT * FROM LevelReward where level = " + selection + "").executeQuery(); // 查詢數據
        if (count.next()) {
            i = count.getInt("count") - count.getInt("used")
        }
        return parseInt(i);
    }
    this.getUsed = function() {
        var count = cm.getConnection().prepareStatement("SELECT * FROM LevelReward where level = " + selection + "").executeQuery(); // 查詢數據
        if (count.next()) {
            i = count.getInt("used");//得到used已經領取人數
        }
        return parseInt(i);
    }
    this.getItemId = function() {
        var count = cm.getConnection().prepareStatement("SELECT * FROM LevelReward where level = " + selection + "").executeQuery(); // 查詢數據
        if (count.next()) {
            i = count.getInt("itemid");
        }
        return parseInt(i);
    }

    this.getQty = function() {
        var count = cm.getConnection().prepareStatement("SELECT * FROM LevelReward where level = " + selection + "").executeQuery(); // 查詢數據
        if (count.next()) {
            i = count.getInt("qty");
        }
        return parseInt(i);
    }
    this.updateUsed = function() {
        var update = cm.getConnection().prepareStatement("update LevelReward set used = ? where level = " + selection + "");//更新used
        update.setInt(1, this.getUsed() + 1);
        update.executeUpdate();
        return;
    }
}



function DelEventPoints(Eventid, charid) {
    var delectData = cm.getConnection().prepareStatement("delete from EventTimes where eventid = " + Eventid + " and cid = " + charid + "");
    delectData.executeUpdate(); //刪除數據
}

function getEventTimes(Eventid, charid) {//通過eventid來得到參與這個活動的次數
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // 查詢數據
    while (Times.next()) {
        i = Times.getString("times");//得到次數
    }
    return parseInt(i);
}

function getEventPoints(Eventid, charid) {//通過eventid來得到參與這個活動的點數
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // 查詢數據
    while (Times.next()) {
        i = Times.getString("points");//得到點數
    }
    return parseInt(i);
}

function setEventPoints(Eventid, charid, points) {//通過eventid來給予參與這個活動的點數
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
        insert.setString(6, getEventTimes(1, charid));//times 次數
        insert.setString(7, null);//
        insert.executeUpdate(); //更新
    } else {//update
        var update = cm.getConnection().prepareStatement("update EventTimes set points = ? where eventid = " + Eventid + " and cid = " + charid + "");//更新為已使用
        update.setString(1, getEventPoints(Eventid, charid) + points);
        update.executeUpdate();
    }
}

function setEventTimes(Eventid, charid, times) {//通過eventid來設置參與這個活動的次數
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
        insert.setString(5, getEventPoints(2, charid));//points 點數
        insert.setString(6, times);//times 次數
        insert.setString(7, null);//
        insert.executeUpdate(); //更新
    } else {//update
        var update = cm.getConnection().prepareStatement("update EventTimes set times = ? where eventid = " + Eventid + " and cid = " + charid + "");//更新為已使用
        update.setString(1, getEventTimes(Eventid, charid) + times);
        update.executeUpdate();
    }
}
