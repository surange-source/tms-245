/*
    Sky-Blue Balloon - LudiPQ 7th stage NPC
**/

var status;
var exp = 4620;
            
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var eim = cm.getEventInstance();
    var stage7status = eim.getProperty("stage7status");

    if (stage7status == null) {
    if (cm.isLeader()) { // Leader
        var stage7leader = eim.getProperty("stage7leader");
        if (stage7leader == "done") {

        if (cm.getMap().getAllMonster().size() == 0) { // Clear stage
            cm.sendNext("恭喜你們通過第4階段,趕快進入下一階段吧。");
            cm.removeAll(4001022);
            clear(7, eim, cm);
            cm.givePartyExp(exp, eim.getPlayers());
            cm.dispose();
        } else { // Not done yet
            cm.sendNext("消滅地圖上所有的怪物才可以通關,趕快和你的隊友抓緊時間吧。");
        }
        cm.dispose();
        } else {
        cm.sendOk("歡迎來到第4階段,請和你的隊友消滅地圖上所有的怪物並且收集4張通行證在來和我說話吧。");
        eim.setProperty("stage7leader","done");
        cm.dispose();
        }
    } else { // Members
        cm.sendNext("歡迎來到第4階段,消滅地圖上所有的怪物並且收集4張通行證後,交給你們的隊長讓他來和我說話吧。");
        cm.dispose();
    }
    } else {
    cm.sendNext("恭喜你們通過第4階段,趕快進入下一階段吧。");
    cm.dispose();
    }
}

function clear(stage, eim, cm) {
    eim.setProperty("stage" + stage.toString() + "status","clear");
    
    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
    cm.environmentChange(true, "gate");
}
