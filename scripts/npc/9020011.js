
var aaa = "#fUI/UIWindow/AriantMatch/characterIcon/5#";
var yun = "#fUI/UIWindow/Megaphone/2#";////紅沙漏
var yun2 = "#fUI/UIWindow/Quest/icon8/0#";////藍指標
var yun8 = "#fUI/UIWindow/MonsterBook/arrowLeft/normal/0#";////金左指標
var yun9 = "#fUI/UIWindow/MonsterBook/arrowRight/normal/0#";////金右指標
var yun4 = "#fUI/UIWindow/Quest/reward#";////獎勵
var ttt = "#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 = "#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 = "#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圓
var ttt4 = "#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 = "#fUI/UIWindow/Quest/icon0#";////美化!
var ttt7 = "#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//美化會員
var ttt6 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
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
var tz9 = "#fEffect/CharacterEff/1112902/0/0#";  //藍心
var tz10 = "#fEffect/CharacterEff/1112903/0/0#";  //紅心
var tz11 = "#fEffect/CharacterEff/1112904/0/0#";  //彩心
var tz12 = "#fEffect/CharacterEff/1112924/0/0#";  //黃星
var tz13 = "#fEffect/CharacterEff/1112925/0/0#";  //藍星
var tz14 = "#fEffect/CharacterEff/1112926/0/0#";  //紅星
var tz15 = "#fEffect/CharacterEff/1112949/0/0#";  //花樣音符
var tz16 = "#fEffect/CharacterEff/1112949/1/0#";  //花樣音符
var tz17 = "#fEffect/CharacterEff/1112949/2/0#";  //花樣音符
var tz18 = "#fEffect/CharacterEff/1112949/3/0#";  //花樣音符
var tz19 = "#fEffect/CharacterEff/1112949/4/0#";  //花樣音符
var tz20 = "#fEffect/CharacterEff/1114000/1/0#";  //紅星花
var hhh ="#fEffect/CharacterEff/1102232/2/0#";//星星
var hhh1 ="#fEffect/CharacterEff/1112905/0/1#";//愛心
var status = 0;

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
        var selStr = hhh1+ hhh1+hhh1+ hhh1+ hhh1+ hhh1+hhh1+ hhh1+ hhh1+ hhh1+ hhh1+"#e#g[神秘力量]#l"+ hhh1+ hhh1+ hhh1+ hhh1+ hhh1+ hhh1+ hhh1+ hhh1+ hhh1+ hhh1+hhh1 +"\r\n"+ "#v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488#\r\n#b#v1712001##v1712002##v1712003##k      提升所需材料:#v1712000##k\r\n#r [0] ~[300]#kArc階段:\r\n#d每次提升+6 Arc,+6 自選屬性#k\r\n#r[300]~[600]#kArc階段:\r\n#d每次提升+6 Arc,+6 自選屬性,+1 攻擊力or魔力#k\r\n#r[600]~[900]#kArc階段:\r\n#d每次提升+6 Arc,+6 自選屬性,+2 攻擊力or魔力#k\r\n#r[900]~[1000]#kArc階段:\r\n#d每次提升+6 Arc,+6 自選屬性,+3 攻擊力or魔力#k\r\n#r[1000+]#kArc階段:\r\n#g被賦予強大的潛能#k\r\n"
            selStr += "             "+"#L0#"+hhh +"#b前往提升"+hhh +"#k#l\r\n";
            selStr += "         "+"#L1#"+hhh +"#b前往更深的深處...."+ hhh+ "#k#l";
                    
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(2159359, "shenmits");
            break;
        case 1:
            cm.sendOk("#e什麼都沒有,傻比......");
            cm.dispose();
            break;

        }
    }
}