var status = -1;

function action(mode, type, selection) {
    cm.sendPlayerToNpc("#b媽媽！！你在哪裡！！#k");
    cm.forceCompleteQuest(23200);
    cm.forceStartQuest(23201);
    cm.dispose();
}
