var a = 0;
var text;
var selects; //記錄玩家的選項
var buynum = 0;
var itemlist = Array(
Array(2049323, 5),
//Array(2049165, 1),
Array(2049137, 2),
Array(2049136, 3),
Array(2049750, 10),
Array(2040874,10),// - 暴風手套攻擊卷軸 - 為手套增加物理攻擊力屬性。\n成功率：100%，物理攻擊力+4
Array(2040875,10),//  - 暴風手套魔力卷軸 - 為手套增加魔法攻擊力屬性。\n成功率：100%，魔法攻擊力+4
Array(2613000,20),//  - 星火單手武器攻擊力卷軸 - 為單手武器附加提升攻擊力的屬性。
Array(2613001,20),//  - 星火單手武器魔法力卷軸 - 為單手武器附加提升魔力的屬性。
Array(2612010,20),//  - 星火雙手武器攻擊力卷軸 - 為雙手武器附加提升攻擊力的屬性。
Array(2047818, 35), // - 驚人的雙手武器攻擊力卷軸100% - 在雙手武器上附加提升攻擊力的屬性。
Array(2046996,35), // - 驚人的單手武器攻擊力卷軸100% - 對單手武器增加攻擊力提高屬性。
Array(2046997,35), // - 驚人的單手武器魔力卷軸100% - 對單手武器增加魔力提高屬性。
Array(2046913,15), // 宿命正義單手武器攻擊力卷軸 100% // 為單手武器增加攻擊力屬性。
Array(2046914,15), // 宿命正義單手武器魔力卷軸 100% // 為單手武器增加魔法攻擊力屬性。
Array(2046173,15), // 宿命正義雙手武器攻擊力卷軸 100% // 為雙手武器增加攻擊力屬性。
Array(2046577,10), // 宿命正義防具力量卷軸 100% // 為防具增加力量屬性。
Array(2046578,10), // 宿命正義防具智力卷軸 100% // 為防具增加智力屬性。
Array(2046579,10), // 宿命正義防具敏捷卷軸 100% // 為防具增加敏捷屬性。
Array(2046580,10), // 宿命正義防具運氣卷軸 100% // 為防具增加運氣屬性。
Array(2046763,10), // 宿命正義飾品力量卷軸 100% // 為飾品增加力量屬性。
Array(2046764,10), // 宿命正義飾品智力卷軸 100% // 為飾品增加智力屬性。
Array(2046765,10), // 宿命正義飾品敏捷卷軸 100% // 為飾品增加敏捷屬性。
Array(2046766,10)// 宿命正義飾品運氣卷軸 100% // 為飾品增加運氣屬性。
);

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
            text = "#h0#,您可以在這裡兌換#e#b極品卷軸#n#k,請選擇你想要購買的物品\r\n#b";
            for (var i=0; i<itemlist.length; i++) {
                text += "#L" + i + "##i" + itemlist[i] + ":##t" + itemlist[i] + "# - #r"+itemlist[i][1]+"#b雪花幣  \r\n";
                if (i != 0 && (i+1) % 5 == 0) {
                    text += "\r\n";
                }
            }
            cm.sendSimple(text);
        } else if (a == 1) {
            selects = selection;
            cm.sendGetNumber("請輸入你請你輸入想要購買的數量\r\n\r\n#r1個需要" + itemlist[selects][1] + "個#b雪花幣#k", 0, 0, 999999);
        } else if (a == 2) {
            buynum = selection;
            cm.sendNext("你想購買" + buynum + "個#r#i" + itemlist[selects][0] + "##k？\r\n你將使用掉" + (buynum * itemlist[selects][1]) + "雪花幣。");
        } else if (a == 3) {
            if (cm.haveItem(4310014,buynum * itemlist[selects][1])) {
                cm.gainItem(4310014, -buynum * itemlist[selects][1]);
                cm.gainItem(itemlist[selects][0], buynum);
                cm.sendOk("購買成功了！");
                cm.dispose();
            } else {
                cm.sendOk("對不起，你沒有足夠的雪花幣。");
                cm.dispose();
            }
        }
    }//mode
}//f