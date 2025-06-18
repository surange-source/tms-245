/*  NPC : Legor
    Bowman 4th job advancement
    Forest of the priest (240010501)
*/

var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0 && status == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1)
        status++;
    else
        status--;

    if (status == 0) {
        if ((cm.getJob() == 312 || cm.getJob() == 322)) {
            cm.sendSimple("你找我有什麼事情麼? \r\n#b#L11# 關於自由轉職#l");
        } else if (!(cm.getJob() == 311 || cm.getJob() == 321)) {
            cm.sendOk("你為什麼想見我？我沒有你想知道的事。");
            cm.safeDispose();
            return;
        } else if (cm.getQuestStatus(1455) == 1) {
            cm.sendSimple("我可以將你傳送到天鷹或火焰龍所在地, 那麼你想去 \r\n#b#L0# 火焰龍森林#l\r\n#b#L1# 天鷹森林#l");
        } else {
            cm.sendOk("你還不夠強大走弓箭手頂尖的道路。等你變得更強壯再來找我吧。");
            cm.dispose();
            return;
        }
    } else if (status == 1 && selection == 11){
        cm.dispose();
        cm.openNpc(2081300, "FreeTransfer");
        return;
    } else if (status == 1) {
        if (selection == 0) {
            if (cm.haveItem(4031343, 1)) {
                cm.sendOk("你已經有#b#t4031343##k了");
            } else {
                cm.resetMap(924000200);
                cm.warp(924000200);
            }
        } else {
            if (cm.haveItem(4031344, 1)) {
                cm.sendOk("你已經有#b#t4031344##k了");
            } else {
                cm.resetMap(924000201);
                cm.warp(924000201);
            }
        }
        cm.dispose();
    }
}
