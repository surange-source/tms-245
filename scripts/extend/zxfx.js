/*
測試髮型臉型代碼
*/
var status = 0;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == -1) {
            cm.dispose();
        } else if (status == 0) {
            cm.sendGetNumber("請輸入髮型或臉型代碼：",0, 0, 999999);
        } else if (status == 1) {
            cm.gainItem(5150052, 1, 1);
            cm.setAvatar(5150052, selection);
            cm.sendOk("好了，快看看");
            cm.dispose();
        }
    }//mode
}//f