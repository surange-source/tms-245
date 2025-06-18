/*
 * 2016年7月11日 06:54:04
 * 門派模式（選擇門派）
 */
var status;
var p;
var eventid = 16711;//活動ID
var eff = "#fEffect/CharacterEff/1051296/1/0#";

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
    p = new EvPoint();
    if (p.getEventPoints(eventid, cm.getPlayer().getId()) >= 1) {
        cm.dispose();
        cm.openNpc(2091133,"menpai");
        return;
     }
    else if (status == 0) {
        var text = "- #e#d門派系統：#n\r\n\r\n"
        text += "申請加入門派後即不可更換，請選擇好門派後申請，門派每日成員福利，老大福利，各派老大每日可在門派基地申請一次召喚一隻獎勵BOSS，打死可獲得大量福利，另外門派成員可獲得強大屬性的霸氣勳章，門派的福利在於門派貢獻度。以及門派成員活躍。您準備好了加入嗎？\r\n#r(PS：加入門派後則打開管理門派界面。可查看門派成員活躍度信息、領取福利、進入基地等界面。)\r\n\r\n"
        text += "#L1##b"+eff+" #t1142745##l\t";//#L xx # 這裏面的數字不能改哦
        text += "#L2##b"+eff+" #t1142746##l\r\n ";
        cm.sendSimple(text)
    } else if (status == 1) {
        p = new EvPoint();
        if (p.getEventPoints(eventid, cm.getPlayer().getId()) >= 1) {
            cm.sendOk("你好像已經加入了門派了哦！！\r\n你的門派是:" + p.getMenpaiName() + "!\r\n請繼續為你的門派加油喔！！！");
            cm.dispose();
            return;
        }
        if (p.AddMenpaiMember(selection)) {
            cm.sendOk("#b申請加入成功！\r\n你加入的門派是：#r" + p.getMenpaiName() + "#b!\r\n每天可以通過個人貢獻度來提高門派繁榮度哦。\r\n");
            cm.dispose();
        } else {
            cm.sendOk("你好像已經加入了門派了哦！！\r\n你加入的門派是:" + p.getMenpaiName() + "!\r\n請繼續為你的門派做貢獻喔！！！");
            cm.dispose();
        }
    }
}

/*
 - menpaiMember
 id,mpid,charid,charName,points,type,date
 id - index
 mpid - 外鍵mpid
 mpid = 1  飛龍在天
 mpid = 2  虎嘯九天
 charid - 角色id
 charname - 角色名字
 points - 角色貢獻度
 type - 角色在門派中扮演的角色
 type = 0 普通成員
 type = 1 門派老大
 date - 角色門派加入時間
 */
var EvPoint = function() {
    //用法：var P = new EvPoint();
    //P.函數名字(),如：P.AddMenpaiMemberPoints(增加的貢獻度)
    this.AddMenpaiMemberPoints = function(points) {//增加門派角色的貢獻度（可負號扣除）
        var data = cm.getConnection().prepareStatement("SELECT * FROM menpaiMember where charid = " + cm.getPlayer().getId() + "").executeQuery(); // 查詢數據
        if (!data.next()) {
           cm.playerMessage("增加貢獻度失敗，請先加入一個門派。"); 
        }
        var update = cm.getConnection().prepareStatement("update menpaiMember set points = ? where charid = " + cm.getPlayer().getId() + "");//更新為已使用
        update.setString(1, this.getMenpaiMemberPoints() + points);
        update.executeUpdate();
        update.close();
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
