/*      
 * 
 *  功能：黃金鵝蛋
 *  
 */


var status = 0;
var psrw = Array(
        //這個為獲取物品   （ID, 數量）
        Array(2049100, 1),
        Array(2049133, 1),
        Array(2049122, 1),
        Array(2049603, 1),
        Array(2049009, 1),
        Array(2049500, 1),
        Array(2049419, 1),
        Array(2048306, 1),
        Array(2000005, 200),
        Array(2000037, 200),
        Array(2000036, 200),
        Array(2530000, 1),
        Array(2022794, 1),
        Array(2022795, 1),
        Array(2022796, 1),
        Array(2022797, 1),
        Array(2022798, 1),
        Array(2022799, 1)
        );
//取隨機  每一個物品獲取到的概率都是一樣的。
var rand = Math.floor(Math.random() * psrw.length);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0) {
        im.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        var mapid = im.getMapId();
        //判斷背包的空間  1 — 5 對應的是 裝備 — 特殊
        if (im.getSpace(1) < 1) {
            im.sendOk("背包裝備欄需要有空位，請先整理一下吧。");
            im.dispose();
            return;
        }
        var ii = im.getItemInfo();
        im.gainItem(2431762, -1);
        im.gainItem(psrw[rand][0], +psrw[rand][1]); //隨機這個道具 還有數量
        //這個為伺服器公告
        //im.worldSpouseMessage(0x18, "『每日尋寶』" + "[" + im.getChar().getName() + "] 打開里諾赫的黃金袋子獲得了" + psrw[rand][1] + "個<" + ii.getName(psrw[rand][0]) + ">, 大家快去尋寶吧！");
        im.dispose();
    }
}
