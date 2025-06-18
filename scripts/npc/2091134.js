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
    else if (status == 0) {
        //var revenue = cm.getHyPay(3);
        //var selStr = "小提示:你可以將遊戲窗口調整到1024×768分辨及以上的的其他分辨率,然後就可以在頻道選項框的左上角看到拍賣小按鈕啦,這樣就可以直接呼出萬能NPC喲!\r\n";
        var selStr = "\t\t\t\t\t虎嘯九天門派\r\n\r\n";
            selStr += "尊敬的玩家#r#h0##k您好:\r\n";
            selStr += "我是負責管理虎嘯九天門派的管理員，您是否願意加入我們門派？\r\n";
            selStr += "#b#L1#恩，是的，我非常願意加入門派。#l";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 1:
            cm.dispose();
        if (cm.haveItem(1142746) || cm.getPlayer().hasEquipped(1142746)) {
            cm.sendOk("你身上已經有了#v1142746#了，或者你已經加入了飛龍在天的門派了，不可以再領取了。");
            //cm.gainItem(1142745, 1);
            //cm.sendOk("恭喜你成為虎嘯九天的一員。");
        } else {
            //cm.sendOk("你身上已經有了#v1142745#，不可以再領取了。");
            cm.gainItem(1142746, 1);
            cm.gainItem(3015306, 1);
            cm.gainItem(1142745, -1);
            cm.gainItem(3015305, -1);
            //cm.setPQLog("加入虎嘯九天", 1)
            cm.sendOk("恭喜你成為虎嘯九天的一員。");
            cm.worldSpouseMessage(0x9,"★★★★★★★『門派管理』：【"+ cm.getChar().getName() +"】 成功成為了虎嘯九天門派的一員!★★★★★★★");
            break;
}
}
    }
}