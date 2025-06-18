/*      
 *  
 *  功能：數字猜猜猜
 *  
 */

var a = 0;
var randomNumber = Array();
var ca;
var year;
var month;
var day;
var hour;
var minute;
var second;
var n1;
var n2;
var n3;
var itemData = Array(
        2040008, //頭盔防禦詛咒卷軸
        2040009, //頭盔防禦詛咒卷軸
        2040010, //頭盔體力詛咒卷軸
        2040011, //頭盔體力詛咒卷軸
        2040014, //頭盔命中詛咒卷軸70%
        2040015, //頭盔命中詛咒卷軸30%
        2040103, //臉部裝飾生命詛咒卷軸30%
        2040104, //臉部裝飾生命詛咒卷軸70%
        2040108, //臉部裝飾迴避詛咒卷軸30%
        2040109, //臉部裝飾迴避詛咒卷軸70%
        2040203, //眼部裝飾命中詛咒卷軸30%
        2040204, //眼部裝飾命中詛咒卷軸70%
        2040208, //眼部裝飾智力詛咒卷軸30%
        2040209, //眼部裝飾智力詛咒卷軸70%
        2040304, //耳環智力詛咒卷軸
        2040305, //耳環智力詛咒卷軸
        2040308, //耳環防禦力詛咒卷軸70%
        2040309, //耳環防禦力詛咒卷軸30%
        2040404, //上衣防禦詛咒卷軸
        2040405, //上衣防禦詛咒卷軸
        2040410, //上衣運氣詛咒卷軸70%
        2040411, //上衣運氣詛咒卷軸30%
        2040508, //全身鎧甲敏捷詛咒卷軸
        2040509, //全身鎧甲敏捷詛咒卷軸
        2040510, //全身鎧甲防禦詛咒卷軸
        2040511, //全身鎧甲防禦詛咒卷軸
        2040604, //褲/裙防禦詛咒卷軸
        2040605, //褲/裙防禦詛咒卷軸
        2040606, //褲裙跳躍詛咒卷軸
        2040607, //褲裙跳躍詛咒卷軸
        2040608, //褲裙體力詛咒卷軸
        2040609, //褲裙體力詛咒卷軸
        2040610, //褲裙敏捷詛咒卷軸70%
        2040611, //褲裙敏捷詛咒卷軸30%
        2040712, //鞋子敏捷詛咒卷軸
        2040713, //鞋子敏捷詛咒卷軸
        2040714, //鞋子跳躍詛咒卷軸
        2040715, //鞋子跳躍詛咒卷軸
        2040716, //鞋子速度詛咒卷軸
        2040717, //鞋子速度詛咒卷軸
        2040807, //手套攻擊詛咒卷軸
        2040808, //手套敏捷詛咒卷軸
        2040809, //手套敏捷詛咒卷軸
        2040810, //手套攻擊詛咒卷軸
        2040811, //手套攻擊詛咒卷軸
        2040814, //手套魔力詛咒卷軸70%
        2040815, //手套魔力詛咒卷軸30%
        2040878, //手套攻擊詛咒卷軸
        2040904, //盾牌防禦詛咒卷軸
        2040905, //盾牌防禦詛咒卷軸
        2040916, //盾牌攻擊詛咒卷軸70%
        2040917, //盾牌攻擊詛咒卷軸30%
        2040921, //盾牌魔力詛咒卷軸70%
        2040922, //盾牌魔力詛咒卷軸30%
        2041026, //披風魔防詛咒卷軸
        2041027, //披風魔防詛咒卷軸
        2041028, //披風防禦詛咒卷軸
        2041029, //披風防禦詛咒卷軸
        2041030, //披風體力詛咒卷軸
        2041031, //披風體力詛咒卷軸
        2041032, //披風魔力詛咒卷軸
        2041033, //披風魔力詛咒卷軸
        2041034, //披風力量詛咒卷軸
        2041035, //披風力量詛咒卷軸
        2041036, //披風智力詛咒卷軸
        2041037, //披風智力詛咒卷軸
        2041038, //披風敏捷詛咒卷軸
        2041039, //披風敏捷詛咒卷軸
        2041040, //披風運氣詛咒卷軸
        2041041, //披風運氣詛咒卷軸
        2041204, //項鏈運氣詛咒卷軸30%
        2041205, //項鏈運氣詛咒卷軸70%
        2041209, //項鏈力量詛咒卷軸30%
        2041210, //項鏈力量詛咒卷軸70%
        2043004, //單手劍攻擊詛咒卷軸
        2043005, //單手劍攻擊詛咒卷軸
        2043006, //單手劍魔力詛咒卷軸70%
        2043007, //單手劍魔力詛咒卷軸30%
        2043104, //單手斧攻擊詛咒卷軸
        2043105, //單手斧攻擊詛咒卷軸
        2043204, //單手棍攻擊詛咒卷軸
        2043205, //單手棍攻擊詛咒卷軸
        2043304, //短劍攻擊詛咒卷軸
        2043305, //短劍攻擊詛咒卷軸
        2043704, //短杖魔力詛咒卷軸
        2043705, //短杖魔力詛咒卷軸
        2043804, //長杖魔力詛咒卷軸
        2043805, //長杖魔力詛咒卷軸
        2044004, //雙手劍攻擊詛咒卷軸
        2044005, //雙手劍攻擊詛咒卷軸
        2044104, //雙手斧攻擊詛咒卷軸
        2044105, //雙手斧攻擊詛咒卷軸
        2044204, //雙手棍攻擊詛咒卷軸
        2044205, //雙手棍攻擊詛咒卷軸
        2044304, //槍攻擊詛咒卷軸
        2044305, //槍攻擊詛咒卷軸
        2044404, //矛攻擊詛咒卷軸
        2044405, //矛攻擊詛咒卷軸
        2044504, //弓攻擊詛咒卷軸
        2044505, //弓攻擊詛咒卷軸
        2044604, //弩攻擊詛咒卷軸
        2044605, //弩攻擊詛咒卷軸
        2044704, //拳套攻擊詛咒卷軸
        2044705, //拳套攻擊詛咒卷軸
        1302128, //火柴
        3010124, //
        3010149,
        3010157,
        3010167,
        3010168,
        3010288,
        3010401,
        3010703,
        3015031,
        3010501,
        3015004,
        3015030,
        1042187, //, //粉紅絨絨衫
        1042174, //, //野營服
        1042149, //, //灰條紋休閒衫
        1702371, //, //舞杖
        1702382, //, //中秋柿子樹枝
        1702388, //, //熊寶寶是個能手巧匠
        1072437, //, //PB拖拖
        //1072348, //, //大象拖
        1003268, //, //粉嫩愛心帽
        1003237, //, //獅子寶寶帽
        1003038, //, //SD娃娃頭
        1102488, //, //蛋糕杯氣球
        1102549, //, //管家的貓咪
        1102450 //, //天使光芒之翼
        );
