/*
 *  城鎮隨機美髮
 */
var status = -1;
var isAngel;
var isZero;
var isSecond = 0;
var ticketID = 5152049;

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
        }
        cm.sendYesNo("使用普通整容券可以隨機更換臉型……你確定要使用#b#t" + ticketID + "##k更換臉型嗎？");
    } else if (status == 1) {
        if (!cm.haveItem(ticketID)) {
            cm.sendOk("嗯……看樣子你沒有整容券……很抱歉，沒有整容券的話，我不能給你做整形手術。");
            cm.dispose();
            return;
        }

        var style = isSecond == 1 ? cm.getPlayer().getSecondFace() : cm.getPlayerStat("FACE");
        var gStyle = cm.gachaponItem(ticketID, isZero && isSecond == 1 ? 1 : cm.getPlayerStat("GENDER"));
        var nStyle = gStyle != null ? (Math.floor(gStyle.getItemId() / 1000) * 1000 + gStyle.getItemId() % 100 + Math.floor(style % 1000 / 100) * 100) : 0;
        if (gStyle == null || !cm.canChangeFace(nStyle)) {
            cm.sendOk("發生未知錯誤");
            cm.dispose();
            return;
        }
        var nStyle2nd = -1;
        if (isSecond == 2) {
            style = cm.getPlayer().getSecondFace();
            gStyle = cm.gachaponItem(ticketID, 1);
            nStyle2nd = gStyle != null ? (Math.floor(gStyle.getItemId() / 1000) * 1000 + gStyle.getItemId() % 100 + Math.floor(style % 1000 / 100) * 100) : 0;
            if (gStyle == null || !cm.canChangeFace(nStyle2nd)) {
                cm.sendOk("發生未知錯誤");
                cm.dispose();
                return;
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
            cm.sendOk("好了,你的朋友們一定認不出你了!");
        }
        cm.safeDispose();
    }
}
