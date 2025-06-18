/*
    傳送到703000001 - 2022新葉城 - 被佔領的 新葉城
*/

function enter(pi) {
    if (pi.getQuestStatus(56203) != 1) {
        pi.topMessage("目前無法進入，這好像是和未來的新葉城有某種聯繫");
        pi.playerMessage( - 9, "目前無法進入，這好像是和未來的新葉城有某種聯繫");
        return false;
    }
    pi.playPortalSE();
    pi.warp(703000001, 0);
    return true;
}
