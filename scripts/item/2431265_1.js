/* 裝備修理卷 */

var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            im.sendNext("裝備最好經常修理。");
            im.dispose();
        }
        status--;
    }
    if (status == 0) {
        im.sendYesNo("登登～這是修理券，看我拿出這個東西，是不是很吃驚？我不是只會出售鑰匙的人，我還有很多隱藏的才能。我可以幫你快速修好壞了的東西。你想試試嗎？");
    } else if (status == 1) {
        im.gainItem(2431265, -1);
        im.sendRepairWindow();
        im.dispose();
    }
}