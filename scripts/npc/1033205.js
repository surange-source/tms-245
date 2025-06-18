
var status = -1;
function action(mode, type, selection) {
    if (cm.isQuestFinished(24002) && !cm.isQuestActive(24093)) {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            cm.setInGameCurNodeEventEnd(true);
            cm.EnableUI(1);
            cm.DisableUI(true);
            cm.setDelay(2000);
            cm.setInGameCurNodeEventEnd(true);
        } else if (status == 1) {
            //cm.sendDirectionEffectPlay("Effect/Direction5.img/effect/mercedesQuest/merBalloon/0");
            cm.setDelay(2000);
            cm.setInGameCurNodeEventEnd(true);
        } else if (status == 2) {
            cm.sendDirectionEffectPlay("Effect/Direction5.img/effect/mercedesQuest/merBalloon/1");
            cm.sendPlayerToNpc("等下... 好像有些奇怪.. .. 我的等級是10級?!");
        } else {
            cm.forceStartQuest(24093, "1");
            cm.EnableUI(0);
            cm.DisableUI(false);
            cm.dispose();
        }
    } else {
        cm.dispose();
    }
}
