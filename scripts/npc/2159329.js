var status = -1;

function action(mode, type, selection) {
    cm.sendPlayerToNpc("#b戴米安！！你在哪……活著的話，就回答我！！#k");
    cm.forceCompleteQuest(23201);
    cm.forceStartQuest(23202);
    cm.dispose();
}
