var status = 0;
var bossid = "首沖禮包";
var giftLevel = Array(1, 10, 100, 500, 1000);
var giftContent = Array(
        Array(5062000, 10, 1),
        Array(5062002, 10, 2),
        Array(5062500, 10, 2),
        Array(1112793, 1, 2),
        Array(5062009, 10, 3),
        Array(2049135, 5, 3),
        Array(2430640, 1, 3),
        Array(5062009, 20, 4),
        Array(5062500, 20, 4),
        Array(2430640, 1, 4),
        Array(3994417, 1, 5),
        Array(5062009, 50, 5),
        Array(5062500, 50, 5),
        Array(2430640, 2, 5)
        )
var giftId = -1;
var giftToken = Array();
var gifts = null;
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
        var text = "";
        text += "累計儲值達到以下要求即可領取首沖禮包！\r\n\r\n\t#e#d您當前的儲值金額：#n#r￥" + cm.getTotalTWD() + "#k\r\n";
        for (var key in giftLevel) {
            var tips = "";
            giftToken[key] = false;
            if (cm.getTotalTWD() >= giftLevel[key]) {
                if (cm.getBossLogAcc(bossid + key) != -1) {
                    tips = "(可領取)";
                    giftToken[key] = true;
                } else {
                    tips = "#g(已領取)#b";
                }
            } else {
                tips = "#r(條件不足)#b";
            }
            text += "#b#L" + (parseInt(key) + 1) + "#領取#r#e" + giftLevel[key] + "#n#b元首沖禮包 " + tips + "#l#k\r\n";
        }
        cm.sendSimple(text);
    } else if (status == 1) {
        giftId = parseInt(selection);
        var text = "#r#e" + giftLevel[giftId - 1] + "#n#b元首沖禮包內容：\r\n";
        gifts = getGift(giftId);
        for (var key in gifts) {
            var itemId = gifts[key][0];
            var itemQuantity = gifts[key][1];
            text += "#v" + itemId + "##b#t" + itemId + "##k #rx " + itemQuantity + "#k\r\n";
        }
        text += "\r\n#d是否現在就領取該禮包？#k";
        cm.sendYesNo(text);
    } else if (status == 2) {
        if (giftId != -1 && gifts != null) {
            if (cm.getSpace(1) < 8 || cm.getSpace(2) < 8 || cm.getSpace(3) < 8 || cm.getSpace(4) < 8 || cm.getSpace(5) < 8) {
                cm.sendOk("您的背包空間不足，請保證每個欄位至少8格的空間，以避免領取失敗。");
                cm.dispose();
                return;
            }
            if (giftToken[giftId - 1]) {
                cm.setBossLogAcc(bossid + (giftId - 1), -2);
                for (var key in gifts) {
                    var itemId = gifts[key][0];
                    var itemQuantity = gifts[key][1];
                    cm.gainItem(itemId, itemQuantity);
                }
                cm.sendOk("恭喜您，領取成功！快打開包裹看看吧！");
                cm.channelMessage(0x18, "『首沖禮包』" + " : " + "玩家 " + cm.getChar().getName() + " 領取了 " + giftLevel[giftId - 1] + "元 首沖禮包。");
                cm.dispose();
            } else {
                status = -1;
                cm.sendSimple("您已經領過了該禮包或者儲值金額未達到要求，無法領取。");
            }
        } else {
            cm.sendOk("領取錯誤！請聯繫管理員！");
            cm.dispose();
        }
    }
}
function getGift(id) {
    var lastGiftContent = Array();
    for (var key in giftContent) {
        if (giftContent[key][2] == id)
            lastGiftContent.push(giftContent[key]);
    }
    return lastGiftContent;
}
