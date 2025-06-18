/*
 * 腔絹柯扼牢 家膠 膠農賦飄 澇聰促.
 * 
 * 器嘔困摹 : 急琶狼 悼奔
 * 器嘔汲疙 : 悼奔 澇厘
 * 
 * 力累 : 林農喉發
 * 
 */

function enter(pi) {
    var eim = pi.getPlayer().getEventInstance();
    if (eim.getProperty("choiceCave") == null) {
        pi.getPlayer().message(5, "酒流 悼奔撈 急琶登瘤 臼疽嚼聰促.");
        return false;
    }
    if (eim.getProperty("choiceCave").equals("0")) {
        pi.allPartyWarp(240050300, false);
    } else {
        pi.allPartyWarp(240050310, false);
    }
    return true;
}
