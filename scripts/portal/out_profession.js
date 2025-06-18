/*
Return from Free Market Script
*/

function enter(pi) {
    var returnMap = pi.getQuestInfo(7860, "returnMap");
    if (returnMap == null || returnMap == "") {
        returnMap = 100000000;
    } else {
        returnMap = parseInt(returnMap);
    }
    var target = pi.getMap(returnMap);
    var portal = target.getPortal("profession");
    if (portal == null) {
        portal = target.getPortal(0);
    }
    if (pi.getMapId() != target) {
        pi.getPlayer().changeMap(target, portal);
    }
}
