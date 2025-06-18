/*
 * 神秘提升
 */
status = -1;

function start() {
    action(1, 0, 0);
}
需要的物品 = 1712000;
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
        if (cm.getInventory(1).getItem(1) !=  null && !cm.isCash(cm.getInventory(1).getItem(1).getItemId()) && (cm.getInventory(1).getItem(1).getItemId() == 1712001 ||  cm.getInventory(1).getItem(1).getItemId() == 1712002 ||  cm.getInventory(1).getItem(1).getItemId() == 1712003)) {
            text = "#e每次需要物品:#v" + 需要的物品 + "#神秘力量徽章只可對以下三種徽章進行升級！#n\r\n #v1712001##v1712002##v1712003#\r\n"+"#e#r警告:所升級的徽章必須放在裝備欄第一格且滿足要求,你的第一格道具為： #v" + cm.getInventory(1).getItem(1).getItemId() + "##z" + cm.getInventory(1).getItem(1).getItemId()+ "\r\n\r\n";
            text += "#b#L0#+6ARC,+6力量#l\r\n";
            text += "#L1#+6ARC,+6敏捷#l\r\n";
            text += "#L2#+6ARC,+6運氣#l\r\n";
            text += "#L3#+6ARC,+6智力#l\r\n";
            text += "#L4#+6ARC,+3全屬性#l\r\n";
            text += "#L5#+6ARC,+600 HP";
            cm.sendSimple(text);
        } else {
            cm.sendOk("對不起你的第一格沒有強化的道具。請確保不是現金裝備並且裝備放在窗口第一格！\r\n#e每次強化你需要重新將徽章放入第一格.目前支持強化的道具為:\r\n#v1712001##z1712001#\r\n#v1712002##z1712002#\r\n#v1712003##z1712003#");
        }

    } else if (status == 1) {

        switch (selection) {
            case 0://增加10攻擊力,增加10力量
                if (cm.haveItem(需要的物品, 1)) {

                    ItemId = cm.getInventory(1).getItem(1).getItemId();
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
                    toDrop.setStr(cm.getInventory(1).getItem(1).getStr() + 60);
                    toDrop.setDex(cm.getInventory(1).getItem(1).getDex());
                    toDrop.setInt(cm.getInventory(1).getItem(1).getInt());
                    toDrop.setLuk(cm.getInventory(1).getItem(1).getLuk());
                    toDrop.setWatk(cm.getInventory(1).getItem(1).getWatk());
                    toDrop.setMatk(cm.getInventory(1).getItem(1).getMatk());
                    toDrop.setWdef(cm.getInventory(1).getItem(1).getWdef());
                    toDrop.setMdef(cm.getInventory(1).getItem(1).getMdef());
                    toDrop.setHp(cm.getInventory(1).getItem(1).getHp());
                    toDrop.setMp(cm.getInventory(1).getItem(1).getMp());
                    toDrop.setARC(cm.getInventory(1).getItem(1).getARC() + 60);
    
              if((cm.getInventory(1).getItem(1).getARC()/300) >= 1){
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
                    toDrop.setStr(cm.getInventory(1).getItem(1).getStr() + 60);
                    toDrop.setDex(cm.getInventory(1).getItem(1).getDex());
                    toDrop.setInt(cm.getInventory(1).getItem(1).getInt());
                    toDrop.setLuk(cm.getInventory(1).getItem(1).getLuk());
                    toDrop.setWatk(cm.getInventory(1).getItem(1).getWatk()+1);
                    toDrop.setMatk(cm.getInventory(1).getItem(1).getMatk());
                    toDrop.setWdef(cm.getInventory(1).getItem(1).getWdef());
                    toDrop.setMdef(cm.getInventory(1).getItem(1).getMdef());
                    toDrop.setHp(cm.getInventory(1).getItem(1).getHp());
                    toDrop.setMp(cm.getInventory(1).getItem(1).getMp());
                    toDrop.setARC(cm.getInventory(1).getItem(1).getARC() + 60);    
}
              if((cm.getInventory(1).getItem(1).getARC()/300) >= 2){
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
                    toDrop.setStr(cm.getInventory(1).getItem(1).getStr() + 60);
                    toDrop.setDex(cm.getInventory(1).getItem(1).getDex());
                    toDrop.setInt(cm.getInventory(1).getItem(1).getInt());
                    toDrop.setLuk(cm.getInventory(1).getItem(1).getLuk());
                    toDrop.setWatk(cm.getInventory(1).getItem(1).getWatk()+2);
                    toDrop.setMatk(cm.getInventory(1).getItem(1).getMatk());
                    toDrop.setWdef(cm.getInventory(1).getItem(1).getWdef());
                    toDrop.setMdef(cm.getInventory(1).getItem(1).getMdef());
                    toDrop.setHp(cm.getInventory(1).getItem(1).getHp());
                    toDrop.setMp(cm.getInventory(1).getItem(1).getMp());
                    toDrop.setARC(cm.getInventory(1).getItem(1).getARC() + 60);    
}
              if((cm.getInventory(1).getItem(1).getARC()/300) >= 3){
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
                    toDrop.setStr(cm.getInventory(1).getItem(1).getStr() + 60);
                    toDrop.setDex(cm.getInventory(1).getItem(1).getDex());
                    toDrop.setInt(cm.getInventory(1).getItem(1).getInt());
                    toDrop.setLuk(cm.getInventory(1).getItem(1).getLuk());
                    toDrop.setWatk(cm.getInventory(1).getItem(1).getWatk()+3);
                    toDrop.setMatk(cm.getInventory(1).getItem(1).getMatk());
                    toDrop.setWdef(cm.getInventory(1).getItem(1).getWdef());
                    toDrop.setMdef(cm.getInventory(1).getItem(1).getMdef());
                    toDrop.setHp(cm.getInventory(1).getItem(1).getHp());
                    toDrop.setMp(cm.getInventory(1).getItem(1).getMp());
                    toDrop.setARC(cm.getInventory(1).getItem(1).getARC() + 60);    
}
              if((cm.getInventory(1).getItem(1).getARC()) >= 1000){
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
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
                    toDrop.setARC(cm.getInventory(1).getItem(1).getARC());    
}
                    cm.addFromDrop(toDrop);
                    cm.gainItem(ItemId, -1);
                    cm.gainItem(需要的物品, -1);
                    cm.sendOk("恭喜你增加成功啦！");
                    cm.worldSpouseMessage(0x0D,"[神秘力量] :  "+ cm.getChar().getName() +"  通過使用神秘徽章將其神秘力量提升了!!!");
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
                    toDrop.setDex(cm.getInventory(1).getItem(1).getDex() + 6);
                    toDrop.setInt(cm.getInventory(1).getItem(1).getInt());
                    toDrop.setLuk(cm.getInventory(1).getItem(1).getLuk());
                    toDrop.setWatk(cm.getInventory(1).getItem(1).getWatk());
                    toDrop.setMatk(cm.getInventory(1).getItem(1).getMatk());
                    toDrop.setWdef(cm.getInventory(1).getItem(1).getWdef());
                    toDrop.setMdef(cm.getInventory(1).getItem(1).getMdef());
                    toDrop.setHp(cm.getInventory(1).getItem(1).getHp());
                    toDrop.setMp(cm.getInventory(1).getItem(1).getMp());
                    toDrop.setARC(cm.getInventory(1).getItem(1).getARC() + 6);  

              if((cm.getInventory(1).getItem(1).getARC()/300) >= 1){
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
                    toDrop.setStr(cm.getInventory(1).getItem(1).getStr());
                    toDrop.setDex(cm.getInventory(1).getItem(1).getDex()+6);
                    toDrop.setInt(cm.getInventory(1).getItem(1).getInt());
                    toDrop.setLuk(cm.getInventory(1).getItem(1).getLuk());
                    toDrop.setWatk(cm.getInventory(1).getItem(1).getWatk()+1);
                    toDrop.setMatk(cm.getInventory(1).getItem(1).getMatk());
                    toDrop.setWdef(cm.getInventory(1).getItem(1).getWdef());
                    toDrop.setMdef(cm.getInventory(1).getItem(1).getMdef());
                    toDrop.setHp(cm.getInventory(1).getItem(1).getHp());
                    toDrop.setMp(cm.getInventory(1).getItem(1).getMp());
                    toDrop.setARC(cm.getInventory(1).getItem(1).getARC()+6);    
}
              if((cm.getInventory(1).getItem(1).getARC()/300) >= 2){
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
                    toDrop.setStr(cm.getInventory(1).getItem(1).getStr());
                    toDrop.setDex(cm.getInventory(1).getItem(1).getDex() + 6);
                    toDrop.setInt(cm.getInventory(1).getItem(1).getInt());
                    toDrop.setLuk(cm.getInventory(1).getItem(1).getLuk());
                    toDrop.setWatk(cm.getInventory(1).getItem(1).getWatk()+2);
                    toDrop.setMatk(cm.getInventory(1).getItem(1).getMatk());
                    toDrop.setWdef(cm.getInventory(1).getItem(1).getWdef());
                    toDrop.setMdef(cm.getInventory(1).getItem(1).getMdef());
                    toDrop.setHp(cm.getInventory(1).getItem(1).getHp());
                    toDrop.setMp(cm.getInventory(1).getItem(1).getMp());
                    toDrop.setARC(cm.getInventory(1).getItem(1).getARC() + 6);    
}
              if((cm.getInventory(1).getItem(1).getARC()/300) >= 3){
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
                    toDrop.setStr(cm.getInventory(1).getItem(1).getStr());
                    toDrop.setDex(cm.getInventory(1).getItem(1).getDex() + 6);
                    toDrop.setInt(cm.getInventory(1).getItem(1).getInt());
                    toDrop.setLuk(cm.getInventory(1).getItem(1).getLuk());
                    toDrop.setWatk(cm.getInventory(1).getItem(1).getWatk()+3);
                    toDrop.setMatk(cm.getInventory(1).getItem(1).getMatk());
                    toDrop.setWdef(cm.getInventory(1).getItem(1).getWdef());
                    toDrop.setMdef(cm.getInventory(1).getItem(1).getMdef());
                    toDrop.setHp(cm.getInventory(1).getItem(1).getHp());
                    toDrop.setMp(cm.getInventory(1).getItem(1).getMp());
                    toDrop.setARC(cm.getInventory(1).getItem(1).getARC() + 6);    
}
              if((cm.getInventory(1).getItem(1).getARC()) >= 1000){
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
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
                    toDrop.setARC(cm.getInventory(1).getItem(1).getARC());    
}
                    cm.addFromDrop(toDrop);
                    cm.gainItem(ItemId, -1);
                    cm.gainItem(需要的物品, -1);
                    cm.sendOk("恭喜你增加成功啦！");
                    cm.worldSpouseMessage(0x0D,"[神秘力量] :  "+ cm.getChar().getName() +"  通過使用神秘徽章將其神秘力量提升了!!!");
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
                    toDrop.setLuk(cm.getInventory(1).getItem(1).getLuk() + 6);
                    toDrop.setWatk(cm.getInventory(1).getItem(1).getWatk());
                    toDrop.setMatk(cm.getInventory(1).getItem(1).getMatk());
                    toDrop.setWdef(cm.getInventory(1).getItem(1).getWdef());
                    toDrop.setMdef(cm.getInventory(1).getItem(1).getMdef());
                    toDrop.setHp(cm.getInventory(1).getItem(1).getHp());
                    toDrop.setMp(cm.getInventory(1).getItem(1).getMp());
                    toDrop.setARC(cm.getInventory(1).getItem(1).getARC() + 6);
              if((cm.getInventory(1).getItem(1).getARC()/300) >= 1){
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
                    toDrop.setStr(cm.getInventory(1).getItem(1).getStr());
                    toDrop.setDex(cm.getInventory(1).getItem(1).getDex());
                    toDrop.setInt(cm.getInventory(1).getItem(1).getInt());
                    toDrop.setLuk(cm.getInventory(1).getItem(1).getLuk()+ 6);
                    toDrop.setWatk(cm.getInventory(1).getItem(1).getWatk()+1);
                    toDrop.setMatk(cm.getInventory(1).getItem(1).getMatk());
                    toDrop.setWdef(cm.getInventory(1).getItem(1).getWdef());
                    toDrop.setMdef(cm.getInventory(1).getItem(1).getMdef());
                    toDrop.setHp(cm.getInventory(1).getItem(1).getHp());
                    toDrop.setMp(cm.getInventory(1).getItem(1).getMp());
                    toDrop.setARC(cm.getInventory(1).getItem(1).getARC() + 6);    
}
              if((cm.getInventory(1).getItem(1).getARC()/300) >= 2){
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
                    toDrop.setStr(cm.getInventory(1).getItem(1).getStr());
                    toDrop.setDex(cm.getInventory(1).getItem(1).getDex());
                    toDrop.setInt(cm.getInventory(1).getItem(1).getInt());
                    toDrop.setLuk(cm.getInventory(1).getItem(1).getLuk() + 6);
                    toDrop.setWatk(cm.getInventory(1).getItem(1).getWatk()+2);
                    toDrop.setMatk(cm.getInventory(1).getItem(1).getMatk());
                    toDrop.setWdef(cm.getInventory(1).getItem(1).getWdef());
                    toDrop.setMdef(cm.getInventory(1).getItem(1).getMdef());
                    toDrop.setHp(cm.getInventory(1).getItem(1).getHp());
                    toDrop.setMp(cm.getInventory(1).getItem(1).getMp());
                    toDrop.setARC(cm.getInventory(1).getItem(1).getARC() + 6);    
}
              if((cm.getInventory(1).getItem(1).getARC()/300) >= 3){
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
                    toDrop.setStr(cm.getInventory(1).getItem(1).getStr());
                    toDrop.setDex(cm.getInventory(1).getItem(1).getDex());
                    toDrop.setInt(cm.getInventory(1).getItem(1).getInt());
                    toDrop.setLuk(cm.getInventory(1).getItem(1).getLuk() + 6);
                    toDrop.setWatk(cm.getInventory(1).getItem(1).getWatk()+3);
                    toDrop.setMatk(cm.getInventory(1).getItem(1).getMatk());
                    toDrop.setWdef(cm.getInventory(1).getItem(1).getWdef());
                    toDrop.setMdef(cm.getInventory(1).getItem(1).getMdef());
                    toDrop.setHp(cm.getInventory(1).getItem(1).getHp());
                    toDrop.setMp(cm.getInventory(1).getItem(1).getMp());
                    toDrop.setARC(cm.getInventory(1).getItem(1).getARC() + 6);    
}
              if((cm.getInventory(1).getItem(1).getARC()) >= 1000){
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
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
                    toDrop.setARC(cm.getInventory(1).getItem(1).getARC());    
}
                    cm.addFromDrop(toDrop);
                    cm.gainItem(ItemId, -1);
                    cm.gainItem(需要的物品, -1);
                    cm.sendOk("恭喜你增加成功啦！");
                    cm.worldSpouseMessage(0x0D,"[神秘力量] :  "+ cm.getChar().getName() +"  通過使用神秘徽章將其神秘力量提升了!!!");
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
                    toDrop.setInt(cm.getInventory(1).getItem(1).getInt() + 6);
                    toDrop.setLuk(cm.getInventory(1).getItem(1).getLuk());
                    toDrop.setWatk(cm.getInventory(1).getItem(1).getWatk());
                    toDrop.setMatk(cm.getInventory(1).getItem(1).getMatk());
                    toDrop.setWdef(cm.getInventory(1).getItem(1).getWdef());
                    toDrop.setMdef(cm.getInventory(1).getItem(1).getMdef());
                    toDrop.setHp(cm.getInventory(1).getItem(1).getHp());
                    toDrop.setMp(cm.getInventory(1).getItem(1).getMp());
                    toDrop.setARC(cm.getInventory(1).getItem(1).getARC() + 6);
              if((cm.getInventory(1).getItem(1).getARC()/300) >= 1){
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
                    toDrop.setStr(cm.getInventory(1).getItem(1).getStr());
                    toDrop.setDex(cm.getInventory(1).getItem(1).getDex());
                    toDrop.setInt(cm.getInventory(1).getItem(1).getInt() + 6);
                    toDrop.setLuk(cm.getInventory(1).getItem(1).getLuk());
                    toDrop.setWatk(cm.getInventory(1).getItem(1).getWatk());
                    toDrop.setMatk(cm.getInventory(1).getItem(1).getMatk() + 1);
                    toDrop.setWdef(cm.getInventory(1).getItem(1).getWdef());
                    toDrop.setMdef(cm.getInventory(1).getItem(1).getMdef());
                    toDrop.setHp(cm.getInventory(1).getItem(1).getHp());
                    toDrop.setMp(cm.getInventory(1).getItem(1).getMp());
                    toDrop.setARC(cm.getInventory(1).getItem(1).getARC() + 6);    
}
              if((cm.getInventory(1).getItem(1).getARC()/300) >= 2){
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
                    toDrop.setStr(cm.getInventory(1).getItem(1).getStr());
                    toDrop.setDex(cm.getInventory(1).getItem(1).getDex());
                    toDrop.setInt(cm.getInventory(1).getItem(1).getInt() + 6);
                    toDrop.setLuk(cm.getInventory(1).getItem(1).getLuk());
                    toDrop.setWatk(cm.getInventory(1).getItem(1).getWatk());
                    toDrop.setMatk(cm.getInventory(1).getItem(1).getMatk() + 2);
                    toDrop.setWdef(cm.getInventory(1).getItem(1).getWdef());
                    toDrop.setMdef(cm.getInventory(1).getItem(1).getMdef());
                    toDrop.setHp(cm.getInventory(1).getItem(1).getHp());
                    toDrop.setMp(cm.getInventory(1).getItem(1).getMp());
                    toDrop.setARC(cm.getInventory(1).getItem(1).getARC() + 6);    
}
              if((cm.getInventory(1).getItem(1).getARC()/300) >= 3){
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
                    toDrop.setStr(cm.getInventory(1).getItem(1).getStr());
                    toDrop.setDex(cm.getInventory(1).getItem(1).getDex());
                    toDrop.setInt(cm.getInventory(1).getItem(1).getInt() + 6);
                    toDrop.setLuk(cm.getInventory(1).getItem(1).getLuk());
                    toDrop.setWatk(cm.getInventory(1).getItem(1).getWatk());
                    toDrop.setMatk(cm.getInventory(1).getItem(1).getMatk() + 3);
                    toDrop.setWdef(cm.getInventory(1).getItem(1).getWdef());
                    toDrop.setMdef(cm.getInventory(1).getItem(1).getMdef());
                    toDrop.setHp(cm.getInventory(1).getItem(1).getHp());
                    toDrop.setMp(cm.getInventory(1).getItem(1).getMp());
                    toDrop.setARC(cm.getInventory(1).getItem(1).getARC() + 6);    
}
              if((cm.getInventory(1).getItem(1).getARC()) >= 1000){
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
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
                    toDrop.setARC(cm.getInventory(1).getItem(1).getARC());    
}
                    cm.addFromDrop(toDrop);
                    cm.gainItem(ItemId, -1);
                    cm.gainItem(需要的物品, -1);
                    cm.sendOk("恭喜你增加成功啦！");
                    cm.worldSpouseMessage(0x0D,"[神秘力量] :  "+ cm.getChar().getName() +"  通過使用神秘徽章將其神秘力量提升了!!!");
                    cm.dispose();
                } else {
                    cm.sendOk("對不起需要的物品不足");
                    cm.dispose();
                }
                break;
            case 4://全屬性+5
                if (cm.haveItem(需要的物品, 1)) {
                    ItemId = cm.getInventory(1).getItem(1).getItemId();
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
                    toDrop.setStr(cm.getInventory(1).getItem(1).getStr() + 3);
                    toDrop.setDex(cm.getInventory(1).getItem(1).getDex() + 3);
                    toDrop.setInt(cm.getInventory(1).getItem(1).getInt() + 3);
                    toDrop.setLuk(cm.getInventory(1).getItem(1).getLuk() + 3);
                    toDrop.setWatk(cm.getInventory(1).getItem(1).getWatk());
                    toDrop.setMatk(cm.getInventory(1).getItem(1).getMatk());
                    toDrop.setWdef(cm.getInventory(1).getItem(1).getWdef());
                    toDrop.setMdef(cm.getInventory(1).getItem(1).getMdef());
                    toDrop.setHp(cm.getInventory(1).getItem(1).getHp());
                    toDrop.setMp(cm.getInventory(1).getItem(1).getMp());
                    toDrop.setARC(cm.getInventory(1).getItem(1).getARC() + 6);
              if((cm.getInventory(1).getItem(1).getARC()/300) >= 1){
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
                    toDrop.setStr(cm.getInventory(1).getItem(1).getStr() + 3);
                    toDrop.setDex(cm.getInventory(1).getItem(1).getDex() + 3);
                    toDrop.setInt(cm.getInventory(1).getItem(1).getInt() + 3);
                    toDrop.setLuk(cm.getInventory(1).getItem(1).getLuk() + 3);
                    toDrop.setWatk(cm.getInventory(1).getItem(1).getWatk()+1);
                    toDrop.setMatk(cm.getInventory(1).getItem(1).getMatk());
                    toDrop.setWdef(cm.getInventory(1).getItem(1).getWdef());
                    toDrop.setMdef(cm.getInventory(1).getItem(1).getMdef());
                    toDrop.setHp(cm.getInventory(1).getItem(1).getHp());
                    toDrop.setMp(cm.getInventory(1).getItem(1).getMp());
                    toDrop.setARC(cm.getInventory(1).getItem(1).getARC() + 6);    
}
              if((cm.getInventory(1).getItem(1).getARC()/300) >= 2){
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
                    toDrop.setStr(cm.getInventory(1).getItem(1).getStr() + 3);
                    toDrop.setDex(cm.getInventory(1).getItem(1).getDex() + 3);
                    toDrop.setInt(cm.getInventory(1).getItem(1).getInt() + 3);
                    toDrop.setLuk(cm.getInventory(1).getItem(1).getLuk() + 3);
                    toDrop.setWatk(cm.getInventory(1).getItem(1).getWatk()+2);
                    toDrop.setMatk(cm.getInventory(1).getItem(1).getMatk());
                    toDrop.setWdef(cm.getInventory(1).getItem(1).getWdef());
                    toDrop.setMdef(cm.getInventory(1).getItem(1).getMdef());
                    toDrop.setHp(cm.getInventory(1).getItem(1).getHp());
                    toDrop.setMp(cm.getInventory(1).getItem(1).getMp());
                    toDrop.setARC(cm.getInventory(1).getItem(1).getARC() + 6);    
}
              if((cm.getInventory(1).getItem(1).getARC()/300) >= 3){
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
                    toDrop.setStr(cm.getInventory(1).getItem(1).getStr() + 3);
                    toDrop.setDex(cm.getInventory(1).getItem(1).getDex() + 3);
                    toDrop.setInt(cm.getInventory(1).getItem(1).getInt() + 3);
                    toDrop.setLuk(cm.getInventory(1).getItem(1).getLuk() + 3);
                    toDrop.setWatk(cm.getInventory(1).getItem(1).getWatk()+3);
                    toDrop.setMatk(cm.getInventory(1).getItem(1).getMatk());
                    toDrop.setWdef(cm.getInventory(1).getItem(1).getWdef());
                    toDrop.setMdef(cm.getInventory(1).getItem(1).getMdef());
                    toDrop.setHp(cm.getInventory(1).getItem(1).getHp());
                    toDrop.setMp(cm.getInventory(1).getItem(1).getMp());
                    toDrop.setARC(cm.getInventory(1).getItem(1).getARC() + 6);    
}
              if((cm.getInventory(1).getItem(1).getARC()) >= 1000){
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
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
                    toDrop.setARC(cm.getInventory(1).getItem(1).getARC());    
}
                    cm.addFromDrop(toDrop);
                    cm.gainItem(ItemId, -1);
                    cm.gainItem(需要的物品, -1);
                    cm.sendOk("恭喜你增加成功啦！");
                    cm.worldSpouseMessage(0x0D,"[神秘力量] :  "+ cm.getChar().getName() +"  通過使用神秘徽章將其神秘力量提升了!!!");
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
                    toDrop.setWatk(cm.getInventory(1).getItem(1).getWatk());
                    toDrop.setMatk(cm.getInventory(1).getItem(1).getMatk());
                    toDrop.setWdef(cm.getInventory(1).getItem(1).getWdef());
                    toDrop.setMdef(cm.getInventory(1).getItem(1).getMdef());
                    toDrop.setHp(cm.getInventory(1).getItem(1).getHp() + 600);
                    toDrop.setMp(cm.getInventory(1).getItem(1).getMp());
                    toDrop.setARC(cm.getInventory(1).getItem(1).getARC() + 6);
              if((cm.getInventory(1).getItem(1).getARC()/300) >= 1){
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
                    toDrop.setStr(cm.getInventory(1).getItem(1).getStr());
                    toDrop.setDex(cm.getInventory(1).getItem(1).getDex());
                    toDrop.setInt(cm.getInventory(1).getItem(1).getInt());
                    toDrop.setLuk(cm.getInventory(1).getItem(1).getLuk());
                    toDrop.setWatk(cm.getInventory(1).getItem(1).getWatk()+1);
                    toDrop.setMatk(cm.getInventory(1).getItem(1).getMatk());
                    toDrop.setWdef(cm.getInventory(1).getItem(1).getWdef());
                    toDrop.setMdef(cm.getInventory(1).getItem(1).getMdef());
                    toDrop.setHp(cm.getInventory(1).getItem(1).getHp() + 600);
                    toDrop.setMp(cm.getInventory(1).getItem(1).getMp());
                    toDrop.setARC(cm.getInventory(1).getItem(1).getARC() + 6);    
}
              if((cm.getInventory(1).getItem(1).getARC()/300) >= 2){
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
                    toDrop.setStr(cm.getInventory(1).getItem(1).getStr());
                    toDrop.setDex(cm.getInventory(1).getItem(1).getDex());
                    toDrop.setInt(cm.getInventory(1).getItem(1).getInt());
                    toDrop.setLuk(cm.getInventory(1).getItem(1).getLuk());
                    toDrop.setWatk(cm.getInventory(1).getItem(1).getWatk()+2);
                    toDrop.setMatk(cm.getInventory(1).getItem(1).getMatk());
                    toDrop.setWdef(cm.getInventory(1).getItem(1).getWdef());
                    toDrop.setMdef(cm.getInventory(1).getItem(1).getMdef());
                    toDrop.setHp(cm.getInventory(1).getItem(1).getHp() + 600);
                    toDrop.setMp(cm.getInventory(1).getItem(1).getMp());
                    toDrop.setARC(cm.getInventory(1).getItem(1).getARC() + 6);    
}
              if((cm.getInventory(1).getItem(1).getARC()/300) >= 3){
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
                    toDrop.setStr(cm.getInventory(1).getItem(1).getStr());
                    toDrop.setDex(cm.getInventory(1).getItem(1).getDex());
                    toDrop.setInt(cm.getInventory(1).getItem(1).getInt());
                    toDrop.setLuk(cm.getInventory(1).getItem(1).getLuk());
                    toDrop.setWatk(cm.getInventory(1).getItem(1).getWatk()+3);
                    toDrop.setMatk(cm.getInventory(1).getItem(1).getMatk());
                    toDrop.setWdef(cm.getInventory(1).getItem(1).getWdef());
                    toDrop.setMdef(cm.getInventory(1).getItem(1).getMdef());
                    toDrop.setHp(cm.getInventory(1).getItem(1).getHp() + 600);
                    toDrop.setMp(cm.getInventory(1).getItem(1).getMp());
                    toDrop.setARC(cm.getInventory(1).getItem(1).getARC() + 6);    
}
              if((cm.getInventory(1).getItem(1).getARC()) >= 1000){
                    var toDrop = cm.getNewEquip(ItemId); // 生成一個Equip類                    
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
                    toDrop.setARC(cm.getInventory(1).getItem(1).getARC());    
}
                    cm.addFromDrop(toDrop);
                    cm.gainItem(ItemId, -1);
                    cm.gainItem(需要的物品, -1);
                    cm.sendOk("恭喜你增加成功啦！");
                    cm.worldSpouseMessage(0x0D,"[神秘力量] :  "+ cm.getChar().getName() +"  通過使用神秘徽章將其神秘力量提升了!!!");
                    cm.dispose();
                } else {
                    cm.sendOk("對不起需要的物品不足");
                    cm.dispose();
                }
                break;
        }

    }
}