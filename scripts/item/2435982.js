status = -1;
var itemList = Array(
1003976,
1102623,
1082556,
1052669,
1072870,
1012438,
1022211,
1032224,
1122269,
1132247,
1152160
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
        im.sendSimple("請選擇你要換取的漩渦裝備：\r\n#r"+text);
    } else if(status == 1) {
        var itemid = itemList[selection];
        var itemnum = Math.floor(Math.random()*1+1);
        if(im.canHold(itemid,1)){
            im.gainItem(itemid,1);
            im.worldSpouseMessage(0x0A,""+ im.getChar().getName() +" ：我從V禮包中獲得  "+im.getItemName(itemid)+"大家一起恭喜我吧!");
            //im.gainGachaponItem(itemid, itemnum, "160級漩渦自選箱子", 3);
            im.used();
            im.sendOk("恭喜您，獲得了"+itemnum+"件漩渦自選") 
        }else{
            im.sendOk("請檢查背包有沒有位置!裝備欄一個,消耗欄一個");
        }
        im.safeDispose();
    }
}