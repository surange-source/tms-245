function start() {
        im.gainItem(2431737, -1);
        im.gainItem(5030021, 1, 999);// 老爺爺商人
        im.sendOk("恭喜您獲得 #r土豪禮物#k 。");
        im.worldSpouseMessage(0x20,"『系統公告』：恭喜玩家 "+ im.getChar().getName() +" 領取了土豪專用僱傭商店-永久期限。");
        im.dispose(); 
}
