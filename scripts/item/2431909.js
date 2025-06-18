/*  70級武器箱 */
var status;

var kongwei;
var itemss;
var text0 = " ";
var dis = 3;
var 閃亮克魯 = 1212082;
var 靈魂射手 = 1222077;
var 魔劍 = 1232077;
var 能量劍 = 1242083;
var 幻獸棍棒 = 1252051;
var 單手劍 = 1302188;
var 單手斧 = 1312084;
var 單手棍 = 1322118;
var 短劍 = 1332164;
var 手杖 = 1362052;
var 短杖 = 1372113;
var 長杖 = 1382138;
var 雙手斧 = 1412083;
var 雙手劍 = 1402125;
var 雙手棍 = 1422085;
var 槍 = 1432112;
var 矛 = 1442150;
var 弓 = 1452143;
var 弩 = 1462132;
var 拳套 = 1472155;
var 指虎 = 1482116;
var 火槍 = 1492115;
var 雙弩槍 = 1522034;
var 加農砲 = 1532051;
var 太刀 = 1542052;
var 扇子 = 1552052;
var ESP限製器 = 1262004;
var zbDataA = Array(
        Array(雙手劍 + dis, 1, 11), //英雄 OK
        Array(單手劍 + dis, 1, 11), //英雄 OK
        Array(單手斧 + dis, 1, 11), //英雄 OK
        Array(雙手斧 + dis, 1, 11), //英雄 OK
        Array(雙手劍 + dis, 1, 12), //聖騎士 OK
        Array(單手劍 + dis, 1, 12), //聖騎士 OK
        Array(單手棍 + dis, 1, 12), //聖騎士 OK
        Array(雙手棍 + dis, 1, 12), //聖騎士 OK
        Array(槍 + dis, 1, 13), //黑騎士
        Array(矛 + dis, 1, 13), //黑騎士 OK
        Array(長杖 + dis, 1, 21), //火毒 OK
        Array(短杖 + dis, 1, 21), //火毒 OK
        Array(長杖 + dis, 1, 22), //冰雷
        Array(短杖 + dis, 1, 22), //冰雷
        Array(長杖 + dis, 1, 23), //主教
        Array(短杖 + dis, 1, 23), //主教
        Array(弓 + dis, 1, 31), //弓箭手 OK
        Array(弩 + dis, 1, 32), //弩手 OK
        Array(拳套 + dis, 1, 41), //標飛 OK
        Array(短劍 + dis, 1, 42), //刀飛 OK
        Array(短劍 + dis, 1, 43), //影武者 OK
        Array(指虎 + dis, 1, 51), //打手 OK
        Array(火槍 + dis, 1, 52), //槍手 OK
        Array(加農砲 + dis, 1, 53), //重砲指揮官 OK
        Array(火槍 + dis, 1, 57)//傑特 OK
        );
var zbDataB = Array(
        Array(雙手劍 + dis, 1, 11), //聖魂劍士 OK
        Array(單手劍 + dis, 1, 11), //聖魂劍士 OK
        Array(長杖 + dis, 1, 12), //烈焰巫師 OK
        Array(短杖 + dis, 1, 12), //烈焰巫師 OK
        Array(弓 + dis, 1, 13), //破風使者 OK
        Array(拳套 + dis, 1, 14), //暗夜行者 OK
        Array(指虎 + dis, 1, 15), //閃雷悍將 OK
        Array(矛 + dis, 1, 21), //狂狼勇士 OK
        Array(長杖 + dis, 1, 22), //龍魔導士 OK
        Array(短杖 + dis, 1, 2), //龍魔導士 OK
        Array(雙弩槍 + dis, 1, 23), //精靈遊俠 OK
        Array(手杖 + dis, 1, 24), //幻影俠盜 OK
        Array(指虎 + dis, 1, 25), //隱月 OK
        Array(閃亮克魯 + dis, 1, 27), //夜光  25 30 沒有武器
        Array(長杖 + dis, 1, 32), //喚靈斗師
        Array(弩 + dis, 1, 33), //狂豹獵人
        Array(火槍 + dis, 1, 35), //機甲戰神
        Array(能量劍 + dis, 1, 36), //傑諾 25 30 沒有武器
        Array(太刀 + dis, 1, 41), //劍豪
        Array(扇子 + dis, 1, 42), //陰陽師
        Array(單手劍 + dis, 1, 51), //米哈逸
        Array(雙手劍 + dis, 1, 61), //凱撒
        Array(靈魂射手 + dis, 1, 65), //天使破壞者  25 30 沒有武器
        //Array(4001714 + dis, 1, 101), //神之子
        Array(幻獸棍棒 + dis, 1, 112), //林之靈 30
        Array(雙手劍 + dis, 1, 131), //皮卡啾 OK
        Array(單手劍 + dis, 1, 131), //皮卡啾 OK
        Array(單手斧 + dis, 1, 131), //皮卡啾 OK
        Array(雙手斧 + dis, 1, 131), //皮卡啾 OK
        Array(雙手劍 + dis, 1, 131), //皮卡啾 OK
        Array(單手劍 + dis, 1, 131), //皮卡啾 OK
        Array(單手棍 + dis, 1, 131), //皮卡啾 OK
        Array(雙手棍 + dis, 1, 131), //皮卡啾 OK
        Array(ESP限製器, 1, 142) //凱內西斯 OK
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