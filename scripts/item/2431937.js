/*  This is mada by Kent    
 *  This source is made by Funms Team
 *  功能：巨匠武器箱
 *  @Author Kent 
 */


var status = 0;
var psrw = Array(
        //這個為獲取物品   （ID, 數量）
        Array(1212077, 1),
        Array(1222072, 1),
        Array(1232071, 1),
        Array(1242076, 1),
        Array(1252058, 1),
        Array(1302285, 1),
        Array(1312162, 1),
        Array(1322213, 1),
        Array(1332235, 1),
        Array(1362099, 1),
        Array(1372186, 1),
        Array(1382220, 1),
        Array(1402204, 1),
        Array(1412144, 1),
        Array(1422149, 1),
        Array(1432176, 1),
        Array(1442232, 1),
        Array(1452214, 1),
        Array(1462202, 1),
        Array(1472223, 1),
        Array(1482177, 1),
        Array(1492188, 1),
        Array(1522103, 1),
        Array(1532106, 1),
        Array(1542075, 1),
        Array(1552075, 1)
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
            im.sendOk("請確背包裝備欄有空位，請先整理一下吧。");
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
