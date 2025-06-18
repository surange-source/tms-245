
var status = 0;
var typede = 0;
var zyms0 = new Array(1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 100, 200, 300, 400, 500, 600, 700, 800, 900, 100, 200, 300, 400, 500, 600, 700, 800, 900);
var zymss0 = Math.floor(Math.random() * zyms0.length);

var zyms1 = new Array(10, 20, 30, 40, 50, 60, 70, 100, 80, 90, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 110, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17);//隨機愛心寶石
var zymss1 = Math.floor(Math.random() * zyms1.length);

var zyms2 = new Array(1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10);//隨機方塊
var zymss2 = Math.floor(Math.random() * zyms2.length);


var zymsvip2 = new Array(1010, 1100, 1210, 1310, 1410, 1510, 1610, 1710, 1810, 1910, 1010, 1110, 1210, 1310, 1410, 1510, 1610, 1710, 1810, 1910, 2010);//VIP2隨機樂豆點
var zymssvip2 = Math.floor(Math.random() * zymsvip2.length);

var zymsvip3 = new Array(1020, 1220, 1220, 1420, 1420, 1520, 1620, 1720, 1820, 1920, 1020, 1120, 1220, 1320, 1420, 1520, 1620, 1720, 1820, 1920, 2020, 3020);//VIP3隨機樂豆點
var zymssvip3 = Math.floor(Math.random() * zymsvip3.length);

var zymsvip4 = new Array(1030, 1130, 1230, 1330, 1430, 1530, 1630, 1730, 1830, 1930, 1060, 1130, 1230, 1330, 1430, 1530, 1630, 1730, 1830, 1930, 2030, 3030, 4030);//VIP4隨機樂豆點
var zymssvip4 = Math.floor(Math.random() * zymsvip4.length);

var zymsvip5 = new Array(1040, 1140, 1240, 1340, 1440, 1540, 1640, 1740, 1840, 1940, 1040, 1140, 1240, 1340, 1440, 1540, 1640, 1740, 1840, 1940, 2040, 3040, 4040, 5040);//VIP5隨機樂豆點
var zymssvip5 = Math.floor(Math.random() * zymsvip5.length);

var zymsvip6 = new Array(1050, 1150, 1250, 1350, 1450, 1550, 1650, 1750, 1850, 1950, 1050, 1150, 1250, 1350, 1450, 1550, 1650, 1750, 1850, 1950, 2050, 3050, 4050, 5050, 6050);//VIP6隨機樂豆點
var zymssvip6 = Math.floor(Math.random() * zymsvip6.length);

var zymsvip7 = new Array(1060, 1160, 1260, 1360, 1460, 1560, 1660, 1760, 1860, 1960, 1060, 1160, 1260, 1360, 1460, 1560, 1660, 1760, 1860, 1960, 2060, 3060, 4060, 5060, 6060, 7060);//VIP7隨機樂豆點
var zymssvip7 = Math.floor(Math.random() * zymsvip7.length);





