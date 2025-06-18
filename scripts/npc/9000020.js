/* Dawnveil
 World Tour Guide
 Spinel
 Made by Daenerys
 */
var status = -1;
var sel;
var map;
var togos = [500000000, 701000000, 702000000, 800000000];
var maps = [
    ["維多利亞島(六條岔道)", 104020000],
    ["天空之城", 200000000],
    ["冰原雪域", 211000000],
    ["玩具城", 220000000],
    ["水世界", 230000000],
    ["神木村", 240000000],
    ["武陵", 250000000],
    ["靈藥幻境", 251000000],
    ["納希綠洲城", 260000000],
    ["瑪迦提亞城", 261000000],
    ["時間神殿", 270000000]
];

function start() {
    switch (cm.getMapId()) {
        case 950000000:
            cm.sendNext("為了從繁忙的日常中解脫，去享受一趟旅遊怎麼樣？不僅可以體檢新穎的異國文化，還能學到不少東西的機會！我們楓之谷旅遊公司為您準備了，豐富有趣的#b世界旅遊#k套餐。誰說環遊世界很貴？請放一萬個心。我們#b楓之谷世界旅遊套餐#k只需要#b3000楓幣#k就可以享樂全程。");
            break;
        case 950000100:
            var menu = "";
            for (var i = 0; i < maps.length; i++) {
                menu += "\r\n#L" + i + "# " + maps[i][0] + "#l";
            }
            cm.sendSimple("你好。我是旅遊導遊史匹奈爾。因預想外的異常狀況來到這裡而受到一些驚訝呢。我在幫你回傳到楓之谷世界吧。請選擇要移動到地區。\r\n#b" + menu);
            break;
        default:
            map = cm.getSavedLocation("WORLDTOUR");
            cm.sendSimple("還滿意冒險游程嗎? \n\r #b#L0# 已經遊覽了，想回到#m" + map + "#。#l");
            break;
    }
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if ((status <= 2 && mode == 0) || (status == 4 && mode == 1)) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;

        switch (cm.getMapId()) {
            case 950000000:
                if (status == 0) {
                    cm.sendSimple("現在就可以去往 #b世界各地充滿楓之谷特色的景點#k遊覽一番。在每個旅遊地我都會為大家提供滿意熱誠的服務。那麼請準備好，我們出發去\r\n#L0# 水上市場（泰國）#l\r\n#L1# 東方神州（上海）#l\r\n#L2# 嵩山鎮（少林寺）#l\r\n#L3# 古代神社（日本）#l");
                } else if (status == 1) {
                    sel = selection;
                    cm.sendNext("這是個不錯的地方，在那裡玩肯定很開心的。");
                } else if (status == 2) {
                    if (cm.getMeso() < 3000) {
                        cm.sendNext("請確認你是否帶有足夠的盤纏。");
                        cm.dispose();
                    } else {
                        cm.gainMeso(-3000);
                        cm.saveLocation("WORLDTOUR");
                        cm.warp(togos[sel]);
                        cm.dispose();
                    }
                }
                break;
            case 950000100:
                cm.warp(maps[selection][1]);
                cm.dispose();
                break;
            default:
                cm.warp(map == -1 ? 100000000 : map);
                cm.clearSavedLocation("WORLDTOUR");
                cm.dispose();
                break;
        }
    }
}
