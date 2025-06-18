function start() {
    if (im.getPlayer().getCSPoints(1) >= 300000 && im.getPlayer().getTWD() >= 300) {
    im.gainItem(2431673, -1);
    im.gainNX(1, -300000);
    im.gainPlayerPoints(1000000);
    im.gainItem(3994417, 1); //紅色蠟筆
    im.gainItem(3994418, 1); //橙色蠟筆
    im.gainItem(3994419, 1); //黃色蠟筆
    //im.gainItem(3994420, 1); //綠色蠟筆
    //im.gainItem(3994421, 1); //青色蠟筆
    //im.gainItem(3994422, 1); //藍色蠟筆
    im.gainItem(2049750, 1); //S級潛能卷軸 80% 
    im.gainItem(2049402, 1); //特殊潛能附加卷軸
    im.gainItem(2048307, 1); //特殊附加潛能附加卷軸
    im.gainItem(4001716, 1); // 10E
    var ii = im.getItemInfo();                    
    var toDrop = ii.randomizeStats(ii.getEquipById(1112164)).copy(); // 生成一個Equip類                    
    toDrop.setStr(15); //裝備力量
    toDrop.setDex(15); //裝備敏捷
    toDrop.setInt(15); //裝備智力
    toDrop.setLuk(15); //裝備運氣
    toDrop.setMatk(15); //物理攻擊
    toDrop.setWatk(15); //魔法攻擊 
    toDrop.setAcc(15); //
    toDrop.setOwner("豪華點裝");
    im.addFromDrop(im.getC(), toDrop, false);
    var ii = im.getItemInfo();                    
    var toDrop = ii.randomizeStats(ii.getEquipById(1112276)).copy(); // 生成一個Equip類                    
    toDrop.setStr(15); //裝備力量
    toDrop.setDex(15); //裝備敏捷
    toDrop.setInt(15); //裝備智力
    toDrop.setLuk(15); //裝備運氣
    toDrop.setMatk(15); //物理攻擊
    toDrop.setWatk(15); //魔法攻擊 
    toDrop.setAcc(15); //
    toDrop.setOwner("豪華點裝");
    im.addFromDrop(im.getC(), toDrop, false);
    var ii = im.getItemInfo();                    
    var toDrop = ii.randomizeStats(ii.getEquipById(1003719)).copy(); // 生成一個Equip類                    
    toDrop.setStr(15); //裝備力量
    toDrop.setDex(15); //裝備敏捷
    toDrop.setInt(15); //裝備智力
    toDrop.setLuk(15); //裝備運氣
    toDrop.setMatk(25); //物理攻擊
    toDrop.setWatk(25); //魔法攻擊 
    toDrop.setSpeed(15); //移動速度
    toDrop.setJump(15); //跳躍
    toDrop.setAcc(15); //
    toDrop.setOwner("豪華神裝");
    im.addFromDrop(im.getC(), toDrop, false);
    im.sendOk("成功獲得 #r豪華禮包#k 一個。");
    im.channelMessage(0x18, "『充點小錢玩玩』" + " : " + "玩家 " + im.getChar().getName() + " 從限時300元豪華中獲得 神裝 以及 道具 以及 10億 楓幣。");
    im.dispose(); 
    } else {
    //im.sendOk("#b沖點小錢玩一下吧。您儲值未達到300元或者樂豆點不足30萬。#k\r\n\r\n#v3994417# #v3994418# #v3994419# #v3994420# #v3994421# #v3994422# #v2049750# #v2049402# #v2048307#\r\n#r#t1003719##v1003719# : 全屬性15，攻擊力魔攻25。\r\n#t1112276##v1112276# : 全屬性15，攻擊力魔攻15。\r\n#t1112164##v1112164# : 全屬性15，攻擊力魔攻15。\r\n\r\n- #e#d永久BUFF以及騎寵技能#k#n:\r\n#s80000077# #s80000077# #s80000077# #s80000081# #s80000082# #s80000083# #s80001198# #s80001241#");
    im.sendOk("#b沖點小錢玩一下吧。您儲值未達到300元或者樂豆點不足30萬。#k\r\n\r\n#v3994420# #v3994421# #v3994422# #v2049750# #v2049402# #v2048307#\r\n#r#t1003719##v1003719# : 全屬性15，攻擊力魔攻25。\r\n#t1112276##v1112276# : 全屬性15，攻擊力魔攻15。\r\n#t1112164##v1112164# : 全屬性15，攻擊力魔攻15。");
    im.dispose();
    }
}