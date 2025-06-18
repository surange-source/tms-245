var status = 0;
var select = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if ((status == 2 || status == 3) && select == 99) {
            status = 0;
            select = -1
        } else {
            status--;
        }
    }

    var i = -1;
    if (status == i++) {
        cm.dispose();
    } else if (status == i++) {
        cm.sendSimple("若對#b#t2630017:##k有想知道的內容的話，我就告訴你吧！#b\r\n\r\n#L0##t2630017:#是？#l\r\n#L1##t2630017:#的使用方法#l\r\n#L2#關於師父角色和弟子角色#l\r\n#L3#其他注意事項#l\r\n\r\n#L99##t2630017:# 使用資料全部初始化#l");
    } else if (status == i++) {
        if (select == -1) {
            select = selection;
        }
        action(1, 0, 0);
    } else {
        switch (select) {
            case 0:
                selection_0(mode, type, selection);
                break;
            case 1:
                selection_1(mode, type, selection);
                break;
            case 2:
                selection_2(mode, type, selection);
                break;
            case 3:
                selection_3(mode, type, selection);
                break;
            case 99:
                selection_99(mode, type, selection);
                break;
            default:
                cm.dispose();
                break;
        }
    }
}

function selection_0(mode, type, selection) {
    var i = 1;
    if (status == i++) {
        cm.dispose();
    } else if (status == i++) {
        cm.sendNext("#b#t2630017:##k是你的 #b師父角色#k擊殺的怪物數量後，把一定量的經驗值給予 #b弟子角色#k的魔法道具呢！");
    } else if (status == i++) {
        cm.sendNextPrev("你設定的#b師父角色#k所狩獵的等級範圍的數量會累積到 #b#t2630017:##k，那經驗值可以把帳號內其他角色設為 #b弟子角色#k來轉移喔！");
    } else if (status == i++) {
        cm.sendNextPrev("弟子角色若使用拿到的 #b#t2630017:##k時，可以消耗累積的擊殺數量來獲得經驗值呢。\r\n#b弟子角色#k有 #b親自狩獵等級範圍怪物的 500% 效率#k 來獲得依照擊殺數量的經驗值喔！");
    } else if (status == i++) {
        status = -1;
        select = -1;
        action(1, 0, 0);
    } else {
        cm.dispose();
    }
}

function selection_1(mode, type, selection) {
    var i = 1;
    if (status == i++) {
        cm.dispose();
    } else if (status == i++) {
        cm.sendNext("首先要決定狩獵等級範圍怪物後，累積怪物擊殺數量的 #b師父角色#k呢！\r\n第一次使用#b#t2630017:##k的角色就會成為 #b師父角色#k。");
    } else if (status == i++) {
        cm.sendNextPrev("首先葫蘆有活性化時，用#b師父角色#k來狩獵的等級範圍怪物的數量會儲存在葫蘆裡。活性化狀態是#b師父角色#k持有葫蘆時，角色登入就會自動維持，登出前都會持續的關係，這部分不用擔心。\r\n如果沒有自動活性化時，在點擊葫蘆瓶就可以喔！");
    } else if (status == i++) {
        cm.sendNextPrev("把足夠累積擊殺數量的葫蘆瓶透過 #b倉庫#k來轉移到帳號內的其他角色使用時，使用的角色就會成為 #b弟子角色#k喔！就可以獲得葫蘆中經驗值得資格喔！\r\n但是葫蘆在那之後就 #r無法轉移到其他角色#k的關係，再麻煩注意喔！");
    } else if (status == i++) {
        status = -1;
        select = -1;
        action(1, 0, 0);
    } else {
        cm.dispose();
    }
}

function selection_2(mode, type, selection) {
    var i = 1;
    if (status == i++) {
        cm.dispose();
    } else if (status == i++) {
        cm.sendNext("葫蘆裡累積擊殺數量的 #k師父角色#k當然是要強力的角色會比較好吧？要教別人的話，自己的實力就應該要非常卓越阿！\r\n而且，#b設定老師角色時，相關角色的等級#k會直接紀錄在葫蘆上，所以再額外注意喔！");
    } else if (status == i++) {
        cm.sendNextPrev("#b弟子角色#k的等級要比紀錄在葫蘆上的 #b師父角色#k等級還要低喔！另外，就算途中用其他方法成長，也無法獲得超過紀錄在葫蘆上等級的經驗值，所以盡量把等級較低的角色設定為 #b弟子角色#k會比較好吧？");
    } else if (status == i++) {
        cm.sendNextPrev("然後一次決定的 #b師父角色#k和 #b弟子角色#k是使用完葫蘆或是廢棄所有資料前，#r無法進變更#k的關係，建議要慎重選擇喔！");
    } else if (status == i++) {
        status = -1;
        select = -1;
        action(1, 0, 0);
    } else {
        cm.dispose();
    }
}

