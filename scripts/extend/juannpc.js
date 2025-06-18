/* 樂豆點商店 */

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，請您選擇您需要的功能:\r\n(#r請看好購買哦.點了就買啦!#k):\r\n#b#L0#普通卷軸1#l\r\n#L4#普通卷軸2#l\r\n#L5#普通卷軸3#l";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9900002, "putongjuan"); //雙倍道具
            break;
        case 1:
        //cm.sendOk("請到魯彪那去買吧，我這裡都沒貨了~");
            cm.dispose();
            cm.openNpc(9900002, 6); //絕版點裝
            break;
        case 2:
        //cm.sendOk("請到魯彪那去買吧，我這裡都沒貨了~");
            cm.dispose();
            cm.openNpc(9900002, 4); //各種椅子
            break;
        case 3:
            cm.dispose();
            cm.openNpc(9900002, 9); //各種喇叭
            break;
        case 4:
            cm.dispose();
            cm.openNpc(9900002, "putongjuan2"); //洗樂豆點軸
            break;
        case 5:
        //cm.sendOk("請到魯彪那去買吧，我這裡都沒貨了~");
            cm.dispose();
            cm.openNpc(9900002, "putongjuan3"); //玩具商店
            break;
        case 6:
            cm.dispose();
            cm.openNpc(9900002, 25); //騎寵商店
            break;
    case 7:
            cm.dispose();
            cm.openNpc(9900002, 100); //破攻石頭
            break;
    case 8:
            cm.dispose();
            cm.openNpc(9900002, 1301); //一鍵潛能
            break;
        }
    }
}