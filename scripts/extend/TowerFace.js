/*
 *  城鎮美髮
 */
var status = -1;
var style_Colo_new;
var style_Colo_new_beta;
var isAngel;
var isZero;
var isSecond = 0;
var ticketID = 5152050;

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
            }
            var style = isSecond == 1 ? cm.getPlayer().getSecondFace() : cm.getPlayerStat("FACE");
            var styleList = cm.gachaponItems(ticketID, !isZero || isSecond == 2 ? cm.getPlayerStat("GENDER") : isSecond);
            style_Colo_new = new Array();
            for each(gStyle in styleList) {
                style_Colo_new.push(Math.floor(gStyle.getItemId() / 1000) * 1000 + gStyle.getItemId() % 100 + Math.floor(style % 1000 / 100) * 100);
            }
            style_Colo_new = cm.getCanFace(style_Colo_new);
            if (isSecond == 2) {
                style = cm.getPlayer().getSecondFace();
                styleList = cm.gachaponItems(ticketID, 1);
                style_Colo_new_beta = new Array();
                for each(gStyle in styleList) {
                    style_Colo_new_beta.push(Math.floor(gStyle.getItemId() / 1000) * 1000 + gStyle.getItemId() % 100 + Math.floor(style % 1000 / 100) * 100);
                }
                style_Colo_new_beta = cm.getCanFace(style_Colo_new_beta);
            }
            if (style_Colo_new.length <= 0 || (isSecond == 2 && style_Colo_new_beta.length <= 0)) {
                cm.sendOk("沒有可更換的臉型數據");
                cm.dispose();
                return;
            }
            var msg = "我能把你現在的臉變成全新的臉...你不想換張新的臉嗎?只要有#b#t" + ticketID + "##k,我就給你做整容手術。慢慢挑選你喜歡的臉吧~";
            if (isSecond == 2) {
                cm.askAvatarZero(ticketID, style_Colo_new, style_Colo_new_beta, msg);
            } else {
                cm.askAvatar(msg, style_Colo_new, ticketID, isSecond != 0);
            }
            break;
        case 1:
            if (style_Colo_new.length <= 0 || (isSecond == 2 && style_Colo_new_beta.length <= 0)) {
                cm.sendOk("出現未知錯誤。");
                cm.dispose();
                return;
            }
            if (!cm.haveItem(ticketID)) {
                cm.sendOk("嗯……看樣子你沒有整容券……很抱歉，沒有整容券的話，我不能給你做整形手術。");
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
            cm.sendOk("好了,你的朋友們一定認不出來是你了!");
            break;
        default:
            cm.dispose();
            break;
    }
}