status = -1;
var itemList = Array(
2047818,// - 驚人的雙手武器攻擊力卷軸100% - 在雙手武器上附加提升攻擊力的屬性。
2046996,// - 驚人的單手武器攻擊力卷軸100% - 對單手武器增加攻擊力提高屬性。
2046997,// - 驚人的單手武器魔力卷軸100% - 對單手武器增加魔力提高屬性。
2612059// - 驚人的雙手武器魔力卷軸100% - 對雙手武器增加魔力提高屬性。
);

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
       if (mode == 0 && status == 0) {
            im.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        var text = "";
        for(var i=0; i<itemList.length; i++) {
            text+="#L"+i+"##v"+itemList[i]+"##z"+itemList[i]+"##l\r\n";
        }
        im.sendSimple("請選擇你要換取的卷軸：\r\n#r"+text);
    } else if(status == 1) {
        var itemid = itemList[selection];
        var itemnum = Math.floor(Math.random()*1+1);
        var item = im.gainGachaponItem(itemid, itemnum, "驚人的箱子", 3);
        im.gainItem(2431995, -1);
        im.sendOk("恭喜您，獲得了"+itemnum+"張#b#z"+itemid+"#");
        im.safeDispose();
    }
}