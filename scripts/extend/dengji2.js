var status = 0;
var bossid = "等級禮包";
var giftLevel = Array(50,100,120,140,160,180,200,250);
var giftContent = Array(
    Array(4032521, 1, 1), //VIP邀請卷
    Array(4001714, 1, 1), //定居金100W
    //100級
    Array(2615002, 10, 2), //低級培羅德卷軸
    Array(2431098, 1, 2), //低級培羅德隨機
    Array(2431097, 1, 2), //傷害皮膚箱子
    Array(5062000, 2, 2), //神奇方塊
    //Array()
    //120級
    Array(5150040, 3, 3), //皇家理發卷
    Array(5152053, 3, 3), //皇家整容卷
    Array(2431741, 1, 3), //楓點3000
    Array(5062000, 5, 3), //神奇方塊
    //140級
    Array(2431944, 1, 4), //140級武器箱子
    Array(2430226, 1, 4), //亂鬥翅膀
    Array(5062000, 5, 4),
    Array(2049124, 10, 4), //正向
    Array(2049135, 2, 4), //驚人正義20%2340000
    Array(2431741, 1, 4), //楓點3000
    Array(4310030, 200, 4), //運動會幣
    Array(4000082, 30, 4), //殭屍金牙
    Array(4021012, 3, 4), //強烈靈魂的淨水
    Array(4021011, 3, 4), //春節靈魂的火花
    Array(4021010, 3, 4), //時間之石
    //160級
    Array(2431741, 1, 5), //楓點3000
    Array(4310129, 10, 5), //冬季限量硬幣
    Array(5062002, 5, 5), //高級方塊
    Array(5064000, 5, 5), //防爆
    Array(2049116, 10, 5), //強化
    Array(2049135, 2, 5), //驚人正義20%2340000
    Array(4002000, 1, 5), //蝸牛郵票，兌換樂豆點使用
    Array(4033356, 5, 5), //正義火種1
    Array(4000124, 5, 5), //戰甲泡泡魚內存卡
    Array(4310030, 200, 5), //運動會幣
    Array(4000082, 30, 5), //殭屍金牙
    Array(4021012, 3, 5), //強烈靈魂的淨水
    Array(4021011, 3, 5), //春節靈魂的火花
    Array(4021010, 3, 5), //時間之石
    //180級
    Array(2431945, 1, 6), //140防具箱子
    Array(2431741, 1, 6), //楓點3000
    Array(4310129, 10, 6), //冬季限量硬幣
    Array(4000517, 1, 6), //黃金魚，提升15%
    Array(4033924, 2, 6), //神話耳環藍圖
    Array(4033356, 5, 6), //正義火種1
    Array(4000124, 5, 6), //戰甲泡泡魚內存卡
    Array(4310030, 300, 6), //運動會幣
    Array(4000082, 40, 6), //殭屍金牙
    Array(4021012, 3, 6), //強烈靈魂的淨水
    Array(4021011, 3, 6), //春節靈魂的火花
    Array(4021010, 3, 6), //時間之石
    //200級
    Array(2431945, 1, 7), //140防具箱子
    Array(2431945, 1, 7), //140防具箱子
    Array(2431741, 1, 7), //楓點3000
    Array(4002000, 1, 7), //蝸牛郵票，兌換樂豆點使用
    Array(5062000, 5, 7),
    Array(5062002, 5, 7),
    Array(5062500, 5, 7),
    Array(2049323, 2, 7),  //無損
    Array(2049752, 2, 7),  //S 潛能 30%
    Array(2049116, 20, 7), //驚人正義20%2340000
    Array(2049124, 20, 7), //驚人正義20%2340000
    Array(2049135, 5, 7), //驚人正義20%2340000
    Array(4310030, 300, 7), //運動會幣
    Array(4033356, 5, 7), //正義火種1
    Array(4000124, 5, 7), //戰甲泡泡魚內存卡
    Array(4000082, 50, 7), //殭屍金牙
    Array(4021012, 3, 7), //強烈靈魂的淨水
    Array(4021011, 3, 7), //春節靈魂的火花
    Array(4021010, 3, 7), //時間之石
    Array(4310015, 1, 7), //鬥神證物
    Array(4021019, 1, 7), //夢之石
    //250級
    Array(5062000, 10, 8),
    Array(5062002, 10, 8),
    Array(5062500, 10, 8),
    Array(5064000, 10, 8),
    Array(2431995, 1, 8), //驚人卷軸箱子
    Array(2431725, 1, 8), //熱力四射蠟筆箱子
    Array(4310036, 3000, 8), //征服者
    Array(4033356, 10, 8), //正義火種1
    Array(4000124, 10, 8), //戰甲泡泡魚內存卡
    Array(4000082, 50, 8), //殭屍金牙
    Array(4021012, 3, 8), //強烈靈魂的淨水
    Array(4021011, 3, 8), //春節靈魂的火花
    Array(4021010, 3, 8), //時間之石
    Array(4310015, 2, 8) //鬥神證物
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
        text += "嘿，我為你準備了許多寶貝，等你達到相應等級的時候就可以領取了，另外點擊可以查看禮包內容呢，快搶先看看吧！\r\n";
        for(var key in giftLevel) {
            var tips = "";
            giftToken[key]=false;
            if (cm.getChar().getLevel()>=giftLevel[key]) {
                if (cm.getPQLog(bossid+key) >= 0) {
                    tips = "(可領取)";
                    giftToken[key]=true;
                } else {
                    tips = "#g(已領取)#b";
                }
            } else {
                tips = "#r(等級不足)#b";
            }
            text+="#b#L"+(parseInt(key)+1)+"#領取#r#e"+giftLevel[key]+"#n#b級等級禮包 "+tips+"#l#k\r\n";
        }
        cm.sendSimple(text);
    } else if (status == 1) {
        giftId = parseInt(selection);
        var text="#r#e"+giftLevel[giftId-1]+"#n#b級禮包內容：\r\n";
        gifts = getGift(giftId);
        for(var key in gifts) {
            var itemId = gifts[key][0];
            var itemQuantity = gifts[key][1];
            text+="#v"+itemId+"##b#t"+itemId+"##k #rx "+itemQuantity+"#k\r\n";
        }
        text+="\r\n#d是否現在就領取該禮包？#k";
        cm.sendYesNo(text);
    } else if (status == 2) {
        if (giftId!=-1 && gifts != null) {
            if (cm.getSpace(1) < 8 || cm.getSpace(2) < 8 || cm.getSpace(3) < 8 || cm.getSpace(4) < 8 || cm.getSpace(5) < 8) {
                cm.sendOk("您的背包空間不足，請保證每個欄位至少8格的空間，以避免領取失敗。");
                cm.dispose();
                return ;
            }
            if (giftToken[giftId-1]) {
                cm.setPQLog(bossid+(giftId-1),0,-2);
                for(var key in gifts) {
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
        if (giftContent[key][2]==id)
            lastGiftContent.push(giftContent[key]);
    }
    return lastGiftContent;
}