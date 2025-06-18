/**
  * @Author            memory<52619941@qq.com>
  * @Version        1.0
  *    @Description    Weekly receive awards
  **/

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

  
var status = -1;
var cal = java.util.Calendar.getInstance();
var weekMark = cal.get(java.util.Calendar.WEEK_OF_YEAR);
var year = cal.get(java.util.Calendar.YEAR);
var bossId = "";

//領取的禮物列表
var gifts = Array(
    //物品ID， 數量
    //Array(4000463, 100),
    Array(5062000, 100),
    Array(5062002, 100),
    Array(5062500, 100),
    Array(4001714, 100),
    Array(5062024, 30),
        Array(5062009,100),
    Array(4310036, 150),
    Array(4220098, 1)
);
//獎勵的樂豆點數量, 設置為0則不獎勵
var giftAcash = 88888;
//獎勵的楓點數量, 設置為0則不獎勵
var giftMpoints = 88888;
//獎勵的遊戲幣數量, 設置為0則不獎勵
var giftMeso = 0;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status >= 0) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        /* 設置週期BossLog */
        bossId = year+"-"+weekMark+"認證獎勵";
        var text = "#r#e   #v1142574##v1142574#官方認證女生福利#v1142574##v1142574##k\r\n\r\n#d親!你好,認證後你將可以領取以下獎勵，並所有點裝1樂豆點:#n#k\r\n #v5062000# x 100 #n#k\r\n #v5062009# x 100 #v5062002# x 100\r\n#v5062500# x 100  #v4001714# x 100   #v4220089# x 1#l\r\n#v5062024# x 30  #v4310036# x 150 \r\n\r\n  #r#l楓點88,000#l\r\n\r\n  #r#l樂豆點88,000#l\r\n\r\n" ;
        text+="#b#L1#我已經認證過,我要領取豐富獎勵#l\r\n\r\n\r\n#rby：<官方認證女生>需要遊戲達到200級找群內群主,唯一QQ:674948254(夜先生),親自視頻，及手持卡片，內容：我是XXX（ID），一起加入糖糖楓之谷吧！,請聯繫管理員。擁有道具：雞蛋，所有點裝1楓幣\r\n";        cm.sendSimple(text);
    } else if (status == 1) {
        if (selection == 1) {
            /* 是否佩戴或擁有官方認證勳章 */
            if (cm.haveItem(1142574) || cm.getPlayer().getMedalText().indexOf("官方認證女生")!=-1) {
                /* 允許領取獎勵 */
                if (cm.getDaysPQLog(bossId, 99999) == 0) {
                    /* 插入記錄 */
                    cm.setPQLog(bossId); 
                    /* 領取獎勵 */
                    var text = "恭喜您，成功領取以下獎勵：\r\n";
                    if (giftAcash != 0) {
                        cm.gainNX(1, giftAcash);
                        text+="樂豆點 #bx"+giftAcash+"#k\r\n";
                    }
                    if (giftMpoints !=0) {
                        cm.gainNX(2, giftMpoints);
                        text+="楓點 #bx"+giftMpoints+"#k\r\n";
                    }
                    if (giftMeso !=0) {
                        cm.gainMeso(giftMeso);
                        text+="遊戲幣 #bx"+giftMeso+"#k\r\n";
                    }
                    /* 遍歷物品獎勵 */
                    for(var i in gifts) {
                        var itemid = gifts[i][0];
                        var quantity = gifts[i][1];
                        cm.gainItem(itemid, quantity);
                        text+="#t"+itemid+"# #bx"+quantity+"#k\r\n";
                    }
                    cm.sendOk(text);
                    cm.dispose();
                } else {
                    cm.sendOk("不要貪心哦小姑娘，你已經領取過獎勵了，一個人每週只可以領取#r#e一次#n#k獎勵。");
                    cm.dispose();
                }
            } else {
                cm.sendOk("你好像沒有擁有官方認證勳章，無法領取獎勵。");
                cm.dispose();
            }
        } else {
            cm.sendOk("腳本出錯，請聯繫管理員。");
            cm.dispose();
        }
    }
}
