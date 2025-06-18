/* 
 * 烏勒斯
 */
var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.dispose();
            return;
        }
        qm.sendNextN("你難道沒有挑戰烏勒斯的自信嘛, 我知道了, 等你有了興趣, 我們再說.");
        qm.dispose();
        return;
    }
    //m.sendSimpleN("#b現在立刻去挑戰打敗烏勒斯嗎? #k\r\n#L0#快速開始(通過匹配進行18人挑戰)#l\r\n#L1#前往烏勒斯入場地圖. #l");
    if (status == 0) {
        qm.sendNextN("你好啊, 我聽說你好像很厲害呢. ");
    } else if (status == 1) {
        qm.sendNextN("我來介紹一下, 我叫馬修勒, 我是在遙遠的地方聽說了霸王的傳聞才來了這裡的.");
    } else if (status == 2) {
        qm.sendNextN("如果你想要瞭解所有人都很畏懼的霸王, 就來找我.");
    } else if (status == 3) {
        qm.sendNextN("如果你有力量對抗烏勒斯, 馬修勒會讓你見識一下什麼叫做「真正的財物」的.");
    } else if (status == 4) {
        qm.sendYesNoN("如果你有興趣了, 我現在就立刻派出專用飛機, 讓你可以來我這裡, 你過來我們再詳談如何? .");
    } else if (status == 5) {
        qm.sendNextN("好吧, 我現在就立刻派出專用飛機, 如果你有其他事情, 可以日後再通過次元之鏡來我這裡. ");
        //qm.sendNextN("現在你所在的地方並不是我能派專用飛機的地方呢, 等你到了其他地方之後再聯繫我吧. ");
    }else if (status == 6) {
        qm.forceCompleteQuest();
        qm.warp(970072200);
        qm.dispose();
    }
}
function end(mode, type, selection) {
    //qm.forceCompleteQuest();
    qm.dispose();
}
