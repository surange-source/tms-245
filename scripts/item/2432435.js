status = -1;
var itemList = Array(
1202000,
1202001,
1202002,
1202003,
1202004,
1202023,
1202024,
1202025,
1202026,
1202027,
1202028,
1202029,
1202030,
1202031
);
function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            im.sendOk("不想使用嗎？");
            im.dispose();
        }
        status--;
    }
    if (status == 0) {
        var text = "";
        for(var i=0; i<itemList.length; i++) {
            text+="#L"+i+"##v"+itemList[i]+"##z"+itemList[i]+"##l\r\n";
        }
            im.sendSimple("#b請選擇需要加屬性的點裝道具:\r\n#b" + avail);
    }else if(status == 1){
        var ItemId = itemList[selection];
        var itemnum = Math.floor(Math.random()*1+1);
        if(im.getInventory(1).getItem(i).getItemId() == itemList[selection]){
        im.gainItem(ItemId,-1);
        var toDrop = im.getNewEquip(ItemId); // 生成一個Equip類                    
            toDrop.setStr(200); //裝備力量
            toDrop.setDex(200); //裝備敏捷
            toDrop.setInt(200); //裝備智力
            toDrop.setLuk(200); //裝備運氣
            toDrop.setMatk(200);
            toDrop.setWatk(200);
            toDrop.setOwner("糖糖巔峰玩家");
            im.addFromDrop(toDrop);
            im.used();
            //im.worldSpouseMessage(0x0A,""+ im.getChar().getName() +" ：我從壽司公會帽子箱打造了 全屬性200 "+im.getItemName(ItemId)+"大家一起恭喜我吧!");
            im.dispose();
    }
}
}