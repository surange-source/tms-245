var status = 0;
var request;

function start() {
    status = -1;
    action(1, 0, 0);
}


function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else
        status = 0;
    if (status == 0) {
        request = cm.getNextCarnivalRequest();
        if (request != null) {
            cm.sendYesNo(request.getChallengeInfo() + "\r\n你想戰鬥這個怪物嘉年華嗎？");
        } else {
            cm.dispose();
        }
    } else if (status == 1) {
        try {
            cm.getChar().getEventInstance().registerCarnivalParty(request.getChallenger(), request.getChallenger().getMap(), 1);
            cm.dispose();
        } catch (e) {
            cm.sendOk("你的挑戰已經失效。");
        }
        status = -1;
    }
}


