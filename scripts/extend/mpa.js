/*
 * 2016年7月11日 08:07:33
 * 門派系統（門派管理）
 */

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
var status;
var p;
var eff = "#fEffect/CharacterEff/1051296/1/0#";
var eventid = 16711;//活動ID
var menpaiboss = false;
var mpid;
var Reward = Array(
        Array(5062009, 10),
        //Array(5062010, 10),
        Array(4001714, 1)
        );//門派成員福利領取（一生只能領取一次）
var RewardEveryDay = Array(
        Array(5062009, 10),
        //Array(5062010, 10),
        Array(4001714, 1)
        );//門派成員福利領取（每日領取一次）

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
        p = new EvPoint();
        if (p.getMenpaiId() == 0) {
            cm.dispose();
            cm.openNpc(9900000, "mpa")
            return;
        }

        if (p.getMenpaiBoss(p.getMenpaiId()) == cm.getPlayer().getName()) {
            menpaiboss = true;
        }
        mpid = p.getMenpaiId();
        var text = "";
        text += "- #e#d門派管理：#n\r\n\r\n"
        text += "#b當前門派繁榮度：#e#r" + p.getMenpaiPoints(mpid) + "#n\t"
        text += "#b當前門派總人數：#e#r" + p.getMenPaiMemberTotal(mpid) + "#n\r\n";
        text += "#b當前我的貢獻度：#e#r" + p.getMenpaiMemberPoints() + "#n\t";
        if (menpaiboss) {
            text += "#b目前我的職位是：#r門派老大#k\r\n\r\n";
        } else {
            text += "#b目前我的職位是：#r門派成員#k\r\n\r\n";
        }
        text += "#L0#" + eff + " #r門派每日獎勵領取。\r\n";
        text += "#L7#"+eff+" #b門派貢獻度購買。\r\n";
        text += "#L5#" + eff + " #d門派任務接取。（完成可獲得活躍度！）\r\n";
        text += "#L1#" + eff + " #b購買門派勳章。\r\n";
        //text += "#L4#" + eff + " #r門派貢獻度商店。（貢獻度可購買裝備！）\r\n";
        text += "#L2#" + eff + " #d查看門派成員貢獻度排行。\r\n";
        text += "#L99#" + eff + " #b門派系統介紹（貢獻度獲取方式）\r\n";//
        cm.sendSimple(text)
    } else if (status == 1) {
        if (selection == 4) {
           cm.dispose();
           //cm.openNpc(9900000,"mpPvp");
        }
        else if (selection == 2) {
            cm.sendNext(RankingNew(mpid));
            status = -1;
        } else if (selection == 5) { //門派任務
            cm.sendOk("暫無。");
            cm.dispose();
            //cm.openNpc();
        } else if (selection == 7) { //門派貢獻度
            cm.dispose();
            cm.openNpc(9900000,"gxdgm");
        } else if (selection == 99) {
            cm.sendNext("#b門派活躍度來源於每日任務。每個任務完成後即可獲得1點活躍度。#b通過貢獻度排名第一個的情況來確定門派老大(當天必須有增加活躍度)。\r\n #k");
            status = -1;
        } else if (selection == 1) {
              var itemid = p.getMenpaiId() == 1 ? 1142745 : 1142746;
            cm.sendYesNo("您確定要使用20現金購買 #b#e#i" + itemid + "#   #z" + itemid + "##k#n嗎？")
        } else if (selection == 3) {
            if (p.getEventPoints(1671101, cm.getPlayer().getId()) >= 1) {
                cm.sendOk("獎勵一人只能領取一次！");
                status = -1;
            } else {
                var pass = true;
                var text = "";
                for (var i = 1; i < 4; i++) {
                    if (cm.getSpace(i) < Reward.length) {
                        pass = false;
                        break;
                    }
                }
                if (pass) {
                    for (var i = 0; i < Reward.length; i++) {
                        cm.gainItem(Reward[i][0], Reward[i][1]);
                        text += "#v" + Reward[i][0] + "##t" + Reward[i][0] + "# x" + Reward[i][1] + "\r\n"
                    }
                    p.setEventPoints(1671101, cm.getPlayer().getId(), 1);
                    cm.sendNext("成功領取了門派福利！\r\n" + text);
                    status = -1;
                } else {
                    cm.sendOk("對不起，您的背包欄不足。\r\n必須騰出" + Reward.length + "個格子。")
                    cm.dispose();
                }
            }
        } else if (selection == 0) {
            if (cm.getPQLog("門派每日領取") >= 1) {
                cm.sendOk("福利每天只能領取一次！");
                status = -1;
            } else {
                var pass = true;
                var text = "";
                for (var i = 1; i < 4; i++) {
                    if (cm.getSpace(i) < Reward.length) {
                        pass = false;
                        break;
                    }
                }
                if (pass) {
                    for (var i = 0; i < Reward.length; i++) {
                        cm.gainItem(Reward[i][0], Reward[i][1]);
                        text += "#v" + Reward[i][0] + "##t" + Reward[i][0] + "# x" + Reward[i][1] + "\r\n"
                    }
                    cm.setPQLog("門派每日領取")
                    cm.sendNext("成功領取了門派福利！\r\n" + text);
                    status = -1;
                } else {
                    cm.sendOk("對不起，您的背包欄不足。\r\n必須騰出" + Reward.length + "個格子。")
                    cm.dispose();
                }
            }
        }
    } else if (status == 2) {
        var itemid = p.getMenpaiId() == 1 ? 1142745 : 1142746;
        if (cm.getHyPay(1) < 20) {
            cm.sendOk("對不起，您必須有20的現金才能購買勳章。")
            cm.dispose();
            return;
        }
        if (cm.getSpace(1) < 1) {
            cm.sendOk("對不起，必須要有1個以上的背包欄空格才能繼續。");
            cm.dispose();
            return;
        }

        if (cm.haveItem(itemid, 1)) {
            cm.sendOk("對不起，勳章只能購買一次。");
            cm.dispose();
            return;
        }
        cm.gainItem(itemid, 1);
        cm.sendOk("使用20現金購買了:\r\n#i" + itemid + "#   #t" + itemid + "# 。");
        cm.addHyPay(20);
        cm.dispose();
        // 1142745 - 飛龍在天派門徒 - (無描述)
        // 1142746 - 虎嘯九天派門徒 - (無描述)
    }
}

