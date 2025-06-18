var status = -1;
var select = -1;
var togo;

function start() {
    if (cm.getMapId() == 251000000) {
        togo = "百草堂";
        cm.sendYesNo("你好？冒險家，旅途愉快嗎？沒有像我一樣的翅膀，是不是有些不方便？最近在幫一些沒有翅膀的人直接飛往 #b武陵#k。怎樣？有興趣嗎？只需要#b500 楓幣#k就可以。");
    } else if (cm.getMapId() == 250000100) {
        togo = "武陵";
        cm.sendSimple("你好啊，冒險家！旅行進行得愉快嗎？你不像我這樣有翅膀，旅途中該很多不便。最近我在幫助那些沒有翅膀的人們去往別的地區，你需要幫忙嗎？那麼選擇你要去的地方吧。#b\r\n#L0#天空之城(1500 楓幣)#l\r\n#L1#百草堂(500 楓幣)#l");
    } else if (cm.getMapId() == 200000141) {
        togo = "天空之城";
        cm.sendSimple("你好？冒險家，旅途愉快嗎？沒有像我一樣的翅膀，是不是有些不方便？最近在幫一些沒有翅膀的人移動。怎樣？有興趣嗎？那麼選擇想去的地方。#b\r\n#L0#武陵(1500 楓幣)#l");
    } else {
        cm.sendNext("該地圖還不支持傳送，請向管理員反饋。");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (togo == "百草堂") {
        baiCaoTang(mode, type, selection);
    } else if (togo == "武陵") {
        muLung(mode, type, selection);
    } else if (togo == "天空之城") {
        tianKong(mode, type, selection);
    }
}

function baiCaoTang(mode, type, selection) {
    if (mode == 1)
        status++;
    else
        status--;
    if (status == -2) {
        cm.sendNext("改變想法隨時跟我搭話吧。");
        cm.dispose();
    } else if (status == 0) {
        if (cm.getMeso() < 500) {
            cm.sendNext("你有足夠的楓幣嗎？");
        } else {
            cm.gainMeso(-500);
            cm.warp(250000100, 0);
        }
        cm.dispose();
    } else {
        cm.dispose();
    }
}

function muLung(mode, type, selection) {
    if (mode == 1)
        status++;
    else
        status--;
    if (status == -1) {
        if (select == 1) {
            cm.sendNext("想好了再跟我搭話吧。");
        }
        cm.dispose();
    } else if (status == 0) {
        if (select == -1)
            select = selection;
        if (select == 0) {
            if (cm.getMeso() < 1500) {
                cm.sendNext("你有足夠的楓幣嗎？");
            } else {
                cm.gainMeso(-1500);
                cm.warp(200000100, 0);
                //cm.warp(200090310, 1);
            }
            cm.dispose();
        } else if (select == 1) {
            cm.sendYesNo("要向 #b百草堂#k移動嗎？只要中途不做出危險的動作消下去，很快就能到達。價錢是#b500 楓幣#k。");
        }
    } else if (status == 1) {
        if (select == 1) {
            if (cm.getMeso() < 500) {
                cm.sendNext("看來你沒有足夠的楓幣。");
            } else {
                cm.gainMeso(-500);
                cm.warp(251000000, 0);
            }
        }
        cm.dispose();
    } else {
        cm.dispose();
    }
}

function tianKong(mode, type, selection) {
    if (mode == 1)
        status++;
    else
        status--;
    if (status == 0) {
        if (cm.getMeso() < 1500) {
            cm.sendNext("你有足夠的楓幣嗎？");
        } else {
            cm.gainMeso(-1500);
            cm.warp(250000100, 1);
        }
        cm.dispose();
    } else {
        cm.dispose();
    }
}
