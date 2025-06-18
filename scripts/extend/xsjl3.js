var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var status = -1;
var mySpoints = -1;
var typed = 0;
var I = null;

function start() {
    I = new Invitation();
    if (mySpoints < 0) mySpoints = I.getPoints();
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        var text = head + "歡迎你來到#b風之谷楓之谷#k，首先我要問你一個問題，你是從何得知#b愛慕楓之谷#k的呢？\r\n";
        text += "#b#L0#我是朋友介紹來的。#l\r\n";
        text += "#b#L1#我是自己找到的。#l\r\n";
        cm.sendSimple(text);
    } else if (status == 1) {
        typed = selection;
        
        if (selection == 0) {
            cm.sendGetText("請輸入你朋友的賬號：");
        } else if (selection == 1) {
            cm.dispose();
            cm.gainNX(2, 10000);
            cm.gainItem(1142073, 1);
            cm.setEventCount("推廣設置", 1,-2);
            cm.openNpc(1520034);
        }
    } else if (status == 2) {
        if (typed == 0) {
            var conn = cm.getConnection();
            var invitation = cm.getText();
            var myAccount = cm.getC().getAccountName();
            //推廣賬號不能為自己
            if (invitation == myAccount) {
                status = -1;
                cm.sendSimple("無法使用自己的賬號。");
                return;
            }
            var pstmt = conn.prepareStatement("select name from accounts where name = '"+invitation+"' ");
            var result = pstmt.executeQuery();
            if (result.next()){
                var a = true;
            }
            //var isExists = I.checkAccountVaild(invitation);
            if (/*isExists*/a) {
                //var isSuccess = I.setInvitation(invitation);
                var pstmt = conn.prepareStatement("select invitation from accounts where name = '"+invitation+"' ");
                var result = pstmt.executeQuery();
                if (result.next()) {
                    var sql = "UPDATE accounts SET invitation = '"+myAccount+"' WHERE name = '"+invitation+"'";
                    var pstmt = conn.prepareStatement(sql);
                         pstmt.executeUpdate();
                    cm.dispose();
                    cm.setEventCount("推廣設置", 1,-2);
                    cm.gainNX(2, 1000);
                    cm.gainItem(1142073, 1);
                    cm.openNpc(1520034);
                    return;
                //    status = -1;
                } else {
                    cm.setEventCount("推廣設置", 1,-2);
                    cm.sendSimple("您已經設置過邀請者的賬號，無法重複設置。");
                    status = -1
                }
            } else {
                cm.sendSimple("#r該賬號不存在，無法設置。#k");
                status = -1;
            }
        }
    }
}

var Invitation = function() {

    this.invitation = null;
    this.db = cm.getConnection();
    this.setInvitation = function(name) {
        var sql = "UPDATE accounts SET invitation = ? WHERE id = ? and (invitation is NULL or invitation = '')";
        var id = cm.getPlayer().getAccountID();
        var pstmt = this.db.prepareStatement(sql);
        pstmt.setString(1, name);
        pstmt.setInt(2, id);
        var isSuccess = (pstmt.executeUpdate() > 0) ? true: false;
        pstmt.close();
        return isSuccess;
    }

    //讀取我的邀請者
    this.getInvitation = function() {
        if (this.invitation != null) return this.invitation;
        var sql = "SELECT invitation FROM accounts WHERE name = ?";
        var pstmt = this.db.prepareStatement(sql);
        var name = cm.getC().getAccountName();
        pstmt.setString(1, name);
        var rs = pstmt.executeQuery();
        if (rs.next()) this.invitation = rs.getString("invitation");
        rs.close();
        pstmt.close();
        return this.invitation;
    }

    //檢測賬號合法性
    this.checkAccountVaild = function(name) {
        var sql = "SELECT count(id) as num FROM accounts WHERE name = ?";
        var pstmt = this.db.prepareStatement(sql);
        pstmt.setString(1, name);
        var count = 0;
        var rs = pstmt.executeQuery();
        if (rs.next()) count = rs.getInt("num");
        rs.close();
        pstmt.close();
        return (count > 0) ? true: false;
    }

    //讀取積分
    this.getPoints = function() {
        var sql = "SELECT spoints FROM accounts WHERE name = ?";
        var pstmt = this.db.prepareStatement(sql);
        var name = cm.getC().getAccountName();
        pstmt.setString(1, name);
        var count = 0;
        var rs = pstmt.executeQuery();
        if (rs.next()) count = rs.getInt("spoints");
        rs.close();
        pstmt.close();
        return count;
    }

    //積分給予
    this.gainPoints = function(quantity) {
        var sql = "UPDATE accounts SET spoints = spoints + ? WHERE id = ?";
        var id = cm.getPlayer().getAccountID();
        var pstmt = this.db.prepareStatement(sql);
        pstmt.setString(1, quantity);
        pstmt.setInt(2, id);
        var isSuccess = (pstmt.executeUpdate() > 0) ? true: false;
        pstmt.close();
        return isSuccess;
    }
}
