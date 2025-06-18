function enter(pi) {
    var returnMap = pi.getQuestInfo(26015, "returnMap");
    if (returnMap == null || returnMap == "") {
        returnMap = 200000300;
    } else {
        returnMap = parseInt(returnMap);
    }
    pi.warp(returnMap);
}
