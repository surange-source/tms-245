var status = 0;
var icon = "#fUI/Basic.img/BtMin2/normal/0#";
var iconX = "#fEffect/CharacterEff/1112905/0/1#";
var iconStar = "#fEffect/CharacterEff/1112904/2/1#";
var icon1 = "#fEffect/CharacterEff/1042176/0/0#";
var iconHR = "#fEffect/CharacterEff/1082565/0/0#"
var icon2 = "#fEffect/CharacterEff/1082565/2/0#";
var icon3 = "#fEffect/CharacterEff/1082565/4/0#";
var icon4 = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var giftContent = Array(
  //Array("餘額兌換樂豆點：1餘額=1500點",   1, Array(
     //   Array(-1, 1500)
   //)), 
 // Array("餘額兌換樂豆點：10餘額=15000點",   10, Array(
     //   Array(-10, 1500)
 //  )), 
  // Array("神秘椅子箱子（50）",   50, Array(
      //     Array(2431256, 1)
   // )), 
  // Array("名片戒指箱子（20）",  20, Array(
   //        Array(2432228, 1)
  //  )),  
    Array("儲值大禮包（100）",  100, Array(
    Array(4310014, 88),
    Array(4310036, 1000),
        Array(2049124, 10),           //正向混沌卷軸
        Array(2049701, 2),           //A級潛能卷軸
        Array(2049300, 10),           //高級裝備強化卷軸
        Array(2431945, 1),           //女皇防具
        Array(2431944, 1),           //女皇武器
        Array(4001839, 300),           //星星
        Array(-1, 300000)
    )),
    Array("儲值大禮包（300）",  300, Array(
    //Array(3994417, 1),
    Array(4310036, 2000),
    Array(4310014, 110),
        Array(2049124, 20),           //正向混沌卷軸
        Array(2049701, 4),           //A級潛能卷軸
        Array(2049300, 20),           //高級裝備強化卷軸
        Array(2431988, 1),           //FFN自選防具
        Array(2431944, 1),           //女皇武器
        Array(2431046, 1),           //隨機稱號椅子
        Array(4001839, 400),           //星星
        Array(-1, 900000)
    )),
    Array("儲值大禮包（500）", 500, Array(
    //Array(3994417, 1),
    //Array(3994420, 1),
    Array(1666000, 1),
    Array(1672019, 1),
    Array(4310014, 150),
    Array(4310036, 3000),
        Array(2049124, 30),           //正向混沌卷軸
        Array(2049701, 6),           //A級潛能卷軸
        Array(2049300, 30),           //高級裝備強化卷軸
        Array(2431988, 2),           //FFN自選防具
        Array(2431509, 1),           //FFN隨機
        Array(5062024, 5),           //閃炫方塊
        Array(5062501, 5),           //[MS特價]潛能變化方塊
        Array(2431046, 3),           //隨機稱號椅子
        Array(2612061, 2),//X雙手武器攻擊力卷軸
        Array(2616061, 2),//X防具攻擊力卷軸
        Array(2616062, 2),//X防具魔力卷軸
        Array(4001839, 600),           //星星
        Array(-1, 1800000)
    )),
    Array("儲值大禮包（1000）", 1000, Array(
    //Array(3994417, 1),
    //Array(3994418, 1),
    //Array(3994419, 1),
    //Array(3994420, 1),
    //Array(3994421, 1),
    //Array(3994422, 1),
    Array(4310014, 200),
    Array(4310036, 6000),
        Array(2049323, 20),           //無損
        Array(2431988, 3),           //FFN自選防具
        Array(2431509, 1),           //FFN自選
        Array(2047818, 5),           //驚人的雙手武器攻擊力卷軸100%
        Array(2612059, 5),           //驚人的雙手武器魔力卷軸100%
        Array(2046996, 5),           //驚人的單手武器攻擊力卷軸100%
        Array(2046997, 5),           //驚人的單手武器魔力卷軸100%
        Array(5062024, 10),           //閃炫方塊
        Array(5062501, 10),           //[MS特價]潛能變化方塊
        Array(2431046, 5),           //隨機稱號椅子
        Array(4001839, 2000),           //星星
        Array(-1, 3000000)
    )),
    Array("儲值大禮包（3000）", 3000, Array(
    //Array(3994417, 3),
    //Array(3994418, 3),
    //Array(3994419, 3),
    //Array(3994420, 3),
    //Array(3994421, 3),
    //Array(3994422, 3),
    Array(4310014, 300),
    Array(4310036, 10000),
        Array(2049323, 60),           //無損
        Array(2431988, 6),           //FFN自選防具
        Array(2431509, 2),           //FFN自選
        Array(2432069, 1),           //暴君
        Array(2047818, 15),           //驚人的雙手武器攻擊力卷軸100%
        Array(2612059, 15),           //驚人的雙手武器魔力卷軸100%
        Array(2046996, 15),           //驚人的單手武器攻擊力卷軸100%
        Array(2046997, 15),           //驚人的單手武器魔力卷軸100%
        Array(5062024, 30),           //閃炫方塊
        Array(5062501, 30),           //[MS特價]潛能變化方塊
        Array(2431046, 15),           //隨機稱號椅子
        Array(4001839, 5000),           //星星
        Array(-1, 9000000)
    )),
    Array("儲值大禮包（4000）", 4000, Array(
    Array(3994417, 4),
    Array(3994418, 4),
    Array(3994419, 4),
    Array(3994420, 4),
    Array(3994421, 4),
    Array(3994422, 4),
    Array(4310014, 400),
    Array(4310036, 15000),
        Array(2049323, 80),           //無損
        Array(2431988, 6),           //FFN自選防具
        Array(2431509, 2),           //FFN自選
        Array(2432069, 2),           //暴君
        Array(2047818, 20),           //驚人的雙手武器攻擊力卷軸100%
        Array(2612059, 20),           //驚人的雙手武器魔力卷軸100%
        Array(2046996, 20),           //驚人的單手武器攻擊力卷軸100%
        Array(2046997, 20),           //驚人的單手武器魔力卷軸100%
        Array(5062024, 50),           //閃炫方塊
        Array(5062501, 50),           //[MS特價]潛能變化方塊
        Array(2431046, 20),           //隨機稱號椅子
        Array(4001839, 10000),           //星星
        Array(-1, 12000000)
    ))
);
var giftId = -1;
var gifts = null;
var price = 999;
var column = new Array("裝備", "消耗", "設置", "其他", "商城");
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
        var text = "";
        text = ""+iconHR+"尊敬的玩家#b#h ##k，歡迎來到#b#e儲值禮包商城，點擊可以查看禮包內容哦！購買禮包前，請確認背包是否有足夠的空格。#n#k\r\n";
        //text += "#e#b歡迎來到儲值禮包商城，點擊可以查看禮包內容哦！\r\n";
        text += ""+icon2+"您當前餘額為：#r"+cm.getHyPay(1)+"#k "+"\t\t"+icon2+"累計儲值：#r"+cm.getHyPay(3)+"#k\r\n";
        for(var key in giftContent) {
            text+="#b#L"+key+"#購買【#r#e"+giftContent[key][0]+"#n#b】 #e#d需要"+giftContent[key][1]+"餘額#n#b#l#k\r\n";
        }
        cm.sendSimple(text);
    } else if (status == 1) {
        giftId = parseInt(selection);
        price = giftContent[giftId][1];
        gifts = giftContent[giftId][2];
        var text="#r#e"+giftContent[giftId][0]+"#n#b內容：\r\n";
        for(var key in gifts) {
            var itemId = gifts[key][0];
            var itemQuantity = gifts[key][1];
            text+="#i"+itemId+":##b" + (itemId == -1 ? "贈送樂豆點" : "#z" + itemId + "#") + "#k #rx "+itemQuantity+"#k\r\n";
        }
        text+="\r\n#d是否花費#e#r"+price+"#n#d餘額購買該禮包？#k";
        cm.sendYesNo(text);
    } else if (status == 2) {
        if (giftId!=-1 && gifts != null) {
            var needslot = new Array(0, 0, 0, 0, 0);
            for (var i in gifts) {
                var type = Math.floor(gifts[i][0] / 1000000);
                if (type == -1) {
                    continue;
                }
                needslot[type - 1] = needslot[type - 1] + 1;
            }
            for (var i = 0; i < 5; i++) {
                if (cm.getSpace(i + 1) < needslot[i]) {
                    cm.sendOk("您的" + column[i] + "欄位空間不足" + needslot[i] + "格，請清理後再來。");
                    cm.dispose();
                    return;
                }
            }
            if (cm.getHyPay(1) < price) {
                cm.sendOk("您的餘額不足，請先儲值後再購買。");
                cm.dispose();
                return ;
            }
            for(var key in gifts) {
                var itemId = gifts[key][0];
                var itemQuantity = gifts[key][1];
                if (itemId == -1) {
                    cm.gainNX(itemQuantity);
                } else {
                    cm.gainItem(itemId, itemQuantity);
                }
            }
            cm.addHyPay(price);
            cm.sendOk("恭喜您，購買成功！");
            cm.dispose();
        } else {
            cm.sendOk("購買錯誤！請聯繫管理員！");
            cm.dispose();
        }
    }
}