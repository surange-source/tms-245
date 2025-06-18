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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，請您選擇您需要的功能:\r\n(#r本服獨創!#k):\r\n#b#L0#黃金豬豬#l    #L1#裝備製作#l   #L2# 戰甲吹泡泡魚#l \r\n#b#L3#材料地圖    #l#b#L4#惡靈影子#l    #b#L5#圖騰合成#l\r\n#b#L6#新職業轉職#l  #L7#進化神寵#l    #L8#製作神器#l\r\n#b#L9#世界貿易#l    #b#L10#靈魂結晶#l"; // 
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.warp(252020000,0);//雙倍道具
            break;
        case 1:
        //cm.sendOk("請到魯彪那去買吧，我這裡都沒貨了~");
            cm.dispose();
            cm.openNpc(9310111); //洗樂豆點軸
            break;
        case 2:
        //cm.sendOk("請到魯彪那去買吧，我這裡都沒貨了~");
            cm.dispose();
            cm.warp(221020701,0);
            break;
        case 3:
            cm.dispose();
            cm.warp(273010000,0);
            break;
        case 4:
            cm.dispose();
            cm.openNpc(9310060);
            break;
        case 5:
        //cm.sendOk("請到魯彪那去買吧，我這裡都沒貨了~");
            cm.dispose();
            cm.openNpc(9000178);
            break;
        case 6:
            cm.dispose();
            cm.warp(331001000,0);//雙倍道具
            break;
    case 7:
            cm.dispose();
            cm.openNpc(1032205,"jhsc"); //破攻石頭
            break;
    case 8:
         //cm.sendOk("請到魯彪那去買吧，我這裡都沒貨了~");
            cm.dispose();
            cm.openNpc(9010047, "zhizhuoshenqi"); //洗樂豆點軸
            break;
        case 9:
            cm.dispose();
            cm.warp(865000001,0);
            break;
    case 10:
            cm.dispose();
            cm.openNpc(1032205,"lhjj"); //破攻石頭
            break;
    case 11:
        //cm.sendOk("請到魯彪那去買吧，我這裡都沒貨了~");
            cm.dispose();
            cm.openNpc(9010047, "xinmo1");
            break;
        }
    }
}