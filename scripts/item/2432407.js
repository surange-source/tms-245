function start() {
    var result = im.getPlayer().modifyMileage(1);
    if (result == 0) {
        im.used();
//        im.updateOneQuestInfo(18192, "val", "1");
//        im.updateOneQuestInfo(18192, "tDate", "20/05/30/23/35");
//        im.updateOneQuestInfo(18192, "last", "20/05/30");
//        im.updateOneQuestInfo(18192, "count", "1");
//        im.showItemMsg(" 1 紅利積累！凌晨12點以前一定要在現金商城內清算。");
//        im.showSystemMessage("[里程累積現況]共 1 點數(1/20次) ");
//        im.showSystemMessage("累積20次之後，進入現金商店來結算里程後累積。");
//        im.showSystemMessage("今天沒有在現金商城內清算的紅利會在明天消失。積累當天晚上 11點 59分以前要到現金商城裡清算。");
//        im.updateOneQuestInfo(18282, "count", "1");
//        im.showSystemMessage("從里程包裹中獲得 1里程.");
    }
    im.dispose();
}