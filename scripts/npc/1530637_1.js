var status = 0;
var kkk = "#fMap/MapHelper.img/weather/starPlanet2/8#";
var giftContent = Array(
        //Array("餘額兌換樂豆點：1餘額=3000點",   1, Array(
        //   Array(-1, 3000)
        //)), 
        // Array("餘額兌換樂豆點：10餘額=30000點",   10, Array(
        //   Array(-10, 30000)
        //  )), 
        //  Array("神秘椅子箱子",   50, Array(
        //         Array(2431256, 1)
        //  )), 
        Array("楓幣100萬", 50, Array(
                Array(4001714, 1)
                )),
        Array("楓幣1500萬", 500, Array(
                Array(4001714, 15)
                )),
        Array("楓幣1億", 3000, Array(
                Array(4001715, 1)
                )),
        Array("永遠的涅?火焰", 3000, Array(
                Array(2048717, 1)
                )),
        Array("超級神奇方塊 x 10", 100, Array(
                Array(5062009, 10)
                )),
        Array("超級神奇方塊 x 50", 500, Array(
                Array(5062009, 50)
                )),
        Array("超級神奇方塊 x 100", 1000, Array(
                Array(5062009, 100)
                )),
        Array("終極神奇方塊 x 10", 50, Array(
                Array(5062010, 10)
                )),
        Array("終極神奇方塊 x 50", 250, Array(
                Array(5062010, 50)
                )),
        Array("終極神奇方塊 x 100", 500, Array(
                Array(5062010, 100)
                )),
        Array("閃炫方塊 x 10", 1000, Array(
                Array(5062024, 10)
                )),
        Array("閃炫方塊 x 50", 5000, Array(
                Array(5062024, 50)
                )),
        Array("閃炫方塊 x 100", 10000, Array(
                Array(5062024, 100)
                )),
        Array("大師附加神奇方塊 x 10", 100, Array(
                Array(5062500, 10)
                )),
        Array("大師附加神奇方塊 x 50", 500, Array(
                Array(5062500, 50)
                )),
        Array("大師附加神奇方塊 x 100", 1000, Array(
                Array(5062500, 100)
                )),
        Array("附加潛能記憶方塊 x 10", 1000, Array(
                Array(5062503, 10)
                )),
        Array("附加潛能記憶方塊 x 50", 5000, Array(
                Array(5062503, 50)
                )),
        Array("附加潛能記憶方塊 x 100", 10000, Array(
                Array(5062503, 100)
                )),
        Array("諾巴劍士套裝", 15000, Array(
                Array(1132169, 1),
                Array(1102476, 1),
                Array(1072737, 1)
                )),
        Array("諾巴魔法師套裝", 15000, Array(
                Array(1132170, 1),
                Array(1102477, 1),
                Array(1072738, 1)
                )),
        Array("諾巴弓箭手套裝", 15000, Array(
                Array(1132171, 1),
                Array(1102478, 1),
                Array(1072739, 1)
                )),
        Array("諾巴盜賊套裝", 15000, Array(
                Array(1132172, 1),
                Array(1102479, 1),
                Array(1072740, 1)
                )),
        Array("諾巴海盜套裝", 15000, Array(
                Array(1132173, 1),
                Array(1102480, 1),
                Array(1072741, 1)
                )),
        Array("魯塔比斯劍士套裝", 50000, Array(
                Array(1003797, 1),
                Array(1042254, 1),
                Array(1062165, 1)
                )),
        Array("魯塔比斯魔法師套裝", 50000, Array(
                Array(1003798, 1),
                Array(1042255, 1),
                Array(1062166, 1)
                )),
        Array("魯塔比斯弓箭手套裝", 50000, Array(
                Array(1003799, 1),
                Array(1042256, 1),
                Array(1062167, 1)
                )),
        Array("魯塔比斯盜賊套裝", 50000, Array(
                Array(1003800, 1),
                Array(1042257, 1),
                Array(1062168, 1)
                )),
        Array("解放的凱瑟利安", 40000, Array(
                Array(1402180, 1)
                )),
        Array("阿麗莎之光輝", 40000, Array(
                Array(1382235, 1)
                )),
        Array("琉德之劍", 20000, Array(
                Array(1402224, 1)
                )),
        Array("海神王冠", 20000, Array(
                Array(1004075, 1)
                )),
        Array("進階精靈帽", 10000, Array(
                Array(1003719, 1)
                )),
        Array("進階半半頭盔", 10000, Array(
                Array(1003720, 1)
                )),
        Array("進階女王王冠", 10000, Array(
                Array(1003721, 1)
                )),
        Array("進階貝倫頭盔", 15000, Array(
                Array(1003722, 1)
                )),
        Array("獨眼巨人之眼Lv.3", 30000, Array(
                Array(1022226, 1)
                )),
        Array("8週年點點紅", 5000, Array(
                Array(1012319, 1)
                )),
        Array("戰鬥機器人套裝（男）", 20000, Array(
                Array(1662073, 1),
                Array(1672069, 1)
                )),
        Array("戰鬥機器人套裝（女）", 20000, Array(
                Array(1662072, 1),
                Array(1672069, 1)
                )),
        Array("探險之黑暗暴擊戒指", 10000, Array(
                Array(1113069, 1)
                )),
        Array("永遠的冒險家戒指", 5000, Array(
                Array(1112919, 1)
                )),
        Array("冒險家的格拉泰斯戒指", 5000, Array(
                Array(1112659, 1)
                )),
        Array("冒險家的魔法之戒", 20000, Array(
                Array(1112429, 1)
                )),
        Array("冒險家的爆擊之戒", 5000, Array(
                Array(1112428, 1)
                )),
        Array("冒險家的殘酷之戒", 5000, Array(
                Array(1112427, 1)
                )),
        Array("冒險家的爆擊之戒", 5000, Array(
                Array(1112428, 1),
                Array(-1, 20000)
                )),
        Array("狂狼勇士祝福戒指", 20000, Array(
                Array(1113020, 1)
                )),
        Array("黑龍傳說指環", 20000, Array(
                Array(1113084, 1)
                )),
        Array("黃金休彼德蔓徽章II", 20000, Array(
                Array(1182017, 1)
                )),
        Array("水晶楓葉徽章", 20000, Array(
                Array(1190302, 1)
                )),
        Array("起源之傳說紋章(攻)", 5000, Array(
                Array(1190502, 1)
                )),
        Array("起源之傳說紋章(魔)", 5000, Array(
                Array(1190503, 1)
                )),
        Array("真?覺醒冒險之心（劍士）", 15500, Array(
                Array(1122122, 1)
                )),
        Array("真?覺醒冒險之心（魔法師）", 15500, Array(
                Array(1122123, 1)
                )),
        Array("真?覺醒冒險之心（弓箭手）", 15500, Array(
                Array(1122124, 1)
                )),
        Array("真?覺醒冒險之心（盜賊）", 15500, Array(
                Array(1122125, 1)
                )),
        Array("真?覺醒冒險之心（海盜）", 15500, Array(
                Array(1122126, 1)
                )),
        Array("遺忘之神話耳環", 40000, Array(
                Array(1032219, 1)
                )),
        Array("封印的時間之石", 2500, Array(
                Array(4033999, 1)
                ))
        );
