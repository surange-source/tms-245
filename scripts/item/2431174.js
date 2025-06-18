/*

 腳本功能：榮譽勳章 雙擊可以獲得聲望的榮譽勳章
 
 */

function start() {
    if (im.used()) {
        im.getPlayer().gainHonor(Math.floor(Math.random() * 16) + 5);
    }
    im.dispose();
}