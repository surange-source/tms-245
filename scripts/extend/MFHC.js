/*
 方塊合成
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
var mf1 = "#v5062000#";//神奇方塊
var mf2 = "#v5062002#";//高級神奇方塊
var mf3 = "#v5062005#";//驚人的神奇方塊
var mf4 = "#v5062006#";//白金神奇方塊
var mf5 = "#v5062009#";//超級神奇方塊
var mf6 = "#v5062010#";//終極神奇方塊
var mf7 = "#v5062090#";//記憶方塊
var mf8 = "#v5062500#";//大師附加神奇方塊
var mf9 = "#v5062503#";//附加潛能記憶方塊
var mf10= "#v5062001#";//混沌神奇方塊
var mf11= "#v5062022#";//閃耀鏡射方塊
var mf12= "#v5062024#";//閃炫方塊
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
            var selStr = "#e#r                 "+axx1+"方塊合成系統"+axx1+"           #n#k\r\n"+"#e請確保你的背包有對應的方塊及空位!!#n#k\r\n"+"#b您當前擁有"+mf1+":#n#k"+cm.getItemQuantity(5062000)+"      #b您當前擁有"+mf2+":#n#k"+cm.getItemQuantity(5062002)+"\r\n"+"#b您當前擁有"+mf5+":#n#k"+cm.getItemQuantity(5062009)+"      #b您當前擁有"+mf8+":#n#k"+cm.getItemQuantity(5062500)+"\r\n"
        selStr +="#e#L0#"+mf1+"*30 ="+ mf2 + "*1 #l    ";
                selStr +="#e#L1#"+mf1+"*50 ="+ mf3 + "*1 #l\r\n";
        selStr +="#e#L2#"+mf1+"*60 ="+ mf4 + "*1 #l    ";
                selStr +="#e#L3#"+mf2+"*100="+ mf3 + "*10#l\r\n";
        selStr +="#e#L4#"+mf2+"*100="+ mf4 + "*8 #l    ";
                selStr +="#e#L5#"+mf2+"*100="+ mf5 + "*5 #l\r\n";
        selStr +="#e#L6#"+mf5+"*100="+ mf10+ "*12#l    ";
                selStr +="#e#L7#"+mf5+"*100="+ mf11+ "*10#l\r\n";
        selStr +="#e#L8#"+mf5+"*100="+ mf6 + "*8 #l    ";
                selStr +="#e#L9#"+mf5+"*100="+ mf7 + "*6 #l\r\n";
        selStr +="#e#L10#"+mf5+"*100="+mf12+ "*5  #l    ";
                selStr +="#e#L11#"+mf8+"*100="+ mf9+ "*8 #l\r\n";
;
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            if (cm.getItemQuantity(5062000) >= 30){
cm.gainItem(5062000, -30);
cm.gainItem(5062002, 1);
            cm.dispose();
            break;
}           else {
 cm.sendOkS("方塊不夠還想來裝X,找死呢!!!", 3);
        cm.dispose();
                return;
}
        case 1:
            if (cm.getItemQuantity(5062000) >= 50){
cm.gainItem(5062000, -50);
cm.gainItem(5062005, 1);
            cm.dispose();
            break;
}           else {
 cm.sendOkS("方塊不夠還想來裝X,找死呢!!!", 3);
        cm.dispose();
                return;
}
        case 2:
            if (cm.getItemQuantity(5062000) >= 60){
cm.gainItem(5062000, -60);
cm.gainItem(5062006, 1);
            cm.dispose();
            break;
}           else {
 cm.sendOkS("方塊不夠還想來裝X,找死呢!!!", 3);
        cm.dispose();
                return;
}
        case 3:
            if (cm.getItemQuantity(5062002) >= 100){
cm.gainItem(5062002, -100);
cm.gainItem(5062005, 10);
            cm.dispose();
            break;
}           else {
 cm.sendOkS("方塊不夠還想來裝X,找死呢!!!", 3);
        cm.dispose();
                return;
}
        case 4:
            if (cm.getItemQuantity(5062002) >= 100){
cm.gainItem(5062002, -100);
cm.gainItem(5062006, 8);
            cm.dispose();
            break;
}           else {
 cm.sendOkS("方塊不夠還想來裝X,找死呢!!!", 3);
        cm.dispose();
                return;
}
        case 5:
            if (cm.getItemQuantity(5062002) >= 100){
cm.gainItem(5062002, -100);
cm.gainItem(5062009, 5);
            cm.dispose();
            break;
}           else {
 cm.sendOkS("方塊不夠還想來裝X,找死呢!!!", 3);
        cm.dispose();
                return;
}
        case 6:
            if (cm.getItemQuantity(5062009) >= 100){
cm.gainItem(5062009, -100);
cm.gainItem(5062001, 12);
            cm.dispose();
            break;
}           else {
 cm.sendOkS("方塊不夠還想來裝X,找死呢!!!", 3);
        cm.dispose();
                return;
}
        case 7:
            if (cm.getItemQuantity(5062009) >= 100){
cm.gainItem(5062009, -100);
cm.gainItem(5062022, 10);
            cm.dispose();
            break;
}           else {
 cm.sendOkS("方塊不夠還想來裝X,找死呢!!!", 3);
        cm.dispose();
                return;
}
        case 8:
            if (cm.getItemQuantity(5062009) >= 100){
cm.gainItem(5062009, -100);
cm.gainItem(5062010, 8);
            cm.dispose();
            break;
}           else {
 cm.sendOkS("方塊不夠還想來裝X,找死呢!!!", 3);
        cm.dispose();
                return;
}
        case 9:
            if (cm.getItemQuantity(5062009) >= 100){
cm.gainItem(5062009, -100);
cm.gainItem(5062090, 6);
            cm.dispose();
            break;
}           else {
 cm.sendOkS("方塊不夠還想來裝X,找死呢!!!", 3);
        cm.dispose();
                return;
}
        case 10:
            if (cm.getItemQuantity(5062009) >= 100){
cm.gainItem(5062009, -100);
cm.gainItem(5062024, 5);
            cm.dispose();
            break;
}           else {
 cm.sendOkS("方塊不夠還想來裝X,找死呢!!!", 3);
        cm.dispose();
                return;
}
        case 11:
            if (cm.getItemQuantity(5062500) >= 100){
cm.gainItem(5062500, -100);
cm.gainItem(5062503, 8);
            cm.dispose();
            break;
}           else {
 cm.sendOkS("方塊不夠還想來裝X,找死呢!!!", 3);
        cm.dispose();
                return;
}

        }
    }
}

