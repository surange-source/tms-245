function start() {
        im.gainItem(2431303, -1);// wuqi
    var toDrop = im.getNewEquip(1032201); // 生成一個Equip類                    
    toDrop.setStr(40); //裝備力量
    toDrop.setDex(40); //裝備敏捷
    toDrop.setInt(40); //裝備智力
    toDrop.setLuk(40); //裝備運氣
    toDrop.setMatk(45); //物理攻擊
    toDrop.setWatk(45); //魔法攻擊 
        toDrop.setHp(3000);
    toDrop.setAcc(15); //
    im.addFromDrop(toDrop);
    var toDrop = im.getNewEquip(1122259); // 生成一個Equip類                    
    toDrop.setStr(40); //裝備力量
    toDrop.setDex(40); //裝備敏捷
    toDrop.setInt(40); //裝備智力
    toDrop.setLuk(40); //裝備運氣
    toDrop.setMatk(50); //物理攻擊
    toDrop.setWatk(50); //魔法攻擊 
        toDrop.setHp(5000);
    toDrop.setAcc(15); //
    im.addFromDrop(toDrop);
    var toDrop = im.getNewEquip(1012414); // 生成一個Equip類                    
    toDrop.setStr(40); //裝備力量
    toDrop.setDex(40); //裝備敏捷
    toDrop.setInt(40); //裝備智力
    toDrop.setLuk(40); //裝備運氣
    toDrop.setMatk(30); //物理攻擊
    toDrop.setWatk(30); //魔法攻擊 
        toDrop.setHp(3000);
    toDrop.setAcc(15); //
    im.addFromDrop(toDrop);
    var toDrop = im.getNewEquip(1022195); // 生成一個Equip類                    
    toDrop.setStr(40); //裝備力量
    toDrop.setDex(40); //裝備敏捷
    toDrop.setInt(40); //裝備智力
    toDrop.setLuk(40); //裝備運氣
    toDrop.setMatk(30); //物理攻擊
    toDrop.setWatk(30); //魔法攻擊 
        toDrop.setHp(3000);
    toDrop.setAcc(15); //
    im.addFromDrop(toDrop);
    var toDrop = im.getNewEquip(1113056); // 生成一個Equip類                    
    toDrop.setStr(25); //裝備力量
    toDrop.setDex(25); //裝備敏捷
    toDrop.setInt(25); //裝備智力
    toDrop.setLuk(25); //裝備運氣
    toDrop.setMatk(30); //物理攻擊
    toDrop.setWatk(30); //魔法攻擊 
        toDrop.setHp(1500);
    toDrop.setAcc(15); //
    im.addFromDrop(toDrop);            
        im.sendOk("恭喜您獲得 #r管理員送出的禮物#k 。");
        im.worldSpouseMessage(0x20,"『巔峰玩家』：恭喜玩家 "+ im.getChar().getName() +" 打開了超越禮盒。");
        im.dispose(); 
}
