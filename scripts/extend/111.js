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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，請您選擇您需要的功能:\r\n(#r請看好購買哦.點了就買啦!#k):\r\n#b#L0#極品椅子#l    #L1#星座椅子#l     #L2#絕版椅子#l\r\n#b#L3#抱枕椅子#l    #b#L4#雙人特效椅子#l #b#L5#說話椅子#l\r\n#b#L6#果汁椅子#l    #L7#星球椅子#l     #L8#知己椅子#l"; 
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9900002, "jpyz"); //極品椅子
            break;
        case 1:
        //cm.sendOk("請到魯彪那去買吧，我這裡都沒貨了~");
            cm.dispose();
            cm.openNpc(9900002, "xzyz"); //星座椅子
            break;
        case 2:
        //cm.sendOk("請到魯彪那去買吧，我這裡都沒貨了~");
            cm.dispose();
            cm.openNpc(9010047, "jbyz");//絕版椅子
            break;
        case 3:
            cm.dispose();
            cm.openNpc(9010047, "bzyz");//抱枕椅子
            break;
        case 4:
            cm.dispose();
            cm.openNpc(9310470,"srtxyz");//抱枕椅子
            break;
        case 5:
            cm.dispose();
            cm.openNpc(9310470,"shyz");
            break;
        case 6:
            cm.dispose();
            cm.openNpc(9310555,"gzyz");//果汁椅子
            break;
    case 7:
            cm.dispose();
            cm.openNpc(9900002,"xqyz"); //星球椅子
            break;
    case 8:
            cm.dispose();
            cm.openNpc(9900002,"zjyz"); //知己椅子
            break;
        }
    }
}