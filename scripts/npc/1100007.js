var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendNext("不想去的話就算了……");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        cm.sendYesNo("嗯，啊……你是說……你想離開維多利亞島，到其他地區去？乘坐這條船，可以到達#b聖地#k。那是個陽光灑滿樹葉、微風吹皺湖水的、美麗的、居住著神獸和女皇的地方。你要到聖地去嗎？\r\n\r\n移動時間大約是#b2分鐘#k，費用是#b1000#k楓幣。");
    } else if (status == 1) {
        if (cm.getMeso() < 1000) {
            cm.sendNext("你明明沒有錢嘛……必須有#b1000#k才可以去。");
        } else {
            cm.gainMeso(-1000);
            cm.warp(130000210,0);
        }
        cm.dispose(); 
    }
}
