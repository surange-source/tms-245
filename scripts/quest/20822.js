/* Cygnus revamp
    Noblesse tutorial
    Kiku
    Made by Daenerys
*/
var status = -1;

function start(mode, type, selection) {
    status++;
    if (status == 0) {
      qm.sendYesNo("你也知道，我們冒險騎士團是楓之谷世界的女皇西格諾斯為了對抗黑魔法師而建立的。我們忠於女皇，正在為了阻止即將醒來的黑魔法師而積蓄力量。我看你好像需要大量的修煉才行……不過別擔心，我們這些教官會把你打造成一個合格的騎士。準備好了嗎？");
    } else if (status == 1) {
      qm.forceStartQuest();
      qm.TutInstructionalBalloon("Effect/OnUserEff.img/guideEffect/cygnusTutorial/1");
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
        qm.sendNextPrev("你去和奇庫打過招呼了嗎？#h0#，我們這些教官會讓你成為一名優秀的騎士。");
    } else if (status == 1) {
        qm.sendNextPrev("歡迎會差不多該結束了，讓我們開始修煉吧。做好心理準備了嗎？");
    } else if (status == 2) {
        qm.forceCompleteQuest();
        qm.warp(130030101,0);
        qm.dispose();
    }
  }
}
