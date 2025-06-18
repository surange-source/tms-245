function start() {
    im.gainItem(2430226, -1);
    var ii = im.getItemInfo();
    var toDrop = ii.randomizeStats(ii.getEquipById(1102630)).copy(); // 生成一個Equip類                    
    toDrop.setStr(50); //裝備力量
    toDrop.setDex(50); //裝備敏捷
    toDrop.setInt(50); //裝備智力
    toDrop.setLuk(50); //裝備運氣
    toDrop.setMatk(50); //物理攻擊
    toDrop.setWatk(50); //魔法攻擊 
    toDrop.setSpeed(50); //移動速度
    toDrop.setJump(50); //跳躍
    toDrop.setAcc(50); //
    toDrop.setOwner("豪華點裝");
    im.addFromDrop(im.getC(), toDrop, false);
    im.channelMessage(0x18, "『累計儲值獎勵』" + " : " + "玩家 " + im.getChar().getName() + " 從限量大亂鬥禮包中獲得了 浪漫四翼天使 一個");
    im.sendOk("成功獲得 #r浪漫四翼天使#k 一個。");
    im.dispose();
}