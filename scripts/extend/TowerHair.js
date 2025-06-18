/*
 *  城鎮美髮
 */
var status = -1;
var styleType = -1;
var style_Colo_new;
var style_Colo_new_beta;
var isAngel;
var isZero;
var isSecond = 0;
var ticketIDStyle = 5150043;
var ticketIDColor = 5151033;

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
        cm.dispose();
        return;
    } else if (mode == 1) {
        status++;
    } else {
        status--;
    }

    switch (status) {
        case 0:
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
            str += "#b#L0# 變換髮型(使用高級券)#l\r\n";
            str += "#L1# 染髮(使用高級券)#l";
            cm.sendSimple(str);
            break;
        case 1:
            if (styleType == -1) {
                styleType = selection;
            }
            if (styleType == 0) {
                var style = isSecond == 1 ? cm.getPlayer().getSecondHair() : cm.getPlayerStat("HAIR");
                var styleList = cm.gachaponItems(ticketIDStyle, !isZero || isSecond == 2 ? cm.getPlayerStat("GENDER") : isSecond);
                style_Colo_new = new Array();
                for each(gStyle in styleList) {
                    style_Colo_new.push(Math.floor(gStyle.getItemId() / 10) * 10 + style % 10);
                }
                style_Colo_new = cm.getCanHair(style_Colo_new);
                if (isSecond == 2) {
                    style = cm.getPlayer().getSecondHair();
                    styleList = cm.gachaponItems(ticketIDStyle, 1);
                    style_Colo_new_beta = new Array();
                    for each(gStyle in styleList) {
                        style_Colo_new_beta.push(Math.floor(gStyle.getItemId() / 10) * 10 + style % 10);
                    }
                    style_Colo_new_beta = cm.getCanHair(style_Colo_new_beta);
                }
                if (style_Colo_new.length <= 0 || (isSecond == 2 && style_Colo_new_beta.length <= 0)) {
                    cm.sendOk("沒有可更換的髮型數據");
                    cm.dispose();
                    return;
                }
                var msg = "可以幫你把現在的髮型改變成新的樣子.對現在的髮型不會感到厭煩嗎?只要有#b#t" + ticketIDStyle + "##k的話就可以幫你變換髮型.慢慢挑選想要變換的髮型吧~";
                if (isSecond == 2) {
                    cm.askAvatarZero(ticketIDStyle, style_Colo_new, style_Colo_new_beta, msg);
                } else {
                    cm.askAvatar(msg, style_Colo_new, ticketIDStyle, isSecond != 0);
                }
            } else if (styleType == 1) {
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
                var msg = "可以幫你把現在的頭髮換成別的顏色.對現在的髮色不會感到厭煩嗎?只要你有#b#t" + ticketIDColor + "##k的話就可以幫你染色.慢慢挑選想要染的髮色吧！";
                if (isSecond == 2) {
                    styleColor = cm.getPlayer().getSecondHair();
                    currentstylecolo = Math.floor(styleColor / 10) * 10;
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
                    cm.askAvatarZero(ticketIDColor, style_Colo_new, style_Colo_new_beta, msg);
                } else {
                    cm.askAvatar(msg, style_Colo_new, ticketIDColor, isSecond != 0);
                }
            }
            break;
        case 2:
            if (style_Colo_new.length <= 0 || (isSecond == 2 && style_Colo_new_beta.length <= 0)) {
                cm.sendOk("出現未知錯誤。");
                cm.dispose();
                return;
            }
            var ticketID;
            var typeName;
            var typeInfo;
            if (styleType == 0) {
                ticketID = ticketIDStyle;
                typeName = "髮型";
                typeInfo = "整理髮型";
            } else {
                ticketID = ticketIDColor;
                typeName = "髮色";
                typeInfo = "染色";
            }
            if (!cm.haveItem(ticketID)) {
                cm.sendOk("嗯...你好像沒有我們美髮店專用券?不好意思,沒有券的話無法幫你" + typeInfo + ".");
                cm.dispose();
                return;
            }
            cm.gainItem(ticketID, -1);
            if (cm.setAvatar(style_Colo_new[selection], isSecond == 1) == -1) {
                cm.sendOk("出現未知錯誤。");
                cm.dispose();
                return;
            }
            if (isSecond == 2 && cm.setAvatar(style_Colo_new_beta[cm.getNumber()], isSecond == 2) == -1) {
                cm.sendOk("出現未知錯誤。");
                cm.dispose();
                return;
            }
            cm.sendNext("享受你的新" + typeName + "吧!");
            break;
        default:
            cm.dispose();
            break;
    }
}