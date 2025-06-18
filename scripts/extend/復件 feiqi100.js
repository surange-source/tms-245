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
        Array(5062002, 50), //高級神奇方塊
    Array(5062010, 80), //終極方塊
        Array(5062500, 100), //大師附加方塊
    Array(2450081, 100),
    Array(2048300, 100), //銀光潛能附加印章
    Array(2048301, 150), //金光
    Array(2048306, 350), //附加潛能古卷
    Array(3010070, 500), //巨無霸品克冰
    Array(1702581, 900), //三色蛋糕串串
        Array(1702561, 900), //叉子上的蛋糕
        Array(1102723, 1000), //光明天使羽翼
        Array(1102724, 1000), //黑暗天使羽翼
    Array(2046913, 1200), // 宿命正義單手武器攻擊力卷軸 100% // 為單手武器增加攻擊力屬性。
    Array(2046914, 1200), // 宿命正義單手武器魔力卷軸 100% // 為單手武器增加魔法攻擊力屬性。
    Array(2613000, 2500), // 星火單手武器攻擊力卷軸 - 為單手武器附加提升攻擊力的屬性。
    Array(2613001, 2500), // - 星火單手武器魔法力卷軸 - 為單手武器附加提升魔力的屬性。
    Array(2431993, 5000) // - 培羅德飾品箱子 - 包含培羅德飾品裝備
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
            text = "#h0#，你當前的積分為：#r"+cm.getPlayerPoints()+"#k點\r\n請選擇你想要兌換的物品：\r\n\r\n#b";
            for (var i=0; i<itemlist.length; i++) {
                var extraName = "";
                if (itemlist[i][2]!=null) {
                    extraName="("+itemlist[i][2]+")";
                }
                text += "#L" + i + "##i" + itemlist[i][0] + ":##t" + itemlist[i][0] + "#"+extraName+" - #r"+itemlist[i][1]+"#b 積分  \r\n";
                if (i != 0 && (i+1) % 100 == 0) {
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
            cm.sendYesNo("你想購買" + buynum + "個#r#i" + itemlist[selects][0] + "##k？\r\n你將使用掉" + (buynum * itemlist[selects][1]) + "積分。");
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
                cm.sendOk("對不起，你沒有足夠的積分。");
                cm.dispose();
            }
        }
    }//mode
}//f