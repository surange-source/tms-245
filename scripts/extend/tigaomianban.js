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
        selStr += "#b請選擇您當前的面板範疇：#k\r\n";
        selStr += "#L1#【 0 -200W】\r\n#d#L2#【200-500W】#k\r\n#b#L3#【500-1000W】#k\r\n";
        selStr += "#r#L4#【1000-2000W】#k\r\n#g#L5#【2000-5000W】#k\r\n#L6#【5000-9999W】#k\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 1:
        cm.dispose();      
    cm.openNpc(9310378, "0-200W");
            break;
        case 2:
        cm.dispose();      
    cm.openNpc(9310378, "200-500W");
            break;
        case 3:
        cm.dispose();      
    cm.openNpc(9310378, "500-1000W");
            break;
        case 4:
        cm.dispose();      
    cm.openNpc(9310378, "1000-2000W");
            break;
        case 5:
        cm.dispose();      
    cm.openNpc(9310378, "2000-5000W");
            break;
        case 6:
        cm.dispose();      
    cm.openNpc(9310378, "5000-9999W");
            break;

        }
    } 
}