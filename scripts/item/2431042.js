status = -1;
var itemList = Array(
//Array(2048817,10),
//Array(2048818,10),
Array(2613050,10),
Array(2613051,10),
Array(2612061,10),
Array(2612062,10),
Array(2616061,10),
Array(2616062,10),
Array(2615031,10),
Array(2615032,10)
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
            text+="#L"+i+"##v"+itemList[i][0]+"##z"+itemList[i][0]+"#  數量：#r"+itemList[i][1]+"#k張#l\r\n";
        }
        im.sendSimple("請選擇你要的X卷軸：\r\n#r"+text);
    } else if(status == 1) {
        var itemid = itemList[selection][0];
        var itemnum = itemList[selection][1];
        var item = im.gainGachaponItem(itemid, itemnum, "自選X卷軸", 3);
        im.gainItem(2431042, -1);
        im.sendOk("恭喜您，獲得了"+itemnum+"個#b#z"+itemid+"#");
        im.safeDispose();
    }
}