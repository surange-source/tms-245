/*
 *兌換
 */

var status = 0; 
var cost = 1;
var selects = 0;
var zzz ="#fMap/MapHelper.img/weather/starPlanet2/8#";

function start() { 
    status = -1; 
    action(1, 0, 0); 
} 

function action(mode, type, selection) { 
    if (mode == -1) { 
        cm.dispose(); 
    } else if (mode == 0) { 
        cm.dispose(); 
    } else { 
        if (mode == 1) 
            status++; 
        else 
            status--; 
        if (status == 0) { 
        abb = 1;
        var P = new EvPoint();
        cm.sendGetNumber("\r\n#d想當門派老大麼？ 那麼如果您以每 #r"+cost+" #d元寶增加1點門派貢獻度。貢獻度達到第一的時候那麼您就可以出任門派老大了。\r\n\r\n#b\t\t\t"+zzz+"目前您的元寶：#r"+cm.getHyPay(1)+" #k#b\r\n\t\t\t"+zzz+"門派貢獻度為：#r" + P.getMenpaiMemberPoints() + "\r\n\r\n　",1,1,cm.getPlayer().getCSPoints(1));
        } else if (status == 1) { 
selects = selection;
    if(selection < 1){
        cm.playerMessage(1,"單次輸入的數字不能小於1。且不能大於10萬。");
        cm.dispose();
    } else if(selection > 100000){
        cm.playerMessage(1,"單次輸入的數字不能小於1。且不能大於10萬。");
        cm.dispose();
    } else {
        cm.sendYesNo("您確定購買貢獻度嗎？\r\n增加 #r" + selection + "#k 點貢獻度將會使用掉您 #r" + selection * cost + "#k 元寶\r\n"); 
        } 
        } else if (status == 2) { 
            var P = new EvPoint();
    if (cm.getHyPay(1) >= selects*cost) { 
           cm.addHyPay(selects * cost);
           P.AddMenpaiMemberPoints(selects);
           cm.worldSpouseMessage(0x05,"[門派貢獻度] ：恭喜玩家 "+ cm.getChar().getName() +" 使用用 "+ selects * cost +" 元寶增加了 "+ selects +" 門派個人貢獻度。");
           cm.sendOk("成功增加了 "+selects+" 貢獻度。");
           cm.dispose();
        } else {
           cm.sendOk("您沒有足夠的元寶,請獲取後使用.");
           cm.dispose();
     }
      } 
   }
}   

var EvPoint = function() {
    //用法：var P = new EvPoint();
    //P.函數名字(),如：P.AddMenpaiMemberPoints(增加的貢獻度)
    this.getMenpaiBoss = function(mpid) {//通過貢獻度排名第一個的情況來確定門派老大(24小時內必須有增加活躍度)。
        var conn = cm.getConnection();
        var pstmt = conn.prepareStatement("SELECT charname,DATE_FORMAT(date,'%m月%d日') as date FROM menpaiMember where mpid = " + mpid + " and DATE_SUB(CURDATE(), INTERVAL 1 DAY) <= date(date) ORDER BY points DESC LIMIT 1");
        var RankDataBase = pstmt.executeQuery();
        if (RankDataBase.next()) {
            return RankDataBase.getString("charname");
        }
    }
    this.getMenPaiMemberTotal = function(mpid) {
        var i = 0;
        var data = cm.getConnection().prepareStatement("SELECT id FROM menpaiMember where mpid = " + mpid + "").executeQuery(); // 查詢數據
        while (data.next()) {
            i++;
        }
        return i;
    }
    this.getMenpaiPoints = function(mpid) {//得到門派的總榮譽值
        var data = cm.getConnection().prepareStatement("SELECT points FROM menpaiSystem where mpid = " + mpid + "").executeQuery(); // 查詢數據
        if (data.next()) {
            return data.getInt("points");
        }
    }
    this.AddMenpaiMemberPoints = function(points) {//增加門派角色的貢獻度（可負號扣除）
        var data = cm.getConnection().prepareStatement("SELECT * FROM menpaiMember where charid = " + cm.getPlayer().getId() + "").executeQuery(); // 查詢數據
        if (!data.next()) {
            //cm.playerMessage("增加貢獻度失敗，請先加入一個門派。");
        }
        var update = cm.getConnection().prepareStatement("update menpaiMember set points = ?,date = ? where charid = " + cm.getPlayer().getId() + "");//更新為已使用
        update.setString(1, this.getMenpaiMemberPoints() + points);
        update.setString(2, null);//更新時間
        update.executeUpdate();
        update.close();
        this.checkIfBeingBoss();////檢查是否變成了門派老大！
    }
    this.checkIfBeingBoss = function() {//檢查是否變成了門派老大！
        if (this.getMenpaiBoss(this.getMenpaiId()) == cm.getPlayer().getName()) {
            cm.worldMessage(6, "恭喜" + cm.getPlayer().getName() + "成為了" + this.getMenpaiName() + "的門派老大！！");
        }
        return;
    }
    this.getMenpaiMemberPoints = function() {//得到門派角色的貢獻度
        var data = cm.getConnection().prepareStatement("SELECT points FROM menpaiMember where charid = " + cm.getPlayer().getId() + "").executeQuery(); // 查詢數據
        if (data.next()) {
            return data.getInt("points");
        }
    }
    this.AddMenpaiMember = function(mpid) {//在某個門派中增加一個成員
        var data = cm.getConnection().prepareStatement("SELECT * FROM menpaiMember where charid = " + cm.getPlayer().getId() + "").executeQuery(); // 查詢數據
        if (data.next()) {
            return false;
        }
        var insert = cm.getConnection().prepareStatement("INSERT INTO menpaiMember VALUES(?,?,?,?,?,?,?)"); // 載入數據
        insert.setString(1, null); //載入記錄ID
        insert.setString(2, mpid); //載入mpid
        insert.setString(3, cm.getPlayer().getId());//cid
        insert.setString(4, cm.getPlayer().getName());//cname
        insert.setString(5, 0);//points 點數
        insert.setString(6, 0);// 角色在門派中扮演的角色
        insert.setString(7, null);//角色門派加入時間
        insert.executeUpdate(); //更新
        insert.close();
        this.setEventPoints(eventid, cm.getPlayer().getId(), 1);
        return true;
    }
    this.getMenpaiName = function() {//得到角色門派的名字
        var i = 0;
        var data = cm.getConnection().prepareStatement("SELECT mpid FROM menpaiMember where charid = " + cm.getPlayer().getId() + "").executeQuery(); // 查詢數據
        while (data.next()) {
            i = data.getInt("mpid");//得到門派id
        }
        if (i == 1) {
            return "飛龍在天";
        } else if (i == 2) {
            return "虎嘯九天";
        } else {
            return i;
        }
    }
    this.getMenpaiId = function() {//得到角色門派的ID
        var i = 0;
        var data = cm.getConnection().prepareStatement("SELECT mpid FROM menpaiMember where charid = " + cm.getPlayer().getId() + "").executeQuery(); // 查詢數據
        while (data.next()) {
            i = data.getInt("mpid");//得到門派id
        }
        return i;
    }

    // ----- 分割線（下面是活動需要函數） ------
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
