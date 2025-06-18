var a = 0;
var text;
var selects; //記錄玩家的選項
var buynum = 0;
var itemlist = Array(
    Array(2432392, 5),
    Array(4310088, 5),
    Array(4310030, 15),
    Array(2049135, 30),
    Array(2049300, 50),
    Array(2614007, 50), //突破十萬 30%
    Array(2049136, 100),
    Array(5062010, 100), //終極方塊
    Array(2450081, 100),
    Array(2048300, 100), //銀光潛能附加印章
    Array(2048301, 150), //金光
    Array(2048306, 350),  //附加潛能古卷
    Array(2431739, 200),  //楓點1000
    Array(2046913, 800), // 宿命正義單手武器攻擊力卷軸 100% // 為單手武器增加攻擊力屬性。
    Array(2046914, 800), // 宿命正義單手武器魔力卷軸 100% // 為單手武器增加魔法攻擊力屬性。
    Array(2046173, 800), // 宿命正義雙手武器攻擊力卷軸 100% // 為雙手武器增加攻擊力屬性。
    Array(2046577, 800), // 宿命正義防具力量卷軸 100% // 為防具增加力量屬性。
    Array(2046578, 800), // 宿命正義防具智力卷軸 100% // 為防具增加智力屬性。
    Array(2046579, 800), // 宿命正義防具敏捷卷軸 100% // 為防具增加敏捷屬性。
    Array(2046580, 800), // 宿命正義防具運氣卷軸 100% // 為防具增加運氣屬性。
    Array(2046763, 800), // 宿命正義飾品力量卷軸 100% // 為飾品增加力量屬性。
    Array(2046764, 800), // 宿命正義飾品智力卷軸 100% // 為飾品增加智力屬性。
    Array(2046765, 800), // 宿命正義飾品敏捷卷軸 100% // 為飾品增加敏捷屬性。
    Array(2046766, 1000), // 宿命正義飾品運氣卷軸 100% // 為飾品增加運氣屬性。
    Array(2613000, 1500), // 星火單手武器攻擊力卷軸 - 為單手武器附加提升攻擊力的屬性。
    Array(2613001, 1500), // - 星火單手武器魔法力卷軸 - 為單手武器附加提升魔力的屬性。
    Array(2612010, 1500) // - 星火雙手武器攻擊力卷軸 - 為雙手武器附加提升攻擊力的屬性。
    //Array(2431993, 2000, "培羅德飾品箱子"),
    //Array(2431988, 5000, "150級防具箱子#d[限時]#b")
    
);

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.sendOk("好吧，等你考慮清楚了再來找我。");
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
            text = "#h0#，你當前的里程為：#r"+cm.getPlayerPoints()+"#k點\r\n請選擇你想要兌換的物品：\r\n\r\n#b";
            for (var i=0; i<itemlist.length; i++) {
                var extraName = "";
                if (itemlist[i][2]!=null) {
                    extraName="("+itemlist[i][2]+")";
                }
                text += "#L" + i + "##i" + itemlist[i][0] + ":##t" + itemlist[i][0] + "#"+extraName+" - #r"+itemlist[i][1]+"#b 里程  \r\n";
                if (i != 0 && (i+1) % 5 == 0) {
                    text += "\r\n";
                }
            }
            cm.sendSimple(text);
            /*
        } else if (a == 1) {
            selects = selection;
            cm.sendGetNumber("請輸入你請你輸入想要購買的數量\r\n\r\n#r1個需要" + itemlist[selects][1] + "個#b雪花幣#k", 0, 0, 999999);*/
        } else if (a == 1) {
            selects = selection;
            buynum = 1;
            cm.sendYesNo("你想購買" + buynum + "個#r#i" + itemlist[selects][0] + "##k？\r\n你將使用掉" + (buynum * itemlist[selects][1]) + "里程。");
        } else if (a == 2) {
            var itemid = itemlist[selects][0];
            var itemType = Math.floor(itemid/1000000);
            
            var costPoints = buynum * itemlist[selects][1];
            if (cm.getPlayerPoints()>=costPoints) {
                if (cm.getSpace(itemType)<1) {
                    cm.sendOk("兌換失敗，包裹空間不足！");
                    cm.dispose();
                    return;
                }
                cm.gainPlayerPoints(-costPoints);
                cm.gainItem(itemlist[selects][0], buynum);
                cm.sendOk("購買成功了！");
                cm.dispose();
            } else {
                cm.sendOk("對不起，你沒有足夠的里程。");
                cm.dispose();
            }
        }
    }//mode
}//f