function RankingNew(mpid) {
    var text = "\t#e名次\t\t玩家名稱\t\t\t\t\t\t貢獻度\r\n#n"
    var conn = cm.getConnection();
    var pstmt = conn.prepareStatement("SELECT * FROM menpaiMember where mpid = " + mpid + " ORDER BY points DESC LIMIT 5");
    var RankDataBase = pstmt.executeQuery();
    var i = 1;
    while (RankDataBase.next()) {
        if (i == 1) {
            text += "\t#r " + i + "\t\t" + FormatString(" ", 20, RankDataBase.getString("charname")) + "\t\t\t\t" + FormatString(" ", 5, RankDataBase.getString("points")) + "\r\n#k"
        } else
        if (i == 2) {
            text += "\t#g " + i + "\t\t" + FormatString(" ", 20, RankDataBase.getString("charname")) + "\t\t\t\t" + FormatString(" ", 5, RankDataBase.getString("points")) + "\r\n#k"
        } else
        if (i == 3) {
            text += "\t#b " + i + "\t\t" + FormatString(" ", 20, RankDataBase.getString("charname")) + "\t\t\t\t" + FormatString(" ", 5, RankDataBase.getString("points")) + "\r\n#k"
        } else {
            text += "\t " + i + "\t\t" + FormatString(" ", 20, RankDataBase.getString("charname")) + "\t\t\t\t" + FormatString(" ", 5, RankDataBase.getString("points")) + "\r\n#k"
        }
        i++;
    }
    RankDataBase.close();
    pstmt.close();
    return text;
}

function FormatString(c, length, content) {
    var str = "";
    var cs = "";
    if (content.length > length) {
        str = content;
    } else {
        for (var j = 0; j < length - content.getBytes("GB2312").length; j++) {
            cs = cs + c;
        }
    }
    str = content + cs;
    return str;
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
