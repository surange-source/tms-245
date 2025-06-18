/*
    任務: 天上的島——克裡塞
    描述: 天空之城的艾利遜突然和我聯繫。\r\n從艾利遜陰沉的表情來看，好像不是什麼好事。
*/
var status = -1;

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == -1) {
            qm.dispose();
        } else if (status == 0) {
            qm.sendNext("怎麼現在才來？你不知道我等了多久。")
        } else if (status == 1) {
            qm.sendNextPrev("在天空之城的上空，有一個名叫克裡塞的空中之島。那裡生活著體型巨大，但是性格善良的巨人族。\r\n但是從不久前開始，克裡塞開始變得越來越遠，聯絡也中斷了。\r\n一定是發生了什麼事……要是可以的話，我真想馬上過去看看。但是你也知道，我無法離開這裡。")
        } else if (status == 2) {
            if (mode == 1) {
                qm.sendNextPrev("你能幫我去確認一下克裡塞到底發生了什麼事情嗎？\r\n我把你送到克裡塞去。回來之後，一定要告訴我發生了什麼事情。")
            } else {
                qm.sendNext("你還沒做好準備嗎？如果你改變了主意，可以再來找我。")
            }
        } else if (status == 3) {
            qm.forceCompleteQuest();
            qm.sendYesNo("做好出發的準備了嗎？\r\n這將會是一段很長的旅程，你最好做好充分的準備。我馬上送你過去。")
        } else if (status == 4) {
            qm.sendNext("很好。我馬上送你過去。這將是一段艱苦的旅程，你一定要做好心理準備。")
        } else if (status == 5) {
            qm.warp(200100001);
            qm.dispose();
        }
    }
}
