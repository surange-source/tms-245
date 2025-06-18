/*  This is mada by Kent    
 *  This source is made by Funms Team
 *  功能：道具通用模版
 *  @Author Kent 
 */


var status = 0;
var psrw = Array(
        //這個為獲取物品   （ID, 數量）
        Array(2049130, 1), //正義混沌卷40%
        Array(2049137, 1), //驚人正義混沌卷40%
        Array(5062000, 5),
        Array(5062000, 2),
        Array(5062000, 1),
        Array(5062002, 1),
        Array(5062002, 2),
        Array(5062002, 3),
        Array(5062002, 5),
        Array(2340000, 1),
        Array(2340000, 2),
        Array(2340000, 3),
        Array(2340000, 5),
        Array(5064000, 1),
        Array(5064000, 2),
        Array(5064000, 3),
        Array(5064000, 5),
        Array(5062500, 1),
        Array(5062500, 2),
        Array(5062500, 3),
        Array(5062500, 5),
        Array(5390018, 1),
        Array(5390000, 10),
        Array(5390001, 10),
        Array(5390002, 10),
        Array(5390002, 5),
        Array(5390001, 5),
        Array(5390000, 5),
        Array(4001714, 1),
        Array(4001784, 1),
        Array(4001785, 1),
        Array(4310036, 10),
        Array(4310036, 20),
        Array(4310036, 30),
        Array(4310036, 50),
        Array(4310036, 100),
        Array(1112915, 1),
        Array(1402199, 1),
        Array(1232060, 1),
        Array(1222061, 1),
        Array(1212066, 1),
        Array(1242065, 1),
        Array(1302277, 1),
        Array(1322205, 1),
        Array(1332227, 1),
        Array(1372179, 1),
        Array(1382211, 1),
        Array(1422142, 1),
        Array(1432169, 1),
        Array(1442225, 1),
        Array(1452207, 1),
        Array(1462195, 1),
        Array(1472216, 1),
        Array(1482170, 1),
        Array(1492181, 1),
        Array(1522096, 1),
        Array(1532100, 1),
        Array(1252065, 1),
        Array(1362092, 1),
        Array(2431944, 1), //140 武器
        Array(2431945, 1), //140防具
        Array(3015002, 1), //七彩摩天輪
        Array(1003422, 1), //石榴石渡鴉面具
        Array(1662027, 1), //銀河劍士
        Array(1662032, 1), //女妖機器人
        Array(2432069, 1), //暴君
        Array(2431988, 1), //150
        Array(1672027, 1), //極真鋰心臟
        Array(2430030, 1), //2430030
        Array(3010832, 1) //太陽椅子
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
            im.sendOk("找到了寶藏！但是你要保證你背包的每一欄都有空位，請先整理一下吧。");
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
