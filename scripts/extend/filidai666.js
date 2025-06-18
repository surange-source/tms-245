var status = 0;
var typed = 0;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            var text = "你要購買超值福袋嗎？\r\n";
            text += "#b#L1#瞭解什麼是福袋#l\r\n";
            text += "#b#L2#購買小福袋套餐#l\r\n";
            text += "#b#L3#購買巨大福袋套餐#l\r\n";
            cm.sendSimple(text);
        } else if (status == 1) {
            if (selection == 1) {
                var text = "#e#d什麼是小福袋套餐？#n#k\r\n";
                text += "\t購買小福袋套餐可以立刻獲得#r永久坐騎[暗光龍]#k，#r20#k張#b無損高級裝備強化卷#k，#r10#k張#b#z2049135##k，並發放#r30#k個#b福袋#k，每個#b福袋#k打開可獲得#r50#k#b兔幣#k，每天只能使用一個。售價為#b15W樂豆點#k。\r\n";
                text += "#e#d什麼是巨大福袋套餐？#n#k\r\n";
                text += "\t購買巨大福袋套餐可以立刻獲得#r永久坐騎[幻龍]#k，不管是否擁有滑翔技能，都可以進行滑翔，#r30#k張#b無損高級裝備強化卷#k，#r10#k張#b#z2049137##k，1個#b驚喜箱子#k，打開#b驚喜箱子#k可能隨機獲得5張星火或者5張驚人武器卷或者暴君裝備一件，每個#b巨大福袋#k打開可獲得#r100#k#b兔幣#k，每天只能使用一個。售價為#b30W樂豆點#k。\r\n";
                cm.sendOk(text);
                cm.dispose();
            } else if (selection == 2) {
                cm.sendYesNo("是否要花費#r15W#k樂豆點購買小福袋套餐？");
                typed=1;
            } else if (selection == 3) {
                cm.sendYesNo("是否要花費#r30W#k樂豆點購買巨大福袋套餐？");
                typed=2;
            }
        } else if (status == 2) {
            if (typed==1) {                
                if (cm.getPlayer().getCSPoints(1) >= 150000) {// && !cm.haveItem(2432529)) {
/*                    if (cm.getPQLog("小福袋套餐")==-1) {
                        cm.sendOk("一個賬號只能辦理一次#b小福袋#k套餐，無法再辦理。");
                        cm.dispose();
                        return;
                    }*/
                    cm.gainItem(2049135, 10);
                    cm.gainItem(2432529, 30);
                    cm.gainItem(2049323, 20);
                    cm.gainItem(2430297, 1);
                    cm.gainNX(-1500);
                cm.worldSpouseMessage(0x20, "『福袋套餐』 : 有錢不任性，玩家 " + cm.getChar().getName() + " 辦理了小福袋理財套餐.");
                    cm.getPlayer().dropMessage(1, "購買成功！");
                    cm.setPQLog("小福袋套餐", -2);
                    cm.dispose();
                } else {
                    cm.sendOk("購買失敗，您的樂豆點不足或者身上還有未使用完的福袋，無法購買！");
                    cm.dispose();
                }
            } else if (typed==2) {
                if (cm.getPlayer().getCSPoints(1) >= 300000) { //&& !cm.haveItem(2431481)) {
                    /*if (cm.getPQLog("巨大福袋套餐")==-1) {
                        cm.sendOk("一個賬號只能辦理一次#b巨大福袋#k套餐，無法再辦理。");
                        cm.dispose();
                        return;
                    }*/
                    cm.gainItem(2049137, 10);
                    cm.gainItem(2431481, 30);
                    cm.gainItem(2049323, 30);
                    cm.gainItem(2431137, 1);
                    cm.gainItem(2431989, 1);
                    cm.gainNX(-3000);
                cm.worldSpouseMessage(0x20, "『福袋套餐』 : 有錢不任性，玩家 " + cm.getChar().getName() + " 辦理了大福袋理財套餐.");
                    cm.setPQLog("巨大福袋套餐", -2);
                    cm.getPlayer().dropMessage(1, "購買成功！");
                    cm.dispose();
                } else {
                    cm.sendOk("購買失敗，您的樂豆點不足或者身上還有未使用完的巨大福袋，無法購買！");
                    cm.dispose();
                }
            }
        }
   }
}