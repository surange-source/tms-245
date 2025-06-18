function start() {
    if (cm.getQuestInfo(100466, "Scr") == "1") {
        cm.showProgressMessageFont("- 達成最高紀錄 -", 3, 25, 4, 0);
        cm.updateOneQuestInfo(100466, "Scr", "0");
    }
    cm.sendOkNoESC(
        "辛苦了。 試著繼續挑戰吧。\r\n"
        + "(目前的時間 :" + (new java.text.SimpleDateFormat("yy/MM/dd, HH點 mm分").format(new java.util.Date())) + ")\r\n\r\n<最近紀錄資訊>\r\n"
        + "#b  - 排行區間 : " + (cm.getLevel() <= 200 ? "入門" : "精通") + "\r\n"
        + "  - 完成樓層 : " + cm.getQuestInfo(100466, "Floor") + " 層\r\n"
        + "  - 花費的時間 : 若是達成比" + cm.getQuestInfo(100466, "Time") + " 秒#k\r\n\r\n"
        + "前更好的紀錄，就會自動登錄在#r武陵排行榜#k。\r\n登錄時需要一點時間，千萬別忘記。", false);
}

function action(mode, type, selection) {
    cm.dispose();
}