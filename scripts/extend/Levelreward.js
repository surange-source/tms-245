/*      
 *  
 *  功能：等級送禮
 *  
 */

var status = 0;
var bossid = "等級禮包";
var giftLevel = Array(10, 30, 60, 100, 120, 140, 160, 180, 200, 210, 220, 230, 240, 250);
var giftContent = Array(
        //Array(4032521, 1, 0), //VIP邀請卷
        Array(4001713, 1, 0), //定居金100W
        Array(4001713, 1, 0), //定居金100W
        Array(2431902, 1, 0), //20級武器箱
        Array(2430445, 1, 0), //20級裝備箱

        Array(2615002, 5, 1), //低級培羅德卷軸
        //Array(2431098, 1, 1), //低級培羅德隨機
        Array(5062000, 2, 1), //神奇方塊
        Array(2431906, 1, 1), //40級武器箱
        Array(2430449, 1, 1), //40級裝備箱

        Array(5150040, 3, 2), //皇家理發卷
        Array(5152053, 3, 2), //皇家整容卷
        Array(2431741, 1, 2), //楓點3000
        Array(5062000, 5, 2), //神奇方塊
        Array(2431909, 1, 2), //70級武器箱
        Array(2430452, 1, 2), //70級裝備箱

        //Array(2430226, 1, 3), //亂鬥翅膀
        Array(5062000, 5, 3),
        Array(2049122, 2, 3), //正向
        Array(2049135, 2, 3), //驚人正義20%2340000
        Array(2431741, 1, 3), //楓點3000
        //Array(4310030, 200, 3), //運動會幣
        //Array(4000082, 30, 3), //殭屍金牙
        Array(4021012, 3, 3), //強烈靈魂的淨水
        Array(4021011, 3, 3), //春節靈魂的火花
        Array(4021010, 3, 3), //時間之石
        //160級
        Array(2431741, 1, 4), //楓點3000
        //Array(4310129, 10, 4), //冬季限量硬幣
        Array(2431987, 1, 4), //傷害皮膚箱子
        Array(5062002, 5, 4), //高級方塊
        Array(5064000, 5, 4), //防爆
        Array(2049116, 2, 4), //強化
        //Array(4033356, 5, 4), //正義火種1
        //Array(4000124, 5, 4), //戰甲泡泡魚內存卡
        //Array(4310030, 200, 4), //運動會幣
        //Array(4000082, 30, 4), //殭屍金牙
        Array(4021012, 3, 4), //強烈靈魂的淨水
        Array(4021011, 3, 4), //春節靈魂的火花
        Array(4021010, 3, 4), //時間之石
        //180級
        Array(2431944, 1, 5), //140級武器箱子
        Array(2431945, 1, 5), //140防具箱子
        Array(2431741, 1, 5), //楓點3000
        //Array(4310129, 10, 5), //冬季限量硬幣
        //Array(4000517, 1, 5), //黃金魚，提升15%
        Array(4033924, 2, 5), //神話耳環藍圖
        //Array(4033356, 5, 5), //正義火種1
        //Array(4000124, 5, 5), //戰甲泡泡魚內存卡
        //Array(4310030, 300, 5), //運動會幣
        //Array(4000082, 40, 5), //殭屍金牙
        Array(4021012, 3, 5), //強烈靈魂的淨水
        Array(4021011, 3, 5), //春節靈魂的火花
        Array(4021010, 3, 5), //時間之石
        //200級
        Array(2431945, 1, 6), //140防具箱子
        Array(2431741, 1, 6), //楓點3000
        Array(4002002, 1, 6), //蝸牛郵票，兌換樂豆點使用
        Array(5062000, 5, 6),
        Array(5062002, 5, 6),
        Array(5062500, 5, 6),
        Array(2049323, 2, 6), //無損
        Array(2049752, 2, 6), //S 潛能 30%
        Array(2049116, 2, 6), //驚人正義20%2340000
        Array(2049122, 2, 6), //驚人正義20%2340000
        Array(2049135, 2, 6), //驚人正義20%2340000
        //Array(4310030, 300, 6), //運動會幣
        //Array(4033356, 5, 6), //正義火種1
        //Array(4000124, 5, 6), //戰甲泡泡魚內存卡
        //Array(4000082, 50, 6), //殭屍金牙
        Array(4021012, 3, 6), //強烈靈魂的淨水
        Array(4021011, 3, 6), //春節靈魂的火花
        Array(4021010, 3, 6), //時間之石
        Array(4310015, 1, 6), //鬥神證物
        Array(4021019, 1, 6), //夢之石
        Array(2049135, 2, 7), //驚人正義20%2340000
        Array(4002003, 1, 7), //蝸牛郵票，兌換樂豆點使用
        Array(5062000, 5, 7),
        Array(5062002, 5, 7),
        //Array(5062500, 5, 7),
        //Array(5064000, 2, 7),
        //Array(2431987, 1, 7), //驚人卷軸箱子
        //Array(2431725, 1, 7), //熱力四射蠟筆箱子
        //Array(4310036, 3000, 7), //征服者
        //Array(4033356, 10, 7), //正義火種1
        //Array(4000124, 10, 7), //戰甲泡泡魚內存卡
        //Array(4000082, 50, 7), //殭屍金牙
        //Array(4021012, 3, 7), //強烈靈魂的淨水
        //Array(4021011, 3, 7), //春節靈魂的火花
        //Array(4021010, 3, 7), //時間之石
        //Array(4310015, 2, 7) //鬥神證物
        //5062010 - 終極神奇方塊
        //5062024 - 六角方塊
        //200
        Array(2049122, 5, 8), //正向
        Array(5062500, 5, 8),
        Array(5064000, 2, 8),
        Array(2048723, 5, 8),
        //210
        Array(1113056, 1, 9),
        Array(2048723, 10, 9),
        Array(2049122, 10, 9), //正向
        Array(5062010, 5, 9),
        //220
        Array(1032201, 1, 10),
        Array(2048723, 15, 10),
        Array(2049122, 15, 10), //正向
        Array(2046996, 1, 11),
        Array(2046997, 1, 11),
        Array(2047818, 1, 11),
        Array(2612059, 1, 11),
        Array(5062010, 6, 10),
        //230
        Array(1122259, 1, 11),
        Array(2048723, 20, 11),
        Array(2046996, 2, 11),
        Array(2046997, 2, 11),
        Array(2047818, 2, 11),
        Array(2612059, 2, 11),
        Array(5062010, 20, 11),
        Array(5062024, 20, 11),
        //240
        Array(1012414, 1, 12),
        Array(2048723, 25, 12),
        Array(2049122, 20, 12), //正向
        Array(2046996, 3, 12),
        Array(2046997, 3, 12),
        Array(2047818, 3, 12),
        Array(2612059, 3, 12),
        Array(5062010, 35, 12),
        Array(5062024, 35, 12),
        //250
        Array(1022195, 1, 13),
        Array(1142742, 1, 13),
        Array(2048723, 30, 13),
        Array(2049122, 20, 13), //正向
        Array(2046996, 5, 13),
        Array(2046997, 5, 13),
        Array(2047818, 5, 13),
        Array(2612059, 5, 13),
        Array(5062010, 50, 13),
        Array(5062024, 50, 13)
        /*
         2046996 - 驚人的單手武器攻擊力卷軸100%
         2046997 - 驚人的單手武器魔力卷軸100%
         2047818 - 驚人的雙手武器攻擊力卷軸100%
         2612059 - 驚人的雙手武器魔力卷軸100% 
         */
        );
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
        text += "嘿，我為你準備了許多寶貝，等你達到相應等級的時候就可以領取了，另外點擊可以查看禮包內容呢，快搶先看看吧！\r\n";
        for (var key in giftLevel) {
            var tips = "";
            giftToken[key] = false;
            if (cm.getChar().getLevel() >= giftLevel[key]) {
                if (cm.getPQLog(bossid + key, 1) == 0) {
                    tips = "(可領取)";
                    giftToken[key] = true;
                } else {
                    tips = "#g(已領取)#b";
                }
            } else {
                tips = "#r(等級不足)#b";
            }
            text += "#b#L" + (parseInt(key)) + "#領取#r#e" + giftLevel[key] + "#n#b級等級禮包 " + tips + "#l#k\r\n";
        }
        cm.sendSimple(text);
    } else if (status == 1) {
        giftId = parseInt(selection);
        var text = "#r#e" + giftLevel[giftId] + "#n#b級禮包內容：\r\n";
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
            var job = cm.getChar().getJob();
            if ((job == 10000 || job == 10100 || job == 10110 || job == 10111 || job == 10112) && cm.getChar().getLevel() < 140) {
                cm.sendOk("神之子需要到140才能領取！");
                cm.dispose();
                return;
            }
            if (giftToken[giftId] && cm.getPQLog(bossid + key, 1) == 0) {
                cm.setPQLog(bossid + (giftId), 1, 1);
                for (var key in gifts) {
                    var itemId = gifts[key][0];
                    var itemQuantity = gifts[key][1];
                    cm.gainItem(itemId, itemQuantity);
                }
                cm.sendOk("恭喜您，領取成功！快打開包裹看看吧！");
                cm.dispose();
            } else {
                status = -1;
                cm.sendSimple("您已經領過了該禮包或者等級未達到要求，無法領取。");
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