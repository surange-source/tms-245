/*
 * 紅蝸牛 裝備強化  
 */
status = -1;
function start() {
    action(1, 0, 0);
}
需要的物品 = 2616051;
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
        /*10功擊力 +10敏捷
         10魔力 +10智利
         10功擊力 +10運氣
         10功擊力 +7全屬性
         10功擊力 +600Hp
         */
        if (cm.getInventory(1).getItem(1) != null && !cm.isCash(cm.getInventory(1).getItem(1).getItemId()) && cm.getInventory(1).getItem(1).getUpgradeSlots() != 0) {
            text = "強化裝備 -- 請選擇適合你的強化類型來進行強化。#e每次需要物品:#v" + 需要的物品 + "#作為強化材料，每次扣除1可升級次數！#n\r\n只能用於裝備第一格道具。你的第一格道具為： #v" + cm.getInventory(1).getItem(1).getItemId() + "##z" + cm.getInventory(1).getItem(1).getItemId() + "# 可升級 次數:" + cm.getInventory(1).getItem(1).getUpgradeSlots() + "\r\n";
            text += "#L0#增加10攻擊力,增加10力量#l\r\n";
            text += "#L1#增加10攻擊力,增加10敏捷#l\r\n";
            text += "#L2#增加10攻擊力,增加10運氣#l\r\n";
            text += "#L3#增加10攻擊力,增加10智力#l\r\n";
            text += "#L4#增加10攻擊力,全屬性加7點#l\r\n";
            text += "#L5#增加10攻擊力,增加600生命值";
            cm.sendSimple(text);
        } else {
            cm.sendOk("對不起你的第一格沒有強化的道具。請確保不是現金裝備並且裝備放在窗口第一格！\r\n#e強化的物品每次強化會扣除1次強化次數。裝備可強化次數不等於0可以使用！");
        }

    } else if (status == 1) {

        switch (selection) {
            case 0://增加10攻擊力,增加10力量
                if (cm.haveItem(需要的物品, 1)) {
                    ItemId = cm.getInventory(1).getItem(1).getItemId();
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
                    toDrop.setStr(cm.getInventory(1).getItem(1).getStr() + 10);
                    toDrop.setDex(cm.getInventory(1).getItem(1).getDex());
                    toDrop.setInt(cm.getInventory(1).getItem(1).getInt());
                    toDrop.setLuk(cm.getInventory(1).getItem(1).getLuk());
                    toDrop.setWatk(cm.getInventory(1).getItem(1).getWatk() + 10);
                    toDrop.setMatk(cm.getInventory(1).getItem(1).getMatk() + 10);
                    toDrop.setWdef(cm.getInventory(1).getItem(1).getWdef());
                    toDrop.setMdef(cm.getInventory(1).getItem(1).getMdef());
                    toDrop.setHp(cm.getInventory(1).getItem(1).getHp());
                    toDrop.setMp(cm.getInventory(1).getItem(1).getMp());
                    toDrop.setUpgradeSlots(cm.getInventory(1).getItem(1).getUpgradeSlots() - 1);
                    cm.addFromDrop(toDrop);
                    cm.gainItem(ItemId, -1);
                    cm.gainItem(需要的物品, -1);
                    cm.sendOk("恭喜你增加成功啦！");
                    cm.dispose();
                } else {
                    cm.sendOk("對不起需要的物品不足");
                    cm.dispose();
                }
                break;
            case 1://增加10攻擊力,增加10敏捷
                if (cm.haveItem(需要的物品, 1)) {
                    ItemId = cm.getInventory(1).getItem(1).getItemId();
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
                    toDrop.setStr(cm.getInventory(1).getItem(1).getStr());
                    toDrop.setDex(cm.getInventory(1).getItem(1).getDex() + 10);
                    toDrop.setInt(cm.getInventory(1).getItem(1).getInt());
                    toDrop.setLuk(cm.getInventory(1).getItem(1).getLuk());
                    toDrop.setWatk(cm.getInventory(1).getItem(1).getWatk() + 10);
                    toDrop.setMatk(cm.getInventory(1).getItem(1).getMatk() + 10);
                    toDrop.setWdef(cm.getInventory(1).getItem(1).getWdef());
                    toDrop.setMdef(cm.getInventory(1).getItem(1).getMdef());
                    toDrop.setHp(cm.getInventory(1).getItem(1).getHp());
                    toDrop.setMp(cm.getInventory(1).getItem(1).getMp());
                     toDrop.setUpgradeSlots(cm.getInventory(1).getItem(1).getUpgradeSlots() - 1);
                    cm.addFromDrop(toDrop);
                    cm.gainItem(ItemId, -1);
                    cm.gainItem(需要的物品, -1);
                    cm.sendOk("恭喜你增加成功啦！");
                    cm.dispose();
                } else {
                    cm.sendOk("對不起需要的物品不足");
                    cm.dispose();
                }
                break;
            case 2://增加10攻擊力,增加10運氣
                if (cm.haveItem(需要的物品, 1)) {
                    ItemId = cm.getInventory(1).getItem(1).getItemId();
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
                    toDrop.setStr(cm.getInventory(1).getItem(1).getStr());
                    toDrop.setDex(cm.getInventory(1).getItem(1).getDex());
                    toDrop.setInt(cm.getInventory(1).getItem(1).getInt());
                    toDrop.setLuk(cm.getInventory(1).getItem(1).getLuk() + 10);
                    toDrop.setWatk(cm.getInventory(1).getItem(1).getWatk() + 10);
                    toDrop.setMatk(cm.getInventory(1).getItem(1).getMatk() + 10);
                    toDrop.setWdef(cm.getInventory(1).getItem(1).getWdef());
                    toDrop.setMdef(cm.getInventory(1).getItem(1).getMdef());
                    toDrop.setHp(cm.getInventory(1).getItem(1).getHp());
                    toDrop.setMp(cm.getInventory(1).getItem(1).getMp());
                     toDrop.setUpgradeSlots(cm.getInventory(1).getItem(1).getUpgradeSlots() - 1);
                    cm.addFromDrop(toDrop);
                    cm.gainItem(ItemId, -1);
                    cm.gainItem(需要的物品, -1);
                    cm.sendOk("恭喜你增加成功啦！");
                    cm.dispose();
                } else {
                    cm.sendOk("對不起需要的物品不足");
                    cm.dispose();
                }
                break;
            case 3://10智力
                if (cm.haveItem(需要的物品, 1)) {
                    ItemId = cm.getInventory(1).getItem(1).getItemId();
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
                    toDrop.setStr(cm.getInventory(1).getItem(1).getStr());
                    toDrop.setDex(cm.getInventory(1).getItem(1).getDex());
                    toDrop.setInt(cm.getInventory(1).getItem(1).getInt() + 10);
                    toDrop.setLuk(cm.getInventory(1).getItem(1).getLuk());
                    toDrop.setWatk(cm.getInventory(1).getItem(1).getWatk() + 10);
                    toDrop.setMatk(cm.getInventory(1).getItem(1).getMatk() + 10);
                    toDrop.setWdef(cm.getInventory(1).getItem(1).getWdef());
                    toDrop.setMdef(cm.getInventory(1).getItem(1).getMdef());
                    toDrop.setHp(cm.getInventory(1).getItem(1).getHp());
                    toDrop.setMp(cm.getInventory(1).getItem(1).getMp());
                     toDrop.setUpgradeSlots(cm.getInventory(1).getItem(1).getUpgradeSlots() - 1);
                    cm.addFromDrop(toDrop);
                    cm.gainItem(ItemId, -1);
                    cm.gainItem(需要的物品, -1);
                    cm.sendOk("恭喜你增加成功啦！");
                    cm.dispose();
                } else {
                    cm.sendOk("對不起需要的物品不足");
                    cm.dispose();
                }
                break;
            case 4://全屬性+7
                if (cm.haveItem(需要的物品, 1)) {
                    ItemId = cm.getInventory(1).getItem(1).getItemId();
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
                    toDrop.setStr(cm.getInventory(1).getItem(1).getStr() + 7);
                    toDrop.setDex(cm.getInventory(1).getItem(1).getDex() + 7);
                    toDrop.setInt(cm.getInventory(1).getItem(1).getInt() + 7);
                    toDrop.setLuk(cm.getInventory(1).getItem(1).getLuk() + 7);
                    toDrop.setWatk(cm.getInventory(1).getItem(1).getWatk() + 10);
                    toDrop.setMatk(cm.getInventory(1).getItem(1).getMatk() + 10);
                    toDrop.setWdef(cm.getInventory(1).getItem(1).getWdef());
                    toDrop.setMdef(cm.getInventory(1).getItem(1).getMdef());
                    toDrop.setHp(cm.getInventory(1).getItem(1).getHp());
                    toDrop.setMp(cm.getInventory(1).getItem(1).getMp());
                     toDrop.setUpgradeSlots(cm.getInventory(1).getItem(1).getUpgradeSlots() - 1);
                    cm.addFromDrop(toDrop);
                    cm.gainItem(ItemId, -1);
                    cm.gainItem(需要的物品, -1);
                    cm.sendOk("恭喜你增加成功啦！");
                    cm.dispose();
                } else {
                    cm.sendOk("對不起需要的物品不足");
                    cm.dispose();
                }
                break;
            case 5://600生命
                if (cm.haveItem(需要的物品, 1)) {
                    ItemId = cm.getInventory(1).getItem(1).getItemId();
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
                    toDrop.setStr(cm.getInventory(1).getItem(1).getStr());
                    toDrop.setDex(cm.getInventory(1).getItem(1).getDex());
                    toDrop.setInt(cm.getInventory(1).getItem(1).getInt());
                    toDrop.setLuk(cm.getInventory(1).getItem(1).getLuk());
                    toDrop.setWatk(cm.getInventory(1).getItem(1).getWatk() + 10);
                    toDrop.setMatk(cm.getInventory(1).getItem(1).getMatk() + 10);
                    toDrop.setWdef(cm.getInventory(1).getItem(1).getWdef());
                    toDrop.setMdef(cm.getInventory(1).getItem(1).getMdef());
                    toDrop.setHp(cm.getInventory(1).getItem(1).getHp() + 600);
                    toDrop.setMp(cm.getInventory(1).getItem(1).getMp());
                     toDrop.setUpgradeSlots(cm.getInventory(1).getItem(1).getUpgradeSlots() - 1);
                    cm.addFromDrop(toDrop);
                    cm.gainItem(ItemId, -1);
                    cm.gainItem(需要的物品, -1);
                    cm.sendOk("恭喜你增加成功啦！");
                    cm.dispose();
                } else {
                    cm.sendOk("對不起需要的物品不足");
                    cm.dispose();
                }
                break;
        }

    }
}