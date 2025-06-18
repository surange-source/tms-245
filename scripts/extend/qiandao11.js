var status = 0;
var icon1 = "#fEffect/CharacterEff/1082565/4/0#";
var icon2 = "#fEffect/CharacterEff/1082565/2/0#";
var npcid = 9070002;
var sl = 20;//兌換數量
var jf = 20;//兌換數量

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        var text = "\r\n#b你好，我是兔花花秘書,在這裡可以每天領取一次。#k#e\r\n活力值餘額：#r"+cm.getPlayerEnergy()+"#k 積分餘額：#r#r"+cm.getPlayerPoints()+"#k 樂豆點餘額：#r#e" + cm.getPlayer().getCSPoints(1) + "\r\n#e#r要求：#b需要達到120級才能領取！\r\n#e#r每日獲得：#d活力值+#r20 #d積分+#r20#k#d  獲得經驗+#r100W \r\n#v4310057#暴風幣+#r2#d #v2340000#祝福卷軸+#r2#n#d #v5062002#高級神奇方塊+#r2#n#d \r\n";
        //text+= "#b#L0#"+ icon2 +" 瞭解什麼是花園？#v2433018#寵物箱+#r1#n#d#l\r\n";
        text+= "#e#r#L2#"+ icon2 +" 領取每日簽到#l\r\n";
        //text+= "#r#L1#"+ icon1 +" 領取今日免費積分#l\r\n";
        cm.sendSimple(text);
    } else if (status == 1) {
        switch(selection) {
            case 0:
                var text="\t每個角色初生花園技術等級為1級。可以擁有1個花盆，提升等級之後可以擴建花園增加花盆，花園技術等級決定你能種植的花種。每當收穫時可以獲得種植經驗和花的產物。任何的花只要超過一天沒有採摘就會枯萎。\r\n";
                text+="\t每天可以為種植的花進行一次澆水、施肥，澆水消耗10點活力，可以減少1小時的作物成長時間，施肥消耗20點活力，可以減少2小時的作物成長時間。";
                status-=2;
                cm.sendNext(text);
            break;
            case 1:
                                if (cm.getPQLog("花園積分")==0) {
                    cm.setPQLog("花園積分");
                    cm.addHyPay(5);
                    cm.sendOk("成功領取了5點積分。");
                    cm.dispose();
                } else {
                    cm.sendOk("您今天已經領取過了活力值！");
                    cm.dispose();
                }
            case 2:
                //if (cm.getPQLog("每日活力值",0) < 1 && cm.getPlayer().getLevel() == 100 && cm.getSpace(5)>2){
                                if(cm.getPQLog("每日活力值",0) < 1 && (cm.getPlayer().getLevel() > 120 && cm.getPlayer().getLevel() < 255) && (cm.getSpace(5)>1 && cm.getSpace(1)>2)){
                          cm.gainPlayerEnergy(20);
                                      //cm.addHyPay(-sl * 1);
                                      cm.gainExp( + 1000000);
                                      cm.gainPlayerPoints(jf * 1);
                                      //cm.gainNX(3000);
                                      cm.gainItem(4310057, 2);
                                     // cm.gainItem(2433018, 1);
                                      cm.gainItem(5062002, 2);
                                      //cm.gainItem(4310014, 2);
                                      cm.gainItem(2340000, 2);
                          cm.setPQLog("每日活力值");
                                      cm.setPQLog("每日活力值", 1);
              cm.worldSpouseMessage(0x20,"玩家[" + cm.getPlayer().getName() + "]在拍賣上領取了每日福利20活力值,20積分,高級神奇方塊及祝福卷軸等作為獎勵~!");
                    cm.sendOk("#d成功領取了#r20#d點活力值 #r#d積分+#r20#k\r\n#d  獲得經驗+#r100W #v4310057#暴風幣+#r2 #v2340000#祝福卷軸+#r2#k #v5062002#高級神奇方塊+#r2#n#d，更多活力值請通過完成組隊任務#b<搶佔海盜船>、<拯救羅和朱>、<掃蕩秦皇陵>、<天天愛歷練>#k獲取。");
                    cm.dispose();
                } else {
                    cm.sendOk("#b#e今天已經領取了或等級沒達到120級!#r\r\n");
                    cm.dispose();
                }
                
        }
    }
}