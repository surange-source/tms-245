function enter(pi) {
    pi.forceStartQuest(26015, "link");
    pi.updateOneQuestInfo(26015, "returnMap", pi.getMapId().toString());
    pi.forceStartQuest(26010, pi.getMapId().toString());
    pi.warp(200000301,0);
}
