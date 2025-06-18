/*
BZ合成
 */
var epp = "#fEffect/CharacterEff/1082312/0/0#";  //彩光
var eff = "#fCharacter/Weapon/01702523.img/48/straight/0/effect#"; //彩虹帶
var eff = "#fEffect/CharacterEff/1112905/0/1#"; //
var epp = "#fEffect/CharacterEff/1082312/0/0#";  //彩光
var epp1 = "#fEffect/CharacterEff/1082312/2/0#"; //彩光1
var axx = "#fEffect/CharacterEff/1051294/0/0#";  //愛心
var xxx = "#fEffect/CharacterEff/1082565/2/0#"; //星系
var ppp = "#fEffect/CharacterEff/1112907/4/0#"; //泡炮 
var epp3 = "#fEffect/CharacterEff/1112908/0/1#";  //彩光3
var axx1 = "#fEffect/CharacterEff/1062114/1/0#";  //愛心
var zs = "#fEffect/CharacterEff/1112946/2/0#";  //磚石粉
var zs1 = "#fEffect/CharacterEff/1112946/1/1#";  //磚石藍
var dxxx = "#fEffect/CharacterEff/1102232/2/0#"; //星系
var tz = "#fEffect/CharacterEff/1082565/2/0#";  //兔子藍
var tz1 = "#fEffect/CharacterEff/1082565/4/0#";  //兔子粉
var tz7 = "#fEffect/CharacterEff/1112900/3/1#";  //音符紅
var tz8 = "#fEffect/CharacterEff/1112900/4/1#";  //音符綠
var tz88 = "#fEffect/CharacterEff/1112900/5/1#";  //音符綠!
var yun1 = "#fUI/UIWindow/Quest/icon7/10#";////紅色圓
var b1 = "#v4310065#";//進階世界樹符文石
var b2 = "#v4310097#";//培羅德幣
var b3 = "#v4310156#";//埃蘇萊布斯幣
var b4 = "#v4310218#";//幻影幣
var b5 = "#v4032766#";//黑幣
var b6 = "#v4033115#";//黑魔法師的證物

var a = 0;
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
            var selStr = "#e#r                 "+axx1+"幣種合成系統"+axx1+"           #n#k\r\n"+"#e請確保你的背包有對應的方塊及空位!!#n#k\r\n"
        selStr +="#e#b您當前擁有"+b1+":#n#k"+cm.getItemQuantity(4310065)+"#e#r    #L1#[前往合成]#k#l"+b1+"\r\n";
                selStr +="#e#b您當前擁有"+b2+":#n#k"+cm.getItemQuantity(4310097)+"#e#r    #L2#[前往合成]#k#l"+b2+"\r\n";
                selStr +="#e#b您當前擁有"+b3+":#n#k"+cm.getItemQuantity(4310156)+"#e#r    #L3#[前往合成]#k#l"+b3+"\r\n";
                selStr +="#e#b您當前擁有"+b4+":#n#k"+cm.getItemQuantity(4310218)+"#e#r    #L4#[前往合成]#k#l"+b4+"\r\n";
                selStr +="#e#b您當前擁有"+b5+":#n#k"+cm.getItemQuantity(4032766)+"#e#r    #L5#[前往合成]#k#l"+b5+"\r\n";
                selStr +="#e#b您當前擁有"+b6+":#n#k"+cm.getItemQuantity(4033115)+"#e#r    #L6#[前往合成]#k#l"+b6+"\r\n";

;
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {

        case 1:
            if (cm.getItemQuantity(4310064) >= 20 && cm.getItemQuantity(4000313) >= 5&& cm.getItemQuantity(4310143) >= 30){
cm.gainItem(4310064, -20);
cm.gainItem(4000313, -5);
cm.gainItem(4310143, -30);
cm.gainItem(4310065, 1);
            cm.dispose();
            break;
}           else {
 cm.sendOkS("您需要20個#v4310064#,5個#v4000313#,30個#v4310143#才能合成#v4310065#喲~~", 3);
        cm.dispose();
                return;
}
        case 2:
            if (cm.getItemQuantity(4310097) >= 30 && cm.getItemQuantity(4000313) >= 8&& cm.getItemQuantity(4310143) >= 40){
cm.gainItem(4310097, -30);
cm.gainItem(4000313, -8);
cm.gainItem(4310143, -40);
cm.gainItem(4310097, 1);
            cm.dispose();
            break;
}           else {
 cm.sendOkS("您需要30個#v4310098#,8個#v4000313#,40個#v4310143#才能合成#v4310097#喲~~", 3);
        cm.dispose();
                return;
}
        case 3:
            if (cm.getItemQuantity(4032766) >= 100 && cm.getItemQuantity(4000313) >= 20&& cm.getItemQuantity(4310143) >= 60){
cm.gainItem(4032766, -100);
cm.gainItem(4000313, -20);
cm.gainItem(4310143, -60);
cm.gainItem(4310156, 1);
            cm.dispose();
            break;
}           else {
 cm.sendOkS("您需要100個#v4032766#,20個#v4000313#,60個#v4310143#才能合成#v4310156#喲~~", 3);
        cm.dispose();
                return;
}
        case 4:
             cm.dispose();
             cm.openNpc(9310074, "hyb");
             break;
        case 5:
            if (cm.getItemQuantity(4310036) >= 200 && cm.getItemQuantity(4000313) >= 1&& cm.getItemQuantity(4310143) >= 100){
cm.gainItem(4310036, -200);
cm.gainItem(4000313, -1);
cm.gainItem(4310143, -20);
cm.gainItem(4032766, 1);
            cm.dispose();
            break;
}           else {
 cm.sendOkS("您需要200個#v4310036#,1個#v4000313#,20個#v4310143#才能合成#v4032766#喲~~", 3);
        cm.dispose();
                return;
}
        case 6:
            if (cm.getItemQuantity(4032766) >= 80 && cm.getItemQuantity(4000313) >= 10&& cm.getItemQuantity(4310036) >= 400){
cm.gainItem(4032766, -80);
cm.gainItem(4000313, -10);
cm.gainItem(4310036, -400);
cm.gainItem(4033115, 1);
            cm.dispose();
            break;
}           else {
 cm.sendOkS("您需要200個#v4310036#,10個#v4000313#,400個#v4310036#才能合成#v4033115#喲~~", 3);
        cm.dispose();
                return;
}

        }
    }
}