var giftId = -1;
var gifts = null;
var price = 999;
var column = new Array("裝備", "消耗", "設置", "其他", "商城");
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
    if (status == 0) {
        var text = "";
        text = "這裡有全部的道具購買，歡迎選購\r\n#rPS：固有道具只能購買一個，否則會消失！#n#k\r\n";
        text += "" + kkk + " #b您當前元寶為：#r" + cm.getTWD() + "#k\r\n";
        for (var key in giftContent) {
            text += "#b#L" + key + "#" + kkk + "【#r" + giftContent[key][0] + "#b】 #d = #r" + giftContent[key][1] + " #d元寶#l#k\r\n";
        }
        cm.sendSimple(text);
    } else if (status == 1) {
        giftId = parseInt(selection);
        price = giftContent[giftId][1];
        gifts = giftContent[giftId][2];
        var text = "#r#e" + giftContent[giftId][0] + "#n#b內容：\r\n";
        for (var key in gifts) {
            var itemId = gifts[key][0];
            var itemQuantity = gifts[key][1];
            text += "#i" + itemId + ":##b" + (itemId == -1 ? "贈送樂豆點" : "#z" + itemId + "#") + "#k #rx " + itemQuantity + "#k\r\n";
        }
        text += "\r\n#d是否花費#e#r" + price + "#n#d元寶購買該禮包？#k";
        cm.sendYesNo(text);
    } else if (status == 2) {
        if (giftId != -1 && gifts != null) {
            var needslot = new Array(0, 0, 0, 0, 0);
            for (var i in gifts) {
                var type = Math.floor(gifts[i][0] / 1000000);
                if (type == -1) {
                    continue;
                }
                needslot[type - 1] = needslot[type - 1] + 1;
            }
            for (var i = 0; i < 5; i++) {
                if (cm.getSpace(i + 1) < needslot[i]) {
                    cm.sendOk("您的" + column[i] + "欄位空間不足" + needslot[i] + "格，請清理後再來。");
                    cm.dispose();
                    return;
                }
            }
            if (cm.getTWD() < price) {
                cm.sendOk("您的元寶不足，請先儲值後再購買。");
                cm.dispose();
                return;
            }
            for (var key in gifts) {
                var itemId = gifts[key][0];
                var itemQuantity = gifts[key][1];
                if (itemId == -1) {
                    cm.gainNX(itemQuantity);
                } else {
                    cm.gainItem(itemId, itemQuantity);
                }
            }
            cm.setTWD(cm.getTWD() - price);
            cm.sendOk("恭喜您，購買成功！");
            cm.dispose();
        } else {
            cm.sendOk("購買錯誤！請聯繫管理員！");
            cm.dispose();
        }
    }
}