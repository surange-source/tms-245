/*
 
 */

var status = -1;

function action(mode, type, selection) {
    var map = ms.getMap();
    map.showScreenAutoLetterBox("giantBoss/enter/" + (map.getId() % 1000) / 10, 0);
    ms.dispose();
}

