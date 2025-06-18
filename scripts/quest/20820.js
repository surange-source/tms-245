/* Cygnus revamp
    Noblesse tutorial
    Kimu
    Made by Daenerys
*/
var status = -1;

function start(mode, type, selection) {
    if (mode == 1)
        status++;
     else
        status--;
    if (status == 0) {
        qm.sendNext("歡迎來到聖地！這裡是楓之谷世界最和平、最安全的地方。是女皇西格諾斯統治的土地！   你的名字是……啊，是叫#b#h0##k吧？很高興見到你！我一直在等你。你來這裡，是想成為#p1101000#騎士團的一員吧？我叫#p1102004#。我奉女皇之名，在這裡為像你這樣的初心者提供指導。");
    } else if (status == 1) {
      qm.sendNextPrev("具體的事情以後再說，你先到新騎士團員歡迎會去看看吧。先去那裡和其他修煉教官打個招呼。請跟我來。");
    } else if (status == 2) {        
        qm.warp(130030100);
        qm.forceStartQuest();
        qm.forceCompleteQuest();
        qm.dispose();
    }
}
function end(mode, type, selection) {
    qm.dispose();
}
