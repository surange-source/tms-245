//*  番茄市場腳本 *//
//* 作者：50009219*//

var status = 0;
var random = java.lang.Math.floor(Math.random() * 4);
var a = "#fEffect/CharacterEff/1114000/1/0#"; //紅色六芒星
var b = "#fEffect/CharacterEff/1003271/0/0#";
var c = "#fEffect/CharacterEff/1112905/0/0#"; //籃心
var d = "#fEffect/CharacterEff/1002667/0/0#"; //黃星
var e = "#fEffect/CharacterEff/1003252/1/0#"; //音樂
var g = "#fEffect/CharacterEff/1082565/0/0#"; //餅乾兔子
var h = "#fUI/Basic/BtHide3/mouseOver/0#";
var f = "#fEffect/CharacterEff/1112904/2/1#";//彩色五角星

var ca = java.util.Calendar.getInstance();
var year = ca.get(java.util.Calendar.YEAR); //獲得年份
var month = ca.get(java.util.Calendar.MONTH) + 1; //獲得月份
var day = ca.get(java.util.Calendar.DATE);//獲取日
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //獲得小時
var minute = ca.get(java.util.Calendar.MINUTE);//獲得分鐘
var second = ca.get(java.util.Calendar.SECOND); //獲得秒
var weekday = ca.get(java.util.Calendar.DAY_OF_WEEK); //獲得星期
var time = new Date();
var sjr = time.getDay();
var pdtp = 0;
switch (sjr) {
    case 0:
        var xq = "星期日";
        break;
    case 1:
        var xq = "星期一";
        break;
    case 2:
        var xq = "星期二";
        break;
    case 3:
        var xq = "星期三";
        break;
    case 4:
        var xq = "星期四";
        break;
    case 5:
        var xq = "星期五";
        break;
    case 6:
        var xq = "星期六";
        break;
    default:
}
if (hour > 12) {
    hour -= 12;
    var apm = "下午好";
} else {
    var apm = "上午好";
}
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (cm.haveItem(2430865)) {
        var gbtp = "#r貴賓玩家#k";
    } else {
        var gbtp = "普通玩家";
    }
    if (status == 0 && mode == 0) {
        //cm.sendOk("#e#r　本商舖歡迎您的再次光臨!我們竭誠為你服務!!");
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (cm.getMapId() == 180000001) {
        cm.sendOk("很遺憾，您因為違反用戶守則被禁止遊戲活動，如有異議請聯繫管理員.")
        cm.dispose();
    } else if (status == 0) {
        var revenue0 = cm.getHyPay(1);
        var revenue1 = cm.getHyPay(2);
        var revenue4 = cm.getHyPay(3);
        var revenue2 = cm.getPlayer().getCSPoints(1);
        var revenue3 = cm.getPlayer().getCSPoints(2);
        var revenue5 = cm.getNX(1);
        var revenue6 = cm.getNX(2);
        var revenue7 = cm.getPlayerPoints();
        var revenue8 = cm.getPlayerEnergy();
        var selStr = "\t" + f + "在線:" + parseInt(cm.getOnlineTime()) + "\t\t" + f +  "活力:" + revenue8.formatMoney(0, "") + "\t\t" + f + "里程:" + revenue7.formatMoney(0, "")  + "\r\n";
        //selStr += "\t" + f + "餘額:" + revenue0.formatMoney(0, "") + "\t\t" + f + "消費:" + revenue1.formatMoney(0, "") + "\t"+ f + "累計:" + revenue4.formatMoney(0, "") + "#k#n\r\n";
        //selStr += "\t" + f + "累計:" + revenue4.formatMoney(0, "") + "#k#n\r\n";
        selStr += "\t" + f + "樂豆點:" + revenue5.formatMoney(0, "") + "\t\t" + f + "楓點:" + revenue6.formatMoney(0, "") + "#k#n\r\n";
        //selStr += "#r#L0#" + e + "回到自由#l#L1#" + e + "綜合石像#l#L2#" + e + "新手禮包#l#L3#" + e + "儲值中心#l#k#n\r\n\r\n";
        //selStr += "　#d#e#L4#" + g + " 排名系統#l　#L5#" + g + "軍銜系統#l　#L6#" + g + "每日任務#l\r\n#k#n\r\n";
        //selStr += "#e════════════════════════\r\n";
        //selStr += "             #b#L20##r#e  內  測  物  品#k#l\r\n";
        selStr += "\t\t\t#b#L0#" + f + "挑戰弱智模式（可挑戰十次）" + f + "#l\r\n#k";
        selStr += "\t\t\t#g#L1#" + e + "挑戰達人模式（可挑戰五次）" + e + "#l\r\n#k";
        selStr += "\t\t\t#g#L2#" + g + "挑戰傳說模式（可挑戰二次）" + g + "#l\r\n#k";
        //selStr += "    #b#L11#萬能傳送#l　  #L12#副本中心#l    \r\n\r\n#k";
        //selStr += "#e════════════════════════\r\n";
        //selStr += "　  #r#L9#" + d + " 物品回收#l        #L17#" + d + "遊戲紅包#l\r\n#k";
        //selStr += "            #e#L18#" + a + "點擊快速進入商城#l\r\n\r\n#k";
        //selStr += "#r提示：快捷鍵拍賣行[@npc]玩家請熟悉新手裝與每日福利#k\r\n";
        cm.sendSimple(selStr);
        //cm.worldSpouseMessage(0x05, "[系統公告] : 恭喜 " + htmlString);
        //---//

    } else if (status == 1) {
        switch (selection) {
            case 0://自由
                cm.dispose();
                cm.openNpc(9310468,"ruozhimoshi");
                break;
            case 1://能力
                cm.dispose();
                //cm.openNpc(9900004, 1002);
                cm.openNpc(9310468,"darenmoshi");
                break;
            case 2://新手
                cm.dispose();
                cm.openNpc(9310468,"chuanshuomoshi");
                break;
            case 3://儲值
                cm.dispose();
                cm.openNpc(9900004,"chongzhi");
                break;
            case 4://排名
                cm.dispose();
                cm.openNpc(9900004,"paiming");
                break;
            case 5://軍銜
                cm.dispose();
                cm.openNpc(9070001);
                break;
            case 6://福利
                cm.dispose();
                cm.openNpc(9900003,"meirifuli");
                break;
            case 7://日常
                cm.dispose();
                cm.warp(910002000);
                break;
            case 8://轉職
                cm.dispose();
                cm.openNpc(9900003, "zhuanzhi");
                break;
            case 9://學購技能
                cm.dispose();
                //cm.openNpc(9310362,"fulihongbao");
                cm.openNpc(9330343,"zhuangbeihuishou");
                break;
            case 10://在線福利
                cm.dispose();
                cm.openNpc(9900004, "zaixianfuli");
                break;
            case 11://傳送
                cm.dispose();
                cm.openNpc(9900003, "lianjichuansong");
                break;
            case 12://副本
                cm.dispose();
                cm.openNpc(9900003, "tesefuben");
                break;
            case 13://爆率
                cm.dispose();
                cm.openNpc(9310362, "checkDrop");
                break;
            case 14://石像
                cm.dispose();
                cm.openNpc(9900004,"zonghegongneng");
                break;
            case 15://商舖
                cm.dispose();
                cm.openNpc(9000052);
                break;
            case 16://里程
                cm.dispose();
                cm.openNpc(9900003, "kaifufuli");
                break;
            case 20://綜合
                if (cm.getLevel() >= 10) {
                    if (cm.getPQLog("內測福利1", 1) < 1) {
                        cm.gainNX(30000000);
                        cm.gainItem(2434340, 1);
                        cm.setPQLog("內測福利1", 1);
                        cm.sendOk("恭喜你領了內測福利");
                        cm.worldSpouseMessage(0x05, "[內測系統] 玩家 " + cm.getChar().getName() + " 完成了領取內測福利，每個帳號只可以領取一次哦。");
                        cm.dispose();
                    } else {
                        cm.sendOk("角色等級小於10級或者該帳號以領取過一次");
                        cm.dispose();
                       }
                    } else {
                        cm.sendOk("角色等級小於100級或者沒有指定物品或者該帳號以領取過一次");
                        cm.dispose();
                    }
            break;
            case 17://綜合
                cm.dispose();
                cm.openNpc(9900003, "hongbao");
                //cm.openNpc(9900004, 7);
                //cm.sendOk("#r玩法簡介:\r\n#k1).新人出生之後可在市場財神處領取出生裝備,財神有很多功能哦,要仔細看哦.\r\n2).新手升級到10級可以在等級獎勵裡面領取#r#z1122296##k哦，不過是封印的，要你自己努力解封哦\r\n3).新手可以打低級裝備回收楓幣，80-100級可以直接一鍵回收，一天下來收入也很可觀。有點裝備了可以去刷天空庭院，出破攻和楓幣的副本哦。\r\n4).技能書可以去怪物公園刷，或者去打鬧鐘左右兩邊的地圖，都可以刷技能書。\r\n5）100級以上裝備需要大副本了，基本上中等副本都出140裝備，森蘭丸出吊絲套，前期過度必備。\r\n6).每日任務的跑環和聖誕樂豆點任務一定要做，一定要做，平民樂豆點和楓點的位移來源。\r\n7).旅行者紀念幣#v4310019#和中國心#v4000858#都三虐心任務的必須物品，沒事想感受下虐心的，可以去刷刷。\r\n8).200級可在財神處加入門派，一定要加入哦，神器，卷軸，楓幣，特殊幣，都可以購買哦");
                break;
            case 18://商城系統
            cm.dispose();//這是結束腳本，請按照實際情況使用
            cm.enterCS();
            break;
        }
    } 
}


Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : "　";
    thousand = thousand || ",";
    decimal = decimal || ".";
    var number = this,
        negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};
