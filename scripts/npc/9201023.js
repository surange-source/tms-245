/*
    NPC Name:         Hera
    Map(s):         Towns
    Description:         Wedding Village Entrance
*/

var status = -1;

function start() {
    //cm.sendSimple("啊~今天真是個好日子！這世界太美好了~！你不覺得這世界充滿了愛嗎？滿溢婚禮村的愛意都流淌到這裡來了~！\n\r #b#L0# 到婚禮村去（豪華、甜美、簡譜婚禮券）#l \n\r #L1# I am married and I want my Chair of Love!!! #l");
    cm.sendSimple("啊~今天真是個好日子！這世界太美好了~！你不覺得這世界充滿了愛嗎？滿溢婚禮村的愛意都流淌到這裡來了~！\n\r #b#L0# 到婚禮村去（豪華、甜美、簡譜婚禮券）#l");
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else if (status == 0 && mode == 0) {
        cm.sendNext("你居然要放棄這麼好的機會？那裡真的很美~。你不會是還沒遇到心愛的人吧？沒錯，如果你有心愛的人，怎麼會對這麼浪漫的消息聽而不聞呢！！");
        cm.dispose();
        return;
    } else {
        cm.dispose();
        return;
    }

    if (status == 0) {
        switch (selection) {
            case 0:
                cm.sendYesNo("你去過婚禮村沒有？那裡是專門為舉行簡單可愛的婚禮而新建的地方~。據說在那裡還能和心愛的人結婚呢。你不覺得這樣太浪漫了嗎？如果你想去那裡，我可以送你過去。怎麼樣，要去一趟嗎？");
                break;
            case 1:
                var marr = cm.getQuestRecord(160001);
                var data = marr.getCustomData();
                if (data == null) {
                marr.setCustomData("0");
                data = "0";
                }
                if (cm.getPlayer().getMarriageId() <= 0 || !data.equals("3")) {
                            cm.sendOk("I am truly sorry my dear.  This Chair of Love is a special gift designed only for the married ones.  You might want to get married first.");
                } else if (cm.canHold(cm.isGMS() ? 3012015 : 3012000,1) && !cm.haveItem(cm.isGMS() ? 3012015 : 3012000,1)) {
                    cm.gainItem(cm.isGMS() ? 3012015 : 3012000,1);
                } else {
                    cm.sendOk("Please make space or you already have this chair.");
                }
                cm.dispose();
                break;
        }
    } else if (status == 1) {
        cm.sendNext("你做了很正確的決定。你就去婚禮村好好享受愛的氣息吧~。回來的時候還會回到這裡，你就放心的去吧~");
    } else if (status == 2) {
        cm.saveLocation("AMORIA");
        cm.warp(680000000);
        cm.dispose();
    }
}
