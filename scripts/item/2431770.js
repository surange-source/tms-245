function start() {
 if (im.getSpace(1) >= 3) {
      im.gainItem(2431770, -1);
      var toDrop = im.getNewEquip(1202187); // 生成一個Equip類   
      toDrop.setStr(100); //裝備力量
        toDrop.setDex(100); //裝備敏捷
        toDrop.setInt(100); //裝備智力
        toDrop.setLuk(100); //裝備運氣
        toDrop.setWatk(100); //物理攻擊
        toDrop.setMatk(100); //魔法攻擊
        im.addFromDrop(toDrop);  
      var toDrop = im.getNewEquip(1202188); // 生成一個Equip類   
        toDrop.setStr(100); //裝備力量
        toDrop.setDex(100); //裝備敏捷
        toDrop.setInt(100); //裝備智力
        toDrop.setLuk(100); //裝備運氣
        toDrop.setWatk(100); //物理攻擊
        toDrop.setMatk(100); //魔法攻擊
        im.addFromDrop(toDrop);            
        var toDrop = im.getNewEquip(1202189); // 生成一個Equip類   
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