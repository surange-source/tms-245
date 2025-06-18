/* Dawnveil
    Guild tasks
    Lea
    Made by Daenerys
*/
var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendNext("想去英雄殿堂的話，請再來找我。");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        cm.sendYesNo("你好。我是負責公會支援工作的蕾雅。為了工作方便，我來到了英雄殿堂，為大家提供幫助。你想到英雄殿堂去處理公會相關事務嗎？");
    } else if (status == 1) {
        cm.sendNext("好的，我馬上把你送過去。");
    } else if (status == 2) {
        cm.forceStartQuest(26015, "link");
        cm.updateOneQuestInfo(26015, "returnMap", cm.getMapId().toString());
        cm.forceStartQuest(26010, cm.getMapId().toString());
        cm.warp(200000301);
        cm.dispose();
    }
}
