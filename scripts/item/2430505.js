function start() {
    im.gainItem(2430505, -1);
    var ii = im.getItemInfo();                    
    var toDrop = ii.randomizeStats(ii.getEquipById(1112670)).copy(); // 生成一個Equip類                    
    toDrop.setEnhance(25); //
    //var timeStamp = java.lang.System.currentTimeMillis();
    //var expirationDate = timeStamp+30*86400*1000;
    //toDrop.setExpiration(expirationDate);
    toDrop.setOwner("星之力");
    im.addFromDrop(im.getC(), toDrop, false);
    im.sendOk("恭喜您獲得 #r管理員送出的禮物#k 。");
    //im.worldSpouseMessage(0x20,"『新手駕到』：恭喜玩家 "+ im.getChar().getName() +" 來到了北岸楓之谷。熱烈祝賀他(她)吧。");
    im.dispose(); 
}
