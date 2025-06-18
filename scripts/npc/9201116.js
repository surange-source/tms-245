var status = 0;
var typed=0;
//中介幣的物品ID
var zjbid = 4310014;
var zmtid = 4000313;
var zyhzid = 4033356;
var zmtNum = java.lang.Math.floor(Math.random() * 200001 + 400000);
var zyhzNum = java.lang.Math.floor(Math.random() * 50001 + 10000);
var zjbNum = java.lang.Math.floor(Math.random() * 1200001 + 2000000);
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
            cm.sendSimple("親愛的#r#h ##k您好，我是傷害上限突破系統:\r\n#r#L999#傷害上限突破簡介#l\r\n\r\n#L1#[武器]儲值餘額突破 #b(#k目前狀態：#r土豪推薦#b)#l\r\n#L2#[武器]正義火種突破 (#k目前狀態：#r火爆內容#b)#l\r\n#L3#[武器]中介幣突破   (#k目前狀態：#r推薦內容#b)#l");
        } else if (status == 1) {
            if (selection == 999) {
                cm.sendOk("\t我能夠為你的武器增加武器攻擊傷害上限以提升您的潛在輸出能力。使用不同的道具對武器傷害上限提升的效果不同。\r\n\t1.消耗#b50儲值餘額#k突破，每次可以為武器提升150W~800W傷害。\r\n\t2.消耗3個#b#v4033356#正義火種1#k突破，每次可以為武器提升3W~10W的傷害。\r\n\t3.消耗15個#b#v4000313#中介幣#k突破，每次可以為武器提升20W~60W的傷害。");
            } else {
                typed=selection;
                if (selection == 1) {
                    cm.sendYesNo("是否花費#k50餘額對當前穿戴的武器進行傷害上限突破？-[已經開放]");
                } else if (selection == 2) { 
                    cm.sendYesNo("是否花費3個#b正義火種1#k對當前穿戴的武器進行傷害上限突破？");
                } else if (selection == 3) {
                    cm.sendYesNo("是否花費15個#b中介幣#k對當前穿戴的武器進行傷害上限突破？");
                }
            }
        } else if (status == 2) {
            if (selection = -1)
                selection = typed;
            if (selection == 3) {
                //字母突破
                    if(cm.haveItem(zmtid, 15)){
                        if (cm.changeLimitBreak(zmtNum)) {
                            
                            cm.gainItem(zmtid,-15);
                                cm.sendOk("#b傷害上限突破成功.\r\n\r\n本次追加傷害為：#r"+ zmtNum +"#b.");
                            cm.worldSpouseMessage(0x05,"[傷害突破] 玩家 "+ cm.getChar().getName() +" 使用 中介幣 讓武器傷害上限突破成功 本次追加 "+ zmtNum +" 傷害值 。");
                        }else{
                                cm.sendOk("#b突破失敗.\r\n系統為檢測到角色身上裝備武器.");
                        }
                                cm.dispose();
                        }else{
                                cm.sendOk("#b突破失敗.\r\n需要 15個 中介幣 才可以突破.");
                                cm.dispose();
                        }
            } else if (selection == 1) {
                if (cm.getHyPay(1) > 49) {
                        if (cm.changeLimitBreak(zjbNum)) {
                        
                            cm.addHyPay(50);
                                cm.sendOk("#b傷害上限突破成功.\r\n\r\n本次追加傷害為：#r"+ zjbNum +"#b.");
                            cm.worldSpouseMessage(0x05,"[傷害突破] 玩家 "+ cm.getChar().getName() +" 使用 [ 50 ]餘額 讓武器傷害上限突破成功 本次追加 "+ zjbNum +" 傷害值 。");
                        }else{
                                cm.sendOk("#b突破失敗.\r\n系統為檢測到角色身上裝備武器.");
                        }
                                cm.dispose();
                        }else{
                                cm.sendOk("#b突破失敗.\r\n需要 50儲值餘額 才可以突破.");
                                cm.dispose();
                        }
            } else if (selection == 2) {
                    if(cm.haveItem(4033356, 3)){
                        if (cm.changeLimitBreak(zyhzNum)) {
                            cm.gainItem(4033356,-3);
                            cm.sendOk("#b傷害上限突破成功.\r\n\r\n本次追加傷害為：#r"+ zyhzNum +"#b.");
                            cm.worldSpouseMessage(0x05,"[傷害突破] 玩家 "+ cm.getChar().getName() +" 使用 正義火種 讓武器傷害上限突破成功 本次追加 "+ zyhzNum +" 傷害值 。");
                        }else{
                                cm.sendOk("#b突破失敗.\r\n系統為檢測到角色身上裝備武器.");
                        }
                                cm.dispose();
                        }else{
                                cm.sendOk("#b突破失敗.\r\n需要 3個 正義火種1 才可以突破.");
                                cm.dispose();
                        }
            }
        }
    }
}
