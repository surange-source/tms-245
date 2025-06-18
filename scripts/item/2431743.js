function start() {
        if (im.getEventCount("楓點10000") == 0) {
         im.gainItem(2431743, -1);
     im.setEventCount("楓點10000");
         im.gainNX(2,10000);
         im.sendOk("恭喜您獲得 #r10000#k 楓點。");
         im.dispose(); 
        } else {
    im.gainItem(2431743, -1);
        im.sendOk("抱歉，該帳號已經使用過，無法再次使用.");
        im.dispose();
    }
}