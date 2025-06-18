/*  This is mada by Kent    
 *  This source is made by Funms Team
 *  功能：彩虹箱
 *  @Author Kent 
 */


var status = 0;
var psrw = Array(
        //這個為獲取物品   （ID, 數量）
        Array(2470013, 1), 
        Array(2049406, 1), 
        Array(2048213, 1),
        Array(1032195, 1),
        Array(2040359, 1),
        Array(2040360, 1),
        Array(2040361, 1),
        Array(2040362, 1),
        Array(2040363, 1),
        Array(2040364, 1),
        Array(2000005, 20),
        Array(2000037, 20),
        Array(2000036, 20),
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
        if (im.getSpace(1) < 1 || im.getSpace(2) < 1 || im.getSpace(3) < 1 || im.getSpace(4) < 1 || im.getSpace(5) < 1) {
            im.sendOk("請確保你背包的每一欄都有空位，請先整理一下吧。");
            im.dispose();
            return;
        }
        var ii = im.getItemInfo();
        im.used(1);//這個為消耗掉這個道具  參數是消耗的數量   如果數量大於 1  還要先判斷 是否擁有這麼多個數量的道具
        im.gainItem(psrw[rand][0], +psrw[rand][1]); //隨機這個道具 還有數量
        //這個為伺服器公告
        //im.worldSpouseMessage(0x18, "『每日尋寶』" + "[" + im.getChar().getName() + "] 打開里諾赫的黃金袋子獲得了" + psrw[rand][1] + "個<" + ii.getName(psrw[rand][0]) + ">, 大家快去尋寶吧！");
        im.dispose();
    }
}
