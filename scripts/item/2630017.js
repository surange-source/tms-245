var status = -1;
var isUse = false;
var cleanData = false;

function start() {
    if (im.getName().equals(im.getWorldShareInfo(500605, "subName"))) {
        im.sendSimple("你是弟子角色呢！\r\n\r\n#b#L99#好像有錯呢，我想初始化葫蘆的資料。#l");
    } else if (im.getWorldShareInfo(500605, "mainName") == im.getName() && im.isQuestActive(500606)) {
        if (parseInt(im.getWorldShareInfo(500606, "m0")) >= parseInt(im.getWorldShareInfo(500605, "maxKill"))) {
            im.sendOk("#b#t" + im.getItemId() + ":##k已經填滿了經驗值呢！\r\n無法再把擊殺數量儲存到葫蘆裡，但可以把葫蘆轉移給帳號內其他角色後，獲得依照累積怪物擊殺數量的經驗值呢。\r\n現在馬上把葫蘆轉移給其他角色後，設定為 #b弟子角色#k吧！\r\n\r\n#r※ 弟子角色條件：\r\n等級比師父角色： " + im.getQuestInfo(500605, "mainName") + " (" + parseInt(im.getQuestInfo(500605, "mainLv")) + "等級) 低的角色\r\n   未滿220等級的角色\r\n   不是皮卡啾、神之子、燃燒角色的角色");
        } else {
            im.showSpecialUI(true, "UIExpBottle");
        }
        im.dispose();
    } else if (im.getWorldShareInfo(500605) != null && im.getWorldShareInfo(500606) != null) {
        if (im.getPlayer().getBurningChrType() > 0) {
            im.sendOk("燃燒角色無法成為 #e弟子角色#n！");
            im.dispose();
        } else if (Math.floor(im.getJob() / 1000) == 13) {
            im.sendOk("皮卡啾無法成為 #e弟子角色#n！");
            im.dispose();
        } else if (Math.floor(im.getJob() / 1000) == 10) {
            im.sendOk("神之子無法成為 #e弟子角色#n！");
            im.dispose();
        } else {
            if (im.getWorldShareInfo(500605) == null) {
                im.sendSimple("發生未知錯誤！\r\n\r\n#b#L99#好像有錯呢，我想初始化葫蘆的資料。#l");
                return;
            }
            if (im.getWorldShareInfo(500605, "subName") != null) {
                im.sendSimple("帳號內有弟子角色呢！\r\n\r\n#b#L99#好像有錯呢，我想初始化葫蘆的資料。#l");
                return;
            }
            var mainLv = im.getWorldShareInfo(500605, "mainLv");
            if (mainLv == null) {
                im.sendSimple("發生未知錯誤！\r\n\r\n#b#L99#好像有錯呢，我想初始化葫蘆的資料。#l");
                return;
            }
            if (im.getLevel() >= parseInt(mainLv) || im.getLevel() >= 220) {
                im.sendOk("由於等級比師父角色等級 (最初登錄時間) 低的角色或是等級比 220等級低 無法成為 #e弟子角色#n！");
                im.dispose();
            } else {
                isUse = true;
                use(1, 0, 0);
            }
        }
    } else {
        action(1, 0, 0);
    }
}