function selection_3(mode, type, selection) {
    var i = 1;
    if (status == i++) {
        cm.dispose();
    } else if (status == i++) {
        cm.sendNext("非常可惜的，#b#t2630017:##k的容量並不是無限。能儲存在葫蘆裡的怪物擊殺數量是 #b最多100000隻#k 為止，再麻煩注意一下！\r\n如果葫蘆有滿的化，無法再累積擊殺數量，所以盡量快拿給 #b弟子角色#k分享經驗值比較好吧？");
    } else if (status == i++) {
        cm.sendNextPrev("另外，#b弟子角色#k的等級是無法超過 #b220等級#k！\r\n當然，#b弟子角色#k也無法比 #b師父角色#k的等級還要高！\r\n如果 #b師父角色#k的等級比 220等級低的話，弟子角色也只能成長到那以下的等級，這部分再注意一下喔！");
    } else if (status == i++) {
        cm.sendNextPrev("然後還有一個注意事項，若#b弟子角色#k成為 #b200等級以上#k的話，#t2630031#的 #r#e使用效率會大幅下降#n#k，所以建議在比較低的等級開始使用喔！\r\n而且 #b弟子角色#k的經驗值獲得 #b只能在村莊中#k進行，且一次可以獲得的經驗值量是 #r最多提升 10等級#k的關係，再參考一下喔！");
    } else if (status == i++) {
        cm.sendNextPrev("不管是用任何方式，#b弟子角色#k的等級超過 #b師父角色#k，或是達到 220 等級的化，無法再使用葫蘆的關係，葫蘆就會自動會壞掉喔。\r\n可是，你不用擔心！你只要獲得新的葫蘆的話，就可以再次重新選擇新的 #b師父角色#k和 #b弟子角色#k啊！");
    } else if (status == i++) {
        cm.sendNextPrev("然後，最後還有一個。\r\n不管在任何情況，#r帳號裡只能同時使用一個葫蘆#k喔。使用完一個葫蘆隻前，無法使用其他葫蘆的關係，這部分再多多注意喔！");
    } else if (status == i++) {
        status = -1;
        select = -1;
        action(1, 0, 0);
    } else {
        cm.dispose();
    }
}

function selection_99(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    }
    var i = 1;
    if (status == i++) {
        cm.dispose();
    } else if (status == i++) {
        cm.sendYesNo("什麼？想要初始化關於#t2630017:#的所有使用資料嗎？\r\n你選擇的 #b師父角色#k 和 #b弟子角色#k、目前為止累積的擊殺數量、還沒接收的經驗值、還剩的 #t2630031:# 也是，相關的 #r#e所有資料會全部廢棄#k#n喔！這樣真的沒問題嗎？");
    } else if (status == i++) {
        cm.sendYesNo("真的如果沒有想錯的話，這並不是想要推薦的方法呢…！\r\n真的要初始化關於 #t2630017:#的 #r#e所有資料#k#n嗎？\r\n\r\n※ 注意：如果初始化相關資料的話，就不會收回未使用的經驗值，而且也無法使用轉移到其他角色的 #t2630031#。\r\n 如果在背包裡有未使用 #t2630031#，也會自動破壞。");
    } else if (status == i++) {
        cm.showSpecialUI(false, "UIExpBottle");
        cm.updateWorldShareInfo(500605, null);
        cm.updateWorldShareInfo(500606, null);
        cm.resetQuest(500606);
        cm.sendOk("如果你的想法是這樣的話，我也沒辦法呢。\r\n好了，我把相關所有資料全部清除掉了！\r\n如果，想要重新使用#b#t2630017:#的話，從設定新的 #b師父角色#k來開始吧！");
        cm.dispose();
    } else {
        cm.dispose();
    }
}