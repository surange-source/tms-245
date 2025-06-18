/*
 腳本功能：拍賣腳本V2版
 */

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
var a = 0;
var time = new Date();
var day = time.getDay();
switch (day) {
    case 0:
        var d = "星期日";
        break;
    case 1:
        var d = "星期一";
        break;
    case 2:
        var d = "星期二";
        break;
    case 3:
        var d = "星期三";
        break;
    case 4:
        var d = "星期四";
        break;
    case 5:
        var d = "星期五";
        break;
    case 6:
        var d = "星期六";
        break;
    default:
}
var year = time.getFullYear();
var month = time.getMonth();
var date = time.getDate();
var hour = time.getHours();
var min = time.getMinutes();
var sec = time.getSeconds();
if (hour > 12) {
    hour -= 12;
    var apm = "下午";
} else {
    var apm = "上午";
}
if (hour < 10) {
    hour = "0" + hour;
}
if (min < 10) {
    min = "0" + min;
}
if (sec < 10) {
    sec = "0" + sec;
}
//時間控制部分結束
var icon = "#fUI/Basic.img/icon/arrow#";
var iconEvent = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var iconMeso = "#fUI/Basic.img/BtCoin/normal/0#";
var sz1 = "#fUI/Basic.img/LevelNo/1#";
var sz2 = "#fUI/Basic.img/LevelNo/2#";
var sz3 = "#fUI/Basic.img/LevelNo/3#";
var sz4 = "#fUI/Basic.img/LevelNo/4#";
var sz5 = "#fUI/Basic.img/LevelNo/5#";
var sz6 = "#fUI/Basic.img/LevelNo/6#";
var sz7 = "#fUI/Basic.img/LevelNo/7#";
var sz8 = "#fUI/Basic.img/LevelNo/8#";
var sz9 = "#fUI/Basic.img/LevelNo/9#";
var haha="#fUI/Basic.img/BlackHeaven/0#";
var Cheng = "#fEffect/ItemEff.img/1042356/effect/walk1/1#";
var cool = "#fEffect/BasicEff.img/CoolHit/cool#";
var List = Array(
        Array(sz1 + "#d#e回到市場", 2, 1),//名稱、NPC代碼、模式
        Array(sz2 + "快速轉職", 9310362, "changeJob"),
        Array(sz3 + "萬能傳送", 9310362, "chuansong"),
        Array(sz4 + "儲值福利", 9310362, "chongzhijiangli"),
        Array(sz5 + "在線獎勵", 9310362, "zaixian"),
        Array(sz6 + "每日福利", 9310362, "mrfl"),
        Array(sz7 + "等級獎勵", 9310362, "dengji1001"),
        Array(sz8 + "管理中心", 9000030, null),
        Array(sz9 + "BOSS重置", 9310362, "BOSScz"),
      Array(sz9 +"物品回收", 9310362, "Delete"),
      Array(sz9 +"美容美發", 9310362, "meir"),
      Array(sz9 +"所有商店", 9310362, "Allshop")
        )
var text;

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
            if (cm.getMapId() == 180000001) {
            cm.sendOk("很遺憾，您因為違反用戶守則被禁止遊戲活動，如有異議請聯繫管理員.");
            cm.dispose();
            } 
            //text = cool+"";
            text = "" + xxx + "在線時間：#r" + cm.getOnlineTime() + "#k分\t  " + xxx + "餘額：#r" +cm.getHyPay(1)+ "#k\t" + xxx + "樂豆點：#r" + cm.getNX(1) + "#k\r\n" + xxx + "楓點：#r" + cm.getNX(2) + "#k\t " + xxx + "里程：#r" +cm.getPlayerPoints()+ "#k\t\t"+xxx+"活躍：#r"+cm.getPlayerEnergy()+"#k\r\n\r\n";
            //text += "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "\r\n"
            text +=Cheng+"\r\n";
            var x = 0;
            for (var i = 0; i < List.length; i++) {
                if (x == 3) {
                    text += "#L" + i + "#" + List[i][0] + "#l\r\n\r\n";
                    x = 0;
                } else {
                    text += "#L" + i + "#" + List[i][0] + "#l";
                    x++;
                }
            }
            //text +="\r\n";
            text +="#k#L999#→→→→→→→#r新手福利[#b點這#k]#k←←←←←←←←←#l\r\n\r\n";
            text +="        Ps：常用指令#r@npc#k，#r@解卡#k，#r@卡圖#k，#r@幫助#k ";
            text +="  \r\n";
            cm.sendSimple(text);
        } else if (a == 1) {
            if (selection == 0) {
                cm.warp(910000000,0);
                cm.dispose();
            }
            else if (selection == 999) {
                cm.dispose();
                cm.openNpc(9900005);
                
            } else if (selection == 1000) {
                cm.dispose();
                cm.openWeb("http://www.baidu.com");
            } else if (selection == 1001) {
                cm.dispose();
                cm.openWeb("http://www.baidu.com");
            } else {
                var mode_ = List[selection][2];
                var npcid = List[selection][1];
                cm.dispose();
                cm.openNpc(npcid, mode_);
            }
        }//a
    }//mode
}//f


function getMyTwd() {
    var myTwd;
    var conn = cm.getConnection();
    var sql = "select rmb from accounts where id = ?;";
    var pstmt = conn.prepareStatement(sql);
    pstmt.setString(1, cm.getPlayer().getAccountID());
    var myTwdSql = pstmt.executeQuery();
    if (myTwdSql.next()) {
        myTwd = myTwdSql.getString("rmb");
    } else {
        myTwd = 0;
    }
    myTwdSql.close();
    pstmt.close();
    return myTwd;
}

