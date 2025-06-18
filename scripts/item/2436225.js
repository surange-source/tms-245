var status = 0;
var z = "#fUI/UIWindow/Quest/icon5/1#";//"+z+"//美化
var typed = 0;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        im.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        var selStr = "#e親愛的 #g#h0##k, 歡迎來到 #r糖糖楓之谷萌新指引系統#k\r\n\r\n";
        selStr += "#b在這裡，我將為您講解所有糖服特色功能祝您輕鬆度過新手階段！#k\r\n那麼請您選擇您所需要的服務：\r\n";
        selStr += "        "+"#L1#>>#r儲值玩家#k<<#l\r\n\r\n";
        selStr += "        "+"#L2#>>#d非儲值玩家#k<<#l\r\n";



        im.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 1:
        im.dispose();      
    im.openNpc(9310378, "TWDwanfa");
            break;
        case 2:
        im.dispose();      
    im.openNpc(9310378, "feiTWDwanfa");
            break;

        }
    } 
}