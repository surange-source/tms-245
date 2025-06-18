/*  20級武器箱 */

var status;

var kongwei;
var itemss;
var text0 = " ";
var zbDataA = Array(
        Array(1402121, 1, 11), //英雄
        Array(1302184, 1, 11), //英雄
        Array(1312080, 1, 11), //英雄
        Array(1412079, 1, 11), //英雄

        Array(1402121, 1, 12), //英雄
        Array(1302184, 1, 12), //英雄
        Array(1322115, 1, 12), //聖騎士
        Array(1422081, 1, 12), //聖騎士

        Array(1432024, 1, 13), //黑騎士
        Array(1442092, 1, 13), //黑騎士

        Array(1382134, 1, 21), //火毒
        Array(1372022, 1, 21), //火毒

        Array(1382134, 1, 22), //冰雷
        Array(1372022, 1, 22), //冰雷

        Array(1382134, 1, 23), //主教
        Array(1372022, 1, 23), //主教

        Array(1452139, 1, 31), //弓箭手
        Array(1462028, 1, 32), //弩手
        Array(1472800, 1, 41), //標飛
        Array(1332033, 1, 42), //刀飛
        Array(1332033, 1, 43), //影武者
        Array(1482053, 1, 51), //打手
        Array(1492053, 1, 52), //槍手
        Array(1532047, 1, 53), //重砲指揮官
        Array(1492053, 1, 57)//傑特
        );
var zbDataB = Array(
        Array(1402121, 1, 11), //聖魂劍士
        Array(1302184, 1, 11), //聖魂劍士

        Array(1382134, 1, 12), //烈焰巫師
        Array(1372022, 1, 12), //烈焰巫師

        Array(1452139, 1, 13), //破風使者

        Array(1472800, 1, 14), //暗夜行者

        Array(1482053, 1, 15), //閃雷悍將

        Array(1442092, 1, 21), //狂狼勇士

        Array(1382134, 1, 22), //龍魔導士
        Array(1372022, 1, 2), //龍魔導士

        Array(1522030, 1, 23), //精靈遊俠

        Array(1362048, 1, 24), //幻影俠盜

        Array(1482053, 1, 25), //隱月

        Array(1212081, 1, 27), //夜光

        Array(1382134, 1, 32), //喚靈斗師

        Array(1462028, 1, 33), //狂豹獵人

        Array(1492053, 1, 35), //機甲戰神

        Array(1242082, 1, 36), //傑諾
        Array(1542050, 1, 41), //劍豪
        Array(1552050, 1, 42), //陰陽師
        Array(1302184, 1, 51), //米哈逸
        Array(1402121, 1, 61), //凱撒
        Array(1222076, 1, 65), //天使破壞者
        //Array(4001714, 1, 101), //神之子
        Array(1252049, 1, 112), //林之靈
        Array(1402121, 1, 131), //皮卡啾
        Array(1302184, 1, 131) //皮卡啾
        );
var zbDataN = Array();

function start() {
    status = -1;
    item = im.getItemId();
    action(1, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        im.dispose();
    } else {
        if (mode == 0) {
            im.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            lvs = im.getPlayer().getLevel();
            var jobs = parseInt(im.getJobId() < 1000 ? im.getJobId() / 10 : im.getJobId() / 100);
            if (im.getJobId() >= 1000) {
                for (var i = 0; i < zbDataB.length; i++) {
                    if (zbDataB[i][2] == jobs) {
                        zbDataN.push(zbDataB[i]);
                        text0 += "\r\n#b#i" + zbDataB[i][0] + ":# #t" + zbDataB[i][0] + "#";
                    }
                }
            } else {
                for (var i = 0; i < zbDataA.length; i++) {
                    if (zbDataA[i][2] == jobs) {
                        zbDataN.push(zbDataA[i]);
                        text0 += "\r\n#b#i" + zbDataA[i][0] + ":# #t" + zbDataA[i][0] + "#";
                    }
                }
            }
            im.sendYesNo("#r#d#h ##k您是否要打開 #b#i" + item + ":# #t" + item + "# #k?\r\n#d您將會獲得以下其中一個物品：\r\n" + text0 + "\r\n");
        } else if (status == 1) {
            kongwei = 1;
            if (im.getSpace(1) >= kongwei && im.used()) {
                var random = new java.util.Random();
                var finalchance = random.nextInt(zbDataN.length);
                var itemID = zbDataN[finalchance][0];
                var count = zbDataN[finalchance][1];
                im.gainItem(itemID, count);
                im.sendOk("#d#h ##k 我已經把 #b#i" + item + ":# #t" + item + "# #k 裡的物品：\r\n#b#i" + itemID + ":# #t" + itemID + "#\r\n#k發送到您的 #r背包#k 裡！\r\n#r請注意查看！ ");
                im.dispose();
            } else {
                im.sendOk("您的 #r裝備欄#k 空間沒有#r#e " + kongwei + " #n#k個空位！無法獲得 #b#i" + item + ":# #t" + item + "# #k 裡的以下物品:" + text0);
                im.dispose();
            }
        }
    }
}
/*var status = 0;
 
 function start() {
 status = -1;
 action(1, 0);
 }
 
 function action(mode, type, selection) {
 if (mode == 0) {
 im.dispose();
 return;
 } else {
 status++;
 }
 if (status == 0) {
 if (im.giveWeaponByLevel(20)) {
 im.used(1);
 }
 im.dispose();
 }
 }*/
