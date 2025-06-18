status = -1;
var itemList = Array(
1004808,
1004809,
1004810,
1004811,
1004812,
1102940,
1102941,
1102942,
1102943,
1102944,
1082695,
1082696,
1082697,
1082698,
1082699,
1053063,
1053064,
1053065,
1053066,
1053067,
1073158,
1073159,
1073160,
1073161,
1073162,
1152196,
1152197,
1152198,
1152199,
1152200
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
        im.sendSimple("請選擇你要換取的200級神秘防具箱子：\r\n#r"+text);
    } else if(status == 1) {
        var itemid = itemList[selection];
        var itemnum = Math.floor(Math.random()*1+1);
        if(im.canHold(itemid,1)){
            im.gainItem(itemid,1);
            im.worldSpouseMessage(0x0A,""+ im.getChar().getName() +" ：我從200級神秘防具箱子獲得  "+im.getItemName(itemid)+"大家一起恭喜我吧!");
            //im.gainGachaponItem(itemid, itemnum, "200級神秘防具箱子", 3);
            im.used();
            im.sendOk("恭喜您，獲得了"+itemnum+"件神秘防具") 
        }else{
            im.sendOk("請檢查背包有沒有位置!裝備欄一個,消耗欄一個");
        }
        im.safeDispose();
    }
}