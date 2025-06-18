/*
    製作：WSY工作室
    功能：BOSS次數重置
    時間：2017年1月18日
*/

//重置副本需要的樂豆點數量
var cash = 10000
//每天允許的重置次數
var reset = 2
var bosslist = Array(
    "普通殘暴炎魔",
    "進階殘暴炎魔",
    "闇黑龍王",
    "進階闇黑龍王",
    "鑽機",
    "強化鑽機",
    "皮卡啾",
    "混沌皮卡啾",
    "希拉",
    "希拉[困難]",
    "史烏",
    "半半",
    "進階半半",
    "貝倫",
    "進階貝倫",
    "濃姬",
    "皮埃爾",
    "進階皮埃爾",
    "森蘭丸",
    "森蘭丸[困難]",
    "貝勒·德",
    "獅子王:凡雷恩[簡單]",
    "獅子王:凡雷恩[普通]",
    "女皇：西格諾斯",
    "妖精女王：艾菲尼婭",
    "魔王巴洛古",
    "魔王巴洛古[困難]",
    "阿卡伊農[普通]",
    "梅格耐斯",
    "梅格耐斯[困難]",
    "腥血女王",
    "進階腥血女王"
)

var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
            cm.sendOk("等你想好了再來吧!");
        }
        status--;
    }
    if (status == 0) {
        cm.sendYesNo("重置所有BOSS副本需要" + cash + "點,你確定要重置嗎?\r\n(每日可以重置)" + reset + "次");
    } else if (status == 1) {
        if (cm.getNX(1) >= cash && cm.getBossLog("重置副本") < reset) {
            cm.gainNX(1, -cash)
            for (var i = 0; i < bosslist.length; i++) {
                cm.resetPQLog(bosslist[i])
            }
            cm.setBossLog("重置副本");
            cm.sendOk("恭喜你!成功用" + cash + "點,重置了所有BOSS副本");
        } else {
            cm.sendOk("很抱歉,您因為一下原因無法重置副本!!!\r\n1.樂豆點餘額不足" + cash + "點.\r\n2.已經超過每日重置副本次數.");
        }
        cm.dispose();
    }
}

//resetEventCount