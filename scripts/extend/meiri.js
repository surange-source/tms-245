/*
 完成時間：2013年7月21日 12:13:28
 腳本功能：活動豐收
 */


var selects;
var mode;
var EventList = Array(
        Array("#r[簽到福利] 每日簽到#k#l", "qiandao11")
        //Array("#r[HOTTIME] 每日椅子活動。#k#l", 103),
       // Array("#r[HOTTIME] 數字猜猜猜！#k#l", 104),
        //Array("#r[日常任務] 每日跑環#k#l", 110),
        //Array("#r[日常任務] 里諾赫的口袋#k#l", 120)
);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status >= 0 && mode == 0) {
       cm.openNpc(9900003)
        return;
    }
    if (mode == 1)
        status++;
    else
        status--;

    if (status == 0) {
        var text = "目前" + cm.getServerName() + "已開始的活動有下列\r\n請按照您的喜好選擇活動：\r\n#b"
        for (var i = 0; i < EventList.length; i++) {
            text += "#L" + i + "# " + EventList[i][0] + "\r\n"
        }
        cm.sendSimple(text)
    } else if (status == 1) {
            selects = selection;
            mode = EventList[selects][1];
            if (EventList[selects][1] >= 10000) {
                cm.openNpc(mode);
            } else {
        cm.dispose();
                cm.openNpc(9900003, mode);
                //cm.setNPC_Mode(0)
            }
    }
}