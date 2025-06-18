var status = 0;
var z = "#fUI/UIWindow/Quest/icon5/1#";//"+z+"//美化
var typed = 0;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        var selStr = "#e親愛的 #g#h0##k, 歡迎來到 #r糖糖楓之谷萌新指引系統#k\r\n\r\n";
        selStr += "#b以下是TWD玩家可供選擇的服務#k\r\n那麼請您選擇您所需要的服務：\r\n";
        selStr += "        "+"#L1#>>#r如何快速升級#k<<#l\r\n";
        selStr += "        "+"#L2#>>#d如何提高面板#k<<#l\r\n";
        selStr += "       "+"#L3#>>#g如何賺錢、獲取方塊#k<<#l\r\n";
        selStr += "    "+"#L4#>>#b如何花費餘額使得利益最大化#k<<#l\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 1:
        cm.dispose();      
    cm.openNpc(9310378, "kuaisushengji");
            break;
        case 2:     
        cm.dispose();      
    cm.openNpc(9310378, "tigaomianban");
            break;
        case 3:
    cm.sendOk("GM還在玩命兒完善中，請相信我們！");
        cm.dispose();
            break;
        case 4:
    cm.sendOk("GM還在玩命兒完善中，請相信我們！");
        cm.dispose();
            break;

        }
    } 
}