var f = "#fUI/UIPVP.img/MiniMapIcon/star#";//彩色五角星
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            var text="#d恭喜您通過了測試，請盡情享受樂趣吧。\r\n";
            text+="#k親愛的玩家#r#h0##k您好，在這裡可以加入門派,請慎慎重考慮,一旦加入門派不能在退出：\r\n";
            text+="#b#L2091133#選擇門派。#l\r\n";
            //text+="#b#L2091134#我想加入虎嘯九天門派。#l\r\n";
            cm.sendSimple(text);
        } else if (status == 1){
            cm.dispose();
            cm.openNpc(selection);
        }
    }
}