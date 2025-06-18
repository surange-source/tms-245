var status = 0;
var selStr;
var sel;
var selitem;
var a = Math.floor(Math.random() * 10 + 5);
var b = Math.floor(Math.random() * 20 + 10);
var c = Math.floor(Math.random() * 20 + 5);
var d = Math.floor(Math.random() * 10 + 3);
var ass = d + b * c + a;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var haogan = cm.getChar().getMapId() - 744000003;
    if (cm.getChar().getMapId() == 744000001) {
        haogan = 20;
    }
    if (cm.getBossLog("haogan" + cm.getChar().getMapId()) > 0) {
        haogan = 0;
    }
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        if (cm.getBossLog("haogandt") == 0) {
            selStr = "沒想到你既然能到我的教室裡面來,來做做測試題吧。#b\r\n";
            selStr += d + " + " + b + " x " + c + " + " + a + " = ?";
            cm.sendGetNumber(selStr, 1, 1, 9999);
        } else {
            selStr = "你已經解決老師們的問題了嘛?呵呵,沒想到你還是蠻聰明的。那麼選擇趕快選擇你喜歡的老師,獲得他們的好感度吧!\r\n#b(可以分配的好感度#r" + haogan + "#b點)#b\r\n";
            selStr += "#L0#分配好感度給 喬     (敏捷圖騰)#l\r\n";
            selStr += "#L1#分配好感度給 海麗蜜 (智力圖騰)#l\r\n";
            selStr += "#L2#分配好感度給 李小龍 (力量圖騰)#l\r\n";
            selStr += "#L3#分配好感度給 李卡司 (運氣圖騰)#l\r\n";
            cm.sendSimple(selStr);
        }
    } else if (status == 1) {
        if (cm.getBossLog("haogandt") == 0) {
            if (selection == ass) {
                status = -1;
                cm.setbosslog("haogandt");
                cm.getPlayer().getMap().startSimpleMapEffect("你很聰明,希望你能再接再厲。", 5120067);
                cm.sendNext("好的,你通過了這個測試。");
            } else {
                cm.sendOk("這麼簡單的題目你都能算錯嗎?好好想在來找我把。");
                cm.dispose();
            }
        } else {
            if (cm.getBossLog("haogan" + cm.getChar().getMapId()) == 0) {
                cm.setBossLog("haogan" + cm.getChar().getMapId());
                cm.getChar().setgetschool(selection, haogan + cm.getChar().getgetschool(selection));
                cm.sendOk("好感度已分配你可以移至到下一個教室。");
            } else {
                if (cm.getChar().getMapId() == 744000001) {
                    cm.warp(744000000, 0);
                } else {
                    cm.sendOk("好感度已分配你可以移至到下一個教室。");
                }
            }
            cm.dispose();
        }
    }
}
