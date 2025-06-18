var status = 0;
var typed=0;
//中介幣的物品ID
var zjbid = 4310014;
var zmtid = 4310036;
var zyhzid = 4033356;
var zmtNum = java.lang.Math.floor(Math.random() * 100001 + 100000);
var zyhzNum = java.lang.Math.floor(Math.random() * 70001 + 30000);
var zjbNum = java.lang.Math.floor(Math.random() * 1500001 + 500000);
var yeNum = java.lang.Math.floor(Math.random() * 3000000 + 2500000);
var zjNum = 1000000;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) { 
            var TXT = "";
            if (cm.getChar().isGm()){
                TXT = "\r\n#L100#[武器]GM突破 (#k目前狀態：#r推薦內容#b)#l\r\n";
            }
            cm.sendSimple("親愛的#r#h ##k您好，我是傷害上限突破系統:\r\n#r#L999#傷害上限突破簡介#l\r\n\r\n#L4#[武器]儲值50餘額突破 #b(#k目前狀態：#r土豪推薦#b)#l\r\n\r\n#L10#[武器]#r儲值500餘額突破#b#n(#k目前狀態：#r神豪推薦#b) #l\r\n#L5#[武器]中介幣突破 #b(#k目前狀態：#r土豪推薦#b)#l\r\n#L1#[武器]雪花幣突破 (#k目前狀態：#r推薦內容#b)#l\r\n#L2#[武器]正義火種突破 (#k目前狀態：#r火爆內容#b)#l\r\n#L3#[武器]征服者幣突破 (#k目前狀態：#r火爆內容#b)#l"+TXT);
        } else if (status == 1) {
            if (selection == 999) {
                cm.sendOk("\t我能夠為你的武器增加武器攻擊傷害上限以提升您的潛在輸出能力。使用不同的道具對武器傷害上限提升的效果不同。\r\n\t1.消耗#b500儲值餘額#k突破，每次可以為武器提升2500W~6000W傷害。\r\n\t1.消耗#b50儲值餘額#k突破，每次可以為武器提升250W~600W傷害。\r\n\t1.消耗100個#b#v4310014#雪花幣#k和5000W突破，每次可以為武器提升50W~200W傷害。\r\n\t1.消耗50個#b#v4000313#中介幣#k突破，每次可以為武器提升100W傷害。\r\n\t2.消耗3個#b#v4033356#正義火種1#k突破，每次可以為武器提升3W~10W的傷害。\r\n\t3.消耗400個#b#v4310036#征服者幣#k突破，每次可以為武器提升10W~20W的傷害。");
            cm.dispose();
            } else {
                typed=selection;
                if (selection == 1) {
                    cm.sendYesNo("是否花費100個#b雪花幣#k以及5000W對當前穿戴的武器進行傷害上限突破？");
                } else if (selection == 2) { 
                    cm.sendYesNo("是否花費3個#b正義火種1#k對當前穿戴的武器進行傷害上限突破？");
                } else if (selection == 3) {
                    cm.sendYesNo("是否花費400個#b征服者幣#k對當前穿戴的武器進行傷害上限突破？");
                } else if (selection == 4) {
                    cm.sendYesNo("是否花費50#b餘額#k對當前穿戴的武器進行傷害上限突破？");
                    } else if (selection == 10) {
                    cm.sendYesNo("是否花費500#b餘額#k對當前穿戴的武器進行傷害上限突破？");
                } else if (selection == 5) {
                    cm.sendYesNo("是否花費50#b中介幣#k對當前穿戴的武器進行傷害上限突破？");
                } else if (selection == 100) {
                    cm.sendYesNo("是否對當前穿戴的武器進行1E傷害上限突破？");
                }
            }
        } else if (status == 2) {
            if (selection = -1)
                selection = typed;
            if (selection == 3) {
                //字母突破
                    if(cm.haveItem(zmtid, 400)){
                        if (cm.WeaponLimitBreak(zmtNum)) {
                            
                            cm.gainItem(zmtid,-400);
                                cm.sendOk("#b傷害上限突破成功.\r\n\r\n本次追加傷害為：#r"+ zmtNum +"#b.");
                            cm.worldSpouseMessage(0x16,"[傷害突破] 玩家 "+ cm.getChar().getName() +" 使用 征服者幣 讓武器傷害上限突破成功 本次追加 "+ zmtNum +" 傷害值 。");
                        }else{
                                cm.sendOk("#b突破失敗.\r\n系統為檢測到角色身上裝備武器.");
                        }
                                cm.dispose();
                        }else{
                                cm.sendOk("#b突破失敗.\r\n需要 400個 征服者 才可以突破.");
                                cm.dispose();
                        }
            } else if (selection == 1) {
                var A= java.lang.Math.floor((Math.random() * 99)+1);
                if (A<=50){
                    zjbNum = java.lang.Math.floor((Math.random() * 600000)+500000);
                }else if (A>50&&A<=75){
                    zjbNum = java.lang.Math.floor((Math.random() * 600000)+1000000);
                }else if (A>75&&A<=100){
                    zjbNum = java.lang.Math.floor((Math.random() * 800000)+1200000);
                }
                    if(cm.haveItem(zjbid, 100)&&cm.getMeso()>=50000000){
                        if (cm.WeaponLimitBreak(zjbNum)) {
                        
                            cm.gainItem(zjbid,-100);
                            cm.gainMeso(-50000000);
                                cm.sendOk("#b傷害上限突破成功.\r\n\r\n本次追加傷害為：#r"+ zjbNum +"#b.");
                            cm.worldSpouseMessage(0x16,"[傷害突破] 玩家 "+ cm.getChar().getName() +" 使用 雪花幣 讓武器傷害上限突破成功 本次追加 "+ zjbNum +" 傷害值 。");
                        }else{
                                cm.sendOk("#b突破失敗.\r\n系統為檢測到角色身上裝備武器.");
                        }
                                cm.dispose();
                        }else{
                                cm.sendOk("#b突破失敗.\r\n1,需要 100個 雪花幣 才可以突破.\r\n2,需要5000W手續費");
                                cm.dispose();
                        }
            } else if (selection == 2) {
                    if(cm.haveItem(4033356, 3)){
                        if (cm.WeaponLimitBreak(zyhzNum)) {
                            cm.gainItem(4033356,-3);
                            cm.sendOk("#b傷害上限突破成功.\r\n\r\n本次追加傷害為：#r"+ zyhzNum +"#b.");
                            cm.worldSpouseMessage(0x16,"[傷害突破] 玩家 "+ cm.getChar().getName() +" 使用 正義火種1 讓武器傷害上限突破成功 本次追加 "+ zyhzNum +" 傷害值 。");
                        }else{
                                cm.sendOk("#b突破失敗.\r\n系統為檢測到角色身上裝備武器.");
                        }
                                cm.dispose();
                        }else{
                                cm.sendOk("#b突破失敗.\r\n需要 3個 正義火種1 才可以突破.");
                                cm.dispose();
                        }
            } else if (selection == 4) {
                var A= java.lang.Math.floor((Math.random() * 99)+1);
                if (A<=35){
                    yeNum = java.lang.Math.floor((Math.random() * 500000)+2500000);
                }else if (A>34&&A<=65){
                    yeNum = java.lang.Math.floor((Math.random() * 500000)+2800000);
                }else if (A>65&&A<=85){
                    yeNum = java.lang.Math.floor((Math.random() * 500000)+3200000);
                }else if (A>85&&A<=95){
                    yeNum = java.lang.Math.floor((Math.random() * 500000)+4000000);
                }else if (A>96&&A<=100){
                    yeNum = java.lang.Math.floor((Math.random() * 1000000)+4500000);
                }
                    if (cm.getHyPay(1) > 49) {
                        if (cm.WeaponLimitBreak(yeNum)) {
                        
                            cm.addHyPay(50);
                                cm.sendOk("#b傷害上限突破成功.\r\n\r\n本次追加傷害為：#r"+ yeNum +"#b.");
                            cm.worldSpouseMessage(0x16,"[傷害突破] 玩家 "+ cm.getChar().getName() +" 使用 [ 50 ]餘額 讓武器傷害上限突破成功 本次追加 "+ yeNum +" 傷害值 。");
                        }else{
                                cm.sendOk("#b突破失敗.\r\n系統為檢測到角色身上裝備武器.");
                        }
                                cm.dispose();
                        }else{
                                cm.sendOk("#b突破失敗.\r\n需要 50儲值餘額 才可以突破.");
                                cm.dispose();
                        }
                        } else if (selection == 10) {
                var A= java.lang.Math.floor((Math.random() * 99)+1);
                if (A<=35){
                    yeNum = java.lang.Math.floor((Math.random() * 5000000)+25000000);
                }else if (A>25&&A<=75){
                    yeNum = java.lang.Math.floor((Math.random() * 5000000)+28000000);
                }else if (A>65&&A<=85){
                    yeNum = java.lang.Math.floor((Math.random() * 5000000)+32000000);
                }else if (A>85&&A<=95){
                    yeNum = java.lang.Math.floor((Math.random() * 5000000)+37000000);
                }else if (A>95&&A<=100){
                    yeNum = java.lang.Math.floor((Math.random() * 10000000)+42000000);
                }
                    if (cm.getHyPay(1) > 499) {
                        if (cm.WeaponLimitBreak(yeNum)) {
                        
                            cm.addHyPay(500);
                                cm.sendOk("#b傷害上限突破成功.\r\n\r\n本次追加傷害為：#r"+ yeNum +"#b.");
                            cm.worldSpouseMessage(0x16,"[傷害突破] 玩家 "+ cm.getChar().getName() +" 使用 [ 500 ]餘額 讓武器傷害上限突破成功 本次追加 "+ yeNum +" 傷害值 。");
                        }else{
                                cm.sendOk("#b突破失敗.\r\n系統為檢測到角色身上裝備武器.");
                        }
                                cm.dispose();
                        }else{
                                cm.sendOk("#b突破失敗.\r\n需要 500儲值餘額 才可以突破.");
                                cm.dispose();
                        }
            } else if (selection == 5) {
                    if (cm.haveItem(4000313,50)) {
                        if (cm.WeaponLimitBreak(zjNum)) {
                        
                            cm.gainItem(4000313,-50);
                                cm.sendOk("#b傷害上限突破成功.\r\n\r\n本次追加傷害為：#r"+ zjNum +"#b.");
                            cm.worldSpouseMessage(0x16,"[傷害突破] 玩家 "+ cm.getChar().getName() +" 使用 [ 50 ]中介幣 讓武器傷害上限突破成功 本次追加 "+ zjNum +" 傷害值");
                        }else{
                                cm.sendOk("#b突破失敗.\r\n系統為檢測到角色身上裝備武器.");
                        }
                                cm.dispose();
                        }else{
                                cm.sendOk("#b突破失敗.\r\n需要 50中介幣 才可以突破.");
                                cm.dispose();
                        }
            } else if (selection == 100) {
                    if (cm.getPlayer().isGm()) {
                        if (cm.WeaponLimitBreak(100000000)) {
                            cm.sendOk("#b傷害上限突破成功.\r\n\r\n本次追加傷害為：#r1E#b.");
                            cm.worldSpouseMessage(0x16,"[傷害突破] GM "+ cm.getChar().getName() +" 使用賣萌術讓武器傷害上限突破成功 本次追加 "+ zjNum +" 傷害值");
                        }else{
                                cm.sendOk("#b突破失敗.\r\n系統為檢測到角色身上裝備武器.");
                        }
                                cm.dispose();
                        }else{
                                cm.sendOk("#b突破失敗.\r\n你不是最高等級GM");
                                cm.dispose();
                        }
            }
        }
    }
}