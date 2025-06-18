function start() {
         im.gainItem(2431740, -1);
         im.gainNX(2,1500);
         im.sendOk("恭喜您獲得 #r1500#k 低用卷。");
     im.channelMessage(0x18, "[怪物掉寶提示]" + " : " + "玩家" + im.getChar().getName() + ",從怪物身上掉落[楓點1500商品券]獲得1500楓點。");
     //im.worldSpouseMessage(0x20,"[怪物掉寶提示]：恭喜玩家 "+ im.getChar().getName() +" 從怪物身上掉落[楓點1500商品券]獲得1500楓點。");
         im.dispose(); 
}
