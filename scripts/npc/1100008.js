var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendNext("不去的話就算了。");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        cm.sendYesNo("你想離開天空之城，到其他地區去嗎？這艘船預定開往#b聖地#k。灑滿陽光的樹葉和微風吹拂的湖水非常美麗。那裡是神獸和女皇西格諾斯居住的島。如果你對騎士感興趣，可以去那裡看看……怎麼樣？你想到聖地去嗎？\r\n\r\n移動時間大約是#b4分鐘#k，費用是#b1000#k楓幣。");
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
