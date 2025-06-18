   //-----------------//
  //　Careless 製作  //
 // qq 50009219     //
//-----------------//
var status = 0;
var random = java.lang.Math.floor(Math.random() * 4);
var a = "#fEffect/CharacterEff/1082565/0/0#";  //餅乾兔子
var b = "#fEffect/CharacterEff/1112904/0/0#"; //彩色星星
var c = "#fEffect/CharacterEff/1003271/0/0#";  //紅色心心
var d = "#fEffect/CharacterEff/1112946/4/1#";  //鑽石
var e = "#fEffect/CharacterEff/1082229/0/0#";  //紅心
var f = "#fUI/Basic/LevelNo/0#"; //[1]+1
var j = "#fUI/Basic/LevelNo/1#"; //[1]+1
var h = "#fUI/Basic/LevelNo/2#"; //[1]+1
var i1 = "#fUI/Basic/LevelNo/3#"; //[1]+1
var g = "#fUI/Basic/LevelNo/4#"; //[1]+1
var k = "#fUI/Basic/LevelNo/5#"; //[1]+1
var l1 = "#fUI/Basic/LevelNo/6#"; //[1]+1
var xbydn = "";
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (cm.getEventCount("西班牙鬥牛") == 0) {
        xbydn = "#d0#k";
    } else {
        xbydn = "#r" + cm.getEventCount("西班牙鬥牛") + "#k";
    }
    if (status == 0 && mode == 0) {
        cm.dispose();
        //cm.openNpc(2470018);
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (cm.getMapId() == 180000001) {
        cm.sendOk("很遺憾，您因為違反用戶守則被禁止遊戲活動，如有異議請聯繫管理員.")
        cm.dispose();
    } else if (status == 0) {
        cm.sendNext("#e#d尊敬的[#r#h ##d]　 已驅趕牛牛：[ #r" + xbydn + "#d ]次\r\n這裡是給您準備的驅趕禮物 通過驅趕次數來進行兌換\r\n" + e + e + e + e + e + e + e + e + e + e + e + e + e + e + e + e + e + e + e + e + e + e + e + e + e + e + e + e + e + "\r\n\r\n#n#L0##i2431742# #z2431742#   #i2431481#x1  [#r驅趕-10-回#d  ]#l\r\n#L1##i2340000# 　說明：數量五個　 #i2431481#x3  [#r驅趕-20-回#d  ]#l\r\n#L2##i5062002# 　說明：數量15個　 #i2431481#x6  [#r驅趕-40-回#d  ]#l\r\n#L3##i1182006#　 說明：全屬性20　 #i2431481#x9  [#r驅趕-80-回#d  ]#l\r\n#L4##i1182006#　 說明：全屬性50　#i2431481#x13 [#r驅趕-150-回#d ]#l\r\n#L5##i2433247#　 說明：卷軸系列 　#i2431481#x20 [#r驅趕-250-回#d ]#l\r\n#L6##i2432069#　 說明：暴君系列 　#i2431481#x30 [#r驅趕-500-回#d ]#l\r\n#L7##i1003752#　 說明：#z1003752# 　#i2431481#x40 [#r驅趕-600-回#d ]#l\r\n");
    } else if (status == 1) {
        if (selection == 0) {
            if (cm.getEventCount("西班牙鬥牛") >= 10) {
                if (cm.getEventCount("鬥牛獎品")<= 0) {
                    cm.gainItem(2431742, 1)//4000楓點
                    cm.gainItem(2431481, 1)//巨大福袋
                    cm.setEventCount("鬥牛獎品");
                    cm.sendOk("#r#e\r\n\r\n恭喜您 ！您兌換了鬥牛獎勵\r\n請繼續加油 ！！");
                    cm.dispose();
                } else {
                    cm.sendOk("#r#e\r\n\r\n抱歉！領取失敗！請按照流程來");
                    cm.dispose();
                }
            } else {
                cm.sendOk("#r#e\r\n\r\n抱歉！您驅趕次數不夠！");
                cm.dispose();
            }

        } else if (selection == 1) {
            if (cm.getEventCount("西班牙鬥牛") >= 20) {
                if (cm.getEventCount("鬥牛獎品") == 1) {
                    cm.gainItem(2340000, 5)//祝福卷軸
                    cm.gainItem(2431481, 3)//巨大福袋
                    cm.setEventCount("鬥牛獎品");
                    cm.sendOk("#r#e\r\n\r\n恭喜您 ！您兌換了鬥牛獎勵\r\n請繼續加油 ！！");
                    cm.dispose();
                } else {
                    cm.sendOk("#r#e\r\n\r\n抱歉！領取失敗！請按照流程來");
                    cm.dispose();
                }
            } else {
                cm.sendOk("#r#e\r\n\r\n抱歉！您驅趕次數不夠！");
                cm.dispose();
            }

        } else if (selection == 2) {
            if (cm.getEventCount("西班牙鬥牛") >= 40) {
                if (cm.getEventCount("鬥牛獎品") == 2) {
                    cm.gainItem(5062002, 15)//高級神奇方塊
                    cm.gainItem(2431481, 3)//巨大福袋
                    cm.setEventCount("鬥牛獎品");
                    cm.sendOk("#r#e\r\n\r\n恭喜您 ！您兌換了鬥牛獎勵\r\n請繼續加油 ！！");
                    cm.dispose();
                } else {
                    cm.sendOk("#r#e\r\n\r\n抱歉！領取失敗！請按照流程來");
                    cm.dispose();
                }
            } else {
                cm.sendOk("#r#e\r\n\r\n抱歉！您驅趕次數不夠！");
                cm.dispose();
            }

        } else if (selection == 3) {
            if (cm.getEventCount("西班牙鬥牛") >= 80) {
                if (cm.getEventCount("鬥牛獎品") == 3) {
                    cm.gainItem(2431481, 9)//巨大福袋
                    var ii = cm.getItemInfo();
                    var timeStamp = java.lang.System.currentTimeMillis();
                    var expirationDate = timeStamp + 604800000;// 七天
                    var toDrop = ii.randomizeStats(ii.getEquipById(1182006)).copy(); // 生成一個Equip類 
                    toDrop.setExpiration(expirationDate);//時間
                    toDrop.setStr(20); //裝備力量
                    toDrop.setDex(20); //裝備敏捷
                    toDrop.setInt(20); //裝備智力
                    toDrop.setLuk(20); //裝備運氣
                    toDrop.setAcc(20); //命中率
                    toDrop.setMatk(20); //魔法攻擊
                    toDrop.setWatk(20); //攻擊攻擊 
                    toDrop.setEnhance(5); //星級
                    toDrop.setOwner("鬥牛勇士");//簽名
                    toDrop.setBossDamage(10);//Boss 攻擊百分比%
                    toDrop.setIgnorePDR(10);//無視怪物防禦
                    toDrop.setTotalDamage(10);//總傷害
                    toDrop.setAllStat(10);//所有屬性
                    //toDrop.setLimitBreak(100000000);//傷害上限
                    cm.addFromDrop(cm.getC(), toDrop, false);
                    cm.dispose();
                    cm.setEventCount("鬥牛獎品");
                    cm.sendOk("#r#e\r\n\r\n恭喜您 ！您兌換了鬥牛獎勵\r\n請繼續加油 ！！");
                    cm.dispose();
                } else {
                    cm.sendOk("#r#e\r\n\r\n抱歉！領取失敗！請按照流程來");
                    cm.dispose();
                }
            } else {
                cm.sendOk("#r#e\r\n\r\n抱歉！您驅趕次數不夠！");
                cm.dispose();
            }

        } else if (selection ==4) {
            if (cm.getEventCount("西班牙鬥牛") >= 150) {
                if (cm.getEventCount("鬥牛獎品") == 4) {
                    cm.gainItem(2431481, 13)//巨大福袋
                    var ii = cm.getItemInfo();
                    var timeStamp = java.lang.System.currentTimeMillis();
                    var expirationDate = timeStamp + 604800000;// 七天
                    var toDrop = ii.randomizeStats(ii.getEquipById(1182006)).copy(); // 生成一個Equip類 
                    toDrop.setExpiration(expirationDate);//時間
                    toDrop.setStr(50); //裝備力量
                    toDrop.setDex(50); //裝備敏捷
                    toDrop.setInt(50); //裝備智力
                    toDrop.setLuk(50); //裝備運氣
                    toDrop.setAcc(50); //命中率
                    toDrop.setMatk(50); //魔法攻擊
                    toDrop.setWatk(50); //攻擊攻擊 
                    toDrop.setEnhance(15); //星級
                    toDrop.setOwner("鬥牛勇士");//簽名
                    toDrop.setBossDamage(20);//Boss 攻擊百分比%
                    toDrop.setIgnorePDR(20);//無視怪物防禦
                    toDrop.setTotalDamage(20);//總傷害
                    toDrop.setAllStat(20);//所有屬性
                    //toDrop.setLimitBreak(1000000);//傷害上限
                    cm.addFromDrop(cm.getC(), toDrop, false);
                    cm.dispose();
                    cm.setEventCount("鬥牛獎品");
                    cm.sendOk("#r#e\r\n\r\n恭喜您 ！您兌換了鬥牛獎勵\r\n請繼續加油 ！！");
                    cm.dispose();
                } else {
                    cm.sendOk("#r#e\r\n\r\n抱歉！領取失敗！請按照流程來");
                    cm.dispose();
                }
            } else {
                cm.sendOk("#r#e\r\n\r\n抱歉！您驅趕次數不夠！");
                cm.dispose();
            }

        } else if (selection == 5) {
            if (cm.getEventCount("西班牙鬥牛") >= 250) {
                if (cm.getEventCount("鬥牛獎品") == 5) {
                    cm.gainItem(2431481, 20)//巨大福袋
                    cm.gainItem(2433247, 3)//卷軸系列
                    cm.setEventCount("鬥牛獎品");
                    cm.sendOk("#r#e\r\n\r\n恭喜您 ！您兌換了鬥牛獎勵\r\n請繼續加油 ！！");
                    cm.dispose();
                } else {
                    cm.sendOk("#r#e\r\n\r\n抱歉！領取失敗！請按照流程來");
                    cm.dispose();
                }
            } else {
                cm.sendOk("#r#e\r\n\r\n抱歉！您驅趕次數不夠！");
                cm.dispose();
            }

        } else if (selection == 6) {
            if (cm.getEventCount("西班牙鬥牛") >= 500) {
                if (cm.getEventCount("鬥牛獎品") == 6) {
                    cm.gainItem(2431481, 30)//巨大福袋
                    cm.gainItem(2432069, 1)//暴君箱子
                    cm.setEventCount("鬥牛獎品");
                    cm.sendOk("#r#e\r\n\r\n恭喜您 ！您兌換了鬥牛獎勵\r\n請繼續加油 ！！");
                    cm.dispose();
                } else {
                    cm.sendOk("#r#e\r\n\r\n抱歉！領取失敗！請按照流程來");
                    cm.dispose();
                }
            } else {
                cm.sendOk("#r#e\r\n\r\n抱歉！您驅趕次數不夠！");
                cm.dispose();
            }

        } else if (selection == 7) {
            if (cm.getEventCount("西班牙鬥牛") >= 600) {
                if (cm.getEventCount("鬥牛獎品") == 7) {
                    cm.gainItem(2431481, 40)//巨大福袋
                    var ii = cm.getItemInfo();
                    var toDrop = ii.randomizeStats(ii.getEquipById(1003752)).copy(); // 生成一個Equip類 
                    var timeStamp = java.lang.System.currentTimeMillis();
                    var expirationDate = timeStamp + 604800000;// 七天
                    cm.setLock(toDrop);//封印
                    toDrop.setStr(50); //裝備力量
                    toDrop.setDex(50); //裝備敏捷
                    toDrop.setInt(50); //裝備智力
                    toDrop.setLuk(50); //裝備運氣
                    toDrop.setAcc(50); //命中率
                    toDrop.setMatk(50); //魔法攻擊
                    toDrop.setWatk(50); //攻擊攻擊 
                    //toDrop.setEnhance(15); //星級
                    toDrop.setWdef(100);//物理防禦
                    toDrop.setMdef(100);//魔攻防禦
                    toDrop.setAvoid(100);//迴避率
                    //toDrop.setHands(4);//手技
                    toDrop.setSpeed(20);//移動速度
                    toDrop.setJump(10);//跳躍
                    toDrop.setOwner("鬥牛勇士");//簽名
                    toDrop.setBossDamage(20);//Boss 攻擊百分比%
                    toDrop.setIgnorePDR(20);//無視怪物防禦
                    toDrop.setTotalDamage(20);//總傷害
                    toDrop.setAllStat(20);//所有屬性
                    toDrop.setExpiration(expirationDate);
                    //toDrop.setLimitBreak(1000000);//傷害上限
                    cm.addFromDrop(cm.getC(), toDrop, false);
                    cm.dispose();
                    cm.setEventCount("鬥牛獎品");
                    cm.sendOk("#r#e\r\n\r\n恭喜您 ！您兌換了鬥牛獎勵\r\n請繼續加油 ！！");
                    cm.dispose();
                } else {
                    cm.sendOk("#r#e\r\n\r\n抱歉！領取失敗！請按照流程來");
                    cm.dispose();
                }
            } else {
                cm.sendOk("#r#e\r\n\r\n抱歉！您驅趕次數不夠！");
                cm.dispose();
            }

        }
    }
}