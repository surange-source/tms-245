status = -1;
var itemList = Array(
1022195,//超越證明眼飾
1032201,//超越證明耳環
1122259,//超越證明吊墜
1012414,//超越證明臉飾
1113056//超越證明戒指

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
        im.sendSimple("請選擇你要換取的160級埃蘇萊布斯箱子：\r\n#r"+text);
    } else if(status == 1) {
        var itemid = itemList[selection];
        var itemnum = Math.floor(Math.random()*1+1);
        if(im.canHold(itemid,1)&&im.canHold(2433922,1)){
            im.gainGachaponItem(itemid, itemnum, "超越證明箱子", 3);
            im.gainItem(2433922,1);
            im.used();
            im.sendOk("恭喜您，獲得了"+itemnum+"個#b#z"+itemid+"# 以及 屬性提升券X1");
        }else{
            im.sendOk("請檢查背包有沒有位置");
        }
        im.safeDispose();
    }
}