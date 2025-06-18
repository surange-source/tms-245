var status;
var PQname = "GhostPark";
var maxenter = 5;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == 0) {
        cm.dispose();
        return;
    } else if (mode == 1) {
        status++;
    } else {
        status--;
    }

    switch (status) {
        case 0:
            cm.sendSimpleN("歡迎你來到鬼魂公園! 呵呵, 我是鬼魂公園的主人休彼德蔓, 如果你對這裡有什麼想知道的, 儘管可以問我. \r\n#L0# #b鬼魂公園是什麼? #k#l\r\n#L1# #b請告訴我鬼魂公園的使用方法. #k#l\r\n#L2# #b請告訴我今天可以入場的次數. #k#l\r\n#L3# #b我集齊了7種符咒. #k#l\r\n#L4# #b我不要再聽說明了. #k#l");
            break;
        case 1: //
            switch (selection) {
                case 0:
                    cm.dispose();
                    cm.openNpc(2079000, "GhostParkStated");
                    break;
                case 1:
                    cm.dispose();
                    cm.openNpc(2079000, "GhostParkOperate");
                    break;
                case 2:
                    var c = cm.getPQLog(PQname);
                    cm.sendNextN((c > 0 ? "今天已經進入鬼魂公園" + c + "次," : "今天沒有進入鬼魂公園的記錄呢,") + "\r\n鬼魂公園#b每天有" + maxenter + "次#k可以進場的機會. ");
                    cm.dispose();
                    break;
                case 3:
                    cm.sendNextN("你的裝備背包中只有1種符咒啊, \r\n剩下的符咒可以在#b鬼魂公園#k中獵鬼獲得. ");
                    cm.dispose();
                    break;
                case 4:
                    cm.dispose();//這是結束腳本，請按照實際情況使用
                    break;
            }
            break;
        case 2:
        case 3:
            cm.dispose();
            break;
    }
}
