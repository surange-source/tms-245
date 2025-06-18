/* Cygnus revamp
    Noblesse tutorial
    Kimu
    Made by Daenerys
*/
var status = -1;

function start(mode, type, selection) {
    status++;
    if (status == 0) {
        qm.sendNext("這是為了歡迎新加入的騎士團員而舉行的歡迎會。嗯，在哪兒呢？我想介紹個人給你認識。修煉教官奇庫在哪兒呢？這裡人太多，不太容易找到……");
    } else if (status == 1) {
      qm.sendNext("請看畫面左上方。點擊小地圖UI右側的NPC按鈕，會顯示該地圖上的NPC名字。請點擊其中的奇庫。那樣的話，小地圖上就會用箭頭顯示奇庫的位置。請你找到奇庫，去和他打個招呼。");
    } else if (status == 2) {
      qm.forceStartQuest();
      qm.dispose();
    }
}
function end(mode, type, selection) {
if (mode == -1) {
    qm.dispose();
    } else {
    if (mode == 1)
        status++;
    else
        status--;
    if (status == 0) {
        qm.sendNext("I wish they'd start sending over some decent sized fighters, but I guess you'll work.");
        qm.dispose();
    }
  }
}