var pass = true;
var correct = 0;
var NumberPosition = Array();


function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            cm.dispose();

        updateDate();
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
            for (var i = 1; i < 5; i++) {
                if (cm.getSpace(i) < 5) {
                    pass = false;
                }
            }
            if (cm.getPQLog('數字猜猜猜') >= 5) {
                cm.sendOk("對不起，數字猜猜猜活動一天只能進行#e#r5#n#k次。");
                cm.dispose();
            } else if (minute >= 30 && minute <= 40) {
                cm.sendSimple("萬眾期待的HOTTIME時間又到了！親愛的冒險家，請問你要做什麼呢？\r\n#b#L0# 我要玩數字猜猜猜活動！\r\n#L1# 介紹一下此活動。");
            } else {
                cm.sendOk("對不起,活動未開啟，數字猜猜猜活動只在每小時的 #r30分 - 40分#k 開放。");
                cm.dispose();
            }
        } else if (a == 1) {
            if (selection == 0) {//我要玩數字猜猜猜活動！
                if (pass) {
                    cm.sendNextS("系統將隨機產生10個數字，請您做好準備記錄下這10個數字。\r\n#r -- 點擊下一步開始產生。\r\n #r-- 如果切斷對話，參加活動所需的物品不歸還。", 3);
                } else {
                    cm.sendOk("請讓你的所有背包欄空出5個格子。");
                    cm.dispose();
                }
            } else if (selection == 1) {//介紹一下此活動。
                a = -1;
                cm.sendNext("#e數字猜猜猜活動遊戲規則：#n#d\r\n\r\n1）系統會隨機給出10個數字，並且公示。\r\n2）這10個數字將被打亂，且隱藏。\r\n3）玩家會被隨機提問第N個數字是什麼\r\n如果回答正確即可得到獎勵！\r\n4）玩家一共有3次提問的機會。#e\r\n\r\n5）獎池中有隨機5個道具 \r\n - 回答正確1次，隨機從裡面得到1個道具。\r\n - 回答正確2次，隨機從裡面得到3個道具。\r\n - 回答正確3次，獎池內所有道具都帶走！#n\r\n\r\n 參加活動的時候切記您的所有背包空格都有5格以上的空間。");
            }//selection
        } else if (a == 2) {
            var temp;
            var i = 0;
            while (i < 10) {
                temp = Math.floor(Math.random() * 40);
                if (checkid(temp)) {
                    randomNumber.push(temp);//隨機0~39
                    i++;
                }
            }
            var text = "這10個隨機數字依次為：\r\n #r- 請拿起您的筆記下這隨機的數字！\r\n\r\n#d";
            for (var i = 0; i < randomNumber.length; i++) {
                text += "第" + (i + 1) + "個數字為： - " + randomNumber[i] + "\r\n";
            }
            cm.sendNextS(text, 3);
        } else if (a == 3) {
            cm.sendNextS("正在打亂這10個數字，請點擊下一步……。", 3);
        } else if (a == 4) {
            randomNumber.sort(function () {
                return 0.5 - Math.random();
            });//隨機打亂
            var temp = Math.floor(Math.random() * 10) + 1;
            var i = 0;
            while (i < 3) {
                temp = Math.floor(Math.random() * 10) + 1;
                //cm.sendY(temp)
                if (checkNumberPosition(temp)) {
                    NumberPosition.push(temp);//隨機1~10
                    i++;
                }
            }//隨機位數的數字猜
            cm.sendGetNumber("現在請您輸入第" + NumberPosition[0] + "個數字：\r\n #r-- 如果切斷對話，參加活動所需的物品不歸還。\r\n", 0, 0, 999);
        } else if (a == 5) {
            n1 = selection; //記錄玩家第一次輸入
            cm.sendGetNumber("現在請您輸入第" + NumberPosition[1] + "個數字：\r\n #r-- 如果切斷對話，參加活動所需的物品不歸還。\r\n", 0, 0, 999);
        } else if (a == 6) {
            n2 = selection;
            cm.sendGetNumber("現在請您輸入第" + NumberPosition[2] + "個數字：\r\n #r-- 如果切斷對話，參加活動所需的物品不歸還。\r\n", 0, 0, 999);
        } else if (a == 7) {
            n3 = selection;
            cm.sendNextS("你所輸入的數字為：\r\n\r\n 第" + NumberPosition[0] + "個數字 -- " + n1 + "\r\n 第" + NumberPosition[1] + "個數字 -- " + n2 + "\r\n 第" + NumberPosition[2] + "個數字 -- " + n3 + ".", 3);
        } else if (a == 8) {
            var text = "現在我來公佈結果：\r\n 經過打亂後的10個數字為：\r\n\r\n#b";
            for (var i = 0; i < randomNumber.length; i++) {
                if (i == (NumberPosition[0] - 1)) {
                    text += "第" + (i + 1) + "個數字為： - " + randomNumber[i] + " #r( 您的答案為：" + n1 + ")#b\r\n";
                } else if (i == (NumberPosition[1] - 1)) {
                    text += "第" + (i + 1) + "個數字為： - " + randomNumber[i] + " #r( 您的答案為：" + n2 + ")#b\r\n";
                } else if (i == (NumberPosition[2] - 1)) {
                    text += "第" + (i + 1) + "個數字為： - " + randomNumber[i] + " #r( 您的答案為：" + n3 + ")#b\r\n";
                } else {
                    text += "第" + (i + 1) + "個數字為： - " + randomNumber[i] + "\r\n";
                }
            }
            cm.sendNextS(text, 3);
        } else if (a == 9) {//判斷是否答對部分
            if (randomNumber[NumberPosition[0] - 1] == n1) {
                correct += 1;
            }
            if (randomNumber[NumberPosition[1] - 1] == n2) {
                correct += 1;
            }
            if (randomNumber[NumberPosition[2] - 1] == n3) {
                correct += 1;
            }
            var text = "系統判斷您一共答對了" + correct + "次。\r\n\r\n現在獎池裡面有下列的道具(隨機5個)：\r\n\r\n#b";

            itemData.sort(function () {
                return 0.5 - Math.random();
            });//隨機打亂道具池
            for (var i = 0; i < 5; i++) {//拿前5個
                text += "#i" + itemData[i] + "#   #z" + itemData[i] + "#\r\n\r\n";
            }
            cm.sendNextS(text + "#d\r\n\r\n - 回答正確1次，隨機從裡面得到1個道具。\r\n - 回答正確2次，隨機從裡面得到2個道具。\r\n - 回答正確3次，獎池裡面刀客i全部帶走！", 3);
        } else if (a == 10) {
            if (correct == 0) {//沒回答正確
                cm.sendOk("對不起，你沒有回答正確。\r\n領取物品的必要條件是必須至少回答一個正確。");
                cm.dispose();
            } else if (correct == 3) {//全部回答正確
                var text = "恭喜你！回答3個全部正確！你將獲取獎池內的所有物品！\r\n\r\n#b";
                for (var i = 0; i < 5; i++) {//拿前5個
                    text += "#i" + itemData[i] + "#   #z" + itemData[i] + "#\r\n\r\n";
                }
                cm.sendNextS(text + "#d\r\n\r\n請妥善保管哦！", 3);
            } else if (correct == 1) {//正確1個
                cm.gainItem(itemData[0], 1);
                cm.sendOk("贈送成功！ 喜歡獎池裡面的道具嗎？");
                cm.dispose();
            } else if (correct == 2) {//2個正確
                var text = "恭喜你！回答正確" + correct + "次，按照規則，你將獲取獎池內的：\r\n\r\n#b";
                for (var i = 0; i < 2; i++) {
                    text += "#i" + itemData[i] + "#   #z" + itemData[i] + "#\r\n\r\n";
                }
                a = 11;
                cm.sendNextS(text + "#d\r\n\r\n請妥善保管哦！", 3);
            } else {
                cm.sendOk("錯誤！請和管理員聯繫。\r\n錯誤代碼：" + correct);
            }
            cm.setPQLog('數字猜猜猜');
        } else if (a == 11) {//全部正確
            for (var i = 0; i < 3; i++) {//拿前5個
                cm.gainItem(itemData[i], 1);
            }
            cm.sendOk("贈送成功！ 喜歡獎池裡面的道具嗎？");
            cm.dispose();
        } else if (a == 12) {//2題
            for (var i = 0; i < 2; i++) {
                cm.gainItem(itemData[i], 1);
            }
            cm.sendOk("贈送成功！ 喜歡獎池裡面的道具嗎？");
            cm.dispose();
        }//a
    }//mode
}//f


function checkid(number) {//檢查是否重複
    var i = 0;
    while (randomNumber.length >= i) {
        if (randomNumber[i] == number) {
            return false;
        }
        i++;
    }
    return true;
}

function updateDate() {//更新時間
    ca = java.util.Calendar.getInstance();
    year = ca.get(java.util.Calendar.YEAR); //獲得年份
    month = ca.get(java.util.Calendar.MONTH) + 1; //獲得月份
    day = ca.get(java.util.Calendar.DATE);//獲取日
    hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //獲得小時
    minute = ca.get(java.util.Calendar.MINUTE);//獲得分鐘
    second = ca.get(java.util.Calendar.SECOND); //獲得秒
}

function checkNumberPosition(number) {//檢查是否重複
    var i = 0;
    while (NumberPosition.length >= i) {
        if (NumberPosition[i] == number) {
            return false;
        }
        i++;
    }
    return true;
}