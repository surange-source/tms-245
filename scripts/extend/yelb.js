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
  //Array("餘額兌換樂豆點：1餘額=3000點",   1, Array(
     //   Array(-1, 3000)
   //)), 
 // Array("餘額兌換樂豆點：10餘額=30000點",   10, Array(
     //   Array(-10, 30000)
 //  )), 
  // Array("神秘椅子箱子（50）",   50, Array(
      //     Array(2431256, 1)
   // )), 
  // Array("名片戒指箱子（20）",  20, Array(
   //        Array(2432228, 1)
  //  )), 
     Array("法弗納武器箱（自選)",   200, Array(
        Array(2431938, 1)
    )),
    // Array("本F最強套裝：漩渦套裝",   500, Array(
      //  Array(1003976, 1),
      //  Array(1102623, 1),
      //  Array(1082556, 1),
     //   Array(1052669, 1),
     //   Array(1072870, 1),
     //   Array(2610003, 10),
    //    Array(-1, 150000)
   // )),
    //  Array("最高級培羅德首飾",   300, Array(
     //   Array(1113075, 1),
     //   Array(1032223, 1),
     //   Array(1122267, 1),
      //  Array(1132246, 1),
      //  Array(-1, 50000)
   // ))
     Array("諾巴劍士套裝",   200, Array(
       Array(1132169, 1),
        Array(1102476, 1),
        Array(1072737, 1)
    )), 
    Array("諾巴魔法師套裝",   200, Array(
        Array(1132170, 1),
        Array(1102477, 1),
        Array(1072738, 1)
    )), 
    Array("諾巴弓箭手套裝",   200, Array(
        Array(1132171, 1),
        Array(1102478, 1),
        Array(1072739, 1)
    )),
    Array("諾巴盜賊套裝",     200, Array(
        Array(1132172, 1),
        Array(1102479, 1),
        Array(1072740, 1)
    )),
    Array("諾巴海盜套裝",  200, Array(
        Array(1132173, 1),
        Array(1102480, 1),
        Array(1072741, 1)
    ))
   // Array("魯塔比斯劍士套裝",  398, Array(
   //     Array(1003797, 1),
   //     Array(1102481, 1),
   //     Array(1132175, 1),
   //     Array(1062165, 1)
   // )),
   // Array("魯塔比斯魔法師套裝", 398, Array(
   //     Array(1003798, 1),
   //     Array(1042255, 1),
   //     Array(1062166, 1)
   // )),
   // Array("魯塔比斯弓箭手套裝", 398, Array(
   //    Array(1003799, 1),
   //     Array(1042256, 1),
   //     Array(1062167, 1)
    //)),
    //Array("魯塔比斯盜賊套裝", 398, Array(
   //     Array(1003800, 1),
   //     Array(1042257, 1),
   //     Array(1062168, 1)
   // )),
    //  Array("封印解除卷軸X10", 10, Array(
    //    Array(2610001, 10),
    //    Array(-1, 2500)
   // ))
    //Array("蠟筆禮包", 500, Array(
        //Array(3994417, 1),
        //Array(3994418, 1),
        //Array(3994419, 1),
        //Array(3994420, 1),
        //Array(3994421, 1),
        //Array(3994422, 1)
    //))
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
        text = ""+iconHR+"尊敬的玩家#b#h ##k，歡迎來到#b#e套裝禮包商城，點擊可以查看禮包內容哦！#n#k\r\n";
        //text += "#e#b歡迎來到套裝禮包商城，點擊可以查看禮包內容哦！\r\n";
        text += ""+icon2+"您當前樂豆點為：#r"+cm.getNX(1)+"#k "+"\t\t"+icon2+"累計儲值：#r"+cm.getHyPay(3)+"#k\r\n";
        for(var key in giftContent) {
            text+="#b#L"+key+"#購買【#r#e"+giftContent[key][0]+"#n#b】 #e#d需要"+giftContent[key][1]+"樂豆#n#b#l#k\r\n";
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
        text+="\r\n#d是否花費#e#r"+price+"#n#d樂豆購買該禮包？#k";
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
            if (cm.getNX(1) < price) {
                cm.sendOk("您的樂豆不足，請先儲值後再購買。");
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
            cm.gainNX(-price);
            cm.sendOk("恭喜您，購買成功！");
            cm.dispose();
        } else {
            cm.sendOk("購買錯誤！請聯繫管理員！");
            cm.dispose();
        }
    }
}