function action(mode, type, selection) {
    if (selection == 99 || cleanData) {
        if (!cleanData) {
            cleanData = true;
            status = -1;
        }
        selection_99(mode, type, selection);
        return;
    }
    if (isUse) {
        use(mode, type, selection);
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        if (status == 5) {
            im.sendOk("慎重一點沒什麼不好呢！但不要太猶豫喔！因為這是可以把 #b師父角色#k 和 #b弟子角色#k同時進行成長的炫酷道具呢！");
            im.dispose();
            return;
        }
        status--;
    }

    var i = -1;
    if (status == i++) {
        im.dispose();
    } else if (status == i++) {
        im.sendNext("哈囉！#b#t" + im.getItemId() + ":##k是你的#b師父角色#k擊殺怪物的數量來贈送一定量的經驗值給 #b弟子角色#k的魔法道具呢！");
    } else if (status == i++) {
        im.sendNextPrev("首次使用#b#t" + im.getItemId() + ":##k的角色會成為 #b師父角色#k呢！\r\n師父角色擊殺的 #b等級範圍怪物#k的數量是 #b#t" + im.getItemId() + ":##k裡最多可累積 #b10萬隻#k喔！");
    } else if (status == i++) {
        im.sendNextPrev("完成累積擊殺數量的 #b#t" + im.getItemId() + ":##k搬移到帳號內的其他角色來使用時，使用的角色就會成為 #b弟子角色#k！\r\n#b弟子角色#k是比照累積的擊殺數量來獲得 #b500%#k 的經驗值喔！");
    } else if (status == i++) {
        im.sendNextPrev("#b師父角色#k和 #b弟子角色#k是 #r決定一次就無法再變更#k的關係，請慎重選擇吧！\r\n也仔細看看下列必要條件！\r\n\r\n#r#e※ 弟子角色條件\r\n   等級比師父角色等級 (最初登錄時間) 低的角色\r\n   等級比 220等級低的角色\r\n   不是皮卡啾、神之子、燃燒角色的角色\r\n   達到設定的最大等級時，無法獲得經驗值\r\n   200等級之後，獲得經驗值效率大幅減少");
    } else if (status == i++) {
        im.sendNextPrev("弟子角色是比 #r師父角色低的等級時或在等級成為 220等級前，都可以獲得經驗值！#k\r\n或是 #b#t" + im.getItemId() + ":##k是每帳號同時只能使用 1個喔！如果有使用中的葫蘆時，#r使用完前，都無法重複使用#k的關係，這部分再麻煩注意一下！");
    } else if (status == i++) {
        im.sendYesNo("#b#e師父角色：#h0# (" + im.getPlayer().getLevel() + "等級)\r\n\r\n#n#k要把目前的角色和現在等級設定為 #b師父角色#k 狀態嗎？\r\n※ 注意：設定時，無法進行變更。");
    } else if (status == i++) {
        im.sendNext("很好！現在開始用 #b#h0##k 角色來擊殺等級範圍怪物狩獵時，擊殺數量可最多累積 10隻！\r\n把#b#t" + im.getItemId() + ":##k拿給帳號裡其他角色的話，使用的 #b弟子角色#k會消耗累積的擊殺數量來獲得達到 #b" + im.getPlayer().getLevel() + "等級前為止的#k 經驗值！但是，這情況，葫蘆 #r無法再進行交換#k的關係，再麻煩參考！");
    } else if (status == i++) {
        im.updateWorldShareInfo(500605, "mainLv", im.getLevel());
        im.updateWorldShareInfo(500605, "mainName", im.getName());
        im.updateWorldShareInfo(500605, "maxKill", "100000");
        im.forceStartQuest(500606, true);
        im.showSpecialUI(true, "UIExpBottle");
        im.dispose();
    } else {
        im.dispose();
    }
}

