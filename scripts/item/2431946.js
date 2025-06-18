status = -1;
var itemList = Array(
1232113,
1242121,
1242122,
1262039,
1302343,
1312203,
1322255,
1332279,
1342104,
1362140,
1372228,
1382265,
1402259,
1412181,
1422189,
1432218,
1442274,
1452257,
1462243,
1472265,
1482221,
1492235,
1522143,
1532150,
1582023,
1542117,
1552119,
1252098
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
        im.sendSimple("請選擇你要換取的200級神秘武器箱子：\r\n#r"+text);
    } else if(status == 1) {
        var itemid = itemList[selection];
        var itemnum = Math.floor(Math.random()*1+1);
        if(im.canHold(itemid,1)){
            im.gainItem(itemid,1);
            im.worldSpouseMessage(0x0A,""+ im.getChar().getName() +" ：我從200級神秘武器箱子獲得  "+im.getItemName(itemid)+"大家一起恭喜我吧!");
            //im.gainGachaponItem(itemid, itemnum, "200級神秘武器箱子", 3);
            im.used();
            im.sendOk("恭喜您，獲得了"+itemnum+"件神秘武器") 
        }else{
            im.sendOk("請檢查背包有沒有位置!裝備欄一個,消耗欄一個");
        }
        im.safeDispose();
    }
}