var exp = 3360;

function action(mode, type, selection) {
    var eim = cm.getEventInstance();
    var stage4status = eim.getProperty("stage4status");

    if (stage4status == null) {
    if (cm.isLeader()) { // Leader
        var stage4leader = eim.getProperty("stage4leader");
        if (stage4leader == "done") {

        if (cm.getMap(922010401).getAllMonster().size() == 0 && cm.getMap(922010402).getAllMonster().size() == 0 && cm.getMap(922010403).getAllMonster().size() == 0 && cm.getMap(922010404).getAllMonster().size() == 0 && cm.getMap(922010405).getAllMonster().size() == 0) { // Clear stage
            cm.sendNext("恭喜你們完成第2階段。時間已經不多了,趕快進入下一階段吧。");
            cm.removeAll(4001022);
            clear(4,eim,cm);
            cm.givePartyExp(exp);
        } else { // Not done yet
            cm.sendNext("次元洞內的怪物沒有清理完畢，趕快抓緊時間。");
        }
        cm.safeDispose();
        } else {
        cm.sendOk("歡迎來到第2階段，讓你的隊員在次元洞內殺死所有的怪物並且收集14張通行證在來與我談話。");
        eim.setProperty("stage4leader","done");
        cm.safeDispose();
        }
    } else { // Members
        cm.sendNext("歡迎來到第2階段，在次元洞內殺死黑暗中的怪物並且收集14張通行證。然後讓你們隊長來與我談話。");
        cm.safeDispose();
    }
    } else {
    cm.sendNext("恭喜你們完成第2階段。時間已經不多了,趕快進入下一階段吧。");
    cm.safeDispose();
    }
}

function clear(stage, eim, cm) {
    eim.setProperty("stage" + stage.toString() + "status","clear");

    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
    cm.environmentChange(true, "gate");
}