function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        if (status == 0) {
            var zyms = "";
            zyms = "#fMob/1210102.img/move/0##fMob/1210102.img/move/0##b追憶 - MS#fMob/1210102.img/move/0##fMob/1210102.img/move/0#\r\n#k辦理VIP後, 可以每天找我領取福利。\r\n#rVIP2#k以上有方塊領取哦。\r\n\r\n#r注意:領取福利前最好是保持背包每個欄位有2個以上的空間。負責失去物品概不負責。\r\n\r\nVIP等級: #r" + cm.getVipLevel() + "\r\n";
            zyms += "#L1##b領取VIP每日福利#l\r\n\r\n";

            cm.sendSimple(zyms);

        } else if (selection == 1) { 
            if (cm.getBossLog("VIP福利") == 0) {
                cm.sendOk("VIP專屬福利。\r\n\r\n每天只可以領取一次。");
            } else if (cm.getVipLevel() == 1) {
                cm.setBossLog("VIP福利");
                cm.gainNX(zyms0[zymss0]);
                cm.gainItem(4001465, zyms0[zymss1]);//隨機愛心寶石
                cm.sendOk("領取成功, 祝您遊戲開心愉快。");
                cm.worldSpouseMessage(0x20, "玩家 " + cm.getChar().getName() + " 領取了VIP1福利, 獲得了" + zyms0[zymss0] + "樂豆點 " + zyms1[zymss1] + "個愛心寶石。");

            } else if (cm.getVipLevel() == 2) {
                cm.setBossLog("VIP福利");
                cm.gainNX(zymsvip2[zymssvip2]);//隨機樂豆點
                cm.gainItem(4001465, zyms1[zymss1]);//隨機愛心寶石
                cm.gainItem(5062000, zyms2[zymss2]);//隨機神奇方塊
                cm.sendOk("領取成功, 祝您遊戲開心愉快。");
                cm.worldSpouseMessage(0x20, "玩家 " + cm.getChar().getName() + " 領取了VIP2福利, 獲得了" + zymsvip2[zymssvip2] + "樂豆點 愛心寶石x" + zyms1[zymss1] + " 神奇方塊x" + zyms2[zymss2] + "。");


            } else if (cm.getVipLevel() == 3) {
                cm.setBossLog("VIP福利");
                cm.gainNX(zymsvip3[zymssvip3]);//隨機樂豆點
                cm.gainItem(4001465, zyms1[zymss1]);//隨機愛心寶石
                cm.gainItem(5062000, zyms2[zymss2]);//隨機神奇方塊
                cm.gainItem(5062002, zyms2[zymss2]);//隨機高級神奇方塊
                cm.sendOk("領取成功, 祝您遊戲開心愉快。");
                cm.worldSpouseMessage(0x20, "玩家 " + cm.getChar().getName() + " 領取了VIP3福利, 獲得了" + zymsvip3[zymssvip3] + "樂豆點 愛心寶石x" + zyms1[zymss1] + " 神奇方塊x" + zyms2[zymss2] + " 高級神奇方塊x" + zyms2[zymss2] + "。");

            } else if (cm.getVipLevel() == 4) {
                cm.setBossLog("VIP福利");
                cm.gainNX(zymsvip4[zymssvip4]);//隨機樂豆點
                cm.gainItem(4001465, zyms1[zymss1]);//隨機愛心寶石
                cm.gainItem(5062000, zyms2[zymss2]);//隨機神奇方塊
                cm.gainItem(5062002, zyms2[zymss2]);//隨機高級神奇方塊
                cm.sendOk("領取成功, 祝您遊戲開心愉快。");
                cm.worldSpouseMessage(0x20, "玩家 " + cm.getChar().getName() + " 領取了VIP4福利, 獲得了" + zymsvip4[zymssvip4] + "樂豆點 愛心寶石x" + zyms1[zymss1] + " 神奇方塊x" + zyms2[zymss2] + " 高級神奇方塊x" + zyms2[zymss2] + "。");

            } else if (cm.getVipLevel() == 5) {
                cm.setBossLog("VIP福利");
                cm.gainNX(zymsvip5[zymssvip5]);//隨機樂豆點
                cm.gainItem(4001465, zyms1[zymss1]);//隨機愛心寶石
                cm.gainItem(5062000, zyms2[zymss2]);//隨機神奇方塊
                cm.gainItem(5062002, zyms2[zymss2]);//隨機高級神奇方塊
                cm.sendOk("領取成功, 祝您遊戲開心愉快。");
                cm.worldSpouseMessage(0x20, "玩家 " + cm.getChar().getName() + " 領取了VIP5福利, 獲得了" + zymsvip5[zymssvip5] + "樂豆點 愛心寶石x" + zyms1[zymss1] + " 神奇方塊x" + zyms2[zymss2] + " 高級神奇方塊x" + zyms2[zymss2] + "。");


            } else if (cm.getVipLevel() == 6) {
                cm.setBossLog("VIP福利");
                cm.gainNX(zymsvip6[zymssvip6]);//隨機樂豆點
                cm.gainItem(4001465, zyms1[zymss1]);//隨機愛心寶石
                cm.gainItem(5062000, zyms2[zymss2]);//隨機神奇方塊
                cm.gainItem(5062002, zyms2[zymss2]);//隨機高級神奇方塊
                cm.sendOk("領取成功, 祝您遊戲開心愉快。");
                cm.worldSpouseMessage(0x20, "玩家 " + cm.getChar().getName() + " 領取了VIP6福利, 獲得了" + zymsvip6[zymssvip6] + "樂豆點 愛心寶石x" + zyms1[zymss1] + " 神奇方塊x" + zyms2[zymss2] + " 高級神奇方塊x" + zyms2[zymss2] + "。");

            } else if (cm.getVipLevel() == 7) {
                cm.setBossLog("VIP福利");
                cm.gainNX(2, zymsvip7[zymssvip7]);//隨機樂豆點
                cm.gainItem(4001465, zyms1[zymss1]);//隨機愛心寶石
                cm.gainItem(5062000, zyms2[zymss2]);//隨機神奇方塊
                cm.gainItem(5062002, zyms2[zymss2]);//隨機高級神奇方塊
                cm.gainItem(5062006, zyms2[zymss2]);//隨機白金神奇方塊
                cm.sendOk("領取成功, 祝您遊戲開心愉快。");
                cm.worldSpouseMessage(0x20, "玩家 " + cm.getChar().getName() + " 領取了VIP7福利, 獲得了" + zymsvip7[zymssvip7] + "樂豆點 愛心寶石x" + zyms1[zymss1] + " 神奇方塊x" + zyms2[zymss2] + " 高級神奇方塊x" + zyms2[zymss2] + " 白金神奇方塊x" + zyms2[zymss2] + "。");







            } else {
                cm.sendOk("你還沒有辦理VIP。\r\n\r\n請辦理VIP後在來領取。");
            }
            cm.dispose();




        }
    }
}
