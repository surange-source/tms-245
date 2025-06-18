/*
 Allshop
 */
var z = "#fEffect/ItemEff/1112811/0/0#";//"+z+"//美化
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
var hhh1 ="#fEffect/CharacterEff/1112905/0/1#";//愛心
var b1= "#v4310143#";//BOSS幣
var b2= "#v4000313#";//黃金楓葉
var b3= "#v4310100#";//凱梅爾茲楓幣
var b4= "#v4001759#";//定居金100萬楓幣
var b5= "#v4000463#";//國慶紀念幣
var b6= "#v4310088#";//RED幣
var b7= "#v4310020#";//怪物公園紀念幣
var b8= "#v4310059#";//影子商團幣
var b9= "#v4310156#";//埃蘇萊布斯幣
var b10= "#v4310036#";//征服者幣
var b11= "#v4032766#";//黑幣
var b12= "#v4310097#";//培羅德幣
var b13= "#v4310065#";//世界樹符文石
var b14= "#v4001620#";//武公的證物
var b15= "#v4310224#";//組隊點數
var b16= "#v4000814#";//楓點
var b17= "#v1352606#";//副手
var b18= "#v4033115#";//黑魔法師的證物
var b19= "#v4310210#";//V幣
var b20= "#v4001713#";//楓幣
var b21= "#v4310098#";//低級貝勒

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
            var selStr = "#r" + z + z + z + z + z + z + z + z + z + z + z + z + z + z + z + z + z + z + z + "\r\n#e#d　　　　　　　  　購物中心#n#k\r\n";
        //selStr +="#b#L100#"+b2+"[樂豆點商舖]"+"#k#L101#"+b16+"[楓點商舖]"+"#r#L10086#"+b5+" [中介轉換]#l#n\r\n";
                selStr +="#b#L25#"+b19+"[V幣商舖]"+"#k#L26#"+b20+"[Buff商舖]"+"#r#L27#"+b21+"[低貝商店]#l#n\r\n";       
                selStr +="#b#L3#"+b1+"[BOSS商店]"+"#k#L0#"+b4+"[雜貨商舖]"+"#r#L1#"+b6+"[RED商店]#l#n\r\n";
                selStr +="#b#L2#"+b7+"[怪物公園]"+"#k#L4#"+b10+"[征服商店]"+"#r#L5#"+b17+"[副手商舖]#l#n\r\n";      
                selStr +="#b#L10#"+b11+"[黑幣商舖]"+"#k#L16#"+b8+"[暴君商店]"+"#r#L11#"+b3+"[漩渦商店]#l#n\r\n";
                selStr +="#b#L9#"+b15+"[組隊點數]"+"#k#L20#"+b9+"[AS商舖] "+"#r#L21#"+b13+"[FFN商舖]#l#n\r\n";       
                selStr +="#b#L22#"+b12+"[貝勒商店]"+"#k#L23#"+b14+"[武陵商舖]"+"#r#L24#"+b18+"[TMN商店]#l#n\r\n";
;
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {

        case 20://AS商店
            cm.dispose();
            cm.openShop(328);
            //cm.openNpc(9201100);
            break;
        case 21://魯塔比斯商店
            cm.dispose();
            cm.openShop(62);
            //cm.openNpc(1011101);
            break;
        case 22://貝勒商店
            cm.dispose();
            cm.openShop(58);
            //cm.openNpc(1091000);
            break;
        case 23://武陵道場商店
            cm.dispose();
            cm.openShop(304);
            //cm.openNpc(9070001);
            break;
        case 24://黑魔法師商店
            cm.dispose();
            cm.openShop(14);
            //cm.openNpc(9070001);
            break;
        case 25://V紀念幣
            cm.dispose();
            cm.openShop(9330086);
            //cm.openNpc(9000399);
            break;
        case 26://24小時
            cm.dispose();
            cm.openShop(19);
            break;
        case 27://低級貝勒
            cm.dispose();
            cm.openShop(1400002);
 
            break;
                        case 10086:
                                cm.dispose();
            cm.openNpc(9310074, "41");
                                break;
                                
            case 102:
                cm.dispose();
            cm.openNpc(1540658);
                break;
            case 101:
                cm.dispose();
            cm.openNpc(9310072,"diyong");
                break;
            case 100:
                cm.dispose();
            cm.openNpc(1530635,5);
                break;
        case 0://雜貨商店
            cm.dispose();
            cm.openShop(61);
            break;
        case 1://RED商店
            cm.dispose();
            cm.openShop(69);
            break;
        case 2://11週年裝備
            cm.dispose();
            cm.openShop(9071001);
            break;
        case 3://BOSS幣店
            cm.dispose();
            cm.openShop(68);
            break;
        case 4://征服幣店
            cm.dispose();
            cm.openShop(66);
            break;
        case 5://副手裝備
            cm.dispose();
            cm.openShop(63);
            break;
        case 6://漩渦裝備
            cm.dispose();
            cm.openShop(74);
            break;
        case 8://低級武器
            cm.dispose();
            cm.openShop(73);
            break;
        case 9://組隊點數
            cm.dispose();
            cm.openShop(72);
            break;
        case 10://黑幣商店
            cm.dispose();
            cm.openShop(305);
            break;
              case 10086://楓幣方塊
            cm.dispose();
            cm.openShop(19);
            break;
        case 11://西服婚紗
            cm.dispose();
            cm.openShop(32);
            break;
        case 16://兔子商人
            cm.dispose();
            cm.openShop(74);
            break;
        }
    }
}

