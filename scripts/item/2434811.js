status = -1;
var itemList = Array(
1132246,
1122267,
1032223,
1113075
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
        im.sendSimple("請選擇你要換取的最高級培羅德首飾箱子：\r\n#r"+text);
    } else if(status == 1) {
        var itemid = itemList[selection];
        var itemnum = Math.floor(Math.random()*1+1);
        var item = im.gainGachaponItem(itemid, itemnum, "最高級培羅德首飾箱子", 3);
        im.gainItem(2434811, -1);
        im.sendOk("恭喜您，獲得了"+itemnum+"個#b#z"+itemid+"#");
        im.safeDispose();
    }
}