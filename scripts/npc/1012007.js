//寵物公園
var status = -1;

function start() {
    if (cm.haveItem(4031035)) {
        cm.sendNext("那是我哥的信啊！又是說些我不幹活只知道玩這種囉嗦的話嗎？是我哥讓你一邊訓練寵物，一邊到這裡的吧？不錯！來這裡辛苦了，幫你提高與寵物的親密度吧。");
    } else {
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (cm.getPlayer().getNoPets() <= 0) {
        cm.sendNextPrev("嗯？你沒有召喚寵物啊");
    } else {
        cm.gainItem(4031035, -1);
        cm.gainClosenessAll(2);
        cm.sendNextPrev("怎麼樣？是不和寵物更親密些了？下次再有空的話多做一些障礙物訓練吧！當然要先得到我哥的允許了。");
    }
    cm.dispose();
}

