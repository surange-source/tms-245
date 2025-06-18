status = -1;
function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {

            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
            if (cm.getInventory(1).getItem(1) != null && !cm.isCash(cm.getInventory(1).getItem (1).getItemId())) {
                cm.sendYesNo("強化裝備 -- 增加強化次數。\r\n#r注意:強化前的裝備屬性將會被保留,強化後裝備的可升級次數可以通過使用純白卷軸增加\r\n#r警告:每件裝備最多只可通過神器強化強化4次,超出者後果自負且不予補償!!!\r\n警告:如強化的部位為武器,武器的破功將會被還原至初始狀態!!!\r\n#b只能用於裝備第一格道具。你的第一格道具為： #v"+cm.getInventory(1).getItem(1).getItemId()+"##z"+cm.getInventory(1).getItem(1).getItemId()+"# 可升級 次數:"+cm.getInventory(1).getItem(1).getUpgradeSlots()+"\r\n是否進行強化?")
            }else{
                cm.sendOk("對不起你的第一格沒有強化的道具。請確保不是現金裝備並且裝備放在窗口第一格！");
            }
       
    } else if (status == 1) {
        if (cm.haveItem(2570002, 1)) {
            ItemId = cm.getInventory(1).getItem(1).getItemId();
       
            var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
            toDrop.setUpgradeSlots(cm.getInventory(1).getItem(1).getUpgradeSlots()+1);//UpgradeSlots
            toDrop.setStr(cm.getInventory(1).getItem(1).getStr());
            toDrop.setDex(cm.getInventory(1).getItem(1).getDex());
            toDrop.setInt(cm.getInventory(1).getItem(1).getInt());
            toDrop.setLuk(cm.getInventory(1).getItem(1).getLuk());
            toDrop.setWatk(cm.getInventory(1).getItem(1).getWatk());
            toDrop.setMatk(cm.getInventory(1).getItem(1).getMatk());
            toDrop.setWdef(cm.getInventory(1).getItem(1).getWdef());
            toDrop.setMdef(cm.getInventory(1).getItem(1).getMdef());
            toDrop.setHp(cm.getInventory(1).getItem(1).getHp());
            toDrop.setMp(cm.getInventory(1).getItem(1).getMp());
            cm.addFromDrop(toDrop);
            
           cm.gainItem(ItemId, -1);
            cm.sendOk("恭喜你增加成功啦！");
            cm.gainItem(2570002, -1);

            cm.dispose();
        } else {
            cm.sendOk("物品不足");
            cm.dispose();
        }
    }
}
