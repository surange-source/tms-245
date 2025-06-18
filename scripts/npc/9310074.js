
var status = 0;
var aaa ="#fUI/UIWindow/AriantMatch/characterIcon/5#";
var yun ="#fUI/UIWindow/Megaphone/2#";////紅沙漏
var yun2 ="#fUI/UIWindow/Quest/icon8/0#";////藍指標
var yun8 ="#fUI/UIWindow/MonsterBook/arrowLeft/normal/0#";////金左指標
var yun9 ="#fUI/UIWindow/MonsterBook/arrowRight/normal/0#";////金右指標
var yun4 ="#fUI/UIWindow/Quest/reward#";////獎勵
var ttt ="#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 ="#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圓
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 ="#fUI/UIWindow/Quest/icon0#";////美化!
var ttt7 ="#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//美化會員
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
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
var yun1 ="#fUI/UIWindow/Quest/icon7/10#";////紅色圓
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
var iconEvent = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
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
var selStr = "\r\n#e#d"+tz+""+"娛樂楓之谷面板提升服務中心"+tz+"#n#l#k";
        selStr +="\r\n#L4#"+iconEvent+" #e結晶兌換/分解#l   \r\n";
        //selStr +="#r#L0#"+iconEvent+" #e結晶兌換/分解#l\r\n";
        //selStr +="#L5#"+iconEvent+" #g蠟筆潛能#k#l\r\n";
        selStr +="#L130#"+iconEvent+"#r 進化樂豆點神裝#l \r\n";
        //selStr +="#L100#"+iconEvent+"#r 兌換幻影幣#l \r\n";
        //selStr +="#L3#"+iconEvent+" 埃蘇/最高級培羅德首飾屬性提升#l\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9900003, 1000);
            break;
        case 130:
            cm.dispose();
            cm.openNpc(9310144,"JJDJ");
            break;
        case 3:
            cm.dispose();
            cm.openNpc(9300011, "astisheng");
            break;
        case 100:
            cm.dispose();
            cm.openNpc(9300011, "hyb");
            break;
        case 4:
            cm.dispose();
            cm.openNpc(9300011, "jjdh");
            break;
        case 5:
            cm.dispose();
            cm.openNpc(9310144, "1001");
            break;
        case 6:
            cm.dispose();
            cm.openNpc(9900004, 3);
            break;
        case 7:
            cm.dispose();
            cm.warp(100000104);
            break;
        case 8:
            cm.dispose();
            cm.openNpc(9900003, 23);
            break;
        case 9:
            cm.dispose();
            cm.openNpc(9201131, 0);
            break;
        case 10:
            cm.dispose();;
            cm.openNpc(9310144, 1);
            break;
        case 11:
            cm.dispose();
            cm.openNpc(1540200, 0);
            break;
        case 12:
            cm.dispose();
            cm.openNpc(9330109, 1);
            break;
        case 13:
            cm.dispose();
            cm.openNpc(9900003, 1001);
            break;
        case 14:
            cm.dispose();
            cm.openNpc(1032102, 0);
            break;
        case 15:
            cm.dispose();
            cm.openNpc(9000069, 1111);
            break;
        case 444:
            cm.dispose();
            cm.warp(100000104);
            break;
        case 20:
            cm.dispose();
            cm.openNpc(9900003, 15);
            break;
        case 50:
            cm.dispose();
            cm.openNpc(9310144, 4);
            break;
        case 30:
            cm.dispose();
            cm.openNpc(9310144, 6);
            break; 
        case 60:
            cm.dispose();
            cm.openNpc(9020000);
            break; 
        case 70:
            cm.dispose();
            cm.openNpc(2040034);
            break;
        case 110:
            cm.dispose();
            cm.openNpc(9900003, 10);
            break;
        case 91:
            cm.dispose();
            cm.openNpc(9900003, 108);
            break;
        case 16:
        //cm.sendOk("近期開放");
            cm.dispose();
        cm.openNpc(9310144, 1);
            //cm.openShop(500);
            break;
        case 17:
            cm.dispose();
            cm.openNpc(9310144, 8);
            break;
        case 18:
        cm.sendOk("近期開放");
            cm.dispose();
            //cm.openShop(600);
            break;
        case 19:
            cm.dispose();
            cm.openNpc(9900003, 24);
            break;
        case 20:
            cm.dispose();
            cm.openNpc(9310144, 3);
            break;
        case 21:
            cm.dispose();
            cm.openNpc(9310087);
            break;
        case 33:
            cm.dispose();
            cm.openWeb("http://new.shoukabao.com/Payment/Service/abbb78f30ad785157eb64136b3a81425");
        cm.sendOk("已經為您打開官方網站介紹！");
            break;       













}
    }
}

