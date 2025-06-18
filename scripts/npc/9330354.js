var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    if (status == 0) {
        cm.sendNext("不要擔心, 若方塊消失了隨時都可以來找我, 我會為你盡我所能的.\r\n永遠...");
    } else if (status == 1) {
        cm.sendNextPrevS("屁啦，也不看看自己現在的樣子", 4, 9330355);
    } else if (status == 2) {
        cm.PlayerToNpc("......");
    } else {
        cm.dispose();
    }
}
