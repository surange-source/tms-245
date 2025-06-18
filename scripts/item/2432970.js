/*

 腳本功能：榮譽勳章 雙擊可以獲得聲望的榮譽勳章
 
 */

function start() {
    im.gainItem(2432970, -1);
    im.getPlayer().gainHonorExp(Math.floor(Math.random() * 10000) + 1000);
    //im.worldMessage(0x180, "『內在能力』 : 恭喜 " + im.getChar().getName() + " 使用 <榮譽勳章> 成功提高了聲望.");
    im.dispose();
}