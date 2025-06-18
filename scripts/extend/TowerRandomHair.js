/*
 *  城鎮隨機美髮
 */
var status = -1;
var styleType = -1;
var isAngel;
var isZero;
var isSecond = 0;
var ticketIDStyle = 5150042;
var ticketIDColor = 5151032;

function start() {
    isAngel = cm.getBeginner() == 6001;
    isZero = cm.getBeginner() == 10000;
    if (isAngel) {
        cm.askAngelicBuster();
    } else if (isZero) {
        cm.sendSimple("請選擇要接受變更的角色.#b\r\n\r\n#b#L0#神之子阿爾法#l\r\n#L1#神之子蓓塔#l\r\n#L2#神之子阿爾法 + 神之子蓓塔#l");
    } else {
        action(1, 0, 0);
    }
}

function action(mode, type, selection) {
    if (mode == 0) {
        if (status == 1) {
            cm.sendOk("這樣的話.那請再仔細考慮看看,下定決心的話再來和我對話吧.");
        }
        cm.dispose();
        return;
    } else {
        status++;
    }

    if (status == 0) {
        var str = "";
        if (isAngel) {
            if (selection == -1) {
                cm.dispose();
                return;
            }
            isSecond = selection != 0 ? 1 : 0;
        } else if (isZero) {
            isSecond = selection;
            if (isSecond == 0) {
                str += "#b只有阿爾法接受變更.#k\r\n";
            } else if (isSecond == 1) {
                str += "#b只有蓓塔接受變更.#k\r\n";
            } else if (isSecond == 2) {
                str += "#b阿爾法和蓓塔都接受變更.#k\r\n";
            }
        }
        str += "我是#p" + cm.getNpc() + "#.如果你有#b#t" + ticketIDStyle + "##k或是 #b#t" + ticketIDColor + "##k的話,把頭髮交給我如何?請選擇想使用的項目.\r\n";
        str += "#b#L0# 變換髮型(使用一般券)#l\r\n";
        str += "#L1# 染髮(使用一般券)#l";
        cm.sendSimple(str);
    } else if (status == 1) {
        if (styleType == -1) {
            styleType = selection;
        }
        if (styleType == 0) {
            cm.sendYesNo("使用一般券的話,可以隨機變換髮型.真的要使用 #b#t" + ticketIDStyle + "##k改變髮型嗎?");
        } else if (styleType == 1) {
            cm.sendYesNo("使用一般券可隨機變換髮色.真的要使用 #b#t" + ticketIDColor + "##k改變髮型嗎?");
        }
    } else if (status == 2) {
        var ticketID;
        var typeName;
        var typeInfo;
        if (styleType == 0) {
            ticketID = ticketIDStyle;
            typeName = "髮型";
        } else {
            ticketID = ticketIDColor;
            typeName = "髮色";
        }
        if (!cm.haveItem(ticketID)) {
            cm.sendOk("嗯...這位顧客,你好像沒有我們美髮店專用的券?不好意思沒有券的話,沒辦法幫你整理頭髮.");
            cm.dispose();
            return;
        }

        var nStyle = -1;
        var nStyle2nd = -1;
        if (styleType == 0) {
            var style = isSecond == 1 ? cm.getPlayer().getSecondHair() : cm.getPlayerStat("HAIR");
            var gStyle = cm.gachaponItem(ticketID, isZero && isSecond == 1 ? 1 : cm.getPlayerStat("GENDER"));
            nStyle = gStyle != null ? (Math.floor(gStyle.getItemId() / 10) * 10 + style % 10) : 0;
            if (gStyle == null || !cm.canChangeHair(nStyle)) {
                cm.sendOk("發生未知錯誤");
                cm.dispose();
                return;
            }
            if (isSecond == 2) {
                style = cm.getPlayer().getSecondHair();
                gStyle = cm.gachaponItem(ticketID, 1);
                nStyle2nd = gStyle != null ? (Math.floor(gStyle.getItemId() / 10) * 10 + style % 10) : 0;
                if (gStyle == null || !cm.canChangeHair(nStyle2nd)) {
                    cm.sendOk("發生未知錯誤");
                    cm.dispose();
                    return;
                }
            }
        } else if (styleType == 1) {
            var style_Colo_new;
            var style_Colo_new_beta;
            var styleColor = isSecond == 1 ? cm.getPlayer().getSecondHair() : cm.getPlayerStat("HAIR");
            var currentstylecolo = Math.floor(styleColor / 10) * 10;
            style_Colo_new = [];
            for (var i = 0; i < 8; i++) {
                style_Colo_new[i] = currentstylecolo + i;
            }
            style_Colo_new = cm.getCanHair(style_Colo_new);
            if (style_Colo_new.length <= 0) {
                cm.sendOk("沒有可更換的髮型數據");
                cm.dispose();
                return;
            }
            nStyle = style_Colo_new[Math.floor(Math.random() * style_Colo_new.length)];
            if (isSecond == 2) {
                styleColor = cm.getPlayer().getSecondHair();
                currentstylecolo = Math.floor((styleColor / 10)) * 10;
                style_Colo_new_beta = [];
                for (var i = 0; i < 8; i++) {
                    style_Colo_new_beta[i] = currentstylecolo + i;
                }
                style_Colo_new_beta = cm.getCanHair(style_Colo_new_beta);
                if (style_Colo_new_beta.length <= 0) {
                    cm.sendOk("沒有可更換的髮型數據");
                    cm.dispose();
                    return;
                }
                nStyle2nd = style_Colo_new_beta[Math.floor(Math.random() * style_Colo_new_beta.length)];
            }
        }
        if (nStyle != -1 && (isSecond != 2 || nStyle2nd != -1)) {
            if (!cm.canChangeHair(nStyle)) {
                cm.sendOk("發生未知錯誤");
                cm.dispose();
                return;
            }
            cm.gainItem(ticketID, -1);
            if (cm.setAvatar(nStyle, isSecond == 1) == -1) {
                cm.sendOk("出現未知錯誤。");
                cm.dispose();
                return;
            }
            if (isSecond == 2 && cm.setAvatar(nStyle2nd, isSecond == 2) == -1) {
                cm.sendOk("出現未知錯誤。");
                cm.dispose();
                return;
            }
            cm.sendNext("享受你的新" + typeName + "吧!");
        }
        cm.safeDispose();
    }
}
