status = -1;
var itemList = Array(
1212089,
1222084,
1232084,
1242090,
1302297,
1312173,
1332247,
1342090,
1362109,
1372195,
1382231,
1402220,
1412152,
1422158,
1432187,
1442242,
1452226,
1462213,
1472235,
1482189,
1492199,
1522113,
1532118,
1252033,
1542072,
1552072,
1582025,
1262029,
1322223
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
        im.sendSimple("請選擇你要換取的武器：\r\n#r"+text);
    } else if(status == 1) {
        var itemid = itemList[selection];
        var itemnum = Math.floor(Math.random()*1+1);
        if(im.canHold(itemid,1)){
            im.gainItem(itemid,1);
            im.worldSpouseMessage(0x0A,""+ im.getChar().getName() +" ：我從V禮包中獲得  "+im.getItemName(itemid)+"大家一起恭喜我吧!");
            //im.gainGachaponItem(itemid, itemnum, "160級埃蘇萊布斯箱子", 3);
            im.used();
            im.sendOk("恭喜您，獲得了"+itemnum+"件漩渦武器") 
        }else{
            im.sendOk("請檢查背包有沒有位置!裝備欄一個,消耗欄一個");
        }
        im.safeDispose();
    }
}