var status = -1;

function start() {
    ms.changeMusic("Bgm48.img/Title");
    ms.EnableUI(1);
    ms.setLayerBlind(true, 200, 1500);
    ms.setMonologue("#fs30##fn MingLiU#感謝您加入#e" + ms.getServerName() + "#n的大家族", false);
}

function action(mode, type, selection) {
    status++;

    var i = -1;
    if (status == i++) {
        ms.dispose();
    } else if (status == i++) {
        ms.setMonologue("以下內容#e#r請仔細閱讀", true);
    } else if (status == i++) {
        ms.setMonologue("#fn MingLiU#目前倍率是 " + ms.getClient().getChannelServer().getExpRate() + " / " + ms.getClient().getChannelServer().getMesoRate() + " / " + ms.getClient().getChannelServer().getDropRate(), false);
    } else if (status == i++) {
        ms.setMonologue("任何功能皆在左上角快速移動", false);
    } else if (status == i++) {
        ms.setMonologue("★請先點左上角快速移動，一鍵轉職★", false);
    } else if (status == i++) {
        ms.setMonologue("接下來請你享受這趟魔幻的遊戲旅程", false);
    } else if (status == i++) {
        ms.setMonologue("☆詳情有任何問題請詢問Discord其他用戶☆", false);
    } else if (status == i++) {
        ms.setMonologue("再次說明", false);
    } else if (status == i++) {
        ms.setMonologue("#b#r本服無GM!本服無GM!本服無GM!#k#n", false);
    } else if (status == i++) {
        ms.setMonologue(ms.getServerName() + "不禁止一切私下交易(但被騙請自負)", true);
    } else if (status == i++) {
        var level = ms.getPlayer().getLevel();
        var levelTo = 10;
        if (level < levelTo) {
            for (var i = level; i < levelTo; i++) {
                ms.getPlayer().levelUp();
            }
        }
        ms.setLayerBlind(false, 0, 1500);
        ms.setDelay(1500);
    } else {
        ms.EnableUI(0);
        ms.environmentChange(false, "maplemap/enter/10000", 4);
        ms.showPopupSay(2008, 5000, "這位玩家，歡迎你來到#e#b" + ms.getServerName() + "#k#n啊。", "");
        ms.dispose();
        if (ms.getClient().getRefCode() != null) {
            ms.openNpc(2008, "SetUpRefCode");
        }
    }
}