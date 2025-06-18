/* 哈拉克 - 創建公會 */

var status = -1;
var sel;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0 && status == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        if (cm.getPlayerStat("GID") > 0) {
            cm.sendSimple("有什麼可以幫你的嗎？\r\n#b#L0#我想增加公會人數#l\r\n#L1#我想解散公會#l");
        } else {
            cm.dispose();
            cm.openNpc(2010007);
        }
    } else if (status == 1) {
        sel = selection;
        if (selection == 0) {
            if (cm.getPlayerStat("GID") <= 0 || cm.getPlayerStat("GRANK") != 1) {
                cm.sendOk("你不是會長，因此你將不能增加公會成員的人數上限.");
                cm.dispose();
            } else {
                cm.sendYesNo("公會成員人數每增加#b5人#k，需要的手續費是#b5000萬楓幣#k。怎麼樣？你想增加公會人數嗎？");
            }
        } else if (selection == 1) {
            if (cm.getPlayerStat("GID") <= 0 || cm.getPlayerStat("GRANK") != 1) {
                cm.sendOk("你不是會長，因此你不能解散該公會.");
                cm.dispose();
            } else {
                cm.sendYesNo("你真的要解散公會嗎？哎呀……哎呀……解散之後，你的公會就會被永久刪除。很多公會特權也會一起消失。你真的要解散嗎？");
            }
        }
    } else if (status == 2) {
        if (sel == 0 && cm.getPlayerStat("GID") > 0 && cm.getPlayerStat("GRANK") == 1) {
            cm.increaseGuildCapacity(false);
            cm.dispose();
        } else if (sel == 1 && cm.getPlayerStat("GID") > 0 && cm.getPlayerStat("GRANK") == 1) {
            cm.disbandGuild();
            cm.dispose();
        }
    }
}