//伏特加製作
var status = 0;
var z = "#fUI/UIWindow/Quest/icon5/1#";//"+z+"//美化
var kkk ="#fEffect/CharacterEff/1051296/1/0#";


function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        im.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        var selStr = " ";
        selStr += "       ";
        selStr += "             #r#L3#神秘地圖#k#l\r\n\r\n";
        //selStr += "#r#L0#"+z+" 查看怪物爆率#l \r\n";
        //selStr += "#r#L3#"+z+" 地圖傳送#l  #L4#"+z+" 強化裝備#l  #L5#"+z+" 固定裝備#l\r\n";
        //selStr += "#L6#"+z+" 副本重置#l  #L7#"+z+" 傳送副本#l  #L8#"+z+" 購買BUFF#l\r\n";
        //selStr += "#L9#"+z+" 三倍經驗#l  #L10#"+z+" 領取雙爆#l  #L11#"+z+" 每日方塊#l\r\n";
        //selStr += "               #g#L99999#(看圖清除道具)#k#l\r\n   #L2014#歡樂大雜燴#k#l  #r#L2015#專屬簽到#k#l     #L2016#召喚BOSS ";
        selStr += " ";


        im.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
        im.dispose();
        im.openNpc(9010000, 1);//極品裝備
            break;
        case 1:
         im.dispose();
        im.openNpc(2084001, 1);//技能管理
            break;
        case 2:
           if (im.getPlayer().getCSPoints(1) > 10000) { //增加血量
                im.dispose();
                im.openNpc(2084001,2);
            } else {
                im.sendOk("您糊弄我呢。樂豆點不足還點什麼。最少得擁有1萬樂豆點才可以使用。");
                im.dispose();
            }
            break;
        case 3:
        im.dispose();
        im.warp(970000000, 0);
            break;
        case 4:
        im.dispose();
        im.openNpc(2084001, 4);//強化裝備
            break;
        case 5:
        im.dispose();
        im.openNpc(2084001, 5);//固定裝備
            break;
        case 7:
        im.dispose();
        im.openNpc(2084001, 7);//BOSS副本
        case 8:
        im.dispose();
        im.openNpc(2084001, 8);//BUFF
            break;
        case 999:
        im.dispose();
        im.openNpc(2084001, 999);//GM刷道具
            break;
        case 9:
           if (im.getBossLog("三倍") < 1) { //三倍
                im.gainItem(5211060,1,1);
                im.setBossLog("三倍");
                im.sendOk("恭喜您領取VIP服務的每日三倍經驗卡一張.");
                im.worldSpouseMessage(0x20,"『隨身服務』 ：玩家 "+ im.getChar().getName() +" 在隨身NPC裡領取每日三倍經驗卡。");
                im.dispose();
            } else {
                im.sendOk("您已經領取過，請明日再領。");
                im.dispose();
            }
            break;
        case 10:
           if (im.getBossLog("雙爆") < 1) { //雙爆
                im.gainItem(5360015,1,1);
                im.setBossLog("雙爆");
                im.sendOk("恭喜您領取VIP服務的每日雙倍爆率卡一張.");
                im.worldSpouseMessage(0x20,"『隨身服務』 ：玩家 "+ im.getChar().getName() +" 在隨身NPC裡領取每日雙倍爆率卡。");
                im.dispose();
            } else {
                im.sendOk("您已經領取過，請明日再領。");
                im.dispose();
            }
            break;
        case 11:
           if (im.getBossLog("方塊") < 1) { //方塊
                im.gainItem(5064000,3);
        im.gainItem(2340000,3);
        im.gainItem(5062500,3);
                im.gainItem(5062002,3);
                im.setBossLog("方塊");
                im.sendOk("恭喜您領取理財服務的每日理財道具，獲得高級神奇方塊、大師級神奇方塊、防暴捲軸、祝福卷軸x3。");
                im.worldSpouseMessage(0x20,"『隨身服務』 ：玩家 "+ im.getChar().getName() +" 在隨身NPC裡領取每日理財道具。");
                im.dispose();
            } else {
                im.sendOk("失敗：\r\n\r\n#r1). 您已經領取過，請明日再領。");
                im.dispose();
            }
            break;
        case 11:
           if (im.getBossLog("里程") < 1 && im.getPlayerPoints() > 180) { //里程
                im.gainPlayerPoints(200);
                im.setBossLog("里程");
                im.sendOk("恭喜您領取VIP服務的每日里程200點.");
                im.worldSpouseMessage(0x20,"『隨身服務』 ：玩家 "+ im.getChar().getName() +" 在隨身NPC裡領取每日里程 200 點。");
                im.dispose();
            } else {
                im.sendOk("失敗：\r\n\r\n#r1). 您已經領取過，請明日再領。\r\n2). 您當前在線時間不足180分鐘。");
                im.dispose();
            }
            break;
        case 12:
           if (im.getBossLog("活力") < 1 && im.getPlayerPoints() > 180) { //活力
                im.gainPlayerEnergy(50);
                im.gainPlayerPoints(-180);
                im.setBossLog("活力");
                im.sendOk("恭喜您領取VIP服務的每日活力50點.");
                im.worldSpouseMessage(0x20,"『隨身服務』 ：玩家 "+ im.getChar().getName() +" 在隨身NPC裡領取每日活力 50 點。");
                im.dispose();
            } else {
                im.sendOk("失敗：\r\n\r\n#r1). 您已經領取過，請明日再領。\r\n2). 您當前在線里程不足180點。");
                im.dispose();
            }
            break;
        case 6:
           if (im.getBossLog("所有副本重置") < 1) { //副本重置
                im.resetEventCount("抽獎");
                im.resetEventCount("歷練");
                im.resetEventCount("養成");
                im.resetEventCount("皇陵");
                im.resetEventCount("羅朱");
                im.resetEventCount("海盜");
                im.resetEventCount("鬼節");
                im.resetEventCount("培羅德");
                im.resetBossLog("培羅德");
                im.resetBossLog("mrdb");
                im.resetBossLog("進階殘暴炎魔");
                im.resetBossLog("普通殘暴炎魔");
                im.resetBossLog("普通黑龍");
                im.resetBossLog("進階黑龍");
                im.resetBossLog("普通皮埃爾");
                im.resetBossLog("梅格耐斯");
                im.resetBossLog("鑰匙");
                im.resetBossLog("古樹鑰匙");
                im.resetBossLog("進階皮埃爾");
                im.resetBossLog("混沌皮卡啾");
                im.resetBossLog("西格諾斯");
                im.resetBossLog("皮卡啾");
                im.resetBossLog("獅子王");
                im.resetBossLog("進階貝倫");
                im.resetBossLog("普通貝倫");
                im.resetBossLog("普通血腥女皇");
                im.resetBossLog("進階血腥女皇");
                im.resetBossLog("進階血腥女皇");
                im.setBossLog("所有副本重置");
                im.sendOk("恭喜您使用VIP服務的重置了所有的副本.");
                im.worldSpouseMessage(0x20,"『隨身服務』 ：玩家 "+ im.getChar().getName() +" 在隨身NPC裡重置了全部副本任務。");
                im.dispose();
            } else {
                im.sendOk("您已經領取過，請明日再領。");
                im.dispose();
            }
            break;
    case 310:
            if (im.getMeso() > 10000) { //地圖傳送
                im.dispose();
            im.sendGetNumber("輸入你要移動的#r地圖ID",910000000,100000000,999999999)
            im.warp(mapid,0)
            im.dispose();
                im.dispose();
            }
        case 13:
            if (im.getMeso() > 10000) { //地圖傳送
                im.dispose();
                im.sendOk("近期開放。");
            } else {
                im.sendOk("楓幣不足1萬。");
                im.dispose();
            }
            break;
        case 14:
            if (im.getMeso() > 10000) { //地圖傳送
                im.dispose();
                im.sendOk("近期開放。");
            } else {
                im.sendOk("楓幣不足1萬。");
                im.dispose();
            }
            break;
        case 15:
            if (im.getMeso() > 10000) { //地圖傳送
                im.dispose();
                im.sendOk("近期開放。");
            } else {
                im.sendOk("楓幣不足1萬。");
                im.dispose();
            }
            break;
        case 99999:
        im.dispose();
        im.openNpc(2084001, 99999);//刪除道具
            break;
        case 2014:
        im.dispose();
        im.openNpc(2420022,1);//歡樂大雜燴
            break;
        case 2015:
        im.dispose();
        im.openNpc(2084001,2015);//專屬簽到
            break;
        case 2016:
        im.dispose();
        im.openNpc(2084001,2016);//召喚boss
            break;
        case 0:
            if (cm.getBossLog("送裝備", 1) == 0) {
            var ii = cm.getItemInfo();
            var toDrop = ii.randomizeStats(ii.getEquipById(1012011)).copy(); 
                        toDrop.setStr(50); //裝備力量
            toDrop.setDex(50); //裝備敏捷
            toDrop.setInt(50); //裝備智力
            toDrop.setLuk(50); //裝備運氣
            toDrop.setMatk(30); //物理攻擊
            toDrop.setWatk(30); //魔法攻擊
            toDrop.setSpeed(20); //移動速度    
            toDrop.setHp(2000);//hp
            toDrop.setMp(2000);//mp
            toDrop.setJump(10); //跳躍
            toDrop.setAcc(50); //命中率
            toDrop.setEnhance(25);//強化等級
            toDrop.setPotential1(40366);
            toDrop.setPotential2(40366);
            toDrop.setPotential3(40366);
            toDrop.setPotential4(40366);
            toDrop.setPotential5(40366);
            toDrop.setPotential6(40366);
            toDrop.setOwner("兔花花神器");
            cm.addFromDrop(cm.getC(), toDrop, false)    
            cm.setBossLog("送裝備", 1);
            cm.sendOk("超強裝備已經給您發放.感謝您的支持.");
            } else {
                cm.sendOk("您已經領取過了");
            }
            cm.dispose();
            break;                
        }
    }
}