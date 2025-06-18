/*      
 *  
 *  功能：遊戲中心
 *  
 */
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
var sss = "0";

var count;
var ca = java.util.Calendar.getInstance();
var year = ca.get(java.util.Calendar.YEAR); //獲得年份
var month = ca.get(java.util.Calendar.MONTH) + 1; //獲得月份
var day = ca.get(java.util.Calendar.DATE);//獲取日
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //獲得小時
var hour_ = ca.get(java.util.Calendar.HOUR_OF_DAY); //獲得小時 24小時制
var minute = ca.get(java.util.Calendar.MINUTE);//獲得分鐘
var second = ca.get(java.util.Calendar.SECOND); //獲得秒
var weekday = ca.get(java.util.Calendar.DAY_OF_WEEK); //獲得星期
var time = new Date();
var sjr = time.getDay();
var pdtp = 0;
var Content = "我是豬我錯了";
var ContentS = 0;
var isGM = false;
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
        var txt = "\r\n#d┌═══════════遊戲中心══════════┐#k\r\n\r\n";
        txt += "#L0#" + c + "　#d※ #b攀爬城牆#d ※　" + c + "#l　　#k";
        txt += "#L6#" + c + "　#d※ #r趣味問答#d ※　" + c + "#l#k\r\n";
//        txt += "#L4#" + c + "　#d※ #b爭奪椅子#d ※　" + c + "#l#k\r\n";
        txt += "#L2#" + c + "　#d※ #b射手跳跳#d ※　" + c + "#l　　#k";
        txt += "#L3#" + c + "　#d※ #b玩具跳跳#d ※　" + c + "#l#k\r\n";
        txt += "#L8#" + c + "　#d※ #b數字競猜#d ※　" + c + "#l　　#k";
        txt += "#L5#" + c + "　#d※ #b快樂聖誕#d ※　" + c + "#l\r\n#k";
        //   txt += "#L8#" + c + "　#d※ #r玩家猜拳#d ※　" + c + "#l#k\r\n";
        //txt += "#L1#" + c + "　#d※ #b躲避陷阱#d ※　" + c + "#l#k";
        txt += "#d\r\n\r\n└═════════════════════════┘#k\r\n\r\n";
        txt += "\t\t　#r如有新穎小遊戲　※　可提供給管理員\r\n";
        cm.sendSimple(txt);

    } else if (status == 1) {
        switch (selection) {
            case 0://城牆
                pdtp = 1;
                count = cm.getEventCount("攀爬城牆");
                var txt = "\r\n#d┌═══════════攀爬城牆══════════┐#k\r\n\r\n";
                txt += " " + c + "　#d※　　　　　　　　　遊戲介紹　　　 　　　　　※ " + c + "#k\r\n";
                txt += " " + c + "　#d※　操作性能遊戲　攀爬到頂端即可領　#r豐厚獎品#d ※ " + c + "#k\r\n";
                txt += " " + c + "　#d※　每天限制攀爬城牆一回今天不攀爬明日就吃虧#d ※ " + c + "#k\r\n";
                txt += " " + c + "　#d※　今日已攀爬城牆 [ #r" + count + "#d ]   今日可參與 [#r" + (1 - count) + "#d]   #d ※ " + c + "#k\r\n\r\n";
                txt += "#d\r\n└═════════════════════════┘#k\r\n\r\n";
                cm.sendYesNo(txt);
                break;
            case 1://陷阱
                pdtp = 20;
                var txt = "\r\n#d┌═══════════躲避陷阱══════════┐#k\r\n\r\n";
                txt += " " + c + "　#d※　　　　　　　　　遊戲介紹　　　 　　　　　※ " + c + "#k\r\n";
                txt += " " + c + "　#d※　操作性能遊戲　躲避且到頂端即可領#r豐厚獎品#d ※ " + c + "#k\r\n";
                txt += " " + c + "　#d※　每天限制躲避陷阱一回今天不躲避明日就吃虧#d ※ " + c + "#k\r\n";
                txt += " " + c + "　#d※　今日已躲避陷阱 [ #r0#d ] 　今日可參與 [ #r1#d ] #d ※ " + c + "#k\r\n\r\n";
                txt += "#d\r\n└═════════════════════════┘#k\r\n\r\n";
                cm.sendYesNo(txt);
                break;
            case 2://射手
                pdtp = 3;
                count = cm.getEventCount("射手跳跳");
                var txt = "\r\n#d┌═══════════射手跳跳══════════┐#k\r\n\r\n";
                txt += " " + c + "　#d※　　　　　　　　　遊戲介紹　　　 　　　　　※ " + c + "#k\r\n";
                txt += " " + c + "　#d※　操作性能遊戲　跳到頂端即可領　#r豐厚獎品#d 　※ " + c + "#k\r\n";
                txt += " " + c + "　#d※　每天限制射手跳跳一回今天不跳跳明日就吃虧#d ※ " + c + "#k\r\n";
                txt += " " + c + "　#d※　今日已射手跳跳 [ #r" + count + "#d ] 　今日可參與 [ #r" + (1 - count) + "#d ] #d ※ " + c + "#k\r\n\r\n";
                txt += "#d\r\n└═════════════════════════┘#k\r\n\r\n";
                cm.sendYesNo(txt);
                break;
            case 3://玩具
                pdtp = 4;
                count = cm.getPQLog('玩具跳跳');
                var txt = "\r\n#d┌═══════════玩具跳跳══════════┐#k\r\n\r\n";
                txt += " " + c + "　#d※　　　　　　　　　遊戲介紹　　　 　　　　　※ " + c + "#k\r\n";
                txt += " " + c + "　#d※　操作性能遊戲　跳到頂端即可領　#r豐厚獎品#d 　※ " + c + "#k\r\n";
                txt += " " + c + "　#d※　每天限制玩具跳跳一回今天不跳跳明日就吃虧#d ※ " + c + "#k\r\n";
                txt += " " + c + "　#d※　今日已玩具跳跳 [ #r" + count + "#d ] 　今日可參與 [ #r" + (1 - count) + "#d ] #d ※ " + c + "#k\r\n\r\n";
                txt += "#d\r\n└═════════════════════════┘#k\r\n\r\n";
                cm.sendYesNo(txt);
                break;
            case 4://椅子
                pdtp = 5;
                count = cm.getPQLog('HOTTIME隱藏椅子的箱子');
                var txt = "\r\n#d┌═══════════爭奪椅子══════════┐#k\r\n\r\n";
                txt += " " + c + "　#d※　　　　　　　　　遊戲介紹　　　 　　　　　※ " + c + "#k\r\n";
                txt += " " + c + "　#d※　益智類型遊戲　選中椅子位置　　#r限量椅子#d 　※ " + c + "#k\r\n";
                txt += " " + c + "　#d※　每天限制爭奪椅子一回　若沒抽中獎五百樂豆點#d ※ " + c + "#k\r\n";
                txt += " " + c + "　#d※　今日已爭奪椅子 [ #r" + count + "#d ] 　今日可參與 [ #r" + (1 - count) + "#d ] #d ※ " + c + "#k\r\n\r\n";
                txt += "\t#v3015002#　#v3016000#　#v3010944#　#v3015051#　#v3015003#　#v3010116#\r\n";
                txt += "#d\r\n└═════════════════════════┘#k\r\n\r\n";
                cm.sendYesNo(txt);
                break;
            case 7://競猜
                pdtp = 2;
                count = cm.getPQLog('數字猜猜猜');
                var txt = "\r\n#d┌═══════════數字競猜══════════┐#k\r\n\r\n";
                txt += " " + c + "　#d※　　　　　　　　　遊戲介紹　　　 　　　　　※ " + c + "#k\r\n";
                txt += " " + c + "　#d※　益智類型遊戲　隨機10個數字且打亂且隱藏　 ※ " + c + "#k\r\n";
                txt += " " + c + "　#d※　每天限制一回　猜到被問的[Ｘ]數字給予獎品 ※ " + c + "#k\r\n";
                txt += " " + c + "　#d※　今日已數字競猜 [ #r" + count + "#d ] 　今日可參與 [ #r" + (3 - count) + "#d ] #d ※ " + c + "#k\r\n\r\n";
                txt += "#d\r\n└═════════════════════════┘#k\r\n\r\n";
                cm.sendYesNo(txt);
                break;
            case 5://快樂聖誕
                cm.dispose();
                cm.openNpc(9900003, "HappyXMas");
                break;
            case 8://猜數字
                cm.dispose();
                cm.openNpc(9900003, "Guessnumber");
                break;
            case 6://趣味問答
                pdtp = 7;
                cm.dispose();
                cm.openNpc(9330137, "Quiz");
                break;
            case 7://玩家猜拳
                pdtp = 8;
                cm.sendOk("\r\n\r\n\t\t#r正在修復猜拳細節問題 ！我們會盡快開放\r\n ", 1540496);
                status = -1;
                break;
        }
    } else if (status == 2) {
        if (pdtp == 1) {
            cm.forceStartQuest(200124, "");
            cm.warp(301050200, 0);
            cm.dispose();
        } else if (pdtp == 2) {
            //cm.warp(301050300, 0);
            cm.openNpc(9900003, "1");
            cm.dispose();
        } else if (pdtp == 3) {
            cm.forceStartQuest(200123, "");
            cm.warp(100000202, 0);
            cm.dispose();
        } else if (pdtp == 4) {
            cm.forceStartQuest(200122, "");
            cm.warp(220000006, 0);
            cm.dispose();
        } else if (pdtp == 5) {
            cm.dispose();
            cm.openNpc(9900003, "RandBox");
        } else if (pdtp == 6) {
            cm.dispose();
            cm.openNpc(9900003, "kuaileshengdan");
        }
        if (pdtp == 7) {
            cm.dispose();
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