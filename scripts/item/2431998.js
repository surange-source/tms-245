var status = 0;
var z = "#fUI/UIWindow/Quest/icon5/1#";//"+z+"//美化
var typed = 0;
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
        var selStr = "#e#r#fEffect/ItemEff/1112811/0/0##fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k\r\n\r\n";
        //selStr += "#b歡迎使用管理定做的NPC!#k\r\n";
        //selStr += "#L15#"+z+" 突破上限#l\r\n#L11#"+z+" 刷道具#l\r\n#L13#"+z+"#d 我要樂豆點#l\r\n#L16#"+z+"#d 我要HP#l\r\n#L17#"+z+"#d 我要MP#l";  //\r\n#L15#"+z+" 突破上限#l突破上限#l#L13#"+z+" #d我要樂豆點#l\r\n
        //selStr += "#L14#"+z+" 世界喊話#l  #L6#"+z+" 自選髮型#l  #L4#"+z+" 副本重置\r\n";
        //selStr += "#L11#"+z+" 快速倉庫#l  #L12#"+z+" 快速答題#l  #L15#"+z+" 僱傭管理#l\r\n";
        //selStr += "#L15#"+z+" 弗蘭德裡#l \r\n";  //#L13#"+z+" 快速簽到#l\r\n";
        //selStr += "\r\n\r\n#fEffect/ItemEff/1112811/0/0##fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k";
        im.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
           if (im.getBossLog("工資") < 1) { //工資
                im.gainMeso(2000000);
                im.setBossLog("工資");
                im.gainNX(3000);
                im.gainItem(2430029,1,1);
                im.gainItem(2049116, 3);
                im.gainItem(2049129, 2);
                im.gainItem(5076000, 5);
                im.gainItem(4310030, 10);
                im.sendOk("恭喜您領取理財服務的每日工資，獲得#b200萬#k遊戲幣、#b3000#k樂豆點、1個#b神秘盒子#k、#b強化混蛋卷軸#kx2、#b混沌卷軸#kx2、#b道具喇叭#kx5、#b運動會#kx10");
                im.worldSpouseMessage(0x20,"『隨身服務』 ：玩家 "+ im.getChar().getName() +" 在隨身NPC裡領取每日工資，大量樂豆點楓幣和運動會幣。");
                im.dispose();
            } else {
                im.sendOk("失敗：\r\n\r\n#r1). 您已經領取過，請明日再領。\r\n2). 您當前在線里程不足180點。");
                im.dispose();
            }
            break;
        case 2:
           //if (im.getPlayer().getCSPoints(1) > 10000) { //會員等級
                im.dispose();
                im.openNpc(9900001,9);
           // } else {
            //    im.sendOk("您糊弄我呢。樂豆點不足還點什麼。最少得擁有1萬樂豆點才可以使用。");
            //    im.dispose();
           // }
            break;
        case 7:
           if (im.getBossLog("三倍") < 1) { //三倍
                im.gainItem(5211060,1,1);
                im.gainItem(5360015,1,1);
                im.setBossLog("三倍");
                im.sendOk("恭喜您領取理財服務的每日三倍經驗卡一張以及雙倍爆率卡.");
                im.worldSpouseMessage(0x20,"『隨身服務』 ：玩家 "+ im.getChar().getName() +" 在理財隨身NPC裡領取每日三倍經驗卡以及雙倍爆率卡。");
                im.dispose();
            } else {
                im.sendOk("您已經領取過，請明日再領。");
                im.dispose();
            }
            break;
        case 11:
            im.dispose();
            im.openNpc(9900000,"gm");
        /*
           if (im.getBossLog("里程") < 1 && im.getPlayerPoints() > 180) { //里程
                im.gainPlayerPoints(200);
                im.setBossLog("里程");
                im.sendOk("恭喜您領取VIP服務的每日里程200點.");
                im.worldSpouseMessage(0x20,"『隨身服務』 ：玩家 "+ im.getChar().getName() +" 在隨身NPC裡領取每日里程 200 點。");
                im.dispose();
            } else {
                im.sendOk("失敗：\r\n\r\n#r1). 您已經領取過，請明日再領。\r\n2). 您當前在線時間不足180分鐘。");
                im.dispose();
            }*/
            break;
        case 12:
            im.dispose();
            im.openNpc(9070000);
          /* if (im.getBossLog("活力") < 1 && im.getPlayerPoints() > 180) { //活力
                im.gainPlayerEnergy(50);
                im.gainPlayerPoints(-180);
                im.setBossLog("活力");
                im.sendOk("恭喜您領取VIP服務的每日活力50點.");
                im.worldSpouseMessage(0x20,"『隨身服務』 ：玩家 "+ im.getChar().getName() +" 在隨身NPC裡領取每日活力 50 點。");
                im.dispose();
            } else {
                im.sendOk("失敗：\r\n\r\n#r1). 您已經領取過，請明日再領。\r\n2). 您當前在線里程不足180點。");
                im.dispose();
            }*/
            break;
        case 4:
           if (im.getBossLog("所有副本重置") < 1) { //副本重置
                //im.resetEventCount("抽獎");
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
                im.resetBossLog("納希沙漠競技場");
                im.resetBossLog("克勞德");
                im.setBossLog("所有副本重置");
                im.sendOk("恭喜您使用理財服務的重置了所有的副本.");
                im.worldSpouseMessage(0x20,"『隨身服務』 ：玩家 "+ im.getChar().getName() +" 在理財隨身NPC裡重置了全部副本任務。");
                im.dispose();
            } else {
                im.sendOk("您已經領取過，請明日再領。");
                im.dispose();
            }
            break;
        case 6:
          // if (im.getPlayer().getCSPoints(1) > 1000) { //自選髮型
                //im.gainNX(-10000);
                im.dispose();
                im.openNpc(9900001, 10);
            //} else {
           //     im.sendOk("樂豆點不足1000，你瞧啥。");
            //    im.dispose();
            //}
            break;
        case 13:
            im.dispose();
            //im.openNpc(9310144,"11gm");
                       im.gainNX(5000000);
            break;
        case 14:
            if (im.getMeso() >= 2000000) {
                im.sendGetText("消耗200萬遊戲幣，請輸入您要說的話：");
                typed = 14;
            } else {
                im.sendOk("您沒有200萬遊戲幣，不能進行世界喊話。");
                im.dispose();
            }
            break;
        case 15:
            im.dispose();
            im.openNpc(9030000,"gmsx");
            break;
        case 16:
            im.dispose();
            im.openNpc(9030000,"hp");
            break;
        case 17:
            im.dispose();
            im.openNpc(9030000,"mp");
            break;
        }
    } else if (status == 2) {
        if (typed == 14) {
            im.worldSpouseMessage(0x07, "[世界]"+im.getPlayer().getMedalText()+im.getChar().getName()+" : "+im.getText());
            im.gainMeso(-100000);
            //im.dispose();
        }
        im.dispose();
    }
}
