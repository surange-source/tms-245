var status = -1;
var sel;

function action(mode, type, selection) {
    if (status >= 0 && mode == 0) {
        cm.dispose();
        return;
    }
    mode == 1 ? status++ : status--;

    if (status == 0) {
        cm.sendNext("歡迎~你是要來購買魚餌，對吧？");
    } else if (status == 1) {
        cm.sendSimple("您想做什麼呢？ \n\r #b#L0# 使用僱傭釣手魚餌罐頭#k#b \n\r #L1# 購買僱傭釣手專用一般魚餌#k");
    } else if (status == 2) {
        sel = selection;
        if (sel == 0) {
            if (cm.canHold(2300003, 120) && cm.haveItem(5350003)) {
                cm.gainItem(5350003, -1);
                cm.gainItem(2300003, 20);
                cm.sendOk("兌換成功,祝您釣魚愉快。");
            } else {
                cm.sendOk("請確認你有僱傭釣手魚餌罐頭並整理下你的背包空間。");
            }
            cm.safeDispose();
        } else if (sel == 1) {
            if (cm.getPQLog("購買魚餌") <= 0) {
                if (cm.canHold(2300002, 120) && cm.getMeso() >= 300000) {
                    cm.gainMeso(-300000);
                    cm.gainItem(2300002, 120);
                    cm.sendOk("購買成功,祝您釣魚愉快。");
                    cm.setPQLog("購買魚餌");
                } else {
                    cm.sendOk("請整理下你的背包空間。");
                }
            } else {
                cm.sendOk("魚餌一天只能購買一次！");
            }
            cm.safeDispose();
        }
    }
}
