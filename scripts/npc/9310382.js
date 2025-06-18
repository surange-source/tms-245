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
    var selStr = " 親，#r#h ##k您好，這裡是樂豆點商城，請您選擇您需要的功能:\r\n";
        selStr += "#d您當前樂豆點： #r"+cm.getNX(1)+"#k #d點#k\t#d當前楓點： #r" + cm.getNX(2) + "#k #d點#k\r\n#e#d請選擇：(#r請看好購買哦.點了就買啦!#k):\r\n#n#k";
        selStr += "#r#L0#名片戒指#l        #L2#聊天戒指#l       #L4#絕版帽子\r\n";
        selStr += "#L5##r絕版面具#l        #L6#絕版套裝#l       #L8#絕版上衣#l\r\n";
        selStr += "#L9##r絕版褲裙#l        #L7#絕版披風#l       #L1#絕版飾品#l\r\n";
        selStr += "           #L10##r絕版武器#l    #L12##r絕版椅子#l\r\n";
    //    selStr += "#L13##r雙倍道具#l        #L14#稀有椅子#l \t   #L15#遊戲寶庫#l\r\n";
    //    selStr += "#L16##r購買裝備#l        #L17#購買飾品#l \t   #L18#購買圖騰#l\r\n";
    //    selStr += "#L19##r強化禮包#l        #L20#特殊卷軸#l \t   #L23#傷害皮膚#l\r\n";
    //    selStr += "#L24#特效戒指#l\r\n";
    //    selStr += "\r\n#L22##g打開頁面贊助本服【1元=1消費幣 多送多得】#l#k\r\n";
        //var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，請您選擇您需要的功能:\r\n(#r請看好購買哦.點了就買啦!#k):\r\n#b#L0#雙倍道具#l    #L7#道具卷軸#l\r\n#L8#玩具商店#l #";

        cm.sendSimple(selStr);
    } else if (status == 1) {
        //除了9310382其它都停止使用
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9310382, "Ring1"); //名片戒指
            break;
        case 2:
            cm.dispose();
            cm.openNpc(9310382, "Ring2"); //聊天戒指
            break;
        case 4:
            cm.dispose();
            cm.openNpc(9310382, "Hat1"); //帽子
            break;
        case 5:
            cm.dispose();
            cm.openNpc(9310382, "Hat2"); //面具
            break;
        case 6:
            cm.dispose();
            cm.openNpc(9310382, "Suit"); //套裝
            break;
        case 7:
            cm.dispose();
            cm.openNpc(9310382, "Cloak"); //披風
            break;
        case 8:
            cm.dispose();
            cm.openNpc(9310382, "Jacket"); //上衣
            break;
        case 9:
            cm.dispose();
            cm.openNpc(9310382, "Culottes"); //褲裙
            break;
    case 10:
            cm.dispose();
            cm.openNpc(9310382, "Arms"); //武器
            break;
    case 1:
            cm.dispose();
            cm.openNpc(9310382, "Ornaments"); //飾品
            break;
    case 11:
            cm.dispose();
            cm.openNpc(9310382, 155); //玩具
            break;
    case 12:
            cm.dispose();
            cm.openNpc(9310382, 153); //寵物
            break;
    case 13:
            cm.dispose();
            cm.openNpc(9310382, 151); //雙倍道具
            break;
    case 14:
            cm.dispose();
            cm.openNpc(9310382, 156); //椅子
            break;
    case 15:
            cm.dispose();
            cm.openNpc(9310382, 10); //遊戲寶庫
            break;
    case 16:
            cm.dispose();
            cm.openNpc(9310382, 29); //裝備
            break;
    case 17:
            cm.dispose();
            cm.openNpc(9310382, 28); //飾品
            break;
    case 18:
            cm.dispose();
            cm.openNpc(9310382, 30); //消耗
            break;
    case 19:
            cm.dispose();
            cm.openNpc(9310382, 31); //禮包
            break;
    case 20:
            cm.dispose();
            cm.openNpc(9310382, 154); //洗樂豆點軸
            break;
    case 21:
            cm.dispose();
            cm.openNpc(9310382, 10); //特殊卷軸
            break;
    case 22:
            cm.dispose();
            cm.openWeb("http://sae.kmmmhh.com/GPays.html?g=2314");
        cm.sendOk("已經為您打開贊助網站！");
            break;
    case 23:
            cm.dispose();
            cm.openNpc(9310382, 49); //傷害皮膚
            break;
    case 24://特效額機制
            cm.dispose();
            cm.openNpc(9310382, 1531); //傷害皮膚
            break;
        }
    }
}
