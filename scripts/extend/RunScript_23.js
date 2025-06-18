var status = -1;
var select = -1;

function start() {
    cm.sendSimple("對於楓之谷導航有什麼想問的嗎？\r\n\r\n#b#L0#楓之谷導航使用方法#l\r\n#L1#遊戲內容地圖使用方法#l\r\n#L2#沒有想問的。#l");
}

function action(mode, type, selection) {
    if (mode === 1) {
        status++;
    } else {
        status--;
    }

    var i = -1;
    if (status === i++) {
        cm.dispose();
    } else if (status === i++) {
        if (select == -1) {
            select = selection;
        }
        switch (select) {
            case 0:
                cm.sendNext("透過楓之谷導航，可以獲得當前角色適合進行的任務、一般地圖、組隊任務的推薦。\r\n\r\n1. 使用#b快捷鍵[U]#k可以開啟楓之谷導航。\r\n2. 使用滑鼠點擊#b左右箭頭按鍵#k可以確認其他推薦內容。\r\n\r\n\r\n3. 點擊#b轉職/推薦任務按鍵#k時可以開始進行該任務或確認任務資訊。\r\n\r\n\r\n4. 點擊#b一般地圖/主題副本/組隊任務按鍵#k時，可以直接#b移動#k到該地區。");
                break;
            case 1:
                cm.sendNext("遊戲內容地圖從30級以上開始才能使用，可以清楚確認楓之谷的遊戲內容資訊。\r\n\r\n1. 點擊#b楓之谷導航[+]按鍵#k或按下#b兩次快捷鍵[U]#k可以使用遊戲內容地圖。\r\n\r\n2. 按下遊戲內容地圖的#b右側的內容按鍵#k時可以確認遊戲內容的說明與獎勵。\r\n\r\n3. 在遊戲內容地圖#b左側的地圖區域#k內點擊#b上下箭頭按鍵#k，或使用#b滑鼠滾輪#k可以確認其他等級區間的遊戲內容。");
                break;
            case 2:
                cm.sendOk("想要聽取楓之谷導航的說明的話，隨時都可以跟我說。");
            default:
                cm.dispose();
                break;
        }
    } else if (status === i++) {
        switch (select) {
            case 0:
                status = -1;
                select = -1;
                start();
                break;
            case 1:
                cm.sendNextPrev("4. 與#b推薦等級範圍內#k的等級相符時，可以#b馬上移動#k至該地圖。但移動只限制在遊戲內容的推薦等級+10級為止。\r\n\r\n5. 進行各個遊戲內容時，可以獲得#b遊戲內容完成印章#k。主題副本是完成最後的任務時可以獲得，一般地圖上的怪物擊殺一定數量以上時也可以獲得。\r\n獲得完成印章的遊戲內容，不受等級限制，可以直接移動。");
                break;
            default:
                cm.dispose();
                break;
        }
    } else if (status === i++) {
        switch (select) {
            case 1:
                status = -1;
                select = -1;
                start();
                break;
            default:
                cm.dispose();
                break;
        }
    } else {
        cm.dispose();
    }
}