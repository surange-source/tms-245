status = -1;
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
        var avail = "";
            for (var i = 0; i < 96; i++) {
                if (im.getInventory(6).getItem(i) != null&&im.isCash(im.getInventory(6).getItem(i).getItemId())) {
                    avail += "#L" + im.getInventory(6).getItem(i).getItemId() + "# #z" + im.getInventory(6).getItem(i).getItemId() + "# #i" + im.getInventory(6).getItem(i).getItemId() + ":##l\r\n";
                }
            }
            im.sendSimple("#b請選擇需要加屬性的點裝道具:\r\n#b" + avail);
    }else if(status == 1){
        ItemId = selection;
        im.gainItem(ItemId,-1);
        var toDrop = im.getNewEquip(ItemId); // 生成一個Equip類                    
                        toDrop.setStr(toDrop.getStr()+200); //裝備力量
            toDrop.setDex(10); //裝備敏捷
            toDrop.setInt(10); //裝備智力
            toDrop.setLuk(10); //裝備運氣
            toDrop.setMatk(10);
            toDrop.setWatk(10);
            im.addFromDrop(toDrop);
            im.used();
            im.dispose();
    }
}