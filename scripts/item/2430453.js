status = -1;
var itemList = Array(
Array(2048821,1),
Array(2048822,1)
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
        im.sendSimple("請選擇你要的V卷軸：\r\n#r"+text);
    } else if(status == 1) {
        var itemid = itemList[selection][0];
        var itemnum = itemList[selection][1];
        var item = im.gainGachaponItem(itemid, itemnum, "寵物V卷軸", 3);
        im.gainItem(2430453, -1);
        im.sendOk("恭喜您，獲得了"+itemnum+"個#b#z"+itemid+"#");
        im.safeDispose();
    }
}