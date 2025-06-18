function start() {
 if (im.getSpace(1) >= 1) {
      im.gainItem(2434342, -1);
      var toDrop = im.getNewEquip(1012414); // 生成一個Equip類   
        toDrop.setStr(100); //裝備力量
        toDrop.setDex(100); //裝備敏捷
        toDrop.setInt(100); //裝備智力
        toDrop.setLuk(100); //裝備運氣
        toDrop.setWatk(100); //物理攻擊
        toDrop.setMatk(100); //魔法攻擊
        im.addFromDrop(toDrop);  
      var toDrop = im.getNewEquip(1022195); // 生成一個Equip類   
        toDrop.setStr(100); //裝備力量
        toDrop.setDex(100); //裝備敏捷
        toDrop.setInt(100); //裝備智力
        toDrop.setLuk(100); //裝備運氣
        toDrop.setWatk(100); //物理攻擊
        toDrop.setMatk(100); //魔法攻擊
        im.addFromDrop(toDrop);            
        var toDrop = im.getNewEquip(1032201); // 生成一個Equip類   
        toDrop.setStr(100); //裝備力量
        toDrop.setDex(100); //裝備敏捷
        toDrop.setInt(100); //裝備智力
        toDrop.setLuk(100); //裝備運氣
        toDrop.setWatk(100); //物理攻擊
        toDrop.setMatk(100); //魔法攻擊
        im.addFromDrop(toDrop);     
        var toDrop = im.getNewEquip(1113056); // 生成一個Equip類   
        toDrop.setStr(100); //裝備力量
        toDrop.setDex(100); //裝備敏捷
        toDrop.setInt(100); //裝備智力
        toDrop.setLuk(100); //裝備運氣
        toDrop.setWatk(100); //物理攻擊
        toDrop.setMatk(100); //魔法攻擊
        im.addFromDrop(toDrop);       
        var toDrop = im.getNewEquip(1122259); // 生成一個Equip類   
        toDrop.setStr(100); //裝備力量
        toDrop.setDex(100); //裝備敏捷
        toDrop.setInt(100); //裝備智力
        toDrop.setLuk(100); //裝備運氣
        toDrop.setWatk(100); //物理攻擊
        toDrop.setMatk(100); //魔法攻擊
        im.addFromDrop(toDrop);     
        im.dispose();
    } else {
        im.sendOk("您的包裹空間不足，請整理一下包裹吧~");
        im.dispose();
    }
}