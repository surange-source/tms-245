function enter(pi) {
    var returnMap = pi.getSavedLocation("MULUNG_TC");
    pi.clearSavedLocation("MULUNG_TC");
    if (returnMap < 0) {
        returnMap = 100000000;
    }
    pi.getPlayer().changeMap(returnMap, 0);
}
