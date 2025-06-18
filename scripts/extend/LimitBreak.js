/*      
 *  
 *  功能：武器破攻
 *  
 */

var status;
var con = 10;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    switch (status) {
        case 0:
            var selStr = "我可以幫助你的武器進行破攻，當然你需要付出一點東西:\r\n\r\n#b#L1#[使用泰密硬幣]#k\r\n";
            cm.sendSimple(selStr);
            break;
        case 1:
            if (selection == 1) {
                con = parseInt(Math.max(cm.getLimitBreak() / 100000, 100) / 10);
                cm.sendSimple("嗯..根據當前武器的情況, \r\n#b#L1#使用#e#r" + con + "#k#n個泰密硬幣破攻#r100W#k\r\n#b#L12#使用#e#r" + (con * 12) + "#k#n個泰密硬幣破攻#r1500W#k");
            }
            break;
        case 2:
            var cost = con * selection;
            if (cm.getItemQuantity(4310085) >= cost) {
                var limit = 1000000 * (selection != 1 ? 15 : 1);
                if (cm.WeaponLimitBreak(limit)) {
                    cm.gainItem(4310085, -cost);
                    cm.sendOk("武器進行破攻完成.");
                } else {
                    cm.sendOk("請確認是否有佩戴武器或武器已經達到系統限制.");
                }
            } else {
                cm.sendOk("你確認你有#e#r" + cost + "#k#n個泰密硬幣.");
            }
            cm.dispose();
            break;
    }
}
