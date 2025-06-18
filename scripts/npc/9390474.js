   //-----------------//
  //　Careless 製作  //
 // qq 50009219     //
//-----------------//
var status = 0;
var random = java.lang.Math.floor(Math.random() * 4);
var a = "#fEffect/CharacterEff/1082565/0/0#";  //餅乾兔子
var b = "#fEffect/CharacterEff/1112904/0/0#"; //彩色星星
var c = "#fEffect/CharacterEff/1003271/0/0#";  //紅色心心
var d = "#fEffect/CharacterEff/1112946/4/1#";  //鑽石
var e = "#fEffect/CharacterEff/1082229/0/0#";  //紅心
var f = "#fUI/Basic/LevelNo/0#"; //[1]+1
var j = "#fUI/Basic/LevelNo/1#"; //[1]+1
var h = "#fUI/Basic/LevelNo/2#"; //[1]+1
var i1 = "#fUI/Basic/LevelNo/3#"; //[1]+1
var g = "#fUI/Basic/LevelNo/4#"; //[1]+1
var k = "#fUI/Basic/LevelNo/5#"; //[1]+1
var l1 = "#fUI/Basic/LevelNo/6#"; //[1]+1
var xbydn = "";
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (cm.getEventCount("西班牙鬥牛") == 0) {
        xbydn = "#d0#k";
    } else {
        xbydn = "#r" + cm.getEventCount("西班牙鬥牛") + "#k";
    }
    if (status == 0 && mode == 0) {
        cm.dispose();
        //cm.openNpc(2470018);
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (cm.getMapId() == 180000001) {
        cm.sendOk("很遺憾，您因為違反用戶守則被禁止遊戲活動，如有異議請聯繫管理員.")
        cm.dispose();
    } else if (status == 0) {
        var selStr = "#e#d鬥牛進行時 Π　氣勢洶洶的牛牛已經迫不及待衝出圍欄\r\n[#r#h ##d]　勇士 快來挑戰阻止這頭牛牛吧！\r\n";
        selStr += "#L0#" + j + " 進入鬥牛殿堂　　　　　　　已驅趕：[#r" + xbydn + "#d]#l\r\n";
        selStr += "#L1#" + h + " 土豪樂豆點進入　　　　　　　已驅趕：[#r" + xbydn + "#d]#l\r\n";
        selStr += "#L2#" + i1 + " 鬥牛豐厚獎品　　　　　　　已驅趕：[#r" + xbydn + "#d]#l\r\n\r\n" + e + e + e + e + e + e + e + e + e + e + e + e + e + e + e + e + e + e + e + e + e + e + e + e + e + e + e + e + e + "\r\n";
        selStr += "#b#L3#" + g + " 什麼是激情的鬥牛節？#l\r\n";
        selStr += "#b#L4#" + k + " 福袋裡都裝了些什麼？#l\r\n";
        selStr += "#r#L5#" + l1 + " 我想離開這裡 牛牛太闊怕了#l#n#k\r\n";

        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
            case 0://進入鬥牛
                cm.dispose();
                cm.openNpc(9390474, "doun1");
                break;
            case 1://樂豆點進入鬥牛
                cm.dispose();
                cm.sendOk("#e#d尊敬的玩家 [ #h # ]\r\n\r\n#r#L8#確認消耗樂豆點進入[ 鬥牛挑戰殿堂 ]#l#k#n");
                break;
            case 2://豐厚獎品
                cm.dispose();
                cm.openNpc(9390474, "doun2");
                
                break
            case 3://什麼是鬥牛節
                cm.sendOk("#d鬥牛節是西班牙的傳統節日，進入鬥牛場後，氣勢洶洶的牛牛已經迫不及待地要衝出圍欄，牛牛非常強大！避開牛牛等時間結束即可通關！當然如果您有實力，可以直接消滅牛牛通關，不過歷史上消滅過牛牛的人微乎其微！！");
                status = -1;
                break;
            case 4://福袋裡的獎品
                cm.sendOk("#i2450078##i2020047##i2431515##i2431514##i2431516##i2003566##i2003568##i2450023##i2450021##i2049018##i2049005##i2101131##i2340000##i2049119##i2049129##i2046054##i2046055##i2046056##i2046057##i2046058##i2046059##i2046139##i2046393##i2046394##i2046395##i2046396##i2046511##i2046512##i2046513##i20465142048043##i2048044##i2046913##i2046914##i2046173##i2046577##i2046766##i2046765##i2046764##i2046763##i2046580##i2046579##i2046578##i1112915##i4001473##i2431798##i2430072##i2430056##i2430080#");
                status = -1;
                break;
            case 5://離開地圖
                cm.dispose();
                cm.warp(910000000, 0);
                cm.sendOk("#b您已退出鬥牛場！等你強大了 我們很期待你回歸！！");
                break;
        }
    } 
}