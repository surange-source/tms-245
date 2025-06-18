/*  
 *  貢獻度購買
 *  QQ12796161 
 */


var status = 0;
var eff = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var z = "#fMap/MapHelper.img/weather/starPlanet2/7#";//"+z+"//美化
var zz = "#fEffect/CharacterEff/1082565/2/0#";//
var kkk = "#fMap/MapHelper.img/weather/thankyou/7#";
var eff1 = "#fEffect/CharacterEff/1112905/0/1#";//小紅心
var icon = "#fUI/Basic.img/BtMin2/normal/0#";
var iconEvent = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var ttt = "#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 = "#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 = "#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圓
var ttt4 = "#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 = "#fUI/UIWindow/Quest/icon0#";////美化!
var ttt6 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";//"+ttt6+"//美化會員
var z1 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";//"+z+"//美化
var tt = "#fEffect/ItemEff/1112811/0/0#";//音符
var feng = "#v4032733#"

function start() {
    status = -1;
    action(1, 0, 0);
}


function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (cm.getMapId() == 180000001) {
            cm.sendOk("很遺憾，您因為違反用戶守則被禁止遊戲活動，如有異議請聯繫管理員.")
            cm.dispose();
        }
    else if (status == 0) { //
        var selStr = "#r[提示]：#e#d請選擇您需要購買的選項#k\r\n\r\n"+z+""+z+""+z+""+z+""+z+""+z+""+z+""+z+""+z+""+z+""+z+""+z+""+z+""+z+""+z+"\r\n";
        selStr += "#b#L0#"+kkk+" 楓幣購買貢獻度。(1億楓幣購買1點)#l#k";
        selStr += "\r\n#d#L1#"+kkk+" 樂豆點購買貢獻度。(1萬樂豆點購買1點)#l#k";
        selStr += "\r\n#r#L2#"+kkk+" 餘額購買貢獻度。(1餘額購買1點)#l#k\r\n";
        selStr += "\r\n"+z+""+z+""+z+""+z+""+z+""+z+""+z+""+z+""+z+""+z+""+z+""+z+""+z+""+z+""+z+"\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0: // 楓幣
            cm.dispose();
            cm.openNpc(9310362, "jbgx");
            break;
        case 1: // 樂豆點
            cm.dispose();
            cm.openNpc(9310362, "gmgx");
            break;
        case 2: // 元寶
            cm.dispose();
            cm.openNpc(9310362, "ybgx");
            break;
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