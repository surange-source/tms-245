function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 0 && mode == 0) {
            cm.dispose();
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            cm.sendYesNo("這個地方經常有變異的蜈蚣出現，為了確保人民群眾的安全，我們警察幾乎都出動來維護這個地圖。\r\n\r\n\r\n#r如果再繼續往前進那將會很危險，你已經做好準備了嗎？#k");
        } else if (status == 1) {
           if (cm.haveItem(4031289,1)) {
               cm.warp(701010321,0);
               cm.dispose();
           } else {
               cm.sendOk("對不起！我不能讓你進去。你必須要在雜貨商店購買 獲得 #v4031289# 我才可以讓你進去。");
               cm.dispose();
           }
       }
    }
}