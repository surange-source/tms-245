
var yun1 ="#fUI/UIWindow/Quest/icon7/10#";////紅色圓
var yun2 ="#fUI/UIWindow/Quest/icon8/0#";////藍指標
var yun4 ="#fUI/UIWindow/Quest/reward#";////獎勵
var ppp = "#fEffect/CharacterEff/1112907/4/0#"; //泡炮
var zs = "#fEffect/CharacterEff/1112946/2/0#";  //磚石粉
var zs1 = "#fEffect/CharacterEff/1112946/1/1#";  //磚石藍
var yun ="#fUI/UIWindow/PartySearch2/BtNext/mouseOver/0#";////紅沙漏
var wn1 = "#fUI/Basic.img/BtClaim/normal/0#";  //警燈
var yun2 ="#fUI/UIWindow/Quest/icon8/0#";////藍指標

var status = 0;
var choose = 0;

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
        if (mode == 1) status++;
        if (status == 0) {


            var text = "親愛的#r#h ##k您好，請選擇你需要的功能！\r\n";  
           text += "#r#e#L4#" + yun + " 我要用1億楓幣#b兌換#r1個#v4009370##l\r\n";
           text += "#r#e#L5#" + yun + " 我要用5億楓幣#b兌換#r5個#v4009370##l\r\n";
           text += "#r#e#L3#" + yun + " 我要用1個#v4009370##b兌換#r1億楓幣#l\r\n";
           text += "#r#e#L6#" + yun + " 我要用5個#v4009370##b兌換#r5億楓幣#l\r\n";
           
            
            cm.sendSimple(text);

        } else if (status == 1) {
           
            switch(selection){
                case 1:
                         cm.dispose();
                                cm.openNpc(9310005,"wugong");
                    break;
                case 2:
                    cm.sendYesNo("確定要用#v4000008#兌換500000000楓幣嗎");
                    break;
                case 3:
                    cm.sendYesNo("確定要用1個#v4009370#兌換1億楓幣嗎");
                    break;
                case 4:
                    cm.sendYesNo("確定要用1億楓幣兌換1個#v4009370#嗎");
                    break;
                case 5:
                    cm.sendYesNo("確定要用5億楓幣兌換5個#v4009370#嗎");
                    break;
                case 6:
                    cm.sendYesNo("確定要用5個#v4009370#兌換5億楓幣嗎");
                    break;
                case 7:
                         cm.dispose();
                                cm.openShop(9010030);
                    break;
                case 8:
                         cm.dispose();
                                cm.openNpc(9310073,"xxdh1");
                    break;
            }
            choose = selection;
        } else if (status == 2) {
            switch(choose){
                case 1:
                    if(cm.haveItem(4000008, 200)) {
                        cm.gainItem(4000008,-200);
                        cm.gainMeso(100000000);
                                                cm.playerMessage(1, "恭喜您獲得1E楓幣！");
                             cm.worldSpouseMessage(0x20, "[兌換楓幣] : 恭喜 " + cm.getChar().getName() + " 在市場相框NPC「憩吧」用200個道符兌換了1E楓幣");
                    }else{
                        cm.sendSimple("您背包沒有200個#v4000008#");
                    }
                    cm.dispose();
                    break;
                case 2:
                    if(cm.haveItem(4000008, 1000)) {
                        cm.gainItem(4000008,-1000);
                        cm.gainMeso(500000000);
                                                cm.playerMessage(1, "恭喜您獲得5E楓幣！");
                             cm.worldSpouseMessage(0x0D, "[兌換楓幣] : 恭喜 " + cm.getChar().getName() + " 在市場相框NPC「憩吧」用1000個道符兌換了5E楓幣");

                    }else{
                        cm.sendSimple("您背包沒有1000個#v4000008#");
                    }
                    cm.dispose();
                    break;
                case 3:
                    if(cm.haveItem(4009370, 1)) {                    
                        cm.gainMeso(100000000);
                        cm.gainItem(4009370, -1);
                                               // cm.playerMessage(1, "恭喜您獲得200W楓幣！");
                              cm.sendOk("兌換成功：獲得#r1億楓幣!");
                             cm.worldSpouseMessage(0x0D, "[楓幣中介] : 恭喜 " + cm.getChar().getName() + " 在市場「雪人凱利」用1個購物袋兌換了1億楓幣");
                    }else{
                        cm.sendSimple("您背包沒有1個#v4009370#");
                    }
                    cm.dispose();
                    break;
                case 4:
                    if (cm.getMeso() >= 100000000){            
                        cm.gainMeso(-100000000);
                        cm.gainItem(4009370, 1);
                                          // cm.playerMessage(1, "恭喜您獲得1張！");
                            cm.sendOk("兌換成功：獲得#r1個#v4009370#!");
 cm.worldSpouseMessage(0x0D, "[楓幣中介] : 恭喜 " + cm.getChar().getName() + " 在市場「雪人凱利」用1億楓幣兌換了1個購物袋！");
                    }else{
                        cm.sendSimple("您背包沒有1億楓幣！");
                    }
                    cm.dispose();
                    break;
                case 5:
                    if (cm.getMeso() >= 500000000){            
                        cm.gainMeso(-500000000);
                        cm.gainItem(4009370, 5);
                                          // cm.playerMessage(1, "恭喜您獲得1張！");
                            cm.sendOk("兌換成功：獲得#r5個#v4009370#!");
 cm.worldSpouseMessage(0x0D, "[楓幣中介] : 恭喜 " + cm.getChar().getName() + " 在市場「雪人凱利」用5億楓幣兌換了5個購物袋！");
                    }else{
                        cm.sendSimple("您背包沒有5億楓幣！");
                    }
                    cm.dispose();
                    break;
                case 7:
                         cm.dispose();
                                cm.openShop(9010030);
                    break;
                case 6:
                    if(cm.haveItem(4009370, 5)) {                                cm.gainItem(4009370, -5);
                        cm.gainMeso(500000000);

                                               // cm.playerMessage(1, "恭喜您獲得200W楓幣！");
                              cm.sendOk("兌換成功：獲得#r5億楓幣!");
                             cm.worldSpouseMessage(0x0D, "[楓幣中介] : 恭喜 " + cm.getChar().getName() + " 在市場「雪人凱利」用5個購物袋兌換了5億楓幣");
                    }else{
                        cm.sendSimple("您背包沒有5個#v4009370#");
                    }
                    cm.dispose();
                    break;
            }
        }
    }
}