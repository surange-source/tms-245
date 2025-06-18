/*  This is mada by Kent    
 *  This source is made by Funms Team
 *  功能：簽到禮包領取
 *  @Author Kent 
 */
var status = 0;
var giftContent = Array(
        Array("樂豆點大禮包", 1, Array(
                //物品ID ，數量
                Array(5211047, 1),
                Array(5360014, 1),
                Array(1112100, 1),
                Array(5000208, 1)
                )),
        Array("公園大禮包", 3, Array(
                Array(4310020, 100),
                Array(2431987, 1),
                Array(2028079, 20),
                Array(2550000, 15),
                Array(2028080, 20)
                )),
        Array("潛能大禮包", 5, Array(
                Array(5062002, 7),
                Array(2049751, 5),
                Array(2049500, 5),
                Array(2048307, 5),
                Array(2048201, 10),
                Array(2531000, 10)
                )),
        Array("強化大禮包", 10, Array(
                Array(2049160, 12),
                Array(2049116, 6),
                Array(2340000, 3),
                Array(2470000, 3),
                Array(4001832, 200),
                Array(4001839, 200)
                )),
        Array("機器人大禮包", 16, Array(
                Array(2510173, 1),
                Array(2510174, 1),
                Array(4004001, 150),
                Array(2470000, 3),
                Array(2510407, 1),
                Array(4021021, 3)
                )),
        Array("黑天使大禮包", 23, Array(
                //物品ID ，數量
                Array(4005003, 20),
                Array(4005001, 20),
                Array(4021016, 10),
                Array(2511107, 1)
                )),
        Array("最強簽到大禮包", 31, Array(
                Array(5062006, 10),
                Array(2049130, 10),
                Array(2470000, 7),
                Array(2501000, 1),
                Array(5064000, 15),
                Array(3010070, 1)
                ))
        //可以再添加一些禮包  名字後面的數字是 連續簽到的天數       
        );

var giftId = -1;
var gifts = null;
var days = 999;
function start() {
    status = -1;
    action(1, 0, 0);
}
function gettime(itemid) {
    switch (itemid) {
        case 5211047:
        case 5360014:
            return 3 * 60 * 60 * 1000;
        case 1112100:
        case 5000008:
            return 30 * 24 * 60 * 60 * 1000;
        default:
            return -1;
    }
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
        text += "#e#b歡迎來到Funms每日簽到禮包領取中心，點擊可以查看禮包內的物品哦！#n\r\n";
        for (var key in giftContent) {
            var get = cm.getPQLog(giftContent[key][0], 0, 31) > 0;
            var can = cm.getSinginCount() >= giftContent[key][1];
            text += "#b#L" + key + "#領取【#r" + giftContent[key][0] + "#n#b】 #e#d" + " 需要連續簽到#r" + giftContent[key][1] + "#k天(" + (can ? get ? "已領取" : "未領取" : "未達成") + ")#n#b#l#k\r\n";
        }
        cm.sendSimple(text);
    } else if (status == 1) {
        giftId = parseInt(selection);
        days = giftContent[giftId][1];
        gifts = giftContent[giftId][2];
        var text = "#r#e" + giftContent[giftId][0] + "#n#b：\r\n";
        for (var key in gifts) {
            var itemId = gifts[key][0];
            var itemQuantity = gifts[key][1];
            text += "#i" + itemId + ":##b#z" + itemId + "##k #rx " + itemQuantity + "#k\r\n";
        }
        text += "\r\n#d#e#r是否領取簽到禮包？#k";
        cm.sendYesNo(text);
    } else if (status == 2) {
        if (giftId != -1 && gifts != null) {
            if (cm.getSpace(1) < 4 || cm.getSpace(2) < 4 || cm.getSpace(3) < 4 || cm.getSpace(4) < 4 || cm.getSpace(5) < 4) {
                cm.sendOk("#b您的背包空間不足，請保證每個欄位至少4格的空間，以避免領取失敗。");
                cm.dispose();
                return;
            }
            if (cm.getSinginCount() < days) {
                cm.sendOk("您還沒有連續簽到#r" + days + "#k天呀，請再接再厲。");
                cm.dispose();
                return;
            }
            if (cm.getPQLog(giftContent[giftId][0], 0, 31) > 0) {
                cm.sendOk("你已經領取過了這個禮包了！");
                cm.dispose();
                return;
            }
            for (var key in gifts) {
                var itemId = gifts[key][0];
                var itemQuantity = gifts[key][1];
                var time = gettime(itemId);
                if (itemId == 5000208) {
                    cm.gainPetItem(itemId, itemQuantity);
                } else {
                    cm.gainItem(itemId, itemQuantity, time);
                }

            }
            cm.setPQLog(giftContent[giftId][0]);
            cm.sendOk("恭喜您，領取禮包成功！");
            cm.dispose();
        } else {
            cm.sendOk("兌換錯誤！請聯繫管理員！");
            cm.dispose();
        }
    }
}