var used = false;
function use(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            im.sendSimple("想法變了嗎？#b弟子角色#k是決定一次就使用完葫蘆前無法變更，所以慎重一點沒有什麼不好喔！\r\n\r\n#b#L99#好像有錯呢，我想初始化葫蘆的資料。#l");
            status--;
            return;
        }
        status--;
    }

    var i = -1;
    if (status == i++) {
        im.dispose();
    } else if (status == i++) {
        var mainLv = im.getWorldShareInfo(500605, "mainLv");
        var mainName = im.getWorldShareInfo(500605, "mainName");
        var availableKills = im.getWorldShareInfo(500606, "m0");
        if (mainLv == null || mainName == null || availableKills == null) {
            im.sendSimple("發生未知錯誤！\r\n\r\n#b#L99#好像有錯呢，我想初始化葫蘆的資料。#l");
            return;
        }
        im.sendYesNo("#b弟子角色：" + im.getName() + "#k\r\n\r\n把目前角色設定為 #b弟子角色#k後，要接收 #b師父角色#k收集的經驗值嗎？\r\n\r\n※ 師父角色：" + mainName + " (" + mainLv + "等級)\r\n※ 累積的擊殺數量：" + availableKills + "隻");
    } else if (status == i++) {
        if (!used) {
            if (im.getSpace(2) < 1) {
                im.sendOk("請空出背包裡的一格以上的消耗欄空間。");
                im.dispose();
                return;
            }
            if (im.used()) {
                used = true;
                var availableKills = im.getWorldShareInfo(500606, "m0");
                if (availableKills == null) {
                    im.sendSimple("發生未知錯誤！\r\n\r\n#b#L99#好像有錯呢，我想初始化葫蘆的資料。#l");
                    return;
                }
                im.updateWorldShareInfo(500605, "subName", im.getName());
                im.updateWorldShareInfo(500605, "mobKillCountQREx", availableKills);
                im.updateWorldShareInfo(500605, "availableKills", availableKills);
                im.updateWorldShareInfo(500606, null);
                im.resetQuest(500606);
                im.gainItemPeriod(2630031, 1, 14);
            } else {
                im.sendOk("發生未知錯誤！");
                im.dispose();
                return;
            }
        }
        im.sendNext("恭喜！成為 #b弟子角色#k的 #b" + im.getName() + "#k是現在開始可以使用葫蘆裡的擊殺數量來獲得經驗值喔！\r\n\r\n#b最大能成長的等級： " + im.getQuestInfo(500605, "mainLv") + "等級\r\n可使用的擊殺數量：" + im.getQuestInfo(500605, "availableKills") + "隻");
    } else if (status == i++) {
        im.sendNextPrev("使用背包的 #b#i2630031:# #t2630031##k後，點擊跳出視窗中的 #b[接收經驗值]#k 按鈕的話，可以隨時使用累積擊殺數量來獲得經驗值，現在快去試試看吧！");
    } else if (status == i++) {
        im.showSpecialUI(true, "UIExpBottle");
        im.dispose();
    } else {
        im.dispose();
    }
}

function selection_99(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        im.dispose();
        return;
    }

    var i = -1;
    if (status == i++) {
        im.dispose();
    } else if (status == i++) {
        im.sendYesNo("什麼？想要初始化關於#t2630017:#的所有使用資料嗎？\r\n你選擇的 #b師父角色#k 和 #b弟子角色#k、目前為止累積的擊殺數量、還沒接收的經驗值、還剩的 #t2630031:# 也是，相關的 #r#e所有資料會全部廢棄#k#n喔！這樣真的沒問題嗎？");
    } else if (status == i++) {
        im.sendYesNo("真的如果沒有想錯的話，這並不是想要推薦的方法呢…！\r\n真的要初始化關於 #t2630017:#的 #r#e所有資料#k#n嗎？\r\n\r\n※ 注意：如果初始化相關資料的話，就不會收回未使用的經驗值，而且也無法使用轉移到其他角色的 #t2630031#。\r\n 如果在背包裡有未使用 #t2630031#，也會自動破壞。");
    } else if (status == i++) {
        im.showSpecialUI(false, "UIExpBottle");
        im.updateWorldShareInfo(500605, null);
        im.updateWorldShareInfo(500606, null);
        im.resetQuest(500606);
        im.sendOk("如果你的想法是這樣的話，我也沒辦法呢。\r\n好了，我把相關所有資料全部清除掉了！\r\n如果，想要重新使用#b#t2630017:#的話，從設定新的 #b師父角色#k來開始吧！");
        im.dispose();
    } else {
        im.dispose();
    }
}