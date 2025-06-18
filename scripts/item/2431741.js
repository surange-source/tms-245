function start() {
     im.gainItem(2431741, -1);
     im.gainNX(2,3000);
     im.sendOk("恭喜您獲得 #r3000#k 低用卷。");
    im.worldSpouseMessage(0x17,"[怪物掉寶提示]：恭喜玩家 "+ im.getChar().getName() +" 通過樂豆點購買[楓點3000商品券]獲得3000楓點。");
     im.dispose(); 
}
