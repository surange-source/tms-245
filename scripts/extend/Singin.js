/*      
 *  
 *  功能：簽到
 *  
 */

var a = 0;
var luckyItem = Array();
var selectedItem;
var needOnlineTime = 20;//需要在線時間


function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
            if (cm.getOnlineTime() < needOnlineTime) {
                cm.sendNextS("當前在線時間不足#r" + needOnlineTime + "#k分鐘,無法進行簽到,\r\n 請#r" + (needOnlineTime - cm.getOnlineTime()) + "#k分鐘後再試.", 3);
                cm.dispose();
                return;
            } else if (!cm.Singin()) {
                cm.sendNextS("今天已經簽到過啦。\r\n當前已經連續簽到：" + cm.getSinginCount() + "天。\r\n記得明天再來簽到喲。連續簽到可以領取特別的禮包喲", 3);
                cm.dispose();
                return;
            }
            cm.sendOk("OK，你已經簽到好啦！");
            cm.dispose();
        }
    }
}