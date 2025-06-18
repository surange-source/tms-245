var status = -1;

function start() {
    cm.dispose();
    if (!cm.isQuestFinished(34119)) {
        cm.sendPlayerToNpc("#b（必須擊退亞勒麻。）");
        return;
    }
    if (!cm.isQuestFinished(34120)) {
        cm.warp(450001350, 0);
    } else {
        cm.warp(450001240, 1);
    }
}