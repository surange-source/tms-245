var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        var em = cm.getEventManager("Limitless");
        var Times = em.getProperty("Times");
        var charid = cm.getChar().getId();
        if (Times!=null){
            var conn = cm.getConnection();
            var UpDateData = conn.prepareStatement("update limitlessEvent set times=? where charid = " + charid + "");
            UpDateData.setString(1, parseInt(Times) + 1);
            UpDateData.executeUpdate();//更新;*/
            cm.playerMessage(5,"闖關成功！10秒後將進入下一關，請做好準備！");
        }else{
            cm.sendOk("配置文件出錯，請聯繫管理員解決！");
        }
        cm.dispose();
    }
}