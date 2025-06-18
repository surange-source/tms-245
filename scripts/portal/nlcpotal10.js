/*
    傳送到703000000 - 2022新葉城 - 被破壞的 新葉城
*/

function enter(pi) {
    switch (pi.getMapId()) {
        case 600000000:
            if (pi.getQuestStatus(56200) == 2) { //新葉城-市區街道 - 新葉城-市區中心
                pi.warp(703000000, 0);
            } else {
                pi.topMsg("目前無法進入，這好像是和未來的新葉城有某種聯繫");
                pi.playerMessage( - 9, "目前無法進入，這好像是和未來的新葉城有某種聯繫");
            }
            break;
        case 703000001:
            if (pi.getQuestStatus(56203) == 2) { //2022新葉城 - 被佔領的 新葉城
                pi.warp(703000000, 0);
            } else {
                pi.topMsg("目前無法進入，這好像是和未來的新葉城有某種聯繫");
                pi.playerMessage( - 9, "目前無法進入，這好像是和未來的新葉城有某種聯繫");
            }
            break;
        default:
            pi.topMsg("目前無法進入，這好像是和未來的新葉城有某種聯繫");
            pi.playerMessage( - 9, "目前無法進入，這好像是和未來的新葉城有某種聯繫");
            break;
    }
}
