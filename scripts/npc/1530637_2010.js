/*
    製作：WSY工作室
    功能：提交建議
    時間：2016年12月28日
*/

var status = 0;
var pagesize = 5; // 一頁顯示5個
var title, text;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
            return
        }
        status--;
    }
    if (status == 0) {
        var text = "現在這裡可以提交你的意見給管理員喔！\r\n#b";
        text += "#L0# 我要提交意見。\r\n"
        if (cm.getPlayer().isAdmin()) {
            text += "#L1# 查看意見列表。\r\n"
        }
        cm.sendSimple(text);
    } else if (status == 1) {
        if (selection == 0) {
            cm.sendGetText("請輸入您意見的標題（標題盡量間斷，言簡意賅)：");
        } else if (selection == 1) {
            var text = "當前意見如下：\r\n#b"
            var count = 0; // 數據量大小
            var conn = cm.getConnection();
            var ps = conn.prepareStatement("select * from suggest");
            var resultSet = ps.executeQuery();
            while (resultSet.next()) {
                text += "#L" + resultSet.getString("id") + "# " + resultSet.getString("title") + "\r\n";
                count++;
            }
            resultSet.close();
            ps.close();
            conn.close();
            if (count == 0) {
                cm.sendOk("目前還沒有人提意見。");
                cm.dispose();
            } else {
                status = 3;
                cm.sendSimple(text);
            }
            
        }
    } else if (status == 2) {
        java.lang.System.out.println("11111");
        title = cm.getText();
        if (title.isEmpty()) {
            status = -1;
            cm.sendNext("輸入的標題不可以為空哦！請重新輸入！");
            java.lang.System.out.println("2222");
        } else {
            cm.sendGetText("請輸入您的意見，可以詳細輸入您的意見喔~\r\n（管理員都會認真看的喔！！)：");
            java.lang.System.out.println("3333");
        }
    } else if (status == 3) {
        java.lang.System.out.println("4444");
        text = cm.getText();
        if (text.isEmpty()) {
            status = -1;
            cm.sendNext("輸入的內容不可以為空哦！請重新輸入！")
        } else {
            java.lang.System.out.println("5555");
            addSuggestion(title, text);
            cm.sendOk("您已經給管理員提交了您的意見，謝謝您對" + cm.getServerName() + "的支持");
            cm.dispose();
        }
    } else if (status == 4) {
        var text = "";
        var count = 0; // 數據量大小
        var conn = cm.getConnection();
        var ps = conn.prepareStatement("select * from suggest where id = " + selection)
        var resultSet = ps.executeQuery();
        while (resultSet.next()) {
            text += "標題：" + resultSet.getString("title") + "\r\n"
            text += "玩家：" + resultSet.getString("charid") + "\r\n"
            text += "時間：" + resultSet.getString("date") + "\r\n======================================\r\n內容：\r\n" + resultSet.getString("text");
            count++;
        }
        status = -1;
        cm.sendNext(text);
        resultSet.close();
        ps.close();
        conn.close();
    }
}

function addSuggestion(title, text) {
    var conn = cm.getConnection();
    var sug = conn.prepareStatement("INSERT INTO suggest(id, charid ,title,text, date) value(?,?,?,?,?)");
    sug.setString(1, null);
    sug.setString(2, cm.getPlayer().getName());
    sug.setString(3, title);
    sug.setString(4, text);
    sug.setString(5, null);
    sug.executeUpdate();
    sug.close();
    conn.close();
}