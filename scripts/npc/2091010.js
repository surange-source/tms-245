var status = -1;

function start() {
    cm.updateInfoQuest(100472, "dojangRankJob=0;dojangRank2=0");
    cm.showDoJangRank();
    cm.showSystemMessage("武陵道場的紀錄反映到排名上，可能會花一點時間。核計點數是在清算每週的排行後，以全體排行為基準來進行發給。");
    cm.showPopupSay(2091011, 1100, "核計點數是在清算每週的排行後，以#r全體排行#k為基準來進行發給。", "");
    cm.dispose();
}
