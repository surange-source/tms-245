function start() {
    im.gainItem(2431174, -1);
    im.getPlayer().gainHonorExp(Math.floor(Math.random() * 100) + 50);
    //im.worldMessage(0x18, "『內在能力』 : 恭喜 " + im.getChar().getName() + " 使用 <榮譽勳章> 成功提高了聲望.");
    im.dispose();
}